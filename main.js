const D=document,Q=s=>D.querySelectorAll(s),$=s=>D.getElementById(s);

/* ══════ DYNAMIC YEAR ══════ */
$('yr').textContent=new Date().getFullYear();

/* ══════ PRELOADER ══════ */
function dismissPreloader(){const p=$('preloader');if(p&&!p.classList.contains('done')){p.classList.add('done');D.body.classList.remove('loading')}}
window.addEventListener('load',()=>setTimeout(dismissPreloader,500));
setTimeout(dismissPreloader,3000); /* fallback if external scripts fail */
if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(()=>{})}

/* ══════ DOTTED SURFACE (disabled on mobile for perf) ══════ */
function initDots(){
try{
if(!window.THREE||innerWidth<769)return;
const container=$('shbg');
const SEP=150,AX=40,AY=60;
const scene=new THREE.Scene();
scene.fog=new THREE.Fog(0xffffff,2000,10000);
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,1,10000);
camera.position.set(0,355,1220);
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.setClearColor(0xffffff,0);
container.appendChild(renderer.domElement);
const positions=[],colors=[];
const isDark=()=>D.documentElement.getAttribute('data-theme')==='dark';
for(let ix=0;ix<AX;ix++){for(let iy=0;iy<AY;iy++){positions.push(ix*SEP-(AX*SEP)/2,0,iy*SEP-(AY*SEP)/2);const v=isDark()?200:0;colors.push(v,v,v)}}
const geo=new THREE.BufferGeometry();
geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
const mat=new THREE.PointsMaterial({size:8,vertexColors:true,transparent:true,opacity:0.8,sizeAttenuation:true});
const pts=new THREE.Points(geo,mat);scene.add(pts);
let count=0;const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;const speed=rm?0.03:0.1;
function updateColors(){const ca=geo.attributes.color.array;const v=isDark()?200:0;for(let i=0;i<ca.length;i++)ca[i]=v;geo.attributes.color.needsUpdate=true}
let animId;
(function anim(){animId=requestAnimationFrame(anim);const pa=geo.attributes.position.array;let idx=0;for(let ix=0;ix<AX;ix++){for(let iy=0;iy<AY;iy++){pa[idx*3+1]=Math.sin((ix+count)*0.3)*50+Math.sin((iy+count)*0.5)*50;idx++}}geo.attributes.position.needsUpdate=true;renderer.render(scene,camera);count+=speed})();
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
new MutationObserver(()=>updateColors()).observe(D.documentElement,{attributes:true,attributeFilter:['data-theme']});
/* Pause when tab hidden */
D.addEventListener('visibilitychange',()=>{if(D.hidden){cancelAnimationFrame(animId)}else{(function anim(){animId=requestAnimationFrame(anim);const pa=geo.attributes.position.array;let idx=0;for(let ix=0;ix<AX;ix++){for(let iy=0;iy<AY;iy++){pa[idx*3+1]=Math.sin((ix+count)*0.3)*50+Math.sin((iy+count)*0.5)*50;idx++}}geo.attributes.position.needsUpdate=true;renderer.render(scene,camera);count+=speed})()}});
}catch(e){console.warn('3D surface skipped:',e)}
}
/* Defer init until Three.js loaded */
if(window.THREE){try{initDots()}catch(e){}}else{window.addEventListener('load',()=>{try{setTimeout(initDots,100)}catch(e){}})}

