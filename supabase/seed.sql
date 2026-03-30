-- ============================================================
-- Pakistani Myth Guider — Seed Data
-- Run AFTER schema.sql, rls.sql, and functions.sql
-- NOTE: Create admin user via Supabase Auth dashboard first,
--       then update the admin profile role below.
-- ============================================================

-- ============================================================
-- MYTHS (from TrendingSection, CategoriesPage, MythDetail)
-- ============================================================

insert into public.myths (id, title, summary, content, status, category, sources, views, likes, dislikes, published_at) values

-- Myth 1: Rice at night
(
  'a1b2c3d4-0001-4000-8000-000000000001',
  'Eating rice at night causes weight gain',
  'A common belief that consuming rice after sunset leads to obesity. Scientific evidence suggests otherwise...',
  '<h2>The Myth</h2><p>Many Pakistani households believe that eating rice at night leads to weight gain and should be avoided after sunset. This belief is deeply rooted in traditional dietary practices.</p><h2>The Facts</h2><p>According to nutritional science, weight gain is determined by total caloric intake versus expenditure throughout the day, not by the timing of specific food consumption. Rice itself is not inherently fattening when consumed in moderate portions.</p><h2>Scientific Evidence</h2><p>A study published in the British Journal of Nutrition found no significant difference in weight gain between participants who consumed carbohydrates at night versus during the day, when total caloric intake was controlled.</p><h2>Expert Opinion</h2><p>Dr. Sarah Ahmed, a nutritionist at Aga Khan University, states: "The time of day you eat rice does not matter as much as the total amount of calories you consume. What matters is portion control and overall dietary balance."</p><h2>Conclusion</h2><p>This myth is <strong>debunked</strong>. While eating excessive amounts of any food at night may contribute to weight gain due to overall caloric surplus, rice specifically does not cause weight gain simply because it is consumed after sunset.</p>',
  'debunked',
  'Health',
  '[{"name": "British Journal of Nutrition", "url": "https://www.cambridge.org/core/journals/british-journal-of-nutrition"}, {"name": "Aga Khan University Research", "url": "https://www.aku.edu/research"}, {"name": "WHO Nutrition Guidelines", "url": "https://www.who.int/nutrition"}]'::jsonb,
  12500, 234, 45,
  '2025-01-10'
),

-- Myth 2: Black cat
(
  'a1b2c3d4-0002-4000-8000-000000000002',
  'کالی بلی منحوس ہوتی ہے',
  'ایک عام توہم پرستی کہ کالی بلی کا راستہ کاٹنا بدقسمتی لاتا ہے۔ سائنسی طور پر اس کا کوئی ثبوت نہیں...',
  '<h2>افسانہ</h2><p>پاکستانی معاشرے میں یہ عام خیال ہے کہ اگر کالی بلی آپ کا راستہ کاٹ دے تو یہ بدقسمتی کی علامت ہے۔</p><h2>حقائق</h2><p>سائنسی طور پر بلی کی رنگت اور انسانی قسمت میں کوئی تعلق نہیں ہے۔ یہ ایک توہم پرستی ہے جو صدیوں سے چلی آ رہی ہے۔</p>',
  'debunked',
  'Cultural',
  '[]'::jsonb,
  8900, 189, 23,
  '2025-01-08'
),

-- Myth 3: Milk with fish
(
  'a1b2c3d4-0003-4000-8000-000000000003',
  'مچھلی تے دودھ نال چمڑی دی بیماری ہوندی اے',
  'ایہہ پرانا خیال اے کہ مچھلی تے دودھ اکٹھے کھان نال برص ہو جاندا اے۔ سائنس ایہہ گل غلط کہندی اے...',
  '<h2>افسانہ</h2><p>پنجاب وچ ایہہ عام خیال اے کہ مچھلی تے دودھ اکٹھے کھان نال چمڑی دی بیماری ہو جاندی اے۔</p><h2>حقائق</h2><p>ڈاکٹراں دا کہنا اے کہ ایہہ گل بالکل غلط اے۔ مچھلی تے دودھ دونویں صحت بخش غذائیں نیں۔</p>',
  'debunked',
  'Health',
  '[]'::jsonb,
  7600, 156, 18,
  '2025-01-06'
),

