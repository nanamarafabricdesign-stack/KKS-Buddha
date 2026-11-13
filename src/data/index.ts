import { vinayaEntries } from './vinayaData';
import { suttaPart1Entries } from './suttaPart1Data';
import { suttaPart2Entries } from './suttaPart2Data';
import { abhidhammaEntries } from './abhidhammaData';
import { jatakaEntries } from './jatakaData';
import { DhammaEntry, PitakaType } from '../types/dhamma';

export const ALL_DHAMMA_ENTRIES: DhammaEntry[] = [
  ...suttaPart1Entries,
  ...suttaPart2Entries,
  ...jatakaEntries,
  ...abhidhammaEntries,
  ...vinayaEntries,
];

export interface PitakaSectionMeta {
  id: PitakaType | 'all';
  labelMm: string;
  labelEn: string;
  subtitleMm: string;
  subtitleEn: string;
  countLabel: string;
}

export const PITAKA_SECTIONS: PitakaSectionMeta[] = [
  {
    id: 'all',
    labelMm: 'ပိဋကတ်စုံ',
    labelEn: 'All Canon',
    subtitleMm: 'ပိဋကတ်သုံးပုံ နှင့် ဇာတ်တော်စုံ',
    subtitleEn: 'Complete Tipiṭaka, Jātakas & Parittas',
    countLabel: `${ALL_DHAMMA_ENTRIES.length}`,
  },
  {
    id: 'sutta',
    labelMm: 'သုတ္တန်ပိဋကတ်',
    labelEn: 'Sutta Piṭaka',
    subtitleMm: 'နိကာယ်ငါးရပ် တရားတော်များ',
    subtitleEn: 'Discourses across the Five Nikāyas',
    countLabel: `${suttaPart1Entries.length + suttaPart2Entries.filter((e) => e.pitaka === 'sutta').length}`,
  },
  {
    id: 'jataka',
    labelMm: 'ဇာတ်တော်များ',
    labelEn: 'Jātaka Tales',
    subtitleMm: 'မဟာနိပါတ် ၁၀ ဘွဲ့ နှင့် ဇာတ်နိပါတ်များ',
    subtitleEn: 'Ten Great Jātakas & Classic Birth Stories',
    countLabel: `${jatakaEntries.length}`,
  },
  {
    id: 'abhidhamma',
    labelMm: 'အဘိဓမ္မာပိဋကတ်',
    labelEn: 'Abhidhamma',
    subtitleMm: 'သတ္တပကရဏ် ၇ ကျမ်း နှင့် ပဋ္ဌာန်း ၂၄ ပစ္စည်း',
    subtitleEn: 'All Seven Treatises & 24 Conditions',
    countLabel: `${abhidhammaEntries.length}`,
  },
  {
    id: 'vinaya',
    labelMm: 'ဝိနည်းပိဋကတ်',
    labelEn: 'Vinaya Piṭaka',
    subtitleMm: 'သုတ္တဝိဘင်္ဂ၊ ခန္ဓက နှင့် ပရိဝါရ',
    subtitleEn: 'Monastic Discipline, Councils & Rules',
    countLabel: `${vinayaEntries.length}`,
  },
  {
    id: 'paritta',
    labelMm: 'ပရိတ်တော်များ',
    labelEn: 'Paritta Chants',
    subtitleMm: 'မင်္ဂလ၊ ရတန၊ မေတ္တ နှင့် ပရိတ်ကြီး ၁၁ သုတ်',
    subtitleEn: 'Protective Discourses & Daily Recitations',
    countLabel: `${suttaPart2Entries.filter((e) => e.pitaka === 'paritta').length}`,
  },
];

export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function searchDhammaEntries(
  entries: DhammaEntry[],
  query: string,
  pitakaFilter: PitakaType | 'all' | 'saved',
  savedIds: Set<string>,
  nikayaFilter: string = 'all'
): DhammaEntry[] {
  let result = entries;

  if (pitakaFilter === 'saved') {
    result = result.filter((e) => savedIds.has(e.id));
  } else if (pitakaFilter !== 'all') {
    result = result.filter((e) => e.pitaka === pitakaFilter);
  }

  if (nikayaFilter !== 'all') {
    result = result.filter((e) => e.nikaya === nikayaFilter);
  }

  const trimmed = normalizeSearchText(query);
  if (!trimmed) return result;

  const tokens = trimmed.split(/\s+/).filter(Boolean);

  return result.filter((entry) => {
    const haystack = normalizeSearchText(
      [
        entry.reference,
        entry.paliTitle,
        entry.titleMm,
        entry.titleEn,
        entry.nikaya,
        entry.nikayaMm,
        entry.summaryMm,
        entry.summaryEn,
        entry.paliExcerpt || '',
        ...entry.paliSections.flatMap((s) => [
          s.headingMm || '',
          s.headingEn || '',
          ...s.paliMm,
          ...s.paliRoman,
        ]),
        entry.paliStudyNote?.mm || '',
        entry.paliStudyNote?.en || '',
        ...entry.tags,
        ...entry.contentMm,
        ...entry.contentEn,
      ].join(' ')
    );
    return tokens.every((token) => haystack.includes(token));
  });
}