/* ══════ i18n ══════ */
const L={
ru:{nav_skills:'Навыки',nav_exp:'Опыт',nav_cases:'Кейсы',nav_contact:'Контакты',hero_badge:'Открыт к проектам',hero_desc:'AI-агенты для продаж, голосовые роботы, автоматизация 1С + CRM + мессенджеры. 25+ проектов в продакшене, 500+ сэкономленных операторо-часов в месяц. MVP за 1-2 дня. Клиенты: KZ, RU, UAE.',hero_cta:'Заказать AI-агента',hero_dl:'Скачать CV',hero_cta2:'Кейсы',s_yr:'лет опыта',s_ld:'проектов',s_sc:'сценариев',s_au:'без оператора',skills_label:'// Навыки',skills_title:'Стек технологий',sk1_t:'AI / LLM',sk1_d:'Строю AI-агентов, которые квалифицируют лиды, отвечают клиентам и закрывают 60% обращений без оператора.',sk2_t:'Voice AI',sk2_d:'Голосовые роботы для обзвона, приёма звонков, soft collection. Синтез речи, связка с текстовыми ботами.',sk3_t:'Автоматизация',sk3_d:'25+ сценариев в продакшене. Связал 1С, CRM, WhatsApp, Telegram. Снизил ручной ввод на 80%.',sk4_d:'MVP за 1-2 дня. 8 лендингов/неделю. AI-ассистированная разработка.',sk5_d:'Лендинги, промо-страницы, UI на потоке. Работа по макетам из Figma.',sk6_d:'Веб-приложения с авторизацией, БД, SSR и деплоем.',sk7_t:'БД / Инфра',sk7_d:'Базы данных, SQL, контейнеризация, BaaS, деплой.',sk8_t:'Бизнес-системы',sk8_d:'CRM, ERP, headless CMS, мессенджеры.',sk9_t:'Интеграции',sk9_d:'REST API, GraphQL, вебхуки, OAuth, боты.',sk10_t:'Языки / Разметка',sk10_d:'Языки программирования, разметки и запросов.',exp_label:'// Опыт',exp_title:'Карьера',e1_d:'Июнь 2024 — Настоящее время',e1_r:'AI Engineer / Automation Architect',e1_c:'ABA Data (оценка, фин. и IT-консалтинг), Алматы',e1_ds:'Спроектировал и запустил AI-агентов для LinkedIn и WhatsApp, автоматизирующих квалификацию лидов через GPT-4o/Claude. Построил 15+ лендингов, MVP за 1-2 дня. Поддерживаю 25+ сценариев Make/n8n в продакшене.',e2_d:'Январь 2023 — Май 2024',e2_r:'Инженер автоматизаций / интеграций',e2_ds:'Интегрировал 1С ERP с Bitrix24 и платёжными шлюзами через REST API. Создал 10+ лендингов на Tilda/Framer. Сократил время обработки заказов в 2 раза.',e3_d:'Март 2022 — Декабрь 2022',e3_r:'Веб-разработчик / No-Code специалист',e3_ds:'Выпускал 20+ промо-лендингов в год на Tilda. Верстал UI по макетам Figma. Подключил Zapier для автосбора лидов в CRM, +30% конверсия.',cases_label:'// Кейсы',cases_title:'Проекты',c1_d:'Результат: 60% заявок без оператора, окупаемость за 1 месяц. AI-менеджер квалифицирует лиды, проверяет остатки в 1С, отправляет КП. Голосовой робот обзванивает и выявляет ЛПР.',c2_t:'AI-агент полного цикла B2B',c2_d:'Приём звонков/сообщений → сбор параметров → КП → договор → счёт в 1С → контроль оплаты → передача.',c3_t:'MVP AI-менеджер B2B',c3_d:'WhatsApp: входящие → параметры → саммари → автосчёт в 1С. Запуск 2 недели.',c3_m:'2 недели',c4_d:'Автономный поиск и прогрев ЛПР в LinkedIn, персонализированный контент через LLM, Telegram/CRM.',c4_m:'Автолидген',c5_d:'Личный кабинет, трекинг грузов, калькулятор, Framer Motion, Telegram-бот.',c6_t:'Автоматизация продаж + тендеры',c6_d:'amoCRM + 1С: ручной ввод −80%, скорость x3. Тендеры: автопарсинг, x2, 0 пропущенных.',c7_t:'AI-агент поддержки e-commerce',c7_d:'Результат: время ответа 15 мин → 10 сек, 60% обращений закрывает бот. Автоматизация FAQ, статусов заказов и возвратов.',c8_t:'Конвейер лендингов',c8_d:'8 лендингов/неделю. 5 дней → 1 день.',ct_label:'// Контакты',ct_title:'Связаться',ct_h:'Открыт к новым проектам',ct_p:'AI-агенты, автоматизации, лендинги, MVP. Пишите в Telegram.',ph:'Телефон',lg_t:'Языки',lg_d:'Работаю на русском, общаюсь на английском',l_ru:'Русский',l_kz:'Казахский',l_en:'Английский',l_cn:'Китайский',fv:'Собрано с вайбом ✨',typing:['> AI-агенты, которые закрывают сделки','> 25+ автоматизаций в продакшене','> MVP за 1-2 дня, лендинг за 1 день','> голосовые роботы + 1С + CRM'],nav_pricing:'Услуги',metrics_label:'// Результаты',metrics_title:'Цифры говорят',m1:'ручного ввода в CRM после автоматизации',m2:'время ответа клиенту с AI-агентом',m3:'лендингов на конвейерной сборке',m4:'обращений закрывает бот без оператора',m5:'скорость обработки заказов',m6:'от идеи до рабочего MVP',m7:'операторо-часов экономии в месяц',process_label:'// Процесс',process_title:'Как я работаю',p1_t:'Бриф',p1_d:'Созвон 30 мин. Разбираю задачу, фиксирую требования, определяю стек.',p1_time:'30 мин',p2_t:'Прототип',p2_d:'Рабочий прототип или MVP. Согласование, правки, финализация.',p2_time:'1-2 дня',p3_t:'Запуск',p3_d:'Деплой, подключение к боевым системам, тестирование на реальных данных.',p3_time:'1-3 дня',p4_t:'Поддержка',p4_d:'Мониторинг, доработки, масштабирование. Передача документации.',p4_time:'по запросу',test_label:'// Отзывы',test_title:'Что говорят клиенты',t1_q:'Запустили AI-менеджера в WhatsApp за 2 недели. Он обрабатывает 60% заявок без участия оператора. Окупился за первый месяц.',t1_n:'Руководитель, HoReCa B2B',t1_r:'Проект «Анаконда»',t2_q:'Автоматизация amoCRM + 1С убрала 80% ручного ввода. Менеджеры занимаются продажами, а не копипастом между системами.',t2_n:'Коммерческий директор',t2_r:'Автоматизация продаж',t3_q:'Нужен был лендинг срочно, получили за 1 день. Качество на уровне студии, а скорость в 5 раз быстрее. Теперь заказываем пакетами.',t3_n:'Маркетинг-менеджер',t3_r:'Конвейер лендингов',demo_label:'// Демо',demo_title:'Как это работает',demo_cap:'AI-агент обрабатывает заявку в WhatsApp за 10 секунд',price_label:'// Услуги',price_title:'Пакеты',pr1_t:'Лендинг',pr1_sub:'Продающая страница за 1 день',pr1_p:'$300 / от',pr1_f1:'Дизайн + вёрстка + анимации',pr1_f2:'Адаптив под мобильные',pr1_f3:'Подключение аналитики',pr1_f4:'Сдача за 1-2 дня',pr2_t:'AI-агент',pr2_sub:'Бот, который продаёт и отвечает 24/7',pr2_p:'$800 / от',pr2_f1:'WhatsApp / Telegram бот',pr2_f2:'Интеграция с CRM и 1С',pr2_f3:'Квалификация лидов через LLM',pr2_f4:'Запуск за 2 недели',pr3_t:'Автоматизация',pr3_sub:'Связки между системами, конвейеры',pr3_p:'$500 / от',pr3_f1:'Make / n8n сценарии',pr3_f2:'1С + CRM + мессенджеры',pr3_f3:'Голосовые роботы',pr3_f4:'Мониторинг и поддержка',pr_cta:'Обсудить',pr_badge:'Популярный',blog_h:'Пишу о том, как строю AI-агентов',blog_p:'Кейсы, разборы, ошибки и промпты. Подписывайтесь на Telegram-канал.',blog_cta:'Подписаться',est_h:'Получить оценку проекта',est_p:'Опишите задачу, отвечу за 2 часа',est_btn:'Написать',faq_label:'// FAQ',faq_title:'Частые вопросы',fq1_q:'Сколько стоит AI-агент для моего бизнеса?',fq1_a:'Зависит от задачи. Простой WhatsApp-бот с LLM стоит от $800, полный цикл продаж с голосовым роботом и 1С от $2000. Созвонимся на 30 минут, разберу задачу и дам точную оценку.',fq2_q:'Как быстро вы запускаете проект?',fq2_a:'Лендинг за 1 день. MVP AI-агента за 1-2 недели. Полная автоматизация за 2-4 недели. Прототип показываю на второй день после брифа.',fq3_q:'Работаете с компаниями из других стран?',fq3_a:'Да. Работаю удалённо. Клиенты из Казахстана, России, ОАЭ. Коммуникация через Telegram, созвоны в Zoom/Google Meet.',fq4_q:'Что будет после запуска?',fq4_a:'Передаю документацию, провожу обучение команды. Поддержка и доработки по запросу. Мониторинг работоспособности первый месяц бесплатно.',fq5_q:'Какие гарантии?',fq5_a:'Оплата поэтапно: 50% предоплата, 50% после приёмки. Правки в рамках ТЗ бесплатно. Показываю рабочий прототип до оплаты второй части.',float_tip:'Написать в Telegram',sticky_cta:'Обсудить проект',avail:'Свободен для новых проектов',cf_all:'Все',cf_ai:'AI-агенты',cf_auto:'Автоматизация',cf_web:'Web / MVP',wa_name:'AI-менеджер ABA Data',wa_status:'онлайн',demo_note:'Реальный сценарий работы AI-агента в WhatsApp',book_call:'Забронировать созвон 30 мин',qf_h:'Быстрая заявка',qf_p:'Опишите задачу, отвечу в течение 2 часов',qf_name:'Имя',qf_contact:'Telegram / телефон',qf_msg:'Кратко опишите задачу...',qf_btn:'Отправить заявку',qf_ok:'Заявка отправлена! Отвечу в течение 2 часов.',phone_copied:'Номер скопирован',edu_t:'Образование и сертификаты',edu1:'Prompt Engineering, LLM Fine-tuning',edu1_sub:'OpenAI, DeepLearning.AI (online)',edu2:'n8n Advanced Automation',edu2_sub:'n8n.io (online)',edu3:'Web Development / No-Code',edu3_sub:'Самообучение, 2020-2022',e1_dur:'⏱ 1.5+ года',e2_dur:'⏱ 1 год 5 мес',e3_dur:'⏱ 10 мес',msf_h:'Оставить заявку',ms1_h:'Что вас интересует?',ms1_o1:'AI-агент',ms1_o2:'Лендинг',ms1_o3:'Автоматизация',ms1_o4:'Другое',ms2_h:'Бюджет?',ms3_h:'Когда нужно?',ms3_o1:'Срочно',ms3_o2:'1–2 недели',ms3_o3:'1 месяц',ms3_o4:'Гибко',ms4_h:'Контакты',msf_send:'Отправить заявку',msf_back:'← Назад',exit_h:'Бесплатная консультация 15 мин',exit_p:'Разберу вашу задачу и дам рекомендации. Без обязательств.',exit_cta:'Записаться в Telegram',roi_h:'Калькулятор экономии',roi_p:'Сколько вы сэкономите с AI-агентом',roi_l1:'Заявок в месяц',roi_l2:'Время на заявку, мин',roi_l3:'Стоимость часа оператора, $',roi_res:'экономия в месяц с AI-агентом (60% автоматизация)',ctx1:'Хотите такие же результаты?',ctx1_btn:'Выбрать пакет',ctx2:'Нужен такой проект?',ctx2_btn:'Обсудить в Telegram',avail2:'Принимаю 2 новых проекта',hl1:'проектов',hl2:'часов/мес сэкономлено',hl3:'до MVP',hl4:'автоматизация',pr1_anch:'Студия: ~$1500',pr2_anch:'Студия: ~$5000',pr3_anch:'Студия: ~$3000',g1:'Оплата поэтапно',g2:'NDA по запросу',g3:'Ответ за 2 часа',g4:'Правки бесплатно',g5:'Сдача в срок',copied:'Email скопирован',skip:'Перейти к содержимому',music_on:'Выключить музыку',music_off:'Включить музыку: Roxxy — Сомнения'},
en:{nav_skills:'Skills',nav_exp:'Experience',nav_cases:'Cases',nav_contact:'Contact',hero_badge:'Open to projects',hero_desc:'AI sales agents, voice bots, 1C + CRM + messenger automation. 25+ projects in production, 500+ operator-hours saved monthly. MVPs in 1-2 days. Clients: KZ, RU, UAE.',hero_cta:'Order AI Agent',hero_dl:'Download CV',hero_cta2:'Cases',s_yr:'years exp',s_ld:'projects',s_sc:'scenarios',s_au:'w/o operator',skills_label:'// Skills',skills_title:'Tech Stack',sk1_t:'AI / LLM',sk1_d:'I build AI agents that qualify leads, respond to clients, and handle 60% of inquiries without an operator.',sk2_t:'Voice AI',sk2_d:'Voice bots: cold calls, inbound, soft collection. Speech synthesis.',sk3_t:'Automation',sk3_d:'25+ scenarios in production. Connected 1C, CRM, WhatsApp, Telegram. Reduced manual entry by 80%.',sk4_d:'MVP in 1-2 days. 8 landings/week. AI-assisted dev.',sk5_d:'Landing pages, promo, UI at scale. Figma mockups.',sk6_d:'Web apps with auth, DB, SSR and deployment.',sk7_t:'DB / Infra',sk7_d:'Databases, SQL, containers, BaaS, deploy.',sk8_t:'Business Systems',sk8_d:'CRM, ERP, headless CMS, messengers.',sk9_t:'Integrations',sk9_d:'REST API, GraphQL, webhooks, OAuth, bots.',sk10_t:'Languages / Markup',sk10_d:'Programming, markup and query languages.',exp_label:'// Experience',exp_title:'Career',e1_d:'June 2024 — Present',e1_r:'AI Engineer / Automation Architect',e1_c:'ABA Data (valuation, finance & IT consulting), Almaty',e1_ds:'Designed and deployed AI agents for LinkedIn and WhatsApp automating lead qualification via GPT-4o/Claude. Built 15+ landing pages, MVPs in 1-2 days. Maintain 25+ Make/n8n scenarios in production.',e2_d:'Jan 2023 — May 2024',e2_r:'Automation / Integration Engineer',e2_ds:'Integrated 1C ERP with Bitrix24 and payment gateways via REST API. Built 10+ Tilda/Framer landing pages. Cut order processing time by 50%.',e3_d:'Mar 2022 — Dec 2022',e3_r:'Web Developer / No-Code Specialist',e3_ds:'Produced 20+ promotional landing pages/year on Tilda. Coded UI from Figma designs. Connected Zapier for CRM lead capture, +30% conversion.',cases_label:'// Cases',cases_title:'Projects',c1_d:'Result: 60% of inquiries handled without operator, ROI in 1 month. AI manager qualifies leads, checks 1C inventory, sends proposals. Voice bot handles cold calls and decision-maker outreach.',c2_t:'Full-cycle B2B AI Agent',c2_d:'Calls/messages → parameters → proposal → contract → 1C invoice → payment → handoff.',c3_t:'MVP AI Manager B2B',c3_d:'WhatsApp: inbound → params → summary → auto-invoice 1C. 2 weeks.',c3_m:'2 weeks',c4_d:'Autonomous LinkedIn decision-maker search, personalized LLM content, Telegram/CRM.',c4_m:'Auto leadgen',c5_d:'Dashboard, cargo tracking, calculator, Framer Motion, Telegram bot.',c6_t:'Sales + Tender Automation',c6_d:'amoCRM + 1C: −80% manual, x3 speed. Tenders: auto-parse, x2, 0 missed.',c7_t:'E-commerce Support AI',c7_d:'Result: response time from 15 min to 10 sec, 60% resolved by bot. Automated FAQ, order status, and returns.',c8_t:'Landing Pipeline',c8_d:'8 landings/week. 5 days → 1 day.',ct_label:'// Contact',ct_title:'Get in Touch',ct_h:'Open to new projects',ct_p:'AI agents, automation, landing pages, MVPs. Write me on Telegram.',ph:'Phone',lg_t:'Languages',lg_d:'Working: Russian. Communicating in English',l_ru:'Russian',l_kz:'Kazakh',l_en:'English',l_cn:'Chinese',fv:'Built with vibes ✨',typing:['> AI agents that close deals','> 25+ automations in production','> MVP in 1-2 days, landing in 1 day','> voice bots + 1C + CRM'],nav_pricing:'Services',metrics_label:'// Results',metrics_title:'Numbers Speak',m1:'manual CRM entry eliminated',m2:'customer response time with AI agent',m3:'landing pages on assembly line',m4:'of requests handled by bot w/o operator',m5:'order processing speed',m6:'from idea to working MVP',m7:'operator-hours saved monthly',process_label:'// Process',process_title:'How I Work',p1_t:'Brief',p1_d:'30 min call. I break down the task, fix requirements, pick the stack.',p1_time:'30 min',p2_t:'Prototype',p2_d:'Working prototype or MVP. Approval, revisions, finalization.',p2_time:'1-2 days',p3_t:'Launch',p3_d:'Deploy, connect to production systems, test on real data.',p3_time:'1-3 days',p4_t:'Support',p4_d:'Monitoring, improvements, scaling. Documentation handoff.',p4_time:'on request',test_label:'// Testimonials',test_title:'What Clients Say',t1_q:'We launched a WhatsApp AI manager in 2 weeks. It handles 60% of requests without an operator. Paid for itself in the first month.',t1_n:'Director, HoReCa B2B',t1_r:'Project Anaconda',t2_q:'amoCRM + 1C automation removed 80% of manual entry. Managers now sell instead of copy-pasting between systems.',t2_n:'Commercial Director',t2_r:'Sales Automation',t3_q:'Needed a landing page urgently, got it in 1 day. Studio quality at 5x the speed. Now we order in batches.',t3_n:'Marketing Manager',t3_r:'Landing Pipeline',demo_label:'// Demo',demo_title:'How It Works',demo_cap:'AI agent processes a WhatsApp inquiry in 10 seconds',price_label:'// Services',price_title:'Packages',pr1_t:'Landing Page',pr1_sub:'Selling page in 1 day',pr1_p:'$300 / from',pr1_f1:'Design + code + animations',pr1_f2:'Mobile responsive',pr1_f3:'Analytics setup',pr1_f4:'Delivery in 1-2 days',pr2_t:'AI Agent',pr2_sub:'Bot that sells and responds 24/7',pr2_p:'$800 / from',pr2_f1:'WhatsApp / Telegram bot',pr2_f2:'CRM and 1C integration',pr2_f3:'Lead qualification via LLM',pr2_f4:'Launch in 2 weeks',pr3_t:'Automation',pr3_sub:'System connectors, pipelines',pr3_p:'$500 / from',pr3_f1:'Make / n8n scenarios',pr3_f2:'1C + CRM + messengers',pr3_f3:'Voice bots',pr3_f4:'Monitoring and support',pr_cta:'Discuss',pr_badge:'Popular',blog_h:'I write about building AI agents',blog_p:'Cases, breakdowns, mistakes and prompts. Subscribe to Telegram channel.',blog_cta:'Subscribe',est_h:'Get a project estimate',est_p:'Describe the task, I respond within 2 hours',est_btn:'Write me',faq_label:'// FAQ',faq_title:'Frequently Asked',fq1_q:'How much does an AI agent cost for my business?',fq1_a:'Depends on the task. A simple WhatsApp bot with LLM starts at $800, full sales cycle with voice bot and 1C from $2000. 30 min call and I give an exact estimate.',fq2_q:'How fast do you launch?',fq2_a:'Landing page in 1 day. MVP AI agent in 1-2 weeks. Full automation in 2-4 weeks. Working prototype on day two after brief.',fq3_q:'Do you work with international companies?',fq3_a:'Yes. I work remotely. Clients from Kazakhstan, Russia, UAE. Communication via Telegram, calls on Zoom/Google Meet.',fq4_q:'What happens after launch?',fq4_a:'I hand off documentation and train the team. Support and updates on request. First month of monitoring is free.',fq5_q:'What guarantees?',fq5_a:'Milestone payments: 50% upfront, 50% on acceptance. Revisions within scope are free. I show a working prototype before the second payment.',float_tip:'Write on Telegram',sticky_cta:'Discuss project',avail:'Available for new projects',cf_all:'All',cf_ai:'AI Agents',cf_auto:'Automation',cf_web:'Web / MVP',wa_name:'AI Manager ABA Data',wa_status:'online',demo_note:'Real AI agent workflow in WhatsApp',book_call:'Book a 30 min call',qf_h:'Quick Request',qf_p:'Describe the task, I respond within 2 hours',qf_name:'Name',qf_contact:'Telegram / phone',qf_msg:'Briefly describe the task...',qf_btn:'Send Request',qf_ok:'Request sent! I will respond within 2 hours.',phone_copied:'Number copied',edu_t:'Education & Certificates',edu1:'Prompt Engineering, LLM Fine-tuning',edu1_sub:'OpenAI, DeepLearning.AI (online)',edu2:'n8n Advanced Automation',edu2_sub:'n8n.io (online)',edu3:'Web Development / No-Code',edu3_sub:'Self-taught, 2020-2022',e1_dur:'⏱ 1.5+ years',e2_dur:'⏱ 1 year 5 months',e3_dur:'⏱ 10 months',msf_h:'Submit a Request',ms1_h:'What are you looking for?',ms1_o1:'AI Agent',ms1_o2:'Landing Page',ms1_o3:'Automation',ms1_o4:'Other',ms2_h:'Budget?',ms3_h:'When do you need it?',ms3_o1:'ASAP',ms3_o2:'1–2 weeks',ms3_o3:'1 month',ms3_o4:'Flexible',ms4_h:'Contact Info',msf_send:'Send Request',msf_back:'← Back',exit_h:'Free 15 min consultation',exit_p:'I will break down your task and give recommendations. No strings attached.',exit_cta:'Book via Telegram',roi_h:'Savings Calculator',roi_p:'How much you save with an AI agent',roi_l1:'Leads per month',roi_l2:'Time per lead, min',roi_l3:'Operator hourly rate, $',roi_res:'monthly savings with AI agent (60% automation)',ctx1:'Want results like these?',ctx1_btn:'Choose a package',ctx2:'Need a project like this?',ctx2_btn:'Discuss on Telegram',avail2:'Accepting 2 new projects',hl1:'projects',hl2:'hours/mo saved',hl3:'to MVP',hl4:'automation',pr1_anch:'Agency: ~$1500',pr2_anch:'Agency: ~$5000',pr3_anch:'Agency: ~$3000',g1:'Milestone payments',g2:'NDA on request',g3:'2 hour response',g4:'Free revisions',g5:'On-time delivery',copied:'Email copied',skip:'Skip to content',music_on:'Pause music',music_off:'Play music: Roxxy — Сомнения'}
};
let lang='ru';
function setLang(l){lang=l;const d=L[l];Q('[data-i]').forEach(e=>{const k=e.getAttribute('data-i');if(d[k])e.textContent=d[k]});$('lBtn').textContent=l.toUpperCase();D.documentElement.lang=l;D.querySelector('.skip').textContent=d.skip;$('mBtn').setAttribute('aria-label',playing?d.music_on:d.music_off);startTyp();setAvMonth();try{localStorage.setItem('ptyo_lang',l)}catch(e){}}
$('lBtn').onclick=()=>setLang(lang==='ru'?'en':'ru');