-- Myth 4: Green tea
(
  'a1b2c3d4-0004-4000-8000-000000000004',
  'Green tea boosts metabolism significantly',
  'Claims that green tea can dramatically increase metabolic rate and promote rapid weight loss...',
  '<h2>The Myth</h2><p>Green tea is often marketed as a miracle weight loss drink that can dramatically boost metabolism.</p><h2>The Facts</h2><p>While green tea does contain catechins and caffeine that may slightly increase metabolic rate, the effect is modest — typically only 3-4% increase in metabolism. This alone is not sufficient for significant weight loss without other dietary and lifestyle changes.</p>',
  'partial',
  'Health',
  '[]'::jsonb,
  6200, 98, 12,
  '2025-01-04'
),

-- Myth 5: Cracking knuckles
(
  'a1b2c3d4-0005-4000-8000-000000000005',
  'انگلیاں چٹخانے سے جوڑوں کا درد ہوتا ہے',
  'یہ عام خیال ہے کہ انگلیاں چٹخانے سے آرتھرائٹس ہوتی ہے۔ تحقیق اس بات کی تردید کرتی ہے...',
  '<h2>افسانہ</h2><p>بہت سے لوگ مانتے ہیں کہ انگلیاں چٹخانے سے جوڑوں کا درد ہوتا ہے۔</p><h2>حقائق</h2><p>متعدد سائنسی مطالعات نے ثابت کیا ہے کہ انگلیاں چٹخانے سے آرتھرائٹس نہیں ہوتی۔</p>',
  'debunked',
  'Health',
  '[]'::jsonb,
  5400, 87, 9,
  '2025-01-02'
),

-- Myth 6: Full moon behavior
(
  'a1b2c3d4-0006-4000-8000-000000000006',
  'پورے چند دا انسانی رویے تے اثر',
  'ایہہ خیال کہ پورے چند دی رات جرائم تے ہسپتالاں وچ مریض ودھ جاندے نیں۔ سائنس ایہہ گل رد کردی اے...',
  '<h2>افسانہ</h2><p>ایہہ عام خیال اے کہ پورے چند دی رات لوکاں دا رویہ بدل جاندا اے۔</p><h2>حقائق</h2><p>سائنسی تحقیق نے ثابت کیتا اے کہ چند دا انسانی رویے تے کوئی اثر نہیں ہوندا۔</p>',
  'partial',
  'Social',
  '[]'::jsonb,
  4800, 76, 15,
  '2024-12-30'
),

-- Myth 7: Breaking mirror
(
  'a1b2c3d4-0007-4000-8000-000000000007',
  'Breaking a mirror brings 7 years bad luck',
  'A widespread superstition across many cultures. No scientific evidence supports this claim.',
  '<h2>The Myth</h2><p>Breaking a mirror is believed to bring 7 years of bad luck.</p><h2>The Facts</h2><p>This is purely a superstition with no basis in reality. The origin likely dates back to ancient Roman times when mirrors were expensive and the superstition discouraged careless handling.</p>',
  'debunked',
  'Cultural',
  '[]'::jsonb,
  5600, 67, 8,
  '2024-12-25'
),

-- Myth 8: Great Wall from space
(
  'a1b2c3d4-0008-4000-8000-000000000008',
  'The Great Wall is visible from space',
  'A popular claim that the Great Wall of China can be seen from space with the naked eye.',
  '<h2>The Myth</h2><p>It is widely believed that the Great Wall of China is the only man-made structure visible from space.</p><h2>The Facts</h2><p>Astronauts have confirmed that the Great Wall is NOT visible from space with the naked eye. It is too narrow despite its length. Cities with their lights are much more visible.</p>',
  'debunked',
  'Historical',
  '[]'::jsonb,
  7800, 134, 11,
  '2024-12-20'
),

