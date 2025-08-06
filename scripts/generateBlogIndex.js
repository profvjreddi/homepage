import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/blog');
const outputDir = path.join(process.cwd(), 'public/content');
const outputFile = path.join(outputDir, 'blog-index.json');

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