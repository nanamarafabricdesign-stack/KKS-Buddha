import React, { useMemo } from 'react';
import { Bookmark, BookOpen, Search, X } from 'lucide-react';
import { PITAKA_SECTIONS } from '../data';
import { DhammaEntry, LanguageMode, PitakaType } from '../types/dhamma';

interface SearchAndCatalogProps {
  entries: DhammaEntry[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  pitakaFilter: PitakaType | 'all' | 'saved';
  onPitakaFilterChange: (filter: PitakaType | 'all' | 'saved') => void;
  nikayaFilter: string;
  onNikayaFilterChange: (nikaya: string) => void;
  availableNikayas: string[];
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onOpenEntry: (entry: DhammaEntry) => void;
  languageMode: LanguageMode;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

const PITAKA_LABEL: Record<PitakaType, { mm: string; en: string }> = {
  vinaya: { mm: 'ဝိနည်း', en: 'Vinaya' },
  sutta: { mm: 'သုတ္တန်', en: 'Sutta' },
  abhidhamma: { mm: 'အဘိဓမ္မာ', en: 'Abhidhamma' },
  jataka: { mm: 'ဇာတ်တော်', en: 'Jātaka' },
  paritta: { mm: 'ပရိတ်တော်', en: 'Paritta' },
};

const QUICK_SUGGESTIONS = [
  'ဓမ္မစကြာ',
  'သတိပဋ္ဌာန်',
  'ပဋ္ဌာန်း',
  'မင်္ဂလသုတ်',
  'ဝေဿန္တရာ',
  'Kālāma',
  'Mettā',
  'Paṭiccasamuppāda',
];

export const SearchAndCatalog: React.FC<SearchAndCatalogProps> = ({
  entries,
  searchQuery,
  onSearchChange,
  pitakaFilter,
  onPitakaFilterChange,
  nikayaFilter,
  onNikayaFilterChange,
  availableNikayas,
  savedIds,
  onToggleSave,
  onOpenEntry,
  languageMode,
  searchInputRef,
}) => {
  const filterTabs = useMemo(
    () => [
      ...PITAKA_SECTIONS.map((s) => ({
        id: s.id as PitakaType | 'all' | 'saved',
        label: languageMode === 'mm' ? s.labelMm : languageMode === 'en' ? s.labelEn : `${s.labelMm} · ${s.labelEn}`,
      })),
      {
        id: 'saved' as const,
        label:
          languageMode === 'mm'
            ? `သိမ်းဆည်း (${savedIds.size})`
            : languageMode === 'en'
            ? `Saved (${savedIds.size})`
            : `သိမ်းဆည်း · Saved (${savedIds.size})`,
      },
    ],
    [languageMode, savedIds.size]
  );

  return (
    <section id="catalog" className="py-12 md:py-16 border-b gold-hairline bg-[#FBF6EA] dark:bg-[#120D07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Live Result Counter */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#9A6B10] dark:text-[#E6B84C]">
              Search &amp; Scripture Library · တရားတော်ရှာဖွေရေး
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#1F170D] dark:text-[#FAF3E0]">
              Explore Tipiṭaka, Jātaka &amp; Paritta
            </h2>
          </div>
          <p className="text-sm font-medium text-[#6E5A3E] dark:text-[#C8B48E] tabular-nums">
            {entries.length} {entries.length === 1 ? 'Discourse' : 'Discourses'} · တရားတော် {entries.length} ပုဒ်
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="mt-6 rounded-xl border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] p-4 sm:p-5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-[#9A6B10] dark:text-[#E6B84C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="မြန်မာ / English / Pāḷi ဖြင့် အလွယ်တကူ ရှာဖွေပါ (ဥပမာ - မင်္ဂလသုတ်, Patthana, Vessantara)..."
                aria-label="Search Dhamma discourses in Burmese, English, or Pali"
                className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07] text-sm text-[#1F170D] dark:text-[#FAF3E0] placeholder:text-[#8C7A5B] dark:placeholder:text-[#8C7A5B] focus:outline-none focus:border-[#B57E14] dark:focus:border-[#E6B84C]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 text-[#6E5A3E] hover:text-[#1F170D] dark:text-[#A99573] dark:hover:text-[#FAF3E0] cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            {availableNikayas.length > 1 && (
              <div className="md:w-72 shrink-0">
                <select
                  value={nikayaFilter}
                  onChange={(e) => onNikayaFilterChange(e.target.value)}
                  aria-label="Filter by Nikaya or Division"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07] text-sm text-[#1F170D] dark:text-[#FAF3E0] focus:outline-none focus:border-[#B57E14] dark:focus:border-[#E6B84C]"
                >
                  <option value="all">All Divisions / နိကာယ်အားလုံး</option>
                  {availableNikayas.map((nikaya) => (
                    <option key={nikaya} value={nikaya}>
                      {nikaya}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Quick Search Keywords */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#6E5A3E] dark:text-[#A99573]">
            <span>Quick search:</span>
            {QUICK_SUGGESTIONS.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onSearchChange(term)}
                className="min-h-[32px] px-1.5 text-[#9A6B10] dark:text-[#E6B84C] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Segmented Category Filter Tabs */}
          <div className="mt-4 pt-4 border-t gold-hairline flex items-center gap-1.5 overflow-x-auto pb-1">
            {filterTabs.map((tab) => {
              const active = pitakaFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onPitakaFilterChange(tab.id)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1F170D] text-[#FAF3E0] dark:bg-[#D4A02C] dark:text-[#140E08]'
                      : 'bg-[#F4EAD2] text-[#4A3A24] hover:bg-[#EBDCBA] dark:bg-[#241A0F] dark:text-[#D5C39F] dark:hover:bg-[#312314]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {entries.length === 0 ? (
          <div className="mt-8 rounded-xl border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] p-10 text-center">
            <BookOpen className="w-8 h-8 mx-auto text-[#9A6B10] dark:text-[#E6B84C]" aria-hidden="true" />
            <h3 className="mt-3 font-display text-xl font-semibold text-[#1F170D] dark:text-[#FAF3E0]">
              No matching discourses found
            </h3>
            <p className="mt-1.5 text-sm text-[#6E5A3E] dark:text-[#C8B48E]">
              ရှာဖွေထားသော စကားလုံးနှင့် ကိုက်ညီသည့် တရားတော် မတွေ့ရှိပါ။ ရှာဖွေမှုကို ရှင်းလင်း၍ ထပ်မံကြည့်ရှုပါ။
            </p>
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onPitakaFilterChange('all');
                onNikayaFilterChange('all');
              }}
              className="mt-5 min-h-[44px] px-5 py-2 rounded-lg bg-[#D4A02C] text-[#140E08] text-xs font-semibold hover:bg-[#E8BE5A] transition-colors cursor-pointer"
            >
              Reset Filters · အားလုံးပြန်ပြရန်
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => {
              const isSaved = savedIds.has(entry.id);
              const pitakaMeta = PITAKA_LABEL[entry.pitaka];
              return (
                <article
                  key={entry.id}
                  className="rounded-xl border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] hover:border-[#B57E14] dark:hover:border-[#E6B84C] transition-colors flex flex-col justify-between p-6"
                >
                  <div>
                    {/* Quiet unboxed metadata header (zero pills) */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs text-[#8C6418] dark:text-[#E6B84C] leading-snug">
                        <span className="font-semibold">
                          {pitakaMeta.mm} · {pitakaMeta.en}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span className="text-[#6E5A3E] dark:text-[#A99573] tabular-nums">
                          {entry.reference}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleSave(entry.id)}
                        aria-label={isSaved ? 'Remove bookmark' : 'Bookmark discourse'}
                        className={`min-w-[44px] min-h-[44px] -mt-2 -mr-2 flex items-center justify-center rounded-lg transition-colors cursor-pointer shrink-0 ${
                          isSaved
                            ? 'text-[#B57E14] dark:text-[#F5D57A]'
                            : 'text-[#8C7A5B] hover:text-[#1F170D] dark:text-[#8C7A5B] dark:hover:text-[#FAF3E0]'
                        }`}
                      >
                        <Bookmark
                          className="w-4 h-4"
                          fill={isSaved ? 'currentColor' : 'none'}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Bilingual Titles */}
                    <button
                      type="button"
                      onClick={() => onOpenEntry(entry)}
                      className="mt-1 text-left w-full group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B57E14]"
                    >
                      {languageMode !== 'en' && (
                        <h3 className="font-myanmar-serif text-lg font-semibold text-[#1F170D] dark:text-[#FAF3E0] group-hover:text-[#9A6B10] dark:group-hover:text-[#F5D57A] leading-snug transition-colors">
                          {entry.titleMm}
                        </h3>
                      )}
                      {languageMode !== 'mm' && (
                        <p
                          className={`${
                            languageMode === 'en'
                              ? 'font-display text-xl font-semibold text-[#1F170D] dark:text-[#FAF3E0] group-hover:text-[#9A6B10] dark:group-hover:text-[#F5D57A]'
                              : 'mt-1 text-sm font-medium text-[#7B5D2E] dark:text-[#D9C7A3]'
                          } leading-snug transition-colors`}
                        >
                          {entry.titleEn}
                        </p>
                      )}
                    </button>

                    {/* Summaries */}
                    {languageMode !== 'en' && (
                      <p className="mt-3 text-sm text-[#4A3A24] dark:text-[#D5C39F] leading-relaxed line-clamp-3">
                        {entry.summaryMm}
                      </p>
                    )}
                    {languageMode !== 'mm' && (
                      <p className="mt-2 text-xs text-[#6E5A3E] dark:text-[#A99573] leading-relaxed line-clamp-3">
                        {entry.summaryEn}
                      </p>
                    )}
                  </div>

                  {/* Clean footer action row */}
                  <div className="mt-5 pt-3 border-t gold-hairline flex items-center justify-between gap-3">
                    <span className="text-xs text-[#7B5D2E] dark:text-[#A99573] tabular-nums">
                      {entry.paliSections.length > 0 ? 'ပါဠိ + မြန်မာ + EN · ' : ''}
                      {entry.readingMinutes} min read
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenEntry(entry)}
                      className="min-h-[40px] px-3 py-1.5 text-xs font-semibold text-[#9A6B10] dark:text-[#F5D57A] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
                    >
                      Read Discourse · ဖတ်ရှုရန်
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
