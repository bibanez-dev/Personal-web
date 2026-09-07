import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronUp,
  Languages,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import profileImage from './assets/profile-benjamin.jpg';

type Language = 'es' | 'en';
type Theme = 'light' | 'dark';
type SubmitState = 'idle' | 'sending' | 'success' | 'error';

interface TextContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    impact: string;
    current: string;
    contact: string;
    language: string;
    theme: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    identity: string;
    primaryCta: string;
    secondaryCta: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; body: string }>;
  };
  impact: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; body: string; metric: string }>;
  };
  current: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ status: string; title: string; body: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    responseTime: string;
    formTitle: string;
    primaryCta: string;
    secondaryCta: string;
    fields: {
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      sending: string;
    };
    placeholders: {
      name: string;
      email: string;
      company: string;
      message: string;
    };
    status: {
      idle: string;
      success: string;
      error: string;
      timeout: string;
      unexpected: string;
      sending: string;
    };
  };
  footer: {
    copy: string;
    subcopy: string;
    navLabel: string;
    top: string;
  };
  floating: {
    trigger: string;
    whatsapp: string;
    linkedin: string;
    email: string;
    unavailable: string;
  };
}

const CONTENT: Record<Language, TextContent> = {
  es: {
    meta: {
      title: 'Benjamin Ibanez | IA aplicada, operaciones y producto',
      description:
        'Benjamin Ibanez. Adopción de IA, mejora de operaciones y desarrollo de producto en banca corporativa y proyectos propios.',
    },
    nav: {
      services: 'Servicios',
      impact: 'Aplicaciones',
      current: 'Proyectos',
      contact: 'Contacto',
      language: 'Cambiar idioma',
      theme: 'Cambiar tema',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      eyebrow: 'VP en Citi · IA y producto',
      title: 'IA aplicada. Operaciones más simples.',
      subtitle:
        'Lidero la adopción de IA y la mejora de procesos en banca corporativa. Conecto negocio, tecnología y producto para llevar ideas a la práctica.',
      identity: 'VP en Citi. Construyendo SurIA de forma independiente.',
      primaryCta: 'Conectemos en LinkedIn',
      secondaryCta: 'Contactarme',
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Tres formas de aportar valor.',
      description:
        'Conecto negocio, operaciones y producto para llevar iniciativas a la práctica.',
      items: [
        {
          title: 'Adopción de IA',
          body: 'Defino casos de uso, responsables y procesos para integrar IA al trabajo cotidiano.',
        },
        {
          title: 'Mejora de servicios',
          body: 'Rediseño procesos para mejorar la velocidad, la consistencia y la experiencia del cliente.',
        },
        {
          title: 'Estrategia de producto',
          body: 'Priorizo necesidades y decisiones para desarrollar soluciones útiles y fáciles de usar.',
        },
      ],
    },
    impact: {
      eyebrow: 'Aplicaciones',
      title: 'En la práctica.',
      description:
        'Aplico estas capacidades a desafíos concretos de la operación.',
      items: [
        {
          title: 'Flujos internos con IA',
          body: 'Diseño flujos de trabajo que incorporan IA a tareas y decisiones internas.',
          metric: 'Foco: adopción cotidiana',
        },
        {
          title: 'Procesos de servicio',
          body: 'Reviso pasos y puntos de decisión para simplificar la operación y mejorar la respuesta al cliente.',
          metric: 'Foco: claridad y consistencia',
        },
        {
          title: 'Ejecución de iniciativas',
          body: 'Alineo negocio, operaciones y producto con responsables y seguimiento.',
          metric: 'Foco: implementación',
        },
      ],
    },
    current: {
      eyebrow: 'Proyectos',
      title: 'Ideas que llevo a la práctica.',
      description:
        'Transformación corporativa y proyectos propios. Dos espacios para construir y aprender.',
      items: [
        {
          status: 'En curso',
          title: 'IA y operaciones en Citi',
          body: 'Impulso la adopción de IA y la mejora operativa en procesos de banca corporativa.',
        },
        {
          status: 'En desarrollo',
          title: 'SurIA',
          body: 'Desarrollo automatizaciones con IA para simplificar tareas manuales y procesos de trabajo.',
        },
        {
          status: 'En construcción',
          title: 'Postales Argentinas',
          body: 'Creo relatos visuales sobre identidad y cultura argentina, con una mirada editorial propia.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Una buena conversación puede ser el comienzo.',
      description:
        'Contame qué querés mejorar y qué necesitás resolver.',
      responseTime: 'Suelo responder en 24 a 48 horas hábiles.',
      formTitle: 'Escribime',
      primaryCta: 'Mensaje por LinkedIn',
      secondaryCta: 'Enviar email',
      fields: {
        name: 'Nombre',
        email: 'Email',
        company: 'Empresa (opcional)',
        message: 'Mensaje',
        submit: 'Enviar mensaje',
        sending: 'Enviando...',
      },
      placeholders: {
        name: 'Tu nombre',
        email: 'tu@email.com',
        company: 'Tu empresa',
        message: 'Contame el contexto y qué te gustaría lograr...',
      },
      status: {
        idle: 'Completá el formulario y respondo por email.',
        success: 'Mensaje enviado. Te respondo pronto.',
        error: 'No se pudo enviar. Probá de nuevo o escribime por LinkedIn/email.',
        timeout: 'La solicitud demoró demasiado. Probá nuevamente.',
        unexpected: 'No se pudo enviar. Probá en unos minutos o escribime por email.',
        sending: 'Enviando mensaje...',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez',
      subcopy:
        'IA aplicada, operaciones y producto',
      navLabel: 'Navegación',
      top: 'Volver arriba',
    },
    floating: {
      trigger: 'Conectar',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      email: 'Email',
      unavailable: 'WhatsApp no disponible',
    },
  },
  en: {
    meta: {
      title: 'Benjamin Ibanez | AI Adoption and Service Transformation',
      description:
        'Benjamin Ibanez leads AI adoption, service transformation and product discipline initiatives in high-stakes operations.',
    },
    nav: {
      services: 'Services',
      impact: 'Applications',
      current: 'Projects',
      contact: 'Contact',
      language: 'Change language',
      theme: 'Change theme',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      eyebrow: 'VP at Citi · AI & product',
      title: 'Applied AI. Simpler operations.',
      subtitle:
        'I lead AI adoption and process improvement in corporate banking, connecting business, technology and product to put ideas into practice.',
      identity: 'VP at Citi. Independently building SurIA.',
      primaryCta: 'Connect on LinkedIn',
      secondaryCta: 'Contact me',
    },
    services: {
      eyebrow: 'Services',
      title: 'Three ways I can help.',
      description:
        'Connecting business, operations and product to put initiatives into practice.',
      items: [
        {
          title: 'AI adoption',
          body: 'I define use cases, operating model and accountability so AI reaches real and sustained adoption.',
        },
        {
          title: 'Service transformation',
          body: 'I redesign critical service processes to improve speed, consistency and customer experience.',
        },
        {
          title: 'Product strategy',
          body: 'I prioritize user needs and product decisions to build useful, accessible solutions.',
        },
      ],
    },
    impact: {
      eyebrow: 'Applications',
      title: 'In practice.',
      description:
        'Applying these capabilities to everyday operational challenges.',
      items: [
        {
          title: 'Internal AI workflows',
          body: 'I design and operationalize internal AI workflows that reduce friction and improve execution quality.',
          metric: 'Focus: everyday adoption',
        },
        {
          title: 'Service optimization',
          body: 'I reshape service processes and decision points to improve speed, consistency and response quality.',
          metric: 'Focus: clarity and consistency',
        },
        {
          title: 'Execution discipline',
          body: 'I align business, operations and product so initiatives move with judgment, ownership and real follow-through.',
          metric: 'Focus: implementation',
        },
      ],
    },
    current: {
      eyebrow: 'Projects',
      title: 'Ideas I am putting to work.',
      description:
        'Corporate transformation and independent projects. Two spaces to build and learn.',
      items: [
        {
          status: 'Scaling',
          title: 'Enterprise AI and operations',
          body: 'Advancing AI adoption, operational improvement and more consistent decisions in high-stakes corporate banking processes.',
        },
        {
          status: 'Building',
          title: 'SurIA',
          body: 'Building AI automations to simplify manual tasks and everyday workflows.',
        },
        {
          status: 'Curating',
          title: 'Postales Argentinas',
          body: 'Creating visual stories about Argentine identity and culture, with an independent editorial perspective.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'It starts with a conversation.',
      description:
        'Tell me what you want to improve and what you need to solve.',
      responseTime: 'Typical response time: 24 to 48 business hours.',
      formTitle: 'Send a direct message',
      primaryCta: 'Message on LinkedIn',
      secondaryCta: 'Send email',
      fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company (optional)',
        message: 'Message',
        submit: 'Send message',
        sending: 'Sending...',
      },
      placeholders: {
        name: 'Your name',
        email: 'you@email.com',
        company: 'Your company',
        message: 'Context, challenge and objective of the conversation...',
      },
      status: {
        idle: 'Fill the form and I will reply by email.',
        success: 'Message sent. I will reply soon.',
        error: 'Could not send. Please try again or reach out via LinkedIn/email.',
        timeout: 'The request took too long. Please try again.',
        unexpected: 'Unexpected server response. Please try again in a few minutes.',
        sending: 'Sending message...',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez',
      subcopy:
        'Applied AI, operations and product',
      navLabel: 'Navigation',
      top: 'Back to top',
    },
    floating: {
      trigger: 'Connect',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      email: 'Email',
      unavailable: 'WhatsApp unavailable',
    },
  },
};

const LINKEDIN_URL = 'https://www.linkedin.com/in/ibanezbenjamin/';
const EMAIL = 'bibanez00@gmail.com';
const WHATSAPP_URL = (import.meta.env.VITE_WHATSAPP_URL as string | undefined)?.trim() ?? '';
const STORAGE_LANGUAGE = 'site_language';
const STORAGE_THEME = 'site_theme';
const PROFILE_IMAGE_WIDTH = 864;
const PROFILE_IMAGE_HEIGHT = 1096;

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const smoothOrAuto: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

const SectionHeading: React.FC<{ eyebrow: string; title: string; description: string }> = ({
  eyebrow,
  title,
  description,
}) => (
  <header className="section-heading">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p>{description}</p>
  </header>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [floatingOpen, setFloatingOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('light');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitMessage, setSubmitMessage] = useState(CONTENT.es.contact.status.idle);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: '',
  });

  const floatingRef = useRef<HTMLDivElement | null>(null);
  const content = useMemo(() => CONTENT[language], [language]);
  const year = useMemo(() => new Date().getFullYear(), []);

  const navItems = useMemo(
    () => [
      { id: 'services', label: content.nav.services },
      { id: 'impact', label: content.nav.impact },
      { id: 'current', label: content.nav.current },
      { id: 'contact', label: content.nav.contact },
    ],
    [content.nav],
  );

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_LANGUAGE);
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
    const savedTheme = window.localStorage.getItem(STORAGE_THEME);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_LANGUAGE, language);
    document.documentElement.lang = language;
    document.title = content.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', content.meta.description);
    }
    if (submitState === 'idle') {
      setSubmitMessage(content.contact.status.idle);
    }
  }, [content.meta, language, submitState]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_THEME, theme);
    document.documentElement.style.colorScheme = theme;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#101419' : '#fafbfc');
    }
  }, [theme]);

  useEffect(() => {
    if (!floatingOpen) {
      return;
    }
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (!floatingRef.current?.contains(target)) {
        setFloatingOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFloatingOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('touchstart', handleClick, { passive: true });
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('touchstart', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, [floatingOpen]);

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage(content.contact.status.idle);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('sending');
    setSubmitMessage(content.contact.status.sending);

    const abortController = new AbortController();
    const timeout = window.setTimeout(() => abortController.abort(), 15000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale: language,
        }),
        signal: abortController.signal,
      });

      const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
      let payload: { ok?: boolean; error?: string } | null = null;

      if (contentType.includes('application/json')) {
        payload = (await response.json()) as { ok?: boolean; error?: string };
      } else {
        await response.text();
      }

      if (!response.ok || payload?.ok !== true) {
        throw new Error(payload?.error || content.contact.status.error);
      }

      setSubmitState('success');
      setSubmitMessage(content.contact.status.success);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        website: '',
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setSubmitMessage(content.contact.status.timeout);
      } else if (error instanceof Error && error.message) {
        setSubmitMessage(error.message);
      } else {
        setSubmitMessage(content.contact.status.error);
      }
      setSubmitState('error');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <div className="site-shell" data-theme={theme}>
      <a className="skip-link" href="#main-content">
        {language === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <header className="topbar">
        <div className="site-container topbar-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">BI</span>
            <span className="brand-text">
              <span className="brand-name">Benjamin Ibanez</span>
              <span className="brand-subtitle">{language === 'es' ? 'IA · Operaciones · Producto' : 'AI · Operations · Product'}</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label={language === 'es' ? 'Navegación principal' : 'Primary navigation'}>
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              className="chip"
              type="button"
              onClick={() => setLanguage((current) => (current === 'es' ? 'en' : 'es'))}
              aria-label={content.nav.language}
            >
              <Languages size={14} />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              className="chip icon-chip"
              type="button"
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
              aria-label={content.nav.theme}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <a className="desktop-cta" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn
              <ArrowUpRight size={14} />
            </a>
            <button
              className="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? content.nav.closeMenu : content.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-nav" id="mobile-nav">
            <div className="site-container mobile-nav-inner">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                LinkedIn
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="site-container hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="hero-subtitle">{content.hero.subtitle}</p>
              <div className="hero-details">
                <p className="hero-detail">{content.hero.identity}</p>
              </div>
              <div className="hero-actions">
                <a className="btn primary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  {content.hero.primaryCta}
                  <ArrowUpRight size={15} />
                </a>
                <a className="btn secondary" href="#contact">
                  {content.hero.secondaryCta}
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <aside className="hero-panel">
              <div className="portrait-wrap">
                <img
                  src={profileImage}
                  alt="Benjamin Ibanez"
                  width={PROFILE_IMAGE_WIDTH}
                  height={PROFILE_IMAGE_HEIGHT}
                  className="portrait"
                  fetchPriority="high"
                />
              </div>
              <div className="portrait-caption">
                <span>Benjamin Ibanez</span>
                <span>{language === 'es' ? 'IA, operaciones y producto' : 'AI, operations & product'}</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="services">
          <div className="site-container">
            <SectionHeading
              eyebrow={content.services.eyebrow}
              title={content.services.title}
              description={content.services.description}
            />
            <div className="service-grid">
              {content.services.items.map((item, index) => (
                <article className="service-item" key={item.title}>
                  <span className="item-number" aria-hidden="true">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tinted" id="impact">
          <div className="site-container">
            <SectionHeading
              eyebrow={content.impact.eyebrow}
              title={content.impact.title}
              description={content.impact.description}
            />
            <div className="impact-list">
              {content.impact.items.map((item) => (
                <article className="impact-item" key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                  <p className="impact-metric">{item.metric}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="current">
          <div className="site-container">
            <SectionHeading
              eyebrow={content.current.eyebrow}
              title={content.current.title}
              description={content.current.description}
            />
            <div className="current-grid">
              {content.current.items.map((item) => (
                <article className="current-item" key={item.title}>
                  <span>{item.status}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-contact" id="contact">
          <div className="site-container contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.description}</p>
              <div className="hero-actions">
                <a className="btn primary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  {content.contact.primaryCta}
                  <Linkedin size={15} />
                </a>
                <a className="btn secondary" href={`mailto:${EMAIL}`}>
                  {content.contact.secondaryCta}
                  <Mail size={15} />
                </a>
              </div>
              <a className="contact-email" href={`mailto:${EMAIL}`}>
                <Mail size={15} />
                {EMAIL}
              </a>
              <small>{content.contact.responseTime}</small>
            </div>

            <article className="contact-form-card">
              <h3>
                <Building2 size={18} />
                {content.contact.formTitle}
              </h3>
              <form className="contact-form" onSubmit={onSubmit} aria-busy={submitState === 'sending'}>
                <label htmlFor="name">{content.contact.fields.name}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={onFieldChange}
                  placeholder={content.contact.placeholders.name}
                  maxLength={120}
                  required
                  disabled={submitState === 'sending'}
                />

                <label htmlFor="email">{content.contact.fields.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={onFieldChange}
                  placeholder={content.contact.placeholders.email}
                  maxLength={160}
                  required
                  disabled={submitState === 'sending'}
                />

                <label htmlFor="company">{content.contact.fields.company}</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={onFieldChange}
                  placeholder={content.contact.placeholders.company}
                  maxLength={160}
                  disabled={submitState === 'sending'}
                />

                <label htmlFor="message">{content.contact.fields.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onFieldChange}
                  placeholder={content.contact.placeholders.message}
                  minLength={20}
                  maxLength={2000}
                  rows={5}
                  aria-describedby="message-hint"
                  required
                  disabled={submitState === 'sending'}
                />

                <p className="field-hint" id="message-hint">{language === 'es' ? 'Entre 20 y 2.000 caracteres.' : 'Between 20 and 2,000 characters.'}</p>
                <input
                  className="honeypot"
                  aria-hidden="true"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={onFieldChange}
                  tabIndex={-1}
                  autoComplete="off"
                  disabled={submitState === 'sending'}
                />

                <button className="btn primary" type="submit" disabled={submitState === 'sending'}>
                  {submitState === 'sending'
                    ? content.contact.fields.sending
                    : content.contact.fields.submit}
                </button>
                <p
                  className={`feedback ${submitState}`}
                  role={submitState === 'error' ? 'alert' : 'status'}
                  aria-live={submitState === 'error' ? 'assertive' : 'polite'}
                  aria-atomic="true"
                >
                  {submitMessage}
                </p>
              </form>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="site-container footer-inner">
          <div>
            <p className="footer-name">{content.footer.copy}</p>
            <p className="footer-copy">{content.footer.subcopy}</p>
            <p className="footer-copy">{year}</p>
          </div>

          <div>
            <p className="footer-label">{content.footer.navLabel}</p>
            <nav className="footer-nav" aria-label={language === 'es' ? 'Navegación al pie' : 'Footer navigation'}>
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </nav>
          </div>

          <button className="top-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: smoothOrAuto })}>
            {content.footer.top}
            <ChevronUp size={14} />
          </button>
        </div>
      </footer>

      <div className="floating-mobile" ref={floatingRef}>
        <div className={`floating-menu ${floatingOpen ? 'open' : ''}`} id="mobile-connect-popover" inert={!floatingOpen}>
          <a
            className={`floating-item ${WHATSAPP_URL ? '' : 'disabled'}`.trim()}
            href={WHATSAPP_URL || '#'}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!WHATSAPP_URL}
            tabIndex={WHATSAPP_URL ? undefined : -1}
            title={WHATSAPP_URL ? content.floating.whatsapp : content.floating.unavailable}
            onClick={(event) => {
              if (!WHATSAPP_URL) {
                event.preventDefault();
                return;
              }
              setFloatingOpen(false);
            }}
          >
            <MessageCircle size={16} />
            <span>{content.floating.whatsapp}</span>
          </a>
          <a
            className="floating-item"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setFloatingOpen(false)}
          >
            <Linkedin size={16} />
            <span>{content.floating.linkedin}</span>
          </a>
          <a className="floating-item" href={`mailto:${EMAIL}`} onClick={() => setFloatingOpen(false)}>
            <Mail size={16} />
            <span>{content.floating.email}</span>
          </a>
        </div>

        <button
          className={`floating-trigger ${floatingOpen ? 'open' : ''}`}
          type="button"
          aria-label={content.floating.trigger}
          aria-expanded={floatingOpen}
          aria-controls="mobile-connect-popover"
          onClick={() => setFloatingOpen((current) => !current)}
        >
          <span>{content.floating.trigger}</span>
          {floatingOpen ? <X size={16} /> : <ArrowUpRight size={16} />}
        </button>
      </div>
    </div>
  );
}
