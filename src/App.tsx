/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DailyDhammaSection } from './components/DailyDhammaSection';
import { DhammaReaderModal } from './components/DhammaReaderModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MobileBottomNav } from './components/MobileBottomNav';
import { NotificationToast } from './components/NotificationToast';
import { SearchAndCatalog } from './components/SearchAndCatalog';
import { TipitakaShowcase } from './components/TipitakaShowcase';
import { TopBar } from './components/TopBar';
import { ALL_DHAMMA_ENTRIES, searchDhammaEntries } from './data';
import { getDailyQuoteForDate } from './data/dailyDhammaData';
import { useDailyNotification } from './hooks/useDailyNotification';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { DhammaEntry, GoldTheme, LanguageMode, PitakaType } from './types/dhamma';

const SAVED_STORAGE_KEY = 'kks_buddha_saved_ids_v1';
const THEME_STORAGE_KEY = 'kks_buddha_gold_theme_v1';
const LANG_STORAGE_KEY = 'kks_buddha_lang_mode_v1';

export default function App() {
  const [languageMode, setLanguageMode] = useState<LanguageMode>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'both' || saved === 'mm' || saved === 'en') return saved;
    } catch {
      // Ignore storage errors
    }
    return 'both';
  });

  const [goldTheme, setGoldTheme] = useState<GoldTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'sunlit' || saved === 'obsidian') return saved;
    } catch {
      // Ignore storage errors
    }
    return 'sunlit';
  });

  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(SAVED_STORAGE_KEY);
      if (raw) {
        return new Set(JSON.parse(raw) as string[]);
      }
    } catch {
      // Ignore storage errors
    }
    return new Set(['sutta-sn56-11-dhammacakka', 'paritta-mangala-sutta', 'abh-patthana']);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [pitakaFilter, setPitakaFilter] = useState<PitakaType | 'all' | 'saved'>('all');
  const [nikayaFilter, setNikayaFilter] = useState<string>('all');
  const [activeEntry, setActiveEntry] = useState<DhammaEntry | null>(null);
  const [mobileTab, setMobileTab] = useState<'home' | 'tipitaka' | 'jataka' | 'daily'>('home');

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const isOnline = useOnlineStatus();

  const {
    settings: notifSettings,
    permission: notifPermission,
    activeToastQuote,
    deliveryStatusMessage,
    requestPermission,
    toggleEnabled,
    updateSettings,
    dispatchDhammaNotification,
    dismissToast,
  } = useDailyNotification();

  // Sync Tailwind dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', goldTheme === 'obsidian');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, goldTheme);
    } catch {
      // Ignore storage errors
    }
  }, [goldTheme]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, languageMode);
    } catch {
      // Ignore storage errors
    }
  }, [languageMode]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(Array.from(savedIds)));
    } catch {
      // Ignore storage errors
    }
  }, [savedIds]);

  const todayQuote = useMemo(() => getDailyQuoteForDate(new Date(), 'all'), []);

  const availableNikayas = useMemo(() => {
    const base =
      pitakaFilter === 'all'
        ? ALL_DHAMMA_ENTRIES
        : pitakaFilter === 'saved'
        ? ALL_DHAMMA_ENTRIES.filter((e) => savedIds.has(e.id))
        : ALL_DHAMMA_ENTRIES.filter((e) => e.pitaka === pitakaFilter);
    return Array.from(new Set(base.map((e) => e.nikaya)));
  }, [pitakaFilter, savedIds]);

  const filteredEntries = useMemo(
    () => searchDhammaEntries(ALL_DHAMMA_ENTRIES, searchQuery, pitakaFilter, savedIds, nikayaFilter),
    [searchQuery, pitakaFilter, savedIds, nikayaFilter]
  );

  const handleToggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handlePitakaChange = useCallback((next: PitakaType | 'all' | 'saved') => {
    setPitakaFilter(next);
    setNikayaFilter('all');
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleTopNavigate = useCallback(
    (target: string) => {
      if (target === 'jataka-jump') {
        handlePitakaChange('jataka');
        scrollToSection('catalog');
        return;
      }
      if (target === 'saved-jump') {
        handlePitakaChange('saved');
        scrollToSection('catalog');
        return;
      }
      scrollToSection(target);
    },
    [handlePitakaChange, scrollToSection]
  );

  const handleFocusSearch = useCallback(() => {
    scrollToSection('catalog');
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 300);
  }, [scrollToSection]);

  const handleSelectPitakaFromShowcase = useCallback(
    (pitaka: PitakaType) => {
      handlePitakaChange(pitaka);
      scrollToSection('catalog');
    },
    [handlePitakaChange, scrollToSection]
  );

  const handleMobileTab = useCallback(
    (tab: 'home' | 'tipitaka' | 'jataka' | 'daily') => {
      setMobileTab(tab);
      if (tab === 'home') {
        scrollToSection('overview');
      } else if (tab === 'tipitaka') {
        handlePitakaChange('all');
        scrollToSection('tipitaka');
      } else if (tab === 'jataka') {
        handlePitakaChange('jataka');
        scrollToSection('catalog');
      } else if (tab === 'daily') {
        scrollToSection('daily-dhamma');
      }
    },
    [handlePitakaChange, scrollToSection]
  );

  const handleOpenEntryById = useCallback((entryId: string) => {
    const found = ALL_DHAMMA_ENTRIES.find((e) => e.id === entryId);
    if (found) {
      setActiveEntry(found);
    }
  }, []);

  const activeIndex = useMemo(() => {
    if (!activeEntry) return -1;
    return filteredEntries.findIndex((e) => e.id === activeEntry.id);
  }, [activeEntry, filteredEntries]);

  const handlePrevEntry =
    activeIndex > 0 ? () => setActiveEntry(filteredEntries[activeIndex - 1]) : null;
  const handleNextEntry =
    activeIndex >= 0 && activeIndex < filteredEntries.length - 1
      ? () => setActiveEntry(filteredEntries[activeIndex + 1])
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6EA] dark:bg-[#120D07] text-[#1F170D] dark:text-[#FAF3E0]">
      <TopBar onNavigate={handleTopNavigate} onFocusSearch={handleFocusSearch} />

      <main className="flex-1">
        <HeroSection
          todayQuote={todayQuote}
          languageMode={languageMode}
          onChangeLanguage={setLanguageMode}
          goldTheme={goldTheme}
          onToggleTheme={() => setGoldTheme((t) => (t === 'sunlit' ? 'obsidian' : 'sunlit'))}
          notificationsEnabled={notifSettings.enabled}
          onOpenNotifications={() => scrollToSection('daily-dhamma')}
          onReadQuoteDiscourse={handleOpenEntryById}
          onExploreCanon={() => scrollToSection('catalog')}
        />

        <TipitakaShowcase
          onSelectPitaka={handleSelectPitakaFromShowcase}
          onOpenEntryById={handleOpenEntryById}
        />

        <SearchAndCatalog
          entries={filteredEntries}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          pitakaFilter={pitakaFilter}
          onPitakaFilterChange={handlePitakaChange}
          nikayaFilter={nikayaFilter}
          onNikayaFilterChange={setNikayaFilter}
          availableNikayas={availableNikayas}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onOpenEntry={setActiveEntry}
          languageMode={languageMode}
          searchInputRef={searchInputRef}
        />

        <DailyDhammaSection
          settings={notifSettings}
          permission={notifPermission}
          deliveryStatusMessage={deliveryStatusMessage}
          onToggleEnabled={toggleEnabled}
          onUpdateSettings={updateSettings}
          onSendNow={() => dispatchDhammaNotification()}
          onRequestPermission={requestPermission}
          onReadLinkedEntry={handleOpenEntryById}
          languageMode={languageMode}
        />
      </main>

      <Footer onSelectPitaka={handleSelectPitakaFromShowcase} />

      <MobileBottomNav activeTab={mobileTab} onSelectTab={handleMobileTab} />

      <DhammaReaderModal
        entry={activeEntry}
        onClose={() => setActiveEntry(null)}
        languageMode={languageMode}
        onChangeLanguage={setLanguageMode}
        isSaved={activeEntry ? savedIds.has(activeEntry.id) : false}
        onToggleSave={handleToggleSave}
        onPrev={handlePrevEntry}
        onNext={handleNextEntry}
      />

      <NotificationToast
        quote={activeToastQuote}
        language={notifSettings.language}
        onDismiss={dismissToast}
        onReadEntry={handleOpenEntryById}
      />

      {!isOnline && (
        <div
          role="status"
          className="fixed bottom-16 md:bottom-4 left-4 z-50 rounded-lg border border-[#D4A02C]/50 bg-[#1B130B] px-3 py-1.5 text-xs font-medium text-[#F5D57A] shadow-lg"
        >
          Offline Mode — Reading from cached Tipiṭaka library
        </div>
      )}
    </div>
  );
}
