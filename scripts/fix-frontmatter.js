const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const notesDir = path.join(__dirname, '../content/notes');

function ensureFrontmatter(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if file starts with ---
    if (content.trim().startsWith('---')) {
        // Check if there is a closing ---
        // We look for --- preceded by a newline, after the first 3 chars
        const parts = content.split('\n');
        let hasClosing = false;
        if (parts.length > 0 && parts[0].trim() === '---') {
            for (let i = 1; i < parts.length; i++) {
                if (parts[i].trim() === '---') {
                    hasClosing = true;
                    break;
                }
            }
        }

        if (hasClosing) {
            // Seemingly valid frontmatter
            // We could parse to verify simple fields
            try {
                const parsed = matter(content);
                if (!parsed.data.title) {
                    // Has frontmatter but no title? Add it.
                    // But for now, let's assume if it has valid FM syntax, it's okay-ish.
                    // Actually, let's verify title exists.
                    if (!parsed.data.title) {
                        console.log(`Fixing missing title in FM: ${filePath}`);
                        const title = path.basename(filePath, '.md').replace(/_/g, ' ');
                        const newContent = content.replace(/^---\n/, `---\ntitle: "${title}"\n`);
                        fs.writeFileSync(filePath, newContent);
                    }
                }
            } catch (e) {
                console.log(`Error parsing FM in ${filePath}, attempting fix.`);
            }
            return;
        } else {
            console.log(`Broken FM (unclosed) in: ${filePath}`);
            // It starts with --- but no closing. Treat the first --- as content (HR) or just garbage.
            // We will prepend valid frontmatter.
            // But wait, if we prepend, the original --- becomes content.
            const title = path.basename(filePath, '.md').replace(/_/g, ' ');
            const newFM = `---\ntitle: "${title}"\ndescription: ""\ndate: "${new Date().toISOString().split('T')[0]}"\n---\n\n`;
            fs.writeFileSync(filePath, newFM + content);
        }
    } else {
        // No frontmatter at all
        console.log(`No FM in: ${filePath}, adding it.`);
        const title = path.basename(filePath, '.md').replace(/_/g, ' ');
        const newFM = `---\ntitle: "${title}"\ndescription: ""\ndate: "${new Date().toISOString().split('T')[0]}"\n---\n\n`;
        fs.writeFileSync(filePath, newFM + content);
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
            ensureFrontmatter(filePath);
        }
    }
}

traverse(notesDir);
