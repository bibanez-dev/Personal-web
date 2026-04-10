
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronUp,
  Cpu,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

type Language = 'es' | 'en';
type TranslationMap = Record<string, { es: string; en: string }>;

const translations: TranslationMap = {
  nav_about: { es: 'Sobre mi', en: 'About' },
  nav_exp: { es: 'Experiencia', en: 'Experience' },
  nav_projects: { es: 'Proyectos', en: 'Projects' },
  nav_skills: { es: 'Skills', en: 'Skills' },
  nav_edu: { es: 'Formacion', en: 'Education' },
  nav_social: { es: 'Social', en: 'Social' },
  nav_contact: { es: 'Contacto', en: 'Contact' },
  hero_status: {
    es: 'La Plata, Buenos Aires - Disponible para colaborar',
    en: 'La Plata, Buenos Aires - Open to collaborate',
  },
  hero_title: { es: 'Benjamin Ibanez', en: 'Benjamin Ibanez' },
  hero_role: {
    es: 'VP Senior Service Manager - CitiService',
    en: 'VP Senior Service Manager - CitiService',
  },
  hero_desc: {
    es: 'Lidero excelencia operativa y transformacion digital en servicios financieros corporativos, con foco estrategico en adopcion de IA Generativa.',
    en: 'I lead operational excellence and digital transformation in corporate financial services, with a strategic focus on Generative AI adoption.',
  },
  hero_cta_primary: { es: 'Contactar', en: 'Contact' },
  hero_cta_secondary: { es: 'Ver LinkedIn', en: 'View LinkedIn' },
  hero_card_title: { es: 'Perfil profesional', en: 'Professional profile' },
  section_about_title: { es: 'Sobre mi', en: 'About me' },
  section_about_sub: {
    es: 'Estrategia, operaciones y adopcion de IA para negocio real.',
    en: 'Strategy, operations, and AI adoption for real business impact.',
  },
  about_p1: {
    es: 'Como VP Senior Service Manager en CitiService, optimizo la experiencia de clientes corporativos con modelos operativos claros, medibles y escalables.',
    en: 'As a VP Senior Service Manager at CitiService, I optimize the corporate client experience through clear, measurable, and scalable operating models.',
  },
  about_p2: {
    es: 'Hoy impulso iniciativas internas de GenAI para transformar procesos tradicionales en flujos inteligentes y automatizados.',
    en: 'I currently drive internal GenAI initiatives that transform traditional processes into intelligent and automated workflows.',
  },
  about_p3: {
    es: 'Me enfoco en combinar la robustez de la banca global con una mentalidad de producto moderna y ejecucion pragmatica.',
    en: 'I focus on combining global banking robustness with a modern product mindset and pragmatic execution.',
  },
  section_exp_title: { es: 'Experiencia', en: 'Experience' },
  section_exp_sub: {
    es: 'Trayectoria en operaciones, servicio corporativo y liderazgo.',
    en: 'Background in operations, corporate service, and leadership.',
  },
  section_projects_title: { es: 'Proyectos', en: 'Projects' },
  section_projects_sub: {
    es: 'Iniciativas orientadas a impacto, innovacion y producto.',
    en: 'Initiatives focused on impact, innovation, and product.',
  },
  section_skills_title: { es: 'Skills', en: 'Skills' },
  section_skills_sub: {
    es: 'Capacidades clave para construir y escalar resultados.',
    en: 'Core capabilities to build and scale outcomes.',
  },
  section_edu_title: { es: 'Formacion y certificaciones', en: 'Education and certifications' },
  section_edu_sub: {
    es: 'Base academica y aprendizaje continuo orientado a negocio.',
    en: 'Academic foundation and continuous learning focused on business.',
  },
  section_social_title: { es: 'Presencia digital', en: 'Digital presence' },
  section_social_sub: {
    es: 'Canales para contenido profesional, cultura e innovacion.',
    en: 'Channels for professional, culture, and innovation content.',
  },
  section_contact_title: { es: 'Contacto', en: 'Contact' },
  section_contact_sub: {
    es: 'Si queres conversar sobre transformacion, IA o producto, hablemos.',
    en: 'If you want to discuss transformation, AI, or product, let us connect.',
  },
  footer_copy: { es: '(c) 2026 - Buenos Aires', en: '(c) 2026 - Buenos Aires' },
  footer_top: { es: 'Volver arriba', en: 'Back to top' },
};