/* ══════ THEME ══════ */
let theme='dark';
function setTheme(t){theme=t;D.documentElement.setAttribute('data-theme',t);$('tIco').innerHTML=t==='light'?'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>':'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';try{localStorage.setItem('ptyo_theme',t)}catch(e){}}
$('tBtn').onclick=()=>setTheme(theme==='dark'?'light':'dark');
/* Restore prefs: theme, lang, and system preference */
try{
const st=localStorage.getItem('ptyo_theme');
if(st){setTheme(st)}
else if(matchMedia('(prefers-color-scheme:light)').matches){setTheme('light')}
const sl=localStorage.getItem('ptyo_lang');
if(sl){lang=sl;setLang(sl)}
else{const urlLang=new URLSearchParams(location.search).get('lang');if(urlLang==='en'){setLang('en')}else{const bl=(navigator.language||'').slice(0,2);if(bl==='en'){setLang('en')}}}
}catch(e){}
/* Listen for OS theme changes */
matchMedia('(prefers-color-scheme:light)').addEventListener('change',e=>{if(!localStorage.getItem('ptyo_theme')){setTheme(e.matches?'light':'dark')}});

/* ══════ MUSIC ══════ */
let playing=false,scW=null;
function scInit(){if(typeof SC==='undefined')return false;if(scW)return true;try{const fr=$('scFrame');if(!fr.src&&fr.dataset.src){fr.src=fr.dataset.src}scW=SC.Widget(fr);scW.bind(SC.Widget.Events.READY,function(){scW.setVolume(80)});scW.bind(SC.Widget.Events.PLAY,function(){playing=true;$('mBtn').classList.add('on');$('mBtn').setAttribute('aria-label',L[lang].music_on)});scW.bind(SC.Widget.Events.PAUSE,function(){playing=false;$('mBtn').classList.remove('on');$('mBtn').setAttribute('aria-label',L[lang].music_off)});scW.bind(SC.Widget.Events.FINISH,function(){scW.seekTo(0);scW.play()});return true}catch(e){return false}}
(function poll(n){if(scInit()||n>40)return;setTimeout(()=>poll(n+1),500)})(0);
$('mBtn').onclick=()=>{const fr=$('scFrame');if(!fr.src&&fr.dataset.src){fr.src=fr.dataset.src;setTimeout(()=>{if(scInit()&&scW)scW.play()},1500);return}if(!scW&&!scInit())return;playing?scW.pause():scW.play()};

