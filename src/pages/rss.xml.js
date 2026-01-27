import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
	const lectures = await getCollection('lectures', ({ data }) => {
		return data.visibility === 'public'
	})
	return rss({
		// `<title>` field in output xml
		title: 'QuCS Lectures',
		// `<description>` field in output xml
		description:
			'Quantum Computing Society lecture series - exploring quantum computing from theory to practice',
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: lectures.map((lecture) => ({
			title: lecture.data.title,
			pubDate: lecture.data.lectureDate,
			description: lecture.data.description,
			// Compute RSS link from lecture slug
			link: `/lectures/${lecture.slug}/`,
		})),
	})
}
