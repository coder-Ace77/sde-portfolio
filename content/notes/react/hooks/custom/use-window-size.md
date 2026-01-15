---
title: "Creating Custom Hooks"
description: "How to extract logic into reusable hooks."
date: "2024-06-15"
tags: ["React", "Hooks", "Advanced"]
---

# Custom Hooks

Building your own hooks lets you extract component logic into reusable functions.

```javascript
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  return size;
}
```
