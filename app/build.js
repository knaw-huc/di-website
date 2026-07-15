import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scanMarkdownFiles } from './a-collect-data/scanner.js';
import { buildPageObject, isPublished, assignFileNames } from './a-collect-data/builder.js';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { generateHTML, registerPartials } from './b-html-builder/html-generator.js';
import { readConfig } from './config-reader.js';
import { buildCSS } from './build-css.js';
import { buildSitemap } from './build-sitemap.js';

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
 * All pages are rendered in the root folder
 * @param {object} page - Page object
 * @returns {string} Relative path to HTML file (just the filename)
 */
function generatePagePathWithMap(page) {
    // All pages go to root - just return the filename
    return page.file_name;
}

/**
 * Collects data from markdown files and generates site.json
 * @returns {Promise<void>} Promise that resolves when data collection is complete
 */
function collectData() {
    return new Promise((resolve, reject) => {
        try {
            console.log('Starting data collection...');

            // Scan for markdown files
            const files = scanMarkdownFiles('content/markdown');
            console.log(`Found ${files.length} markdown files`);

            if (files.length === 0) {
                console.error('No markdown files found. Exiting.');
                reject(new Error('No markdown files found'));
                return;
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
                reject(new Error('No published pages found'));
                return;
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
                            // All pages are in root - just use filename as path
                            const path = generatePagePathWithMap(p);
                            
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

            // Add config data to each page
            const config = readConfig();
            pages.forEach(page => {
                // Add each config field to the page
                Object.keys(config).forEach(key => {
                    page[key] = config[key];
                });
            });

            // Write JSON output
            const outputPath = path.resolve(__dirname, '../data/site.json');
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
            
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Builds HTML files from site.json
 * @returns {Promise<void>} Promise that resolves when HTML building is complete
 */
async function buildHTML() {
    try {
        console.log('Starting HTML build...');

        // Read config to get theme name
        const config = readConfig();
        const themeName = config.theme;
        console.log(`Using theme: ${themeName}`);

        // Read site.json
        const siteDataPath = join(__dirname, '../data/site.json');
        
        // Check if site.json exists
        if (!fs.existsSync(siteDataPath)) {
            throw new Error(`site.json not found at ${siteDataPath}. Run data collection first.`);
        }

        const siteData = JSON.parse(readFileSync(siteDataPath, 'utf-8'));

        // Output directory (_dist folder)
        const outputDir = join(__dirname, '../_dist');

        // Default template path (dynamic based on theme)
        const defaultTemplatePath = join(__dirname, `../themes/${themeName}/template/default.html`);
        const templateDir = join(__dirname, `../themes/${themeName}/template`);

        // Partials directory (components) - dynamic based on theme
        const partialsDir = join(__dirname, `../themes/${themeName}/components`);

        // Clear the _dist folder before building
        if (fs.existsSync(outputDir)) {
            console.log('Clearing _dist folder...');
            fs.rmSync(outputDir, { recursive: true, force: true });
        }

        // Ensure output directory exists
        mkdirSync(outputDir, { recursive: true });

        // Register partials before generating HTML
        console.log('Registering handlebars partials...');
        await registerPartials(partialsDir);
        
        // Clear template cache to ensure it's recompiled with partials available
        const { clearTemplateCache } = await import('./b-html-builder/html-generator.js');
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
                // Skip generating HTML for pages with directSubpages: true
                // These pages don't have their own HTML file, they link directly to their first subpage
                if (page.directSubpages === true) {
                    console.log(`Skipped: ${page.file_name} (directSubpages: true)`);
                    return;
                }
                
                // Determine template path: use page.template if specified, otherwise use default
                let templatePath = defaultTemplatePath;
                if (page.template) {
                    const customTemplatePath = join(templateDir, page.template);
                    if (fs.existsSync(customTemplatePath)) {
                        templatePath = customTemplatePath;
                    } else {
                        console.log(`Warning: Template file not found: ${customTemplatePath}. Using default template for ${page.file_name}`);
                    }
                }
                
                const outputPath = getOutputPath(page, outputDir);
                const html = generateHTML(page, templatePath, outputPath, outputDir);
                
                // Ensure directory exists
                const outputDirPath = dirname(outputPath);
                mkdirSync(outputDirPath, { recursive: true });
                
                // Write HTML file
                writeFileSync(outputPath, html, 'utf-8');
                console.log(`Generated: ${outputPath}`);
            });
        });

        console.log('HTML build complete!');

        // Build CSS file after HTML generation (scanning _dist for classes)
        console.log('Building CSS...');
        buildCSS();

        // Copy images after HTML build is complete
        console.log('Copying images...');
        copyImages(themeName, outputDir);
        
        // Copy JavaScript files after HTML build is complete
        console.log('Copying JavaScript files...');
        copyJavaScript(themeName, outputDir);

        // Copy static HTML files (e.g. accessibility statement)
        console.log('Copying static files...');
        copyStaticFiles(outputDir);

        // Generate sitemap.xml and sitemap.txt (sitemaps.org standard)
        console.log('Building sitemap...');
        const staticPath = join(__dirname, '../content/static');
        buildSitemap(siteData, outputDir, staticPath);
    } catch (error) {
        throw error;
    }
}

/**
 * Recursively copies a directory to a destination
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 */
function copyDirectory(src, dest) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        mkdirSync(dest, { recursive: true });
    }

    // Read all items in the source directory
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);

        if (entry.isDirectory()) {
            // Recursively copy subdirectories
            copyDirectory(srcPath, destPath);
        } else {
            // Copy files
            copyFileSync(srcPath, destPath);
        }
    }
}

