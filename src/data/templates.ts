export interface Template {
  id: string;
  name: string;
  category: string;
  prompt: string;
}

export const templates: Template[] = [
  {
    id: 'countdown',
    name: 'Countdown (100 Days)',
    category: 'National Moments',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 countdown graphic (1080x1350). Large number "100" in mixed black + gold, "DAYS TO GO" text, Commonwealth Games + Team SA logos top corners, cream texture background with gold wash, footer "GLASGOW 2026 • 23 JULY TO 02 AUGUST"'
  },
  {
    id: 'team-announcement',
    name: 'Team Announcement',
    category: 'National Moments',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 team announcement (1080x1350). "THE 109" badge in gold, athlete silhouettes, "TEAM SOUTH AFRICA" massive typography, cream background with rainbow wash, Commonwealth + Team SA logos'
  },
  {
    id: 'athlete-spotlight',
    name: 'Athlete Spotlight',
    category: 'Athlete Identity',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 athlete spotlight (1080x1350). Athlete cutout center, name in massive black + gold mixed typography, sport + event info, personal best stat, hometown, cream texture + teal wash background, Commonwealth + Team SA logos top corners'
  },
  {
    id: 'ones-to-watch',
    name: 'Ones to Watch',
    category: 'Build-Up Performance',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 "ONES TO WATCH" graphic (1080x1350). Rising star badge in gold, young athlete explosive pose, age + sport info, breakthrough achievement, "WHY WATCH" text, cream + teal background'
  },
  {
    id: 'event-preview',
    name: 'Event Preview',
    category: 'Community / Utility',
    prompt: 'Premium Team South Africa Commonwealth Games Glasgow 2026 event preview (1080x1350). Sport-specific action shot, sport name massive typography, dates + venue info, squad size, medal target, cream background with sport-specific color wash'
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
