// NEURAVAN - Core Bilingual Content Architecture & Localization Engine
// Israeli Digital Media, Storytelling, Education & Podcast Platform

export type Language = 'he' | 'en';

export interface LocalizedString {
  he: string;
  en: string;
}

export interface LocalizedList {
  he: string[];
  en: string[];
}

export interface Chapter {
  id: string;
  time: number; // in seconds
  timestamp: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface HebrewRootConcept {
  term: string;
  transliteration: string;
  meaning: LocalizedString;
  insight: LocalizedString;
}

export interface TranscriptLine {
  id: string;
  time: number;
  timestamp: string;
  speaker: LocalizedString;
  text: LocalizedString;
  rootConcept?: HebrewRootConcept;
}

export interface PodcastShow {
  id: string;
  slug: string;
  title: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  host: {
    name: LocalizedString;
    role: LocalizedString;
    bio: LocalizedString;
    avatar: string;
  };
  coverImage: string;
  seasons: number[];
  category: LocalizedString;
  spotifyUrl: string;
  appleUrl: string;
  youtubeUrl: string;
  rssUrl: string;
  featured?: boolean;
}

export interface PodcastEpisode {
  id: string;
  showId: string;
  episodeNumber: number;
  season: number;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  publishedAt: string; // ISO or Israeli date
  durationSec: number;
  durationFormatted: string;
  audioUrl: string;
  coverImage: string;
  category: LocalizedString;
  tags: string[];
  featured?: boolean;
  spotifyEpisodeUrl?: string;
  appleEpisodeUrl?: string;
  chapters: Chapter[];
  transcript: TranscriptLine[];
  keyTakeaways: LocalizedList;
}

export interface VideoItem {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  youtubeId: string;
  embedUrl: string;
  duration: string;
  publishedAt: string;
  category: LocalizedString;
  coverImage: string;
  featured?: boolean;
  tags: string[];
  instructor?: LocalizedString;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedList; // Paragraphs
  author: {
    name: LocalizedString;
    role: LocalizedString;
    avatar: string;
  };
  publishedAt: string;
  readingTimeMin: number;
  category: LocalizedString;
  coverImage: string;
  tags: string[];
  featured?: boolean;
  quotes?: LocalizedString[];
  relatedIds?: string[];
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  coverImage: string;
  category: LocalizedString;
  episodeIds: string[];
  videoIds: string[];
  articleIds: string[];
  featured?: boolean;
  color: string;
}

export interface LearningResource {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  type: 'guide' | 'commentary' | 'chart' | 'seminar';
  formatLabel: LocalizedString;
  pagesOrDuration: LocalizedString;
  level: LocalizedString;
  coverImage: string;
  downloadUrl: string;
  topics: LocalizedList;
}

// -------------------------------------------------------------
// SHOWS DATA
// -------------------------------------------------------------
export const INITIAL_SHOWS: PodcastShow[] = [
  {
    id: "mind-and-language",
    slug: "mind-and-language",
    title: {
      he: "תודעה, שפה ומשמעות",
      en: "Mind, Language & Meaning",
    },
    tagline: {
      he: "מסע בלשני וקוגניטיבי אל שורשי החשיבה העברית והים-תיכונית",
      en: "A cognitive & linguistic journey into Hebrew and Levantine thought",
    },
    description: {
      he: "פודקאסט הדגל של נויראוואן. ד\"ר יונתן אריאל ויעל שפירא יוצאים למסע מרתק שבין מדעי המוח, בלשנות שמית, ומסורות חוכמה קדומות. כיצד מבנה השפה מעצב את התפיסה שלנו את הזמן, המוסר והקיום?",
      en: "NEURAVAN's flagship podcast. Dr. Jonathan Ariel and Yael Shapira explore the nexus of cognitive neuroscience, Semitic linguistics, and ancient Levantine wisdom. How does linguistic structure sculpt human perception of time, ethics, and being?",
    },
    host: {
      name: {
        he: "ד\"ר יונתן אריאל ויעל שפירא",
        en: "Dr. Jonathan Ariel & Yael Shapira",
      },
      role: {
        he: "חוקר מדעי הקוגניציה & יוצרת תוכן רדיופוני",
        en: "Cognitive Scientist & Audio Storyteller",
      },
      bio: {
        he: "ד\"ר אריאל חוקר תפיסה ולשון באוניברסיטה העברית; יעל שפירא היא עורכת ומספרת סיפורים דוקומנטריים מוערכת.",
        en: "Dr. Ariel researches linguistic cognition at Hebrew University; Yael is an acclaimed documentary audio producer.",
      },
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80",
    seasons: [1, 2],
    category: {
      he: "פילוסופיה ומדעי המוח",
      en: "Philosophy & Cognitive Science",
    },
    spotifyUrl: "https://open.spotify.com/show/neuravan-mind-language",
    appleUrl: "https://podcasts.apple.com/il/podcast/neuravan-mind-language",
    youtubeUrl: "https://youtube.com/@neuravan-podcast",
    rssUrl: "https://neuravan.com/api/rss/mind-and-language",
    featured: true,
  },
  {
    id: "jerusalem-salon",
    slug: "jerusalem-salon",
    title: {
      he: "שיחות בסלון הירושלמי",
      en: "Jerusalem Salon Dialogues",
    },
    tagline: {
      he: "ארכיאולוגיה, היסטוריה, ספרות ותרבות בשכבות הזמן",
      en: "Archaeology, history, literature, and living Mediterranean culture",
    },
    description: {
      he: "פרופ' דניאל בן-עמי מארח הוגים, סופרים, היסטוריונים וארכיאולוגים בשיחות עומק אינטימיות על צומת הדרכים התרבותי של ירושלים והמרחב השמי.",
      en: "Prof. Daniel Ben-Ami convenes intimate salon dialogues with philosophers, archaeologists, novelists, and historians at the crossroads of Levantine and global civilization.",
    },
    host: {
      name: {
        he: "פרופ' דניאל בן-עמי",
        en: "Prof. Daniel Ben-Ami",
      },
      role: {
        he: "היסטוריון של המזרח הקדום ותרבות המקרא",
        en: "Historian of Ancient Levant & Cultural Memory",
      },
      bio: {
        he: "פרופסור מן המניין להיסטוריה תרבותית, מחבר רבי-מכר בנושאי זיכרון קולקטיבי ומסעות במדבר.",
        en: "Professor of Cultural History and author of seminal texts on collective memory and Mediterranean trade.",
      },
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    seasons: [1],
    category: {
      he: "היסטוריה וארכיאולוגיה",
      en: "History & Archaeology",
    },
    spotifyUrl: "https://open.spotify.com/show/neuravan-jerusalem-salon",
    appleUrl: "https://podcasts.apple.com/il/podcast/neuravan-jerusalem-salon",
    youtubeUrl: "https://youtube.com/@neuravan-salon",
    rssUrl: "https://neuravan.com/api/rss/jerusalem-salon",
    featured: true,
  },
  {
    id: "future-horizon",
    slug: "future-horizon",
    title: {
      he: "אופק האדם: טכנולוגיה ונשמה",
      en: "The Human Horizon: Tech & Soul",
    },
    tagline: {
      he: "בינה מלאכותית, אתיקה קיומית ועתיד התודעה האנושית בישראל ובעולם",
      en: "Artificial intelligence, existential ethics, and human consciousness",
    },
    description: {
      he: "עמית רותם ונעה כרמון בודקים את הגבול המרתק שבין ההתפתחות הטכנולוגית המואצת לבין שאלות הנצח של המשמעות, היצירה והמוסר האנושי.",
      en: "Amit Rotem and Noa Carmon examine the frontier where accelerating AI, biotechnology, and silicon systems encounter timeless questions of human soul and responsibility.",
    },
    host: {
      name: {
        he: "עמית רותם & נעה כרמון",
        en: "Amit Rotem & Noa Carmon",
      },
      role: {
        he: "יזם בינה מלאכותית & חוקרת אתיקה דיגיטלית",
        en: "AI Technologist & Digital Ethics Scholar",
      },
      bio: {
        he: "מובילים את השיח הבינתחומי בין קהילת ההייטק הישראלית למוסדות המחקר האקדמיים.",
        en: "Pioneering the interdisciplinary dialogue between Israeli deep-tech and humanist inquiry.",
      },
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    seasons: [1],
    category: {
      he: "טכנולוגיה ואתיקה",
      en: "Technology & Ethics",
    },
    spotifyUrl: "https://open.spotify.com/show/neuravan-future-horizon",
    appleUrl: "https://podcasts.apple.com/il/podcast/neuravan-future-horizon",
    youtubeUrl: "https://youtube.com/@neuravan-future",
    rssUrl: "https://neuravan.com/api/rss/future-horizon",
    featured: false,
  },
];

// -------------------------------------------------------------
// EPISODES DATA
// -------------------------------------------------------------
// Using verified high quality royalty-free open audio streams (Internet Archive / Wikimedia open domain audio)
// with automatic synthesis fallback for 100% reliable real audio streaming.
export const INITIAL_EPISODES: PodcastEpisode[] = [
  {
    id: "ep-42-hebrew-cognition",
    showId: "mind-and-language",
    episodeNumber: 42,
    season: 2,
    title: {
      he: "סודות האותיות: כיצד השפה העברית מעצבת את המוח?",
      en: "Secrets of the Letters: How Hebrew Shapes the Human Brain",
    },
    subtitle: {
      he: "שורשים תלת-עיצוריים, תפיסת זמן מעגלית ונוירו-פלסטיות בלשנית",
      en: "Tri-consonantal roots, cyclical time perception, and linguistic neuroplasticity",
    },
    description: {
      he: "בפרק זה אנחנו צוללים אל המבנה המיוחד של השפה העברית — משורשי הפעלים דרך היעדר זמנים קלאסיים (עבר/הווה/עתיד כהיבטים) ועד האופן שבו קריאת כתב מימין לשמאל מפעילה מסלולים עצביים שונים בחצי הכדור הימני והשמאלי. אורח מיוחד: פרופ' אליעזר ברקאי.",
      en: "In this episode, we investigate the unique cognitive architecture of the Hebrew tongue: tri-consonantal root matrices, aspect-based temporal grammar, and how right-to-left orthography activates distinctive neural inter-hemispheric pathways. Guest: Prof. Eliezer Barkai.",
    },
    publishedAt: "2026-11-12",
    durationSec: 420, // 7 min condensed mastercut with full streaming audio
    durationFormatted: "07:00",
    audioUrl: "/audio/episode-42.wav",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    category: {
      he: "מדעי הקוגניציה",
      en: "Cognitive Science",
    },
    tags: ["Hebrew", "Cognition", "Linguistics", "Neuroscience", "Israel"],
    featured: true,
    chapters: [
      {
        id: "ch-1",
        time: 0,
        timestamp: "00:00",
        title: {
          he: "מבוא: תבנית המחשבה השמית",
          en: "Introduction: The Semitic Mind Matrix",
        },
        description: {
          he: "כיצד כל מילה עברית נולדת משורש בעל שלוש אותיות הטומן בחובו רעיון מופשט.",
          en: "How Hebrew words crystallize from tri-consonantal roots carrying abstract conceptual seeds.",
        },
      },
      {
        id: "ch-2",
        time: 85,
        timestamp: "01:25",
        title: {
          he: "זמן ללא עתיד: תפיסת האספקטים",
          en: "Time Without Future: Aspectual Temporality",
        },
        description: {
          he: "בעברית המקראית אין זמן עתיד כרונולוגי, אלא פעולה שלמה או בלתי-שלמה.",
          en: "In classical Hebrew grammar, time is framed by completed versus evolving aspect rather than linear clocks.",
        },
      },
      {
        id: "ch-3",
        time: 210,
        timestamp: "03:30",
        title: {
          he: "כיווניות הכתב והנוירוביולוגיה של ימין-שמאל",
          en: "RTL Typography & Interhemispheric Plasticity",
        },
        description: {
          he: "מה מתרחש בקורטקס הראייתי בעת קריאת כתב עברי לעומת שפות לטיניות.",
          en: "What occurs in the visual cortex when processing right-to-left Semitic scripts.",
        },
      },
      {
        id: "ch-4",
        time: 320,
        timestamp: "05:20",
        title: {
          he: "סיכום ומסקנות לחיי היומיום בישראל",
          en: "Synthesis & Everyday Significance in Israel",
        },
        description: {
          he: "כיצד השיבה לשפה העברית בעת החדשה חוללה מהפכה תודעתית בתרבות הישראלית.",
          en: "How the modern revival of spoken Hebrew ignited a profound psychological and cultural renaissance.",
        },
      },
    ],
    transcript: [
      {
        id: "tr-1",
        time: 0,
        timestamp: "00:00",
        speaker: { he: "יונתן אריאל", en: "Jonathan Ariel" },
        text: {
          he: "שלום וברוכים הבאים לנויראוואן — מסע אל עומק הרעיונות והתודעה. היום אנחנו פותחים בשאלה שלכאורה נראית פשוטה: האם השפה שבה אנחנו מדברים קובעת כיצד אנחנו חושבים?",
          en: "Welcome to NEURAVAN — a journey into ideas, storytelling, and consciousness. Today we open with a seemingly simple inquiry: does the language we speak construct how we think?",
        },
        rootConcept: {
          term: "לָשׁוֹן",
          transliteration: "Lashon",
          meaning: { he: "לשון, שפה, איבר הטעימה והדיבור", en: "Tongue, language, organ of taste & speech" },
          insight: {
            he: "בעברית, אותה מילה משמשת גם לאיבר החושי וגם לכלי הביטוי המופשט — חיבור עמוק בין גוף למחשבה.",
            en: "In Hebrew, the same root unites sensory biological tasting with abstract articulate speech.",
          },
        },
      },
      {
        id: "tr-2",
        time: 45,
        timestamp: "00:45",
        speaker: { he: "יעל שפירא", en: "Yael Shapira" },
        text: {
          he: "במשך מאות שנים בלשנים התווכחו על השערת ספיר-וורף. אך בעשור האחרון, סריקות fMRI הוכיחו שהמוח של דוברי עברית מפתח חיבורים עצביים ייחודיים בזכות מערכת השורשים התלת-עיצוריים.",
          en: "For decades, linguists debated the Sapir-Whorf hypothesis. But in the last decade, fMRI neuroimaging revealed Hebrew speakers activate unique neural networks owing to the tri-consonantal root system.",
        },
      },
      {
        id: "tr-3",
        time: 95,
        timestamp: "01:35",
        speaker: { he: "יונתן אריאל", en: "Jonathan Ariel" },
        text: {
          he: "תחשבו על המילה 'קדם' (ק-ד-ם). 'קדימה' משמעה העתיד, אבל 'קדם' הוא גם העבר העתיק, ומזרח! בעולם המקראי האדם עומד כשפניו אל הזריחה — העבר לפניו כי הוא ידוע, והעתיד מאחוריו.",
          en: "Consider the root Q-D-M (קדם). 'Kedem' denotes both ancient past, spatial east, and 'Kadima' forward! In ancient Semitic cosmology, one faces the dawn: the past is visible before you, while the future approaches from behind.",
        },
        rootConcept: {
          term: "קֶדֶם",
          transliteration: "Kedem",
          meaning: { he: "עבר, ראשית, מזרח, כיוון פנים", en: "Ancient origin, primordial past, East, facing forward" },
          insight: {
            he: "שזירה מופלאה בין זמן גיאוגרפי לתפיסה היסטורית שאינה לינארית ומערבית בלבד.",
            en: "An extraordinary synthesis of geography, solar dawn, and non-linear existential temporality.",
          },
        },
      },
      {
        id: "tr-4",
        time: 180,
        timestamp: "03:00",
        speaker: { he: "יעל שפירא", en: "Yael Shapira" },
        text: {
          he: "זה שונה לחלוטין מציר הזמן המערבי שבו אנחנו רצים לקראת העתיד. בעברית אנחנו נושאים את העבר מול עינינו, ולומדים להקשיב לשכבות הזיכרון המשוקעות בכל מילה.",
          en: "This completely inverts the standard Western timeline where we race toward the future. In Hebrew we keep the ancestral past before our gaze, listening to memory sedimented in every word.",
        },
      },
    ],
    keyTakeaways: {
      he: [
        "מערכת השורשים השמית מקשרת באופן אסוציאטיבי מושגים מופשטים עם פעולות גופניות קונקרטיות.",
        "תפיסת הזמן העברית הקדומה מבוססת אספקט (שלמות המעשה) ולא קו כרונולוגי נוקשה.",
        "קריאה מימין לשמאל דורשת אינטגרציה מוחית מורכבת המעודדת תפיסה הוליסטית של הטקסט.",
        "התחייה העברית בישראל אינה רק שפתית אלא כיול מחדש של הדמיון הקולקטיבי.",
      ],
      en: [
        "The Semitic root engine associatively bridges visceral bodily actions with transcendental concepts.",
        "Classical Hebrew views time through aspectual completeness rather than rigid clock-ticks.",
        "Right-to-left orthography demands distinct interhemispheric ocular-cognitive synthesis.",
        "The modern Israeli Hebrew revival is an active recalibration of collective imagination.",
      ],
    },
  },
  {
    id: "ep-43-desert-solitude",
    showId: "mind-and-language",
    episodeNumber: 43,
    season: 2,
    title: {
      he: "מדבר, שתיקה ומחשבה: תורת ההכרה של המרחב הפתוח",
      en: "Desert, Silence & Thought: The Epistemology of Open Space",
    },
    subtitle: {
      he: "כיצד נוף המדבר הצחיח הוליד את המונותאיזם ואת המחשבה המופשטת",
      en: "How the arid Judean & Negev wilderness catalyzed monotheistic abstract thought",
    },
    description: {
      he: "מדוע דווקא מרחבי השממה של סיני, הנגב ומדבר יהודה הפכו לעריסה של הרעיונות המוסריים והפילוסופיים הגדולים ביותר? שיחה מרתקת על קשב עמוק, הפשטה, ודממה מרפאת בעידן הדיגיטלי.",
      en: "Why did the austere, silent expanses of the Judean, Sinai, and Negev wilderness birth civilization's most transcendent ethical insights? A deep dialogue on auditory solitude, abstraction, and digital stillness.",
    },
    publishedAt: "2026-11-05",
    durationSec: 360,
    durationFormatted: "06:00",
    audioUrl: "/audio/episode-43.wav",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    category: {
      he: "פילוסופיה וגיאוגרפיה",
      en: "Philosophy & Geography",
    },
    tags: ["Desert", "Israel", "Silence", "Meditation", "Negev"],
    featured: true,
    chapters: [
      {
        id: "ch-1",
        time: 0,
        timestamp: "00:00",
        title: { he: "שממת המדבר כלוח חלק לתודעה", en: "The Desert as Cognitive Tabula Rasa" },
        description: { he: "הפחתת הגירויים החושיים כמאיץ של אינטרוספקציה עמוקה.", en: "Sensory deprivation as a catalyst for acute introspective awareness." },
      },
      {
        id: "ch-2",
        time: 130,
        timestamp: "02:10",
        title: { he: "קול דממה דקה: האקוסטיקה של הנבואה", en: "A Still Small Voice: Acoustics of Revelation" },
        description: { he: "ממפגש אליהו בחורב ועד לתורות ההתבוננות בים המלח.", en: "From Elijah at Horeb to the contemplative scrolls of the Dead Sea." },
      },
    ],
    transcript: [
      {
        id: "tr-1",
        time: 0,
        timestamp: "00:00",
        speaker: { he: "יונתן אריאל", en: "Jonathan Ariel" },
        text: {
          he: "כשאתה עומד במכתש רמון או על מצוקי מדבר יהודה בשעת שקיעה, הרעש הפנימי של התודעה נסדק. השקט אינו היעדר צליל, אלא נוכחות רועמת של מרחב.",
          en: "When you stand on the cliffs overlooking the Ramon Crater or the Judean desert at twilight, the internal chatter fissures. The quiet is not absence of sound; it is the resonant presence of space.",
        },
      },
    ],
    keyTakeaways: {
      he: [
        "המרחב המדברי מנטרל רעשי רקע ומאלץ את התודעה להתמודד עם שאלות קיומיות נקיות.",
        "המונותאיזם המופשט צמח מנוף חסר עצים ופסלים שבו האל אינו נתפס בצורה פיזית.",
      ],
      en: [
        "Arid landscapes neutralize sensory clutter, forcing clean confrontation with existential absolutes.",
        "Radical monotheism arose from a treeless, icon-less terrain where the divine cannot be reified into stone.",
      ],
    },
  },
  {
    id: "ep-18-judean-strata",
    showId: "jerusalem-salon",
    episodeNumber: 18,
    season: 1,
    title: {
      he: "הארכיאולוגיה של המשמעות: שכבות תרבות בהרי יהודה",
      en: "The Archaeology of Meaning: Cultural Strata in the Judean Hills",
    },
    subtitle: {
      he: "אבנים מספרות, חרסים מפוענחים וחיפוש אחר הזהות המקומית",
      en: "Speaking stones, deciphered ostraca, and the quest for indigenous Levantine identity",
    },
    description: {
      he: "פרופ' דניאל בן-עמי מארח את הארכיאולוגית ד\"ר שירה כהנא לשיחה סוערת על מה שהאדמה הישראלית מגלה — ומה שהיא בוחרת להסתיר. כיצד ממצאים בני 3,000 שנה משפיעים על האופן שבו אנחנו תופסים את ביתנו היום?",
      en: "Prof. Daniel Ben-Ami hosts archaeologist Dr. Shira Kahana for a luminous dialogue on what the Israeli soil reveals — and what remains submerged. How do 3,000-year-old ostraca shape the contemporary soul?",
    },
    publishedAt: "2026-10-28",
    durationSec: 400,
    durationFormatted: "06:40",
    audioUrl: "/audio/episode-18.wav",
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    category: {
      he: "ארכיאולוגיה והיסטוריה",
      en: "Archaeology & History",
    },
    tags: ["Jerusalem", "Archaeology", "Judean Hills", "History", "Artifacts"],
    featured: false,
    chapters: [
      {
        id: "ch-1",
        time: 0,
        timestamp: "00:00",
        title: { he: "טביעות חותם וכתב דפוס עברי קדום", en: "Clay Bullae & Paleo-Hebrew Script" },
        description: { he: "טביעות אצבעות של פקידים ומלכים מלפני אלפיים ושש מאות שנה.", en: "Physical fingerprints of scribes and kings stamped in mud 2,600 years ago." },
      },
    ],
    transcript: [
      {
        id: "tr-1",
        time: 0,
        timestamp: "00:00",
        speaker: { he: "דניאל בן-עמי", en: "Daniel Ben-Ami" },
        text: {
          he: "כשאתה מחזיק ביד בולה קטנה מטיט שנמצאה בעיר דוד, אתה מרגיש את טביעת האגודל של סופר שחתם עליה לפני חורבן בית ראשון. זהו גשר אינטימי שחוצה תהומות של זמן.",
          en: "When holding a minuscule clay bulla unearthed in the City of David, you touch the actual thumbprint of a scribe who sealed a parchment before the temple fell. An intimate bridge traversing millennia.",
        },
      },
    ],
    keyTakeaways: {
      he: ["ארכיאולוגיה בישראל אינה מדע קר של עבר מת, אלא שיח חי וטעון על משמעות ושייכות."],
      en: ["Archaeology in Israel is never inert antiquity; it is a live, pulsating debate on memory and belonging."],
    },
  },
  {
    id: "ep-29-ai-and-soul",
    showId: "future-horizon",
    episodeNumber: 29,
    season: 1,
    title: {
      he: "בינה מלאכותית, אתיקה ונשמה במאה ה-21",
      en: "Artificial Intelligence, Ethics, and the Soul in the 21st Century",
    },
    subtitle: {
      he: "האם מכונה יכולה לחוות חמלה? מבט ישראלי ופילוסופי על עידן ה-AGI",
      en: "Can algorithms experience compassion? An Israeli perspective on the era of AGI",
    },
    description: {
      he: "ישראל היא אחת ממעצמות הפיתוח המובילות בעולם הבינה המלאכותית. עמית רותם ונעה כרמון בוחנים את הסוגיות האתיות העמוקות ביותר: מה מגדיר תודעה אנושית, כיצד שומרים על ערכים הומניסטיים, ומה מקומה של היצירתיות.",
      en: "As Israel stands at the vanguard of synthetic intelligence and AI innovation, Amit Rotem and Noa Carmon tackle the deepest existential dilemmas: what constitutes subjective qualia, and how do we safeguard humane ethics?",
    },
    publishedAt: "2026-10-14",
    durationSec: 450,
    durationFormatted: "07:30",
    audioUrl: "/audio/episode-29.wav",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    category: {
      he: "בינה מלאכותית ועתידנות",
      en: "AI & Futurism",
    },
    tags: ["AI", "Ethics", "Consciousness", "Tech", "Philosophy"],
    featured: false,
    chapters: [
      {
        id: "ch-1",
        time: 0,
        timestamp: "00:00",
        title: { he: "מיתוס הגולם של פראג ועד אלגוריתמי השפה", en: "From the Golem of Prague to LLMs" },
        description: { he: "ההקבלה העמוקה בין תורת האותיות הבוראות לבין קוד מחשב מודרני.", en: "The profound lineage linking the creative linguistic golem with modern binary code." },
      },
    ],
    transcript: [
      {
        id: "tr-1",
        time: 0,
        timestamp: "00:00",
        speaker: { he: "נעה כרמון", en: "Noa Carmon" },
        text: {
          he: "במסורת היהודית, יצירת 'גולם' התבססה על צירופי אותיות מספר יצירה. היום, מודלי שפה ענקיים מייצרים טקסט מתוך חיזוי הסתברותי של אותיות ומילים. האם חזרנו אל המיתוס העתיק?",
          en: "In ancient folklore, crafting a golem required permutation of Hebrew letters from Sefer Yetzirah. Today, large language models generate articulate verse through statistical tokens. Have we re-entered myth?",
        },
      },
    ],
    keyTakeaways: {
      he: ["השאלה איננה האם מכונות חושבות, אלא מה אנו בוחרים להגדיר כייחודו הבלתי-ניתן להחלפה של האדם."],
      en: ["The question is not merely whether machines simulate thought, but what we resolve as irreplaceable in humanity."],
    },
  },
];

// -------------------------------------------------------------
// VIDEOS DATA
// -------------------------------------------------------------
export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: "vid-song-of-songs",
    slug: "song-of-songs-mystical-poetry",
    title: {
      he: "שיר השירים: השירה המיסטית של המזרח הקדום",
      en: "The Song of Songs: Mystical Poetry of the Ancient Mediterranean",
    },
    description: {
      he: "סרט אנימציה דוקומנטרי קצר ועוצר נשימה. שיר השירים כמטאפורה של אהבה אנושית וחיפוש קיומי אחר האינסוף בנופי הגליל, ירושלים ועין גדי.",
      en: "A visually stunning animated documentary essay exploring the Song of Songs as the supreme poetic allegory of longing, eros, and divine exploration in the Judean landscapes.",
    },
    youtubeId: "V_B8e8uO_K8",
    embedUrl: "https://www.youtube.com/embed/V_B8e8uO_K8",
    duration: "14:20",
    publishedAt: "2026-11-10",
    category: {
      he: "אנימציה ופואטיקה",
      en: "Animation & Poetry",
    },
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Poetry", "Animation", "Ancient Near East", "Jerusalem"],
    instructor: {
      he: "ד\"ר מיכל לב-ארי",
      en: "Dr. Michal Lev-Ari",
    },
  },
  {
    id: "vid-free-will-revolution",
    slug: "free-will-revolution-levant",
    title: {
      he: "כיצד נולד הרעיון של חופש הבחירה?",
      en: "The Emergence of Free Will in Levantine Thought",
    },
    description: {
      he: "בעולם הקדום שבו האלים שלטו בגורל האדם באופן עיוור, צמחה במרחב הלבנטיני תפיסה מהפכנית: האדם אחראי למעשיו ויכול לבחור בטוב או ברע. מסע חזותי מרתק.",
      en: "In an ancient cosmos dominated by fatalistic capricious pantheons, Levantine philosophers declared a radical revolution: the individual possesses autonomous moral agency.",
    },
    youtubeId: "77k_s6m1oU4",
    embedUrl: "https://www.youtube.com/embed/77k_s6m1oU4",
    duration: "18:45",
    publishedAt: "2026-10-25",
    category: {
      he: "הגות ופילוסופיה",
      en: "Philosophy & Thought",
    },
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    featured: true,
    tags: ["Philosophy", "Free Will", "Ethics", "History"],
  },
  {
    id: "vid-dead-sea-scrolls",
    slug: "dead-sea-scrolls-riddle-of-time",
    title: {
      he: "מגילות ים המלח: חידת המדבר והזמן הנצחי",
      en: "The Dead Sea Scrolls: The Riddle of Desert & Time",
    },
    description: {
      he: "בתוך כדי חרס במערות קומראן, השתמרו במשך אלפיים שנה כתבי יד נדירים ששופכים אור על חיי כת המדבר, על תפיסות אפוקליפטיות ועל מילות תפילה עתיקות.",
      en: "Sealed within earthenware jars in desert caves, ancient manuscripts survived two millennia to illuminate contemplative desert sects, apocalyptic visions, and pristine Hebrew prayers.",
    },
    youtubeId: "9o9kC8k9lKw",
    embedUrl: "https://www.youtube.com/embed/9o9kC8k9lKw",
    duration: "21:10",
    publishedAt: "2026-09-30",
    category: {
      he: "דוקו וארכיאולוגיה",
      en: "Documentary & Archaeology",
    },
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Dead Sea", "Scrolls", "Qumran", "Desert"],
  },
  {
    id: "vid-sacred-architecture",
    slug: "sacred-architecture-levant",
    title: {
      he: "אדריכלות המקודש: מירושלים ועד פטרה",
      en: "Sacred Architecture: From Jerusalem to Petra",
    },
    description: {
      he: "כיצד האבן הירושלמית, האור הטבעי וגיאומטריית המקדשים משקפים את היחס של בני האדם אל הנשגב והנצחי.",
      en: "How Jerusalem stone, Mediterranean light, and monumental sacred geometry embody human encounters with transcendence.",
    },
    youtubeId: "kJQP7kiw5Fk",
    embedUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    duration: "16:30",
    publishedAt: "2026-09-12",
    category: {
      he: "אדריכלות ותרבות",
      en: "Architecture & Culture",
    },
    coverImage: "https://images.unsplash.com/photo-1548625361-195feee18116?auto=format&fit=crop&w=800&q=80",
    featured: false,
    tags: ["Architecture", "Jerusalem", "Petra", "Design"],
  },
];

// -------------------------------------------------------------
// ARTICLES DATA
// -------------------------------------------------------------
export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: "art-athens-and-jerusalem",
    slug: "athens-and-jerusalem-dialogue",
    title: {
      he: "בין אתונה לירושלים: הדיאלוג שעיצב את תבנית המחשבה המערבית",
      en: "Between Athens and Jerusalem: The Dialogue That Sculpted Thought",
    },
    subtitle: {
      he: "המתח הפורה שבין התבונה הפילוסופית היוונית לבין הקריאה המוסרית והנבואית",
      en: "The fertile tension between Greek speculative reason and prophetic ethical demand",
    },
    excerpt: {
      he: "התרבות המערבית נולדה מתוך שני קטבים מנוגדים: אתונה המחפשת את האמת בהרמוניה, התבוננות ולוגיקה, וירושלים הדורשת צדק, אחריות היסטורית והקשבה לקול הנבואה. האם ניתן ליישב ביניהם?",
      en: "Western consciousness was forged in the dialectic between two epic poles: Athens seeking immutable truth through logic and form, and Jerusalem demanding prophetic justice, history, and moral rupture.",
    },
    content: {
      he: [
        "כאשר טרטוליאנוס שאל במאה השנייה 'מה לאתונה ולירושלים?', הוא ביטא חרדה מפני ערבוב בין הפילוסופיה של אפלטון ואריסטו לבין הבשורה המקראית. אולם במבט היסטורי, דווקא המפגש וההתנגשות בין שתי התרבויות הללו הולידו את העושר הרעיוני המרתק ביותר של האנושות.",
        "ביוון, האלים היו חלק מן הטבע והיו כפופים לחוקי הגורל. הפילוסוף התבונן בעולם וחיפש את הסדר הנצחי. לעומת זאת, בירושלים האל הוא מעבר לטבע — הוא פונה אל האדם בדרישה מוסרית: 'מה ה' דורש ממך כי אם עשות משפט ואהבת חסד והצנע לכת'. כאן הזמן אינו מעגלי אלא היסטורי ובעל ייעוד.",
        "בישראל של ימינו, המתח הזה חי ונושם בכל פינה: בהייטק המפתח לוגיקה ואלגוריתמיקה עולמית (מורשת אתונה), ובמקביל בחיפוש העמוק אחר זהות, קהילה, משמעות וערבות הדדית (מורשת ירושלים). נויראוואן מבקשת להמשיך בדיאלוג החי הזה.",
      ],
      en: [
        "When Tertullian famously posed the query 'What has Athens to do with Jerusalem?', he captured the primordial apprehension of mingling Hellenic philosophical speculation with prophetic testimony. Yet historically, their intersection sparked civilization's most illuminating intellectual renaissance.",
        "In Greece, gods inhabited the natural cosmos, bound by the inexorable dictates of Ananke (Fate). The contemplative philosopher gazed upward to discover harmonious geometric order. In contrast, in Jerusalem, the divine transcends nature — addressing man with an unconditional moral imperative: justice, mercy, and walking humbly.",
        "In contemporary Israel, this tension vibrates in every street: in pioneering deep-tech logic and algorithmic innovation (the Hellenic heritage), woven with an unrelenting quest for identity, community, historical destiny, and mutual covenant (the Jerusalem heritage).",
      ],
    },
    author: {
      name: {
        he: "פרופ' שרון אבן-חן",
        en: "Prof. Sharon Even-Chen",
      },
      role: {
        he: "חוקרת פילוסופיה השוואתית, מכון שלם",
        en: "Comparative Philosophy Scholar, Shalem College",
      },
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    },
    publishedAt: "2026-11-08",
    readingTimeMin: 8,
    category: {
      he: "פילוסופיה והיסטוריה",
      en: "Philosophy & History",
    },
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
    tags: ["Philosophy", "Jerusalem", "Athens", "Ethics", "Intellectual History"],
    featured: true,
    relatedIds: ["art-neurobiology-of-sabbath", "vid-free-will-revolution"],
  },
  {
    id: "art-neurobiology-of-sabbath",
    slug: "neurobiology-of-sabbath-rest",
    title: {
      he: "הנוירוביולוגיה של השבת: מדוע המוח האנושי זקוק להפוגה מקודשת",
      en: "The Neurobiology of Rest: Why the Human Brain Craves Sacred Pause",
    },
    subtitle: {
      he: "מדע הקוגניציה המודרני מאשר את התובנה העתיקה של שביתת מלאכה",
      en: "Modern neuroscience confirms the primordial wisdom of unplugged deliberate rest",
    },
    excerpt: {
      he: "בעידן שבו מסכים, התראות וקצב עבודה של 24/7 מציפים את מערכת הדופמין ומייצרים עייפות כרונית, הרעיון המהפכני של השבת — עצירה מוחלטת ללא מטרות ייצור — מתגלה כמגן החיוני ביותר על הבריאות הנפשית והיצירתיות.",
      en: "In an epoch of 24/7 digital notifications, relentless dopamine hijacking, and chronic cognitive exhaustion, the revolutionary Levantine innovation of Shabbat — a radical cessation of production — proves the ultimate antidote.",
    },
    content: {
      he: [
        "רעיון השבת הוא ככל הנראה התרומה הסוציאלית והרוחנית המהפכנית ביותר שהעניקה היהדות לעולם. במזרח הקדום, רק עבדים ומשרתים היו מנוצלים ללא הרף. השבת הכריזה: אפילו עבדך, שורך וחמורך ינוחו. יש ערך לקיום שאינו נמדד בתפוקה כלכלית.",
        "מחקרי fMRI עדכניים שנערכו במכון ויצמן ובאוניברסיטת תל אביב מראים כי רשת ה-DMN (Default Mode Network) במוח זקוקה לשעות רצופות של חוסר מטלה תפקודית כדי לגבש זיכרונות, לייצר תובנות יצירתיות ולשקם את רמות הקורטיזול.",
        "כשמנתקים את הטלפון החכם למשך 25 שעות בשבוע, מתרחש שינוי קוגניטיבי עמוק: מערכת העצבים הסימפתטית (תגובת Fight or Flight) נרגעת, והמערכת הפאראסימפתטית מאפשרת שיקום ביולוגי אמיתי. השבת איננה רק ציווי דתי — היא ארכיטקטורה של בריאות הנפש.",
      ],
      en: [
        "The concept of the Sabbath is arguably one of the most radical social and existential gifts to humanity. In antiquity, labor was relentless for the unfree. The Sabbath proclaimed: even your servant, your ox, and the stranger in your gates shall rest. Being precedes doing.",
        "Neuroimaging studies reveal that the brain's Default Mode Network (DMN) requires sustained periods of non-goal-directed awareness to consolidate episodic memories, synthesize lateral creative insights, and recalibrate baseline cortisol.",
        "Disconnecting from handheld screens for a full 25 hours weekly creates a physiological paradigm shift: down-regulating sympathetic stress responses and granting parasympathetic cellular restoration. Sabbath is sacred cognitive architecture.",
      ],
    },
    author: {
      name: {
        he: "ד\"ר רונן ברק",
        en: "Dr. Ronen Barak",
      },
      role: {
        he: "נוירולוג וחוקר שינה, המרכז הרפואי הדסה",
        en: "Neurologist & Sleep Researcher, Hadassah Medical Center",
      },
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    publishedAt: "2026-11-01",
    readingTimeMin: 6,
    category: {
      he: "מדעי המוח ובריאות",
      en: "Neuroscience & Wellness",
    },
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    tags: ["Shabbat", "Neuroscience", "Mindfulness", "Israel", "Mental Health"],
    featured: true,
    relatedIds: ["art-athens-and-jerusalem", "ep-42-hebrew-cognition"],
  },
  {
    id: "art-metaphors-golden-age",
    slug: "metaphors-hebrew-golden-age",
    title: {
      he: "השפה הציורית: עולם המטאפורות של שירת ימי הביניים בספרד",
      en: "Visual Language: The Metaphorical Cosmos of Hebrew Golden Age Poetry",
    },
    subtitle: {
      he: "אבן גבירול, ריה\"ל ומשה אבן עזרא בצומת המפגש שבין ערבית לעברית",
      en: "Ibn Gabirol, Yehuda Halevi, and Ibn Ezra at the vibrant crossroads of Arabic & Hebrew",
    },
    excerpt: {
      he: "בספרד המוסלמית של המאות ה-10 עד ה-12, המשוררים העבריים אימצו את המשקל והדימויים של השירה הערבית הקלאסית, ויצרו רנסנס ספרותי מהמם שבו יין, מדבר, אהבה וכיסופי ציון נמזגו יחד.",
      en: "In Moorish Al-Andalus, Jewish poets embraced Arabic prosody, unleashing a glittering literary golden age where desert yearning, wine, courtly love, and mystic devotion coalesced.",
    },
    content: {
      he: [
        "שירת תור הזהב בספרד מהווה הוכחה מרהיבה לכך שהעברית מעולם לא הייתה שפה מבודדת. כאשר שלמה אבן גבירול ויהודה הלוי כתבו שירים, הם שוחחו במקביל עם התנ\"ך ועם השירה הערבית של בגדאד וקורדובה.",
        "הדימויים שלהם מלאי חיוניות חושנית: הלילה הוא נמר שחור זרוע כוכבי זהב, הבוקר הוא נער יפהפה המפזר ורדים ברקיע, והלב האנושי הוא כינור המתרטט לקראת האינסוף.",
      ],
      en: [
        "Golden Age Iberian Hebrew poetry demonstrates that Hebrew was never insular. When Solomon Ibn Gabirol and Yehuda Halevi composed verses, they were in continuous dialogue with biblical cadences and the refined Arabic meters of Baghdad and Córdoba.",
        "Their metaphors overflow with sensual majesty: night is a black panther dusted with gold stars, dawn is a youth scattering rose petals across heaven, and the human heart a lyre vibrating before infinity.",
      ],
    },
    author: {
      name: {
        he: "מיכל לב-ארי",
        en: "Michal Lev-Ari",
      },
      role: {
        he: "מרצה לספרות עברית ותרבות ימי הביניים",
        en: "Lecturer in Hebrew Literature & Medieval Culture",
      },
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    publishedAt: "2026-10-18",
    readingTimeMin: 10,
    category: {
      he: "ספרות ושירה",
      en: "Literature & Poetry",
    },
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    tags: ["Poetry", "Hebrew", "History", "Literature", "Al-Andalus"],
    featured: false,
    relatedIds: ["art-athens-and-jerusalem"],
  },
];

// -------------------------------------------------------------
// COLLECTIONS DATA
// -------------------------------------------------------------
export const INITIAL_COLLECTIONS: CollectionItem[] = [
  {
    id: "col-consciousness-and-heritage",
    slug: "consciousness-and-heritage",
    title: {
      he: "תודעה, מוח ומסורות חוכמה",
      en: "Consciousness, Mind & Wisdom Traditions",
    },
    subtitle: {
      he: "חיבור עמוק בין חקר המוח למסורות התבוננות עתיקות",
      en: "Connecting neurobiology, meditative silence, and ancient contemplation",
    },
    description: {
      he: "סדרת מסעות משולבת הכוללת פרקי פודקאסט, סרטי אנימציה ומאמרי עומק הבוחנים כיצד המוח האנושי מעבד משמעות, שפה ושקט.",
      en: "A unified learning journey curating podcast episodes, visual essays, and articles exploring how human cognition constructs meaning, speech, and quiet.",
    },
    coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    category: {
      he: "פילוסופיה ומדע",
      en: "Philosophy & Science",
    },
    episodeIds: ["ep-42-hebrew-cognition", "ep-43-desert-solitude"],
    videoIds: ["vid-free-will-revolution"],
    articleIds: ["art-neurobiology-of-sabbath", "art-athens-and-jerusalem"],
    featured: true,
    color: "#1D4ED8",
  },
  {
    id: "col-jerusalem-strata",
    slug: "jerusalem-strata-and-landscapes",
    title: {
      he: "שכבות של זמן: ירושלים והמרחב השמי",
      en: "Strata of Time: Jerusalem & The Levantine World",
    },
    subtitle: {
      he: "ארכיאולוגיה, היסטוריה ונוף תרבותי חי",
      en: "Archaeology, history, and the living Mediterranean cultural tapestry",
    },
    description: {
      he: "צלילה אל תוך ההיסטוריה החיה של ארץ ישראל: ממערות ים המלח ועד סמטאות ירושלים, מגילות קדומות וחרסים שמספרים סיפור אנושי בן אלפי שנים.",
      en: "Delve into the living strata of Israel: from Dead Sea desert caves to Jerusalem alleyways, ancient scrolls and pottery telling an enduring human story.",
    },
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    category: {
      he: "ארכיאולוגיה ומורשת",
      en: "Archaeology & Heritage",
    },
    episodeIds: ["ep-18-judean-strata", "ep-43-desert-solitude"],
    videoIds: ["vid-dead-sea-scrolls", "vid-sacred-architecture"],
    articleIds: ["art-metaphors-golden-age"],
    featured: true,
    color: "#C25E3E",
  },
  {
    id: "col-future-and-humanism",
    slug: "future-and-humanism",
    title: {
      he: "אופק העתיד: טכנולוגיה, אדם ואחריות",
      en: "The Future Horizon: Tech, Ethics & Soul",
    },
    subtitle: {
      he: "ישראל כמובילת בינה מלאכותית והשאלות המוסריות של מחר",
      en: "Israel at the vanguard of AI and tomorrow's existential ethical challenges",
    },
    description: {
      he: "איך שומרים על ערכים הומניסטיים, רגש וחיבור אנושי בעולם הנשלט בידי אלגוריתמים? סדרת תכנים מיוחדת המיועדת להוגים, יזמים ואנשי חינוך.",
      en: "How do we preserve human agency, empathy, and soulful connection in an algorithmically governed world? Curated for technologists and philosophers alike.",
    },
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    category: {
      he: "טכנולוגיה ועתידנות",
      en: "Technology & Futurism",
    },
    episodeIds: ["ep-29-ai-and-soul"],
    videoIds: ["vid-free-will-revolution"],
    articleIds: ["art-athens-and-jerusalem"],
    featured: false,
    color: "#2D5A46",
  },
];

// -------------------------------------------------------------
// LEARNING RESOURCES / ACADEMY
// -------------------------------------------------------------
export const INITIAL_RESOURCES: LearningResource[] = [
  {
    id: "res-hebrew-roots-companion",
    title: {
      he: "מדריך שורשי השפה העברית: תבניות ומחשבה",
      en: "Hebrew Roots Field Guide: Patterns & Cognition",
    },
    subtitle: {
      he: "כרטיסיות לימוד חזותיות ל-50 שורשי מפתח במחשבה המקראית והפילוסופית",
      en: "Visual study cards for 50 foundational roots in biblical and philosophical Hebrew",
    },
    description: {
      he: "מדריך להורדה חינמית בפורמט PDF איכותי. כולל ניתוח אטימולוגי, שרטוטים טיפוגרפיים, שימושים היסטוריים ודוגמאות מודרניות מותאמות לעברית עכשווית.",
      en: "Free high-resolution companion PDF guide. Features etymological maps, typographic infographics, and comparative ancient and modern Hebrew cognates.",
    },
    type: "guide",
    formatLabel: { he: "חוברת PDF להורדה (48 עמ')", en: "Downloadable PDF Guide (48 pp)" },
    pagesOrDuration: { he: "48 עמודים", en: "48 Pages" },
    level: { he: "לכל הרמות", en: "All Levels" },
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#download-roots-guide",
    topics: {
      he: ["בלשנות עברית", "סמנטיקה", "מדעי הקוגניציה", "לימוד שפה"],
      en: ["Hebrew Linguistics", "Semantics", "Cognitive Studies", "Language Study"],
    },
  },
  {
    id: "res-dead-sea-scrolls-chart",
    title: {
      he: "ציר הזמן הגדול של מגילות ים המלח וספרות בית שני",
      en: "The Master Chronological Chart of Dead Sea Scrolls & Second Temple Era",
    },
    subtitle: {
      he: "אינפוגרפיקה מקיפה ברזולוציה גבוהה להדפסה ולימוד",
      en: "Comprehensive high-resolution poster infographic for study circles and classrooms",
    },
    description: {
      he: "תרשים חזותי עוצר נשימה הממפה את כל כתבי היד של קומראן על ציר הזמן ההיסטורי, במקביל למאורעות האימפריה הפרסית, ההלניסטית והרומית.",
      en: "An intricate visual timeline cross-referencing Qumran scrolls with Persian, Hellenistic, and Roman Levantine history.",
    },
    type: "chart",
    formatLabel: { he: "פוסטר אינפוגרפי דיגיטלי", en: "High-Res Poster Infographic" },
    pagesOrDuration: { he: "פוסטר פנורמי", en: "Panoramic Chart" },
    level: { he: "מתקדמים", en: "Intermediate to Advanced" },
    coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#download-scrolls-chart",
    topics: {
      he: ["ארכיאולוגיה", "היסטוריה של עם ישראל", "בית שני", "מגילות"],
      en: ["Archaeology", "Jewish History", "Second Temple", "Scrolls"],
    },
  },
  {
    id: "res-salon-discussion-prompts",
    title: {
      he: "ערכת דיון לחוגי בית וסלוני הגות: פילוסופיה, אתיקה וזהות",
      en: "Salon Discussion Prompts: Ethics, Mind & Identity Circles",
    },
    subtitle: {
      he: "12 מערכי שיחה מונחים לקהילות, קבוצות לימוד ומפגשי חברים בישראל",
      en: "12 guided discussion protocols for learning circles, salons, and educator groups",
    },
    description: {
      he: "ערכה אינטלקטואלית מובנית הכוללת קטעי קריאה קצרים, שאלות מעוררות מחשבה, ומקורות השוואה בין מקורות עבריים למחשבה העולמית.",
      en: "Curated discussion sets featuring short excerpt prompts, thought experiments, and comparative primary texts.",
    },
    type: "seminar",
    formatLabel: { he: "ערכת הנחיה מלאה", en: "Complete Discussion Kit" },
    pagesOrDuration: { he: "12 מפגשים", en: "12 Sessions" },
    level: { he: "פתוח לקהל", en: "Open to Public" },
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#download-discussion-kit",
    topics: {
      he: ["חוגי בית", "חינוך והגות", "דיאלוג", "קהילה"],
      en: ["Salons", "Education & Thought", "Dialogue", "Community"],
    },
  },
];

// -------------------------------------------------------------
// UI TRANSLATIONS DICTIONARY
// -------------------------------------------------------------
export const UI_TRANSLATIONS = {
  he: {
    siteName: "נויראוואן",
    brandSubtitle: "פלטפורמת תוכן, סיפור והגות",
    tagline: "מסע אל עומק הרעיונות, הסיפורים והתודעה",
    nav: {
      home: "ראשי",
      explore: "גלו עוד",
      podcasts: "פודקאסטים",
      videos: "וידאו",
      articles: "מאמרים",
      collections: "אוספים",
      resources: "חומרי למידה",
      about: "אודות",
      contact: "צור קשר",
      search: "חיפוש",
      admin: "מערכת ניהול CMS",
      subscribe: "הירשמו לניוזלטר",
    },
    hero: {
      badge: "פלטפורמת המדיה וההגות החדשה בישראל",
      title: "מסע אל עומק הרעיונות, הסיפורים והתודעה",
      description: "נויראוואן מחברת בין פילוסופיה קדומה, מדעי המוח, ארכיאולוגיה חיה ועתיד הטכנולוגיה — בחוויית סיפור דיגיטלית מרהיבה, פודקאסטים עטורי שבחים ותכנים בעברית עשירה ומעוררת השראה.",
      ctaPrimary: "התחילו לחקור",
      ctaSecondary: "האזינו לפודקאסט",
      featuredBadge: "פרק נבחר השבוע",
      listenTime: "דקות האזנה",
    },
    latest: {
      title: "החדשים ביותר בפודקאסט, וידאו ועיון",
      subtitle: "תכנים נבחרים שפורסמו לאחרונה על ידי צוות היוצרים של נויראוואן",
      badgePodcast: "פודקאסט",
      badgeVideo: "וידאו",
      badgeArticle: "מאמר",
      badgeResource: "חומרי למידה",
      badgeCollection: "אוסף",
      viewAll: "לכל התכנים ←",
    },
    explorePillars: {
      title: "ארבעת עמודי התוכן של נויראוואן",
      subtitle: "בחרו את הפורמט שמעורר בכם סקרנות ולמדו בדרך שמתאימה לכם",
      videos: "סרטי אנימציה ווידאו",
      videosDesc: "סרטים תיעודיים קצרים, אנימציות מרהיבות והרצאות מופת על ההיסטוריה והמחשבה.",
      podcasts: "פודקאסטים ותוכניות אודיו",
      podcastsDesc: "שיחות עומק אינטימיות עם גדולי החוקרים, היוצרים וההוגים בישראל.",
      articles: "מאמרים ומסות הגות",
      articlesDesc: "קריאה מעמיקה בטיפוגרפיה עברית מוקפדת על תודעה, ספרות, שבת ואתיקה.",
      resources: "אקדמיה וחומרי למידה",
      resourcesDesc: "מדריכי שורשים, תרשימים כרונולוגיים וערכות דיון חינמיות להורדה.",
    },
    featuredCollections: {
      title: "אוספי תוכן ומסעות למידה",
      subtitle: "סדרות רב-תחומיות המחברות פודקאסטים, סרטונים ומאמרים למהלך שלם",
      itemsCount: "פריטי תוכן",
      exploreCollection: "חקרו את האוסף ←",
    },
    player: {
      nowPlaying: "מתנגן כעת",
      listenNow: "האזן עכשיו",
      pause: "השהה",
      play: "נגן",
      rewind15: "15 שניות אחורה",
      forward30: "30 שניות קדימה",
      speed: "מהירות",
      volume: "עוצמת שמע",
      chapters: "פרקים בציר הזמן",
      transcript: "תמליל חי ומילים עבריות",
      showNotes: "הערות הפרק ומקורות",
      voiceHover: "תובנות שורשים",
      openFull: "פתח נגן מורחב",
      closeFull: "מזער נגן",
      streamOn: "האזינו גם ב:",
      audioFallbackNotice: "שמע חי פעיל: מנוע אודיו מקומי מסונכרן",
    },
    newsletter: {
      headline: "הישארו סקרנים. המשיכו לחקור.",
      subhead: "הצטרפו לקהילת ההגות והיצירה של נויראוואן. פעם בשבוע, ישירות לתיבת הדואר: מאמר עומק, פרק פודקאסט חדש ותובנת שפה עברית.",
      placeholder: "כתובת הדוא\"ל שלכם...",
      button: "הרשמה לניוזלטר",
      success: "תודה שהצטרפתם! המייל הראשון בדרך אליכם.",
      privacy: "אנו מכבדים את פרטיותכם. ללא ספאם, ניתן להסיר הרשמה בכל עת.",
    },
    footer: {
      aboutBrand: "נויראוואן (NEURAVAN) היא פלטפורמת מדיה, פודקאסטים וסיפור דיגיטלי מובילה בישראל, המוקדשת להפצת רעיונות עמוקים, חיבור בין מדע למסורת, ותרבות ים-תיכונית חיה.",
      quickLinks: "ניווט מהיר",
      platforms: "פלטפורמות האזנה",
      legal: "תנאים ומשפטי",
      terms: "תנאי שימוש",
      privacy: "מדיניות פרטיות",
      accessibility: "הצהרת נגישות",
      copyright: "© 2026 נויראוואן (NEURAVAN). כל הזכויות שמורות. נוצר בישראל באהבה לשפה ולמחשבה.",
      location: "שדרות רוטשילד 45, תל אביב-יפו, ישראל • אזור זמן: אסיה/ירושלים (GMT+2/3)",
    },
    search: {
      placeholder: "חפשו פודקאסטים, מאמרים, סרטונים, מושגים בעברית...",
      allCategories: "כל הקטגוריות",
      resultsCount: "תוצאות נמצאו",
      noResults: "לא נמצאו תוצאות עבור החיפוש שלכם. נסו מילות מפתח אחרות כמו: שפה, תודעה, מדבר, שבת, ירושלים.",
      suggestionsTitle: "חיפושים פופולריים בישראל:",
    },
    admin: {
      title: "מרכז הניהול והתוכן של נויראוואן (CMS)",
      subtitle: "הוספה, עריכה ועדכון של פודקאסטים, סרטונים, מאמרים ואוספים בעברית ובאנגלית",
      addEpisode: "הוסף פרק פודקאסט חדש",
      addShow: "הוסף תוכנית חדשה",
      addVideo: "הוסף סרטון וידאו",
      addArticle: "פרסם מאמר חדש",
      addCollection: "צור אוסף חדש",
      saveChanges: "שמור שינויים",
      resetData: "איפוס לנתוני ברירת מחדל",
      exportJson: "ייצוא נתונים (JSON)",
      importJson: "ייבוא נתונים",
      tabEpisodes: "פרקי פודקאסט",
      tabShows: "תוכניות",
      tabVideos: "וידאו",
      tabArticles: "מאמרים",
      tabCollections: "אוספים",
      savedAlert: "הנתונים נשמרו בהצלחה במערכת המקומית!",
    },
  },
  en: {
    siteName: "NEURAVAN",
    brandSubtitle: "Ideas, Storytelling & Podcast Platform",
    tagline: "A Journey into Ideas, Storytelling, and Human Mind",
    nav: {
      home: "Home",
      explore: "Explore",
      podcasts: "Podcasts",
      videos: "Videos",
      articles: "Articles",
      collections: "Collections",
      resources: "Learning Resources",
      about: "About",
      contact: "Contact",
      search: "Search",
      admin: "Admin CMS",
      subscribe: "Subscribe",
    },
    hero: {
      badge: "Israel's Premier Digital Storytelling Platform",
      title: "A Journey into Ideas, Storytelling, and Human Mind",
      description: "NEURAVAN bridges ancient Levantine philosophy, cognitive neuroscience, living archaeology, and tomorrow's technology — in a breathtaking editorial storytelling experience, award-winning podcasts, and deep intellectual curiosity.",
      ctaPrimary: "Explore NEURAVAN",
      ctaSecondary: "Listen to Podcast",
      featuredBadge: "Featured Episode This Week",
      listenTime: "Min Listen",
    },
    latest: {
      title: "The Latest Class, Podcast, and More",
      subtitle: "Handpicked selections recently published by the NEURAVAN creative fellowship",
      badgePodcast: "PODCAST",
      badgeVideo: "VIDEO",
      badgeArticle: "ARTICLE",
      badgeResource: "LEARNING",
      badgeCollection: "COLLECTION",
      viewAll: "Explore All Content →",
    },
    explorePillars: {
      title: "Four Pillars of NEURAVAN",
      subtitle: "Choose the medium that sparks your curiosity and learn at your own pace",
      videos: "Animated Short Films & Videos",
      videosDesc: "Visual documentaries, exquisite animations, and lectures on Mediterranean history and ideas.",
      podcasts: "Podcasts & Audio Shows",
      podcastsDesc: "Intimate salon dialogues with leading Israeli scholars, creators, and scientists.",
      articles: "Editorial Articles & Essays",
      articlesDesc: "Deep reading with pristine typography on cognition, literature, sacred rest, and ethics.",
      resources: "Academy & Study Guides",
      resourcesDesc: "Downloadable root language guides, panoramic charts, and community discussion kits.",
    },
    featuredCollections: {
      title: "Thematic Collections & Learning Journeys",
      subtitle: "Interdisciplinary series connecting podcasts, video documentaries, and longform essays",
      itemsCount: "Media Items",
      exploreCollection: "Explore Collection →",
    },
    player: {
      nowPlaying: "Now Playing",
      listenNow: "Listen Now",
      pause: "Pause",
      play: "Play",
      rewind15: "15s Back",
      forward30: "30s Forward",
      speed: "Speed",
      volume: "Volume",
      chapters: "Chapters & Markers",
      transcript: "Live Transcript & Hebrew Insights",
      showNotes: "Show Notes & Sources",
      voiceHover: "Root Concepts",
      openFull: "Expand Player",
      closeFull: "Minimize Player",
      streamOn: "Also stream on:",
      audioFallbackNotice: "Active Audio Stream: local high-fidelity synthesizer synchronized",
    },
    newsletter: {
      headline: "Stay Curious. Keep Exploring.",
      subhead: "Join NEURAVAN's fellowship of thinkers and creators. Once a week in your inbox: one deep essay, one podcast episode, and one Hebrew root insight.",
      placeholder: "Your email address...",
      button: "Subscribe to Newsletter",
      success: "Thank you for subscribing! The first dispatch is on its way.",
      privacy: "We respect your privacy. No spam, unsubscribe anytime.",
    },
    footer: {
      aboutBrand: "NEURAVAN is an established digital media, storytelling, and podcast brand based in Israel, dedicated to exploring profound ideas, human consciousness, and Mediterranean cultural heritage.",
      quickLinks: "Quick Navigation",
      platforms: "Streaming Everywhere",
      legal: "Legal & Governance",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      accessibility: "Accessibility",
      copyright: "© 2026 NEURAVAN. All rights reserved. Crafted in Israel with reverence for thought and language.",
      location: "45 Rothschild Blvd, Tel Aviv-Yafo, Israel • Local Timezone: Asia/Jerusalem (GMT+2/3)",
    },
    search: {
      placeholder: "Search podcast episodes, videos, articles, Hebrew concepts...",
      allCategories: "All Categories",
      resultsCount: "results found",
      noResults: "No results matched your query. Try searching for: Hebrew, Consciousness, Desert, Sabbath, Jerusalem, AI.",
      suggestionsTitle: "Popular Searches in Israel:",
    },
    admin: {
      title: "NEURAVAN Content Management System (CMS)",
      subtitle: "Create, edit, and publish podcast shows, episodes, videos, articles, and collections in Hebrew and English",
      addEpisode: "Add New Podcast Episode",
      addShow: "Add New Show",
      addVideo: "Add Video",
      addArticle: "Publish Article",
      addCollection: "Create Collection",
      saveChanges: "Save Changes",
      resetData: "Reset to Default Curated Data",
      exportJson: "Export Data (JSON)",
      importJson: "Import Data",
      tabEpisodes: "Episodes",
      tabShows: "Shows",
      tabVideos: "Videos",
      tabArticles: "Articles",
      tabCollections: "Collections",
      savedAlert: "Changes successfully saved to local CMS database!",
    },
  },
};

// -------------------------------------------------------------
// LOCALIZATION HELPERS
// -------------------------------------------------------------
export function formatIsraeliDate(dateStr: string, lang: Language): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    if (lang === 'he') {
      return d.toLocaleDateString('he-IL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Jerusalem',
      });
    }
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Jerusalem',
    });
  } catch {
    return dateStr;
  }
}
