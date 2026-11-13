import React from 'react';
import { DharmacakraMark } from './DharmacakraMark';
import { PitakaType } from '../types/dhamma';

interface FooterProps {
  onSelectPitaka: (pitaka: PitakaType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPitaka }) => {
  return (
    <footer className="bg-[#181109] text-[#D9C7A3] border-t border-[#D4A02C]/30 pb-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#D4A02C]/20">
          <div className="flex items-center gap-3">
            <DharmacakraMark className="w-6 h-6 text-[#E6B84C]" />
            <div>
              <p className="font-display text-lg font-semibold tracking-wider text-[#F5D57A]">
                KKS BUDDHA
              </p>
              <p className="text-xs text-[#B59F76]">
                Theravāda Tipiṭaka, Mahānipāta Jātakas &amp; Daily Dhamma
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            {(
              [
                { id: 'vinaya', label: 'Vinaya · ဝိနည်း' },
                { id: 'sutta', label: 'Sutta · သုတ္တန်' },
                { id: 'abhidhamma', label: 'Abhidhamma · အဘိဓမ္မာ' },
                { id: 'jataka', label: 'Jātaka · ဇာတ်တော်' },
                { id: 'paritta', label: 'Paritta · ပရိတ်တော်' },
              ] as { id: PitakaType; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectPitaka(item.id)}
                className="min-h-[36px] text-[#D9C7A3] hover:text-[#F5D57A] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated small offering text requested by the user */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-[#E6B84C]/90 tracking-wide">
            ဘားမားပါတိတ် BURMA BATIKမှ ပူဇော်ပါသည်
          </p>
          <p className="text-[11px] text-[#9A8560]">
            Sabbadānaṃ dhammadānaṃ jināti — The gift of Dhamma excels all gifts.
          </p>
        </div>
      </div>
    </footer>
  );
};
