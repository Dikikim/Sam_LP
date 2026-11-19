/* We Speak: all page text, prices, photos and links. Edit both ua and en. */
(function () {

const LINKS = {
  booking: 'https://t.me/english_sam7',
  channel: 'https://t.me/english_sam77',
  instagram: 'https://www.instagram.com/english_with_sam7/',
  tiktok: 'https://www.tiktok.com/@sam_englishteacher',
  facebook: 'https://www.facebook.com/share/1JaHwCmzrp/',
}

// Teacher card photos, same order as COPY.*.teachers.items. null = placeholder.
// Put files in assets/img/photos/ and list them here.
const TEACHER_PHOTOS = [null, null]

// Lesson formats in display order (same order as COPY.*.form.options).
// packs: [lessons, price per lesson ₴, lessons per week, valid for N days]
// best: the highlighted package. Totals and savings are worked out in app.js.
const FORMATS = [
  { id: 'solo', perKey: 'perLesson', best: 12, packs: [[4, 650, '1', 40], [6, 650, '1–2', 45], [8, 650, '2', 45], [12, 600, '3', 60], [24, 570, '2–3', 100]] },
  { id: 'pair', perKey: 'perPerson', best: 12, packs: [[4, 450, '1', 40], [8, 450, '2', 45], [12, 420, '3', 60], [16, 400, '2–3', 75]] },
  { id: 'biz', perKey: 'perLesson', best: 12, packs: [[4, 750, '1', 40], [8, 750, '2', 45], [12, 720, '3', 60]] },
  { id: 'exam', perKey: 'perLesson', best: 16, packs: [[4, 850, '1', 40], [8, 850, '2', 45], [16, 800, '2–3', 75]] },
]
const GOAL_IDS = ['work', 'travel', 'exams', 'life']

const COPY = {
  ua: {
    meta: {
      title: 'We Speak — розмовна американська англійська онлайн',
      description: 'Розмовна англійська, яку використовують носії. Долаємо барʼєри з першого уроку. Перше заняття — безкоштовно.',
    },
    nav: { teachers: 'Викладачі', prices: 'Ціни', reviews: 'Відгуки', faq: 'Питання', cta: 'Безкоштовне пробне' },
    heads: {
      hero: ['Говори англійською', 'вільно з We Speak'],
      goal: ['Для чого тобі', 'англійська?'],
      steps: ['Як проходить', 'навчання?'],
      founder: ['Засновник', 'We Speak'],
      teachers: ['Наші', 'викладачі'],
      reviews: ['Відгуки', 'студентів'],
      price: ['Обери свій', 'формат'],
      faq: ['Питання', 'про школу'],
    },
    hero: {
      lead: 'Розмовна англійська, яку використовують носії. Долаємо барʼєри з першого уроку.',
      cta: 'Записатися на безкоштовне пробне',
      note: 'Отримайте реальні знання вже на першому занятті',
      second: 'Дізнатися більше',
    },
    cards: {
      talkTitle: '70% практики', talkText: 'часу на занятті говориш ти',
    },
    marquee: ['подорожі', 'робота', 'нові знайомства', 'бізнес', 'ІТ', 'іспити'],
    goal: {
      chipsLabel: 'Для чого тобі англійська?',
      lead: 'Оберіть свій напрямок. Кожен план буде сфокусований на ваших цілях та потребах.',
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
      start: 'Старт',
      finish: 'Ти говориш!',
      items: [
        'Створюємо план',
        'Заняття з фокусом на лексику та граматику',
        'Аналіз домашнього завдання та помилок',
        'Регулярна перевірка знань і вивченого матеріалу',
        'Детальне опрацювання проблемних моментів (pain points)',
        'Індивідуальний підхід — навіть у дуо та групах',
      ],
    },
    // **text** = bold
    founder: {
      intro: '**Святослав, або Сем** — викладач англійської мови з **10+ роками досвіду**, рівнем **C1** та сертифікатом **TEFL/TESOL**.',
      bgTitle: 'Бекграунд та результати',
      facts: [
        'Жив у **США** (майже рік), викладав англійську в **Китаї** (2 роки)',
        'Має широкий **міжнародний досвід**',
        'Допоміг **понад 500 студентам** заговорити англійською для роботи, співбесід, подорожей та переїзду',
      ],
      stats: [
        { num: '10+', text: 'років досвіду' },
        { num: 'C1', text: 'рівень англійської' },
        { num: '500+', text: 'студентів заговорили' },
      ],
      tag: '@english_with_sam7',
    },
    teachers: {
      items: [
        { name: '[Імʼя викладача]', role: '[спеціалізація]', text: '[Два речення про досвід і підхід викладача.]', tags: ['[формати]', '[рівні]'] },
        { name: '[Імʼя викладача]', role: '[спеціалізація, напр. IELTS чи НМТ]', text: '[Два речення про досвід і підхід викладача.]', tags: ['[формати]', '[рівні]'] },
      ],
    },
    reviews: {
      items: [
        { quote: '[Справжні слова студента про прогрес, два–чотири рядки.]', name: '[Імʼя]', role: '[для чого вчить англійську]' },
        { quote: '[Справжні слова студента про прогрес, два–чотири рядки.]', name: '[Імʼя]', role: '[для чого вчить англійську]' },
        { quote: '[Справжні слова студента про прогрес, два–чотири рядки.]', name: '[Імʼя]', role: '[для чого вчить англійську]' },
      ],
    },
    price: {
      fmtLabel: 'Формат занять',
      pkgLabel: 'Пакети занять',
      lessons: function (n) {
        var m = n % 10, h = n % 100
        return n + ((m >= 1 && m <= 4) && (h < 11 || h > 14) ? ' заняття' : ' занять')
      },
      perLesson: 'за заняття',
      perPerson: 'з людини за заняття',
      week: 'р./тиж.',
      valid: 'діє # днів',
      save: 'економія',
      best: 'Найпопулярніший',
      choose: 'Обрати',
      names: { solo: 'Індивідуальні', pair: 'Парні заняття', biz: 'Бізнес / IT', exam: 'Іспити' },
      lines: {
        solo: ['55 хвилин сам на сам із викладачем', 'План під твою мету', 'Графік під твій темп життя'],
        pair: ['55 хвилин, ціна з однієї людини', 'Вчися з другом або партнером', 'Говорити вдвох легше й веселіше'],
        biz: ['55 хвилин, індивідуально', 'Співбесіди, дзвінки, презентації, листи', 'Лексика твоєї сфери: бізнес чи IT'],
        exam: ['55 хвилин, індивідуально', 'IELTS, TOEFL, НМТ, ЄВІ, US Citizenship', 'Пробні тести з фідбеком'],
      },
      trialStrong: 'Перше заняття — безкоштовно',
      trial: '(окрім іспитів та бізнес-англійської). Визначаємо рівень, ставимо мету, і ти відчуваєш формат ще до купівлі пакета.',
      terms: 'Не підійшов викладач? Замінимо, а оплачені уроки залишаться у вашому абонементі. Кошти за абонемент не повертаються.',
    },
    faq: {
      items: [
        { q: 'Що відбувається на пробному занятті?', a: 'Ми безкоштовно говоримо [45] хвилин. Я визначаю твій рівень, питаю, для чого тобі англійська, і ти отримуєш план на перший місяць.' },
        { q: 'Скільки триває заняття?', a: '55 хвилин онлайн у Zoom або Google Meet. Потрібні лише ноутбук або телефон і навушники.' },
        { q: 'Скільки діє пакет?', a: 'Залежить від пакета: 4 заняття — 40 днів, 6 і 8 занять — 45 днів, 12 занять — 60 днів, 16 занять — 75 днів, 24 заняття — 100 днів.' },
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
      options: ['Індивідуальні', 'Парні заняття', 'Бізнес / IT', 'Іспити'],
      submit: 'Записатися на безкоштовне пробне',
      thanks: 'Дякую! Я напишу тобі протягом дня.',
      error: 'Не вдалося надіслати заявку. Напиши мені в Telegram — відповім швидко.',
      orTelegram: 'Або напиши мені одразу в Telegram',
    },
    foot: { slogan: ['You ask —', 'we speak'], social: 'Ми в соцмережах', channel: 'Telegram-канал', top: 'Нагору' },
    mobileCta: 'Безкоштовне пробне заняття',
    langLabel: 'Мова',
    skip: 'До змісту',
  },
  en: {
    meta: {
      title: 'We Speak — conversational American English online',
      description: 'The conversational English native speakers actually use. We break the barrier from the very first lesson. Your first lesson is free.',
    },
    nav: { teachers: 'Teachers', prices: 'Prices', reviews: 'Reviews', faq: 'Questions', cta: 'Free trial' },
    heads: {
      hero: ['Speak English', 'freely with We Speak'],
      goal: ['What do you need', 'English for?'],
      steps: ['How does', 'learning work?'],
      founder: ['Founder of', 'We Speak'],
      teachers: ['Our', 'teachers'],
      reviews: ['Student', 'reviews'],
      price: ['Pick your', 'format'],
      faq: ['Questions about', 'the school'],
    },
    hero: {
      lead: 'The conversational English native speakers actually use. We break the barrier from the very first lesson.',
      cta: 'Book a free trial lesson',
      note: 'Get real knowledge from your very first lesson',
      second: 'Learn more',
    },
    cards: {
      talkTitle: '70% practice', talkText: 'of the lesson, you do the talking',
    },
    marquee: ['travel', 'work', 'new friends', 'business', 'IT', 'exams'],
    goal: {
      chipsLabel: 'What do you need English for?',
      lead: 'Choose your direction. Every plan is focused on your goals and needs.',
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
      start: 'Start',
      finish: "You're speaking!",
      items: [
        'We build your plan',
        'Lessons focused on vocabulary and grammar',
        'Review of homework and mistakes',
        'Regular checks of what you have learned',
        'Detailed work on your pain points',
        'A personal approach — even in pairs and groups',
      ],
    },
    founder: {
      intro: '**Sviatoslav, or Sam** — an English teacher with **10+ years of experience**, **C1** level and a **TEFL/TESOL** certificate.',
      bgTitle: 'Background and results',
      facts: [
        'Lived in the **USA** (almost a year), taught English in **China** (2 years)',
        'Has broad **international experience**',
        'Has helped **more than 500 students** start speaking English for work, interviews, travel and moving abroad',
      ],
      stats: [
        { num: '10+', text: 'years of experience' },
        { num: 'C1', text: 'English level' },
        { num: '500+', text: 'students speaking' },
      ],
      tag: '@english_with_sam7',
    },
    teachers: {
      items: [
        { name: '[Teacher name]', role: '[speciality]', text: "[Two sentences about the teacher's experience and approach.]", tags: ['[formats]', '[levels]'] },
        { name: '[Teacher name]', role: '[speciality, e.g. IELTS or НМТ]', text: "[Two sentences about the teacher's experience and approach.]", tags: ['[formats]', '[levels]'] },
      ],
    },
    reviews: {
      items: [
        { quote: "[A real student's words about their progress, two to four lines.]", name: '[Name]', role: '[what they learn English for]' },
        { quote: "[A real student's words about their progress, two to four lines.]", name: '[Name]', role: '[what they learn English for]' },
        { quote: "[A real student's words about their progress, two to four lines.]", name: '[Name]', role: '[what they learn English for]' },
      ],
    },
    price: {
      fmtLabel: 'Lesson format',
      pkgLabel: 'Lesson packages',
      lessons: function (n) { return n + (n === 1 ? ' lesson' : ' lessons') },
      perLesson: 'per lesson',
      perPerson: 'per person per lesson',
      week: '×/week',
      valid: 'valid # days',
      save: 'you save',
      best: 'Most popular',
      choose: 'Choose',
      names: { solo: 'One-to-one', pair: 'Pair lessons', biz: 'Business / IT', exam: 'Exams' },
      lines: {
        solo: ['55 minutes, just you and the teacher', 'A plan built around your goal', 'Schedule that moves with you'],
        pair: ['55 minutes, price per person', 'Learn with a friend or partner', 'Talking is easier, and more fun, with two'],
        biz: ['55 minutes, one-to-one', 'Interviews, calls, presentations, emails', 'The vocabulary of your field: business or IT'],
        exam: ['55 minutes, one-to-one', 'IELTS, TOEFL, НМТ, ЄВІ, US Citizenship', 'Mock tests with feedback'],
      },
      trialStrong: 'Your first lesson is free',
      trial: '(not available for exams & business). We find your level, set a goal and you see how lessons feel before buying a package.',
      terms: "Teacher not the right fit? We'll switch you to another one, and your paid lessons stay in your package. Package payments are non-refundable.",
    },
    faq: {
      items: [
        { q: 'What happens on the trial lesson?', a: 'We talk for [45] minutes, free of charge. I check your level as we go, ask what you need English for, and you leave with a plan for the first month.' },
        { q: 'How long is a lesson?', a: '55 minutes, online on Zoom or Google Meet. All you need is a laptop or phone and headphones.' },
        { q: 'How long is a package valid?', a: 'It depends on the package: 4 lessons — 40 days, 6 and 8 lessons — 45 days, 12 lessons — 60 days, 16 lessons — 75 days, 24 lessons — 100 days.' },
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
      options: ['One-to-one', 'Pair lessons', 'Business / IT', 'Exams'],
      submit: 'Book my free trial',
      thanks: "Thank you! I'll write to you within a day.",
      error: "Couldn't send the form. Message me on Telegram and I'll reply quickly.",
      orTelegram: 'Or message me on Telegram right away',
    },
    foot: { slogan: ['You ask —', 'we speak'], social: 'Find us on social media', channel: 'Telegram channel', top: 'Back to top' },
    mobileCta: 'Free trial lesson',
    langLabel: 'Language',
    skip: 'Skip to content',
  },
}

window.EWS = { LINKS, TEACHER_PHOTOS, FORMATS, GOAL_IDS, COPY }
})()
