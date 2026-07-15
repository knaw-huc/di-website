import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { generateHTML, registerPartials, clearTemplateCache } from './html-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Main function to build HTML files from site.json
 */
async function buildHTML() {
    // Read site.json
    const siteDataPath = join(__dirname, '../../data/site.json');
    const siteData = JSON.parse(readFileSync(siteDataPath, 'utf-8'));

    // Output directory (_dist folder)
    const outputDir = join(__dirname, '../../_dist');

    // Template path
    const templatePath = join(__dirname, '../../themes/test1/template/default.html');

    // Partials directory (components)
    const partialsDir = join(__dirname, '../../themes/test1/components');

    // Clear the _dist folder before building
    if (existsSync(outputDir)) {
        console.log('Clearing _dist folder...');
        rmSync(outputDir, { recursive: true, force: true });
    }

    // Register partials before generating HTML
    console.log('Registering handlebars partials...');
    await registerPartials(partialsDir);
    
    // Clear template cache to ensure it's recompiled with partials available
    clearTemplateCache();

    // Group pages by language
    const pagesByLanguage = {};
    
    siteData.forEach(page => {
        const lang = page.language;
        if (!pagesByLanguage[lang]) {
            pagesByLanguage[lang] = [];
        }
        pagesByLanguage[lang].push(page);
    });

    // Generate HTML files for each language
    Object.keys(pagesByLanguage).forEach(language => {
        const pages = pagesByLanguage[language];
        
        // Generate HTML files for each page
        pages.forEach(page => {
            const html = generateHTML(page, templatePath);
            const outputPath = getOutputPath(page, outputDir);
            
            // Ensure directory exists
            const outputDirPath = dirname(outputPath);
            mkdirSync(outputDirPath, { recursive: true });
            
            // Write HTML file
            writeFileSync(outputPath, html, 'utf-8');
            console.log(`Generated: ${outputPath}`);
        });
    });

    console.log('HTML build complete!');
}

/**
 * Determines the output path for a page
 * All pages are rendered in the root folder of _dist
 * @param {object} page - Page object from site.json
 * @param {string} baseDir - Base output directory (_dist)
 * @returns {string} Full output path
 */
function getOutputPath(page, baseDir) {
    // All pages go to root - just return baseDir + filename
    return join(baseDir, page.file_name);
}

buildHTML().catch((err) => {
    console.error('HTML build failed:', err);
    process.exit(1);
});
