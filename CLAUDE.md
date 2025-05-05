# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build/Development Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Watch for type errors
npm run check:watch
```

## Code Style Guidelines
- **File Structure**: Components in `src/lib/components/`, routes in `src/routes/`, utilities in `src/lib/utils/`
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for CSS classes
- **Imports**: Framework imports first, then third-party, then internal components/utilities
- **JavaScript**: ES modules, JSDoc comments, TypeScript checking enabled
- **Components**: Script first, template second, styles last (scoped)
- **Error Handling**: Use try/catch around async code, provide fallbacks
- **API Routes**: Use SvelteKit's `+server.js` convention, return appropriate status codes
- **CSS**: Component-scoped styles, flexbox layouts, custom properties for theming
- **Content**: Markdown files with frontmatter for metadata in `static/content/`