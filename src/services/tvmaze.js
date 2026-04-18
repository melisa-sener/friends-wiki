export const API_BASE_URL = 'https://api.tvmaze.com'
export const FRIENDS_SHOW_ID = 431

async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`TVmaze request failed with status ${response.status}.`)
  }

  return response.json()
}

export function stripHtml(value = '') {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function truncateText(value = '', maxLength = 140) {
  const normalized = stripHtml(value)

  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, maxLength).trimEnd()}...`
}

export function formatLongDate(value) {
  if (!value) {
    return 'Unknown'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(date)
}

export function formatShortDate(value) {
  if (!value) {
    return 'Unknown'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatEpisodeCode(seasonNumber, episodeNumber) {
  return `S${String(seasonNumber).padStart(2, '0')}E${String(episodeNumber).padStart(2, '0')}`
}

export function formatRating(value) {
  return typeof value === 'number' ? value.toFixed(1) : 'N/A'
}

export function getImageUrl(image, size = 'medium') {
  if (!image) {
    return ''
  }

  return image[size] || image.original || image.medium || ''
}

export function fetchFriendsShow() {
  return fetchJson(`/shows/${FRIENDS_SHOW_ID}`)
}

export function fetchFriendsSeasons() {
  return fetchJson(`/shows/${FRIENDS_SHOW_ID}/seasons`)
}

export function fetchFriendsEpisodes() {
  return fetchJson(`/shows/${FRIENDS_SHOW_ID}/episodes`)
}

export function fetchFriendsCast() {
  return fetchJson(`/shows/${FRIENDS_SHOW_ID}/cast`)
}

export function fetchEpisodeById(episodeId) {
  return fetchJson(`/episodes/${episodeId}`)
}

export function fetchPersonById(personId) {
  return fetchJson(`/people/${personId}`)
}
