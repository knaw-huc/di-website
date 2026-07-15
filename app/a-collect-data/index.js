import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scanMarkdownFiles } from './scanner.js';
import { buildPageObject, isPublished, assignFileNames } from './builder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts a filename to kebab-case
 * @param {string} filename - Original filename
 * @returns {string} Kebab-case filename
 */
function toKebabCase(filename) {
    return filename
        .toLowerCase()
        .replace(/[_\s]+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Extracts a clean title from a page name, removing numeric prefixes for non-page types
 * @param {object} page - Page object
 * @returns {string} Clean title
 */
function extractTitle(page) {
    // If there's a title in frontmatter, use it
    if (page.title) {
        return page.title;
    }
    
    // For page types, use the name as-is (structure is important)
    if (page.type === 'page') {
        return page.name;
    }
    
    // For non-page types, strip all leading numeric prefixes (e.g., "01_filename" -> "filename", "00_02_filename" -> "filename")
    // Pattern: strip all leading digits and underscores at the start
    const nameWithoutPrefix = page.name.replace(/^(\d+_)+/, '');
    return nameWithoutPrefix;
}

/**
 * Generates the HTML path for a page (relative to site root)
 * @param {object} page - Page object
 * @param {object} level1FolderMap - Map of level 1 codes to folder names
 * @returns {string} Relative path to HTML file
 */
function generatePagePathWithMap(page, level1FolderMap) {
    const fileName = page.file_name;
    const pageType = page.type || 'page';
    
    // For non-page types (files in folders other than pages), use type-based folder
    if (pageType !== 'page') {
        const folderName = toKebabCase(pageType);
        return `${folderName}/${fileName}`;
    }
    
    // For pages, use the numeric pattern logic
    const nameMatch = page.name.match(/^(\d{2})_(\d{2})_(.+)$/);
    
    // If the page doesn't match the numeric pattern, just use filename
    if (!nameMatch) {
        return fileName;
    }
    
    const level1Code = nameMatch[1];
    const level2Code = nameMatch[2];
    const pageName = nameMatch[3];
    
    // Index page (00_00_): goes to root
    if (level1Code === '00' && level2Code === '00') {
        return fileName;
    }
    
    // Level 1 page (0x_00_ where x != 0): create folder with page name
    if (level2Code === '00' && page.page_level === 1) {
        const folderName = toKebabCase(pageName);
        return `${folderName}/${fileName}`;
    }
    
    // Level 2 page (0x_0y_ where y != 0): go into level 1 folder
    if (level1FolderMap[level1Code]) {
        const folderName = level1FolderMap[level1Code];
        return `${folderName}/${fileName}`;
    }
    
    // Fallback: use level code as folder name
    return `${level1Code}_${level2Code}/${fileName}`;
}

/**
 * Main function to collect data from markdown files and generate site.json
 */
function collectData() {
    console.log('Starting data collection...');

    // Scan for markdown files
    const files = scanMarkdownFiles('content/markdown');
    console.log(`Found ${files.length} markdown files`);

    if (files.length === 0) {
        console.error('No markdown files found. Exiting.');
        process.exit(1);
    }

    // Build page objects for each file
    const allPages = [];
    for (const fileInfo of files) {
        try {
            const pageObject = buildPageObject(fileInfo);
            allPages.push(pageObject);
        } catch (error) {
            console.error(`Error processing ${fileInfo.filePath}:`, error.message);
        }
    }

    assignFileNames(allPages);

    const pages = allPages.filter(isPublished);
    const skippedCount = allPages.length - pages.length;
    if (skippedCount > 0) {
        console.log(`Skipped ${skippedCount} unpublished page(s)`);
    }

    if (pages.length === 0) {
        console.error('No published pages found. Exiting.');
        process.exit(1);
    }

    // Sort pages by page_order
    pages.sort((a, b) => a.page_order - b.page_order);

    // Add lists object to each page for navigation
    // Group pages by language first
    const pagesByLanguage = {};
    pages.forEach(page => {
        const lang = page.language;
        if (!pagesByLanguage[lang]) {
            pagesByLanguage[lang] = [];
        }
        pagesByLanguage[lang].push(page);
    });

    // For each language, add lists to each page
    Object.keys(pagesByLanguage).forEach(language => {
        const langPages = pagesByLanguage[language];
        
        // Build a map of level 1 pages (0x_00_) to their folder names
        // This is needed for level 2 pages to know which folder to use
        const level1FolderMap = {};
        langPages.forEach(page => {
            const match = page.name.match(/^(\d{2})_00_(.+)$/);
            if (match && page.page_level === 1) {
                const level1Code = match[1];
                const pageName = match[2];
                const folderName = toKebabCase(pageName);
                level1FolderMap[level1Code] = folderName;
            }
        });
        
        // Group pages by type
        const pagesByType = {};
        langPages.forEach(page => {
            const type = page.type || 'page';
            if (!pagesByType[type]) {
                pagesByType[type] = [];
            }
            pagesByType[type].push(page);
        });

        // Build lists for each page
        langPages.forEach(page => {
            page.lists = {};
            
            // For each type, create a list of navigation items
            Object.keys(pagesByType).forEach(type => {
                const typePages = pagesByType[type];
                
                // Sort by page_order
                const sortedPages = [...typePages].sort((a, b) => a.page_order - b.page_order);
                
                // Create list items with title, filename, path, levels, summary, and featured_image
                page.lists[type] = sortedPages.map(p => {
                    // Generate path based on page structure (similar to HTML builder logic)
                    const path = generatePagePathWithMap(p, level1FolderMap);
                    
                    return {
                        title: extractTitle(p),
                        filename: p.file_name,
                        path: path,
                        levels: p.page_level || 0,
                        directSubpages: p.directSubpages || false,
                        summary: p.summary || p.meta_description || "",
                        featured_image: p.featured_image || ""
                    };
                });
            });
        });
    });

    // Write JSON output
    const outputPath = path.resolve(__dirname, '../../data/site.json');
    const outputDir = path.dirname(outputPath);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file with pretty formatting
    fs.writeFileSync(outputPath, JSON.stringify(pages, null, 4), 'utf-8');

    console.log(`Successfully generated ${outputPath}`);
    console.log(`Total pages: ${pages.length}`);
    console.log('Data collection complete!');
}

// Run the collection process
collectData();
