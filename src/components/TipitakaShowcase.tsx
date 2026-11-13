import React, { useState } from 'react';
import { ArrowUpRight, BookOpenCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { TIPIṬAKA_CANON_MAP } from '../data/tipitakaCanonMap';
import { PitakaType } from '../types/dhamma';
import manuscriptImg from '../assets/images/tipitaka_palm_manuscript_1794583071590.jpg';
import lotusImg from '../assets/images/jataka_golden_lotus_1794583070439.jpg';

interface TipitakaShowcaseProps {
  onSelectPitaka: (pitaka: PitakaType) => void;
  onOpenEntryById: (entryId: string) => void;
}

export const TipitakaShowcase: React.FC<TipitakaShowcaseProps> = ({
  onSelectPitaka,
  onOpenEntryById,
}) => {
  const [manuscriptError, setManuscriptError] = useState(false);
  const [lotusError, setLotusError] = useState(false);
  const [showCanonMap, setShowCanonMap] = useState(false);

  const threeBaskets: {
    id: PitakaType;
    index: string;
    pali: string;
    mm: string;
    en: string;
    descMm: string;
    descEn: string;
    volumes: string;
  }[] = [
    {
      id: 'vinaya',
      index: '01',
      pali: 'Vinaya Piṭaka',
      mm: 'ဝိနည်းပိဋကတ်',
      en: 'Basket of Discipline',
      descMm: 'သုတ္တဝိဘင်္ဂ (၂၂၇ သိက္ခာပုဒ်)၊ မဟာဝဂ်၊ စူဠဝဂ် နှင့် ပရိဝါရ ၅ ကျမ်း — သာသနာတော်၏ အသက်ဖြစ်သော စည်းကမ်းကျင့်ဝတ်များ။',
      descEn: 'Suttavibhaṅga (227 Pātimokkha rules), Khandhaka (Mahāvagga & Cullavagga), and Parivāra—preserving ethical harmony and the Buddhist Councils.',
      volumes: '5 Books · 5 ကျမ်း',
    },
    {
      id: 'sutta',
      index: '02',
      pali: 'Sutta Piṭaka',
      mm: 'သုတ္တန်ပိဋကတ်',
      en: 'Basket of Discourses',
      descMm: 'ဒီဃ၊ မဇ္ဈိမ၊ သံယုတ္တ၊ အင်္ဂုတ္တရ၊ ခုဒ္ဒက နိကာယ် ၅ ရပ် — ဓမ္မစကြာ၊ မဟာသတိပဋ္ဌာန်၊ ကာလာမ၊ ဓမ္မပဒ စသော တရားတော်များ။',
      descEn: 'The Five Nikāyas—Dīgha, Majjhima, Saṃyutta, Aṅguttara, and Khuddaka—containing the core path of mindfulness, ethics, and liberation.',
      volumes: '5 Nikāyas · နိကာယ် ၅ ရပ်',
    },
    {
      id: 'abhidhamma',
      index: '03',
      pali: 'Abhidhamma Piṭaka',
      mm: 'အဘိဓမ္မာပိဋကတ်',
      en: 'Basket of Higher Doctrine',
      descMm: 'ဓမ္မသင်္ဂဏီ၊ ဝိဘင်း၊ ဓာတုကထာ၊ ပုဂ္ဂလပညတ်၊ ကထာဝတ္ထု၊ ယမိုက်၊ ပဋ္ဌာန်း (၂၄ ပစ္စည်း) ဟူသော သတ္တပကရဏ် ၇ ကျမ်း။',
      descEn: 'All seven treatises from Dhammasaṅgaṇī to the Mahāpaṭṭhāna’s 24 Conditional Relations mapping mind, matter, and Nibbāna.',
      volumes: '7 Treatises · ၇ ကျမ်း',
    },
  ];

  return (
    <section id="tipitaka" className="py-12 md:py-16 border-b gold-hairline bg-[#FBF6EA] dark:bg-[#120D07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b gold-hairline">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#9A6B10] dark:text-[#E6B84C]">
              The Pāḷi Canon · ပိဋကတ်သုံးပုံ
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-semibold text-[#1F170D] dark:text-[#FAF3E0] [text-wrap:balance]">
              Three Baskets of Theravāda Wisdom
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#5E4A30] dark:text-[#C8B48E]">
              ထေရဝါဒ ပိဋကတ်သုံးပုံ (ဝိနည်း၊ သုတ္တန်၊ အဘိဓမ္မာ) ပါဠိတော် နှင့် ဇာတ်တော်ကြီး ၁၀ ဘွဲ့
            </p>
          </div>
          <p className="text-xs text-[#6E5A3E] dark:text-[#A99573] tabular-nums">
            Sixth Buddhist Council (Chaṭṭha Saṅgāyanā) Tradition
          </p>
        </div>

        {/* Three Baskets Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {threeBaskets.map((basket) => (
            <button
              key={basket.id}
              type="button"
              onClick={() => onSelectPitaka(basket.id)}
              className="group text-left rounded-xl border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] p-6 hover:border-[#B57E14] dark:hover:border-[#E6B84C] transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8C6418] dark:text-[#E6B84C]">
                  <span className="tabular-nums font-medium">
                    {basket.index}. {basket.pali}
                  </span>
                  <span className="text-[#6E5A3E] dark:text-[#A99573]">{basket.volumes}</span>
                </div>
                <h3 className="mt-3 font-myanmar-serif text-xl font-semibold text-[#1F170D] dark:text-[#FAF3E0] group-hover:text-[#9A6B10] dark:group-hover:text-[#F5D57A] transition-colors">
                  {basket.mm}
                </h3>
                <p className="text-xs font-medium text-[#7B5D2E] dark:text-[#C8B48E] mt-0.5">
                  {basket.en}
                </p>
                <p className="mt-3 text-sm text-[#4A3A24] dark:text-[#D5C39F] leading-relaxed">
                  {basket.descMm}
                </p>
                <p className="mt-2 text-xs text-[#6E5A3E] dark:text-[#A99573] leading-relaxed">
                  {basket.descEn}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t gold-hairline flex items-center justify-between text-xs font-semibold text-[#9A6B10] dark:text-[#F5D57A]">
                <span>Explore Section · ဖတ်ရှုရန်</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>

        {/* Two Visual Feature Highlights: Palm-Leaf Tipitaka & Ten Great Jatakas */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div
            onClick={() => onSelectPitaka('abhidhamma')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectPitaka('abhidhamma');
              }
            }}
            className="group rounded-xl border gold-hairline bg-[#F4EAD2] dark:bg-[#1B140C] overflow-hidden grid grid-cols-1 sm:grid-cols-12 cursor-pointer hover:border-[#B57E14] dark:hover:border-[#E6B84C] transition-colors"
          >
            <div className="sm:col-span-5 relative min-h-[180px] bg-[#241A0F]">
              {!manuscriptError ? (
                <img
                  src={manuscriptImg}
                  alt="Gilded Burmese palm-leaf manuscript"
                  referrerPolicy="no-referrer"
                  onError={() => setManuscriptError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 text-center text-xs text-[#E6B84C]">
                  Pe-sa Palm-Leaf Manuscript
                </div>
              )}
            </div>
            <div className="sm:col-span-7 p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#8C6418] dark:text-[#E6B84C]">
                  Abhidhamma &amp; Paṭṭhāna · ၂၄ ပစ္စည်း
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#1F170D] dark:text-[#FAF3E0] group-hover:text-[#9A6B10] dark:group-hover:text-[#F5D57A] transition-colors">
                  All Seven Abhidhamma Treatises &amp; 24 Paccayas
                </h3>
                <p className="mt-2 text-sm text-[#4A3A24] dark:text-[#D5C39F] leading-relaxed">
                  ဓမ္မသင်္ဂဏီမှသည် မဟာပဋ္ဌာန်း ၂၄ ပစ္စည်းတိုင်အောင် အဘိဓမ္မာ ၇ ကျမ်းအပြည့်အစုံကို ပါဠိ-မြန်မာ-အင်္ဂလိပ် ၃ ဘာသာဖြင့် လေ့လာနိုင်ပါသည်။
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-[#9A6B10] dark:text-[#F5D57A] inline-flex items-center gap-1">
                <span>Open Abhidhamma · အဘိဓမ္မာဖတ်ရန်</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onSelectPitaka('jataka')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectPitaka('jataka');
              }
            }}
            className="group rounded-xl border gold-hairline bg-[#F4EAD2] dark:bg-[#1B140C] overflow-hidden grid grid-cols-1 sm:grid-cols-12 cursor-pointer hover:border-[#B57E14] dark:hover:border-[#E6B84C] transition-colors"
          >
            <div className="sm:col-span-5 relative min-h-[180px] bg-[#241A0F]">
              {!lotusError ? (
                <img
                  src={lotusImg}
                  alt="Golden sacred lotus illustration"
                  referrerPolicy="no-referrer"
                  onError={() => setLotusError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 text-center text-xs text-[#E6B84C]">
                  Mahānipāta Jātaka
                </div>
              )}
            </div>
            <div className="sm:col-span-7 p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#8C6418] dark:text-[#E6B84C]">
                  Mahānipāta Jātaka · ဇာတ်တော်ကြီး ၁၀ ဘွဲ့
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#1F170D] dark:text-[#FAF3E0] group-hover:text-[#9A6B10] dark:group-hover:text-[#F5D57A] transition-colors">
                  Ten Great Jātakas &amp; Classic Moral Tales
                </h3>
                <p className="mt-2 text-sm text-[#4A3A24] dark:text-[#D5C39F] leading-relaxed">
                  တေ၊ ဇ၊ သု၊ နေ၊ မ၊ ဘူ၊ စ၊ နာ၊ ဝိ၊ ဝေ ဟူသော မဟာနိပါတ်ဇာတ်တော်ကြီး ၁၀ ဘွဲ့နှင့် ပါရမီ ၁၀ ပါးကျင့်စဉ် ပါဠိဂါထာများ။
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-[#9A6B10] dark:text-[#F5D57A] inline-flex items-center gap-1">
                <span>Open Jātaka Tales · ဇာတ်တော်များဖတ်ရန်</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Complete Chaṭṭha Saṅgāyanā Tipiṭaka Canonical Structure Map */}
        <div className="mt-8 rounded-xl border gold-hairline bg-[#FFFDF7] dark:bg-[#1A130B] overflow-hidden">
          <button
            type="button"
            onClick={() => setShowCanonMap((prev) => !prev)}
            aria-expanded={showCanonMap}
            className="w-full min-h-[56px] px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F4EAD2]/60 dark:hover:bg-[#241A0F]/60 transition-colors cursor-pointer"
          >
            <div className="flex items-start sm:items-center gap-3">
              <BookOpenCheck
                className="w-5 h-5 text-[#9A6B10] dark:text-[#E6B84C] shrink-0 mt-0.5 sm:mt-0"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-myanmar-serif text-base sm:text-lg font-semibold text-[#1F170D] dark:text-[#FAF3E0]">
                  ဆဋ္ဌသင်္ဂါယနာတင် ပိဋကတ်သုံးပုံ ကျမ်းစာရင်း အပြည့်အစုံ
                </h3>
                <p className="text-xs text-[#6E5A3E] dark:text-[#A99573] mt-0.5">
                  Complete Chaṭṭha Saṅgāyanā Pāḷi Canon Index — Vinaya (5), Sutta (5 Nikāyas / 15 Khuddaka Books), Abhidhamma (7)
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A6B10] dark:text-[#F5D57A] shrink-0">
              <span>{showCanonMap ? 'Hide Index' : 'View Full Index'}</span>
              {showCanonMap ? (
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              )}
            </span>
          </button>

          {showCanonMap && (
            <div className="px-5 sm:px-6 pb-6 pt-4 border-t gold-hairline space-y-6">
              {TIPIṬAKA_CANON_MAP.map((group) => (
                <div key={group.pitaka} className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b gold-hairline">
                    <div>
                      <h4 className="font-myanmar-serif text-base font-semibold text-[#9A6B10] dark:text-[#F5D57A]">
                        {group.titleMm}
                      </h4>
                      <p className="text-xs text-[#6E5A3E] dark:text-[#C8B48E]">
                        {group.titleEn}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectPitaka(group.pitaka)}
                      className="min-h-[36px] text-xs font-semibold text-[#9A6B10] dark:text-[#E6B84C] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Filter in Catalog · စာရင်းကြည့်ရန်
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.books.map((book) => (
                      <button
                        key={book.paliRoman}
                        type="button"
                        onClick={() => {
                          if (book.linkedEntryId) {
                            onOpenEntryById(book.linkedEntryId);
                          } else {
                            onSelectPitaka(group.pitaka);
                          }
                        }}
                        className="group text-left rounded-lg border gold-hairline bg-[#FBF6EA] dark:bg-[#120D07] p-4 hover:border-[#B57E14] dark:hover:border-[#E6B84C] transition-colors flex flex-col justify-between cursor-pointer"
                      >
                        <div>
                          <p className="font-myanmar-serif text-sm font-semibold text-[#1F170D] dark:text-[#FAF3E0] group-hover:text-[#9A6B10] dark:group-hover:text-[#F5D57A] leading-snug">
                            {book.paliMm}
                          </p>
                          <p className="mt-0.5 font-display text-sm italic text-[#7B5D2E] dark:text-[#E6B84C]">
                            {book.paliRoman}
                          </p>
                          <p className="mt-2 text-xs text-[#4A3A24] dark:text-[#D5C39F] leading-relaxed">
                            {book.descMm}
                          </p>
                          <p className="mt-1 text-[11px] text-[#6E5A3E] dark:text-[#A99573] leading-relaxed">
                            {book.descEn}
                          </p>
                        </div>
                        <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#9A6B10] dark:text-[#F5D57A]">
                          <span>Open Pāḷi Study · ပါဠိတော်ဖတ်ရန်</span>
                          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