/* ══════ TYPING ══════ */
const ttEl=$('tt');let tto;
function startTyp(){clearTimeout(tto);const lines=L[lang].typing;let li=0,ci=0,del=false;(function tick(){const ln=lines[li];if(!del){ttEl.textContent=ln.substring(0,ci+1);ci++;if(ci>=ln.length){del=true;tto=setTimeout(tick,2200);return}tto=setTimeout(tick,55)}else{ttEl.textContent=ln.substring(0,ci);ci--;if(ci<0){del=false;ci=0;li=(li+1)%lines.length;tto=setTimeout(tick,400);return}tto=setTimeout(tick,30)}})()}
startTyp();

/* ══════ ALMATY TIME ══════ */
function updateTime(){$('atimeVal').textContent='Алматы '+new Date().toLocaleTimeString('ru-RU',{timeZone:'Asia/Almaty',hour:'2-digit',minute:'2-digit'})}
updateTime();setInterval(updateTime,30000);

/* ══════ COUNTERS ══════ */
function animC(){Q('.ctr').forEach(e=>{const t=+e.dataset.t,s=performance.now();(function u(n){const p=Math.min((n-s)/1600,1);e.textContent=Math.round(t*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(u)})(s)})}
const sObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){animC();sObs.disconnect()}})},{threshold:.5});
const hsEl=D.querySelector('.hs');if(hsEl)sObs.observe(hsEl);

