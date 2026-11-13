import { PitakaType } from '../types/dhamma';

export interface CanonBookItem {
  paliMm: string;
  paliRoman: string;
  descMm: string;
  descEn: string;
  linkedEntryId?: string;
}

export interface CanonBasketGroup {
  pitaka: PitakaType;
  titleMm: string;
  titleEn: string;
  books: CanonBookItem[];
}

export const TIPIṬAKA_CANON_MAP: CanonBasketGroup[] = [
  {
    pitaka: 'vinaya',
    titleMm: '၁။ ဝိနည်းပိဋကတ် (၅ ကျမ်း)',
    titleEn: 'I. Vinaya Piṭaka (5 Books)',
    books: [
      {
        paliMm: 'ပါရာဇိကကဏ္ဍပါဠိ',
        paliRoman: 'Pārājikapāḷi (Bhikkhu-vibhaṅga I)',
        descMm: 'ပါရာဇိက ၄ ပါး၊ သံဃာဒိသေသ် ၁၃ ပါး၊ အနိယတ ၂ ပါး',
        descEn: '4 Pārājika, 13 Saṅghādisesa, 2 Aniyata rules',
        linkedEntryId: 'vinaya-suttavibhanga',
      },
      {
        paliMm: 'ပါစိတ္တိယပါဠိ',
        paliRoman: 'Pācittiyapāḷi (Bhikkhu II & Bhikkhunī-vibhaṅga)',
        descMm: 'နိဿဂ္ဂိယပါစိတ် ၃၀၊ သုဒ္ဓပါစိတ် ၉၂၊ သေခိယ ၇၅ နှင့် ဘိက္ခုနီဝိဘင်း',
        descEn: 'Nissaggiya, Pācittiya, Sekhiya & Bhikkhunī rules',
        linkedEntryId: 'vinaya-suttavibhanga',
      },
      {
        paliMm: 'မဟာဝဂ္ဂပါဠိ',
        paliRoman: 'Mahāvaggapāḷi',
        descMm: 'မဟာခန္ဓက၊ ဥပေါသထ၊ ဝဿူပနာယိက၊ ပဝါရဏာ စသော ခန္ဓက ၁၀ ပါး',
        descEn: 'Awakening narrative, ordination, Uposatha, Vassa & Pavāraṇā',
        linkedEntryId: 'vinaya-mahavagga-bodhi',
      },
      {
        paliMm: 'စူဠဝဂ္ဂပါဠိ',
        paliRoman: 'Cūḷavaggapāḷi',
        descMm: 'သံဃာ့ကိစ္စများ၊ ဘိက္ခုနီခန္ဓက နှင့် ပထမ-ဒုတိယသင်္ဂါယနာ',
        descEn: 'Saṅgha procedures, First & Second Buddhist Councils',
        linkedEntryId: 'vinaya-cullavagga-councils',
      },
      {
        paliMm: 'ပရိဝါရပါဠိ',
        paliRoman: 'Parivārapāḷi',
        descMm: 'ဝိနည်းကျမ်းချုပ် ပုစ္ဆာအဖြေများ နှင့် ဂါထာများ',
        descEn: 'Analytical Vinaya digest and catechisms',
        linkedEntryId: 'vinaya-parivara',
      },
    ],
  },
  {
    pitaka: 'sutta',
    titleMm: '၂။ သုတ္တန်ပိဋကတ် (နိကာယ် ၅ ရပ်)',
    titleEn: 'II. Sutta Piṭaka (5 Nikāyas)',
    books: [
      {
        paliMm: 'ဒီဃနိကာယ် (သီလက္ခန္ဓ၊ မဟာဝဂ္ဂ၊ ပါထိကဝဂ္ဂ — ၃၄ သုတ်)',
        paliRoman: 'Dīgha Nikāya (34 Long Discourses)',
        descMm: 'ဗြဟ္မဇာလ၊ သာမညဖလ၊ မဟာပရိနိဗ္ဗာန၊ မဟာသတိပဋ္ဌာန၊ သိင်္ဂါလောဝါဒသုတ်',
        descEn: 'Brahmajāla, Mahāparinibbāna, Mahāsatipaṭṭhāna, Sigālovāda',
        linkedEntryId: 'sutta-dn22-mahasatipatthana',
      },
      {
        paliMm: 'မဇ္ဈိမနိကာယ် (မူလ၊ မဇ္ဈိမ၊ ဥပရိပဏ္ဏာသ — ၁၅၂ သုတ်)',
        paliRoman: 'Majjhima Nikāya (152 Middle Length Discourses)',
        descMm: 'သတိပဋ္ဌာန၊ အာနာပါနဿတိ၊ စူဠကမ္မဝိဘင်္ဂ စသော ပဏ္ဏာသ ၃ ကျမ်း',
        descEn: 'Ānāpānasati, Cūḷakammavibhaṅga, Satipaṭṭhāna',
        linkedEntryId: 'sutta-mn118-anapanasati',
      },
      {
        paliMm: 'သံယုတ္တနိကာယ် (သဂါထာ၊ နိဒါန၊ ခန္ဓ၊ သဠာယတန၊ မဟာဝဂ္ဂ — ၅၆ သံယုတ်)',
        paliRoman: 'Saṃyutta Nikāya (56 Connected Groups)',
        descMm: 'ဓမ္မစကြာ၊ အနတ္တလက္ခဏ၊ ပဋိစ္စသမုပ္ပါဒ်၊ အာဒိတ္တပရိယာယသုတ်',
        descEn: 'Dhammacakka, Anattalakkhaṇa, Paṭiccasamuppāda, Ādittapariyāya',
        linkedEntryId: 'sutta-sn56-11-dhammacakka',
      },
      {
        paliMm: 'အင်္ဂုတ္တရနိကာယ် (ဧကက မှ ဧကာဒသက နိပါတ် ၁၁ ရပ်)',
        paliRoman: 'Aṅguttara Nikāya (11 Numerical Books)',
        descMm: 'ကာလာမသုတ်၊ မေတ္တာနိသံသသုတ် စသော တစ်ပါးစုမှ ဆယ့်တစ်ပါးစု တရားများ',
        descEn: 'Kālāma Sutta, Mettānisaṃsa Sutta & numerical teachings',
        linkedEntryId: 'sutta-an3-65-kalama',
      },
      {
        paliMm: 'ခုဒ္ဒကနိကာယ် (၁၅ ကျမ်း — ခုဒ္ဒကပါဌ၊ ဓမ္မပဒ၊ ဥဒါန်း၊ ဣတိဝုတ္တက၊ သုတ္တနိပါတ်၊ ဝိမာနဝတ္ထု၊ ပေတဝတ္ထု၊ ထေရ/ထေရီဂါထာ၊ ဇာတက၊ နိဒ္ဒေသ၊ ပဋိသမ္ဘိဒါမဂ်၊ အပဒါန်၊ ဗုဒ္ဓဝံသ၊ စရိယာပိဋက)',
        paliRoman: 'Khuddaka Nikāya (15 Books incl. Dhammapada, Jātaka, Paritta)',
        descMm: 'မင်္ဂလ၊ ရတန၊ မေတ္တ၊ ဓမ္မပဒ၊ ဥဒါန်း၊ ဣတိဝုတ္တက နှင့် ဇာတ်တော် ၅၄၇ ဇာတ်',
        descEn: 'Khuddakapāṭha, Dhammapada, Udāna, Itivuttaka, Sutta Nipāta, 547 Jātakas',
        linkedEntryId: 'paritta-mangala-sutta',
      },
    ],
  },
  {
    pitaka: 'abhidhamma',
    titleMm: '၃။ အဘိဓမ္မာပိဋကတ် (သတ္တပကရဏ် ၇ ကျမ်း)',
    titleEn: 'III. Abhidhamma Piṭaka (7 Treatises)',
    books: [
      {
        paliMm: 'ဓမ္မသင်္ဂဏီပါဠိ',
        paliRoman: 'Dhammasaṅgaṇī',
        descMm: 'စိတ်၊ စေတသိက်၊ ရုပ်၊ နိဗ္ဗာန် ပရမတ္ထ ၄ ပါးနှင့် မာတိကာ',
        descEn: 'Enumeration of ultimate mental & material phenomena',
        linkedEntryId: 'abh-dhammasangani',
      },
      {
        paliMm: 'ဝိဘင်္ဂပါဠိ',
        paliRoman: 'Vibhaṅga',
        descMm: 'ခန္ဓာ၊ အာယတန၊ ဓာတ်၊ သစ္စာ စသော ဝိဘင်း ၁၈ ခန်း',
        descEn: '18 analytical treatises across Sutta and Abhidhamma methods',
        linkedEntryId: 'abh-vibhanga',
      },
      {
        paliMm: 'ဓာတုကထာပါဠိ',
        paliRoman: 'Dhātukathā',
        descMm: 'ခန္ဓာ-အာယတန-ဓာတ် သွတ်သွင်းစစ်ဆေးချက် ၁၄ နည်း',
        descEn: '14 methods classifying phenomena under aggregates, bases, elements',
        linkedEntryId: 'abh-dhatukatha',
      },
      {
        paliMm: 'ပုဂ္ဂလပညတ္တိပါဠိ',
        paliRoman: 'Puggalapaññatti',
        descMm: 'ပုထုဇဉ်မှ အရိယာ ၈ ဦးအထိ ပုဂ္ဂိုလ်အမျိုးအစား ခွဲခြားချက်',
        descEn: 'Designation of human types and Noble Persons',
        linkedEntryId: 'abh-puggalapannatti',
      },
      {
        paliMm: 'ကထာဝတ္ထုပါဠိ',
        paliRoman: 'Kathāvatthu',
        descMm: 'တတိယသင်္ဂါယနာ ဝါဒစိစစ်ချက် ၂၁၆ ချက်',
        descEn: '216 doctrinal debates settled at the Third Council',
        linkedEntryId: 'abh-kathavatthu',
      },
      {
        paliMm: 'ယမကပါဠိ',
        paliRoman: 'Yamaka',
        descMm: 'မူလယမိုက်မှ ဣန္ဒြိယယမိုက်အထိ အစုံလိုက် စိစစ်ချက် ၁၀ ခန်း',
        descEn: '10 chapters of paired logical reciprocity',
        linkedEntryId: 'abh-yamaka',
      },
      {
        paliMm: 'ပဋ္ဌာနပါဠိ (မဟာပကရဏ်)',
        paliRoman: 'Paṭṭhāna (Mahāpakaraṇa)',
        descMm: 'ဟေတု မှ အဝိဂတ အထိ ပစ္စည်း ၂၄ ပါး မဟာပဋ္ဌာန်းကျမ်းတော်ကြီး',
        descEn: 'The 24 Conditional Relations of universal interdependence',
        linkedEntryId: 'abh-patthana',
      },
    ],
  },
];
