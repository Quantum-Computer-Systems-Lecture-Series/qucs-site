#!/bin/bash

# QuCS Website - Quick Start Script

echo "================================"
echo "QuCS Website Quick Start"
echo "================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from template..."
    cp .env.example .env
    echo "✅ Created .env file"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your GitHub OAuth credentials"
    echo "   See GETTING_STARTED.md for instructions"
    echo ""
    read -p "Press Enter to continue after setting up .env, or Ctrl+C to exit..."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

echo "================================"
echo "Starting development server..."
echo "================================"
echo ""
echo "📍 Website: http://localhost:4321"
echo "🔧 CMS Admin: http://localhost:4321/keystatic"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