/* ══════ REVEAL ══════ */
const rObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis')})},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
Q('.rv').forEach(e=>rObs.observe(e));

/* ══════ METRICS COUNTER ANIMATION ══════ */
const mObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){Q('.metric-val').forEach(el=>{if(el.dataset.done)return;el.dataset.done='1';el.style.opacity='0';el.style.transform='translateY(12px)';setTimeout(()=>{el.style.transition='opacity .5s,transform .5s';el.style.opacity='1';el.style.transform='translateY(0)'},Math.random()*400)});mObs.disconnect()}})},{threshold:.3});
const mEl=D.querySelector('.metrics');if(mEl)mObs.observe(mEl);

/* ══════ ACTIVE NAV ON SCROLL ══════ */
const secs=['metrics','skills','process','exp','testimonials','cases','demo','pricing','faq','blog','contact'];
const navObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){Q('.etab').forEach(a=>a.setAttribute('aria-selected','false'));const a=D.querySelector(`.etab[data-sec="${x.target.id}"]`);if(a)a.setAttribute('aria-selected','true')}})},{threshold:.2,rootMargin:'-72px 0px -40% 0px'});
secs.forEach(id=>{const el=$(id);if(el)navObs.observe(el)});

/* ══════ SCROLL (rAF throttled) ══════ */
let ticking=false;
function onScroll(){
    if(!ticking){requestAnimationFrame(()=>{
        try{
        const h=D.documentElement.scrollHeight-innerHeight;
        $('spb').style.width=(scrollY/h*100)+'%';
        $('btt').classList.toggle('vis',scrollY>500);
        D.querySelector('nav').classList.toggle('scrolled',scrollY>20);
        checkProgress();
        checkFloats();
        }catch(e){}
        ticking=false;
    });ticking=true}
}
window.addEventListener('scroll',onScroll,{passive:true});

