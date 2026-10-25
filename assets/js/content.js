/* English with Sam: all page text, prices, photos and links. Edit both ua and en. */
(function () {

const LINKS = {
  booking: 'https://t.me/english_sam7',
  channel: 'https://t.me/english_sam77',
  instagram: 'https://www.instagram.com/english_with_sam7/',
  tiktok: 'https://www.tiktok.com/@sam_englishteacher',
  facebook: 'https://www.facebook.com/share/1JaHwCmzrp/',
}

// Small personal photos in the "About" collage (any size; they are cropped to 4:5).
// Put files in assets/img/photos/ and list them here. null = empty frame.
const PHOTOS = [
  'assets/img/sam.webp',
  null,
  null,
  null,
  null,
]

// Teacher card photos, same order as COPY.*.teachers.items. null = placeholder.
const TEACHER_PHOTOS = ['assets/img/sam.webp', null, null]

// [package total, price per lesson]
const PRICES = {
  4: { pair: ['2 280 ₴', '570 ₴'], solo: ['2 680 ₴', '670 ₴'], exam: ['3 400 ₴', '850 ₴'] },
  8: { pair: ['4 400 ₴', '550 ₴'], solo: ['5 200 ₴', '650 ₴'], exam: ['6 480 ₴', '810 ₴'] },
  16: { pair: ['8 320 ₴', '520 ₴'], solo: ['9 920 ₴', '620 ₴'], exam: ['12 800 ₴', '800 ₴'] },
  32: { pair: ['16 000 ₴', '500 ₴'], solo: ['19 200 ₴', '600 ₴'], exam: ['24 000 ₴', '750 ₴'] },
}
const PACKAGES = [4, 8, 16, 32]
const GOAL_IDS = ['work', 'travel', 'exams', 'life']

const COPY = {
  ua: {
    meta: {
      title: 'English with Sam — розмовна американська англійська онлайн',
      description: 'Розмовна американська англійська без барʼєрів — онлайн, для дорослих і підлітків. 70% кожного заняття говориш ти. Перше заняття — безкоштовно.',
    },
    nav: { about: 'Про Сема', teachers: 'Викладачі', prices: 'Ціни', reviews: 'Відгуки', faq: 'Питання', cta: 'Безкоштовне пробне' },
    heads: {
      hero: ['Говори англійською', 'вільно з Семом'],
      goal: ['Для чого тобі', 'англійська?'],
      about: ['Привіт, я Сем.', 'Давай говорити.'],
      achievements: ['Мої', 'досягнення'],
      teachers: ['Наші', 'викладачі'],
      reviews: ['Що кажуть', 'студенти'],
      price: ['Обери свій', 'темп'],
      faq: ['Чесні', 'питання'],
    },
    hero: {
      lead: 'Розмовна американська англійська без барʼєрів — онлайн, для дорослих і підлітків. 70% кожного заняття говориш ти.',
      cta: 'Записатися на безкоштовне пробне',
      second: 'Дізнатися більше',
    },
    cards: {
      talkTitle: '70% практики', talkText: 'часу на занятті говориш ти',
      trialTitle: 'Пробне — безкоштовно', trialText: 'знайомимось і визначаємо рівень',
    },
    marquee: ['для подорожей', 'для роботи', 'для нових знайомств', 'для бізнесу', 'для ІТ', 'для іспитів'],
    goal: {
      chipsLabel: 'Для чого тобі англійська?',
      lead: 'Обери одне. Кожен план починається з фраз, які ти справді вживатимеш, а граматику будуємо навколо них.',
      pre: 'Тобі точно сюди, якщо:',
      focusLabel: 'Фокус занять:',
      labels: { work: 'Робота', travel: 'Подорожі', exams: 'Іспити', life: 'Щоденне життя' },
      focus: {
        work: 'зустрічі, дзвінки, листи та small talk з колегами.',
        travel: 'аеропорти, готелі, ресторани й розмови з людьми в дорозі.',
        exams: 'завдання IELTS, TOEFL або НМТ на час, з фідбеком на кожну відповідь.',
        life: 'фільми, друзі, хобі й розуміння людей, які говорять швидко.',
      },
      fits: {
        work: ['на дзвінках розумієш колег, але відповідаєш односкладово', 'лист англійською пишеш довше, ніж робиш саму задачу', 'хочеш упевнено пройти співбесіду в міжнародну компанію'],
        travel: ['в аеропорту чи готелі показуєш пальцем замість говорити', 'хочеш спитати місцевих дорогу й зрозуміти відповідь', 'плануєш поїздку й не хочеш залежати від перекладача'],
        exams: ['попереду IELTS, TOEFL чи НМТ і потрібен конкретний бал', 'граматику знаєш, а на speaking губишся', 'хочеш тренуватися у форматі іспиту з фідбеком'],
        life: ['дивишся серіали із субтитрами й хочеш без них', 'розумієш англійську, але завмираєш, коли треба говорити', 'хочеш вільно спілкуватися з друзями з інших країн'],
      },
    },
    steps: {
      label: 'Як проходить навчання',
      items: [
        ['Пробне заняття', 'Безкоштовна невимушена розмова. Визначаю твій рівень, питаю, для чого тобі англійська, і ти відчуваєш, як ми працюємо.'],
        ['Твій план', 'План на кожен місяць під твою мету: теми, ситуації та граматика, які тобі справді потрібні.'],
        ['Заняття', 'Живі онлайн-заняття, де більшість часу говориш ти. Короткі нотатки й домашнє після кожного.'],
        ['Перевірка', 'Кожні кілька місяців порівнюємо, де ти зараз і з чого починав, і коригуємо план.'],
      ],
    },
    about: {
      whoH: 'Хто я',
      who: 'Викладач розмовної американської англійської. Допомагаю тим, хто розуміє англійську, але завмирає, коли треба говорити, нарешті заговорити без страху помилок.',
      howH: 'Як я навчаю',
      how: 'Говоримо про твою роботу, подорожі, твій тиждень. Я занотовую помилки, які мають значення, і ми виправляємо їх на наступному занятті, в тому ж контексті.',
      cta: 'Познайомимось на пробному',
      photosLabel: 'Фото Сема',
      photoAlt: 'Сем',
      photoEmpty: 'тут буде фото',
    },
    achievements: {
      lead: '[Коротко: чим ти пишаєшся як викладач — одне речення.]',
      items: [
        { num: '[N] років', text: 'викладаю англійську' },
        { num: '[N]+', text: 'студентів заговорили англійською' },
        { num: '[рівень]', text: '[твій рівень англійської або іспит, напр. IELTS 8.0]' },
        { num: '[факт]', text: '[ще одне досягнення: життя чи робота в США, проєкти, виступи]' },
      ],
    },
    teachers: {
      lead: 'Усі викладачі працюють за одним підходом: з першого заняття говориш ти, а граматику будуємо навколо твоїх ситуацій.',
      items: [
        { name: 'Сем', role: 'Розмовна американська англійська', text: 'Допомагає заговорити без страху помилок: робота, подорожі, щоденне життя.', tags: ['Індивідуальні', 'Парні', '[рівні]'] },
        { name: '[Імʼя викладача]', role: '[спеціалізація]', text: '[Два речення про досвід і підхід викладача.]', tags: ['[формати]', '[рівні]'] },
        { name: '[Імʼя викладача]', role: '[спеціалізація, напр. IELTS чи НМТ]', text: '[Два речення про досвід і підхід викладача.]', tags: ['[формати]', '[рівні]'] },
      ],
    },
    reviews: {
      lead: 'Слова тих, хто вже заговорив.',
      items: [
        { quote: '[Справжні слова студента про прогрес, два–чотири рядки.]', name: '[Імʼя]', role: '[для чого вчить англійську]' },
        { quote: '[Справжні слова студента про прогрес, два–чотири рядки.]', name: '[Імʼя]', role: '[для чого вчить англійську]' },
        { quote: '[Справжні слова студента про прогрес, два–чотири рядки.]', name: '[Імʼя]', role: '[для чого вчить англійську]' },
      ],
    },
    price: {
      fmtLabel: 'Формат занять',
      pkgLabel: 'Пакети занять',
      counts: { 4: '4 заняття', 8: '8 занять', 16: '16 занять', 32: '32 заняття' },
      notes: { 4: 'діє 30 днів', 8: 'діє 50 днів', 16: 'діє 80 днів', 32: 'діє 140 днів' },
      perLesson: 'за заняття',
      perPerson: 'з людини за заняття',
      save: 'вигода',
      choose: 'Обрати',
      names: { solo: 'Індивідуальні', pair: 'Парні заняття', exam: 'Іспити та бізнес' },
      lines: {
        solo: ['План під твою мету', 'Графік під твій темп життя', 'Нотатки й домашнє після кожного заняття'],
        pair: ['Ціна з однієї людини', 'Вчися з другом або партнером', 'Говорити вдвох легше й веселіше'],
        exam: ['Індивідуальні заняття', 'Формат IELTS, TOEFL або НМТ', 'Пробні тести з письмовим фідбеком', 'Співбесіди, презентації, листи'],
      },
      trialStrong: 'Перше заняття — безкоштовно',
      trial: '(окрім іспитів та бізнес-англійської). Визначаємо рівень, ставимо мету, і ти відчуваєш формат ще до купівлі пакета.',
    },
    faq: {
      items: [
        { q: 'Що відбувається на пробному занятті?', a: 'Ми безкоштовно говоримо [45] хвилин. Я визначаю твій рівень, питаю, для чого тобі англійська, і ти отримуєш план на перший місяць.' },
        { q: 'Скільки триває заняття?', a: '60 хвилин онлайн у Zoom або Google Meet. Потрібні лише ноутбук або телефон і навушники.' },
        { q: 'Скільки діє пакет?', a: '4 заняття діють 30 днів, 8 занять — 50 днів, 16 занять — 80 днів, 32 заняття — 140 днів.' },
        { q: 'Я зовсім початківець. Мені підійде?', a: 'Так. З початківцями ми теж говоримо з першого заняття, просто короткими й простими реченнями. [Уточни рівні, з якими працюєш.]' },
        { q: 'Чи можна перенести заняття?', a: 'Так, якщо попередиш щонайменше за [24 години]. Пізніше заняття вважається проведеним.' },
        { q: 'Ви навчаєте підлітків?', a: 'Так, від [13] років, зокрема підготовка до НМТ та іспитів.' },
        { q: 'Як оплатити?', a: '[Переказ на картку або посилання на оплату, наперед за пакет. Додай свої умови.]' },
        { q: 'Коли я помічу прогрес?', a: 'Найперше — у впевненості: менше пауз, більше сміливості. Кожні [два місяці] ми робимо перевірку й порівнюємо з точкою старту.' },
      ],
    },
    form: {
      h2: 'Перше заняття — безкоштовно',
      lead: 'Залиш контакти, і я напишу тобі протягом дня, щоб обрати час.',
      name: 'Твоє імʼя',
      handle: 'Telegram або Instagram',
      phone: 'Телефон',
      format: 'Формат занять',
      options: ['Індивідуальні', 'Парні заняття', 'Іспити та бізнес'],
      submit: 'Записатися на безкоштовне пробне',
      thanks: 'Дякую! Я напишу тобі протягом дня.',
      error: 'Не вдалося надіслати заявку. Напиши мені в Telegram — відповім швидко.',
      orTelegram: 'Або напиши мені одразу в Telegram',
    },
    foot: { social: 'Ми в соцмережах', channel: 'Telegram-канал', top: 'Нагору' },
    mobileCta: 'Безкоштовне пробне заняття',
    langLabel: 'Мова',
    skip: 'До змісту',
  },
  en: {
    meta: {
      title: 'English with Sam — conversational American English online',
      description: 'Conversational American English without the barrier, online for adults and teens. 70% of every lesson is you speaking. Your first lesson is free.',
    },
    nav: { about: 'About Sam', teachers: 'Teachers', prices: 'Prices', reviews: 'Reviews', faq: 'Questions', cta: 'Free trial' },
    heads: {
      hero: ['Speak English', 'freely with Sam'],
      goal: ['What do you need', 'English for?'],
      about: ["Hi, I'm Sam.", "Let's talk."],
      achievements: ['What I have', 'achieved'],
      teachers: ['Our', 'teachers'],
      reviews: ['What students', 'say'],
      price: ['Pick your', 'pace'],
      faq: ['Fair', 'questions'],
    },
    hero: {
      lead: 'Conversational American English without the barrier, online for adults and teens. 70% of every lesson is you speaking.',
      cta: 'Book a free trial lesson',
      second: 'Learn more',
    },
    cards: {
      talkTitle: '70% practice', talkText: 'of the lesson, you do the talking',
      trialTitle: 'Free trial', trialText: 'we meet and find your level',
    },
    marquee: ['for travel', 'for work', 'for new friends', 'for business', 'for IT', 'for exams'],
    goal: {
      chipsLabel: 'What do you need English for?',
      lead: 'Pick one. Each plan starts with the sentences you will actually use and builds the grammar around them.',
      pre: "You're in the right place if:",
      focusLabel: 'Lesson focus:',
      labels: { work: 'Work', travel: 'Travel', exams: 'Exams', life: 'Everyday life' },
      focus: {
        work: 'meetings, calls, emails and small talk with colleagues.',
        travel: 'airports, hotels, restaurants and chatting with people you meet.',
        exams: 'IELTS, TOEFL or НМТ tasks, timed, with feedback on every answer.',
        life: 'films, friends, hobbies and understanding people who speak fast.',
      },
      fits: {
        work: ['you follow calls but answer in single words', 'an email in English takes longer than the task itself', 'you want to ace an interview at an international company'],
        travel: ['at airports and hotels you point instead of talking', 'you want to ask locals the way and understand the answer', "you're planning a trip and don't want to rely on a translator"],
        exams: ['IELTS, TOEFL or НМТ is coming and you need a set score', 'you know the grammar but get lost in the speaking part', 'you want to practise in the exam format with feedback'],
        life: ['you watch shows with subtitles and want to drop them', "you understand English but freeze when it's time to speak", 'you want to talk freely with friends from other countries'],
      },
    },
    steps: {
      label: 'How learning works',
      items: [
        ['Trial lesson', 'A free, relaxed conversation. I find your level, ask what you need English for, and you get a feel for how we work.'],
        ['Your plan', 'A month-by-month plan built on your goal: the topics, the situations and the grammar you actually need.'],
        ['Lessons', 'Live lessons online where you do most of the talking. Short notes and homework after each one.'],
        ['Check-in', 'Every few months we compare where you are with where you started, and adjust the plan.'],
      ],
    },
    about: {
      whoH: 'Who I am',
      who: 'A teacher of conversational American English. I help people who understand English but freeze when it is time to speak finally start talking, without the fear of mistakes.',
      howH: 'How I teach',
      how: 'We talk about your work, your trips, your week. I note the mistakes that matter, and we fix them in the next lesson, in the context you made them in.',
      cta: 'Meet me on a trial lesson',
      photosLabel: 'Photos of Sam',
      photoAlt: 'Sam',
      photoEmpty: 'photo coming soon',
    },
    achievements: {
      lead: '[In one sentence: what you are proud of as a teacher.]',
      items: [
        { num: '[N] years', text: 'teaching English' },
        { num: '[N]+', text: 'students now speaking English' },
        { num: '[level]', text: '[your English level or exam, e.g. IELTS 8.0]' },
        { num: '[fact]', text: '[one more achievement: life or work in the US, projects, talks]' },
      ],
    },
    teachers: {
      lead: 'Every teacher works the same way: you speak from the first lesson, and grammar is built around your real situations.',
      items: [
        { name: 'Sam', role: 'Conversational American English', text: 'Helps you start speaking without the fear of mistakes: work, travel, everyday life.', tags: ['One-to-one', 'Pairs', '[levels]'] },
        { name: '[Teacher name]', role: '[speciality]', text: "[Two sentences about the teacher's experience and approach.]", tags: ['[formats]', '[levels]'] },
        { name: '[Teacher name]', role: '[speciality, e.g. IELTS or НМТ]', text: "[Two sentences about the teacher's experience and approach.]", tags: ['[formats]', '[levels]'] },
      ],
    },
    reviews: {
      lead: 'In the words of people who already speak.',
      items: [
        { quote: "[A real student's words about their progress, two to four lines.]", name: '[Name]', role: '[what they learn English for]' },
        { quote: "[A real student's words about their progress, two to four lines.]", name: '[Name]', role: '[what they learn English for]' },
        { quote: "[A real student's words about their progress, two to four lines.]", name: '[Name]', role: '[what they learn English for]' },
      ],
    },
    price: {
      fmtLabel: 'Lesson format',
      pkgLabel: 'Lesson packages',
      counts: { 4: '4 lessons', 8: '8 lessons', 16: '16 lessons', 32: '32 lessons' },
      notes: { 4: 'valid for 30 days', 8: 'valid for 50 days', 16: 'valid for 80 days', 32: 'valid for 140 days' },
      perLesson: 'per lesson',
      perPerson: 'per person per lesson',
      save: 'you save',
      choose: 'Choose',
      names: { solo: 'One-to-one', pair: 'Pair lessons', exam: 'Exams & business' },
      lines: {
        solo: ['A plan built around your goal', 'Schedule that moves with you', 'Notes and homework after each lesson'],
        pair: ['Price per person', 'Learn with a friend or partner', 'Talking is easier, and more fun, with two'],
        exam: ['One-to-one lessons', 'IELTS, TOEFL or НМТ format practice', 'Mock tests with written feedback', 'Interviews, presentations, emails'],
      },
      trialStrong: 'Your first lesson is free',
      trial: '(not available for exams & business). We find your level, set a goal and you see how lessons feel before buying a package.',
    },
    faq: {
      items: [
        { q: 'What happens on the trial lesson?', a: 'We talk for [45] minutes, free of charge. I check your level as we go, ask what you need English for, and you leave with a plan for the first month.' },
        { q: 'How long is a lesson?', a: '60 minutes, online on Zoom or Google Meet. All you need is a laptop or phone and headphones.' },
        { q: 'How long is a package valid?', a: '4 lessons are valid for 30 days, 8 lessons for 50 days, 16 lessons for 80 days and 32 lessons for 140 days.' },
        { q: "I'm a total beginner. Is this for me?", a: 'Yes. With beginners we speak from the first lesson too, just in short, simple sentences. [Confirm the levels you teach.]' },
        { q: 'Can I move a lesson?', a: 'Yes, if you let me know at least [24 hours] before. Later than that the lesson counts as taken.' },
        { q: 'Do you teach teenagers?', a: 'Yes, from [13] years old, including НМТ and exam preparation.' },
        { q: 'How do I pay?', a: '[Card transfer or payment link, for the package in advance. Add your real terms.]' },
        { q: 'How fast will I notice progress?', a: 'Most people feel it first in confidence: pausing less, guessing more. Every [two months] we do a check-in and compare against your starting point.' },
      ],
    },
    form: {
      h2: 'Your first lesson is free',
      lead: "Leave your details and I'll write to you within a day to pick a time.",
      name: 'Your name',
      handle: 'Telegram or Instagram',
      phone: 'Phone',
      format: 'Lesson format',
      options: ['One-to-one', 'Pair lessons', 'Exams & business'],
      submit: 'Book my free trial',
      thanks: "Thank you! I'll write to you within a day.",
      error: "Couldn't send the form. Message me on Telegram and I'll reply quickly.",
      orTelegram: 'Or message me on Telegram right away',
    },
    foot: { social: 'Find us on social media', channel: 'Telegram channel', top: 'Back to top' },
    mobileCta: 'Free trial lesson',
    langLabel: 'Language',
    skip: 'Skip to content',
  },
}

window.EWS = { LINKS, PHOTOS, TEACHER_PHOTOS, PRICES, PACKAGES, GOAL_IDS, COPY }
})()
