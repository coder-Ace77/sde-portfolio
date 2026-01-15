---
title: "React Hooks Deep Dive"
description: "Understanding useEffect, useMemo, and useCallback."
date: "2024-06-10"
tags: ["React", "Hooks"]
---

# React Hooks

Hooks allow function components to have access to state and other React features. Because of this, class components are generally no longer needed.

## Common Hooks

### useState

```javascript
const [count, setCount] = useState(0);
```

### useEffect

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```