/* ══════ SECTION PROGRESS DOTS ══════ */
const spEl=$('secProgress');
Q('.sec-dot').forEach(d=>{
    d.onclick=()=>{const href=d.dataset.href;if(href)D.querySelector(href)?.scrollIntoView({behavior:'smooth'})};
    d.addEventListener('keydown',e=>{if(e.key==='Enter'){d.click()}});
    d.setAttribute('tabindex','0');d.setAttribute('role','button');
});
const secIds2=['metrics','skills','process','exp','testimonials','cases','demo','pricing','faq','contact'];
const dotObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){const idx=secIds2.indexOf(x.target.id);Q('.sec-dot').forEach((d,i)=>d.classList.toggle('active',i===idx))}})},{threshold:.15,rootMargin:'-72px 0px -40% 0px'});
secIds2.forEach(id=>{const el=$(id);if(el)dotObs.observe(el)});

/* Show progress dots after hero */
function checkProgress(){spEl.classList.toggle('vis',scrollY>400)}

/* ══════ STAGGERED REVEAL ══════ */
Q('.sg .sc, .cg2 .cc, .pricing-grid .price-card, .testimonials-grid .tcard, .metrics .metric-card').forEach((el,i)=>{
    el.style.transitionDelay=(i%4)*80+'ms';
});

/* ══════ FLOATING TG + STICKY CTA ══════ */
const ftg=$('floatTg'),sct=$('stickyCta');
let ftgShown=false,sctShown=false;
function checkFloats(){
    const show=scrollY>600;
    if(show!==ftgShown){ftgShown=show;ftg.classList.toggle('vis',show)}
    if(show!==sctShown){sctShown=show;sct.classList.toggle('vis',show)}
}

/* ══════ NAVIGATION ══════ */
$('btt').onclick=()=>scrollTo({top:0,behavior:'smooth'});
const logoEl=$('logoBtn');
logoEl.onclick=()=>scrollTo({top:0,behavior:'smooth'});
logoEl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();scrollTo({top:0,behavior:'smooth'})}});

/* ══════ COMMAND PALETTE ══════ */
const cmdSections=[
    {icon:'📊',label:'Результаты',href:'#metrics'},
    {icon:'💻',label:'Навыки',href:'#skills'},
    {icon:'🔄',label:'Процесс',href:'#process'},
    {icon:'💼',label:'Опыт',href:'#exp'},
    {icon:'💬',label:'Отзывы',href:'#testimonials'},
    {icon:'📁',label:'Кейсы',href:'#cases'},
    {icon:'🤖',label:'Демо',href:'#demo'},
    {icon:'💰',label:'Услуги',href:'#pricing'},
    {icon:'❓',label:'FAQ',href:'#faq'},
    {icon:'📝',label:'Блог',href:'#blog'},
    {icon:'📧',label:'Контакты',href:'#contact'},
    {icon:'🌙',label:'Сменить тему',action:'theme'},
    {icon:'🌐',label:'Сменить язык',action:'lang'},
    {icon:'📄',label:'Скачать CV',action:'cv'},
];
let cmdIdx=0;
function openCmd(){
    $('cmdOverlay').classList.add('vis');
    $('cmdInput').value='';
    $('cmdInput').focus();
    renderCmd('');
}
function closeCmd(){$('cmdOverlay').classList.remove('vis')}
function renderCmd(q){
    const res=$('cmdResults');
    const filtered=q?cmdSections.filter(s=>s.label.toLowerCase().includes(q.toLowerCase())):cmdSections;
    cmdIdx=0;
    res.innerHTML=filtered.map((s,i)=>`<div class="cmd-item${i===0?' active':''}" data-idx="${i}" onclick="execCmd(${i},'${q}')"><div class="cmd-ico">${s.icon}</div>${s.label}</div>`).join('');
}
function execCmd(idx,q){
    const filtered=q?cmdSections.filter(s=>s.label.toLowerCase().includes(q.toLowerCase())):cmdSections;
    const item=filtered[idx];if(!item)return;
    closeCmd();
    if(item.href){D.querySelector(item.href)?.scrollIntoView({behavior:'smooth'})}
    else if(item.action==='theme'){$('tBtn').click()}
    else if(item.action==='lang'){$('lBtn').click()}
    else if(item.action==='cv'){const a=D.querySelector('a[download]');if(a)a.click()}
}
$('cmdInput').oninput=e=>renderCmd(e.target.value);
$('cmdInput').onkeydown=e=>{
    const items=$('cmdResults').querySelectorAll('.cmd-item');
    if(e.key==='ArrowDown'){e.preventDefault();cmdIdx=Math.min(cmdIdx+1,items.length-1)}
    else if(e.key==='ArrowUp'){e.preventDefault();cmdIdx=Math.max(cmdIdx-1,0)}
    else if(e.key==='Enter'){e.preventDefault();execCmd(cmdIdx,$('cmdInput').value)}
    else if(e.key==='Escape'){closeCmd();return}
    else return;
    items.forEach((it,i)=>it.classList.toggle('active',i===cmdIdx));
    items[cmdIdx]?.scrollIntoView({block:'nearest'});
};
$('cmdOverlay').onclick=e=>{if(e.target===$('cmdOverlay'))closeCmd()};
D.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();$('cmdOverlay').classList.contains('vis')?closeCmd():openCmd()}});
$('cmdTrigger').addEventListener('click',openCmd);

/* ══════ THEME TRANSITION ══════ */
if(D.startViewTransition){
    const origSetTheme=setTheme;
    setTheme=function(t){
        D.startViewTransition(()=>origSetTheme(t));
    };
}

/* ══════ EXPANDABLE TABS ══════ */
Q('.etab').forEach(btn=>{
    btn.onclick=()=>{
        Q('.etab').forEach(b=>b.setAttribute('aria-selected','false'));
        btn.setAttribute('aria-selected','true');
        const href=btn.getAttribute('data-href');
        if(href)D.querySelector(href)?.scrollIntoView({behavior:'smooth'});
        $('etabs').classList.remove('open');$('ham').classList.remove('x');$('ham').setAttribute('aria-expanded','false');
    }
});

/* ══════ HAMBURGER + CLOSE ══════ */
$('ham').onclick=e=>{e.stopPropagation();const open=$('etabs').classList.toggle('open');$('ham').classList.toggle('x');$('ham').setAttribute('aria-expanded',String(open))};
D.addEventListener('click',e=>{const tabs=$('etabs'),ham=$('ham');if(!tabs.contains(e.target)&&!ham.contains(e.target)){tabs.classList.remove('open');ham.classList.remove('x');ham.setAttribute('aria-expanded','false')}});

/* ══════ KEYBOARD ══════ */
D.addEventListener('keydown',e=>{
    if(e.key==='Escape'){$('etabs').classList.remove('open');$('ham').classList.remove('x');$('ham').setAttribute('aria-expanded','false')}
    /* Konami: ↑↑↓↓←→←→BA */
    const seq=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
    if(e.code===seq[ki]){ki++;if(ki===seq.length){ki=0;fireConfetti()}}else if(seq.indexOf(e.code)===0){ki=1}else{ki=0}
});
let ki=0;

