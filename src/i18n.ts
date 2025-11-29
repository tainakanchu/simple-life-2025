export type Locale = "ja" | "zh-TW";

export interface AppTranslation {
  nav: {
    timeline: string;
    stages: string;
    signing: (count: number) => string;
    favorites: (count: number) => string;
  };
  upcomingTitle: string;
  timeUntil: (countdown: string) => string;
  clockLabel: string;
  timezone: string;
  officialLinks: string;
  mapButton: string;
  goodsStatus: string;
  mapAlt: string;
  mapClose: string;
  languageLabel: string;
  favoritesEmptyTitle: string;
  favoritesEmptyHint: string;
  signing: {
    title: string;
    location: string;
    goods: string;
    caution: string;
    ongoing: string;
    ended: string;
    upcoming: string;
    label: string;
  };
  common: {
    now: string;
    endsIn: (countdown: string) => string;
  };
}

export const translations: Record<Locale, AppTranslation> = {
  ja: {
    nav: {
      timeline: "タイムライン",
      stages: "ステージ別",
      signing: (count) => `サイン会 (${count})`,
      favorites: (count) => `お気に入り (${count})`,
    },
    upcomingTitle: "次のお気に入り",
    timeUntil: (countdown) => `あと ${countdown}`,
    clockLabel: "現在時刻",
    timezone: "台北 (GMT+8)",
    officialLinks: "Official Links",
    mapButton: "会場マップ",
    goodsStatus: "グッズ在庫状況",
    mapAlt: "Simple Life 2025 会場マップ",
    mapClose: "✕ 閉じる",
    languageLabel: "表示言語",
    favoritesEmptyTitle: "お気に入りがありません",
    favoritesEmptyHint: "アーティストの ★ や ♡ をタップして追加",
    signing: {
      title: "音楽人サイン会",
      location: "Legacy 舞台左側の入口付近",
      goods: "公式グッズ・アーティストグッズのみ対応",
      caution: "スタッフの案内に従って並んでください",
      ongoing: "サイン会中!",
      ended: "終了",
      upcoming: "サイン会",
      label: "サイン会",
    },
    common: {
      now: "NOW",
      endsIn: (countdown) => `${countdown} で終了`,
    },
  },
  "zh-TW": {
    nav: {
      timeline: "時間軸",
      stages: "舞台列表",
      signing: (count) => `簽名會 (${count})`,
      favorites: (count) => `收藏 (${count})`,
    },
    upcomingTitle: "稍後的收藏",
    timeUntil: (countdown) => `還有 ${countdown}`,
    clockLabel: "現在時間",
    timezone: "台北（GMT+8）",
    officialLinks: "官方連結",
    mapButton: "會場地圖",
    goodsStatus: "周邊庫存資訊",
    mapAlt: "Simple Life 2025 會場地圖",
    mapClose: "✕ 關閉",
    languageLabel: "介面語言",
    favoritesEmptyTitle: "尚未加入收藏",
    favoritesEmptyHint: "點擊演出者旁的 ★ 或 ♡ 即可加入",
    signing: {
      title: "音樂人簽名會",
      location: "Legacy 舞台左側入口旁",
      goods: "僅提供官方或音樂人周邊簽名",
      caution: "請依照工作人員動線排隊",
      ongoing: "簽名進行中！",
      ended: "已結束",
      upcoming: "簽名會",
      label: "簽名會",
    },
    common: {
      now: "現在",
      endsIn: (countdown) => `剩下 ${countdown}`,
    },
  },
};

export const detectLocale = (): Locale => {
  try {
    const stored = localStorage.getItem("simplelife-locale") as Locale | null;
    if (stored && translations[stored]) {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }

  if (typeof navigator !== "undefined") {
    const lang = navigator.language || navigator.languages?.[0] || "";
    if (lang.toLowerCase().startsWith("zh")) {
      return "zh-TW";
    }
  }

  return "ja";
};
