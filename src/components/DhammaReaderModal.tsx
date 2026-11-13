import React, { useEffect, useState } from 'react';
import { Bookmark, BookText, Check, ChevronLeft, ChevronRight, Copy, X } from 'lucide-react';
import { DhammaEntry, LanguageMode, PaliScriptMode } from '../types/dhamma';

interface DhammaReaderModalProps {
  entry: DhammaEntry | null;
  onClose: () => void;
  languageMode: LanguageMode;
  onChangeLanguage: (mode: LanguageMode) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}

export const DhammaReaderModal: React.FC<DhammaReaderModalProps> = ({
  entry,
  onClose,
  languageMode,
  onChangeLanguage,
  isSaved,
  onToggleSave,
  onPrev,
  onNext,
}) => {
  const [fontScale, setFontScale] = useState<'normal' | 'large'>('normal');
  const [paliScript, setPaliScript] = useState<PaliScriptMode>('both');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!entry) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [entry, onClose]);

  if (!entry) return null;

  const handleCopy = async () => {
    const paliText = entry.paliSections
      .map((sec) => {
        const lines: string[] = [];
        if (sec.headingMm || sec.headingEn) {
          lines.push(`[${sec.headingMm ?? ''} · ${sec.headingEn ?? ''}]`);
        }
        if (paliScript !== 'roman') lines.push(...sec.paliMm);
        if (paliScript !== 'mm') lines.push(...sec.paliRoman);
        return lines.join('\n');
      })
      .join('\n\n');

    const text = [
      `${entry.titleMm} (${entry.titleEn})`,
      entry.reference,
      paliText ? `\n--- Pāḷi Canon (ပါဠိတော်) ---\n${paliText}` : '',
      `\n--- မြန်မာ ---\n${entry.contentMm.join('\n\n')}`,
      `\n--- English ---\n${entry.contentEn.join('\n\n')}`,
      `\n— KKS BUDDHA (ဘားမားပါတိတ် BURMA BATIKမှ ပူဇော်ပါသည်)`,
    ]
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failures
    }
  };

  const bodySizeClass = fontScale === 'large' ? 'text-base sm:text-lg' : 'text-[15px] sm:text-base';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-title"
    >
      <div className="w-full h-full sm:h-auto sm:max-h-[90vh] max-w-4xl sm:rounded-2xl border gold-hairline bg-[#FBF6EA] dark:bg-[#140E08] text-[#1F170D] dark:text-[#FAF3E0] flex flex-col overflow-hidden shadow-2xl">
        {/* Sticky Reader Controls Header */}
        <div className="px-4 sm:px-6 py-3 border-b gold-hairline bg-[#F4EAD2] dark:bg-[#1B140C] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="text-xs font-medium text-[#8C6418] dark:text-[#E6B84C] truncate max-w-[180px] sm:max-w-xs">
            {entry.reference} · {entry.paliTitle}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {/* Language Toggle */}
            <div className="inline-flex items-center p-0.5 rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07]">
              {(
                [
                  { id: 'both', label: 'MM+EN' },
                  { id: 'mm', label: 'မြန်မာ' },
                  { id: 'en', label: 'EN' },
                ] as { id: LanguageMode; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeLanguage(opt.id)}
                  className={`min-h-[36px] px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    languageMode === opt.id
                      ? 'bg-[#D4A02C] text-[#140E08]'
                      : 'text-[#5E4A30] dark:text-[#C8B48E]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Font Scale */}
            <button
              type="button"
              onClick={() => setFontScale((s) => (s === 'normal' ? 'large' : 'normal'))}
              className="min-w-[40px] min-h-[40px] px-2.5 rounded-lg border gold-hairline text-xs font-semibold text-[#5E4A30] dark:text-[#E5D3AE] hover:border-[#B57E14] cursor-pointer"
              title="Toggle text size"
            >
              {fontScale === 'normal' ? 'A+' : 'A-'}
            </button>

            {/* Copy */}
            <button
              type="button"
              onClick={() => void handleCopy()}
              aria-label="Copy discourse text"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border gold-hairline text-[#5E4A30] dark:text-[#E5D3AE] hover:border-[#B57E14] cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              type="button"
              onClick={() => onToggleSave(entry.id)}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark discourse'}
              className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border gold-hairline cursor-pointer ${
                isSaved
                  ? 'text-[#B57E14] dark:text-[#F5D57A] border-[#B57E14]'
                  : 'text-[#5E4A30] dark:text-[#E5D3AE]'
              }`}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close reader"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-[#1F170D] text-[#FAF3E0] dark:bg-[#D4A02C] dark:text-[#140E08] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Editorial Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-8">
          <div className="max-w-prose mx-auto">
            <p className="text-xs text-[#8C6418] dark:text-[#E6B84C]">
              {entry.nikayaMm} · {entry.nikaya}
            </p>

            <h2
              id="reader-title"
              className="mt-2 font-myanmar-serif text-2xl sm:text-3xl font-semibold text-[#1F170D] dark:text-[#FAF3E0] leading-snug"
            >
              {entry.titleMm}
            </h2>
            <p className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#7B5D2E] dark:text-[#E6B84C]">
              {entry.titleEn}
            </p>

            {/* Full Pali Canon Section with Script Selector */}
            {entry.paliSections.length > 0 && (
              <div className="mt-7 rounded-xl border gold-hairline bg-[#F4EAD2]/80 dark:bg-[#1C140C] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b gold-hairline">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8C6418] dark:text-[#E6B84C]">
                    <BookText className="w-4 h-4" aria-hidden="true" />
                    <span>Pāḷi Canon Text · ပါဠိတော်</span>
                  </div>

                  {/* Pali Script Mode Switcher */}
                  <div className="inline-flex items-center p-0.5 rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07]">
                    {(
                      [
                        { id: 'both', label: 'မြန်မာ + Roman' },
                        { id: 'mm', label: 'မြန်မာပါဠိ' },
                        { id: 'roman', label: 'Roman Pāḷi' },
                      ] as { id: PaliScriptMode; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaliScript(opt.id)}
                        className={`min-h-[32px] px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors whitespace-nowrap ${
                          paliScript === opt.id
                            ? 'bg-[#1F170D] text-[#FAF3E0] dark:bg-[#D4A02C] dark:text-[#140E08]'
                            : 'text-[#5E4A30] dark:text-[#C8B48E]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  {entry.paliSections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      {(sec.headingMm || sec.headingEn) && (
                        <p className="text-xs font-semibold text-[#7B520B] dark:text-[#F5D57A]">
                          {sec.headingMm} {sec.headingEn ? `· ${sec.headingEn}` : ''}
                        </p>
                      )}

                      {paliScript !== 'roman' && (
                        <div className="space-y-2.5">
                          {sec.paliMm.map((line, lIdx) => (
                            <p
                              key={`pm-${lIdx}`}
                              className={`font-myanmar-serif ${
                                fontScale === 'large' ? 'text-base sm:text-lg' : 'text-[15px] sm:text-base'
                              } text-[#1F170D] dark:text-[#FFF3D1] leading-[1.9]`}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      )}

                      {paliScript !== 'mm' && (
                        <div
                          className={`space-y-2 ${
                            paliScript === 'both' ? 'pt-3 border-t gold-hairline' : ''
                          }`}
                        >
                          {sec.paliRoman.map((line, lIdx) => (
                            <p
                              key={`pr-${lIdx}`}
                              className={`font-display italic ${
                                fontScale === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                              } text-[#5E4111] dark:text-[#E6B84C] leading-relaxed`}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {entry.paliStudyNote && (
                  <div className="mt-5 pt-3 border-t gold-hairline text-xs text-[#6E5A3E] dark:text-[#C8B48E] leading-relaxed">
                    {languageMode !== 'en' && <p>{entry.paliStudyNote.mm}</p>}
                    {languageMode !== 'mm' && <p className="mt-1">{entry.paliStudyNote.en}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Burmese Content */}
            {languageMode !== 'en' && (
              <div className="mt-7 space-y-4">
                <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-[#9A6B10] dark:text-[#E6B84C]">
                  မြန်မာဘာသာ အဓိပ္ပာယ် ရှင်းလင်းချက်
                </h3>
                {entry.contentMm.map((para, idx) => (
                  <p
                    key={`mm-${idx}`}
                    className={`${bodySizeClass} text-[#261C10] dark:text-[#EDE0C4] leading-[1.85]`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* English Content */}
            {languageMode !== 'mm' && (
              <div className="mt-8 pt-6 border-t gold-hairline space-y-4">
                <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-[#9A6B10] dark:text-[#E6B84C]">
                  English Exposition
                </h3>
                {entry.contentEn.map((para, idx) => (
                  <p
                    key={`en-${idx}`}
                    className={`${bodySizeClass} text-[#332717] dark:text-[#D9C7A3] leading-[1.75]`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Key Points */}
            {entry.keyPoints.length > 0 && (
              <div className="mt-8 pt-6 border-t gold-hairline">
                <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-[#9A6B10] dark:text-[#E6B84C]">
                  Key Teachings · အဓိကအနှစ်ချုပ်
                </h3>
                <ul className="mt-3 space-y-3">
                  {entry.keyPoints.map((pt, i) => (
                    <li
                      key={i}
                      className="rounded-lg border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] p-4 text-sm"
                    >
                      {languageMode !== 'en' && (
                        <p className="font-medium text-[#1F170D] dark:text-[#FAF3E0] leading-relaxed">
                          {pt.mm}
                        </p>
                      )}
                      {languageMode !== 'mm' && (
                        <p className="mt-1 text-xs text-[#6E5A3E] dark:text-[#C8B48E] leading-relaxed">
                          {pt.en}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Daily Practice / Moral */}
            <div className="mt-8 rounded-xl border gold-hairline bg-[#F4EAD2] dark:bg-[#1D150C] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8C6418] dark:text-[#E6B84C]">
                Daily Practice · လက်တွေ့ကျင့်သုံးရန်
              </p>
              {languageMode !== 'en' && (
                <p className="mt-2 text-sm sm:text-base text-[#1F170D] dark:text-[#FAF3E0] leading-relaxed">
                  {entry.moralOrPracticeMm}
                </p>
              )}
              {languageMode !== 'mm' && (
                <p className="mt-1.5 text-sm text-[#5E4A30] dark:text-[#D5C39F] leading-relaxed">
                  {entry.moralOrPracticeEn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Prev / Next Discourse Navigation */}
        <div className="px-4 sm:px-6 py-3 border-t gold-hairline bg-[#F4EAD2] dark:bg-[#1B140C] flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            disabled={!onPrev}
            onClick={onPrev ?? undefined}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1F170D] dark:text-[#FAF3E0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E7D8B6] dark:hover:bg-[#2B2014] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            disabled={!onNext}
            onClick={onNext ?? undefined}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1F170D] dark:text-[#FAF3E0] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E7D8B6] dark:hover:bg-[#2B2014] cursor-pointer"
          >
            <span>Next Discourse</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
