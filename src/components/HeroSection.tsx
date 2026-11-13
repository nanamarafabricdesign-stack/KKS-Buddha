import React, { useState } from 'react';
import { Bell, Download, Moon, Sun, ArrowRight } from 'lucide-react';
import { DailyQuote, GoldTheme, LanguageMode } from '../types/dhamma';
import { usePWAInstall } from '../hooks/usePWAInstall';
import heroPagodaImg from '../assets/images/hero_golden_pagoda_1794583070894.jpg';

interface HeroSectionProps {
  todayQuote: DailyQuote;
  languageMode: LanguageMode;
  onChangeLanguage: (mode: LanguageMode) => void;
  goldTheme: GoldTheme;
  onToggleTheme: () => void;
  notificationsEnabled: boolean;
  onOpenNotifications: () => void;
  onReadQuoteDiscourse: (entryId: string) => void;
  onExploreCanon: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  todayQuote,
  languageMode,
  onChangeLanguage,
  goldTheme,
  onToggleTheme,
  notificationsEnabled,
  onOpenNotifications,
  onReadQuoteDiscourse,
  onExploreCanon,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="overview" className="border-b gold-hairline bg-[#181109] text-[#FAF3E0]">
      <div className="relative overflow-hidden">
        {/* Background Sacred Pagoda Image with WCAG-compliant Scrim */}
        {!imgError ? (
          <img
            src={heroPagodaImg}
            alt="Golden Myanmar Pagoda at Dawn"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-55"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2B1E0D] via-[#1A130B] to-[#110C07]" />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#130D07]/95 via-[#181109]/85 to-[#130D07]/65"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Primary Editorial Anchor */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#E6B84C]">
                Theravāda Tipiṭaka Sanctuary · ထေရဝါဒဗုဒ္ဓစာပေ
              </p>

              <h1 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FFF7E2] leading-[1.12] [text-wrap:balance]">
                <span className="gold-gradient-text">KKS BUDDHA</span>
              </h1>

              <p className="mt-3 font-myanmar-serif text-lg sm:text-2xl text-[#F3E2BA] leading-relaxed [text-wrap:balance]">
                ပိဋကတ်သုံးပုံ၊ မဟာနိပါတ်ဇာတ်တော်ကြီးများ နှင့် နေ့စဉ်တရားတော်များ
              </p>

              <p className="mt-3 text-sm sm:text-base text-[#D9C7A3] max-w-2xl leading-relaxed">
                Explore authentic Vinaya, Sutta, Abhidhamma, Ten Great Jātakas, and Paritta chants in accurate Burmese and English—designed for serene daily reading and contemplation.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onExploreCanon}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-lg bg-[#D4A02C] text-[#140E08] text-sm font-semibold hover:bg-[#E8BE5A] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Browse Tipiṭaka · ပိဋကတ်ကြည့်ရန်</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Daily Dhamma Focal Card */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#D4A02C]/35 bg-[#1F160C]/85 backdrop-blur-md p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-[#E6B84C]">
                  <span className="font-medium tracking-wider uppercase">
                    Today’s Dhamma · ယနေ့တရားတော်
                  </span>
                  <span className="text-[#C7B084] tabular-nums">{todayQuote.sourceRef}</span>
                </div>

                <p className="mt-4 font-display italic text-base sm:text-lg text-[#F5D57A] leading-relaxed">
                  “{todayQuote.pali}”
                </p>

                {languageMode !== 'en' && (
                  <p className="mt-3 text-sm sm:text-base text-[#FAF3E0] leading-relaxed">
                    {todayQuote.textMm}
                  </p>
                )}
                {languageMode !== 'mm' && (
                  <p className="mt-2.5 text-sm text-[#D9C7A3] leading-relaxed">
                    {todayQuote.textEn}
                  </p>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[#D4A02C]/25 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onReadQuoteDiscourse(todayQuote.linkedEntryId)}
                  className="min-h-[40px] text-xs font-semibold text-[#F5D57A] hover:text-[#FFF2C6] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                >
                  Read Full Sutta · အပြည့်အစုံဖတ်ရန်
                </button>
                <button
                  type="button"
                  onClick={onOpenNotifications}
                  className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-medium text-[#E5D3AE] hover:text-[#F5D57A] cursor-pointer whitespace-nowrap"
                >
                  <Bell className="w-3.5 h-3.5 text-[#E6B84C]" aria-hidden="true" />
                  <span>{notificationsEnabled ? 'Daily Alert On' : 'Set Daily Alert'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Utility Bar below Hero (Language, Gold Tone, Notification, PWA Install) */}
      <div className="border-t border-[#D4A02C]/20 bg-[#140E08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Language Switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#B59F76] hidden sm:inline">Language:</span>
            <div className="inline-flex items-center p-1 rounded-lg bg-[#241A0F] border border-[#D4A02C]/25">
              {(
                [
                  { id: 'both', label: 'မြန်မာ + EN' },
                  { id: 'mm', label: 'မြန်မာ' },
                  { id: 'en', label: 'English' },
                ] as { id: LanguageMode; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangeLanguage(opt.id)}
                  className={`min-h-[36px] px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    languageMode === opt.id
                      ? 'bg-[#D4A02C] text-[#140E08]'
                      : 'text-[#D9C7A3] hover:text-[#FAF3E0]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls: Gold Mode Variant, Notification, Install */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleTheme}
              className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#D4A02C]/30 bg-[#241A0F] text-xs font-medium text-[#F3E2BA] hover:border-[#E6B84C] transition-colors whitespace-nowrap cursor-pointer"
            >
              {goldTheme === 'sunlit' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#E6B84C]" aria-hidden="true" />
                  <span>Obsidian Gold</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#E6B84C]" aria-hidden="true" />
                  <span>Sunlit Gold</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenNotifications}
              className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#D4A02C]/30 bg-[#241A0F] text-xs font-medium text-[#F3E2BA] hover:border-[#E6B84C] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#E6B84C]" aria-hidden="true" />
              <span>Daily Notification</span>
            </button>

            {!isInstalled && isInstallable && (
              <button
                type="button"
                onClick={() => void install()}
                className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D4A02C] text-xs font-semibold text-[#140E08] hover:bg-[#E8BE5A] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Install App</span>
              </button>
            )}

            {!isInstalled && !isInstallable && isIOS && (
              <button
                type="button"
                onClick={() => setShowIOSGuide(true)}
                className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#D4A02C]/40 text-xs font-medium text-[#F5D57A] hover:bg-[#241A0F] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Install on iOS</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* iOS Install Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-xl border border-[#D4A02C]/40 bg-[#1B130B] p-6 text-[#FAF3E0] shadow-2xl">
            <h3 className="font-display text-xl font-semibold text-[#F5D57A]">
              Install KKS BUDDHA on iPhone / iPad
            </h3>
            <p className="mt-3 text-sm text-[#D9C7A3] leading-relaxed">
              1. Tap the <strong>Share</strong> button in Safari.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
              3. Open KKS BUDDHA directly from your home screen.
            </p>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full min-h-[44px] rounded-lg bg-[#D4A02C] text-[#140E08] text-sm font-semibold hover:bg-[#E8BE5A] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
