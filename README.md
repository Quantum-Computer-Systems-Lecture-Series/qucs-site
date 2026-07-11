# QuCS - Quantum Computer Systems Lecture Series

A website for the QuCS (Quantum Computer Systems) lecture series, built with Astro and Keystatic CMS.

## Tech Stack

This project uses the following technologies:

- Astro for static site generation and routing
- TypeScript for application logic and type safety
- Tailwind CSS for styling and responsive design
- Keystatic CMS for content editing with GitHub-backed storage
- Markdoc and MDX for content authoring
- Pagefind for fast static-site search
- React for interactive UI components
- gh-pages for publishing the built site to GitHub Pages

## Publishing to GitHub Pages

The site is published to GitHub Pages using the gh-pages package. The deployment script builds the site and publishes the generated static files to the gh-pages branch, which GitHub Pages serves.

## Development and Content Updates

The normal update workflow is:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open the local Keystatic admin panel at `/keystatic` to edit content locally.
4. Preview the site locally and confirm the changes.
5. Build and publish the site:
   ```bash
   npm run deploy
   ```

This workflow allows content editors to update the site locally through Keystatic, then build the site and publish it to the cloud through GitHub Pages.

## Features

- Headless CMS with Keystatic and GitHub-based content storage
- Team-friendly editing with GitHub authentication support
- Fast static search with Pagefind
- Lecture management with speaker information, videos, slides, and categories
- Responsive design with dark mode support

## License

MIT
