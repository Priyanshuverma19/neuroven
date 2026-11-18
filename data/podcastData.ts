export interface Chapter {
  id: string;
  time: number;
  timestamp: string;
  title: string;
  description: string;
}

export interface TranscriptLine {
  id: string;
  time: number; // in seconds
  endTime?: number;
  timestamp: string;
  speaker: "Jon Collins" | "Tim Mackie";
  speakerTitle: string;
  avatarColor: string;
  text: string;
  notes?: string;
  hebrewTerm?: {
    term: string;
    transliteration: string;
    meaning: string;
    insight?: string;
  };
}

export interface RelatedEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  series: string;
  duration: string;
  date: string;
  description: string;
  isPlaying?: boolean;
}

export interface HebrewWord {
  hebrew: string;
  transliteration: string;
  strongs: string;
  meaning: string;
  verse: string;
  explanation: string;
  pronunciationAudioKey: string;
}

export interface SampleEpisode {
  id: string;
  sampleNumber: number;
  episodeNumber: number;
  series: string;
  seriesNumber?: string;
  title: string;
  subtitle: string;
  date: string;
  durationSec: number;
  durationFormatted: string;
  summary: string;
  gradient: string;
  hebrewKey: string;
  hebrewTitle: string;
  scripture: string;
  transcript: TranscriptLine[];
}

