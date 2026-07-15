import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Scans the content/markdown directory for language folders and markdown files
 * @param {string} contentPath - Path to content/markdown directory
 * @returns {Array} Array of file info objects with language, path, and hierarchy info
 */
export function scanMarkdownFiles(contentPath) {
    const markdownPath = path.resolve(__dirname, '../../', contentPath);
    const files = [];

    // Check if directory exists
    if (!fs.existsSync(markdownPath)) {
        console.error(`Directory not found: ${markdownPath}`);
        return files;
    }

    // Get all language folders (e.g., nl-nl, en-gb)
    const languageFolders = fs.readdirSync(markdownPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const langFolder of languageFolders) {
        const langPath = path.join(markdownPath, langFolder);
        
        // Map language folder to language code
        const languageCode = mapLanguageCode(langFolder);

        // Get all subfolders in the language folder
        const subfolders = fs.readdirSync(langPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const subfolder of subfolders) {
            const subfolderPath = path.join(langPath, subfolder);
            
            // Get all markdown files in this subfolder
            const markdownFiles = fs.readdirSync(subfolderPath)
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    const filePath = path.join(subfolderPath, file);
                    const hierarchy = extractHierarchy(file);
                    
                    // Determine type: if it's not 'pages', use the folder name as type
                    const pageType = subfolder === 'pages' ? 'page' : subfolder;
                    
                    return {
                        language: languageCode,
                        languageFolder: langFolder,
                        folder: subfolder,
                        type: pageType,
                        filePath: filePath,
                        fileName: file,
                        name: file.replace('.md', ''),
                        ...hierarchy
                    };
                });

            files.push(...markdownFiles);
        }
    }

    return files;
}

/**
 * Maps language folder name to language code
 * @param {string} langFolder - Language folder name (e.g., 'nl-nl', 'en-gb')
 * @returns {string} Language code (e.g., 'nl', 'en')
 */
function mapLanguageCode(langFolder) {
    const mapping = {
        'nl-nl': 'nl',
        'en-gb': 'en'
    };
    return mapping[langFolder] || langFolder.split('-')[0];
}

/**
 * Extracts hierarchy information from filename pattern XX_YY_filename.md or XX_Y_filename.md
 * @param {string} filename - Markdown filename
 * @returns {object} Object with page_order and page_level
 */
function extractHierarchy(filename) {
    // Try to match XX_YY_ pattern (two digits for both levels)
    let match = filename.match(/^(\d{2})_(\d{2})_/);
    
    // If that fails, try XX_Y_ pattern (two digits, then one digit)
    if (!match) {
        match = filename.match(/^(\d{2})_(\d{1})_/);
    }
    
    if (!match) {
        console.warn(`Filename does not match expected pattern XX_YY_filename.md or XX_Y_filename.md: ${filename}`);
        return {
            page_order: 99999,
            page_level: 0
        };
    }

    const level1 = parseInt(match[1], 10);
    const level2 = parseInt(match[2], 10);

    // Calculate page_order: 10000 + (XX * 100) + YY
    const page_order = 10000 + (level1 * 100) + level2;

    // Calculate page_level: 1 if YY == 0, otherwise 2
    const page_level = level2 === 0 ? 1 : 2;

    return {
        page_order,
        page_level
    };
}
