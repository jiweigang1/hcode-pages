#!/bin/bash

# Shell script to copy all files from public directory to D:\Javaworks\hawa-code-pages
# This script copies the generated Hexo site files to the target directory

# Configuration
SOURCE_DIR="./public"
TARGET_DIR="D:\\Javaworks\\hawa-code-pages"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory '$SOURCE_DIR' does not exist!"
    echo "Please run 'npm run build' first to generate the public directory."
    exit 1
fi

# Check if target directory exists, create if it doesn't
if [ ! -d "$TARGET_DIR" ]; then
    echo "Creating target directory: $TARGET_DIR"
    mkdir -p "$TARGET_DIR"
fi

# Copy all files from public to target directory
echo "Copying files from $SOURCE_DIR to $TARGET_DIR..."

# Use rsync if available, otherwise use cp
if command -v rsync &> /dev/null; then
    echo "Using rsync for efficient copying..."
    rsync -av --delete "$SOURCE_DIR/" "$TARGET_DIR/"
else
    echo "Using cp for copying..."
    # Remove existing files in target directory first
    rm -rf "$TARGET_DIR"/*
    # Copy all files recursively
    cp -r "$SOURCE_DIR"/* "$TARGET_DIR/"
fi

# Check if copy was successful
if [ $? -eq 0 ]; then
    echo "✅ Successfully copied all files to $TARGET_DIR"
    echo "Files copied:"
    find "$TARGET_DIR" -type f | head -10
    echo "..."
    echo "Total files in target: $(find "$TARGET_DIR" -type f | wc -l)"
else
    echo "❌ Error occurred during copying!"
    exit 1
fi

echo "Done!"