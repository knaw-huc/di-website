import fs from 'fs';
import matter from 'gray-matter';
import { marked, Renderer } from 'marked';

const defaultRenderer = new Renderer();

function isExternalLink(href) {
    return /^https?:\/\//i.test(href);
}

marked.use({
    renderer: {
        image(href, title, text) {
            const img = defaultRenderer.image(href, null, text);
            if (title) {
                return `<figure>${img}<figcaption>${title}</figcaption></figure>`;
            }
            return defaultRenderer.image(href, title, text);
        },
        link(href, title, text) {
            const html = defaultRenderer.link(href, title, text);
            if (!isExternalLink(href) || /<img\b/i.test(text)) {
                return html;
            }
            return html.replace('<a href', '<a class="external-link" href');
        }
    }
});

const MARKDOWN_IN_HTML_PATTERN = /!?\[[^\]]*\]\([^)]*\)/;

/**
 * Parses markdown inside HTML block elements.
 * CommonMark skips markdown parsing within block-level HTML.
 * @param {string} content - Raw markdown content
 * @returns {string} Content with markdown inside HTML blocks converted
 */
function parseMarkdownInHtmlBlocks(content) {
    return content.replace(
        /<([a-z][a-z0-9]*)\b([^>]*)>([\s\S]*?)<\/\1>/gi,
        (match, tag, attrs, inner) => {
            if (!MARKDOWN_IN_HTML_PATTERN.test(inner)) {
                return match;
            }

            const trimmed = inner.trim();
            const parsed = trimmed.includes('\n')
                ? marked.parse(trimmed).trim()
                : marked.parseInline(trimmed);

            return `<${tag}${attrs}>${parsed}</${tag}>`;
        }
    );
}

/**
 * Parses a markdown file and extracts YAML frontmatter and converts content to HTML
 * @param {string} filePath - Path to the markdown file
 * @returns {object} Object with frontmatter data and HTML content
 */
export function parseMarkdownFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(fileContent);

        // Convert markdown content to HTML
        let htmlContent = '';
        if (parsed.content && parsed.content.trim()) {
            const content = parseMarkdownInHtmlBlocks(parsed.content.trim());
            htmlContent = marked.parse(content);
        }

        return {
            frontmatter: parsed.data || {},
            htmlContent: htmlContent
        };
    } catch (error) {
        console.error(`Error parsing file ${filePath}:`, error.message);
        return {
            frontmatter: {},
            htmlContent: ''
        };
    }
}
