import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import icon from 'astro-icon'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'
import { remarkModifiedTime } from './src/plugins/remark-modified-time.mjs'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

// https://astro.build/config
export default defineConfig({
	site: env.PUBLIC_SITE_URL || 'https://qucs.info',
	base: '/',
	output: 'server',
	adapter: cloudflare({
		mode: 'advanced',
		platformProxy: {
			enabled: true
		},
		functionPerRoute: false
	}),
	integrations: [
		react(),
		markdoc({ allowHTML: true }),
		keystatic(),
		mdx(),
		sitemap(),
		icon(),
		partytown({
			config: {
				forward: ['dataLayer.push'],
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@assets': '/src/assets',
				...(process.env.NODE_ENV === 'production' ? {
					'react-dom/server': 'react-dom/server.edge'
				} : {})
			}
		},
		define: {
			'process.env.KEYSTATIC_GITHUB_CLIENT_ID': JSON.stringify(env.KEYSTATIC_GITHUB_CLIENT_ID),
			'process.env.KEYSTATIC_GITHUB_CLIENT_SECRET': JSON.stringify(env.KEYSTATIC_GITHUB_CLIENT_SECRET),
			'process.env.KEYSTATIC_SECRET': JSON.stringify(env.KEYSTATIC_SECRET),
			'process.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG': JSON.stringify(env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG)
		}
	},
	markdown: {
		remarkPlugins: [remarkReadingTime, remarkModifiedTime],
		rehypePlugins: [rehypeAccessibleEmojis],
		shikiConfig: {
			theme: 'github-dark', // or 'github-light', 'dracula', 'monokai', etc.
			langs: [], // Add custom languages if needed
			wrap: true, // Enable word wrap
		},
	},
})
