export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  prompt: string;
  athleteFields?: string[]; // Fields that can be auto-filled from athlete data
}

export const templates: Template[] = [
  // NATIONAL MOMENTS (6)
  {
    id: 'countdown-100',
    name: 'Countdown - 100 Days',
    category: 'National Moments',
    description: 'Major milestone countdown with dramatic typography',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 countdown graphic (1080x1350). MASSIVE number "100" in mixed black (#1A1A1A) + gold (#C9A961) ultra-bold typography, "DAYS TO GO" text below, Commonwealth Games + Team SA logos top corners, cream (#E8E4DC) textured background with gold wash, footer "GLASGOW 2026 • 23 JULY TO 02 AUGUST • WWW.TEAMSA.CO.ZA", small protea watermark'
  },
  {
    id: 'countdown-50',
    name: 'Countdown - 50 Days',
    category: 'National Moments',
    description: '50-day milestone with increased urgency',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 countdown graphic (1080x1350). MASSIVE "50" in black + gold, "DAYS TO GO" text, cream background with teal (#A8C5C0) wash for freshness, Commonwealth + Team SA logos, footer with dates + URL'
  },
  {
    id: 'countdown-30',
    name: 'Countdown - 30 Days',
    category: 'National Moments',
    description: 'Final countdown phase with high energy',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 countdown graphic (1080x1350). MASSIVE "30" in black + gold with subtle glow, "DAYS TO GLASGOW" text, cream background with green (#006747) energy wash, Commonwealth + Team SA logos, footer'
  },
  {
    id: 'team-announcement',
    name: 'Team Announcement Hero',
    category: 'National Moments',
    description: 'Squad reveal moment with celebration aesthetic',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 team announcement hero (1080x1350). Large gold badge/circle "THE 109", diverse athlete silhouettes in celebration poses (mixed sports, Team SA kit), "TEAM SOUTH AFRICA" in massive mixed black + gold typography, cream background with rainbow wash (subtle SA flag colors), Commonwealth + Team SA logos top corners, info block "109 ATHLETES • 18 SPORTS • GLASGOW 2026", footer with dates + URL + protea'
  },
  {
    id: 'kit-reveal',
    name: 'Kit Reveal',
    category: 'National Moments',
    description: 'Official Team SA competition kit showcase',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 kit reveal (1080x1350). Center: Team SA competition kit on mannequin or athlete (green + gold colors, protea badge prominent), "NEW KIT REVEAL" badge top, "GLASGOW 2026" subtitle, cream background with green wash, Commonwealth + Team SA logos, sponsor lockups bottom (Mr Price + OPEX), footer with dates + URL'
  },
  {
    id: 'send-off',
    name: 'Send-Off Ceremony',
    category: 'National Moments',
    description: 'Team departure moment with emotional send-off energy',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 send-off graphic (1080x1350). "SEND-OFF" badge in gold, team group shot at airport/ceremony (athletes waving, Team SA kit, SA flags), "DESTINATION: GLASGOW" text, cream background with gold wash, Commonwealth + Team SA logos, "BRING IT HOME" tagline, footer with dates + URL + protea'
  },

  // ATHLETE IDENTITY (7)
  {
    id: 'athlete-spotlight',
    name: 'Athlete Spotlight Cover',
    category: 'Athlete Identity',
    description: 'Full athlete profile with photo, stats, and quote',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 athlete spotlight (1080x1350). Center/upper: Athlete cutout (confident pose, Team SA kit), massive athlete name in mixed black + gold (split first/last), sport + event info ("ATHLETICS • 100M"), green rule, personal best stat, hometown, optional quote callout in italics, cream texture + teal wash background, Commonwealth + Team SA logos top, footer "GLASGOW 2026" + dates + URL + protea',
    athleteFields: ['name', 'sport', 'event', 'personalBest', 'hometown', 'quote']
  },
  {
    id: 'the-squad',
    name: 'The Squad - Athlete Card',
    category: 'Athlete Identity',
    description: 'Compact modular athlete intro cards for grid layouts',
    prompt: 'Premium compact Team South Africa Commonwealth Games athlete intro card (1080x1350). Upper: Athlete headshot cutout (confident smile, Team SA jacket), lower: Name in bold condensed uppercase (black + gold mix), sport icon + text, single standout fact in gold (e.g., "PERSONAL BEST: 9.84s"), small SA flag + "SOUTH AFRICA" badge, cream background + subtle green wash, Commonwealth + Team SA logos (smaller), minimal footer "GLASGOW 2026" + protea',
    athleteFields: ['name', 'sport', 'event', 'personalBest']
  },
  {
    id: 'quick-facts',
    name: 'Quick Facts',
    category: 'Athlete Identity',
    description: 'Stat-led athlete card with key data points',
    prompt: 'Premium Team South Africa Commonwealth Games quick facts graphic (1080x1350). "QUICK FACTS" badge top, athlete name in black + gold, structured info blocks: HEIGHT | BIRTHPLACE | COACH | TRAINING HOURS | PERSONAL BEST, each with icon + value, cream background, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'height', 'birthplace', 'coach', 'trainingHours', 'personalBest']
  },
  {
    id: 'for-my-country',
    name: 'For My Country - Quote Card',
    category: 'Athlete Identity',
    description: 'Quote-led card featuring athlete inspiration',
    prompt: 'Premium Team South Africa Commonwealth Games quote card (1080x1350). "FOR MY COUNTRY" badge in gold circle top, large quote in italics center (e.g., "I run for my country, my family, and everyone who believes in me."), attribution "— ATHLETE NAME" below, small athlete portrait bottom corner, cream background with warm gold wash, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'quote']
  },
  {
    id: 'personal-best-numbers',
    name: 'Personal Best / Numbers',
    category: 'Athlete Identity',
    description: 'Data-led card highlighting athlete achievements',
    prompt: 'Premium Team South Africa Commonwealth Games numbers graphic (1080x1350). "THE NUMBERS" badge, massive personal best in center (e.g., "9.84s" or "54.89s"), athlete name below, supporting stats in grid: Commonwealth rank, season best, career best, medals won, cream background with teal wash, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'personalBest', 'sport']
  },
  {
    id: 'playlist',
    name: 'Playlist - Pre-Competition',
    category: 'Athlete Identity',
    description: 'Personality card featuring favorite song',
    prompt: 'Premium Team South Africa Commonwealth Games playlist graphic (1080x1350). "PRE-GAME PLAYLIST" badge, music note icon, song title + artist in large text, "AS HEARD BY [ATHLETE NAME]" subtitle, small athlete portrait, cream background with gradient, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'favoriteSong']
  },
  {
    id: 'off-the-field',
    name: 'Off the Field',
    category: 'Athlete Identity',
    description: 'Alternative career/personality insight',
    prompt: 'Premium Team South Africa Commonwealth Games off-the-field graphic (1080x1350). "OFF THE FIELD" badge, athlete name, "IF NOT AN ATHLETE, I\'D BE:" label, alternative career answer in large text (e.g., "A LAWYER" or "MARINE BIOLOGIST"), small portrait, cream background, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'alternativeCareer']
  },

  // BUILD-UP PERFORMANCE (5)
  {
    id: 'ones-to-watch',
    name: 'Ones to Watch',
    category: 'Build-Up Performance',
    description: 'Rising star highlight with breakthrough story',
    prompt: 'Premium Team South Africa Commonwealth Games "ONES TO WATCH" graphic (1080x1350). Large gold badge "ONES TO WATCH" top, young athlete in explosive action pose (Team SA kit), athlete name in black + gold, AGE + SPORT info, "BREAKTHROUGH:" achievement text, "WHY WATCH:" descriptor, cream + teal background, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'age', 'sport', 'event']
  },
  {
    id: 'commonwealth-watch',
    name: 'Commonwealth Watch',
    category: 'Build-Up Performance',
    description: 'Medal contender tracking with competitive context',
    prompt: 'Premium Team South Africa Commonwealth Games medal watch graphic (1080x1350). "COMMONWEALTH WATCH" badge, athlete action shot mid-competition, name in black + gold, sport + event, "COMMONWEALTH RANK: #2", medal history timeline, competitive positioning text, cream + teal background, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'sport', 'event']
  },
  {
    id: 'road-to-glasgow',
    name: 'Road to Glasgow',
    category: 'Build-Up Performance',
    description: 'Journey/qualifier update graphics',
    prompt: 'Premium Team South Africa Commonwealth Games road to Glasgow graphic (1080x1350). "ROAD TO GLASGOW" badge with route icon, athlete name, qualifier status "QUALIFIED" in green circle, qualification date + location, journey stat (e.g., "3 YEARS OF PREPARATION"), cream background, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'sport']
  },
  {
    id: 'first-signals',
    name: 'First Signals',
    category: 'Build-Up Performance',
    description: 'Early form indicator graphics',
    prompt: 'Premium Team South Africa Commonwealth Games first signals graphic (1080x1350). "FIRST SIGNALS" badge, athlete in training/warm-up, name, recent result/time in large text, "FORM CHECK:" label + assessment, cream background with green wash, Commonwealth + Team SA logos, footer'
  },
  {
    id: 'selected-qualified',
    name: 'Selected / Qualified',
    category: 'Build-Up Performance',
    description: 'Official selection announcement',
    prompt: 'Premium Team South Africa Commonwealth Games selection graphic (1080x1350). "SELECTED" or "QUALIFIED" badge in green circle with checkmark, athlete portrait, name in black + gold, sport + event, "OFFICIALLY SELECTED FOR GLASGOW 2026" text, cream background with celebration confetti elements, Commonwealth + Team SA logos, footer'
  },

  // PARTNER STORIES (4)
  {
    id: 'opex-athlete-story',
    name: 'OPEX Athlete Story',
    category: 'Partner Stories',
    description: 'OPEX Operation Excellence sponsored content',
    prompt: 'Premium Team South Africa Commonwealth Games x OPEX partnership graphic (1080x1350). Commonwealth + Team SA logos top corners, OPEX logo bottom-right (clean integration), athlete cutout in training vest, name in black + gold, "TEAM SA • OPEX ATHLETE" label, sport info, quote in italics about support impact, "POWERED BY OPEX" lockup, cream background + teal wash, footer with dates + URL',
    athleteFields: ['name', 'sport', 'quote']
  },
  {
    id: 'mr-price-then-now',
    name: 'Mr Price: Then & Now',
    category: 'Partner Stories',
    description: 'Mr Price journey storytelling',
    prompt: 'Premium Team South Africa Commonwealth Games x Mr Price graphic (1080x1350). Split composition: left "THEN" with small archival photo (young athlete, black & white), right "NOW" with athlete in Team SA kit (full color), bridge typography with athlete name (black + gold), journey caption, Mr Price logo bottom-right, "MR PRICE: BEHIND THE DESIGN" tagline, cream background, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'sport']
  },
  {
    id: 'powered-by-support',
    name: 'Powered by Support',
    category: 'Partner Stories',
    description: 'Generic sponsor appreciation story',
    prompt: 'Premium Team South Africa Commonwealth Games sponsor story (1080x1350). "POWERED BY SUPPORT" badge, athlete in action, name, "WITH SUPPORT FROM:" label + partner logos (OPEX + Mr Price), gratitude quote, cream background, Commonwealth + Team SA logos, footer'
  },
  {
    id: 'mr-price-behind-design',
    name: 'Mr Price: Behind the Design',
    category: 'Partner Stories',
    description: 'Apparel/kit design story',
    prompt: 'Premium Team South Africa Commonwealth Games x Mr Price design story (1080x1350). "BEHIND THE DESIGN" badge, Team SA kit close-up (fabric texture, protea detail, stitching), design insight text, "DESIGNED BY MR PRICE FOR TEAM SA" label, Mr Price logo, cream background, Commonwealth + Team SA logos, footer'
  },

  // COMMUNITY / UTILITY (15)
  {
    id: 'event-preview',
    name: 'Event Preview',
    category: 'Community / Utility',
    description: 'Sport-specific event preview graphics',
    prompt: 'Premium Team South Africa Commonwealth Games event preview (1080x1350). "EVENT PREVIEW" badge, sport-specific action shot (e.g., rugby player, swimmer), sport name in massive typography, dates + venue, Team SA squad size, medal target status, sport-specific color wash (rugby=green, swimming=teal), Commonwealth + Team SA logos, footer'
  },
  {
    id: 'schedule-daily',
    name: 'Daily Schedule',
    category: 'Community / Utility',
    description: 'Daily event schedule for Team SA',
    prompt: 'Premium Team South Africa Commonwealth Games daily schedule (1080x1350). "DAY 3 • 25 JULY" badge, "TODAY\'S TEAM SA EVENTS" title, structured list with times + sports + athlete names (09:00 Swimming • Chad le Clos, etc.), sport icons next to each, cream background, Commonwealth + Team SA logos, footer "FULL SCHEDULE: WWW.TEAMSA.CO.ZA"'
  },
  {
    id: 'result-update',
    name: 'Result Update',
    category: 'Community / Utility',
    description: 'Live result announcement',
    prompt: 'Premium Team South Africa Commonwealth Games result graphic (1080x1350). "RESULT" or "FINAL" badge (urgent typography), athlete action at finish/completion, name in black + gold, event name, result in LARGE text (position + medal or time), small podium flags if medal, "LIVE FROM GLASGOW" label, cream + teal background, Commonwealth + Team SA logos, footer'
  },
  {
    id: 'medal-moment-gold',
    name: 'Medal Moment - Gold',
    category: 'Community / Utility',
    description: 'Gold medal celebration',
    prompt: 'Premium Team South Africa Commonwealth Games GOLD MEDAL graphic (1080x1350). "GOLD MEDAL" badge/stamp prominent, athlete celebration (arms raised, holding medal, joyful), name in black + gold MASSIVE typography, event + time/result, "NEW COMMONWEALTH RECORD" if applicable, gold wash background (celebratory), Commonwealth + Team SA logos, footer'
  },
  {
    id: 'trivia',
    name: 'Trivia',
    category: 'Community / Utility',
    description: 'Fun fact quiz card',
    prompt: 'Premium Team South Africa Commonwealth Games trivia (1080x1350). "TEAM SA TRIVIA" badge, fun fact/question in large text, answer revealed or "SWIPE FOR ANSWER" prompt, related image/icon, cream background with playful color accent, Commonwealth + Team SA logos, footer'
  },
  {
    id: 'quiz',
    name: 'Quiz - Who Am I?',
    category: 'Community / Utility',
    description: 'Interactive athlete guessing game',
    prompt: 'Premium Team South Africa Commonwealth Games quiz (1080x1350). "WHO AM I?" title, 3-4 clue bullets (sport, achievement, hometown, signature move), silhouette of athlete, "GUESS IN COMMENTS" prompt, cream background, Commonwealth + Team SA logos, footer'
  },
  {
    id: 'social-handle-card',
    name: 'Social Handle Card',
    category: 'Community / Utility',
    description: 'Athlete social media follow prompt',
    prompt: 'Premium Team South Africa Commonwealth Games social card (1080x1350). "FOLLOW THE JOURNEY" badge, athlete portrait, name in black + gold, Instagram/Twitter/TikTok handles with icons, QR code optional, "STAY CONNECTED" tagline, cream background, Commonwealth + Team SA logos, footer',
    athleteFields: ['name', 'instagram', 'twitter', 'tiktok']
  },
  {
    id: 'raw-reaction-cover',
    name: 'Raw Reaction Cover',
    category: 'Community / Utility',
    description: 'Emotional moment capture',
    prompt: 'Premium Team South Africa Commonwealth Games reaction moment (1080x1350). Raw emotional photo (athlete crying, celebrating, determined face), minimal text overlay (just name or moment label like "THE MOMENT"), film grain texture, cream border, Commonwealth + Team SA logos small, footer'
  },
  {
    id: 'what-this-means',
    name: 'What This Means',
    category: 'Community / Utility',
    description: 'Context explainer for results',
    prompt: 'Premium Team South Africa Commonwealth Games explainer (1080x1350). "WHAT THIS MEANS" badge, result/scenario at top, "THE IMPACT:" label, 2-3 bullet points explaining significance, simple graphic/icon, cream background, Commonwealth + Team SA logos, footer'
  },
  {
    id: 'the-109',
    name: 'The 109',
    category: 'Community / Utility',
    description: 'Squad identity collective graphic',
    prompt: 'Premium Team South Africa Commonwealth Games squad identity (1080x1350). "THE 109" in massive gold typography, grid/collage of athlete faces (diverse sports), "ONE TEAM • ONE DREAM" tagline, "109 ATHLETES • 18 SPORTS • 1 NATION" info, cream background with rainbow subtle wash, Commonwealth + Team SA logos, footer'
  }
];

export const templateCategories = templates.reduce((acc, t) => {
  if (!acc.find(c => c.category === t.category)) {
    acc.push({
      category: t.category,
      items: templates.filter(t2 => t2.category === t.category)
    });
  }
  return acc;
}, [] as Array<{ category: string; items: Template[] }>);
