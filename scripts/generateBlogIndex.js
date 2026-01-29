import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/blog');
const outputDir = path.join(process.cwd(), 'public/content');
const outputFile = path.join(outputDir, 'blog-index.json');
const siteUrl = 'https://vijay.seas.harvard.edu';

// Check if a blog-specific image exists (PNG or JPG)
function getBlogImage(slug) {
  const imageExtensions = ['.png', '.jpg', '.jpeg'];
  const imageDir = path.join(process.cwd(), 'public/images/blog');
  
  for (const ext of imageExtensions) {
    const imagePath = path.join(imageDir, `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `${siteUrl}/images/blog/${slug}${ext}`;
    }
    // Also check for -venn or other suffixed versions
    const vennPath = path.join(imageDir, `${slug}-venn${ext}`);
    if (fs.existsSync(vennPath)) {
      return `${siteUrl}/images/blog/${slug}-venn${ext}`;
    }
  }
  
  // Fallback to profile image
  return `${siteUrl}/images/profile.jpg`;
}

// Generate static HTML for a blog post with OG tags (for social media previews)
function generateBlogPostHtml(post) {
  const ogImage = getBlogImage(post.slug);
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Vijay Janapa Reddi</title>
    <meta name="description" content="${post.excerpt.replace(/"/g, '&quot;')}">
    
    <!-- Open Graph / LinkedIn / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${post.title}" />
    <meta property="og:description" content="${post.excerpt.replace(/"/g, '&quot;')}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:url" content="${postUrl}" />
    <meta property="article:published_time" content="${post.date}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${post.title}" />
    <meta name="twitter:description" content="${post.excerpt.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${ogImage}" />
    
    <!-- Redirect to SPA (same pattern as 404.html) -->
    <script type="text/javascript">
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
  <body>
    <p>Loading...</p>
  </body>
</html>`;
}

function generateBlogIndex() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Check if content directory exists
    if (!fs.existsSync(contentDir)) {
      console.log('No blog content directory found, creating empty index');
      fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
      return;
    }

    // Read all markdown files
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'))
      .sort()
      .reverse(); // Most recent first

    const posts = files.map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      const slug = file.replace('.md', '');
      
      // Copy markdown file to public directory for direct access
      const publicBlogDir = path.join(process.cwd(), 'public/content/blog');
      if (!fs.existsSync(publicBlogDir)) {
        fs.mkdirSync(publicBlogDir, { recursive: true });
      }
      fs.copyFileSync(filePath, path.join(publicBlogDir, file));
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || content.substring(0, 200) + '...',
        tags: data.tags || [],
        filename: file
      };
    });

    // Sort by date (most recent first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generate static HTML files for each blog post (for social media previews)
    const publicBlogPagesDir = path.join(process.cwd(), 'public/blog');
    posts.forEach(post => {
      const postDir = path.join(publicBlogPagesDir, post.slug);
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }
      const htmlContent = generateBlogPostHtml(post);
      fs.writeFileSync(path.join(postDir, 'index.html'), htmlContent);
    });
    console.log(`Generated ${posts.length} static blog post pages for social previews`);

    // Write the index file
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    
    console.log(`Generated blog index with ${posts.length} posts`);
    posts.forEach(post => {
      console.log(`  - ${post.title} (${post.date})`);
    });
    
  } catch (error) {
    console.error('Error generating blog index:', error);
    // Create empty index on error
    fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogIndex();
}

export default generateBlogIndex;