export const SAMPLE_EPISODES: SampleEpisode[] = [
  {
    id: "sample-1",
    sampleNumber: 1,
    episodeNumber: 384,
    series: "Psalms 3–8 • 5 Min Sample",
    seriesNumber: "Sample 1",
    title: "Psalm 3: A Deposed King's Desperate Plea",
    subtitle: "When David fled Absalom • Yahweh as a surrounding shield and lifter of the head",
    date: "Nov 9, 2026",
    durationSec: 330, // Exactly 5 min 30 sec sample
    durationFormatted: "05:30",
    summary:
      "Tim and Jon explore Psalm 3, David's darkest hour fleeing Absalom in 2 Samuel 15, and how acute betrayal transforms into quiet trust in Yahweh as a 360-degree shield.",
    gradient: "from-[#0F3A78] via-[#1E293B] to-[#D45B38]",
    hebrewKey: "מָגֵן",
    hebrewTitle: "מִזְמוֹר לְדָוִד",
    scripture: "Psalm 3:1–8 & 2 Samuel 15",
    transcript: [
      {
        id: "s1-1",
        time: 0,
        endTime: 12,
        timestamp: "00:00",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Hey, welcome to the BibleProject podcast. My name is Jon Collins.",
      },
      {
        id: "s1-2",
        time: 12,
        endTime: 28,
        timestamp: "00:12",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Today Tim and I are stepping into a brand new bundle of poems in the book of Psalms — Psalms 3 through 8.",
      },
      {
        id: "s1-3",
        time: 28,
        endTime: 42,
        timestamp: "00:28",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "Yeah, this is a huge moment in the literary architecture of the Psalter.",
      },
      {
        id: "s1-4",
        time: 42,
        endTime: 60,
        timestamp: "00:42",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "In Psalms 1 and 2, we had no titles, no David mentions in the headings.",
      },
      {
        id: "s1-5",
        time: 60,
        endTime: 82,
        timestamp: "01:00",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Right! Psalm 2 was cosmic — rulers plotting against God and His King, nations raging.",
      },
      {
        id: "s1-6",
        time: 82,
        endTime: 110,
        timestamp: "01:22",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "And then you turn the page to Psalm 3, and immediately the atmosphere shifts: 'A psalm of David, when he fled from his son Absalom.'",
        hebrewTerm: {
          term: "מִזְמוֹר לְדָוִד",
          transliteration: "Mizmor l'David",
          meaning: "A song / melody belonging to David",
        },
      },
      {
        id: "s1-7",
        time: 110,
        endTime: 138,
        timestamp: "01:50",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Whoa. So we went from the cosmic king ruling the nations straight into David running for his life from his own child?",
      },
      {
        id: "s1-8",
        time: 138,
        endTime: 170,
        timestamp: "02:18",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "In 2 Samuel 15, David is fleeing Jerusalem barefoot, with his head covered, weeping up the Mount of Olives.",
      },
      {
        id: "s1-9",
        time: 170,
        endTime: 205,
        timestamp: "02:50",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Which matches the opening lines: 'O Lord, how many are my foes! Many are saying, there is no salvation for him in God.'",
      },
      {
        id: "s1-10",
        time: 205,
        endTime: 235,
        timestamp: "03:25",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "Notice that word 'salvation' in Hebrew — yeshu'atah (יְשׁוּעָתָה). The mockers say even God won't save him now.",
        hebrewTerm: {
          term: "יְשׁוּעָתָה",
          transliteration: "Yeshu'atah",
          meaning: "Deliverance, rescue, salvation",
        },
      },
      {
        id: "s1-11",
        time: 235,
        endTime: 265,
        timestamp: "03:55",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "And instead of despair, David pivots: 'But You, O Lord, are a shield about me, my glory, and the lifter of my head.'",
      },
      {
        id: "s1-12",
        time: 265,
        endTime: 295,
        timestamp: "04:25",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "That Hebrew word is magen (מָגֵן). God is a full 360-degree sphere of protection around him.",
        hebrewTerm: {
          term: "מָגֵן בַּעֲדִי",
          transliteration: "Magen Ba'adi",
          meaning: "A shield surrounding me on every side",
        },
      },
      {
        id: "s1-13",
        time: 295,
        endTime: 315,
        timestamp: "04:55",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Then verse 5: 'I lay down and slept; I awoke, for the Lord sustained me.' Sleeping during an active coup!",
      },
      {
        id: "s1-14",
        time: 315,
        endTime: 330,
        timestamp: "05:15",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "When you sleep, you surrender control. David trusts Yahweh rather than his own military might. Selah.",
        hebrewTerm: {
          term: "סֶלָה",
          transliteration: "Selah",
          meaning: "Meditative pause, rest, breathe in the truth",
        },
      },
    ],
  },
  {
    id: "sample-2",
    sampleNumber: 2,
    episodeNumber: 385,
    series: "Psalms 3–8 • 5 Min Sample",
    seriesNumber: "Sample 2",
    title: "Psalm 4: Peace in the Night Watches",
    subtitle: "Lying down in darkness • Finding joy greater than grain and abundant new wine",
    date: "Nov 16, 2026",
    durationSec: 315, // Exactly 5 min 15 sec sample
    durationFormatted: "05:15",
    summary:
      "A nighttime companion to Psalm 3. Tim and Jon explore how David wrestles with false accusers and finds a deep heart joy that surpasses harvest abundance.",
    gradient: "from-[#1E293B] via-[#0F2027] to-[#203A43]",
    hebrewKey: "שָׁלוֹם",
    hebrewTitle: "לַמְנַצֵּחַ בִּנְגִינוֹת",
    scripture: "Psalm 4:1–8",
    transcript: [
      {
        id: "s2-1",
        time: 0,
        endTime: 20,
        timestamp: "00:00",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Welcome back to the podcast. Today we're continuing into Psalm 4, which feels like the evening companion to Psalm 3.",
      },
      {
        id: "s2-2",
        time: 20,
        endTime: 50,
        timestamp: "00:20",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "Yes! If Psalm 3 was the morning prayer waking up sustained by God, Psalm 4 is David preparing to sleep in the dark.",
      },
      {
        id: "s2-3",
        time: 50,
        endTime: 90,
        timestamp: "00:50",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "And David says to his enemies: 'How long will my glory be turned into shame? How long will you love delusions?'",
      },
      {
        id: "s2-4",
        time: 90,
        endTime: 140,
        timestamp: "01:30",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "He tells them in verse 4: 'Tremble, and do not sin; ponder on your beds, and be silent. Selah.'",
        hebrewTerm: {
          term: "רִגְזוּ וְאַל־תֶּחֱטָאוּ",
          transliteration: "Rigzu v'al tekheta'u",
          meaning: "Be agitated / tremble, yet do not sin",
        },
      },
      {
        id: "s2-5",
        time: 140,
        endTime: 195,
        timestamp: "02:20",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "That famous line in verse 7: 'You have put more joy in my heart than they have when their grain and new wine abound.'",
      },
      {
        id: "s2-6",
        time: 195,
        endTime: 255,
        timestamp: "03:15",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "True peace (Shalom) does not come from economic prosperity or full barns. It comes from resting in Yahweh alone.",
        hebrewTerm: {
          term: "בְּשָׁלוֹם",
          transliteration: "B'Shalom",
          meaning: "In wholeness, complete peace and safety",
        },
      },
      {
        id: "s2-7",
        time: 255,
        endTime: 315,
        timestamp: "04:15",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "'In peace I will both lie down and sleep, for You alone, O Lord, make me dwell in safety.' What an anchor.",
      },
    ],
  },
  {
    id: "sample-3",
    sampleNumber: 3,
    episodeNumber: 386,
    series: "Psalms 3–8 • 5 Min Sample",
    seriesNumber: "Sample 3",
    title: "Psalm 5: A Morning Cry for Refuge",
    subtitle: "At dawn Yahweh hears the voice • Steadfast love (Khesed) versus deceitful tongues",
    date: "Nov 23, 2026",
    durationSec: 345, // Exactly 5 min 45 sec sample
    durationFormatted: "05:45",
    summary:
      "A morning prayer confronting violence and slander. Tim and Jon discuss how the righteous enter God's house solely by the abundance of His loyal love.",
    gradient: "from-[#0F2027] via-[#203A43] to-[#2C5364]",
    hebrewKey: "חֶסֶד",
    hebrewTitle: "אֲמָרַי הַאֲזִינָה יְהוָה",
    scripture: "Psalm 5:1–12",
    transcript: [
      {
        id: "s3-1",
        time: 0,
        endTime: 25,
        timestamp: "00:00",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Hey everyone, welcome back. Today we enter Psalm 5, and the sun is rising.",
      },
      {
        id: "s3-2",
        time: 25,
        endTime: 65,
        timestamp: "00:25",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "Yes, notice verse 3: 'In the morning, O Lord, You hear my voice; in the morning I prepare a sacrifice and watch.'",
      },
      {
        id: "s3-3",
        time: 65,
        endTime: 120,
        timestamp: "01:05",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "The language here is so intentional — laying out his prayer like an offering on an altar, waiting expectantly.",
      },
      {
        id: "s3-4",
        time: 120,
        endTime: 180,
        timestamp: "02:00",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "Then in verse 7, David reveals how he dares to approach God: 'Through the abundance of Your steadfast love, I will enter Your house.'",
        hebrewTerm: {
          term: "חֶסֶד",
          transliteration: "Khesed",
          meaning: "Loyal, covenantal, steadfast love",
        },
      },
      {
        id: "s3-5",
        time: 180,
        endTime: 260,
        timestamp: "03:00",
        speaker: "Jon Collins",
        speakerTitle: "Host",
        avatarColor: "#0066FF",
        text: "Not through his own perfection, but through God's khesed. That's pure gospel right there in the Psalms.",
      },
      {
        id: "s3-6",
        time: 260,
        endTime: 345,
        timestamp: "04:20",
        speaker: "Tim Mackie",
        speakerTitle: "Theologian",
        avatarColor: "#D45B38",
        text: "And the psalm closes with God blessing the righteous and covering them with favor as with a whole-body shield (tzinah).",
        hebrewTerm: {
          term: "כַּצִּנָּה",
          transliteration: "Katzinah",
          meaning: "Like a full-length body shield",
        },
      },
    ],
  },
];