/* ══════ AUTO YEAR CALC ══════ */
(function(){const start=new Date(2022,2,1);const now=new Date();let yrs=now.getFullYear()-start.getFullYear();if(now.getMonth()<start.getMonth()||(now.getMonth()===start.getMonth()&&now.getDate()<start.getDate()))yrs--;const el=D.querySelector('.ctr[data-t="3"]');if(el)el.setAttribute('data-t',String(yrs))})();

/* ══════ CASE FILTERS ══════ */
Q('.cf-btn').forEach(btn=>{
    btn.onclick=()=>{
        Q('.cf-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const f=btn.dataset.filter;
        Q('.cc[data-cat]').forEach(card=>{
            if(f==='all'||card.dataset.cat===f){card.classList.remove('hide-case');card.style.display=''}
            else{card.classList.add('hide-case');setTimeout(()=>{if(card.classList.contains('hide-case'))card.style.display='none'},300)}
        });
    }
});

/* ══════ WHATSAPP MOCKUP ANIMATION ══════ */
const waMessages=[
    {type:'in',text:'Здравствуйте! Хотим заказать 50 кг курицы и 30 кг говядины. Есть в наличии?',delay:0},
    {type:'typing',delay:1200},
    {type:'bot',text:'Добрый день! Проверяю остатки в 1С...',delay:2000},
    {type:'bot',text:'✅ Курица: 120 кг в наличии\n✅ Говядина: 45 кг в наличии\n\nОтправить коммерческое предложение?',delay:3500},
    {type:'in',text:'Да, пришлите КП',delay:5500},
    {type:'typing',delay:6300},
    {type:'bot',text:'📄 КП сформировано и отправлено на email.\nСумма: 185 000 ₸\nСчёт в 1С создан автоматически.',delay:7200},
];
function runWaDemo(){
    const chat=$('waChat');if(!chat)return;
    chat.innerHTML='';
    waMessages.forEach((m,i)=>{
        setTimeout(()=>{
            if(m.type==='typing'){
                const el=D.createElement('div');el.className='wa-typing';el.style.animationDelay='0s';
                el.innerHTML='<span></span><span></span><span></span>';chat.appendChild(el);
                setTimeout(()=>el.remove(),800);
            }else{
                // Remove any typing indicator
                const typ=chat.querySelector('.wa-typing');if(typ)typ.remove();
                const el=D.createElement('div');
                el.className='wa-msg wa-msg-'+(m.type==='bot'?'bot':m.type);
                el.style.animationDelay='0s';
                const time=new Date();time.setMinutes(time.getMinutes()+i);
                const ts=time.toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'});
                el.innerHTML=m.text.replace(/\n/g,'<br>')+'<div class="wa-time">'+ts+'</div>';
                chat.appendChild(el);
                chat.scrollTop=chat.scrollHeight;
            }
        },m.delay);
    });
}
const waObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){runWaDemo();waObs.disconnect()}})},{threshold:.3});
const waEl=$('waMockup');if(waEl)waObs.observe(waEl);

/* ══════ FAQ KEYBOARD A11Y ══════ */
Q('.faq-q').forEach(q=>{
    q.setAttribute('tabindex','0');
    q.setAttribute('role','button');
    q.setAttribute('aria-expanded','false');
    q.addEventListener('keydown',e=>{
        if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();
        q.setAttribute('aria-expanded',q.parentElement.classList.contains('open')?'true':'false')}
    });
    q.addEventListener('click',()=>{
        q.setAttribute('aria-expanded',q.parentElement.classList.contains('open')?'true':'false');
    });
});

/* ══════ MULTI-STEP FORM ══════ */
let msfStep=1,msfData={};
function msfSelect(el){
    el.parentElement.querySelectorAll('.msf-opt').forEach(o=>o.classList.remove('selected'));
    el.classList.add('selected');
    const keys=['type','budget','timeline'];
    msfData[keys[msfStep-1]]=el.dataset.val;
    setTimeout(()=>msfNext(),300);
}
function msfNext(){
    if(msfStep>=4)return;
    $('ms'+msfStep).classList.remove('active');
    msfStep++;
    $('ms'+msfStep).classList.add('active');
    updateMsfBars();
    announce(L[lang]['ms'+msfStep+'_h']||'');
}
function msfBack(){
    if(msfStep<=1)return;
    $('ms'+msfStep).classList.remove('active');
    msfStep--;
    $('ms'+msfStep).classList.add('active');
    updateMsfBars();
}
function updateMsfBars(){
    for(let i=1;i<=4;i++){
        const b=$('mb'+i);
        b.className='msf-bar'+(i<msfStep?' done':'')+(i===msfStep?' active':'');
    }
}
$('msfSubmit').onclick=()=>{
    const name=$('msfName').value.trim();
    const contact=$('msfContact').value.trim();
    const msg=$('msfMsg').value.trim();
    if(!contact){$('msfContact').style.borderColor='var(--accent)';$('msfContact').focus();setTimeout(()=>$('msfContact').style.borderColor='',2000);return}
    $('msfSubmit').disabled=true;$('msfSubmit').textContent='...';
    const text=encodeURIComponent('Заявка с сайта:\nТип: '+(msfData.type||'-')+'\nБюджет: '+(msfData.budget||'-')+'\nСрок: '+(msfData.timeline||'-')+'\n'+(name?'Имя: '+name+'\n':'')+(contact?'Контакт: '+contact+'\n':'')+(msg?'Задача: '+msg:''));
    window.open('https://t.me/xCYRAXx1?text='+text,'_blank');
    Q('.msf-step').forEach(s=>s.classList.remove('active'));
    $('msfSuccess').classList.add('show');
    announce(L[lang].qf_ok||'Sent');
    setTimeout(()=>{$('msfSuccess').classList.remove('show');msfStep=1;$('ms1').classList.add('active');updateMsfBars();msfData={};Q('.msf-opt').forEach(o=>o.classList.remove('selected'));$('msfName').value='';$('msfContact').value='';$('msfMsg').value='';$('msfSubmit').disabled=false;$('msfSubmit').textContent=L[lang].msf_send||'Отправить заявку'},5000);
};
Q('[data-msf-select]').forEach(el=>el.addEventListener('click',()=>msfSelect(el)));
Q('[data-msf-back]').forEach(el=>el.addEventListener('click',()=>msfBack()));

