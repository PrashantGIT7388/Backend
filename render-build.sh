#!/bin/bash
# Render build script for SQLite3
echo "Starting Render build process..."

# Clean install and rebuild sqlite3 specifically for Render's environment
npm install
npm rebuild sqlite3 --build-from-source

echo "Build completed successfully!"