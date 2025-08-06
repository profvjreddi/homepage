# Blog Development Workflow

This guide explains how to work with the blog system efficiently.

## 🚀 Quick Start

### Local Development
```bash
# Start development server
./scripts/dev-workflow.sh dev

# Or use npm directly
npm run dev
```

### Create a New Blog Post
```bash
./scripts/dev-workflow.sh new-post "My Amazing Post Title"
```

### Deploy Changes
```bash
# Full automated deployment
./scripts/dev-workflow.sh full-deploy
```

## 📝 Writing Blog Posts

### File Structure
- **Source**: `content/blog/your-post.md`
- **Images**: `public/images/blog/your-image.png`
- **Auto-generated**: `public/content/blog-index.json`

### Markdown Format
```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "Brief description of your post."
tags: ["tag1", "tag2", "tag3"]
---

# Your Post Title

Your content here...

![Image Description](/images/blog/your-image.png)
```

### Image Guidelines
- Place images in `public/images/blog/`
- Reference them as `/images/blog/filename.png`
- Supported formats: PNG, JPG, JPEG, GIF

## 🔄 Workflow Options

### Option 1: GitHub-Based (Recommended)
1. **Write locally**: Edit markdown files in `content/blog/`
2. **Preview locally**: `./scripts/dev-workflow.sh dev`
3. **Commit & push**: `./scripts/dev-workflow.sh full-deploy`
4. **Auto-deploy**: GitHub Actions builds and deploys to Pages

### Option 2: Direct GitHub Editing
1. **Edit on GitHub**: Go to `content/blog/` and edit files directly
2. **Commit changes**: GitHub will auto-build and deploy
3. **View live**: Your site updates automatically

### Option 3: Local Development Only
1. **Write posts**: Create markdown files locally
2. **Preview**: `npm run dev` to see changes
3. **Manual deploy**: `npm run deploy` when ready

## 🛠️ Available Commands

```bash
# Development
./scripts/dev-workflow.sh dev              # Start dev server
./scripts/dev-workflow.sh new-post "Title" # Create new post
./scripts/dev-workflow.sh generate         # Update blog index

# Deployment
./scripts/dev-workflow.sh build            # Build for production
./scripts/dev-workflow.sh deploy           # Deploy to GitHub Pages
./scripts/dev-workflow.sh full-deploy      # Complete workflow

# Git operations
./scripts/dev-workflow.sh commit "Message" # Commit changes
./scripts/dev-workflow.sh push             # Push to GitHub
```

## 📚 Blog Post Best Practices

### Front Matter
- **title**: Clear, descriptive title
- **date**: YYYY-MM-DD format
- **excerpt**: 1-2 sentence summary
- **tags**: Relevant categories (max 5)

### Content Structure
1. **Hook**: Engaging opening
2. **Main content**: Well-structured sections
3. **Conclusion**: Key takeaways
4. **Images**: Relevant visuals with alt text

### SEO Tips
- Use descriptive image alt text
- Include relevant tags
- Write compelling excerpts
- Use clear headings (H1, H2, H3)

## 🔧 Troubleshooting

### Blog Index Not Updating
```bash
./scripts/dev-workflow.sh generate
```

### Images Not Showing
- Check path: `/images/blog/filename.png`
- Verify file exists in `public/images/blog/`
- Clear browser cache

### Build Errors
```bash
npm run build
# Check console for specific errors
```

## 🌐 Deployment

### Automatic (GitHub Actions)
- Push to `main` branch
- GitHub Actions builds and deploys
- Available at: `https://profvjreddi.github.io/homepage`

### Manual
```bash
npm run deploy
```

## 📖 Examples

### Creating a Research Post
```bash
./scripts/dev-workflow.sh new-post "New Advances in Embodied AI"
# Edit content/blog/new-advances-in-embodied-ai.md
# Add images to public/images/blog/
./scripts/dev-workflow.sh full-deploy
```

### Quick Edit
1. Edit `content/blog/your-post.md`
2. `./scripts/dev-workflow.sh dev` (preview)
3. `./scripts/dev-workflow.sh full-deploy` (publish)

## 🎯 Pro Tips

1. **Write in batches**: Create multiple posts, then deploy once
2. **Use images**: Visual content increases engagement
3. **Tag consistently**: Helps with organization
4. **Preview locally**: Always check before deploying
5. **Backup content**: Keep local copies of important posts

## 🔗 Useful Links

- **Local Development**: `http://localhost:5173/blog`
- **Live Site**: `https://profvjreddi.github.io/homepage`
- **GitHub Repository**: Your repo URL
- **GitHub Actions**: Check deployment status 