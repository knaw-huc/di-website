import handlebars from 'handlebars';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, resolve as resolvePath, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Template cache (keyed by template path)
const templateCache = {};

/**
 * Clears the template cache (useful when partials are registered after initial compilation)
 */
export function clearTemplateCache() {
    Object.keys(templateCache).forEach(key => delete templateCache[key]);
}

/**
 * Registers handlebars helpers
 */
function registerHelpers() {
    handlebars.registerHelper('split', function (str) {
        if (typeof str !== 'string') return [];
        return str.split(';');
    });

    handlebars.registerHelper('removeCapSpace', function (str) {
        if (typeof str !== 'string') return '';
        return str.replaceAll(' ', '_').toLowerCase();
    });

    handlebars.registerHelper('ifSame', function (val1, val2, options) {
        if (val1 == val2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    handlebars.registerHelper('eq', function (val1, val2) {
        return val1 === val2;
    });

    handlebars.registerHelper('lookup', function (obj, key) {
        return obj && obj[key];
    });

    handlebars.registerHelper('add', function (a, b) {
        return parseInt(a) + parseInt(b);
    });

    handlebars.registerHelper('nextItem', function (array, index) {
        const idx = parseInt(index);
        return array && array[idx + 1] ? array[idx + 1] : null;
    });

    handlebars.registerHelper('nextItemWithIndex', function (array, index) {
        const idx = parseInt(index);
        const next = array && array[idx + 1] ? array[idx + 1] : null;
        if (next) {
            return {
                item: next,
                currentIndex: idx
            };
        }
        return null;
    });

    handlebars.registerHelper('isCurrentPage', function (navItem, currentPageFileName, options) {
        const isCurrent = navItem && currentPageFileName && navItem.filename === currentPageFileName;
        if (isCurrent) {
            return options.fn(this);
        } else {
            return options.inverse ? options.inverse(this) : '';
        }
    });

    handlebars.registerHelper('isParentPage', function (navItem, currentPageFileName, currentPageLevel, allNavItems, currentNavIndex, options) {
        // Only level 1 items can be parents
        if (!navItem || navItem.levels !== 1 || !currentPageFileName || !allNavItems) {
            return options.inverse ? options.inverse(this) : '';
        }
        
        let isParent = false;
        
        // If current page is level 2, find its parent (the preceding level 1 item)
        if (currentPageLevel === 2) {
            // Find the current page in the navigation
            const currentPageIndex = allNavItems.findIndex(item => item.filename === currentPageFileName);
            if (currentPageIndex !== -1) {
                // Find the preceding level 1 item
                for (let i = currentPageIndex - 1; i >= 0; i--) {
                    if (allNavItems[i].levels === 1) {
                        isParent = allNavItems[i].filename === navItem.filename;
                        break;
                    }
                }
            }
        }
        
        if (isParent) {
            return options.fn(this);
        } else {
            return options.inverse ? options.inverse(this) : '';
        }
    });

    handlebars.registerHelper('shouldExpandSubnav', function (level1Item, currentPageFileName, currentPageLevel, allNavItems, level1Index, options) {
        // If current page is level 2, check if this level 1 item is its parent
        if (currentPageLevel === 2 && level1Item && level1Item.levels === 1) {
            const currentPageIndex = allNavItems.findIndex(item => item.filename === currentPageFileName);
            if (currentPageIndex !== -1) {
                // Find the preceding level 1 item
                for (let i = currentPageIndex - 1; i >= 0; i--) {
                    if (allNavItems[i].levels === 1) {
                        if (allNavItems[i].filename === level1Item.filename) {
                            return options.fn(this);
                        }
                        break;
                    }
                }
            }
        }
        return options.inverse ? options.inverse(this) : '';
    });

    handlebars.registerHelper('isSubnavExpanded', function (level1Item, currentPageFileName, currentPageLevel, allNavItems, level1Index) {
        // Returns "true" or "false" as a string for use in attributes
        if (!level1Item || !currentPageFileName || !allNavItems) {
            return "false";
        }
        
        // Check if current page is the level 1 page itself
        if (level1Item.filename === currentPageFileName) {
            return "true";
        }
        
        // Check if current page is a level 2 child of this level 1 page
        if (currentPageLevel === 2) {
            const currentPageIndex = allNavItems.findIndex(item => item.filename === currentPageFileName);
            if (currentPageIndex !== -1) {
                // Find the preceding level 1 item
                for (let i = currentPageIndex - 1; i >= 0; i--) {
                    if (allNavItems[i].levels === 1) {
                        if (allNavItems[i].filename === level1Item.filename) {
                            return "true";
                        }
                        break;
                    }
                }
            }
        }
        return "false";
    });

    handlebars.registerHelper('subnavClass', function (level1Item, currentPageFileName, currentPageLevel, allNavItems, level1Index) {
        // Returns "block" or "hidden" for use in class attributes
        if (!level1Item || !currentPageFileName || !allNavItems) {
            return "hidden";
        }
        
        // Check if current page is the level 1 page itself
        if (level1Item.filename === currentPageFileName) {
            return "block";
        }
        
        // Check if current page is a level 2 child of this level 1 page
        if (currentPageLevel === 2) {
            const currentPageIndex = allNavItems.findIndex(item => item.filename === currentPageFileName);
            if (currentPageIndex !== -1) {
                // Find the preceding level 1 item
                for (let i = currentPageIndex - 1; i >= 0; i--) {
                    if (allNavItems[i].levels === 1) {
                        if (allNavItems[i].filename === level1Item.filename) {
                            return "block";
                        }
                        break;
                    }
                }
            }
        }
        return "hidden";
    });

    handlebars.registerHelper('getLevel2Children', function (level1Index, allNavItems) {
        if (!allNavItems || level1Index === undefined) {
            return [];
        }
        const idx = parseInt(level1Index);
        const children = [];
        
        // Start from the item after the level 1 item
        for (let i = idx + 1; i < allNavItems.length; i++) {
            if (allNavItems[i].levels === 2) {
                children.push(allNavItems[i]);
            } else if (allNavItems[i].levels === 1) {
                // Stop when we hit the next level 1 item
                break;
            }
        }
        
        return children;
    });

    handlebars.registerHelper('getFirstLevel2Child', function (level1Index, allNavItems) {
        if (!allNavItems || level1Index === undefined) {
            return null;
        }
        const idx = parseInt(level1Index);
        
        // Start from the item after the level 1 item
        for (let i = idx + 1; i < allNavItems.length; i++) {
            if (allNavItems[i].levels === 2) {
                return allNavItems[i];
            } else if (allNavItems[i].levels === 1) {
                // Stop when we hit the next level 1 item
                break;
            }
        }
        
        return null;
    });

    handlebars.registerHelper('getFirstLevel2ChildWithParent', function (level1Index, allNavItems, level1Item) {
        if (!allNavItems || level1Index === undefined || !level1Item) {
            return null;
        }
        const idx = parseInt(level1Index);
        for (let i = idx + 1; i < allNavItems.length; i++) {
            if (allNavItems[i].levels === 2) {
                return { firstChild: allNavItems[i], level1Item, level1Index: idx };
            }
            if (allNavItems[i].levels === 1) break;
        }
        return null;
    });

    handlebars.registerHelper('hasDirectSubpages', function (level1Item, allNavItems, level1Index) {
        if (!level1Item || !allNavItems || level1Index === undefined) {
            return false;
        }
        // Check if the level 1 item has directSubpages field
        // Also check if we can find it in the navigation items array
        const idx = parseInt(level1Index);
        if (allNavItems && allNavItems[idx]) {
            return allNavItems[idx].directSubpages === true;
        }
        return level1Item.directSubpages === true;
    });

    handlebars.registerHelper('shouldShowNestedList', function (level1Item, currentPageFileName, currentPageLevel, allNavItems, level1Index) {
        // Returns true if current page is level 1 with subpages or level 2, and this level 1 item is the parent
        if (!level1Item || !currentPageFileName || !allNavItems || level1Index === undefined) {
            return false;
        }
        
        // Check if current page is the level 1 page itself
        if (level1Item.filename === currentPageFileName && currentPageLevel === 1) {
            // Check if this level 1 page has subpages
            const idx = parseInt(level1Index);
            if (idx + 1 < allNavItems.length && allNavItems[idx + 1].levels === 2) {
                return true;
            }
        }
        
        // Check if current page is a level 2 child of this level 1 page
        if (currentPageLevel === 2) {
            const currentPageIndex = allNavItems.findIndex(item => item.filename === currentPageFileName);
            if (currentPageIndex !== -1) {
                // Find the preceding level 1 item
                for (let i = currentPageIndex - 1; i >= 0; i--) {
                    if (allNavItems[i].levels === 1) {
                        if (allNavItems[i].filename === level1Item.filename) {
                            return true;
                        }
                        break;
                    }
                }
            }
        }
        
        return false;
    });

    handlebars.registerHelper('randomBetween', function (min, max) {
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    });

    handlebars.registerHelper('replaceStr', function (str, replace, replaceWith) {
        if (typeof str !== 'string') return '';
        return str.replaceAll(replace, replaceWith);
    });

    handlebars.registerHelper('reverse', function (array) {
        if (!Array.isArray(array)) return [];
        return array.slice().reverse();
    });

    handlebars.registerHelper('getBreadcrumbs', function (currentPageFileName, currentPageLevel, allNavItems, options) {
        if (!currentPageFileName || !allNavItems || !Array.isArray(allNavItems)) {
            return [];
        }

        const breadcrumbs = [];
        
        // Find the current page in navigation
        const currentPageIndex = allNavItems.findIndex(item => item.filename === currentPageFileName);
        if (currentPageIndex === -1) {
            return [];
        }

        const currentPage = allNavItems[currentPageIndex];

        // Find the home page (usually index.html or the first page with level 0 or lowest page_order)
        const homePage = allNavItems.find(item => 
            item.filename === 'index.html' || 
            item.filename === 'home-en.html' ||
            item.levels === 0
        ) || allNavItems[0];

        const isHomePage = currentPage.filename === homePage.filename;

        // Always add Home as first breadcrumb (unless current page is home)
        if (!isHomePage) {
            breadcrumbs.push({
                title: homePage.title || 'Home',
                path: homePage.path || 'index.html',
                isCurrent: false,
                hasLink: !homePage.directSubpages
            });
        }

        // If current page is level 2, add its parent (level 1) page
        if (currentPageLevel === 2) {
            // Find the preceding level 1 item
            for (let i = currentPageIndex - 1; i >= 0; i--) {
                if (allNavItems[i].levels === 1) {
                    breadcrumbs.push({
                        title: allNavItems[i].title,
                        path: allNavItems[i].path,
                        isCurrent: false,
                        hasLink: !allNavItems[i].directSubpages
                    });
                    break;
                }
            }
        }

        // Add current page
        breadcrumbs.push({
            title: currentPage.title,
            path: currentPage.path,
            isCurrent: true,
            hasLink: !currentPage.directSubpages
        });

        return breadcrumbs;
    });
}

/**
 * Registers handlebars partials from a components directory
 * @param {string} partialsDir - Directory containing partial files
 * @returns {Promise<void>} Promise that resolves when partials are registered
 */
export function registerPartials(partialsDir) {
    return new Promise((resolve, reject) => {
        try {
            if (!partialsDir) {
                resolve();
                return;
            }
            
            const resolvedPath = resolvePath(partialsDir);
            
            // Check if partials directory exists
            if (!existsSync(resolvedPath)) {
                // If no partials directory, just resolve (partials are optional)
                resolve();
                return;
            }

            const longPath = resolvedPath;
            const results = [];

            function walk(dir) {
                const list = readdirSync(dir);
                
                list.forEach((file) => {
                    const filePath = resolvePath(dir, file);
                    const stat = statSync(filePath);

                    if (stat.isDirectory()) {
                        walk(filePath);
                    } else {
                        const relativePath = filePath.replace(longPath + '/', '').replace(longPath + '\\', '');
                        results.push(relativePath);

                        const source = readFileSync(filePath, 'utf-8');
                        const partialName = relativePath.replace(extname(relativePath), '').replace(/\\/g, '/');
                        handlebars.registerPartial(partialName, source);
                    }
                });
            }

            walk(resolvedPath);
            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Loads and compiles the handlebars template
 * @param {string} templatePath - Path to the template file
 * @returns {handlebars.TemplateDelegate} Compiled template
 */
function loadTemplate(templatePath) {
    // Use cached template if available
    if (templateCache[templatePath]) {
        return templateCache[templatePath];
    }

    // Load, compile, and cache the template
    const templateSource = readFileSync(templatePath, 'utf-8');
    templateCache[templatePath] = handlebars.compile(templateSource);
    return templateCache[templatePath];
}

/**
 * Calculates the relative path from an HTML file to the CSS file
 * @param {string} outputPath - Full output path of the HTML file
 * @param {string} outputDir - Base output directory (_dist)
 * @returns {string} Relative path to CSS file
 */
function calculateCSSPath(outputPath, outputDir) {
    // Get relative path from outputDir to the HTML file
    const relativePath = outputPath.replace(outputDir + '/', '').replace(outputDir + '\\', '');
    
    // Count directory depth (number of slashes)
    const depth = (relativePath.match(/\//g) || []).length;
    
    // If file is at root level (index.html), CSS is in css/ subdirectory
    if (depth === 0) {
        return 'css/style.css';
    }
    
    // For each level deep, go up one directory
    return '../'.repeat(depth) + 'css/style.css';
}

/**
 * Generates HTML content for a page using handlebars
 * @param {object} page - Page object from site.json
 * @param {string} templatePath - Path to the handlebars template
 * @param {string} outputPath - Optional: Full output path of the HTML file (for calculating CSS path)
 * @param {string} outputDir - Optional: Base output directory (for calculating CSS path)
 * @returns {string} Complete HTML document
 */
export function generateHTML(page, templatePath, outputPath = null, outputDir = null) {
    // Register helpers (idempotent, safe to call multiple times)
    registerHelpers();

    // Calculate CSS path if output path is provided
    if (outputPath && outputDir) {
        page.cssPath = calculateCSSPath(outputPath, outputDir);
    } else {
        // Fallback to absolute path if we can't calculate relative path
        page.cssPath = '/css/style.css';
    }

    // Load and compile template
    const template = loadTemplate(templatePath);

    // Render template with page data
    const html = template(page);

    return html;
}
