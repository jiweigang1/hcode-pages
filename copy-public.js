#!/usr/bin/env node

/**
 * Node.js script to copy all files from public directory to D:\Javaworks\hawa-code-pages
 * This provides cross-platform compatibility for the copy operation
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = './public';
const TARGET_DIR = 'D:\\Javaworks\\hawa-code-pages';

// Function to copy file
function copyFile(src, dest) {
    try {
        // Create destination directory if it doesn't exist
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copy file
        fs.copyFileSync(src, dest);
        return true;
    } catch (err) {
        console.error(`Error copying ${src} to ${dest}:`, err.message);
        return false;
    }
}

// Function to recursively copy directory
function copyDirectory(src, dest) {
    try {
        // Create destination directory
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        // Read source directory
        const entries = fs.readdirSync(src, { withFileTypes: true });
        let successCount = 0;
        let errorCount = 0;
        
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                // Recursively copy subdirectory
                const result = copyDirectory(srcPath, destPath);
                successCount += result.success;
                errorCount += result.errors;
            } else {
                // Copy file
                if (copyFile(srcPath, destPath)) {
                    successCount++;
                } else {
                    errorCount++;
                }
            }
        }
        
        return { success: successCount, errors: errorCount };
    } catch (err) {
        console.error(`Error copying directory ${src} to ${dest}:`, err.message);
        return { success: 0, errors: 1 };
    }
}

// Main function
function main() {
    console.log('🚀 Starting file copy operation...');
    console.log(`Source: ${SOURCE_DIR}`);
    console.log(`Target: ${TARGET_DIR}`);
    console.log('');
    
    // Check if source directory exists
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error('❌ Error: Source directory does not exist!');
        console.error('Please run "npm run build" first to generate the public directory.');
        process.exit(1);
    }
    
    // Check if target directory exists, create if it doesn't
    if (!fs.existsSync(TARGET_DIR)) {
        console.log(`Creating target directory: ${TARGET_DIR}`);
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    }
    
    // Clear target directory first (preserve .git folder)
    console.log('Clearing target directory (preserving .git folder)...');
    if (fs.existsSync(TARGET_DIR)) {
        const targetFiles = fs.readdirSync(TARGET_DIR);
        for (const file of targetFiles) {
            // Skip .git folder and CNAME file to preserve Git repository and custom domain
            if (file === '.git' || file === 'CNAME') {
                console.log('   Preserving .git folder');
                continue;
            }
            
            const filePath = path.join(TARGET_DIR, file);
            try {
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.rmSync(filePath, { recursive: true, force: true });
                } else {
                    fs.unlinkSync(filePath);
                }
            } catch (err) {
                console.warn(`Warning: Could not remove ${filePath}:`, err.message);
            }
        }
    }
    
    // Copy files
    console.log('Copying files...');
    const startTime = Date.now();
    const result = copyDirectory(SOURCE_DIR, TARGET_DIR);
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    // Show results
    console.log('');
    console.log('✅ File copy completed!');
    console.log(`📊 Statistics:`);
    console.log(`   Files copied: ${result.success}`);
    console.log(`   Errors: ${result.errors}`);
    console.log(`   Duration: ${duration}s`);
    
    if (result.errors > 0) {
        console.log('⚠️  Some files could not be copied. Check the error messages above.');
        process.exit(1);
    }
    
    // Show first few files copied
    console.log('');
    console.log('📁 Sample files copied:');
    try {
        const files = [];
        function collectFiles(dir, basePath = '') {
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const relativePath = path.join(basePath, entry.name);
                if (entry.isDirectory()) {
                    collectFiles(fullPath, relativePath);
                } else {
                    files.push(relativePath);
                    if (files.length >= 10) return;
                }
                if (files.length >= 10) return;
            }
        }
        collectFiles(TARGET_DIR);
        files.slice(0, 5).forEach(file => console.log(`   - ${file}`));
        if (files.length > 5) {
            console.log(`   ... and ${files.length - 5} more files`);
        }
    } catch (err) {
        console.log('   (Could not list files)');
    }
    
    console.log('');
    console.log('🎉 Done!');
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { copyDirectory, copyFile };