/**
 * Copies images from theme and content folders to _dist/images
 * @param {string} themeName - Name of the selected theme
 * @param {string} outputDir - Output directory (_dist)
 */
function copyImages(themeName, outputDir) {
    const imagesDir = join(outputDir, 'images');
    
    // Create images directory in _dist if it doesn't exist
    if (!fs.existsSync(imagesDir)) {
        mkdirSync(imagesDir, { recursive: true });
    }

    // Copy images from theme folder
    const themeImagesPath = join(__dirname, `../themes/${themeName}/images`);
    if (fs.existsSync(themeImagesPath)) {
        console.log(`Copying images from theme: ${themeImagesPath}`);
        copyDirectory(themeImagesPath, imagesDir);
    } else {
        console.log(`Theme images folder not found: ${themeImagesPath}`);
    }

    // Copy images from content folder
    const contentImagesPath = join(__dirname, '../content/images');
    if (fs.existsSync(contentImagesPath)) {
        console.log(`Copying images from content: ${contentImagesPath}`);
        copyDirectory(contentImagesPath, imagesDir);
    } else {
        console.log(`Content images folder not found: ${contentImagesPath}`);
    }

    console.log('Images copied successfully!');
}

/**
 * Copies JavaScript files from theme folder to _dist/js
 * @param {string} themeName - Name of the selected theme
 * @param {string} outputDir - Output directory (_dist)
 */
function copyJavaScript(themeName, outputDir) {
    const jsDir = join(outputDir, 'js');
    
    // Create js directory in _dist if it doesn't exist
    if (!fs.existsSync(jsDir)) {
        mkdirSync(jsDir, { recursive: true });
    }

    // Copy JavaScript files from theme folder
    const themeJsPath = join(__dirname, `../themes/${themeName}/js`);
    if (fs.existsSync(themeJsPath)) {
        console.log(`Copying JavaScript files from theme: ${themeJsPath}`);
        copyDirectory(themeJsPath, jsDir);
    } else {
        console.log(`Theme JavaScript folder not found: ${themeJsPath}`);
    }

    console.log('JavaScript files copied successfully!');
}

/**
 * Copies static files from content/static to _dist root
 * @param {string} outputDir - Output directory (_dist)
 */
function copyStaticFiles(outputDir) {
    const staticPath = join(__dirname, '../content/static');
    if (!fs.existsSync(staticPath)) {
        return;
    }

    const entries = fs.readdirSync(staticPath, { withFileTypes: true });
    for (const entry of entries) {
        if (!entry.isFile()) {
            continue;
        }
        copyFileSync(join(staticPath, entry.name), join(outputDir, entry.name));
    }

    console.log('Static files copied successfully!');
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

/**
 * Main build function that runs data collection followed by HTML building
 */
async function build() {
    try {
        // Step 1: Collect data from markdown files
        await collectData();
        
        // Step 2: Build HTML files from the collected data
        await buildHTML();
        
        console.log('Build process completed successfully!');
    } catch (error) {
        console.error('Build process failed:', error.message);
        process.exit(1);
    }
}

// Run the build process
build();
