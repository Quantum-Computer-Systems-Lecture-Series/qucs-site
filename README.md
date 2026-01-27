# QuCS - Quantum Computing Seminar Website

A modern, searchable website for the QuCS (Quantum Computing Seminar) lecture series, built with Astro and Keystatic CMS.

## Features

- **Headless CMS**: Keystatic CMS with GitHub-based storage for easy content management
- **Multiple Editors**: GitHub OAuth authentication allows multiple team members to edit content
- **Fast Search**: Pagefind-powered static search for quick lecture discovery
- **Lecture Management**: Dedicated collection for lectures with speaker info, videos, and slides
- **Team Section**: Manage organizer profiles and information
- **Responsive Design**: Mobile-first design with dark mode support
- **SEO Optimized**: Built-in sitemap, RSS feed, and meta tags
- **Type-Safe**: Full TypeScript support with Zod schemas

## Quick Start

### Prerequisites

- Node.js 18+ or Yarn
- Git
- GitHub account

### Installation

1. Navigate to the project directory:
```bash
cd ~/Projects/QuCS-site
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your GitHub OAuth credentials (see Configuration section below).

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:4321` to see your site and `http://localhost:4321/keystatic` for the CMS admin panel.

## Configuration

### GitHub OAuth for Multiple Editors

To allow multiple editors to access the Keystatic CMS:

1. **Create a GitHub OAuth App**:
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: QuCS Keystatic CMS
     - **Homepage URL**: `https://www.qucs.info` (your production URL)
     - **Authorization callback URL**: `https://www.qucs.info/api/keystatic/github/oauth/callback`
   - Click "Register application"

2. **Copy credentials**:
   - Copy the **Client ID**
   - Click "Generate a new client secret" and copy the **Client Secret**

3. **Update `.env` file**:
```env
KEYSTATIC_GITHUB_CLIENT_ID=your_client_id_here
KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret_here
KEYSTATIC_SECRET=generate_a_random_secret_string
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=qucs-keystatic
```

4. **Grant repository access**:
   - Create a GitHub repository (e.g., `HisenZhang/qucs-site`)
   - Update `keystatic.config.ts` with your repo name:
     ```typescript
     storage: {
       kind: 'github',
       repo: 'YourUsername/qucs-site',
     },
     ```
   - Add collaborators to the repository who should have editing access

### Adding Editors

Any GitHub user with write access to the repository can:
1. Visit `https://www.qucs.info/keystatic`
2. Click "Sign in with GitHub"
3. Authorize the OAuth app
4. Start editing content

The changes are automatically committed to the GitHub repository.

## Content Structure

### Lectures Collection

Each lecture includes:
- Title and description
- Speaker information (name, affiliation, bio)
- Lecture date
- Video URL (YouTube, etc.)
- Slides URL
- Cover image
- Category (Fundamentals, Compilation, Error Correction, etc.)
- Tags for filtering
- Visibility control (public, unlisted, private)
- MathJax support for mathematical formulas

### Team/Organizers

Manage organizer profiles with:
- Name and affiliation
- Role (Organizer, Co-organizer)
- Bio
- Email and website
- Photo

### Site Settings

Configure via Keystatic singletons:
- SEO & site metadata
- Navigation menu
- Social media links
- Footer content
- Home page sections

## Search Functionality

The site uses Pagefind for fast, static search:

1. **Automatic indexing**: Search index is built during `npm run build`
2. **Real-time search**: Client-side search with instant results
3. **Highlight matching**: Search terms are highlighted in results
4. **No external dependencies**: All search runs locally in the browser

To use search in your templates:
```astro
---
import Search from '@/components/Search.astro';
---

<Search placeholder="Search lectures..." />
```

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes search indexing)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
QuCS-site/
├── src/
│   ├── cms/                  # Keystatic CMS configuration
│   │   ├── collections/      # Content collections (lectures, posts)
│   │   └── singletons/       # Global settings (team, navigation, etc.)
│   ├── content/              # Content files
│   │   ├── lectures/         # Lecture .mdoc files
│   │   ├── settings/         # Site settings .yaml files
│   │   └── config.ts         # Astro content collection schemas
│   ├── components/           # Reusable Astro components
│   │   ├── Search.astro      # Search component
│   │   ├── Navbar.astro      # Navigation
│   │   └── ...
│   ├── layouts/              # Page layouts
│   ├── pages/                # File-based routing
│   ├── assets/               # Images and media
│   └── styles/               # Global styles
├── public/                   # Static assets
├── astro.config.mjs          # Astro configuration
├── keystatic.config.ts       # Keystatic CMS configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json
```

## Deployment

### Cloudflare Pages

1. **Build command**: `npm run build`
2. **Output directory**: `dist`
3. **Environment variables**: Add your `.env` variables in Cloudflare dashboard

Deploy with:
```bash
npm run deploy
```

### Other Platforms

The site can be deployed to:
- Vercel
- Netlify
- Any static hosting with Node.js support

Make sure to:
1. Set environment variables
2. Configure build command to include `pagefind` indexing
3. Set output directory to `dist`

## Customization

### Theme Colors

The site uses QuCS brand colors defined in `src/styles/global.css`:

```css
--color-primary: #24427F;        /* RGB(36, 66, 127) - QuCS Blue */
--color-primary-dark: #6B8BC3;   /* Lighter variant for dark mode */
```

To customize, edit the CSS custom properties in the global styles.

### Adding New Content Types

1. Create a new collection in `src/cms/collections/`
2. Add schema definition
3. Export from `src/cms/collections/index.ts`
4. Import in `keystatic.config.ts`
5. Add to Astro content config in `src/content/config.ts`
6. Create page templates in `src/pages/`

## Support

For issues or questions:
- GitHub Issues: [Repository Issues](https://github.com/HisenZhang/qucs-site/issues)
- Documentation: [Keystatic Docs](https://keystatic.com/docs), [Astro Docs](https://docs.astro.build)

## License

MIT License - feel free to use this for your own projects!

---

Built with [Astro](https://astro.build) and [Keystatic](https://keystatic.com)