export const CURRENT_EPISODE = SAMPLE_EPISODES[0];
export const CHAPTERS: Chapter[] = [
  {
    id: "ch-1",
    time: 0,
    timestamp: "00:00",
    title: SAMPLE_EPISODES[0].title,
    description: SAMPLE_EPISODES[0].subtitle,
  },
  {
    id: "ch-2",
    time: 82,
    timestamp: "01:22",
    title: "David Fleeing Absalom (2 Sam 15)",
    description: "The historical hyperlink of the deposed king weeping up the Mount of Olives.",
  },
  {
    id: "ch-3",
    time: 235,
    timestamp: "03:55",
    title: "Yahweh as a 360-Degree Shield (Magen)",
    description: "Restoring the king's humiliated head and sleeping peacefully in the crisis.",
  },
];

export const TRANSCRIPT_LINES = SAMPLE_EPISODES[0].transcript;

export const RELATED_EPISODES: RelatedEpisode[] = SAMPLE_EPISODES.map((s) => ({
  id: s.id,
  episodeNumber: s.episodeNumber,
  title: s.title,
  series: s.series,
  duration: s.durationFormatted,
  date: s.date,
  description: s.subtitle,
  isPlaying: s.id === "sample-1",
}));

export const HEBREW_WORDS: HebrewWord[] = [
  {
    hebrew: "מָגֵן",
    transliteration: "Māgēn",
    strongs: "H4043",
    meaning: "Shield, buckler, sovereign defense",
    verse: "Psalm 3:3 — 'You, Yahweh, are a shield about me.'",
    explanation: "A personal, portable battle shield. God envelops David as a 360-degree protective presence.",
    pronunciationAudioKey: "magen",
  },
  {
    hebrew: "סֶלָה",
    transliteration: "Sēlah",
    strongs: "H5542",
    meaning: "Pause, ponder, musical interlude",
    verse: "Psalm 3:2, 3:4, 3:8",
    explanation: "An ancient liturgical instruction to pause and let the reality sink in.",
    pronunciationAudioKey: "selah",
  },
  {
    hebrew: "יְשׁוּעָתָה",
    transliteration: "Yəšû‘ātâ",
    strongs: "H3444",
    meaning: "Salvation, deliverance, liberation",
    verse: "Psalm 3:2 & 3:8 — 'Salvation belongs to Yahweh.'",
    explanation: "Signifies total rescue from overwhelming odds. Root of the name Yeshua (Jesus).",
    pronunciationAudioKey: "yeshuatah",
  },
];
