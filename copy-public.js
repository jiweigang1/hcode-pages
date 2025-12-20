#!/usr/bin/env node

'use strict';

/**
 * Node.js script to copy all files from public directory to D:\Javaworks\hawa-code-pages
 * This provides cross-platform compatibility for the copy operation
 * After copying, it automatically commits and pushes changes to git
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SOURCE_DIR = './public';
const TARGET_DIR = 'D:\\Javaworks\\hawa-code-pages';

// Custom error class
class CopyPublicError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CopyPublicError';
    }
}

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

// Function to remove directory or file safely
function removePath(filePath) {
    try {
        const stats = fs.lstatSync(filePath);
        if (stats.isDirectory()) {
            // Use recursive directory removal for Node.js 14.14.0+
            if (fs.rmSync) {
                fs.rmSync(filePath, { recursive: true, force: true });
            } else {
                // Fallback for older Node.js versions
                const files = fs.readdirSync(filePath);
                for (const file of files) {
                    const curPath = path.join(filePath, file);
                    removePath(curPath);
                }
                fs.rmdirSync(filePath);
            }
        } else {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.warn(`Warning: Could not remove ${filePath}:`, err.message);
    }
}

// Function to execute git commands in target directory
function executeGitCommands() {
    try {
        console.log('');
        console.log('🔄 Starting git operations...');
        
        // Change to target directory and execute git commands
        const gitCommands = [
            'git add .',
            'git commit -m "index"',
            'git push'
        ];
        
        for (const command of gitCommands) {
            console.log(`   Executing: ${command}`);
            execSync(command, { 
                cwd: TARGET_DIR,
                stdio: 'inherit' // Show command output
            });
        }
        
        console.log('✅ Git operations completed successfully!');
        return true;
    } catch (err) {
        console.error('❌ Error during git operations:', err.message);
        console.log('   Please ensure:');
        console.log('   1. Git is installed and available in PATH');
        console.log('   2. The target directory is a git repository');
        console.log('   3. You have proper git credentials configured');
        return false;
    }
}

// Main function
function main() {
    try {
        console.log('🚀 Starting file copy operation...');
        console.log(`Source: ${SOURCE_DIR}`);
        console.log(`Target: ${TARGET_DIR}`);
        console.log('');
        
        // Check if source directory exists
        if (!fs.existsSync(SOURCE_DIR)) {
            throw new CopyPublicError('Source directory does not exist! Please run "npm run build" first to generate the public directory.');
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
                removePath(filePath);
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
            throw new CopyPublicError('File copy operation completed with errors');
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
        console.log('🎉 File copy completed!');
        
        // Execute git commands after successful copy
        if (!executeGitCommands()) {
            throw new CopyPublicError('Git operations failed');
        }
        
        console.log('');
        console.log('🎉 All operations completed successfully!');
        
    } catch (err) {
        if (err instanceof CopyPublicError) {
            console.error('❌ Error:', err.message);
        } else {
            console.error('❌ Unexpected error:', err.message);
        }
        process.exitCode = 1;
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { copyDirectory, copyFile, executeGitCommands };