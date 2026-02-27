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

	// Using placeholder time 08:00:00 to 10:00:00 as no specific time is provided yet
	const startTimeObj = `${dateString}T080000`
	const endTimeObj = `${dateString}T100000`

	// Create UID
	const uid = `${slug}@qucs.info`

	// Current timestamp format YYYYMMDDTHHMMSSZ
	const now = new Date()
	const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

	// Format the summary based on title, speaker, and affiliation
	const titleParts = title.split('|').map(s => s.trim())
	let lecNum = '';
	let lecTitle = title;
	if (titleParts.length >= 2 && !isNaN(Number(titleParts[0]))) {
		lecNum = `Lec${titleParts[0]}`;
		lecTitle = titleParts[1];
	} else {
		// Try to extract number from slug if title is not in '70 | Title' format
		const match = slug.match(/^(\d+)-/);
		lecNum = match ? `Lec${match[1]}` : 'Lec';
	}

	const speakerText = [speaker, lecture.data.speakerAffiliation].filter(Boolean).join('-');

	let summary = `${lecNum}|${lecTitle}`;
	if (speakerText) {
		summary += `|${speakerText}`;
	}

	// Extract only the abstract from the body
	let abstractText = '';
	if (lecture.body) {
		const match = lecture.body.match(/##\s*Abstract([\s\S]*?)(?=##|$)/i);
		if (match && match[1]) {
			abstractText = match[1].trim();
		} else {
			abstractText = lecture.body.trim();
		}
	} else if (description) {
		abstractText = description;
	}

	let fullDescription = abstractText;

	// Escape text for ICS
	const cleanDescription = fullDescription
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
DTSTART:${startTimeObj}
DTEND:${endTimeObj}
SUMMARY:${cleanSummary}
LOCATION:https://tinyurl.com/gucs-zoom
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
