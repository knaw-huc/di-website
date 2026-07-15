import { existsSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const SITEMAP_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

/**
 * Escapes special characters for XML text content.
 * @param {string} value
 * @returns {string}
 */
function escapeXml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Builds an absolute page URL from site root and file name.
 * @param {string} siteUrl
 * @param {string} fileName
 * @returns {string}
 */
function buildPageUrl(siteUrl, fileName) {
    const base = siteUrl.replace(/\/$/, '');

    if (fileName === 'index.html') {
        return `${base}/`;
    }

    return `${base}/${encodeURI(fileName)}`;
}

/**
 * Collects sitemap entries from published pages and static files.
 * @param {object[]} siteData
 * @param {string} staticDir
 * @returns {{ loc: string, lastmod?: string }[]}
 */
function collectSitemapEntries(siteData, staticDir) {
    const entries = new Map();

    for (const page of siteData) {
        if (page.directSubpages === true) {
            continue;
        }

        const siteUrl = page.site_url;
        if (!siteUrl) {
            continue;
        }

        const loc = buildPageUrl(siteUrl, page.file_name);
        const lastmod = page.publish_date || undefined;
        entries.set(loc, { loc, lastmod });
    }

    if (existsSync(staticDir)) {
        const siteUrl = siteData.find((page) => page.site_url)?.site_url;
        if (siteUrl) {
            for (const entry of readdirSync(staticDir, { withFileTypes: true })) {
                if (!entry.isFile()) {
                    continue;
                }

                const loc = buildPageUrl(siteUrl, entry.name);
                entries.set(loc, { loc });
            }
        }
    }

    return [...entries.values()].sort((a, b) => a.loc.localeCompare(b.loc));
}

/**
 * Generates sitemap.xml content (sitemaps.org protocol 0.9).
 * @param {{ loc: string, lastmod?: string }[]} entries
 * @returns {string}
 */
function generateSitemapXml(entries) {
    const urlNodes = entries.map((entry) => {
        const parts = [`    <loc>${escapeXml(entry.loc)}</loc>`];

        if (entry.lastmod) {
            parts.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
        }

        return `  <url>\n${parts.join('\n')}\n  </url>`;
    });

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        `<urlset xmlns="${SITEMAP_NS}">`,
        ...urlNodes,
        '</urlset>',
        '',
    ].join('\n');
}

/**
 * Generates sitemap.txt content (one absolute URL per line).
 * @param {{ loc: string }[]} entries
 * @returns {string}
 */
function generateSitemapTxt(entries) {
    return `${entries.map((entry) => entry.loc).join('\n')}\n`;
}

/**
 * Writes sitemap.xml and sitemap.txt to the build output directory.
 * @param {object[]} siteData
 * @param {string} outputDir
 * @param {string} staticDir
 */
export function buildSitemap(siteData, outputDir, staticDir) {
    const entries = collectSitemapEntries(siteData, staticDir);

    if (entries.length === 0) {
        console.log('No sitemap entries found. Skipping sitemap generation.');
        return;
    }

    const xmlPath = join(outputDir, 'sitemap.xml');
    const txtPath = join(outputDir, 'sitemap.txt');

    writeFileSync(xmlPath, generateSitemapXml(entries), 'utf-8');
    writeFileSync(txtPath, generateSitemapTxt(entries), 'utf-8');

    console.log(`Generated: ${xmlPath}`);
    console.log(`Generated: ${txtPath}`);
    console.log(`Sitemap URLs: ${entries.length}`);
}