/* ══════ SOCIAL PROOF TOASTS ══════ */
const spItems=[
    {ava:'🍽',text:'<strong>Ресторатор из Алматы</strong> заказал AI-агента для WhatsApp',time:'12 мин назад'},
    {ava:'📊',text:'<strong>Финансовая компания</strong> запустила автоматизацию amoCRM + 1С',time:'34 мин назад'},
    {ava:'🚀',text:'<strong>Стартап из Дубая</strong> заказал 3 лендинга за неделю',time:'1 час назад'},
    {ava:'💬',text:'<strong>E-commerce из Астаны</strong> подключил AI-поддержку',time:'2 часа назад'},
    {ava:'🏢',text:'<strong>Консалтинговая фирма</strong> заказала LinkedIn AI-агента',time:'3 часа назад'},
];
let spIdx=0,spTimer;
function showSp(){
    const t=$('spToast'),item=spItems[spIdx];
    $('spAva').textContent=item.ava;
    $('spText').innerHTML=item.text;
    $('spTime').textContent=item.time;
    t.classList.add('vis');
    setTimeout(()=>t.classList.remove('vis'),5000);
    spIdx=(spIdx+1)%spItems.length;
}
setTimeout(()=>{showSp();spTimer=setInterval(showSp,25000)},8000);

/* ══════ EXIT-INTENT POPUP ══════ */
let exitShown=false;
function closeExit(){$('exitOverlay').classList.remove('vis');$('exitOverlay').style.display='none'}
$('exitClose').addEventListener('click',closeExit);
$('exitCta').addEventListener('click',closeExit);
$('spClose').addEventListener('click',()=>$('spToast').classList.remove('vis'));
D.addEventListener('mouseleave',e=>{
    if(e.clientY<0&&!exitShown&&!sessionStorage.getItem('exitShown')){
        exitShown=true;sessionStorage.setItem('exitShown','1');
        $('exitOverlay').style.display='flex';
        setTimeout(()=>$('exitOverlay').classList.add('vis'),10);
    }
});
$('exitOverlay').onclick=e=>{if(e.target===$('exitOverlay'))closeExit()};

/* ══════ ROI CALCULATOR ══════ */
function calcRoi(){
    const leads=+$('roiLeadsR').value;
    const time=+$('roiTimeR').value;
    const rate=+$('roiRateR').value;
    $('roiLeads').textContent=leads;
    $('roiTime').textContent=time;
    $('roiRate').textContent=rate;
    $('roiLeadsR').setAttribute('aria-valuenow',leads);
    $('roiTimeR').setAttribute('aria-valuenow',time);
    $('roiRateR').setAttribute('aria-valuenow',rate);
    const save=Math.round(leads*time/60*rate*0.6);
    $('roiSave').textContent='$'+save.toLocaleString();
}
['roiLeadsR','roiTimeR','roiRateR'].forEach(id=>{
    $(id).addEventListener('input',calcRoi);
});
calcRoi();

/* ══════ AVAILABILITY MONTH ══════ */
const months={ru:['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'],en:['January','February','March','April','May','June','July','August','September','October','November','December']};
function setAvMonth(){const m=new Date().getMonth();$('avMonth').textContent=months[lang]?months[lang][m]:''}
setAvMonth();

/* ══════ ARIA ANNOUNCE ══════ */
function announce(msg){const el=$('ariaLive');if(el){el.textContent='';setTimeout(()=>{el.textContent=msg},100)}}

/* ══════ EMAIL COPY TOAST ══════ */
$('emailLink').addEventListener('click',e=>{
    if(navigator.clipboard){e.preventDefault();navigator.clipboard.writeText('pavelte382@gmail.com').then(()=>{showToast(L[lang].copied)})}
});
function showToast(msg){const t=$('toast');t.textContent=msg;t.classList.add('vis');setTimeout(()=>t.classList.remove('vis'),2000)}

/* Quick form replaced by multi-step form */

/* ══════ SKILL BARS ANIMATION ══════ */
const skillPcts=[95,85,92,75,90,80,88,82,85,85];
Q('.sc .tags').forEach((t,i)=>{
    const bar=D.createElement('div');bar.className='skill-bar';
    bar.innerHTML='<div class="skill-bar-fill" style="--fill:'+(skillPcts[i]||80)+'%"></div>';
    t.after(bar);
});
const skObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){Q('.skill-bar-fill').forEach(bar=>bar.classList.add('animated'));skObs.disconnect()}})},{threshold:.2});
const skEl=D.querySelector('#skills');if(skEl)skObs.observe(skEl);

/* ══════ PHONE COPY ══════ */
const phoneEl=$('phoneLink');
if(phoneEl){phoneEl.addEventListener('click',e=>{
    if(navigator.clipboard&&innerWidth>768){e.preventDefault();navigator.clipboard.writeText('+77072448745').then(()=>showToast(L[lang].phone_copied||'Номер скопирован'))}
})}

/* ══════ 3D TILT ══════ */
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
Q('.tilt').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(600px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-3px)`;el.style.transition='transform .1s'});
    el.addEventListener('mouseleave',()=>{el.style.transform='';el.style.transition='transform .4s'})
})}

/* ══════ CURSOR GLOW (addEventListener, not onmousemove) ══════ */
const cgEl=$('cg');
if(matchMedia('(pointer:fine)').matches){
let mx=0,my=0,cx=0,cy=0;
D.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cgEl.classList.add('on')});
D.addEventListener('mouseleave',()=>cgEl.classList.remove('on'));
(function glowTick(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;cgEl.style.transform=`translate(${cx-150}px,${cy-150}px)`;requestAnimationFrame(glowTick)})()
}

/* ══════ CONFETTI ══════ */
function fireConfetti(){const cont=D.createElement('div');cont.className='confetti';D.body.appendChild(cont);const colors=['#6366f1','#818cf8','#34d399','#fbbf24','#f472b6','#60a5fa'];for(let i=0;i<80;i++){const p=D.createElement('div');p.className='confetti-piece';p.style.left=Math.random()*100+'%';p.style.animationDelay=Math.random()*2+'s';p.style.animationDuration=(2+Math.random()*2)+'s';p.style.background=colors[Math.floor(Math.random()*colors.length)];p.style.borderRadius=Math.random()>.5?'50%':'2px';p.style.width=(6+Math.random()*8)+'px';p.style.height=(6+Math.random()*8)+'px';cont.appendChild(p)}
setTimeout(()=>cont.remove(),5000);
const msg=D.createElement('div');msg.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;background:var(--card);border:2px solid var(--accent);border-radius:16px;padding:32px 48px;text-align:center;font-size:20px;font-weight:700;box-shadow:0 20px 60px rgba(0,0,0,.4);animation:fu .5s ease-out';
const title=D.createElement('span');title.textContent='Achievement Unlocked!';
const sub=D.createElement('br');
const detail=D.createElement('span');detail.style.cssText='font-size:14px;font-weight:400;color:var(--t2)';detail.textContent='Konami Code!';
msg.append('🎮 ',title,sub,detail);
D.body.appendChild(msg);setTimeout(()=>msg.remove(),3000)}

/* ══════ FAQ DELEGATION ══════ */
Q('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
        q.parentElement.classList.toggle('open');
        q.setAttribute('aria-expanded',q.parentElement.classList.contains('open'));
    });
    q.addEventListener('keydown',e=>{
        if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click()}
    });
});
