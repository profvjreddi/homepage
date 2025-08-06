#!/bin/bash

# Blog Development Workflow Script
# Usage: ./scripts/dev-workflow.sh [command]

case "$1" in
  "dev")
    echo "🚀 Starting development server..."
    npm run dev
    ;;
  "new-post")
    if [ -z "$2" ]; then
      echo "❌ Please provide a post title: ./scripts/dev-workflow.sh new-post 'My Post Title'"
      exit 1
    fi
    echo "📝 Creating new blog post: $2"
    slug=$(echo "$2" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g' | sed 's/^-\|-$//g')
    filename="content/blog/$slug.md"
    
    if [ -f "$filename" ]; then
      echo "❌ Post already exists: $filename"
      exit 1
    fi
    
    cat > "$filename" << EOF
---
title: "$2"
date: "$(date +%Y-%m-%d)"
excerpt: "Brief description of your post."
tags: ["tag1", "tag2"]
---

# $2

Your content here...
EOF
    
    echo "✅ Created new post: $filename"
    echo "📝 Edit the file and run 'npm run dev' to see changes"
    ;;
  "generate")
    echo "📚 Generating blog index..."
    npm run blog:generate
    echo "✅ Blog index updated"
    ;;
  "build")
    echo "🔨 Building for production..."
    npm run build
    echo "✅ Build complete"
    ;;
  "deploy")
    echo "🚀 Deploying to GitHub Pages..."
    npm run deploy
    echo "✅ Deployed to GitHub Pages"
    ;;
  "commit")
    if [ -z "$2" ]; then
      echo "❌ Please provide a commit message: ./scripts/dev-workflow.sh commit 'Your commit message'"
      exit 1
    fi
    echo "📝 Committing changes..."
    git add .
    git commit -m "$2"
    echo "✅ Changes committed"
    ;;
  "push")
    echo "🚀 Pushing to GitHub..."
    git push origin main
    echo "✅ Pushed to GitHub (will trigger auto-deploy)"
    ;;
  "full-deploy")
    echo "🔄 Full deployment workflow..."
    npm run blog:generate
    npm run build
    git add .
    git commit -m "Auto-deploy: $(date)"
    git push origin main
    echo "✅ Full deployment complete - GitHub Actions will deploy to Pages"
    ;;
  *)
    echo "📚 Blog Development Workflow"
    echo ""
    echo "Usage: ./scripts/dev-workflow.sh [command]"
    echo ""
    echo "Commands:"
    echo "  dev              - Start development server"
    echo "  new-post <title> - Create a new blog post"
    echo "  generate         - Generate blog index"
    echo "  build            - Build for production"
    echo "  deploy           - Deploy to GitHub Pages"
    echo "  commit <msg>     - Commit changes"
    echo "  push             - Push to GitHub"
    echo "  full-deploy      - Complete workflow: generate, build, commit, push"
    echo ""
    echo "Examples:"
    echo "  ./scripts/dev-workflow.sh dev"
    echo "  ./scripts/dev-workflow.sh new-post 'My New Post'"
    echo "  ./scripts/dev-workflow.sh full-deploy"
    ;;
esac 