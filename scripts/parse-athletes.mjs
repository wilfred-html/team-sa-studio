#!/usr/bin/env node
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const excelPath = path.join(__dirname, '../public/athlete-questionnaire.xlsx');
const outputPath = path.join(__dirname, '../src/data/athletes.ts');

console.log('📊 Parsing athlete questionnaire...');

const workbook = XLSX.readFile(excelPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet);

console.log(`Found ${rows.length} athlete records`);

const athletes = rows.map(row => {
  const getField = (key) => {
    const value = row[key];
    if (!value || value === 'None' || value === 'N/A' || value === 'none' || value === 'n/a') return undefined;
    return typeof value === 'string' ? value.trim() : String(value);
  };

  const dobField = row['Date of Birth '];
  const age = dobField ? new Date().getFullYear() - new Date(dobField).getFullYear() : undefined;

  return {
    name: getField('Full Names (name and surname)'),
    sport: getField('Sport'),
    event: getField('Event/ Discipline'),
    height: parseFloat(row['Height']) || undefined,
    age,
    birthplace: getField('Birthplace '),
    hometown: getField('Hometown '),
    coach: getField('Please name your Coach/es'),
    trainingHours: getField('How many hours a week do you train?'),
    personalBest: getField('Personal Bests '),
    quote: getField('What is your favourite quote?'),
    inspiration: getField('Who/ what inspires you?'),
    alternativeCareer: getField("If you weren't a professional athlete right now - what would you be doing? "),
    favoriteSong: getField('What is your favourite song/s to listen to prior to competing? '),
    instagram: getField("Instagram handle (should you have one, otherwise answer - 'none')"),
    twitter: getField("Twitter handle (should you have one, otherwise answer - 'none')"),
    tiktok: getField("TikTok name (should you have one, otherwise answer - 'none') ")
  };
}).filter(a => a.name && a.sport);

console.log(`Parsed ${athletes.length} valid athletes`);

const output = `// Auto-generated from athlete questionnaire
// Run: npm run parse-athletes
// Generated: ${new Date().toISOString()}

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
  inspiration?: string;
  alternativeCareer?: string;
  favoriteSong?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
}

export const athletes: Athlete[] = ${JSON.stringify(athletes, null, 2)};

export const athletesBySport = athletes.reduce((acc, athlete) => {
  if (!acc[athlete.sport]) acc[athlete.sport] = [];
  acc[athlete.sport].push(athlete);
  return acc;
}, {} as Record<string, Athlete[]>);
`;

fs.writeFileSync(outputPath, output);
console.log(`✅ Written to ${outputPath}`);
console.log(`Total: ${athletes.length} athletes`);
