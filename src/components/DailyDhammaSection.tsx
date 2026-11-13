import React, { useState } from 'react';
import { Bell, BellRing, CheckCircle2, ChevronLeft, ChevronRight, Clock, Send, ShieldAlert } from 'lucide-react';
import { dailyQuotes } from '../data/dailyDhammaData';
import { BrowserPermissionState } from '../hooks/useDailyNotification';
import { LanguageMode, NotificationSettings } from '../types/dhamma';

interface DailyDhammaSectionProps {
  settings: NotificationSettings;
  permission: BrowserPermissionState;
  deliveryStatusMessage: string | null;
  onToggleEnabled: (enabled: boolean) => Promise<void>;
  onUpdateSettings: (patch: Partial<NotificationSettings>) => void;
  onSendNow: () => Promise<void>;
  onRequestPermission: () => Promise<BrowserPermissionState>;
  onReadLinkedEntry: (entryId: string) => void;
  languageMode: LanguageMode;
}

export const DailyDhammaSection: React.FC<DailyDhammaSectionProps> = ({
  settings,
  permission,
  deliveryStatusMessage,
  onToggleEnabled,
  onUpdateSettings,
  onSendNow,
  onRequestPermission,
  onReadLinkedEntry,
  languageMode,
}) => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const currentQuote = dailyQuotes[quoteIdx];

  const handlePrevQuote = () => {
    setQuoteIdx((prev) => (prev - 1 + dailyQuotes.length) % dailyQuotes.length);
  };

  const handleNextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % dailyQuotes.length);
  };

  const renderPermissionLabel = () => {
    if (permission === 'granted') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          <span>Browser Notifications Allowed · ခွင့်ပြုပြီး</span>
        </span>
      );
    }
    if (permission === 'denied') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 dark:text-amber-400">
          <ShieldAlert className="w-4 h-4" aria-hidden="true" />
          <span>Browser Blocked — Using In-App Alerts · App အတွင်းပြသမည်</span>
        </span>
      );
    }
    if (permission === 'unsupported') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7B5D2E] dark:text-[#C8B48E]">
          <Bell className="w-4 h-4" aria-hidden="true" />
          <span>In-App Notification Mode Active</span>
        </span>
      );
    }
    return (
      <button
        type="button"
        onClick={() => void onRequestPermission()}
        className="text-xs font-semibold text-[#9A6B10] dark:text-[#F5D57A] underline underline-offset-4 cursor-pointer"
      >
        Enable Browser Permission · ခွင့်ပြုချက်ပေးရန်
      </button>
    );
  };

  return (
    <section id="daily-dhamma" className="py-12 md:py-16 border-b gold-hairline bg-[#F4EAD2]/65 dark:bg-[#17110A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b gold-hairline">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#9A6B10] dark:text-[#E6B84C]">
              Daily Dhamma &amp; Reminder System · နေ့စဉ်တရားတော် နှင့် Notification စနစ်
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-semibold text-[#1F170D] dark:text-[#FAF3E0]">
              Daily Contemplation &amp; Scheduled Alerts
            </h2>
          </div>
          <p className="text-xs text-[#6E5A3E] dark:text-[#A99573] tabular-nums">
            Verse {quoteIdx + 1} of {dailyQuotes.length}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Daily Dhamma Contemplation Browser */}
          <div className="lg:col-span-7 rounded-xl border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 text-xs text-[#8C6418] dark:text-[#E6B84C]">
                <span className="font-semibold uppercase tracking-wider">
                  Daily Dhamma Reflection
                </span>
                <span className="tabular-nums text-[#6E5A3E] dark:text-[#A99573]">
                  {currentQuote.sourceRef}
                </span>
              </div>

              <p className="mt-5 font-display italic text-xl sm:text-2xl text-[#7B520B] dark:text-[#F5D57A] leading-relaxed">
                “{currentQuote.pali}”
              </p>

              {languageMode !== 'en' && (
                <p className="mt-4 font-myanmar-serif text-base sm:text-lg text-[#1F170D] dark:text-[#FAF3E0] leading-[1.85]">
                  {currentQuote.textMm}
                </p>
              )}

              {languageMode !== 'mm' && (
                <p className="mt-3 text-sm sm:text-base text-[#524028] dark:text-[#D5C39F] leading-relaxed">
                  {currentQuote.textEn}
                </p>
              )}

              <div className="mt-6 pt-5 border-t gold-hairline">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9A6B10] dark:text-[#E6B84C]">
                  Practice Today · ယနေ့ကျင့်သုံးရန်
                </p>
                {languageMode !== 'en' && (
                  <p className="mt-2 text-sm text-[#332717] dark:text-[#EDE0C4] leading-relaxed">
                    {currentQuote.reflectionMm}
                  </p>
                )}
                {languageMode !== 'mm' && (
                  <p className="mt-1 text-xs text-[#6E5A3E] dark:text-[#A99573] leading-relaxed">
                    {currentQuote.reflectionEn}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t gold-hairline flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevQuote}
                  aria-label="Previous daily quote"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border gold-hairline text-[#4A3A24] dark:text-[#E5D3AE] hover:border-[#B57E14] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextQuote}
                  aria-label="Next daily quote"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border gold-hairline text-[#4A3A24] dark:text-[#E5D3AE] hover:border-[#B57E14] cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onReadLinkedEntry(currentQuote.linkedEntryId)}
                className="min-h-[44px] px-4 py-2 rounded-lg border border-[#B57E14]/50 text-xs font-semibold text-[#9A6B10] dark:text-[#F5D57A] hover:bg-[#F4EAD2] dark:hover:bg-[#241A0F] transition-colors cursor-pointer"
              >
                Read Source Sutta · မူရင်းတရားဖတ်ရန်
              </button>
            </div>
          </div>

          {/* Right: Daily Notification Scheduler Panel */}
          <div className="lg:col-span-5 rounded-xl border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BellRing className="w-5 h-5 text-[#B57E14] dark:text-[#E6B84C]" aria-hidden="true" />
                  <h3 className="font-display text-xl font-semibold text-[#1F170D] dark:text-[#FAF3E0]">
                    Daily Dhamma Notification
                  </h3>
                </div>
              </div>

              <p className="mt-1.5 text-xs text-[#6E5A3E] dark:text-[#C8B48E] leading-relaxed">
                နေ့စဉ်သတ်မှတ်ထားသော အချိန်ရောက်တိုင်း တရားတော် Notification ပေးပို့ပေးပါမည်။
              </p>

              <div className="mt-3">{renderPermissionLabel()}</div>

              <div className="mt-5 space-y-4">
                {/* Enable Switch */}
                <div className="flex items-center justify-between gap-4 py-3 border-y gold-hairline">
                  <div>
                    <p className="text-sm font-medium text-[#1F170D] dark:text-[#FAF3E0]">
                      Daily Reminder · နေ့စဉ်သတိပေးချက်
                    </p>
                    <p className="text-xs text-[#6E5A3E] dark:text-[#A99573]">
                      {settings.enabled ? 'Active · နေ့စဉ်ပေးပို့နေပါသည်' : 'Paused · ပိတ်ထားပါသည်'}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.enabled}
                    onClick={() => void onToggleEnabled(!settings.enabled)}
                    className={`min-h-[44px] px-4 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      settings.enabled
                        ? 'bg-[#D4A02C] text-[#140E08]'
                        : 'bg-[#F4EAD2] text-[#4A3A24] dark:bg-[#241A0F] dark:text-[#D5C39F]'
                    }`}
                  >
                    {settings.enabled ? 'Enabled' : 'Turn On'}
                  </button>
                </div>

                {/* Time & Language */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-xs font-medium text-[#5E4A30] dark:text-[#D5C39F] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#9A6B10] dark:text-[#E6B84C]" aria-hidden="true" />
                      <span>Reminder Time · အချိန်</span>
                    </span>
                    <input
                      type="time"
                      value={settings.time}
                      onChange={(e) => onUpdateSettings({ time: e.target.value })}
                      className="mt-1.5 w-full min-h-[44px] px-3 rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07] text-sm text-[#1F170D] dark:text-[#FAF3E0] tabular-nums"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-[#5E4A30] dark:text-[#D5C39F]">
                      Notification Language · ဘာသာ
                    </span>
                    <select
                      value={settings.language}
                      onChange={(e) => onUpdateSettings({ language: e.target.value as LanguageMode })}
                      className="mt-1.5 w-full min-h-[44px] px-3 rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07] text-sm text-[#1F170D] dark:text-[#FAF3E0]"
                    >
                      <option value="both">မြန်မာ + English</option>
                      <option value="mm">မြန်မာသီးသန့်</option>
                      <option value="en">English Only</option>
                    </select>
                  </label>
                </div>

                {/* Category */}
                <label className="block">
                  <span className="text-xs font-medium text-[#5E4A30] dark:text-[#D5C39F]">
                    Dhamma Topic · တရားအမျိုးအစား
                  </span>
                  <select
                    value={settings.category}
                    onChange={(e) =>
                      onUpdateSettings({
                        category: e.target.value as NotificationSettings['category'],
                      })
                    }
                    className="mt-1.5 w-full min-h-[44px] px-3 rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07] text-sm text-[#1F170D] dark:text-[#FAF3E0]"
                  >
                    <option value="all">All Tipiṭaka &amp; Jātaka · အားလုံးစုံ</option>
                    <option value="sutta">Sutta &amp; Mindfulness · သုတ္တန်တရား</option>
                    <option value="jataka">Jātaka Morals · ဇာတ်တော်ဆုံးမစာ</option>
                    <option value="abhidhamma">Abhidhamma Insights · အဘိဓမ္မာ</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t gold-hairline">
              <button
                type="button"
                onClick={() => void onSendNow()}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1F170D] dark:bg-[#D4A02C] text-[#FAF3E0] dark:text-[#140E08] text-xs font-semibold hover:bg-[#3A2B18] dark:hover:bg-[#E8BE5A] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Send Daily Dhamma Notification Now · ယခုပေးပို့စမ်းသပ်ရန်</span>
              </button>

              {deliveryStatusMessage && (
                <p className="mt-2.5 text-xs text-[#6E5A3E] dark:text-[#C8B48E] leading-relaxed">
                  {deliveryStatusMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
