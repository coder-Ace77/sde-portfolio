const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '../content/notes');

function encodeImageUrls(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex for markdown images: ![alt](url)
    const newContent = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
        // If url has spaces, encode them
        if (url.includes(' ')) {
            const encodedUrl = url.split(' ').join('%20');
            return `![${alt}](${encodedUrl})`;
        }
        return match;
    });

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Encoded image URLs in: ${filePath}`);
    }
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            traverse(filePath);
        } else if (file.endsWith('.md')) {
            encodeImageUrls(filePath);
        }
    }
}

traverse(notesDir);
