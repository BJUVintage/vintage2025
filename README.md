# BJU Vintage 2025 - Svelte Project Structure

## Project Structure Overview
```
vintage-2025/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Header.svelte
│   │   │   ├── Navigation.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── EventCard.svelte
│   │   │   ├── GroupCard.svelte
│   │   │   ├── PhotoGallery.svelte
│   │   │   └── YearbookTheme.svelte
│   │   ├── utils/
│   │   │   ├── contentLoader.js
│   │   │   └── imageLoader.js
│   │   └── styles/
│   │       ├── variables.css
│   │       └── global.css
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte  (Home page)
│   │   ├── events/
│   │   │   ├── +page.svelte  (Events listing page)
│   │   │   └── [slug]/+page.svelte  (Individual event page)
│   │   ├── groups/
│   │   │   ├── +page.svelte  (Groups listing page)
│   │   │   └── [slug]/+page.svelte  (Individual group page)
│   │   ├── about/
│   │   │   └── +page.svelte  (About the yearbook/theme)
│   │   └── dedications/
│   │       └── +page.svelte  (Faculty/staff dedications)
│   ├── app.html
│   └── app.css
├── static/
│   ├── fonts/
│   ├── images/
│   │   ├── cover/
│   │   │   ├── cover-full.jpg
│   │   │   └── logo.png
│   │   ├── events/
│   │   │   ├── welcome-week/
│   │   │   │   ├── 1.jpg
│   │   │   │   ├── 2.jpg
│   │   │   │   └── ...
│   │   │   └── [other-events]/...
│   │   └── groups/
│   │       ├── robotics-team/
│   │       │   ├── 1.jpg
│   │       │   ├── 2.jpg
│   │       │   └── ...
│   │       └── [other-groups]/...
│   └── favicon.png
├── static/content/
│   ├── events/
│   │   ├── welcome-week.md
│   │   └── [other-events].md
│   ├── groups/
│   │   ├── robotics-team.md
│   │   └── [other-groups].md
│   ├── dedications/
│   │   └── dedications.md
│   └── about/
│       └── theme.md
├── package.json
├── svelte.config.js
└── vite.config.js
```

## Where to Put Content
- **Images**: Place in `/static/images/events/[event-name]/` or `/static/images/groups/[group-name]/`
- **Text Content**: Place in `/content/events/` or `/content/groups/` as markdown files

## How to Add New Events or Groups
1. Create a new folder in `/static/images/events/` or `/static/images/groups/` with the event/group name
2. Add images to this folder
3. Create a new markdown file in `/content/events/` or `/content/groups/` with the same name
4. The system will automatically include the new content on the website

## Performance Optimization for Images
For better performance with large image galleries:

1. Run the thumbnail generator script to create optimized versions of all images:
   ```bash
   # Install ImageMagick first (required for image processing)
   # Ubuntu/Debian: sudo apt-get install imagemagick
   # macOS: brew install imagemagick
   # Windows: Download from https://imagemagick.org/script/download.php

   # Then run the script
   node scripts/generate-thumbnails.js
   ```

2. This will create two optimized versions of each image:
   - `image_thumb.jpg` - Small thumbnail (180px height) for gallery view
   - `image_compressed.jpg` - Medium-sized version (1000px max) for faster viewing

3. The PhotoGallery component will automatically use these optimized versions when available, falling back to the original high-resolution image when needed.
