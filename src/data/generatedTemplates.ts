// Pre-generated templates available in public/generated/
export const generatedTemplates = [
  {
    id: 'athlete-spotlight-carousel',
    name: 'Athlete Spotlight Carousel - Sipho Ndlovu',
    category: 'Athlete Identity',
    path: '/generated/athlete-spotlight-carousel.png',
    format: 'feed'
  },
  {
    id: 'athlete-spotlight-thando',
    name: 'Athlete Spotlight - Thando Mthembu',
    category: 'Athlete Identity',
    path: '/generated/athlete-spotlight-thando.png',
    format: 'feed'
  },
  {
    id: 'behind-the-scenes',
    name: 'Behind the Scenes',
    category: 'Community / Utility',
    path: '/generated/behind-the-scenes.png',
    format: 'feed'
  },
  {
    id: 'commonwealth-watch',
    name: 'Commonwealth Watch',
    category: 'Build-Up Performance',
    path: '/generated/commonwealth-watch.jpg',
    format: 'feed'
  },
  {
    id: 'countdown-100',
    name: 'Countdown - 100 Days',
    category: 'National Moments',
    path: '/generated/countdown-100.png',
    format: 'feed'
  },
  {
    id: 'daily-schedule',
    name: 'Daily Schedule',
    category: 'Community / Utility',
    path: '/generated/daily-schedule.png',
    format: 'feed'
  },
  {
    id: 'event-preview-rugby',
    name: 'Event Preview - Rugby Sevens',
    category: 'Community / Utility',
    path: '/generated/event-preview-rugby.png',
    format: 'feed'
  },
  {
    id: 'live-update-result',
    name: 'Live Update Result',
    category: 'Community / Utility',
    path: '/generated/live-update-result.png',
    format: 'feed'
  },
  {
    id: 'medal-moment-gold',
    name: 'Medal Moment - Gold',
    category: 'Community / Utility',
    path: '/generated/medal-moment-gold.png',
    format: 'feed'
  },
  {
    id: 'mr-price-then-now',
    name: 'Mr Price: Then & Now - Nomsa Radebe',
    category: 'Partner Stories',
    path: '/generated/mr-price-then-now.png',
    format: 'feed'
  },
  {
    id: 'ones-to-watch',
    name: 'Ones to Watch',
    category: 'Build-Up Performance',
    path: '/generated/ones-to-watch.png',
    format: 'feed'
  },
  {
    id: 'opex-athlete-story',
    name: 'OPEX Athlete Story - Bongani Dlamini',
    category: 'Partner Stories',
    path: '/generated/opex-athlete-story.png',
    format: 'feed'
  },
  {
    id: 'team-announcement',
    name: 'Team Announcement Hero',
    category: 'National Moments',
    path: '/generated/team-announcement.png',
    format: 'feed'
  },
  {
    id: 'team-unity',
    name: 'Team Unity',
    category: 'Community / Utility',
    path: '/generated/team-unity.png',
    format: 'feed'
  },
  {
    id: 'thank-you-fans',
    name: 'Thank You Fans',
    category: 'Community / Utility',
    path: '/generated/thank-you-fans.png',
    format: 'feed'
  },
  {
    id: 'the-squad-intro',
    name: 'The Squad - Athlete Intro Card - Lerato Khumalo',
    category: 'Athlete Identity',
    path: '/generated/the-squad-intro.png',
    format: 'feed'
  }
];

export const generatedCategories = generatedTemplates.reduce((acc, t) => {
  if (!acc.find(c => c.category === t.category)) {
    acc.push({
      category: t.category,
      items: generatedTemplates.filter(t2 => t2.category === t.category)
    });
  }
  return acc;
}, [] as Array<{ category: string; items: typeof generatedTemplates }>);
