const profiles = {
  'Rachel Green': {
    shortDescription: 'Fashion-forward, ambitious, and always growing into the next version of herself.',
    fullDescription:
      'Rachel brings warmth, style, and a little romantic chaos to the group. She starts as the friend reinventing herself and slowly becomes one of the most independent, career-driven characters in the show.',
    personalityTags: ['ambitious', 'romantic', 'dramatic'],
    job: 'fashion',
    relationshipStatus: 'on-and-off relationship',
    notableRelationships: ['Ross Geller', 'Barry Farber', 'Paolo', 'Tag Jones', 'Joey Tribbiani'],
    bestFriendGroup: 'Monica & Phoebe',
    memorableTrait: 'Turns messy life transitions into bold fresh starts.',
    apartment: "Monica's Apartment",
    accent: '#B86B4B',
  },
  'Monica Geller': {
    shortDescription: 'The organized heart of the group with chef energy and hostess perfectionism.',
    fullDescription:
      'Monica is competitive, deeply caring, and famously organized. She creates the emotional home base of the series while balancing ambition, loyalty, and some very lovable intensity.',
    personalityTags: ['organized', 'caring', 'ambitious'],
    job: 'chef',
    relationshipStatus: 'married',
    notableRelationships: ['Chandler Bing', 'Richard Burke', 'Alan', 'Pete Becker'],
    bestFriendGroup: 'Rachel & Phoebe',
    memorableTrait: 'Treats every dinner, holiday, and apartment detail like an event.',
    apartment: "Monica's Apartment",
    accent: '#8E6C88',
  },
  'Phoebe Buffay': {
    shortDescription: 'Offbeat, caring, and delightfully unpredictable with a softer spiritual side.',
    fullDescription:
      'Phoebe sees the world through her own wonderfully weird lens. Her kindness, honesty, and unexpected one-liners make her feel both eccentric and grounding at the same time.',
    personalityTags: ['awkward', 'caring', 'laid-back'],
    job: 'masseuse',
    relationshipStatus: 'married',
    notableRelationships: ['Mike Hannigan', 'David', 'Ryan', 'Duncan'],
    bestFriendGroup: 'Monica & Rachel',
    memorableTrait: 'Can go from cosmic wisdom to chaotic comedy in one sentence.',
    apartment: "Phoebe's Apartment",
    accent: '#556B5D',
  },
  'Joey Tribbiani': {
    shortDescription: 'Lovable, confident, and goofy with a big appetite and an even bigger heart.',
    fullDescription:
      'Joey is easygoing, loyal, and often the most delightfully unserious person in the room. Underneath the charm and comic timing, he is one of the most dependable friends in the group.',
    personalityTags: ['funny', 'laid-back', 'romantic'],
    job: 'actor',
    relationshipStatus: 'single',
    notableRelationships: ['Kathy', 'Sarah', 'Charlie Wheeler', 'Rachel Green'],
    bestFriendGroup: 'Chandler',
    memorableTrait: 'Makes loyalty feel effortless, even in the silliest situations.',
    apartment: "Joey and Chandler's Apartment",
    accent: '#D6A54B',
  },
  'Chandler Bing': {
    shortDescription: 'Sarcastic, secretly sweet, and built for one-liners under emotional pressure.',
    fullDescription:
      'Chandler uses humor as both armor and affection. He is witty, anxious, loyal, and surprisingly tender, which makes his arc one of the warmest emotional journeys in the group.',
    personalityTags: ['sarcastic', 'funny', 'caring'],
    job: 'office work',
    relationshipStatus: 'married',
    notableRelationships: ['Monica Geller', 'Janice', 'Kathy', 'Aurora'],
    bestFriendGroup: 'Joey',
    memorableTrait: 'Turns discomfort into legendary comic timing.',
    apartment: "Joey and Chandler's Apartment",
    accent: '#8E6C88',
  },
  'Ross Geller': {
    shortDescription: 'Smart, romantic, and endearingly awkward with a serious love of dinosaurs.',
    fullDescription:
      "Ross is thoughtful, intense, and often unintentionally hilarious. He brings academic energy, emotional sincerity, and some of the show's most iconic relationship drama.",
    personalityTags: ['awkward', 'romantic', 'caring'],
    job: 'paleontologist',
    relationshipStatus: 'complicated',
    notableRelationships: ['Rachel Green', 'Carol Willick', 'Emily Waltham', 'Elizabeth Stevens', 'Charlie Wheeler'],
    bestFriendGroup: 'Chandler & Joey',
    memorableTrait: 'Makes even expert lectures feel like emotional events.',
    apartment: "Ross's Apartment",
    accent: '#556B5D',
  },
}

const fallbackProfile = {
  shortDescription: 'A memorable face from the Friends universe with a place in the wider ensemble.',
  fullDescription:
    'This cast member helps fill out the world of Friends and brings extra texture to the group dynamic around the main six.',
  personalityTags: ['laid-back'],
  job: 'supporting role',
  relationshipStatus: 'best-friend dynamic',
  notableRelationships: [],
  bestFriendGroup: 'Friends ensemble',
  memorableTrait: 'Adds flavor to the wider Friends world.',
  apartment: 'Various New York locations',
  accent: '#B86B4B',
}

export const personalityOptions = [
  'funny',
  'sarcastic',
  'organized',
  'romantic',
  'awkward',
  'ambitious',
  'caring',
  'dramatic',
  'laid-back',
]

export const jobOptions = [
  'fashion',
  'chef',
  'masseuse',
  'actor',
  'office work',
  'paleontologist',
  'supporting role',
]

export const relationshipOptions = [
  'single',
  'complicated',
  'married',
  'best-friend dynamic',
  'on-and-off relationship',
]

export function getFriendProfile(characterName) {
  return profiles[characterName] ?? fallbackProfile
}

export function enrichCastEntry(entry, imageUrl) {
  const profile = getFriendProfile(entry.character.name)

  return {
    ...entry,
    ...profile,
    image: imageUrl,
    displayName: entry.person.name,
    characterName: entry.character.name,
  }
}