-- Myth 9: 10% brain usage
(
  'a1b2c3d4-0009-4000-8000-000000000009',
  'We only use 10% of our brain',
  'A persistent myth that humans only utilize a small fraction of their brain capacity.',
  '<h2>The Myth</h2><p>It is commonly claimed that we only use 10% of our brain.</p><h2>The Facts</h2><p>Brain imaging studies have shown that virtually all areas of the brain are active at various points. While not all neurons fire simultaneously, we certainly use far more than 10% of our brain throughout the day.</p>',
  'debunked',
  'Social',
  '[]'::jsonb,
  6700, 112, 14,
  '2024-12-15'
);

-- ============================================================
-- STORIES (from StorytellingPage, StoryDetail)
-- ============================================================

insert into public.stories (id, title, author_name, content, full_content, category, status, likes, published_at) values

(
  'b1c2d3e4-0001-4000-8000-000000000001',
  'The Legend of Peer Channan',
  'Ahmed Khan',
  'In the heart of Punjab lies the ancient tale of Peer Channan, a saint whose wisdom and miracles are still remembered today. The story goes that during a great drought, he prayed for forty days and nights until the heavens opened...',
  '<h2>The Legend of Peer Channan</h2><p>In the heart of Punjab lies the ancient tale of Peer Channan, a saint whose wisdom and miracles are still remembered today.</p><p>The story goes that during a great drought in the 16th century, when the rivers had dried and the crops had withered, Peer Channan retreated to the hilltop shrine that now bears his name.</p><p>For forty days and forty nights, he prayed without food or water. The villagers watched in awe as clouds began to gather on the fortieth day. By sunset, rain poured down in sheets, filling the wells and rivers that had been dry for months.</p><p>To this day, the shrine of Peer Channan is visited by thousands who believe in the power of sincere devotion and selfless prayer.</p>',
  'Folklore',
  'published',
  245,
  '2025-01-05'
),

(
  'b1c2d3e4-0002-4000-8000-000000000002',
  'لاہور کی چڑیل کی داستان',
  'فاطمہ زہرا',
  'لاہور کے ہر پرانے محلے میں چڑیل کی اپنی کہانی ہے۔ اندرون شہر میں بزرگ لوگ بتاتے ہیں کہ پرانے برگد کے درخت کے پاس آدھی رات کو ایک عورت نظر آتی ہے جس کے پاؤں الٹے ہوتے ہیں...',
  '<h2>لاہور کی چڑیل کی داستان</h2><p>لاہور کے ہر پرانے محلے میں چڑیل کی اپنی کہانی ہے۔ اندرون شہر میں بزرگ لوگ بتاتے ہیں کہ پرانے برگد کے درخت کے پاس آدھی رات کو ایک عورت نظر آتی ہے جس کے پاؤں الٹے ہوتے ہیں۔</p><p>کہتے ہیں یہ ایک نوجوان لڑکی کی روح ہے جسے اس کے خاندان نے بے رحمی سے قتل کر دیا تھا۔ اب وہ رات کی تاریکی میں انصاف کی تلاش میں بھٹکتی رہتی ہے۔</p>',
  'Supernatural',
  'published',
  189,
  '2025-01-03'
),

(
  'b1c2d3e4-0003-4000-8000-000000000003',
  'ہیر رانجھے دی داستان',
  'عثمان علی',
  'پنجاب دی سب توں مشہور محبت دی کہانی۔ ہیر سیال تے دھیدو رانجھا دی ایہہ داستان ہر پنجابی دے دل وچ وسدی اے۔ رانجھے نے ہیر دی محبت وچ جوگی بن کے بانسری وجائی...',
  '<h2>ہیر رانجھے دی داستان</h2><p>پنجاب دی سب توں مشہور محبت دی کہانی۔ ہیر سیال تے دھیدو رانجھا دی ایہہ داستان ہر پنجابی دے دل وچ وسدی اے۔</p><p>رانجھے نے ہیر دی محبت وچ جوگی بن کے بانسری وجائی تے ہیر دے پیو نے اوہنوں کھیڑیاں نال ویاہ دتا۔ پر سچی محبت نے آخر جت حاصل کیتی۔</p>',
  'Folklore',
  'published',
  312,
  '2025-01-01'
),

