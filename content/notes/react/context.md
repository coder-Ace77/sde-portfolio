---
title: "React Context API"
description: "Managing global state without prop drilling."
date: "2024-06-12"
tags: ["React", "State Management"]
---

# Context API

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## Usage

1. **Create Context**: `const MyContext = React.createContext(defaultValue);`
2. **Provider**: `<MyContext.Provider value={/* some value */}>`
3. **Consumer (Hook)**: `const value = useContext(MyContext);`
