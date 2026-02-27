import type { APIRoute } from 'astro'
import { getEntry } from 'astro:content'

// Enable prerendering for these static files
export const prerender = true

export async function getStaticPaths() {
	const { getCollection } = await import('astro:content')
	const lectures = await getCollection('lectures', ({ data }) => {
		return data.visibility === 'public' || data.visibility === 'unlisted'
	})
	return lectures.map((lecture) => ({
		params: { slug: lecture.slug },
	}))
}

export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug
	if (!slug) {
		return new Response('Not found', { status: 404 })
	}

	const lecture = await getEntry('lectures', slug)

	if (!lecture || (lecture.data.visibility !== 'public' && lecture.data.visibility !== 'unlisted')) {
		return new Response('Not found', { status: 404 })
	}

	const { title, description, lectureDate, speaker } = lecture.data

	// Format date for ICS (YYYYMMDD)
	const year = lectureDate.getFullYear()
	const month = String(lectureDate.getMonth() + 1).padStart(2, '0')
	const day = String(lectureDate.getDate()).padStart(2, '0')
	const dateString = `${year}${month}${day}`
	
	// Next day for all-day event
	const nextDayDate = new Date(lectureDate)
	nextDayDate.setDate(nextDayDate.getDate() + 1)
	const nextYear = nextDayDate.getFullYear()
	const nextMonth = String(nextDayDate.getMonth() + 1).padStart(2, '0')
	const nextDayObj = String(nextDayDate.getDate()).padStart(2, '0')
	const nextDateString = `${nextYear}${nextMonth}${nextDayObj}`

	// Create UID
	const uid = `${slug}@qucs.info`

	// Current timestamp format YYYYMMDDTHHMMSSZ
	const now = new Date()
	const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

	let summary = title
	if (speaker) {
		summary += ` - ${speaker}`
	}

	// Escape text for ICS
	const cleanDescription = (description || '')
		.replace(/\\/g, '\\\\')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,')
		.replace(/\n/g, '\\n')
	
	const cleanSummary = summary
		.replace(/\\/g, '\\\\')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,')

	const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//QuCS Info//Lecture Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART;VALUE=DATE:${dateString}
DTEND;VALUE=DATE:${nextDateString}
SUMMARY:${cleanSummary}
DESCRIPTION:${cleanDescription}
URL:https://qucs.info/lectures/${slug}
END:VEVENT
END:VCALENDAR`.trim()

	return new Response(icsContent, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `attachment; filename="${slug}.ics"`,
		},
	})
}
