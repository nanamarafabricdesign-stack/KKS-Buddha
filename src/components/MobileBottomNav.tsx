import React from 'react';
import { BookOpen, Bell, Home, ScrollText } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'home' | 'tipitaka' | 'jataka' | 'daily';
  onSelectTab: (tab: 'home' | 'tipitaka' | 'jataka' | 'daily') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onSelectTab }) => {
  const items: { id: 'home' | 'tipitaka' | 'jataka' | 'daily'; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" aria-hidden="true" /> },
    { id: 'tipitaka', label: 'Tipiṭaka', icon: <BookOpen className="w-5 h-5" aria-hidden="true" /> },
    { id: 'jataka', label: 'Jātaka', icon: <ScrollText className="w-5 h-5" aria-hidden="true" /> },
    { id: 'daily', label: 'Daily', icon: <Bell className="w-5 h-5" aria-hidden="true" /> },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 border-t gold-hairline bg-[#FBF6EA]/95 dark:bg-[#120D07]/95 backdrop-blur-md grid grid-cols-4 items-center"
    >
      {items.map((item) => {
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors cursor-pointer ${
              active
                ? 'text-[#9A6B10] dark:text-[#F5D57A]'
                : 'text-[#6E5A3E] dark:text-[#A99573]'
            }`}
          >
            {item.icon}
            <span className="whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
