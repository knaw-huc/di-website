import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Reads and parses the config.yaml file
 * @returns {object} Config object with theme and other settings
 */
export function readConfig() {
    const configPath = join(__dirname, '../content/config.yaml');
    
    if (!existsSync(configPath)) {
        throw new Error(`Config file not found at ${configPath}`);
    }
    
    const configContent = readFileSync(configPath, 'utf-8');
    const config = {};
    
    // Simple YAML parser for basic key-value pairs
    // Handles format: key: value and YAML front matter (---)
    const lines = configContent.split('\n');
    let inFrontMatter = false;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) {
            continue;
        }
        
        // Handle YAML front matter markers (---)
        if (trimmed === '---') {
            inFrontMatter = !inFrontMatter;
            continue;
        }
        
        // Only parse if we're inside front matter or if there's no front matter
        // Parse key: value pairs
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex > 0) {
            const key = trimmed.substring(0, colonIndex).trim();
            const value = trimmed.substring(colonIndex + 1).trim();
            config[key] = value;
        }
    }
    
    if (!config.theme) {
        throw new Error('Theme not specified in config.yaml');
    }
    
    return config;
}
