import { parseMarkdownFile } from './parser.js';

/**
 * Returns true when a page is marked for publication in frontmatter.
 * @param {object} page - Page object
 * @returns {boolean}
 */
export function isPublished(page) {
    return page.publish === true;
}

/**
 * Strips the numeric hierarchy prefix from a markdown filename
 * @param {string} name - Original filename (without .md)
 * @returns {string} Name without prefix
 */
function stripNamePrefix(name) {
    return name.replace(/^\d{2}_\d{1,2}_/, '');
}

/**
 * Converts text to a URL-safe slug (lowercase, no spaces, no diacritics)
 * @param {string} text - Source text (usually page title)
 * @returns {string} Safe slug
 */
export function toSlug(text) {
    if (!text) {
        return '';
    }

    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[_\s]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Generates the file_name for the page from its title
 * @param {string} name - Original filename (without .md)
 * @param {string} language - Language code (nl, en)
 * @param {string} [title] - Page title from frontmatter
 * @returns {string} Generated file name (e.g., "de-nieuwe-tools-van-golden-agents-nl.html")
 */
export function generateFileName(name, language, title) {
    // Home page: keep stable entry-point filenames
    if (name.match(/^00_00_/)) {
        if (language === 'nl') {
            return 'index.html';
        }
        return 'home-en.html';
    }

    const slug = toSlug(title) || toSlug(stripNamePrefix(name));
    if (!slug) {
        return `${language}.html`;
    }

    return `${slug}-${language}.html`;
}

/**
 * Assigns unique file_name values to all pages, based on title slugs per language
 * @param {Array} pages - Page objects
 */
export function assignFileNames(pages) {
    const usedByLanguage = {};

    for (const page of pages) {
        const lang = page.language;
        if (!usedByLanguage[lang]) {
            usedByLanguage[lang] = new Set();
        }

        let fileName = generateFileName(page.name, lang, page.title);

        if (usedByLanguage[lang].has(fileName)) {
            const nameSlug = toSlug(stripNamePrefix(page.name));
            const titleSlug = toSlug(page.title) || nameSlug;
            fileName = nameSlug
                ? `${titleSlug}-${nameSlug}-${lang}.html`
                : `${titleSlug}-${lang}.html`;

            let counter = 2;
            while (usedByLanguage[lang].has(fileName)) {
                fileName = `${titleSlug}-${counter}-${lang}.html`;
                counter++;
            }
        }

        usedByLanguage[lang].add(fileName);
        page.file_name = fileName;
    }
}

/**
 * Builds a page object from file information and parsed content
 * @param {object} fileInfo - File information from scanner
 * @returns {object} Complete page object
 */
export function buildPageObject(fileInfo) {
    // Parse the markdown file
    const { frontmatter, htmlContent } = parseMarkdownFile(fileInfo.filePath);

    // Determine type: use frontmatter type if available, otherwise use folder type from scanner
    const pageType = frontmatter.type || fileInfo.type || 'page';

    // Build the page object
    const pageObject = {
        language: fileInfo.language,
        [`isLang_${fileInfo.language}`]: true,
        page_order: fileInfo.page_order,
        page_level: fileInfo.page_level,
        name: fileInfo.fileName.replace('.md', ''),
        type: pageType,
        ...frontmatter,
        htmlContent: htmlContent,
        publish_date: frontmatter.publish_date || "2022-01-01",
        feautred_img: frontmatter.feautred_img || ""
    };

    return pageObject;
}
