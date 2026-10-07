/**
 * TypeBaazi Gamification & Badges System
 * Handles levels, XP progression, ranks, and unlockable achievement badges.
 */

export interface BadgeDefinition {
  id: string;
  icon: string;
  name: string;
  nameMr: string;
  description: string;
  descriptionMr: string;
  category: 'speed' | 'accuracy' | 'streak' | 'races' | 'special';
}

export const BADGES: BadgeDefinition[] = [
  {
    id: 'badge-welcome',
    icon: '👋',
    name: 'New Racer',
    nameMr: 'नवा धावपटू',
    description: 'Joined TypeBaazi and began the typing journey.',
    descriptionMr: 'TypeBaazi वर आगमन आणि टायपिंग प्रवासाची सुरुवात.',
    category: 'special'
  },
  {
    id: 'badge-first-step',
    icon: '🚀',
    name: 'First Lap',
    nameMr: 'पहिली फेरी',
    description: 'Completed your first typing test or race.',
    descriptionMr: 'पहिली टायपिंग टेस्ट किंवा शर्यत पूर्ण केली.',
    category: 'special'
  },
  {
    id: 'badge-speed-40',
    icon: '⚡',
    name: '40 WPM Club',
    nameMr: '४० WPM क्लब',
    description: 'Achieved a typing speed of 40 WPM or higher.',
    descriptionMr: '४० किंवा त्याहून अधिक WPM गती गाठली.',
    category: 'speed'
  },
  {
    id: 'badge-speed-60',
    icon: '🏎️',
    name: 'Speedster (60 WPM)',
    nameMr: 'वेगवान रायडर (६० WPM)',
    description: 'Reached 60 WPM — faster than the global average!',
    descriptionMr: '६० WPM वेग गाठला — जागतिक सरासरीपेक्षा अधिक!',
    category: 'speed'
  },
  {
    id: 'badge-speed-80',
    icon: '🔥',
    name: 'Nitro Surge (80 WPM)',
    nameMr: 'नायट्रो सर्ज (८० WPM)',
    description: 'Crossed 80 WPM with blazing keystrokes.',
    descriptionMr: '८० WPM ची वेगवान मर्यादा पार केली.',
    category: 'speed'
  },
  {
    id: 'badge-speed-100',
    icon: '👑',
    name: 'Century King (100 WPM)',
    nameMr: 'शतकवीर (१०० WPM)',
    description: 'Surpassed 100 WPM — elite grandmaster speed!',
    descriptionMr: '१०० WPM पार — अत्यंत अव्वल ग्रँडमास्टर गती!',
    category: 'speed'
  },
  {
    id: 'badge-perfectionist',
    icon: '🎯',
    name: 'Flawless Precision',
    nameMr: 'अचूकता शिरोमणी',
    description: 'Finished a full test with 100% accuracy (min 30 WPM).',
    descriptionMr: '१००% अचूकतेसह टेस्ट यशस्वीरीत्या पूर्ण केली.',
    category: 'accuracy'
  },
  {
    id: 'badge-marathi-master',
    icon: '🚩',
    name: 'Marathi Master',
    nameMr: 'मराठी टायपिंग सम्राट',
    description: 'Clocked 40+ WPM in Marathi typing.',
    descriptionMr: 'मराठी टायपिंगमध्ये ४०+ WPM गती नोंदवली.',
    category: 'special'
  },
  {
    id: 'badge-racer',
    icon: '🏁',
    name: 'Grand Prix Racer',
    nameMr: 'ग्रँड प्रिक्स रेसर',
    description: 'Participated and completed a real-time virtual car race.',
    descriptionMr: 'व्हर्च्युअल कार शर्यत यशस्वीरीत्या पूर्ण केली.',
    category: 'races'
  },
  {
    id: 'badge-streak-7',
    icon: '🗓️',
    name: 'Week-Long Streak',
    nameMr: '७ दिवसांचा सराव',
    description: 'Maintained a 7-day daily typing streak.',
    descriptionMr: 'सलग ७ दिवस टायपिंग सराव पूर्ण केला.',
    category: 'streak'
  },
  {
    id: 'badge-streak-25',
    icon: '🥈',
    name: 'Silver Streak (25 Days)',
    nameMr: '२५ दिवसांचा अखंड सराव',
    description: 'Maintained a 25-day daily typing streak on TypeBaazi.',
    descriptionMr: 'सलग २५ दिवस दररोज टायपिंग सराव पूर्ण केला.',
    category: 'streak'
  },
  {
    id: 'badge-streak-50',
    icon: '🥇',
    name: 'Golden Streak (50 Days)',
    nameMr: '५० दिवसांचा सुवर्ण सराव',
    description: 'Maintained a 50-day daily typing streak and unlocked the Golden Certificate!',
    descriptionMr: 'सलग ५० दिवस दररोज टायपिंग सराव पूर्ण करून सुवर्ण प्रमाणपत्र पटकावले!',
    category: 'streak'
  },
  {
    id: 'badge-streak-100',
    icon: '💎',
    name: 'Century Master Streak (100 Days)',
    nameMr: '१०० दिवसांचे महासत्र',
    description: 'Maintained a legendary 100-day daily typing streak on TypeBaazi!',
    descriptionMr: 'सलग १०० दिवस दररोज टायपिंग सराव पूर्ण करून ऐतिहासिक विक्रम केला!',
    category: 'streak'
  },
  {
    id: 'badge-streak-365',
    icon: '⭐',
    name: 'Year-Long Legend (365 Days)',
    nameMr: '३६५ दिवसांचा अखंड इतिहास',
    description: 'Completed a full 365-day year-long daily typing streak in the TypeBaazi Hall of Fame!',
    descriptionMr: 'संपूर्ण वर्षभर (३६५ दिवस) दररोज टायपिंग करून TypeBaazi हॉल ऑफ फेममध्ये स्थान मिळवले!',
    category: 'streak'
  },
  {
    id: 'badge-bot-slayer',
    icon: '🏆',
    name: 'Grand Prix Champion (Beat AI Bot)',
    nameMr: 'AI बॉट अजिंक्यपद (ग्रँड प्रिक्स विजेता)',
    description: 'Defeated the AI Bot in a virtual typing Grand Prix race and earned an Official Certificate!',
    descriptionMr: 'ग्रँड प्रिक्स शर्यतीत AI बॉटचा पराभव करून TypeBaazi अधिकृत प्रमाणपत्र पटकावले!',
    category: 'races'
  }
];

