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
    primaryCta: string;
    secondaryCta: string;
    panelTitle: string;
    panelBody: string;
    bullets: string[];
    signals: Array<{ label: string; value: string }>;
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
      title: 'Benjamin Ibanez | AI Adoption and Service Transformation',
      description:
        'Benjamin Ibanez lidera agendas de AI adoption, service transformation y disciplina de producto en operaciones de alta exigencia.',
    },
    nav: {
      services: 'Servicios',
      impact: 'Impacto',
      current: 'Foco actual',
      contact: 'Contacto',
      language: 'Cambiar idioma',
      theme: 'Cambiar tema',
      openMenu: 'Abrir menu',
      closeMenu: 'Cerrar menu',
    },
    hero: {
      eyebrow: 'VP at Citi | AI adoption | Service transformation',
      title: 'Convierto estrategia en ejecucion real para operaciones complejas.',
      subtitle:
        'Trabajo en el punto donde negocio, operacion y producto se tienen que alinear rapido, sin ruido y con resultados medibles.',
      primaryCta: 'Iniciar conversacion en LinkedIn',
      secondaryCta: 'Ver contacto',
      panelTitle: 'Enfoque de trabajo',
      panelBody:
        'Menos presentaciones. Mas decisiones claras, ownership definido y ritmo de ejecucion sostenido.',
      bullets: [
        'Priorizacion por valor, riesgo y viabilidad.',
        'Delivery cross-functional con governance practico.',
        'Adopcion real, no pilotos eternos.',
      ],
      signals: [
        { label: 'Rol actual', value: 'VP at Citi' },
        { label: 'Track builder', value: 'Founder at SurIA' },
        { label: 'Estilo', value: 'Execution over hype' },
      ],
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Tres capacidades para mover agendas de transformacion serias.',
      description:
        'Entro para ordenar decisiones y acelerar ejecucion en contextos donde el costo de la ambiguedad es alto.',
      items: [
        {
          title: 'AI adoption systems',
          body: 'Defino casos, modelo operativo y accountability para que la IA llegue a uso real y sostenido.',
        },
        {
          title: 'Service transformation',
          body: 'Rediseño procesos criticos para ganar velocidad, consistencia y mejor experiencia de servicio.',
        },
        {
          title: 'Product discipline',
          body: 'Instalo criterio de producto para priorizar mejor, reducir friccion y tomar decisiones con foco.',
        },
      ],
    },
    impact: {
      eyebrow: 'Impacto',
      title: 'Resultados concretos en entornos exigentes.',
      description:
        'Mi diferencial no es solo definir una buena direccion. Es sostener la ejecucion hasta que el negocio lo sienta.',
      items: [
        {
          title: 'Service operations',
          body: 'Transformaciones de servicio con mejoras de velocidad, consistencia y confianza operativa.',
          metric: '20% a 35% menos tiempo de ciclo en procesos criticos',
        },
        {
          title: 'Applied AI',
          body: 'Pasaje de idea a implementacion con governance, adopcion y valor visible para el negocio.',
          metric: 'Pilot-to-production en 8 a 12 semanas en casos priorizados',
        },
        {
          title: 'Cross-functional execution',
          body: 'Alineacion entre negocio, operacion y control para reducir retrabajo y acelerar decisiones.',
          metric: '18% a 25% menos retrabajo en iniciativas complejas',
        },
      ],
    },
    current: {
      eyebrow: 'Foco actual',
      title: 'Tres frentes activos de alto apalancamiento.',
      description:
        'Hoy combino agenda enterprise con construccion aplicada para cerrar mejor el gap entre estrategia y delivery.',
      items: [
        {
          status: 'Scaling',
          title: 'Enterprise AI operating model',
          body: 'Escalando decision support y automatizacion en procesos de servicio de alto impacto.',
        },
        {
          status: 'Building',
          title: 'SurIA playbooks',
          body: 'Empaquetando marcos de adopcion para implementaciones mas rapidas en producto y operaciones.',
        },
        {
          status: 'Validating',
          title: 'Value-risk-effort system',
          body: 'Refinando criterio de priorizacion para seleccionar mejor donde invertir energia.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Si estas moviendo una agenda de transformacion, conversemos.',
      description:
        'LinkedIn para primer intercambio. Email para oportunidades concretas y conversaciones de trabajo.',
      responseTime: 'Tiempo de respuesta habitual: 24 a 48 horas habiles.',
      formTitle: 'Enviar mensaje directo',
      primaryCta: 'Mensaje por LinkedIn',
      secondaryCta: 'Enviar email',
      fields: {
        name: 'Nombre',
        email: 'Email',
        company: 'Empresa',
        message: 'Mensaje',
        submit: 'Enviar mensaje',
        sending: 'Enviando...',
      },
      placeholders: {
        name: 'Tu nombre',
        email: 'tu@email.com',
        company: 'Tu empresa',
        message: 'Contexto, desafio y objetivo de la conversacion...',
      },
      status: {
        idle: 'Completá el formulario y respondo por email.',
        success: 'Mensaje enviado. Te respondo pronto.',
        error: 'No se pudo enviar. Probá de nuevo o escribime por LinkedIn/email.',
        timeout: 'La solicitud demoro demasiado. Intentalo nuevamente.',
        unexpected: 'Respuesta inesperada del servidor. Intentalo en unos minutos.',
        sending: 'Enviando mensaje...',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez',
      subcopy:
        'AI adoption, service transformation and product discipline for high-stakes operations',
      navLabel: 'Navegacion',
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
      impact: 'Impact',
      current: 'Current focus',
      contact: 'Contact',
      language: 'Change language',
      theme: 'Change theme',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      eyebrow: 'VP at Citi | AI adoption | Service transformation',
      title: 'I turn strategy into real execution for complex operations.',
      subtitle:
        'I work where business, operations and product must align fast, cut noise and deliver measurable outcomes.',
      primaryCta: 'Start the conversation on LinkedIn',
      secondaryCta: 'Go to contact',
      panelTitle: 'How I work',
      panelBody:
        'Fewer slide decks. More clear decisions, defined ownership and sustainable delivery rhythm.',
      bullets: [
        'Prioritization by value, risk and feasibility.',
        'Cross-functional delivery with pragmatic governance.',
        'Real adoption, not endless pilot mode.',
      ],
      signals: [
        { label: 'Current role', value: 'VP at Citi' },
        { label: 'Builder track', value: 'Founder at SurIA' },
        { label: 'Style', value: 'Execution over hype' },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Three capabilities to move serious transformation agendas.',
      description:
        'I step in to clarify decisions and accelerate execution where ambiguity is expensive.',
      items: [
        {
          title: 'AI adoption systems',
          body: 'I define use cases, operating model and accountability so AI reaches real and sustained adoption.',
        },
        {
          title: 'Service transformation',
          body: 'I redesign critical service processes to improve speed, consistency and customer experience.',
        },
        {
          title: 'Product discipline',
          body: 'I install product judgment to prioritize better, reduce friction and improve decision quality.',
        },
      ],
    },
    impact: {
      eyebrow: 'Impact',
      title: 'Concrete outcomes in demanding environments.',
      description:
        'My edge is not only setting direction. It is sustaining execution until the business feels the change.',
      items: [
        {
          title: 'Service operations',
          body: 'Service transformations that improve speed, consistency and operational trust.',
          metric: '20% to 35% cycle-time reduction in critical processes',
        },
        {
          title: 'Applied AI',
          body: 'From idea to implementation with governance, adoption and visible business value.',
          metric: 'Pilot-to-production in 8 to 12 weeks for priority cases',
        },
        {
          title: 'Cross-functional execution',
          body: 'Business, operations and control alignment to reduce rework and accelerate decisions.',
          metric: '18% to 25% less rework in complex initiatives',
        },
      ],
    },
    current: {
      eyebrow: 'Current focus',
      title: 'Three active high-leverage workstreams.',
      description:
        'I currently combine enterprise execution with applied building to close the strategy-to-delivery gap.',
      items: [
        {
          status: 'Scaling',
          title: 'Enterprise AI operating model',
          body: 'Scaling decision support and automation in high-impact service processes.',
        },
        {
          status: 'Building',
          title: 'SurIA playbooks',
          body: 'Packaging adoption frameworks for faster implementation in product and operations teams.',
        },
        {
          status: 'Validating',
          title: 'Value-risk-effort system',
          body: 'Refining prioritization logic to select where energy creates stronger returns.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'If you are moving a transformation agenda, let us talk.',
      description:
        'LinkedIn for first outreach. Email for concrete opportunities and working conversations.',
      responseTime: 'Typical response time: 24 to 48 business hours.',
      formTitle: 'Send a direct message',
      primaryCta: 'Message on LinkedIn',
      secondaryCta: 'Send email',
      fields: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
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
        'AI adoption, service transformation and product discipline for high-stakes operations',
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
      themeMeta.setAttribute('content', theme === 'dark' ? '#070d17' : '#f4f7fb');
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
      let textPayload = '';

      if (contentType.includes('application/json')) {
        payload = (await response.json()) as { ok?: boolean; error?: string };
      } else {
        textPayload = await response.text();
      }

      if (!response.ok || payload?.ok !== true) {
        throw new Error(payload?.error || textPayload || content.contact.status.unexpected);
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
        Skip to content
      </a>

      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">BI</span>
            <span className="brand-text">
              <span className="brand-name">Benjamin Ibanez</span>
              <span className="brand-subtitle">AI Adoption and Transformation</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
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
            <div className="container mobile-nav-inner">
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
          <div className="hero-aurora hero-aurora-a" aria-hidden="true" />
          <div className="hero-aurora hero-aurora-b" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="hero-subtitle">{content.hero.subtitle}</p>
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
              <div className="hero-signals">
                {content.hero.signals.map((signal) => (
                  <div key={signal.label} className="hero-signal">
                    <span>{signal.label}</span>
                    <strong>{signal.value}</strong>
                  </div>
                ))}
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
              <h2>{content.hero.panelTitle}</h2>
              <p>{content.hero.panelBody}</p>
              <ul>
                {content.hero.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <SectionHeading
              eyebrow={content.services.eyebrow}
              title={content.services.title}
              description={content.services.description}
            />
            <div className="service-grid">
              {content.services.items.map((item) => (
                <article className="service-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tinted" id="impact">
          <div className="container">
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
          <div className="container">
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
          <div className="container contact-grid">
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
              <form className="contact-form" onSubmit={onSubmit}>
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
                  required
                  disabled={submitState === 'sending'}
                />

                <input
                  className="honeypot"
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
        <div className="container footer-inner">
          <div>
            <p className="footer-name">{content.footer.copy}</p>
            <p className="footer-copy">{content.footer.subcopy}</p>
            <p className="footer-copy">{year}</p>
          </div>

          <div>
            <p className="footer-label">{content.footer.navLabel}</p>
            <nav className="footer-nav" aria-label="Footer navigation">
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
        <div className={`floating-menu ${floatingOpen ? 'open' : ''}`} id="mobile-connect-popover">
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
