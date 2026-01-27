import { defineCollection, z } from 'astro:content'

const lectures = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		lectureDate: z.coerce.date(),
		speaker: z.string().optional(),
		speakerAffiliation: z.string().optional(),
		speakerBio: z.string().optional(),
		speakerEmail: z.string().optional(),
		links: z.array(z.object({
			label: z.string(),
			url: z.string(),
			type: z.enum(['slides', 'youtube', 'bilibili', 'other']).default('other'),
		})).optional(),
		updatedDate: z.coerce.date().optional(),
		coverImageUrl: z.string().optional(),
		coverImage: image().optional(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		visibility: z.enum(['public', 'unlisted', 'private']).default('public'),
		useMathJax: z.boolean().default(true),
	}),
})

const about = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
	}),
})

// Keystatic-managed collections
const settings = defineCollection({
	type: 'data',
	schema: z.object({
		// Settings managed by Keystatic singletons
	}),
})

export const collections = { lectures, about, settings }