export interface LevelInfo {
  level: number;
  title: string;
  titleMr: string;
  minXp: number;
  maxXp: number;
  progressPercent: number;
}

export function getLevelInfo(totalXp: number): LevelInfo {
  // Level formula: level = floor(sqrt(xp / 50)) + 1
  const level = Math.max(1, Math.floor(Math.sqrt(totalXp / 50)) + 1);
  const minXp = Math.pow(level - 1, 2) * 50;
  const maxXp = Math.pow(level, 2) * 50;
  const currentLevelXp = totalXp - minXp;
  const neededXp = maxXp - minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentLevelXp / neededXp) * 100)));

  const titles: { title: string; titleMr: string }[] = [
    { title: 'Keyboard Rookie', titleMr: 'नवशिक्या टायपिस्ट' },
    { title: 'Key Explorer', titleMr: 'की शोधक' },
    { title: 'Touch Typer', titleMr: 'टच टायपर' },
    { title: 'Street Racer', titleMr: 'स्ट्रीट रेसर' },
    { title: 'Velocity Pro', titleMr: 'व्हेलोसिटी प्रो' },
    { title: 'Track Champion', titleMr: 'ट्रॅक चॅम्पियन' },
    { title: 'Nitro Overdrive', titleMr: 'नायट्रो ओव्हरड्राईव्ह' },
    { title: 'Cyber Speedster', titleMr: 'सायबर स्पीडस्टर' },
    { title: 'Typing Legend', titleMr: 'टायपिंग लीजेंड' },
    { title: 'TypeBaazi Grandmaster', titleMr: 'टायपिंग सम्राट' }
  ];

  const index = Math.min(titles.length - 1, Math.floor((level - 1) / 3));
  const { title, titleMr } = titles[index];

  return {
    level,
    title,
    titleMr,
    minXp,
    maxXp,
    progressPercent
  };
}
