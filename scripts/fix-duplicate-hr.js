const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '../content/notes');

function cleanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Check for double HRs at start which confuse MDX parser
    // Pattern:
    // ---
    // frontmatter
    // ---
    // 
    // --- <-- This second HR is the issue if close to top

    let fmEnd = -1;
    if (lines[0].trim() === '---') {
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                fmEnd = i;
                break;
            }
        }
    }

    if (fmEnd > 0) {
        // Look for next HR
        let nextHr = -1;
        for (let i = fmEnd + 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            if (lines[i].trim() === '---') {
                nextHr = i;
                break;
            }
            break; // Found content before HR
        }

        if (nextHr > 0) {
            console.log(`Removing duplicate HR in ${filePath}`);
            lines[nextHr] = '';
            fs.writeFileSync(filePath, lines.join('\n'));
        }
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
