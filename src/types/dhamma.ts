export type PitakaType = 'vinaya' | 'sutta' | 'abhidhamma' | 'jataka' | 'paritta';

export type LanguageMode = 'both' | 'mm' | 'en';

export type PaliScriptMode = 'both' | 'mm' | 'roman';

export type GoldTheme = 'sunlit' | 'obsidian';

export interface BilingualPoint {
  mm: string;
  en: string;
}

export interface PaliSection {
  headingMm?: string;
  headingEn?: string;
  paliMm: string[];
  paliRoman: string[];
}

export interface DhammaEntry {
  id: string;
  pitaka: PitakaType;
  nikaya: string;
  nikayaMm: string;
  reference: string;
  paliTitle: string;
  titleMm: string;
  titleEn: string;
  summaryMm: string;
  summaryEn: string;
  paliExcerpt?: string;
  paliSections: PaliSection[];
  paliStudyNote?: BilingualPoint;
  contentMm: string[];
  contentEn: string[];
  keyPoints: BilingualPoint[];
  moralOrPracticeMm: string;
  moralOrPracticeEn: string;
  readingMinutes: number;
  tags: string[];
}

export interface DailyQuote {
  id: string;
  sourceRef: string;
  category: 'sutta' | 'jataka' | 'abhidhamma' | 'vinaya' | 'paritta';
  pali: string;
  paliMm?: string;
  textMm: string;
  textEn: string;
  reflectionMm: string;
  reflectionEn: string;
  linkedEntryId: string;
}

export interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:MM 24h format
  language: LanguageMode;
  category: 'all' | 'sutta' | 'jataka' | 'abhidhamma';
  lastSentDate: string | null; // YYYY-MM-DD
}
