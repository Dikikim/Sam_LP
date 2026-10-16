/* English with Sam: all page text, prices and links. Edit both ua and en. */
(function () {
// All page copy, prices and links live here. Edit text in both languages.

const LINKS = {
  booking: 'https://t.me/english_sam7',
  channel: 'https://t.me/english_sam77',
  instagram: 'https://www.instagram.com/english_with_sam7/',
  tiktok: 'https://www.tiktok.com/@sam_englishteacher',
  facebook: 'https://www.facebook.com/share/1JaHwCmzrp/',
}

const TRIAL_PRICE = '499 ₴'

// [package total, price per lesson]
const PRICES = {
  4: { pair: ['2 280 ₴', '570 ₴'], solo: ['2 680 ₴', '670 ₴'], exam: ['3 400 ₴', '850 ₴'] },
  8: { pair: ['4 400 ₴', '550 ₴'], solo: ['5 200 ₴', '650 ₴'], exam: ['6 480 ₴', '810 ₴'] },
  16: { pair: ['8 320 ₴', '520 ₴'], solo: ['9 920 ₴', '620 ₴'], exam: ['12 800 ₴', '800 ₴'] },
  32: { pair: ['16 000 ₴', '500 ₴'], solo: ['19 200 ₴', '600 ₴'], exam: ['24 000 ₴', '750 ₴'] },
}
const PACKAGES = [4, 8, 16, 32]

const PHRASES = {
  work: ['Could we push the call to Thursday?', 'Let me walk you through the numbers.', 'Sorry, can I just add something here?'],
  travel: ['Is this seat taken?', 'Where do locals actually eat around here?', "I think there's a mistake on the bill."],
  exams: ['The graph shows a steady rise in…', 'On the one hand… on the other hand…', "To sum up, I'd argue that…"],
  life: ["I've been meaning to tell you…", "No way, that's hilarious.", 'Sorry, could you say that again?'],
}
const GOAL_IDS = ['work', 'travel', 'exams', 'life']

const COPY = {
  ua: {
    meta: {
      title: 'English with Sam — розмовна американська англійська онлайн',
      description: 'Розмовна американська англійська без барʼєрів — онлайн, для дорослих і підлітків. 70% кожного заняття говориш ти. Перше заняття — 499 ₴.',
    },
    nav: { how: 'Як це працює', about: 'Про Сема', prices: 'Ціни', faq: 'Питання', cta: 'Пробне заняття' },
    heads: {
      hero: ['Говори англійською', 'вільно з Семом'],
      services: ['Формати', 'занять'],
      goal: ['Для чого тобі', 'англійська?'],
      how: ['Як це', 'працює'],
      about: ['Привіт, я Сем.', 'Давай говорити.'],
      price: ['Обери свій', 'темп'],
      faq: ['Чесні', 'питання'],
    },
    cards: {
      talkTitle: '70% практики', talkText: 'часу на занятті говориш ти',
      certTitle: 'TEFL/TESOL', certText: 'сертифікований викладач',
    },
    services: {
      lead: 'Обери, як тобі зручніше вчитися: сам на сам із викладачем, у парі з другом або з фокусом на іспит чи роботу.',
      cta: 'Записатися на пробне',
      more: 'Дивитися ціни',
      items: [
        { title: 'Індивідуальні', text: 'План під твою мету й графік. Більшість часу на занятті говориш ти.' },
        { title: 'Парні заняття', text: 'Вчися з другом чи партнером: дешевше, а говорити вдвох легше.' },
        { title: 'Іспити та бізнес', text: 'IELTS, TOEFL, НМТ, співбесіди, презентації та листи англійською.' },
      ],
    },
    hero: {
      h1: 'говори англійською вільно',
      lead: 'Розмовна американська англійська без барʼєрів — онлайн, для дорослих і підлітків. 70% кожного заняття говориш ти. Викладач із сертифікатом TEFL/TESOL.',
      cta: `Записатися на пробне · ${TRIAL_PRICE}`,
      second: 'Дивитися ціни',
      badge: 'часу на занятті говориш ти',
    },
    marquee: ['говори без страху', 'американська англійська', '70% практики', 'онлайн з будь-якої точки'],
    goal: {
      h2: 'для чого тобі англійська?',
      lead: 'Обери одне. Кожен план починається з фраз, які ти справді вживатимеш, а граматику будуємо навколо них.',
      pre: 'Вже за перший місяць ти казатимеш:',
      focusLabel: 'Фокус занять:',
      labels: { work: 'Робота', travel: 'Подорожі', exams: 'Іспити', life: 'Щоденне життя' },
      focus: {
        work: 'зустрічі, дзвінки, листи та small talk з колегами.',
        travel: 'аеропорти, готелі, ресторани й розмови з людьми в дорозі.',
        exams: 'завдання IELTS, TOEFL або НМТ на час, з фідбеком на кожну відповідь.',
        life: 'фільми, друзі, хобі й розуміння людей, які говорять швидко.',
      },
      tr: {
        work: ['Можемо перенести дзвінок на четвер?', 'Давайте я поясню цифри.', 'Вибачте, можна я дещо додам?'],
        travel: ['Це місце вільне?', 'Де тут їдять місцеві?', 'Здається, в рахунку помилка.'],
        exams: ['Графік показує стабільне зростання…', 'З одного боку… з іншого боку…', 'Підсумовуючи, я вважаю, що…'],
        life: ['Давно хотів тобі сказати…', 'Та ну, це дуже смішно.', 'Вибач, можеш повторити?'],
      },
    },
    how: {
      h2: 'як це працює',
      lead: 'Від першого дзвінка до дня, коли помічаєш, що думаєш англійською. Чотири кроки без марафону підручників.',
      steps: [
        ['Пробне заняття', 'Невимушена розмова. Визначаю твій рівень, питаю, для чого тобі англійська, і ти відчуваєш, як ми працюємо.'],
        ['Твій план', 'План на кожен місяць під твою мету: теми, ситуації та граматика, які тобі справді потрібні.'],
        ['Заняття', 'Живі онлайн-заняття, де більшість часу говориш ти. Короткі нотатки й домашнє після кожного.'],
        ['Перевірка', 'Кожні кілька місяців порівнюємо, де ти зараз і з чого починав, і коригуємо план.'],
      ],
    },
    about: {
      h2: 'привіт, я сем. давай говорити.',
      whoH: 'Хто я',
      who: 'Викладач розмовної американської англійської з сертифікатом TEFL/TESOL. Допомагаю тим, хто розуміє англійську, але завмирає, коли треба говорити, нарешті заговорити без страху помилок.',
      howH: 'Як я навчаю',
      how: 'Говоримо про твою роботу, подорожі, твій тиждень. Я занотовую помилки, які мають значення, і ми виправляємо їх на наступному занятті, в тому ж контексті.',
      cta: 'Познайомимось на пробному',
    },
    review: {
      label: 'Відгук студента',
      photo: 'Фото студента',
      quote: '[Тут будуть справжні слова студента про його прогрес, три–пʼять рядків.]',
      name: '[Імʼя студента]',
      role: '[для чого вчить англійську]',
    },
    price: {
      h2: 'обери свій темп',
      counts: { 4: '4 заняття', 8: '8 занять', 16: '16 занять', 32: '32 заняття' },
      notes: { 4: 'Пакет діє 30 днів', 8: 'Пакет діє 50 днів', 16: 'Пакет діє 80 днів', 32: 'Пакет діє 140 днів' },
      perLesson: 'за заняття',
      perPerson: 'з людини за заняття',
      choose: 'Обрати',
      names: { pair: 'Парні заняття', solo: 'Індивідуальні', exam: 'Іспити та бізнес' },
      lines: {
        pair: ['Ціна з однієї людини', 'Вчися з другом або партнером'],
        solo: ['План під твою мету', 'Графік під твій темп життя', 'Нотатки й домашнє після кожного заняття'],
        exam: ['Індивідуальні заняття', 'Формат IELTS, TOEFL або НМТ', 'Пробні тести з письмовим фідбеком', 'Співбесіди, презентації, листи', 'Лексика твоєї сфери'],
      },
      trialStrong: `Перше заняття — ${TRIAL_PRICE}`,
      trial: '(окрім іспитів та бізнес-англійської). Визначаємо рівень, ставимо мету, і ти відчуваєш формат ще до купівлі пакета.',
    },
    faq: {
      h2: 'чесні питання',
      items: [
        { q: 'Що відбувається на пробному занятті?', a: 'Ми говоримо [45] хвилин. Я визначаю твій рівень, питаю, для чого тобі англійська, і ти отримуєш план на перший місяць.' },
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
      h2: `Перше заняття — ${TRIAL_PRICE}`,
      lead: 'Залиш контакти, і я напишу тобі протягом дня, щоб обрати час.',
      name: 'Твоє імʼя',
      handle: 'Telegram або Instagram',
      phone: 'Телефон',
      format: 'Формат занять',
      options: ['Індивідуальні', 'Парні заняття', 'Іспити та бізнес'],
      submit: 'Записатися на пробне',
      thanks: 'Дякую! Я напишу тобі протягом дня.',
      error: 'Не вдалося надіслати заявку. Напиши мені в Telegram — відповім швидко.',
      orTelegram: 'Або напиши мені одразу в Telegram',
    },
    foot: { channel: 'Telegram-канал', top: 'Нагору' },
    langLabel: 'Мова',
    skip: 'До змісту',
  },
  en: {
    meta: {
      title: 'English with Sam — conversational American English online',
      description: 'Conversational American English without the barrier, online for adults and teens. 70% of every lesson is you speaking. First lesson 499 ₴.',
    },
    nav: { how: 'How it works', about: 'About Sam', prices: 'Prices', faq: 'Questions', cta: 'Book a trial' },
    heads: {
      hero: ['Speak English', 'freely with Sam'],
      services: ['Lesson', 'formats'],
      goal: ['What do you need', 'English for?'],
      how: ['How it', 'works'],
      about: ["Hi, I'm Sam.", "Let's talk."],
      price: ['Pick your', 'pace'],
      faq: ['Fair', 'questions'],
    },
    cards: {
      talkTitle: '70% practice', talkText: 'of the lesson, you do the talking',
      certTitle: 'TEFL/TESOL', certText: 'certified teacher',
    },
    services: {
      lead: 'Choose how you like to learn: one-to-one with your teacher, in a pair with a friend, or focused on an exam or your job.',
      cta: 'Book a trial lesson',
      more: 'See prices',
      items: [
        { title: 'One-to-one', text: 'A plan built around your goal and schedule. You do most of the talking.' },
        { title: 'Pair lessons', text: 'Learn with a friend or partner: cheaper, and talking is easier with two.' },
        { title: 'Exams & business', text: 'IELTS, TOEFL, НМТ, job interviews, presentations and emails in English.' },
      ],
    },
    hero: {
      h1: 'talk your way into english',
      lead: 'Conversational American English without the barrier, online for adults and teens. 70% of every lesson is you speaking. TEFL/TESOL-certified teacher.',
      cta: `Book a trial lesson · ${TRIAL_PRICE}`,
      second: 'See prices',
      badge: 'of the lesson, you do the talking',
    },
    marquee: ['speak without fear', 'American English', '70% practice', 'online from anywhere'],
    goal: {
      h2: 'what do you need english for?',
      lead: 'Pick one. Each plan starts with the sentences you will actually use and builds the grammar around them.',
      pre: "In your first month, you'll be saying things like",
      focusLabel: 'Lesson focus:',
      labels: { work: 'Work', travel: 'Travel', exams: 'Exams', life: 'Everyday life' },
      focus: {
        work: 'meetings, calls, emails and small talk with colleagues.',
        travel: 'airports, hotels, restaurants and chatting with people you meet.',
        exams: 'IELTS, TOEFL or НМТ tasks, timed, with feedback on every answer.',
        life: 'films, friends, hobbies and understanding people who speak fast.',
      },
      tr: null,
    },
    how: {
      h2: 'how it works',
      lead: "From the first call to the day you notice you're thinking in English. Four steps, no textbook marathon.",
      steps: [
        ['Trial lesson', 'A relaxed conversation. I find your level, ask what you need English for, and you get a feel for how we work.'],
        ['Your plan', 'A month-by-month plan built on your goal: the topics, the situations and the grammar you actually need.'],
        ['Lessons', 'Live lessons online where you do most of the talking. Short notes and homework after each one.'],
        ['Check-in', 'Every few months we compare where you are with where you started, and adjust the plan.'],
      ],
    },
    about: {
      h2: "hi, i'm sam. let's just talk.",
      whoH: 'Who I am',
      who: 'A TEFL/TESOL-certified teacher of conversational American English. I help people who understand English but freeze when it is time to speak finally start talking, without the fear of mistakes.',
      howH: 'How I teach',
      how: 'We talk about your work, your trips, your week. I note the mistakes that matter, and we fix them in the next lesson, in the context you made them in.',
      cta: 'Meet me on a trial lesson',
    },
    review: {
      label: 'What a student says',
      photo: 'Student photo',
      quote: "[A real student's words about their progress go here, three to five lines in their own voice.]",
      name: '[Student name]',
      role: '[what they learn English for]',
    },
    price: {
      h2: 'pick your pace',
      counts: { 4: '4 lessons', 8: '8 lessons', 16: '16 lessons', 32: '32 lessons' },
      notes: { 4: 'Package valid for 30 days', 8: 'Package valid for 50 days', 16: 'Package valid for 80 days', 32: 'Package valid for 140 days' },
      perLesson: 'per lesson',
      perPerson: 'per person per lesson',
      choose: 'Choose',
      names: { pair: 'Pair lessons', solo: 'One-to-one', exam: 'Exams & business' },
      lines: {
        pair: ['Price per person', 'Learn with a friend or partner'],
        solo: ['A plan built around your goal', 'Schedule that moves with you', 'Notes and homework after each lesson'],
        exam: ['One-to-one lessons', 'IELTS, TOEFL or НМТ format practice', 'Mock tests with written feedback', 'Interviews, presentations, emails', 'Vocabulary for your field'],
      },
      trialStrong: `First lesson: ${TRIAL_PRICE}`,
      trial: '(not available for exams & business). We find your level, set a goal and you see how lessons feel before buying a package.',
    },
    faq: {
      h2: 'fair questions',
      items: [
        { q: 'What happens on the trial lesson?', a: 'We talk for [45] minutes. I check your level as we go, ask what you need English for, and you leave with a plan for the first month.' },
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
      h2: `Your first lesson: ${TRIAL_PRICE}`,
      lead: "Leave your details and I'll write to you within a day to pick a time.",
      name: 'Your name',
      handle: 'Telegram or Instagram',
      phone: 'Phone',
      format: 'Lesson format',
      options: ['One-to-one', 'Pair lessons', 'Exams & business'],
      submit: 'Book my trial lesson',
      thanks: "Thank you! I'll write to you within a day.",
      error: "Couldn't send the form. Message me on Telegram and I'll reply quickly.",
      orTelegram: 'Or message me on Telegram right away',
    },
    foot: { channel: 'Telegram channel', top: 'Back to top' },
    langLabel: 'Language',
    skip: 'Skip to content',
  },
}

window.EWS = { LINKS, TRIAL_PRICE, PRICES, PACKAGES, PHRASES, GOAL_IDS, COPY }
})()