const sections = ['about', 'exp', 'projects', 'skills', 'edu', 'social', 'contact'] as const;

interface SkillBarProps {
  label: string;
  percentage: number;
  animate: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ label, percentage, animate }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="text-xs font-bold text-brand-700">{percentage}%</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 transition-all duration-1000 ease-out"
        style={{ width: animate ? `${percentage}%` : '0%' }}
      />
    </div>
  </div>
);

const SectionHeading: React.FC<{ title: string; subtitle: string; align?: 'left' | 'center' }> = ({
  title,
  subtitle,
  align = 'left',
}) => (
  <div className={`mb-12 space-y-3 ${align === 'center' ? 'text-center' : ''}`}>
    <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
    <p
      className={`text-pretty text-base text-slate-600 md:text-lg ${
        align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
      }`}
    >
      {subtitle}
    </p>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.25 },
    );
    const target = skillsRef.current;
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const t = (key: string) => (translations[key] ? translations[key][lang] : key);
  const closeMenu = () => setIsMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const metrics = [
    { value: '10+', es: 'anos de experiencia', en: 'years of experience' },
    { value: '500+', es: 'clientes corporativos', en: 'corporate clients' },
    { value: '15+', es: 'proyectos GenAI', en: 'GenAI projects' },
    { value: '2', es: 'ventures activas', en: 'active ventures' },
  ];

  const aboutTags = [
    'Client Optimization',
    'Operating Models',
    'GenAI Adoption',
    'Corporate Banking',
    'Entrepreneurship',
    'Business Strategy',
    'Global Mindset',
    'ES / EN',
  ];

  const infoRows = [
    { label: { es: 'Empresa', en: 'Company' }, value: 'Citi Argentina' },
    { label: { es: 'Rol', en: 'Role' }, value: 'VP Senior Service Manager' },
    { label: { es: 'Area', en: 'Area' }, value: 'CitiService' },
    { label: { es: 'Ubicacion', en: 'Location' }, value: 'La Plata, Buenos Aires' },
    { label: { es: 'Email', en: 'Email' }, value: 'bibanez00@gmail.com' },
    { label: { es: 'Proyectos', en: 'Projects' }, value: 'SurIA - Postales Argentinas' },
  ];

  const experience = [
    {
      company: 'Citi',
      role: 'VP Senior Service Manager - CitiService',
      period: { es: 'ene 2023 - presente', en: 'jan 2023 - present' },
      badge: { es: 'Actual', en: 'Current' },
      description: {
        es: 'Gestion end-to-end de cuentas corporativas, mejora de SLAs y programas de transformacion digital con foco en IA.',
        en: 'End-to-end corporate account management, SLA improvement, and digital transformation programs focused on AI.',
      },
      accent: 'bg-brand-700 text-white',
    },
    {
      company: 'SupportYourApp',
      role: 'Service Delivery Manager',
      period: { es: 'feb 2022 - ene 2023', en: 'feb 2022 - jan 2023' },
      badge: { es: '1 ano', en: '1 year' },
      description: {
        es: 'Onboarding y reporting para clientes globales, con estandares operativos orientados a calidad y escalabilidad.',
        en: 'Onboarding and reporting for global clients with operational standards focused on quality and scalability.',
      },
      accent: 'bg-slate-900 text-white',
    },
    {
      company: 'EY',
      role: 'Global Compliance & Reporting Senior',
      period: { es: 'dic 2021 - feb 2022', en: 'dec 2021 - feb 2022' },
      badge: { es: '3 meses', en: '3 months' },
      description: {
        es: 'Service management office para compliance global y tableros ejecutivos de seguimiento.',
        en: 'Service management office for global compliance and executive reporting dashboards.',
      },
      accent: 'bg-amber-200 text-amber-900',
    },
    {
      company: 'DiDi',
      role: 'Driver Center Sr. Analyst + Team Leader',
      period: { es: 'jun 2020 - dic 2021', en: 'jun 2020 - dec 2021' },
      badge: { es: '1 ano 7 meses', en: '1 year 7 months' },
      description: {
        es: 'Operacion diaria y liderazgo de equipo en atencion al conductor, optimizando tiempos de respuesta.',
        en: 'Daily operations and team leadership in driver support, optimizing response times.',
      },
      accent: 'bg-orange-100 text-orange-800',
    },
  ];

  const projects = [
    {
      name: 'SurIA',
      category: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
      description: {
        es: 'Plataforma orientada a automatizar procesos, reducir tareas manuales y mejorar decisiones con IA aplicada.',
        en: 'Platform focused on automating processes, reducing manual work, and improving decision making with applied AI.',
      },
      tags: ['AI', 'Automation', 'LLMs', 'SaaS'],
      icon: Cpu,
    },
    {
      name: 'Postales Argentinas',
      category: { es: 'Cultura y Diseno', en: 'Culture and Design' },
      description: {
        es: 'Marca cultural que conecta identidad argentina con una narrativa visual contemporanea y digital-first.',
        en: 'Cultural brand connecting Argentine identity with a contemporary and digital-first visual narrative.',
      },
      tags: ['Brand', 'Culture', 'Design', 'Storytelling'],
      icon: Globe,
    },
  ];

  const skillCategories = [
    {
      title: { es: 'Optimizacion y servicio', en: 'Optimization and service' },
      skills: [
        { label: 'Client Optimization', val: 95 },
        { label: 'Operating Model Design', val: 92 },
        { label: 'Service Transformation', val: 90 },
        { label: 'Stakeholder Management', val: 93 },
      ],
    },
    {
      title: { es: 'AI y tecnologia', en: 'AI and technology' },
      skills: [
        { label: 'GenAI / LLMs', val: 90 },
        { label: 'AI Adoption', val: 88 },
        { label: 'Digital Transformation', val: 86 },
        { label: 'Automation Workflows', val: 87 },
      ],
    },
    {
      title: { es: 'Liderazgo y negocio', en: 'Leadership and business' },
      skills: [
        { label: 'Team Leadership', val: 91 },
        { label: 'Project Management', val: 89 },
        { label: 'Business Strategy', val: 86 },
        { label: 'Entrepreneurship', val: 88 },
      ],
    },
  ];

  const certifications = [
    'Generative AI for Leaders & Business Professionals',
    'Generative AI - Risks & Cyber Security Masterclass 2024',
    'ChatGPT for Finance and Investment Professionals',
    'The Fundamentals of Digital Marketing',
  ];

  const contactItems = [
    { icon: Mail, label: 'Email', value: 'bibanez00@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'ibanezbenjamin' },
    { icon: Instagram, label: 'Instagram', value: '@benjaminibanezz' },
  ];

  return (
    <div className="min-h-screen bg-app-gradient text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="inline-flex items-center gap-3" onClick={closeMenu}>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand-700 text-xs font-bold text-white shadow-sm">
              BI
            </span>
            <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">Benjamin Ibanez</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                {t(`nav_${section}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm sm:flex">
              <button
                onClick={() => setLang('es')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  lang === 'es' ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  lang === 'en' ? 'bg-brand-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  {t(`nav_${section}`)}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => setLang('es')}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold ${
                    lang === 'es' ? 'bg-brand-700 text-white' : 'text-slate-500'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold ${
                    lang === 'en' ? 'bg-brand-700 text-white' : 'text-slate-500'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200/70">
          <div className="hero-grid-overlay" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:px-8 lg:pt-18">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                {t('hero_status')}
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {t('hero_title')}
              </h1>

              <p className="mt-4 text-lg font-medium text-brand-700">{t('hero_role')}</p>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">{t('hero_desc')}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn-primary">
                  {t('hero_cta_primary')}
                </a>
                <a href="#social" className="btn-secondary">
                  {t('hero_cta_secondary')}
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                  <div key={metric.value + metric.en} className="surface-card px-4 py-4">
                    <div className="text-2xl font-semibold text-slate-900">{metric.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                      {lang === 'es' ? metric.es : metric.en}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.aside
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="surface-card p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('hero_card_title')}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Benjamin Ibanez</h3>
                  <p className="mt-1 text-sm text-brand-700">VP Senior Service Manager</p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white shadow-sm">
                  BI
                </span>
              </div>

              <div className="my-6 h-px w-full bg-slate-200" />
              <div className="space-y-3 text-sm text-slate-600">
                <div className="inline-flex items-center gap-2">
                  <Briefcase size={16} className="text-brand-700" /> Citi Argentina
                </div>
                <div className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-brand-700" /> La Plata, Argentina
                </div>
                <div className="inline-flex items-center gap-2">
                  <Mail size={16} className="text-brand-700" /> bibanez00@gmail.com
                </div>
                <div className="inline-flex items-center gap-2">
                  <Zap size={16} className="text-brand-700" /> SurIA - Postales Argentinas
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
                Strategy + Operations + AI adoption with enterprise focus.
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="about" className="section-shell">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('section_about_title')} subtitle={t('section_about_sub')} />

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="surface-card p-7 sm:p-8">
                <div className="space-y-4 text-pretty text-base leading-relaxed text-slate-600">
                  <p>{t('about_p1')}</p>
                  <p>{t('about_p2')}</p>
                  <p>{t('about_p3')}</p>
                </div>
              </article>

              <div className="space-y-6">
                <div className="surface-card p-6">
                  <p className="mb-4 text-sm font-semibold text-slate-700">Focus areas</p>
                  <div className="flex flex-wrap gap-2">
                    {aboutTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="surface-card overflow-hidden">
                  <div className="border-b border-slate-200/70 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-800">
                    Professional details
                  </div>
                  <div className="divide-y divide-slate-100 px-6 py-2">
                    {infoRows.map((row) => (
                      <div key={row.value} className="flex items-center justify-between gap-5 py-3">
                        <span className="text-xs uppercase tracking-wide text-slate-500">{row.label[lang]}</span>
                        <span className="text-right text-sm font-semibold text-slate-800">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="exp" className="section-shell section-muted">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('section_exp_title')} subtitle={t('section_exp_sub')} />
            <div className="space-y-4">
              {experience.map((item, index) => (
                <article key={item.company} className="surface-card p-6 transition hover:-translate-y-[2px] hover:shadow-elevated">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className={`mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${item.accent}`}>
                        {item.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{item.company}</h3>
                        <p className="mt-1 text-sm font-medium text-brand-700">{item.role}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.period[lang]}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        index === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge[lang]}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-shell">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('section_projects_title')} subtitle={t('section_projects_sub')} />
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => {
                const Icon = project.icon;
                return (
                  <article key={project.name} className="surface-card p-7 transition hover:-translate-y-[2px] hover:shadow-elevated">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{project.name}</h3>
                        <p className="text-xs uppercase tracking-wide text-slate-500">{project.category[lang]}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-slate-600">{project.description[lang]}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="skills" ref={skillsRef} className="section-shell section-muted">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('section_skills_title')} subtitle={t('section_skills_sub')} />
            <div className="grid gap-6 md:grid-cols-3">
              {skillCategories.map((category) => (
                <article key={category.title.en} className="surface-card p-6">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
                    <Sparkles size={14} />
                    {category.title[lang]}
                  </div>
                  <div className="space-y-5">
                    {category.skills.map((skill) => (
                      <SkillBar key={skill.label} label={skill.label} percentage={skill.val} animate={skillsVisible} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="edu" className="section-shell">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('section_edu_title')} subtitle={t('section_edu_sub')} />
            <div className="grid gap-6 md:grid-cols-2">
              <article className="surface-card p-7">
                <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <BookOpen size={16} className="text-brand-700" />
                  {lang === 'es' ? 'Educacion formal' : 'Formal education'}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Universidad Del Este La Plata</h3>
                <p className="mt-2 text-sm text-brand-700">
                  {lang === 'es' ? 'Lic. en Administracion de Empresas' : 'B.S. in Business Administration'}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">2015 - 2020</p>
              </article>

              <article className="surface-card p-7">
                <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Award size={16} className="text-brand-700" />
                  {lang === 'es' ? 'Certificaciones' : 'Certifications'}
                </div>
                <div className="space-y-3">
                  {certifications.map((certification) => (
                    <div key={certification} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-700" />
                      <span className="text-sm leading-relaxed text-slate-700">{certification}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="social" className="section-shell section-muted">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('section_social_title')} subtitle={t('section_social_sub')} />
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { handle: '@benjaminibanezz', accent: 'from-fuchsia-500 to-orange-400', label: 'Instagram' },
                { handle: '@postalesargentinas', accent: 'from-sky-500 to-amber-400', label: 'Instagram' },
              ].map((account) => (
                <article key={account.handle} className="surface-card overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200/70 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${account.accent} text-xs font-bold text-white`}>
                        {account.handle.slice(1, 3).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{account.handle}</p>
                        <p className="text-xs text-slate-500">{account.label}</p>
                      </div>
                    </div>
                    <button className="btn-quiet">Ver perfil</button>
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-1.5">
                    {Array.from({ length: 9 }).map((_, idx) => (
                      <div key={`${account.handle}-${idx}`} className="group relative aspect-square overflow-hidden rounded-md bg-slate-100">
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-400">Preview</div>
                        <div className="absolute inset-0 bg-brand-700/65 opacity-0 transition group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <article className="surface-card mt-6 p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white shadow-sm">BI</span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Benjamin Ibanez</h3>
                    <p className="text-sm text-slate-600">VP Senior Service Manager - GenAI Adoption - Innovation</p>
                  </div>
                </div>
                <button className="btn-secondary">
                  {lang === 'es' ? 'Conectar en LinkedIn' : 'Connect on LinkedIn'}
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    es: 'Explorando el impacto de IA Generativa en banca corporativa. Eficiencia es precision + contexto.',
                    en: 'Exploring the impact of Generative AI in corporate banking. Efficiency is precision plus context.',
                  },
                  {
                    es: 'Avances en SurIA: automatizar lo repetitivo para liberar foco estrategico.',
                    en: 'Progress with SurIA: automate repetitive work to unlock strategic focus.',
                  },
                  {
                    es: 'Postales Argentinas: producto cultural con narrativa digital y ejecucion consistente.',
                    en: 'Postales Argentinas: cultural product with digital storytelling and consistent execution.',
                  },
                ].map((post, index) => (
                  <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm leading-relaxed text-slate-700">{post[lang]}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                      <span>LinkedIn</span>
                      <span>{index + 1}w</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="contact" className="section-shell">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title={t('section_contact_title')} subtitle={t('section_contact_sub')} align="center" />
            <div className="grid gap-4 md:grid-cols-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className="surface-card p-6 text-center transition hover:-translate-y-[2px] hover:shadow-elevated">
                    <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon size={20} />
                    </span>
                    <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 py-8 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-bold">BI</span>
            <span className="text-sm font-medium text-slate-100">Benjamin Ibanez</span>
          </div>
          <p className="text-sm text-slate-400">{t('footer_copy')}</p>
          <button onClick={scrollToTop} className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-white">
            {t('footer_top')}
            <ChevronUp size={16} />
          </button>
        </div>
      </footer>

      <button className="floating-top" onClick={scrollToTop} aria-label="Back to top">
        <ChevronUp size={16} />
      </button>
    </div>
  );
}
