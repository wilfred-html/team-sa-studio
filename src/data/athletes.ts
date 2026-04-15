export interface Athlete {
  name: string;
  sport: string;
  event?: string;
  height?: number;
  age?: number;
  birthplace?: string;
  hometown?: string;
  coach?: string;
  trainingHours?: string;
  personalBest?: string;
  quote?: string;
  alternativeCareer?: string;
  favoriteSong?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
}

// Sample athletes (real data from Excel to be parsed)
export const athletes: Athlete[] = [
  {
    name: 'Akani Simbine',
    sport: 'Athletics',
    event: '100m / 200m',
    age: 30,
    height: 1.78,
    birthplace: 'Kempton Park',
    hometown: 'Johannesburg',
    coach: 'Werner Prinsloo',
    personalBest: '9.84s (100m)',
    quote: 'I run for my country, my family, and everyone who believes in me.',
    instagram: '@akanisimbine'
  },
  {
    name: 'Tatjana Smith',
    sport: 'Swimming',
    event: '100m / 200m Breaststroke',
    age: 27,
    birthplace: 'Johannesburg',
    hometown: 'Johannesburg',
    coach: 'Rocco Meiring',
    personalBest: '1:04.82 (100m Breaststroke)',
    quote: 'Every race is a chance to glorify God and represent my country.',
    favoriteSong: 'Oceans - Hillsong United',
    instagram: '@tatjanasmith'
  },
  {
    name: 'Wayde van Niekerk',
    sport: 'Athletics',
    event: '400m',
    age: 31,
    height: 1.83,
    birthplace: 'Cape Town',
    hometown: 'Cape Town',
    coach: 'Tannie Ans Botha',
    personalBest: '43.03s (400m) - World Record',
    quote: 'Hard work beats talent when talent doesn\'t work hard.',
    alternativeCareer: 'Motivational Speaker',
    instagram: '@WaydeDreamer'
  }
];

export const athletesBySport = athletes.reduce((acc, athlete) => {
  if (!acc[athlete.sport]) acc[athlete.sport] = [];
  acc[athlete.sport].push(athlete);
  return acc;
}, {} as Record<string, Athlete[]>);
