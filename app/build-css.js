import { readConfig } from './config-reader.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Builds CSS for the theme specified in config.yaml
 * Outputs directly to _dist/css/style.css
 */
export function buildCSS() {
    try {
        // Read config to get theme name
        const config = readConfig();
        const themeName = config.theme;
        
        console.log(`Building CSS for theme: ${themeName}`);
        
        // Paths to input and output CSS files
        const inputPath = join(__dirname, `../themes/${themeName}/css/input.css`);
        const outputDir = join(__dirname, '../_dist/css');
        const outputPath = join(outputDir, 'style.css');
        
        // Ensure output directory exists
        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
        }
        
        // Run tailwindcss CLI
        const command = `npx @tailwindcss/cli -i "${inputPath}" -o "${outputPath}"`;
        
        console.log(`Running: ${command}`);
        execSync(command, { stdio: 'inherit', cwd: join(__dirname, '..') });
        
        console.log(`CSS build complete: ${outputPath}`);
    } catch (error) {
        console.error('CSS build failed:', error.message);
        throw error;
    }
}

// If run directly (not imported), execute the build
// Only run if this file is the main entry point
const isMainModule = process.argv[1] && process.argv[1].endsWith('build-css.js');
if (isMainModule) {
    try {
        buildCSS();
    } catch (error) {
        console.error('CSS build failed:', error.message);
        process.exit(1);
    }
}
