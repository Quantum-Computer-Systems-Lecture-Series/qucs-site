/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - URLs with additional parameters and timestamps
 */
export function extractYouTubeVideoId(url: string): string | null {
	if (!url) return null

	try {
		const urlObj = new URL(url)

		// Handle youtube.com/watch?v=VIDEO_ID format
		if (urlObj.hostname.includes('youtube.com') && urlObj.pathname === '/watch') {
			return urlObj.searchParams.get('v')
		}

		// Handle youtu.be/VIDEO_ID format
		if (urlObj.hostname === 'youtu.be') {
			return urlObj.pathname.slice(1) // Remove leading slash
		}

		// Handle youtube.com/embed/VIDEO_ID format
		if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
			return urlObj.pathname.split('/')[2]
		}

		return null
	} catch {
		return null
	}
}

/**
 * Generates YouTube thumbnail URL from video URL
 * Returns hqdefault (480x360) which is always available for all videos
 */
export function getYouTubeThumbnailUrl(videoUrl: string): string | null {
	const videoId = extractYouTubeVideoId(videoUrl)
	if (!videoId) return null

	// Use hqdefault (480x360) - always available for all videos
	return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

/**
 * Gets multiple YouTube thumbnail quality options
 */
export function getYouTubeThumbnailUrls(videoUrl: string) {
	const videoId = extractYouTubeVideoId(videoUrl)
	if (!videoId) return null

	return {
		maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, // 1280x720
		high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, // 480x360
		medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, // 320x180
		default: `https://img.youtube.com/vi/${videoId}/default.jpg`, // 120x90
	}
}
