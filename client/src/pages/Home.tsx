import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Clapperboard,
  Globe2,
  GraduationCap,
  Lightbulb,
  Mail,
  Menu,
  Megaphone,
  Palette,
  PenTool,
  Presentation,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import NeuralField from "@/components/NeuralField";

type Locale = "ar" | "en";

const copy = {
  ar: {
    nav: { about: "من أنا", skills: "مجالاتي", work: "الأعمال", contact: "تواصل" },
    hero: {
      eyebrow: "ذكاء إبداعي · تصميم رقمي · ابتكار",
      titleA: "الإبداع يلتقي",
      titleB: "بالتكنولوجيا.",
      description: "أحوّل الأفكار إلى تجارب رقمية تنبض بالحياة.",
      cta: "استكشف أعمالي",
      contact: "تواصل معي",
      scroll: "اكتشف المزيد",
      badge: "مساحة للأفكار القادمة",
    },
    about: {
      kicker: "01 / من أنا",
      title: "أفكر في الإمكانات، وأصمم ما يجعلها أقرب.",
      body: "مهتم ومبدع في مجال الذكاء الاصطناعي التوليدي، والتصميم الرقمي، وصناعة المحتوى الإبداعي، وتطوير الأفكار والحلول التقنية.",
      visionLabel: "رؤيتي",
      vision: "توظيف تقنيات الذكاء الاصطناعي والتكنولوجيا الحديثة لتحويل الأفكار الإبداعية إلى مشاريع وحلول رقمية مبتكرة.",
      education: "اقتصاد ومصارف إسلامية",
      university: "جامعة اليرموك · خريج 2025",
      note: "التفاصيل الإضافية تُستكمل من الملفات الأصلية.",
    },
    skills: {
      kicker: "02 / مجالات الاهتمام",
      title: "مساحات أستكشفها",
      intro: "مجالات اهتمام إبداعية وتقنية، وليست ادعاءً بخبرة مثبتة ما لم تدعمها الأعمال والملفات.",
      items: [
        "الذكاء الاصطناعي التوليدي",
        "صناعة المحتوى بالذكاء الاصطناعي",
        "تصميم الصور والإعلانات",
        "إنتاج الفيديو باستخدام AI",
        "التصميم الإبداعي والهوية البصرية",
        "التسويق الرقمي",
        "إعداد العروض التقديمية",
        "تطوير الأفكار والمشاريع الرقمية",
        "التحليل الاقتصادي والمالي",
      ],
    },
    work: {
      kicker: "03 / معرض الأعمال",
      title: "أعمال حقيقية، لا ضجيج.",
      intro: "سيُبنى هذا المعرض من ملفاتك الأصلية وتصنيفات مجلداتك، مع الحفاظ على الوسائط دون اختلاق أعمال أو صور بديلة.",
      waiting: "بانتظار ملفات المشاريع الأصلية",
      waitingNote: "تُضاف الفئات والتفاصيل بعد التحقق من مواد Drive.",
      view: "عرض التفاصيل",
      modalClose: "إغلاق",
    },
    concepts: {
      kicker: "04 / أفكار ومشاريع",
      title: "الفكرة أولًا، والحالة بوضوح.",
      intro: "تُعرض المقترحات منفصلة عن الأعمال المنفذة بعد التأكد من حالتها في الملفات.",
    },
    contact: {
      kicker: "05 / تواصل",
      title: "لنجعل الفكرة بداية.",
      intro: "يمكنك إعداد رسالتك هنا؛ سيفتح الموقع تطبيق البريد بعد إضافة عنوان التواصل الموثّق من ملفاتك.",
      name: "الاسم",
      email: "بريدك الإلكتروني",
      message: "رسالتك",
      namePlaceholder: "كيف أناديك؟",
      emailPlaceholder: "name@example.com",
      messagePlaceholder: "أخبرني عن الفكرة أو المشروع...",
      send: "إعداد الرسالة",
      emailMissing: "لم يظهر بريد التواصل في المواد المتاحة بعد؛ لن أضع عنوانًا غير موثق.",
      fillFields: "يرجى تعبئة الحقول المطلوبة بشكل صحيح.",
      prepared: "تم تجهيز الرسالة في تطبيق البريد.",
      emailLabel: "البريد الإلكتروني",
      noSocial: "روابط التواصل تُضاف عند توفرها في الملفات.",
    },
    footer: "الإبداع يلتقي بالتكنولوجيا، والأفكار تتحول إلى واقع.",
    utility: { language: "English", soundOn: "إيقاف الصوت", soundOff: "تشغيل الصوت", motionOn: "تقليل الحركة", motionOff: "استعادة الحركة", systemMotion: "تقليل الحركة مفعل من إعدادات الجهاز", skip: "تخطي المقدمة", menu: "فتح القائمة", closeMenu: "إغلاق القائمة" },
  },
  en: {
    nav: { about: "About", skills: "Interests", work: "Work", contact: "Contact" },
    hero: {
      eyebrow: "Creative intelligence · Digital design · Innovation",
      titleA: "Where creativity",
      titleB: "meets technology.",
      description: "Turning ideas into digital experiences that feel alive.",
      cta: "Explore work",
      contact: "Get in touch",
      scroll: "Discover more",
      badge: "A space for what comes next",
    },
    about: {
      kicker: "01 / About me",
      title: "I think in possibilities, then design ways to bring them closer.",
      body: "Interested in and creating around generative AI, digital design, creative content, and the development of ideas and technology solutions.",
      visionLabel: "My vision",
      vision: "Using AI and modern technology to turn creative ideas into innovative digital projects and solutions.",
      education: "Economics & Islamic Banking",
      university: "Yarmouk University · Graduated 2025",
      note: "Additional details will be completed from the original files.",
    },
    skills: {
      kicker: "02 / Areas of interest",
      title: "Fields I explore",
      intro: "Creative and technical areas of interest—not claims of proven expertise unless supported by the original work and files.",
      items: [
        "Generative AI",
        "AI-assisted content creation",
        "Image and ad design",
        "AI video production",
        "Creative design & visual identity",
        "Digital marketing",
        "Presentation design",
        "Digital ideas & projects",
        "Economic and financial analysis",
      ],
    },
    work: {
      kicker: "03 / Selected work",
      title: "Real work, no noise.",
      intro: "This portfolio will be built from your original files and folder categories, without invented work or replacement images.",
      waiting: "Waiting for original project files",
      waitingNote: "Categories and project details will be added after reviewing the Drive materials.",
      view: "View details",
      modalClose: "Close",
    },
    concepts: {
      kicker: "04 / Ideas & projects",
      title: "Ideas first. Status made clear.",
      intro: "Proposals will be kept separate from completed work after their status is confirmed in the files.",
    },
    contact: {
      kicker: "05 / Contact",
      title: "Let an idea be the beginning.",
      intro: "You can prepare a message here; the site will open your email app once the verified contact address from your files is added.",
      name: "Name",
      email: "Your email",
      message: "Message",
      namePlaceholder: "What should I call you?",
      emailPlaceholder: "name@example.com",
      messagePlaceholder: "Tell me about the idea or project...",
      send: "Prepare message",
      emailMissing: "A contact email has not appeared in the available materials; I will not invent one.",
      fillFields: "Please complete the required fields correctly.",
      prepared: "Your message is ready in your email app.",
      emailLabel: "Email",
      noSocial: "Social links will be added if they appear in the files.",
    },
    footer: "Where Creativity Meets Technology, Ideas Become Reality.",
    utility: { language: "العربية", soundOn: "Turn sound off", soundOff: "Turn sound on", motionOn: "Reduce motion", motionOff: "Restore motion", systemMotion: "Reduced motion is set by your device", skip: "Skip intro", menu: "Open menu", closeMenu: "Close menu" },
  },
} as const;