(
  'b1c2d3e4-0004-4000-8000-000000000004',
  'The Flying Horse of Quaid',
  'Usman Ali',
  'Among the lesser-known stories of Karachi is the tale of a white horse that would appear on full moon nights near the Quaid''s mausoleum. Witnesses claim it would gallop through the gardens before vanishing...',
  '<h2>The Flying Horse of Quaid</h2><p>Among the lesser-known stories of Karachi is the tale of a white horse that would appear on full moon nights near the Quaid''s mausoleum.</p><p>Witnesses claim it would gallop through the gardens before vanishing into thin air. Some believe it is the spirit of the Quaid''s favorite horse, eternally guarding the final resting place of the founder of Pakistan.</p>',
  'Urban Legends',
  'published',
  156,
  '2024-12-28'
),

(
  'b1c2d3e4-0005-4000-8000-000000000005',
  'سسی پنوں کی المناک محبت',
  'عائشہ خان',
  'بلوچستان کی وادیوں سے آنے والی یہ کہانی سسی اور پنوں کی لازوال محبت کی داستان ہے۔ سسی نے صحرا میں اپنے محبوب کو ڈھونڈتے ڈھونڈتے جان دے دی...',
  '<h2>سسی پنوں کی المناک محبت</h2><p>بلوچستان کی وادیوں سے آنے والی یہ کہانی سسی اور پنوں کی لازوال محبت کی داستان ہے۔</p><p>سسی دھوبی کی بیٹی تھی لیکن دراصل بامبھور کے بادشاہ کی شہزادی تھی۔ جب پنوں کے بھائی اسے رات کی تاریکی میں اٹھا کر لے گئے تو سسی نے صحرا میں اپنے محبوب کو ڈھونڈتے ڈھونڈتے جان دے دی۔</p>',
  'Folklore',
  'published',
  278,
  '2024-12-20'
);

-- ============================================================
-- SAMPLE COMMENTS (approved, for myths and stories)
-- ============================================================

insert into public.comments (user_name, content, myth_id, status, created_at) values
('Ali Hassan', 'Very informative article! I always believed this myth was true.', 'a1b2c3d4-0001-4000-8000-000000000001', 'approved', '2025-01-11'),
('Fatima Zahra', 'میری امی ہمیشہ رات کو چاول کھانے سے منع کرتی تھیں۔ اب میں انہیں یہ آرٹیکل دکھاؤں گی!', 'a1b2c3d4-0001-4000-8000-000000000001', 'approved', '2025-01-12'),
('Muhammad Usman', 'Great research work. Keep debunking these myths!', 'a1b2c3d4-0001-4000-8000-000000000001', 'approved', '2025-01-13'),
('Ayesha Khan', 'بہت اچھا مضمون ہے۔ لوگوں کو سائنسی حقائق بتانا بہت ضروری ہے۔', 'a1b2c3d4-0002-4000-8000-000000000002', 'approved', '2025-01-09'),
('Usman Ali', 'I never knew this was just a superstition!', 'a1b2c3d4-0007-4000-8000-000000000007', 'approved', '2024-12-26');

insert into public.comments (user_name, content, story_id, status, created_at) values
('Sara Malik', 'This is such a beautiful story!', 'b1c2d3e4-0001-4000-8000-000000000001', 'approved', '2025-01-06');

insert into public.comments (user_name, content, story_id, status, created_at) values
('Ahmed Raza', 'ہیر رانجھے دی کہانی سن کے دل بھر آیا!', 'b1c2d3e4-0003-4000-8000-000000000003', 'approved', '2025-01-02');

-- ============================================================
-- PENDING COMMENTS (for admin moderation testing)
-- ============================================================

insert into public.comments (user_name, content, myth_id, status, created_at) values
('New User', 'Is this really true? I need more sources.', 'a1b2c3d4-0004-4000-8000-000000000004', 'pending', '2025-01-15'),
('Test User', 'Great article, thanks for sharing!', 'a1b2c3d4-0005-4000-8000-000000000005', 'pending', '2025-01-16');
