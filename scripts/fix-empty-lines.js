const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '../content/notes');

function cleanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let startIndex = 0;
    while (startIndex < lines.length && lines[startIndex].trim() === '') {
        startIndex++;
    }

    if (startIndex > 0) {
        const newContent = lines.slice(startIndex).join('\n');
        fs.writeFileSync(filePath, newContent);
        console.log(`Cleaned: ${filePath}`);
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
            cleanFile(filePath);
        }
    }
}

traverse(notesDir);
