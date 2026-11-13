import { useCallback, useEffect, useState } from 'react';
import { getDailyQuoteForDate } from '../data/dailyDhammaData';
import { DailyQuote, NotificationSettings } from '../types/dhamma';

const STORAGE_KEY = 'kks_buddha_notification_settings_v1';

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: false,
  time: '07:00',
  language: 'both',
  category: 'all',
  lastSentDate: null,
};

export type BrowserPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function useDailyNotification() {
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_SETTINGS;
  });

  const [permission, setPermission] = useState<BrowserPermissionState>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    return Notification.permission as BrowserPermissionState;
  });

  const [activeToastQuote, setActiveToastQuote] = useState<DailyQuote | null>(null);
  const [deliveryStatusMessage, setDeliveryStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage errors
    }
  }, [settings]);

  const requestPermission = useCallback(async (): Promise<BrowserPermissionState> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported');
      return 'unsupported';
    }
    try {
      const res = await Notification.requestPermission();
      const typed = res as BrowserPermissionState;
      setPermission(typed);
      return typed;
    } catch {
      return permission;
    }
  }, [permission]);

  const dispatchDhammaNotification = useCallback(
    async (quoteOverride?: DailyQuote) => {
      const quote = quoteOverride ?? getDailyQuoteForDate(new Date(), settings.category);
      const title = `KKS BUDDHA · ${quote.sourceRef}`;
      const body =
        settings.language === 'mm'
          ? quote.textMm
          : settings.language === 'en'
          ? quote.textEn
          : `${quote.textMm}\n\n${quote.textEn}`;

      // Always show in-app golden banner so users see it immediately even inside iframe previews
      setActiveToastQuote(quote);

      let sentViaOS = false;
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.getRegistration();
            if (reg && 'showNotification' in reg) {
              await reg.showNotification(title, {
                body,
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
                tag: `kks-buddha-daily-${getTodayDateString()}`,
              });
              sentViaOS = true;
            }
          }
          if (!sentViaOS) {
            new Notification(title, {
              body,
              icon: '/pwa-192x192.png',
            });
            sentViaOS = true;
          }
        } catch {
          sentViaOS = false;
        }
      }

      setDeliveryStatusMessage(
        sentViaOS
          ? 'နေ့စဉ်တရားတော် Notification ကို Browser နှင့် App နှစ်မျိုးလုံးဖြင့် ပေးပို့ပြီးပါပြီ (Delivered via Browser & In-App).'
          : 'တရားတော် Notification ကို App အတွင်း ပြသပေးလိုက်ပါပြီ (Displayed in-app; enable browser permission for background alerts).'
      );
    },
    [settings.category, settings.language]
  );

  const toggleEnabled = useCallback(
    async (nextEnabled: boolean) => {
      if (nextEnabled && permission === 'default') {
        await requestPermission();
      }
      setSettings((prev) => ({ ...prev, enabled: nextEnabled }));
    },
    [permission, requestPermission]
  );

  const updateSettings = useCallback((patch: Partial<NotificationSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const dismissToast = useCallback(() => {
    setActiveToastQuote(null);
  }, []);

  // Scheduled check every 30 seconds while app is active
  useEffect(() => {
    if (!settings.enabled) return;

    const checkSchedule = () => {
      const today = getTodayDateString();
      if (settings.lastSentDate === today) return;

      const now = new Date();
      const [targetHour, targetMinute] = settings.time.split(':').map(Number);
      const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
      const targetTotalMinutes = targetHour * 60 + targetMinute;

      if (currentTotalMinutes >= targetTotalMinutes) {
        const quote = getDailyQuoteForDate(now, settings.category);
        void dispatchDhammaNotification(quote);
        setSettings((prev) => ({ ...prev, lastSentDate: today }));
      }
    };

    checkSchedule();
    const interval = window.setInterval(checkSchedule, 30000);
    return () => window.clearInterval(interval);
  }, [settings.enabled, settings.time, settings.lastSentDate, settings.category, dispatchDhammaNotification]);

  return {
    settings,
    permission,
    activeToastQuote,
    deliveryStatusMessage,
    requestPermission,
    toggleEnabled,
    updateSettings,
    dispatchDhammaNotification,
    dismissToast,
  };
}
