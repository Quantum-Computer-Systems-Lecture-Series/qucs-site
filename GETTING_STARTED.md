# Getting Started with QuCS Website

Welcome to the QuCS website project! This guide will help you get up and running quickly.

## What's Been Set Up

Your QuCS website is now ready with:

- Astro + Keystatic CMS framework (same as your personal blog)
- **Lectures collection** for managing quantum computing seminar content
- **Team section** for organizer profiles
- **Search functionality** using Pagefind
- **Multiple editor support** via GitHub OAuth
- QuCS brand colors (RGB 36, 66, 127 / #24427F)
- Responsive design with dark mode

## Next Steps

### 1. Set Up GitHub Repository

Create a new GitHub repository for this project:

```bash
# Option 1: Using GitHub CLI (if installed)
cd ~/Projects/QuCS-site
gh repo create qucs-site --public --source=. --remote=origin

# Option 2: Manual
# 1. Go to https://github.com/new
# 2. Create repository named "qucs-site"
# 3. Then run:
cd ~/Projects/QuCS-site
git remote add origin https://github.com/YOUR_USERNAME/qucs-site.git
git add .
git commit -m "Initial QuCS website setup"
git push -u origin master
```

### 2. Configure Keystatic for Multiple Editors

1. **Update the repo in configuration**:

   Edit `keystatic.config.ts` and change line 7-8:
   ```typescript
   storage: {
     kind: 'github',
     repo: 'YOUR_GITHUB_USERNAME/qucs-site', // Update this!
   },
   ```

2. **Create GitHub OAuth App**:

   - Visit https://github.com/settings/developers
   - Click "New OAuth App"
   - Fill in:
     - Application name: `QuCS Keystatic CMS`
     - Homepage URL: `http://localhost:4321` (for development)
     - Callback URL: `http://localhost:4321/api/keystatic/github/oauth/callback`
   - Click "Register application"
   - Copy the Client ID
   - Click "Generate a new client secret" and copy it

3. **Set up environment variables**:

   ```bash
   cd ~/Projects/QuCS-site
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:
   ```env
   KEYSTATIC_GITHUB_CLIENT_ID=your_client_id_here
   KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret_here
   KEYSTATIC_SECRET=any_random_string_here
   PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=qucs-keystatic
   
   # Optional: Local Development Overrides
   # PUBLIC_GITHUB_REPO=langxubai/qucs-site
   # PUBLIC_SITE_URL=http://127.0.0.1:4321
   # PUBLIC_TOOLS_URL=http://127.0.0.1:4321
   ```

4. **Add collaborators**:

   Go to your GitHub repo settings and add team members as collaborators.

### 3. Start Development Server

```bash
cd ~/Projects/QuCS-site
npm run dev
```

- Website: http://localhost:4321
- CMS Admin: http://localhost:4321/keystatic

### 4. Add Your First Lecture

1. Visit http://localhost:4321/keystatic
2. Click "Sign in with GitHub"
3. Navigate to "Lectures" in the sidebar
4. Click "Create lecture"
5. Fill in the lecture details:
   - Title (e.g., "Introduction to Quantum Computing")
   - Speaker name and affiliation
   - Lecture date
   - Description
   - Video URL (YouTube link)
   - Slides URL
   - Category (Fundamentals, Compilation, etc.)
   - Content (using the Markdoc editor)
6. Set visibility to "Public"
7. Click "Save"

The content will be committed to your GitHub repository automatically.

### 5. Customize Site Settings

Edit these singletons in Keystatic admin:

- **SEO**: Site title, description, OG image
- **Home**: Welcome text, hero section
- **Navigation**: Menu links
- **Social**: Social media links
- **Team**: Add organizer profiles
- **Footer**: Footer links and copyright

## Testing Search

1. Add a few lectures via Keystatic
2. Build the site: `npm run build`
3. Preview: `npm run preview`
4. The search index will be generated automatically
5. Try searching for lecture titles or speakers

## Deployment

### For Production (Cloudflare Pages)

1. **Update OAuth App** for production:
   - Go back to https://github.com/settings/developers
   - Update your OAuth app:
     - Homepage URL: `https://www.qucs.info`
     - Callback URL: `https://www.qucs.info/api/keystatic/github/oauth/callback`

2. **Deploy to Cloudflare Pages**:
   - Connect your GitHub repo in Cloudflare Pages dashboard
   - Build command: `npm run build`
   - Build output: `dist`
   - Add environment variables from your `.env` file

3. **Or use the deploy script**:
   ```bash
   npm run deploy
   ```

## File Structure

Key files you'll be working with:

```
QuCS-site/
├── src/
│   ├── cms/
│   │   ├── collections/
│   │   │   └── lectures.ts      # Lecture schema
│   │   └── singletons/
│   │       ├── team.ts          # Team/organizer profiles
│   │       ├── home.ts          # Homepage settings
│   │       └── ...
│   ├── content/
│   │   ├── lectures/            # Lecture content (auto-managed by Keystatic)
│   │   └── settings/            # Site settings (auto-managed)
│   ├── components/
│   │   └── Search.astro         # Search component
│   └── pages/
│       └── ...                  # Add your page routes here
├── keystatic.config.ts          # CMS configuration
├── astro.config.mjs             # Astro configuration
└── .env                         # Environment variables (don't commit!)
```

## Common Tasks

### Adding a New Content Type

1. Create schema in `src/cms/collections/` or `src/cms/singletons/`
2. Export it from index file
3. Import in `keystatic.config.ts`
4. Add to Astro content config in `src/content/config.ts`
5. Create page template in `src/pages/`

### Customizing Styles

Edit `src/styles/global.css` to change:
- Colors (theme variables)
- Fonts
- Layout utilities

### Changing Theme Colors

Edit the CSS custom properties in `src/styles/global.css`:
```css
--color-primary: #24427F;        /* Your primary color */
--color-primary-dark: #6B8BC3;   /* Dark mode variant */
```

## Tips

- **Always test locally** before deploying
- **Use the CMS** for content - don't edit `.mdoc` files manually
- **Commit regularly** to track changes
- **Check the build** with `npm run build` to catch errors early
- **Search only works after build** - run `npm run build` then `npm run preview` to test

## Getting Help

- [Astro Documentation](https://docs.astro.build)
- [Keystatic Documentation](https://keystatic.com/docs)
- [Pagefind Documentation](https://pagefind.app/)
- Check `README.md` for detailed information

## Contact

For questions about this setup, contact the development team or open an issue on GitHub.

---

Happy building!
