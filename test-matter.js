const matter = require('gray-matter');
const str = `---
title: "Ticketmaster"
description: ""
date: "2026-02-05"
---

---
`;
try {
    const res = matter(str);
    console.log("Success:", res);
} catch (e) {
    console.error("Error:", e);
}
