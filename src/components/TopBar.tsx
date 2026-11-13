import React from 'react';
import { Search } from 'lucide-react';
import { DharmacakraMark } from './DharmacakraMark';

interface TopBarProps {
  onNavigate: (sectionId: string) => void;
  onFocusSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate, onFocusSearch }) => {
  return (
    <header className="sticky top-0 z-40 border-b gold-hairline bg-[#FBF6EA]/95 dark:bg-[#120D07]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 md:h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#overview"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('overview');
          }}
          className="inline-flex items-center gap-2.5 text-base md:text-lg font-display font-bold tracking-[0.06em] text-[#1F170D] dark:text-[#F5D57A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B57E14]"
        >
          <DharmacakraMark className="w-5 h-5 text-[#B57E14] dark:text-[#E6B84C] shrink-0" />
          <span>KKS BUDDHA</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#524028] dark:text-[#D9C7A3]">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('overview');
            }}
            className="hover:text-[#9A6B10] dark:hover:text-[#F5D57A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Overview
          </a>
          <a
            href="#tipitaka"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('tipitaka');
            }}
            className="hover:text-[#9A6B10] dark:hover:text-[#F5D57A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Tipiṭaka
          </a>
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('jataka-jump');
            }}
            className="hover:text-[#9A6B10] dark:hover:text-[#F5D57A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Jātaka
          </a>
          <a
            href="#daily-dhamma"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('daily-dhamma');
            }}
            className="hover:text-[#9A6B10] dark:hover:text-[#F5D57A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Daily Dhamma
          </a>
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('saved-jump');
            }}
            className="hover:text-[#9A6B10] dark:hover:text-[#F5D57A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Saved
          </a>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onFocusSearch}
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-1.5 rounded-lg bg-[#1F170D] dark:bg-[#D4A02C] text-[#FBF6EA] dark:text-[#171108] text-xs font-semibold hover:bg-[#3A2B18] dark:hover:bg-[#E6B84C] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B57E14]"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </header>
  );
};
