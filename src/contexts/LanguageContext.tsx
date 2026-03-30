import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ur" | "pn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.categories": "Categories",
    "nav.trending": "Trending",
    "nav.chatbot": "AI Chatbot",
    "nav.about": "About",
    "nav.admin": "Admin",
    "nav.adminDashboard": "Admin Dashboard",
    "brand.name": "Pakistani Myth Guider",
    "brand.tagline": "Fact-Check • Discover • Learn",

    // Hero Section
    "hero.badge": "AI-Powered Fact Checking",
    "hero.title1": "Pakistani",
    "hero.title2": "Myth",
    "hero.title3": "Guider",
    "hero.subtitle": "Pakistan's first multilingual fact-checking platform. Verify myths, explore cultural beliefs, and discover the truth backed by credible sources.",
    "hero.searchPlaceholder": "Enter a myth to verify... (e.g., 'Does eating rice at night cause weight gain?')",
    "hero.searchHint": "Search in English, اردو, or Punjabi",
    "hero.verifyNow": "Verify Now",
    "hero.stat.myths": "Myths Verified",
    "hero.stat.users": "Users Helped",
    "hero.stat.languages": "Languages",

    // Categories Section
    "categories.badge": "Browse by Category",
    "categories.title": "Explore Myth Categories",
    "categories.subtitle": "Our myths are organized into categories for easy navigation. Choose a topic that interests you and start your journey to truth.",
    "categories.health.title": "Health Myths",
    "categories.health.desc": "Medical misconceptions and traditional remedies fact-checked by experts",
    "categories.cultural.title": "Cultural Myths",
    "categories.cultural.desc": "Beliefs and traditions examined through the lens of modern knowledge",
    "categories.historical.title": "Historical Myths",
    "categories.historical.desc": "Historical claims and legends verified with documented evidence",
    "categories.social.title": "Social Myths",
    "categories.social.desc": "Social beliefs and superstitions analyzed with scientific approach",
    "categories.myths": "myths",
    "categories.allCategories": "All Categories",
    "categories.browseTitle": "Browse Categories",
    "categories.browseSubtitle": "Explore myths organized by topic. Choose a category to discover fact-checked information.",
    "categories.noMyths": "No myths found in this category yet.",
    "categories.mythsInCategory": "myths in this category",

    // Trending Section
    "trending.badge": "What's Trending",
    "trending.title": "Popular Myths",
    "trending.subtitle": "Most searched and discussed myths this week",
    "trending.viewAll": "View All Trending",
    "trending.pageTitle": "Trending Myths",
    "trending.pageSubtitle": "Most discussed and viewed myths this week",
    "trending.filters": "Filters:",
    "trending.category": "Category:",
    "trending.status": "Status:",
    "trending.all": "All",
    "trending.noResults": "No myths found matching your filters.",
    "trending.clearFilters": "Clear Filters",

    // Status Labels
    "status.verified": "Verified True",
    "status.debunked": "Debunked",
    "status.partial": "Partially True",

    // Chatbot CTA
    "chatbot.badge": "AI-Powered",
    "chatbot.title": "Meet Our Intelligent Chatbots",
    "chatbot.subtitle": "Get instant myth verification with our AI fact-checker or explore the historical context of myths with our storytelling assistant.",
    "chatbot.factCheck": "Fact-Check Chatbot",
    "chatbot.storytelling": "Storytelling Bot",
    "chatbot.greeting": "Hello! I'm your AI fact-checker. Ask me about any myth or belief you'd like to verify.",
    "chatbot.question": "Is it true that drinking warm water helps with weight loss?",
    "chatbot.response": "While warm water may slightly boost metabolism temporarily, the effect is minimal...",
    "chatbot.placeholder": "Type your question...",

    // Footer
    "footer.description": "Combating misinformation and myths in Pakistani society through AI-powered fact-checking and verified information.",
    "footer.categories": "Categories",
    "footer.quickLinks": "Quick Links",
    "footer.aboutUs": "About Us",
    "footer.trendingMyths": "Trending Myths",
    "footer.submitMyth": "Submit a Myth",
    "footer.faq": "FAQ",
    "footer.contactUs": "Contact Us",
    "footer.address": "Government College Women University, Sialkot, Pakistan",
    "footer.copyright": "© 2025 Pakistani Myth Guider. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",

    // About Page
    "about.badge": "About Pakistani Myth Guider",
    "about.title1": "Separating",
    "about.title2": "Fact",
    "about.title3": "from",
    "about.title4": "Fiction",
    "about.intro": "Pakistani Myth Guider is a digital platform dedicated to fact-checking common myths, misconceptions, and folklore in Pakistani society. We combine AI technology with expert research to provide accurate, accessible information to everyone.",
    "about.missionTitle": "Our Mission",
    "about.mission1": "In a world where misinformation spreads rapidly, we believe every Pakistani deserves access to verified, trustworthy information about the beliefs and myths that shape our culture.",
    "about.mission2": "From health-related myths to cultural superstitions, we investigate, verify, and present the truth in a way that respects our heritage while promoting critical thinking.",
    "about.mission3": "Our AI-powered chatbots make fact-checking accessible to everyone, regardless of language preference, with support for English, Urdu, and Punjabi.",
    "about.statsMyths": "Myths Verified",
    "about.statsUsers": "Monthly Users",
    "about.statsStories": "Published Stories",
    "about.valuesTitle": "Our Values",
    "about.valuesSubtitle": "Every piece of content we publish is guided by these core principles.",
    "about.accuracy": "Accuracy",
    "about.accuracyDesc": "We verify every myth with credible sources and expert consultation.",
    "about.integrity": "Integrity",
    "about.integrityDesc": "We present facts objectively, respecting cultural sensitivities.",
    "about.community": "Community",
    "about.communityDesc": "We believe in collective wisdom and community participation.",
    "about.preservation": "Preservation",
    "about.preservationDesc": "We honor our heritage while promoting scientific thinking.",
    "about.teamTitle": "Meet Our Team",
    "about.teamSubtitle": "A dedicated team of researchers, technologists, and cultural experts working to preserve truth.",
    "about.contactTitle": "Get in Touch",
    "about.contactSubtitle": "Have questions, suggestions, or want to contribute? We'd love to hear from you.",
    "about.emailUs": "Email Us",
    "about.joinCommunity": "Join Community",

    // Common
    "common.views": "views",
    "common.comments": "comments",
    "common.likes": "likes",
    "common.shares": "shares",
    "common.readMore": "Read More",
  },

  ur: {
    // Navbar
    "nav.home": "ہوم",
    "nav.categories": "زمرے",
    "nav.trending": "مقبول",
    "nav.chatbot": "اے آئی چیٹ بوٹ",
    "nav.about": "ہمارے بارے میں",
    "nav.admin": "ایڈمن",
    "nav.adminDashboard": "ایڈمن ڈیش بورڈ",
    "brand.name": "پاکستانی مِتھ گائیڈر",
    "brand.tagline": "تصدیق کریں • دریافت کریں • سیکھیں",

    // Hero Section
    "hero.badge": "اے آئی سے چلنے والی تصدیق",
    "hero.title1": "پاکستانی",
    "hero.title2": "مِتھ",
    "hero.title3": "گائیڈر",
    "hero.subtitle": "پاکستان کا پہلا کثیر لسانی فیکٹ چیکنگ پلیٹ فارم۔ غلط فہمیوں کی تصدیق کریں، ثقافتی عقائد کو جانچیں، اور معتبر ذرائع سے ثابت شدہ حقائق دریافت کریں۔",
    "hero.searchPlaceholder": "تصدیق کے لیے کوئی مِتھ درج کریں... (مثال: 'کیا رات کو چاول کھانے سے وزن بڑھتا ہے؟')",
    "hero.searchHint": "انگریزی، اردو، یا پنجابی میں تلاش کریں",
    "hero.verifyNow": "ابھی تصدیق کریں",
    "hero.stat.myths": "تصدیق شدہ مِتھس",
    "hero.stat.users": "مدد یافتہ صارفین",
    "hero.stat.languages": "زبانیں",

    // Categories Section
    "categories.badge": "زمرے کے مطابق براؤز کریں",
    "categories.title": "مِتھ کے زمرے دریافت کریں",
    "categories.subtitle": "ہمارے مِتھس آسان نیویگیشن کے لیے زمروں میں منظم ہیں۔ کوئی موضوع منتخب کریں جو آپ کو دلچسپ لگے اور سچائی کا سفر شروع کریں۔",
    "categories.health.title": "صحت کے مِتھس",
    "categories.health.desc": "طبی غلط فہمیاں اور روایتی علاج جو ماہرین نے جانچے ہیں",
    "categories.cultural.title": "ثقافتی مِتھس",
    "categories.cultural.desc": "عقائد اور روایات جدید علم کی روشنی میں جانچے گئے",
    "categories.historical.title": "تاریخی مِتھس",
    "categories.historical.desc": "تاریخی دعوے اور کہانیاں دستاویزی شواہد سے تصدیق شدہ",
    "categories.social.title": "سماجی مِتھس",
    "categories.social.desc": "سماجی عقائد اور توہمات کا سائنسی تجزیہ",
    "categories.myths": "مِتھس",
    "categories.allCategories": "تمام زمرے",
    "categories.browseTitle": "زمرے براؤز کریں",
    "categories.browseSubtitle": "موضوع کے مطابق مِتھس دریافت کریں۔ تصدیق شدہ معلومات کے لیے زمرہ منتخب کریں۔",
    "categories.noMyths": "اس زمرے میں ابھی کوئی مِتھ نہیں ملا۔",
    "categories.mythsInCategory": "اس زمرے میں مِتھس",

    // Trending Section
    "trending.badge": "مقبول ترین",
    "trending.title": "مشہور مِتھس",
    "trending.subtitle": "اس ہفتے سب سے زیادہ تلاش اور زیر بحث مِتھس",
    "trending.viewAll": "سب دیکھیں",
    "trending.pageTitle": "مقبول مِتھس",
    "trending.pageSubtitle": "اس ہفتے سب سے زیادہ دیکھے اور زیر بحث مِتھس",
    "trending.filters": "فلٹرز:",
    "trending.category": "زمرہ:",
    "trending.status": "حالت:",
    "trending.all": "سب",
    "trending.noResults": "آپ کے فلٹرز سے ملتا کوئی مِتھ نہیں ملا۔",
    "trending.clearFilters": "فلٹرز صاف کریں",

    // Status Labels
    "status.verified": "سچ تصدیق شدہ",
    "status.debunked": "غلط ثابت",
    "status.partial": "جزوی طور پر سچ",

    // Chatbot CTA
    "chatbot.badge": "اے آئی سے چلنے والا",
    "chatbot.title": "ہمارے ذہین چیٹ بوٹس سے ملیں",
    "chatbot.subtitle": "ہمارے اے آئی فیکٹ چیکر سے فوری مِتھ کی تصدیق حاصل کریں یا اسٹوری ٹیلنگ اسسٹنٹ سے مِتھس کا تاریخی پس منظر دریافت کریں۔",
    "chatbot.factCheck": "فیکٹ چیک چیٹ بوٹ",
    "chatbot.storytelling": "کہانی سنانے والا بوٹ",
    "chatbot.greeting": "السلام علیکم! میں آپ کا اے آئی فیکٹ چیکر ہوں۔ مجھ سے کسی بھی مِتھ یا عقیدے کے بارے میں پوچھیں۔",
    "chatbot.question": "کیا یہ سچ ہے کہ گرم پانی پینے سے وزن کم ہوتا ہے؟",
    "chatbot.response": "گرم پانی عارضی طور پر میٹابولزم کو قدرے بڑھا سکتا ہے، لیکن اثر معمولی ہے...",
    "chatbot.placeholder": "اپنا سوال لکھیں...",

    // Footer
    "footer.description": "اے آئی فیکٹ چیکنگ اور تصدیق شدہ معلومات کے ذریعے پاکستانی معاشرے میں غلط معلومات اور مِتھس کا مقابلہ۔",
    "footer.categories": "زمرے",
    "footer.quickLinks": "فوری لنکس",
    "footer.aboutUs": "ہمارے بارے میں",
    "footer.trendingMyths": "مقبول مِتھس",
    "footer.submitMyth": "مِتھ جمع کروائیں",
    "footer.faq": "عمومی سوالات",
    "footer.contactUs": "ہم سے رابطہ",
    "footer.address": "گورنمنٹ کالج ویمن یونیورسٹی، سیالکوٹ، پاکستان",
    "footer.copyright": "© 2025 پاکستانی مِتھ گائیڈر۔ جملہ حقوق محفوظ ہیں۔",
    "footer.privacy": "رازداری کی پالیسی",
    "footer.terms": "استعمال کی شرائط",

    // About Page
    "about.badge": "پاکستانی مِتھ گائیڈر کے بارے میں",
    "about.title1": "حقیقت",
    "about.title2": "کو",
    "about.title3": "افسانے",
    "about.title4": "سے الگ کرنا",
    "about.intro": "پاکستانی مِتھ گائیڈر ایک ڈیجیٹل پلیٹ فارم ہے جو پاکستانی معاشرے میں عام مِتھس، غلط فہمیوں اور لوک داستانوں کی تصدیق کے لیے وقف ہے۔ ہم اے آئی ٹیکنالوجی اور ماہرانہ تحقیق کو ملا کر سب کے لیے درست، قابل رسائی معلومات فراہم کرتے ہیں۔",
    "about.missionTitle": "ہمارا مشن",
    "about.mission1": "ایسی دنیا میں جہاں غلط معلومات تیزی سے پھیلتی ہیں، ہمارا یقین ہے کہ ہر پاکستانی کو اپنی ثقافت کی تشکیل کرنے والے عقائد اور مِتھس کے بارے میں تصدیق شدہ، قابل اعتماد معلومات تک رسائی کا حق ہے۔",
    "about.mission2": "صحت سے متعلق مِتھس سے لے کر ثقافتی توہمات تک، ہم تحقیق کرتے ہیں، تصدیق کرتے ہیں، اور سچائی اس انداز میں پیش کرتے ہیں جو ہماری وراثت کا احترام کرتے ہوئے تنقیدی سوچ کو فروغ دیتا ہے۔",
    "about.mission3": "ہمارے اے آئی چیٹ بوٹس انگریزی، اردو اور پنجابی میں مدد کے ساتھ ہر ایک کے لیے فیکٹ چیکنگ کو قابل رسائی بناتے ہیں۔",
    "about.statsMyths": "تصدیق شدہ مِتھس",
    "about.statsUsers": "ماہانہ صارفین",
    "about.statsStories": "شائع شدہ کہانیاں",
    "about.valuesTitle": "ہماری اقدار",
    "about.valuesSubtitle": "ہر مواد جو ہم شائع کرتے ہیں ان بنیادی اصولوں کی رہنمائی میں ہوتا ہے۔",
    "about.accuracy": "درستگی",
    "about.accuracyDesc": "ہم ہر مِتھ کی معتبر ذرائع اور ماہرین سے مشاورت کے ساتھ تصدیق کرتے ہیں۔",
    "about.integrity": "دیانتداری",
    "about.integrityDesc": "ہم ثقافتی حساسیات کا احترام کرتے ہوئے حقائق معروضی طور پر پیش کرتے ہیں۔",
    "about.community": "کمیونٹی",
    "about.communityDesc": "ہم اجتماعی حکمت اور کمیونٹی کی شراکت پر یقین رکھتے ہیں۔",
    "about.preservation": "تحفظ",
    "about.preservationDesc": "ہم سائنسی سوچ کو فروغ دیتے ہوئے اپنی وراثت کا احترام کرتے ہیں۔",
    "about.teamTitle": "ہماری ٹیم سے ملیں",
    "about.teamSubtitle": "محققین، ٹیکنالوجسٹس اور ثقافتی ماہرین کی ایک وقف ٹیم جو سچائی کے تحفظ کے لیے کام کر رہی ہے۔",
    "about.contactTitle": "رابطے میں رہیں",
    "about.contactSubtitle": "سوالات، تجاویز، یا تعاون کرنا چاہتے ہیں؟ ہم آپ سے سننا پسند کریں گے۔",
    "about.emailUs": "ای میل کریں",
    "about.joinCommunity": "کمیونٹی میں شامل ہوں",

    // Common
    "common.views": "آراء",
    "common.comments": "تبصرے",
    "common.likes": "پسند",
    "common.shares": "شیئرز",
    "common.readMore": "مزید پڑھیں",
  },

  pn: {
    // Navbar
    "nav.home": "ہوم",
    "nav.categories": "زمرے",
    "nav.trending": "مشہور",
    "nav.chatbot": "اے آئی چیٹ بوٹ",
    "nav.about": "ساڈے بارے",
    "nav.admin": "ایڈمن",
    "nav.adminDashboard": "ایڈمن ڈیش بورڈ",
    "brand.name": "پاکستانی مِتھ گائیڈر",
    "brand.tagline": "تصدیق کرو • دریافت کرو • سکھو",

    // Hero Section
    "hero.badge": "اے آئی نال چلن والی تصدیق",
    "hero.title1": "پاکستانی",
    "hero.title2": "مِتھ",
    "hero.title3": "گائیڈر",
    "hero.subtitle": "پاکستان دا پہلا کثیر لسانی فیکٹ چیکنگ پلیٹ فارم۔ غلط فہمیاں دی تصدیق کرو، ثقافتی عقیدیاں نوں پرکھو، تے معتبر ذرائع توں ثابت شدہ سچ دریافت کرو۔",
    "hero.searchPlaceholder": "تصدیق لئی کوئی مِتھ پاؤ... (مثال: 'کی رات نوں چاول کھان نال وزن ودھدا اے؟')",
    "hero.searchHint": "انگریزی، اردو، یا پنجابی وچ لبھو",
    "hero.verifyNow": "ہنے تصدیق کرو",
    "hero.stat.myths": "تصدیق شدہ مِتھس",
    "hero.stat.users": "مدد یافتہ لوک",
    "hero.stat.languages": "بولیاں",

    // Categories Section
    "categories.badge": "زمرے دے مطابق ویکھو",
    "categories.title": "مِتھ دے زمرے دریافت کرو",
    "categories.subtitle": "ساڈے مِتھس سوکھی نیویگیشن لئی زمریاں وچ ترتیب دتے گئے نیں۔ کوئی موضوع چنو جہڑا تہانوں دلچسپ لگے تے سچائی دا سفر شروع کرو۔",
    "categories.health.title": "صحت دے مِتھس",
    "categories.health.desc": "طبی غلط فہمیاں تے روایتی علاج جہڑے ماہرین نے پرکھے نیں",
    "categories.cultural.title": "ثقافتی مِتھس",
    "categories.cultural.desc": "عقیدے تے روایتاں جدید علم دی روشنی وچ پرکھے گئے",
    "categories.historical.title": "تاریخی مِتھس",
    "categories.historical.desc": "تاریخی دعوے تے کہانیاں دستاویزی شواہد نال تصدیق شدہ",
    "categories.social.title": "سماجی مِتھس",
    "categories.social.desc": "سماجی عقیدے تے وہماں دا سائنسی تجزیہ",
    "categories.myths": "مِتھس",
    "categories.allCategories": "سارے زمرے",
    "categories.browseTitle": "زمرے ویکھو",
    "categories.browseSubtitle": "موضوع دے مطابق مِتھس لبھو۔ تصدیق شدہ معلومات لئی زمرہ چنو۔",
    "categories.noMyths": "ایس زمرے وچ اجے کوئی مِتھ نئیں ملیا۔",
    "categories.mythsInCategory": "ایس زمرے وچ مِتھس",

    // Trending Section
    "trending.badge": "مشہور ترین",
    "trending.title": "مقبول مِتھس",
    "trending.subtitle": "ایس ہفتے سب توں بوہتے لبھے تے گل کیتے گئے مِتھس",
    "trending.viewAll": "سب ویکھو",
    "trending.pageTitle": "مشہور مِتھس",
    "trending.pageSubtitle": "ایس ہفتے سب توں بوہتے ویکھے تے گل کیتے گئے مِتھس",
    "trending.filters": "فلٹر:",
    "trending.category": "زمرہ:",
    "trending.status": "حالت:",
    "trending.all": "سب",
    "trending.noResults": "تہاڈے فلٹراں نال ملدا کوئی مِتھ نئیں ملیا۔",
    "trending.clearFilters": "فلٹر صاف کرو",

    // Status Labels
    "status.verified": "سچ تصدیق شدہ",
    "status.debunked": "غلط ثابت",
    "status.partial": "کجھ حد تک سچ",

    // Chatbot CTA
    "chatbot.badge": "اے آئی نال چلدا اے",
    "chatbot.title": "ساڈے سمجھدار چیٹ بوٹس نال ملو",
    "chatbot.subtitle": "ساڈے اے آئی فیکٹ چیکر نال فوری مِتھ دی تصدیق لو یا اسٹوری ٹیلنگ اسسٹنٹ نال مِتھس دا تاریخی پس منظر جانو۔",
    "chatbot.factCheck": "فیکٹ چیک چیٹ بوٹ",
    "chatbot.storytelling": "کہانی سنان والا بوٹ",
    "chatbot.greeting": "السلام علیکم! میں تہاڈا اے آئی فیکٹ چیکر آں۔ مینوں کسے وی مِتھ یا عقیدے بارے پچھو۔",
    "chatbot.question": "کی ایہ سچ اے کہ گرم پانی پین نال وزن گھٹدا اے؟",
    "chatbot.response": "گرم پانی عارضی طور تے میٹابولزم نوں تھوڑا ودھا سکدا اے، پر اثر معمولی اے...",
    "chatbot.placeholder": "اپنا سوال لکھو...",

    // Footer
    "footer.description": "اے آئی فیکٹ چیکنگ تے تصدیق شدہ معلومات راہیں پاکستانی سماج وچ غلط معلومات تے مِتھس دا مقابلہ۔",
    "footer.categories": "زمرے",
    "footer.quickLinks": "چھیتی لنکس",
    "footer.aboutUs": "ساڈے بارے",
    "footer.trendingMyths": "مشہور مِتھس",
    "footer.submitMyth": "مِتھ جمع کراؤ",
    "footer.faq": "عام سوال",
    "footer.contactUs": "سانال رابطہ",
    "footer.address": "گورنمنٹ کالج ویمن یونیورسٹی، سیالکوٹ، پاکستان",
    "footer.copyright": "© 2025 پاکستانی مِتھ گائیڈر۔ سارے حق محفوظ نیں۔",
    "footer.privacy": "رازداری پالیسی",
    "footer.terms": "ورتن دیاں شرطاں",

    // About Page
    "about.badge": "پاکستانی مِتھ گائیڈر بارے",
    "about.title1": "سچ",
    "about.title2": "نوں",
    "about.title3": "جھوٹ",
    "about.title4": "توں وکھ کرنا",
    "about.intro": "پاکستانی مِتھ گائیڈر اک ڈیجیٹل پلیٹ فارم اے جہڑا پاکستانی سماج وچ عام مِتھس، غلط فہمیاں تے لوک داستاناں دی تصدیق لئی وقف اے۔ اسیں اے آئی ٹیکنالوجی تے ماہرانہ تحقیق نوں ملا کے سب لئی صحیح، قابل رسائی معلومات دیندے آں۔",
    "about.missionTitle": "ساڈا مشن",
    "about.mission1": "ایسی دنیا وچ جتھے غلط معلومات تیزی نال پھیلدیاں نیں، ساڈا یقین اے کہ ہر پاکستانی نوں اپنی ثقافت بنان والے عقیدیاں تے مِتھس بارے تصدیق شدہ، قابل اعتماد معلومات تک رسائی دا حق اے۔",
    "about.mission2": "صحت نال متعلق مِتھس توں لے کے ثقافتی وہماں تک، اسیں تحقیق کردے آں، تصدیق کردے آں، تے سچائی ایس انداز وچ پیش کردے آں جہڑا ساڈی وراثت دا احترام کردے ہوئے تنقیدی سوچ نوں ودھاوے۔",
    "about.mission3": "ساڈے اے آئی چیٹ بوٹس انگریزی، اردو تے پنجابی وچ مدد نال ہر اک لئی فیکٹ چیکنگ نوں آسان بناندے نیں۔",
    "about.statsMyths": "تصدیق شدہ مِتھس",
    "about.statsUsers": "مہینے دے صارفین",
    "about.statsStories": "چھپیاں کہانیاں",
    "about.valuesTitle": "ساڈیاں قدراں",
    "about.valuesSubtitle": "جو وی مواد اسیں شائع کردے آں اوہ انہاں بنیادی اصولاں دی رہنمائی وچ ہوندا اے۔",
    "about.accuracy": "درستگی",
    "about.accuracyDesc": "اسیں ہر مِتھ دی معتبر ذرائع تے ماہرین نال مشاورت کرکے تصدیق کردے آں۔",
    "about.integrity": "دیانتداری",
    "about.integrityDesc": "اسیں ثقافتی حساسیتاں دا احترام کردے ہوئے حقائق معروضی طور تے پیش کردے آں۔",
    "about.community": "کمیونٹی",
    "about.communityDesc": "اسیں اکٹھی سمجھ تے کمیونٹی دی شراکت تے یقین رکھدے آں۔",
    "about.preservation": "تحفظ",
    "about.preservationDesc": "اسیں سائنسی سوچ نوں ودھاندے ہوئے اپنی وراثت دا احترام کردے آں۔",
    "about.teamTitle": "ساڈی ٹیم نال ملو",
    "about.teamSubtitle": "محققین، ٹیکنالوجسٹس تے ثقافتی ماہرین دی اک وقف ٹیم جہڑی سچائی دے تحفظ لئی کم کر رہی اے۔",
    "about.contactTitle": "رابطے وچ رہو",
    "about.contactSubtitle": "سوال، تجویزاں، یا تعاون کرنا چاہندے او؟ اسیں تہاڈے توں سننا پسند کراں گے۔",
    "about.emailUs": "ای میل کرو",
    "about.joinCommunity": "کمیونٹی وچ شامل ہوو",

    // Common
    "common.views": "ویکھے",
    "common.comments": "تبصرے",
    "common.likes": "پسند",
    "common.shares": "شیئر",
    "common.readMore": "ہور پڑھو",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Set document direction for RTL languages
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.documentElement.lang = lang === "en" ? "en" : lang === "ur" ? "ur" : "pa";
  };

  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = language === "en" ? "ltr" : "rtl";
    document.documentElement.lang = language === "en" ? "en" : language === "ur" ? "ur" : "pa";
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
