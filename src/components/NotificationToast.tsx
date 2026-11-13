import React from 'react';
import { BellRing, X } from 'lucide-react';
import { DailyQuote, LanguageMode } from '../types/dhamma';

interface NotificationToastProps {
  quote: DailyQuote | null;
  language: LanguageMode;
  onDismiss: () => void;
  onReadEntry: (entryId: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  quote,
  language,
  onDismiss,
  onReadEntry,
}) => {
  if (!quote) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-16 md:bottom-6 right-4 left-4 sm:left-auto sm:w-[400px] z-50 rounded-xl border border-[#D4A02C]/60 bg-[#1B130B] text-[#FAF3E0] p-4 shadow-2xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#F5D57A]">
          <BellRing className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>KKS BUDDHA · Daily Dhamma</span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="min-w-[36px] min-h-[36px] -mt-1 -mr-1 flex items-center justify-center rounded-lg text-[#C8B48E] hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-1 text-[11px] text-[#B59F76]">{quote.sourceRef}</p>

      {language !== 'en' && (
        <p className="mt-2 text-sm text-[#FAF3E0] leading-relaxed">{quote.textMm}</p>
      )}
      {language !== 'mm' && (
        <p className="mt-1.5 text-xs text-[#D9C7A3] leading-relaxed">{quote.textEn}</p>
      )}

      <div className="mt-3 pt-2.5 border-t border-[#D4A02C]/25 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            onReadEntry(quote.linkedEntryId);
            onDismiss();
          }}
          className="min-h-[36px] px-3 py-1 rounded-md bg-[#D4A02C] text-[#140E08] text-xs font-semibold hover:bg-[#E8BE5A] cursor-pointer"
        >
          Open Discourse · ဖတ်ရှုရန်
        </button>
      </div>
    </div>
  );
};
