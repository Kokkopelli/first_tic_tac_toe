#!/bin/bash

# Tic-Tac-Toe Deployment Script
# Run this script to deploy the application in production

set -e  # Exit on any error

echo "🚀 Starting Tic-Tac-Toe Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Set default port if not specified
export PORT=${PORT:-5000}
export NODE_ENV=production

echo "🌐 Starting production server on port $PORT..."
echo "📍 Application will be available at: http://$(hostname -I | awk '{print $1}'):$PORT"
echo "🛑 Press Ctrl+C to stop the server"

# Start the production server
npm start