const verifiedEmail: string | null = null;

const skillIcons = [
  Sparkles,
  Lightbulb,
  PenTool,
  Clapperboard,
  Palette,
  Megaphone,
  Presentation,
  Sparkles,
  BarChart3,
];

function Monogram() {
  return (
    <span className="brand-mark" aria-label="MAS">
      <span className="brand-mark__letters">M<span>A</span>S</span>
      <i className="brand-mark__orbit" />
    </span>
  );
}

function Intro({ locale, onSkip, label, reduceMotion }: { locale: Locale; onSkip: () => void; label: string; reduceMotion: boolean }) {
  return (
    <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
      <NeuralField reduceMotion={reduceMotion} />
      <div className="intro-screen__content">
        <div className="intro-emblem"><Monogram /></div>
        <span className="eyebrow">AI &amp; DIGITAL CREATIVE</span>
        <h2 className="intro-title">MAHDI <span>AL-SAQQAR</span></h2>
        <div className="intro-loader"><i /></div>
        <button className="intro-skip" type="button" onClick={onSkip}>{label}<ArrowUpRight size={14} /></button>
      </div>
      <span className="intro-corner">{locale === "ar" ? "تجربة رقمية إبداعية" : "A digital creative experience"}</span>
    </motion.div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [userReducedMotion, setUserReducedMotion] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [formStatus, setFormStatus] = useState("");
  const audioRef = useRef<{ context: AudioContext; gain: GainNode; oscillators: OscillatorNode[] } | null>(null);
  const reducedMotion = userReducedMotion || systemReducedMotion;
  const t = copy[locale];
  const direction = locale === "ar" ? "rtl" : "ltr";
  const sections = useMemo(() => [
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "work", label: t.nav.work },
    { id: "contact", label: t.nav.contact },
  ], [t]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSystemPreference = () => setSystemReducedMotion(media.matches);
    updateSystemPreference();
    media.addEventListener("change", updateSystemPreference);
    try {
      const saved = localStorage.getItem("mahdi-motion-preference");
      if (saved === "reduced") setUserReducedMotion(true);
    } catch { /* storage is optional */ }
    setMotionReady(true);
    return () => media.removeEventListener("change", updateSystemPreference);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("motion-reduced", reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!motionReady) return;
    try {
      if (sessionStorage.getItem("mahdi-intro-seen") || reducedMotion) {
        setIntroVisible(false);
        return;
      }
      setIntroVisible(true);
      const timer = window.setTimeout(() => {
        setIntroVisible(false);
        sessionStorage.setItem("mahdi-intro-seen", "true");
      }, 1550);
      return () => window.clearTimeout(timer);
    } catch {
      return;
    }
  }, [motionReady, reducedMotion]);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => () => {
    audioRef.current?.oscillators.forEach((oscillator) => {
      try { oscillator.stop(); } catch { /* already stopped */ }
    });
    void audioRef.current?.context.close();
  }, []);

  const closeIntro = () => {
    setIntroVisible(false);
    try { sessionStorage.setItem("mahdi-intro-seen", "true"); } catch { /* storage is optional */ }
  };

  const toggleMotion = () => {
    if (systemReducedMotion) return;
    const next = !userReducedMotion;
    setUserReducedMotion(next);
    try { localStorage.setItem("mahdi-motion-preference", next ? "reduced" : "full"); } catch { /* storage is optional */ }
  };

  const toggleAmbient = async () => {
    if (audioRef.current) {
      const current = audioRef.current;
      current.gain.gain.setTargetAtTime(0, current.context.currentTime, 0.18);
      window.setTimeout(() => {
        current.oscillators.forEach((oscillator) => {
          try { oscillator.stop(); } catch { /* already stopped */ }
        });
        void current.context.close();
      }, 900);
      audioRef.current = null;
      setAmbientOn(false);
      return;
    }
    try {
      const context = new window.AudioContext();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.setTargetAtTime(0.018, context.currentTime, 0.7);
      filter.connect(gain);
      gain.connect(context.destination);
      const oscillators = [110, 164.81].map((frequency, index) => {
        const oscillator = context.createOscillator();
        oscillator.type = index === 0 ? "sine" : "triangle";
        oscillator.frequency.value = frequency;
        oscillator.detune.value = index === 0 ? -3 : 4;
        oscillator.connect(filter);
        oscillator.start();
        return oscillator;
      });
      audioRef.current = { context, gain, oscillators };
      setAmbientOn(true);
    } catch {
      setAmbientOn(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!verifiedEmail) {
      setFormStatus(t.contact.emailMissing);
      return;
    }
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const sender = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${sender}`);
    window.location.href = `mailto:${verifiedEmail}?subject=${subject}&body=${body}`;
    setFormStatus(t.contact.prepared);
    form.reset();
  };

  const reveal = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className={`portfolio-site ${locale === "ar" ? "is-rtl" : "is-ltr"}`} dir={direction} onPointerMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="ambient-cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} aria-hidden="true"><i /></div>

      <AnimatePresence>{introVisible && <Intro locale={locale} onSkip={closeIntro} label={t.utility.skip} reduceMotion={reducedMotion} />}</AnimatePresence>

      <header className="site-header">
        <a className="brand-lockup" href="#home" aria-label="MAHDI AL-SAQQAR home" onClick={() => setMenuOpen(false)}>
          <Monogram />
          <span className="brand-lockup__name">MAHDI <b>AL-SAQQAR</b></span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
          {sections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>
              <span className="nav-number">0{index + 1}</span>{section.label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <button className="utility-button language-button" type="button" onClick={() => setLocale(locale === "ar" ? "en" : "ar")} aria-label={t.utility.language}>
            <Globe2 size={15} /><span>{t.utility.language}</span>
          </button>
          <button className="utility-button motion-button" type="button" onClick={toggleMotion} aria-label={systemReducedMotion ? t.utility.systemMotion : reducedMotion ? t.utility.motionOff : t.utility.motionOn} aria-pressed={reducedMotion} disabled={systemReducedMotion}>
            <Sparkles size={15} /><span>{reducedMotion ? t.utility.motionOff : t.utility.motionOn}</span>
          </button>
          <button className="utility-button sound-button" type="button" onClick={toggleAmbient} aria-label={ambientOn ? t.utility.soundOn : t.utility.soundOff} aria-pressed={ambientOn}>
            {ambientOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{ambientOn ? t.utility.soundOn : t.utility.soundOff}</span>
          </button>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? t.utility.closeMenu : t.utility.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-backdrop" aria-hidden="true" />
          <NeuralField reduceMotion={reducedMotion} />
          <div className="hero-side-label" aria-hidden="true"><span>AI</span><i />{locale === "ar" ? "الابتكار الرقمي" : "DIGITAL INNOVATION"}</div>
          <div className="hero-content">
            <motion.div className="hero-copy" initial={reducedMotion ? false : { opacity: 0, x: locale === "ar" ? 26 : -26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.12 }}>
              <span className="eyebrow"><i className="eyebrow-dot" />{t.hero.eyebrow}</span>
              <div className="hero-name">MAHDI <span>AL-SAQQAR</span></div>
              <h1><span>{t.hero.titleA}</span><br /><em>{t.hero.titleB}</em></h1>
              <p className="hero-description">{t.hero.description}</p>
              <div className="hero-ctas">
                <a className="button button--gold" href="#work"><span>{t.hero.cta}</span><ArrowUpRight size={17} /></a>
                <a className="button button--text" href="#contact"><span>{t.hero.contact}</span><ArrowUpRight size={17} /></a>
              </div>
              <div className="hero-index"><span>01</span><i />{t.hero.badge}</div>
            </motion.div>
            <motion.div className="hero-art" initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.15, delay: 0.22 }} aria-hidden="true">
              <div className="art-orbit art-orbit--outer"><span /></div>
              <div className="art-orbit art-orbit--inner"><span /></div>
              <div className="art-core"><div className="art-core__ring" /><div className="art-core__monogram">MAS</div><span className="art-core__spark art-core__spark--one" /><span className="art-core__spark art-core__spark--two" /></div>
              <div className="art-coordinate art-coordinate--top">GENERATIVE / AI</div>
              <div className="art-coordinate art-coordinate--bottom">DIGITAL / INNOVATION</div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#about"><span>{t.hero.scroll}</span><span className="scroll-cue__line"><i /></span><ArrowDown size={13} /></a>
          <span className="hero-footer-label">MAHDI AL-SAQQAR <span>·</span> AI &amp; GENERATIVE DESIGN</span>
        </section>

        <section className="about-section section-shell" id="about">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }}>
            <span className="section-kicker">{t.about.kicker}</span>
            <span className="section-rule" />
          </motion.div>
          <div className="about-layout">
            <motion.div className="about-title-block" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <h2>{t.about.title}</h2>
              <p className="about-intro">{t.about.body}</p>
            </motion.div>
            <motion.div className="about-details" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <div className="detail-card detail-card--vision">
                <span className="detail-icon"><Sparkles size={17} /></span>
                <span className="detail-label">{t.about.visionLabel}</span>
                <p>{t.about.vision}</p>
              </div>
              <div className="detail-card detail-card--education">
                <span className="detail-icon"><GraduationCap size={18} /></span>
                <span className="detail-label">{locale === "ar" ? "التعليم" : "Education"}</span>
                <strong>{t.about.education}</strong>
                <span className="detail-subtitle">{t.about.university}</span>
              </div>
              <p className="source-note">{t.about.note}</p>
            </motion.div>
          </div>
        </section>

        <section className="skills-section section-shell" id="skills">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <span className="section-kicker">{t.skills.kicker}</span>
            <span className="section-rule" />
          </motion.div>
          <div className="section-title-row">
            <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>{t.skills.title}</motion.h2>
            <p>{t.skills.intro}</p>
          </div>
          <div className="skills-grid">
            {t.skills.items.map((skill, index) => {
              const Icon = skillIcons[index];
              return (
                <motion.article className="skill-card" key={skill} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ delay: index * 0.045 }} whileHover={reducedMotion ? undefined : { y: -6, rotateX: 3, rotateY: index % 2 ? -2 : 2 }}>
                  <span className="skill-card__index">0{index + 1}</span>
                  <span className="skill-card__icon"><Icon size={19} strokeWidth={1.5} /></span>
                  <h3>{skill}</h3>
                  <span className="skill-card__glow" aria-hidden="true" />
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="work-section section-shell" id="work">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <span className="section-kicker">{t.work.kicker}</span>
            <span className="section-rule" />
          </motion.div>
          <div className="section-title-row work-title-row">
            <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>{t.work.title}</motion.h2>
            <p>{t.work.intro}</p>
          </div>
          <motion.div className="work-empty" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
            <div className="work-empty__orbit"><div className="work-empty__core"><Monogram /></div><i /><b /></div>
            <div className="work-empty__text">
              <span className="work-empty__eyebrow">{locale === "ar" ? "المجموعة قيد التجهيز" : "COLLECTION IN PROGRESS"}</span>
              <h3>{t.work.waiting}</h3>
              <p>{t.work.waitingNote}</p>
            </div>
            <span className="work-empty__serial">MAS / 03</span>
          </motion.div>
        </section>

        <section className="concept-section section-shell" id="ideas">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <span className="section-kicker">{t.concepts.kicker}</span>
            <span className="section-rule" />
          </motion.div>
          <div className="concept-band">
            <div className="concept-symbol"><Lightbulb size={24} strokeWidth={1.2} /></div>
            <div className="concept-copy"><h2>{t.concepts.title}</h2><p>{t.concepts.intro}</p></div>
            <span className="concept-mark">IDEA → FORM</span>
          </div>
        </section>

        <section className="contact-section section-shell" id="contact">
          <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <span className="section-kicker">{t.contact.kicker}</span>
            <span className="section-rule" />
          </motion.div>
          <div className="contact-layout">
            <motion.div className="contact-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <span className="contact-orbit" aria-hidden="true"><Mail size={24} strokeWidth={1.2} /></span>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.intro}</p>
              <div className="contact-info">
                <span className="contact-info__label">{t.contact.emailLabel}</span>
                <span className="contact-info__value">{verifiedEmail || t.contact.emailMissing}</span>
                {!verifiedEmail && <span className="contact-info__note">{t.contact.noSocial}</span>}
              </div>
            </motion.div>
            <motion.form className="contact-form" onSubmit={onSubmit} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
              <label>{t.contact.name}<input type="text" name="name" placeholder={t.contact.namePlaceholder} autoComplete="name" required /></label>
              <label>{t.contact.email}<input type="email" name="email" placeholder={t.contact.emailPlaceholder} autoComplete="email" required /></label>
              <label>{t.contact.message}<textarea name="message" placeholder={t.contact.messagePlaceholder} rows={4} required /></label>
              <div className="contact-form__footer">
                <button className="button button--gold" type="submit"><span>{t.contact.send}</span><Send size={15} /></button>
                <span className="contact-form__hint">{formStatus || t.contact.emailMissing}</span>
              </div>
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand-lockup" href="#home"><Monogram /><span className="brand-lockup__name">MAHDI <b>AL-SAQQAR</b></span></a>
        <p>{t.footer}</p>
        <a className="back-top" href="#home" aria-label={locale === "ar" ? "العودة إلى الأعلى" : "Back to top"}>{locale === "ar" ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}</a>
        <span className="copyright">© {new Date().getFullYear()} · MAHDI AL-SAQQAR</span>
      </footer>

      <div className="floating-orb floating-orb--gold" aria-hidden="true" />
      <div className="floating-orb floating-orb--blue" aria-hidden="true" />
    </div>
  );
}
