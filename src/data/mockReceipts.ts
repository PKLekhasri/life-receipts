import { LifeReceipt } from '../types/receipt';

export const RAW_MOCK_RECEIPTS: LifeReceipt[] = [
  // --- CLUSTER 1: Late Night Creative Session (Jan 5, 2026) ---
  {
    id: 'rcpt-001',
    timestamp: '2026-01-05T23:15:00.000Z',
    category: 'Music',
    title: 'Midnight City',
    description: 'Played ambient synthwave track while working on digital scrapbook design.',
    location: 'Chennai Coastline',
    latitude: 13.0827,
    longitude: 80.2707,
    people: ['Solo'],
    tags: ['ambient', 'late-night', 'creative', 'focus'],
    source: 'Spotify',
    duration: 243,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    importanceScore: 8,
    metadata: {
      artist: 'M83',
      album: 'Hurry Up, We\'re Dreaming',
      durationMinutes: 4.05,
      playedAt: '11:15 PM'
    }
  },
  {
    id: 'rcpt-002',
    timestamp: '2026-01-05T23:42:00.000Z',
    category: 'Searches',
    title: 'best late night ambient music for deep focus',
    description: 'Searched for electronic music tracks with atmospheric synth sounds.',
    location: 'Chennai Coastline',
    latitude: 13.0827,
    longitude: 80.2707,
    tags: ['late-night', 'focus', 'music-discovery'],
    source: 'Google Search',
    metadata: {
      searchQuery: 'best late night ambient music for deep focus',
      engine: 'Google'
    }
  },
  {
    id: 'rcpt-003',
    timestamp: '2026-01-06T00:10:00.000Z',
    category: 'Purchases',
    title: 'Double Espresso & Dark Roast',
    description: 'Purchased midnight coffee refill at Craft Coffee Roasters drive-thru.',
    location: 'Craft Coffee Roasters, Chennai',
    latitude: 13.0012,
    longitude: 80.2565,
    amount: 240,
    tags: ['coffee', 'late-night', 'fuel', 'cafe'],
    source: 'GPay / HDFC',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    importanceScore: 7,
    metadata: {
      merchant: 'Craft Coffee Roasters',
      amountInINR: 240,
      paymentMethod: 'UPI'
    }
  },
  {
    id: 'rcpt-004',
    timestamp: '2026-01-06T00:35:00.000Z',
    category: 'Notes',
    title: 'Midnight Sparks & Creative Flow',
    description: 'Note written during coffee break: "There is a rare clarity after midnight when the noise stops."',
    location: 'Craft Coffee Roasters, Chennai',
    tags: ['reflections', 'late-night', 'creative', 'journal'],
    source: 'Apple Notes',
    importanceScore: 9,
    metadata: {
      noteTitle: 'Midnight Sparks & Creative Flow',
      mood: 'Reflective & Energetic',
      wordCount: 142
    }
  },
  {
    id: 'rcpt-005',
    timestamp: '2026-01-06T01:05:00.000Z',
    category: 'Photos',
    title: 'Neon Lights & Rainy Asphalt',
    description: 'Captured night walk view outside the coffee house under warm street lamps.',
    location: 'Craft Coffee Roasters, Chennai',
    latitude: 13.0012,
    longitude: 80.2565,
    people: ['Self'],
    tags: ['photography', 'night-walk', 'urban', 'mood'],
    source: 'Google Photos',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80',
    importanceScore: 8,
    metadata: {
      caption: 'Neon Lights & Rainy Asphalt',
      cameraDevice: 'Pixel 8 Pro',
      focalLength: '24mm'
    }
  },

  // --- CLUSTER 2: Weekend Exploration & Beach Outing (Jan 10, 2026) ---
  {
    id: 'rcpt-006',
    timestamp: '2026-01-10T16:20:00.000Z',
    category: 'Places',
    title: 'Besant Nagar Promenade Walk',
    description: 'Visited seaside promenade for weekend evening ocean breeze.',
    location: 'Besant Nagar Beach, Chennai',
    latitude: 12.9984,
    longitude: 80.2718,
    people: ['Aarav', 'Riya'],
    tags: ['coastal', 'weekend', 'beach', 'walk'],
    source: 'Google Maps Timeline',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    importanceScore: 9,
    metadata: {
      latitude: 12.9984,
      longitude: 80.2718,
      stayDurationMinutes: 110
    }
  },
  {
    id: 'rcpt-007',
    timestamp: '2026-01-10T17:05:00.000Z',
    category: 'Photos',
    title: 'Golden Hour Waves',
    description: 'Photo of orange sunset reflecting across wet sand shore.',
    location: 'Besant Nagar Beach, Chennai',
    people: ['Aarav', 'Riya'],
    tags: ['coastal', 'photography', 'sunset', 'beach'],
    source: 'Google Photos',
    imageUrl: 'https://images.unsplash.com/photo-1495954222046-2c427ecb546d?w=600&auto=format&fit=crop&q=80',
    importanceScore: 9,
    metadata: {
      caption: 'Golden Hour Waves with friends',
      cameraDevice: 'Pixel 8 Pro'
    }
  },
  {
    id: 'rcpt-008',
    timestamp: '2026-01-10T17:45:00.000Z',
    category: 'Purchases',
    title: 'Artisan Sea Salt Gelato & Ice Tea',
    description: 'Bought afternoon refreshments by the promenade cafe.',
    location: 'Besant Nagar Beach, Chennai',
    amount: 380,
    tags: ['weekend', 'food', 'beach', 'cafe'],
    source: 'GPay / ICICI',
    metadata: {
      merchant: 'Gelato Studio',
      amountInINR: 380
    }
  },
  {
    id: 'rcpt-009',
    timestamp: '2026-01-10T18:30:00.000Z',
    category: 'Messages',
    title: 'Shared beach sunset photos in Group Chat',
    description: 'Sent 4 golden hour ocean captures to "Weekend Adventurers" group.',
    location: 'Besant Nagar Beach, Chennai',
    people: ['Aarav', 'Riya', 'Kavya'],
    tags: ['social', 'weekend', 'beach', 'sharing'],
    source: 'WhatsApp',
    metadata: {
      sender: 'Me',
      recipient: 'Weekend Adventurers',
      mediaCount: 4
    }
  },
  {
    id: 'rcpt-010',
    timestamp: '2026-01-10T20:15:00.000Z',
    category: 'Music',
    title: 'Yellow',
    description: 'Played acoustic anthem while driving back from coastal road trip.',
    location: 'ECR Highway, Chennai',
    people: ['Aarav'],
    tags: ['roadtrip', 'acoustic', 'chill', 'music'],
    source: 'Spotify',
    duration: 269,
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    metadata: {
      artist: 'Coldplay',
      album: 'Parachutes',
      playedAt: '8:15 PM'
    }
  },

  // --- CLUSTER 3: Cultural Showcase & Vinyl Purchase (Jan 18, 2026) ---
  {
    id: 'rcpt-011',
    timestamp: '2026-01-18T14:30:00.000Z',
    category: 'Events',
    title: 'Chennai Indie Music Showcase',
    description: 'Attended live indie acoustic band performance at Central Cultural Hub.',
    location: 'Central Cultural Hub, Chennai',
    latitude: 13.0604,
    longitude: 80.2496,
    people: ['Kavya', 'Siddharth'],
    tags: ['concert', 'live-music', 'indie', 'culture'],
    source: 'BookMyShow',
    amount: 750,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&auto=format&fit=crop&q=80',
    importanceScore: 10,
    metadata: {
      eventName: 'Chennai Indie Showcase 2026',
      ticketCount: 2,
      venue: 'Main Auditorium'
    }
  },
  {
    id: 'rcpt-012',
    timestamp: '2026-01-18T16:00:00.000Z',
    category: 'Purchases',
    title: 'Vintage Vinyl Record - Daft Punk Discovery',
    description: 'Discovered rare vinyl press at vintage music stall near event venue.',
    location: 'Groove Record Store, Chennai',
    amount: 1850,
    tags: ['music-collection', 'vinyl', 'shopping', 'indie'],
    source: 'Credit Card',
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    importanceScore: 9,
    metadata: {
      merchant: 'Groove Record Store',
      item: 'Daft Punk - Discovery 2LP Vinyl'
    }
  },
  {
    id: 'rcpt-013',
    timestamp: '2026-01-18T16:40:00.000Z',
    category: 'Photos',
    title: 'Unboxing Rare Vinyl Record',
    description: 'Snapshot of vintage vinyl sleeve resting on wood coffee table.',
    location: 'Groove Record Store Cafe',
    people: ['Kavya'],
    tags: ['vinyl', 'photography', 'music', 'memories'],
    source: 'Google Photos',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop&q=80',
    metadata: {
      caption: 'Finally added Discovery to the collection!'
    }
  },
  {
    id: 'rcpt-014',
    timestamp: '2026-01-18T17:15:00.000Z',
    category: 'Music',
    title: 'Veridis Quo',
    description: 'Tested newly purchased vinyl track at store listening booth.',
    location: 'Groove Record Store, Chennai',
    tags: ['vinyl', 'electronic', 'classic', 'music'],
    source: 'Turntable / Spotify',
    duration: 344,
    metadata: {
      artist: 'Daft Punk',
      album: 'Discovery'
    }
  },
  {
    id: 'rcpt-015',
    timestamp: '2026-01-18T18:00:00.000Z',
    category: 'Searches',
    title: 'how to clean and preserve vintage vinyl records',
    description: 'Looked up proper care tips for vintage LP records.',
    location: 'Groove Record Store Cafe',
    tags: ['search', 'vinyl', 'care-guide'],
    source: 'Google Search',
    metadata: {
      searchQuery: 'how to clean and preserve vintage vinyl records'
    }
  },

  // --- CLUSTER 4: Deep Work & Film Marathon Phase (Jan 25 - Jan 28, 2026) ---
  {
    id: 'rcpt-016',
    timestamp: '2026-01-25T21:00:00.000Z',
    category: 'Movies',
    title: 'Interstellar',
    description: 'Rewatched Sci-Fi masterpiece late Sunday evening on home theater setup.',
    location: 'Home Workspace',
    people: ['Solo'],
    tags: ['sci-fi', 'movie', 'cinema', 'favorite'],
    source: 'Netflix',
    duration: 169,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    importanceScore: 8,
    metadata: {
      movieTitle: 'Interstellar',
      director: 'Christopher Nolan',
      platform: 'Netflix',
      userRating: '10/10'
    }
  },
  {
    id: 'rcpt-017',
    timestamp: '2026-01-25T23:55:00.000Z',
    category: 'Music',
    title: 'Time',
    description: 'Listening to cinematic score on repeat while sketching space art ideas.',
    location: 'Home Workspace',
    tags: ['soundtrack', 'focus', 'cinematic', 'night'],
    source: 'Apple Music',
    duration: 275,
    metadata: {
      artist: 'Hans Zimmer',
      album: 'Interstellar Original Soundtrack'
    }
  },
  {
    id: 'rcpt-018',
    timestamp: '2026-01-26T00:20:00.000Z',
    category: 'Notes',
    title: 'Cosmic Scales & Time Perception',
    description: 'Reflections after watching Interstellar: "Time is the ultimate luxury we spend without noticing."',
    location: 'Home Workspace',
    tags: ['journal', 'philosophy', 'reflections', 'night'],
    source: 'Apple Notes',
    importanceScore: 8,
    metadata: {
      noteTitle: 'Cosmic Scales & Time Perception',
      mood: 'Philosophical'
    }
  },
  {
    id: 'rcpt-019',
    timestamp: '2026-01-26T14:10:00.000Z',
    category: 'Searches',
    title: 'hans zimmer live concert tour dates 2026 Asia',
    description: 'Searched for upcoming Hans Zimmer live orchestra show dates.',
    location: 'Central Library, Chennai',
    tags: ['search', 'music', 'concert'],
    source: 'Google Search',
    metadata: {
      searchQuery: 'hans zimmer live concert tour dates 2026 Asia'
    }
  },
  {
    id: 'rcpt-020',
    timestamp: '2026-01-26T15:30:00.000Z',
    category: 'Purchases',
    title: 'Architectural Design Notebook & Micron Pens',
    description: 'Bought grid notebooks and drawing fineliners for storyboarding.',
    location: 'Central Stationery, Chennai',
    amount: 620,
    tags: ['supplies', 'stationery', 'creative', 'shopping'],
    source: 'UPI / Paytm',
    metadata: {
      merchant: 'Central Stationery',
      items: ['Grid Journal A5', 'Sakura Micron 0.3mm']
    }
  },

  // --- CLUSTER 5: Coastal Photography & Cafe Routine (Feb 02 - Feb 04, 2026) ---
  {
    id: 'rcpt-021',
    timestamp: '2026-02-02T07:15:00.000Z',
    category: 'Places',
    title: 'Marina Promenade Sunrise',
    description: 'Early morning seaside stroll during misty dawn high tide.',
    location: 'Marina Promenade, Chennai',
    latitude: 13.0500,
    longitude: 80.2824,
    people: ['Solo'],
    tags: ['coastal', 'sunrise', 'morning-routine', 'walk'],
    source: 'Google Maps Timeline',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    importanceScore: 8,
    metadata: {
      stayDurationMinutes: 75
    }
  },
  {
    id: 'rcpt-022',
    timestamp: '2026-02-02T07:45:00.000Z',
    category: 'Photos',
    title: 'Fisherman Boats at Morning Tide',
    description: 'Shot on vintage 35mm film camera with 50mm lens.',
    location: 'Marina Promenade, Chennai',
    tags: ['photography', 'coastal', 'film', 'morning'],
    source: 'Google Photos',
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&auto=format&fit=crop&q=80',
    importanceScore: 9,
    metadata: {
      caption: 'Fisherman Boats at Morning Tide',
      filmStock: 'Kodak Portra 400'
    }
  },
  {
    id: 'rcpt-023',
    timestamp: '2026-02-02T08:30:00.000Z',
    category: 'Purchases',
    title: 'Filter Coffee & Steamed Idli Breakfast',
    description: 'Post-walk breakfast at traditional heritage canteen.',
    location: 'Heritage Cafe, Chennai',
    amount: 140,
    tags: ['food', 'breakfast', 'heritage', 'routine'],
    source: 'GPay',
    metadata: {
      merchant: 'Heritage Cafe',
      amountInINR: 140
    }
  },
  {
    id: 'rcpt-024',
    timestamp: '2026-02-02T09:10:00.000Z',
    category: 'Messages',
    title: 'Morning walk photos sent to Dad',
    description: 'Sent morning coastal views and breakfast updates home.',
    people: ['Dad'],
    tags: ['family', 'morning', 'sharing'],
    source: 'WhatsApp',
    metadata: {
      recipient: 'Dad',
      topic: 'Morning coastal walk'
    }
  },
  {
    id: 'rcpt-025',
    timestamp: '2026-02-04T19:20:00.000Z',
    category: 'Music',
    title: 'Acid Rain',
    description: 'Distant distorted bass synth beats during quiet evening walk.',
    location: 'Craft Coffee Roasters, Chennai',
    tags: ['electronic', 'dark-synth', 'night', 'music'],
    source: 'Spotify',
    duration: 212,
    metadata: {
      artist: 'Lorn',
      album: 'Vessel'
    }
  },

  // --- CLUSTER 6: Tech & Art Design Meetup (Feb 12, 2026) ---
  {
    id: 'rcpt-026',
    timestamp: '2026-02-12T15:00:00.000Z',
    category: 'Events',
    title: 'Tech & Creative Data Visualization Meetup',
    description: 'Attended regional community gathering on UI storytelling & interactive analytics.',
    location: 'Design Studio Hub, Chennai',
    latitude: 13.0418,
    longitude: 80.2341,
    people: ['Priya', 'Rohan', 'Vikram'],
    tags: ['meetup', 'design', 'tech', 'data-viz', 'learning'],
    source: 'Meetup.com',
    amount: 300,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    importanceScore: 10,
    metadata: {
      eventName: 'Creative Tech Con 2026',
      role: 'Attendee',
      sessions: ['Storytelling in Frontend', 'Generative Canvas UI']
    }
  },
  {
    id: 'rcpt-027',
    timestamp: '2026-02-12T17:30:00.000Z',
    category: 'Notes',
    title: 'Key Takeaways from UI Storytelling Workshop',
    description: 'Note: "Data without narrative is just noise. Highlighting connections turns raw timestamps into emotional stories."',
    location: 'Design Studio Hub, Chennai',
    tags: ['meetup', 'notes', 'learning', 'design-thinking'],
    source: 'Apple Notes',
    importanceScore: 9,
    metadata: {
      noteTitle: 'Key Takeaways from UI Storytelling Workshop',
      wordCount: 210
    }
  },
  {
    id: 'rcpt-028',
    timestamp: '2026-02-12T18:15:00.000Z',
    category: 'Purchases',
    title: 'Iced Matcha & Avocado Toast',
    description: 'Post-meetup networking session snack with fellow attendees.',
    location: 'Design Studio Hub Cafe',
    amount: 450,
    tags: ['networking', 'cafe', 'meetup', 'food'],
    source: 'GPay',
    metadata: {
      merchant: 'Studio Cafe',
      amountInINR: 450
    }
  },
  {
    id: 'rcpt-029',
    timestamp: '2026-02-12T19:00:00.000Z',
    category: 'Messages',
    title: 'Exchanged GitHub profiles with Priya',
    description: 'Sent link to interactive data project repo after the workshop.',
    people: ['Priya'],
    tags: ['networking', 'tech', 'connections'],
    source: 'LinkedIn / Messages',
    metadata: {
      recipient: 'Priya (UI Designer)',
      topic: 'Frontend Portfolio Swap'
    }
  },
  {
    id: 'rcpt-030',
    timestamp: '2026-02-12T21:45:00.000Z',
    category: 'Searches',
    title: 'framer motion interactive node graph tutorial react',
    description: 'Searched for interactive SVG relationship graph animation examples in React.',
    location: 'Home Workspace',
    tags: ['search', 'coding', 'frontend', 'react'],
    source: 'Google Search',
    metadata: {
      searchQuery: 'framer motion interactive node graph tutorial react'
    }
  },

  // --- CLUSTER 7: Late Night Coding & Hackathon Sprint (Feb 18 - Feb 20, 2026) ---
  {
    id: 'rcpt-031',
    timestamp: '2026-02-18T22:30:00.000Z',
    category: 'Music',
    title: 'Acid Rain',
    description: 'Playing dark synth playlist on loop during hackathon frontend build.',
    location: 'Home Workspace',
    tags: ['late-night', 'coding', 'hackathon', 'synthwave'],
    source: 'Spotify',
    duration: 212,
    metadata: {
      artist: 'Lorn',
      album: 'Vessel'
    }
  },
  {
    id: 'rcpt-032',
    timestamp: '2026-02-18T23:10:00.000Z',
    category: 'Notes',
    title: 'Life Receipts Architecture Blueprint',
    description: 'Sketched data normalization flow: RAW DATA -> INSIGHTS -> CONNECTIONS -> STORY.',
    location: 'Home Workspace',
    tags: ['hackathon', 'architecture', 'notes', 'important'],
    source: 'Notion',
    importanceScore: 10,
    metadata: {
      noteTitle: 'Life Receipts Architecture Blueprint',
      tags: ['hackathon', 'architecture']
    }
  },
  {
    id: 'rcpt-033',
    timestamp: '2026-02-19T00:40:00.000Z',
    category: 'Purchases',
    title: 'Midnight Diner Tacos & Energy Drink',
    description: 'Late night hackathon fuel delivered during coding sprint.',
    location: 'Midnight Diner, Chennai',
    amount: 320,
    tags: ['late-night', 'food', 'hackathon', 'fuel'],
    source: 'Swiggy / GPay',
    metadata: {
      merchant: 'Midnight Diner',
      amountInINR: 320
    }
  },
  {
    id: 'rcpt-034',
    timestamp: '2026-02-19T01:15:00.000Z',
    category: 'Searches',
    title: 'deterministic graph clustering algorithms javascript typescript',
    description: 'Researched time proximity and spatial tag similarity scoring algorithms.',
    location: 'Home Workspace',
    tags: ['search', 'algorithms', 'hackathon'],
    source: 'Google Search',
    metadata: {
      searchQuery: 'deterministic graph clustering algorithms javascript typescript'
    }
  },
  {
    id: 'rcpt-035',
    timestamp: '2026-02-19T02:00:00.000Z',
    category: 'Photos',
    title: 'Dual Monitor Code & Coffee Cup at 2 AM',
    description: 'Quick snapshot of clean component architecture on screen.',
    location: 'Home Workspace',
    tags: ['hackathon', 'coding', 'late-night', 'memories'],
    source: 'Google Photos',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    importanceScore: 8,
    metadata: {
      caption: 'Late night hackathon flow!'
    }
  },

  // --- CLUSTER 8: Reconnections & Weekend Getaway (Feb 27 - Feb 28, 2026) ---
  {
    id: 'rcpt-036',
    timestamp: '2026-02-27T18:00:00.000Z',
    category: 'Places',
    title: 'Bay View Lookout Point',
    description: 'Scenic viewpoint visit during weekend roadtrip along coastline.',
    location: 'Bay View Lookout, ECR',
    latitude: 12.8500,
    longitude: 80.2400,
    people: ['Aarav', 'Riya', 'Kavya'],
    tags: ['roadtrip', 'coastal', 'weekend', 'travel'],
    source: 'Google Maps Timeline',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    importanceScore: 9,
    metadata: {
      stayDurationMinutes: 120
    }
  },
  {
    id: 'rcpt-037',
    timestamp: '2026-02-27T19:30:00.000Z',
    category: 'Purchases',
    title: 'Seafood Dinner & Fresh Coconut Drink',
    description: 'Dinner at open-air seaside shack with friends.',
    location: 'Seaside Grill, Mahabalipuram',
    amount: 1420,
    tags: ['food', 'dinner', 'weekend', 'travel'],
    source: 'Credit Card',
    metadata: {
      merchant: 'Seaside Grill',
      amountInINR: 1420
    }
  },
  {
    id: 'rcpt-038',
    timestamp: '2026-02-27T21:00:00.000Z',
    category: 'Movies',
    title: 'Dune: Part Two',
    description: 'Watched IMAX screening during weekend trip.',
    location: 'Luxe Cinema, ECR',
    people: ['Aarav', 'Riya', 'Kavya'],
    tags: ['movie', 'cinema', 'imax', 'weekend'],
    source: 'BookMyShow',
    duration: 166,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    importanceScore: 9,
    metadata: {
      movieTitle: 'Dune: Part Two',
      platform: 'IMAX Theater',
      userRating: '9.5/10'
    }
  },
  {
    id: 'rcpt-039',
    timestamp: '2026-02-27T23:50:00.000Z',
    category: 'Music',
    title: 'Midnight City',
    description: 'Playing classic synth anthem on drive back under starry night sky.',
    location: 'ECR Highway, Chennai',
    people: ['Aarav', 'Riya'],
    tags: ['ambient', 'late-night', 'roadtrip', 'music'],
    source: 'Spotify',
    duration: 243,
    metadata: {
      artist: 'M83',
      album: 'Hurry Up, We\'re Dreaming'
    }
  },
  {
    id: 'rcpt-040',
    timestamp: '2026-02-28T09:00:00.000Z',
    category: 'Notes',
    title: 'Chapter Wrap: A Month of Motion & Discovery',
    description: 'Reflection on 2 months of records: "Looking at receipts as story chapters reveals how connected every late night, photo, and playlist really is."',
    location: 'Home Workspace',
    tags: ['journal', 'reflections', 'summary', 'important'],
    source: 'Apple Notes',
    importanceScore: 10,
    metadata: {
      noteTitle: 'Chapter Wrap: A Month of Motion & Discovery',
      mood: 'Grateful & Inspired'
    }
  }
];
