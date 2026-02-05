const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(process.cwd(), 'Notes');
const TARGET_CONTENT_DIR = path.join(process.cwd(), 'content', 'notes');
const TARGET_IMAGE_DIR = path.join(process.cwd(), 'public', 'notes-images');

// Ensure target directories exist
if (!fs.existsSync(TARGET_CONTENT_DIR)) fs.mkdirSync(TARGET_CONTENT_DIR, { recursive: true });
if (!fs.existsSync(TARGET_IMAGE_DIR)) fs.mkdirSync(TARGET_IMAGE_DIR, { recursive: true });

// Map to store original filenames to their clean versions (without .md)
const fileMap = new Map();

// Helper to clean filenames (replace spaces with underscores)
function cleanName(name) {
    return name.trim().replace(/\s+/g, '_');
}

// Check if a file is an image
function isImage(filename) {
    const ext = path.extname(filename).toLowerCase();
    return ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext);
}

// First pass: Index all markdown files for wikilink resolution
function indexFiles(dir, relativePath = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        if (item.startsWith('.')) continue; // Skip dotfiles
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            indexFiles(fullPath, path.join(relativePath, item));
        } else if (item.endsWith('.md')) {
            const originalName = path.basename(item, '.md');
            const newName = cleanName(originalName);
            // Store the mapping: "Original Name" -> "relative/path/New_Name"
            // Note: relativePath keeps the directory structure which we also clean
            const cleanRelativePath = relativePath.split(path.sep).map(cleanName).join('/');
            const linkPath = cleanRelativePath ? `${cleanRelativePath}/${newName}` : newName;

            // Handle duplicate filenames by keeping the first one or just overwrite (assuming uniqueness in context usually)
            // Ideally wikilinks are unique by filename in Obsidian usually, or relative. 
            // We will store just the basename as key for simple wikilinks [[Name]]
            fileMap.set(originalName, `/notes/${linkPath}`);
        }
    }
}

// Second pass: Process files
function processFiles(dir, relativePath = '') {
    const items = fs.readdirSync(dir);

    // Create corresponding target directory
    const cleanRelativePath = relativePath.split(path.sep).map(cleanName).join(path.sep);
    const targetDir = path.join(TARGET_CONTENT_DIR, cleanRelativePath);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    for (const item of items) {
        if (item.startsWith('.')) continue;
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processFiles(fullPath, path.join(relativePath, item));
        } else if (isImage(item)) {
            // Copy image to public/notes-images
            // We flat-map images to a single directory to match standard Obsidian attachment behavior often
            // Or we could keep structure. Let's keep it simple: flat map + unique checks if needed.
            // Obsidian typically puts all images in root or specific folder. 
            // For safety, let's just copy them to public/notes-images/filename
            // If there are duplicate image names in different folders, this might clash. 
            // Assuming unique image names for now as per typical Obsidian paste behavior.
            const targetPath = path.join(TARGET_IMAGE_DIR, item);
            fs.copyFileSync(fullPath, targetPath);
            console.log(`Copied image: ${item}`);
        } else if (item.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // 1. Fix Image Embeds: ![[Image.png]] -> ![Image.png](/notes-images/Image.png)
            content = content.replace(/!\[\[(.*?)\]\]/g, (match, filename) => {
                const cleanFilename = filename.trim();
                return `![${cleanFilename}](/notes-images/${cleanFilename})`;
            });

            // 2. Fix Wikilinks: [[Note Name]] -> [Note Name](/notes/path/to/Note_Name)
            // Also handles [[Note Name|Alias]]
            content = content.replace(/\[\[(.*?)\]\]/g, (match, content) => {
                const parts = content.split('|');
                const linkTarget = parts[0].trim();
                const linkText = parts.length > 1 ? parts[1].trim() : linkTarget;

                const targetPath = fileMap.get(linkTarget);
                if (targetPath) {
                    return `[${linkText}](${targetPath})`;
                } else {
                    // Start of a check if it might be an image/file link not caught earlier
                    if (isImage(linkTarget)) {
                        return `[${linkText}](/notes-images/${linkTarget})`;
                    }
                    // Fallback: just keep text if note not found
                    return linkText;
                }
            });

            // 3. Fix Standard Markdown Image Links if strictly local paths: ![Alt](Path/To/Image.png)
            // This is harder to generalize without breaking external links. 
            // We assume if it doesn't start with http, it's local.
            content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, uri) => {
                if (uri.startsWith('http') || uri.startsWith('/')) return match;
                // It's a relative path. We assume we flattened images to /notes-images
                const filename = path.basename(uri);
                if (isImage(filename)) {
                    return `![${alt}](/notes-images/${filename})`;
                }
                return match;
            });

            // Add Frontmatter if missing
            // We can infer title from filename
            const originalName = path.basename(item, '.md');
            if (!content.trim().startsWith('---')) {
                const title = originalName;
                const frontmatter = `---\ntitle: "${title}"\ndescription: "Note on ${title}"\ndate: "${new Date().toISOString().split('T')[0]}"\ntags: []\n---\n\n`;
                content = frontmatter + content;
            }

            const newName = cleanName(originalName) + '.md';
            const targetPath = path.join(targetDir, newName);
            fs.writeFileSync(targetPath, content);
            console.log(`Processed note: ${item} -> ${newName}`);
        }
    }
}

console.log('Indexing files...');
indexFiles(SOURCE_DIR);
console.log('Processing files...');
processFiles(SOURCE_DIR);
console.log('Migration complete!');
