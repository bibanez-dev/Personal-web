import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronUp,
  Languages,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import profileImage from './assets/profile-benjamin.png';

type Language = 'es' | 'en';
type Theme = 'light' | 'dark';
type SubmitState = 'idle' | 'sending' | 'success' | 'error';

interface Capability {
  title: string;
  problem: string;
  action: string;
  outcome: string;
}

interface ImpactTheme {
  title: string;
  text: string;
}

interface NowItem {
  title: string;
  status: string;
  detail: string;
  next: string;
}

interface LandingContent {
  nav: {
    what: string;
    impact: string;
    now: string;
    contact: string;
    lang: string;
    theme: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    proofPoints: string[];
    panelEyebrow: string;
    panelTitle: string;
    panelItems: string[];
  };
  what: {
    eyebrow: string;
    title: string;
    description: string;
    labels: {
      problem: string;
      action: string;
      outcome: string;
    };
    items: Capability[];
  };
  impact: {
    eyebrow: string;
    title: string;
    description: string;
    items: ImpactTheme[];
  };
  now: {
    eyebrow: string;
    title: string;
    description: string;
    items: NowItem[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    whatsappCta: string;
    responseTime: string;
    formTitle: string;
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
      success: string;
      error: string;
    };
  };
  footer: {
    copy: string;
    backTop: string;
  };
}

const CONTENT: Record<Language, LandingContent> = {
  es: {
    nav: {
      what: 'Qué hago',
      impact: 'Impacto',
      now: 'En qué estoy',
      contact: 'Contacto',
      lang: 'Idioma',
      theme: 'Tema',
    },
    hero: {
      eyebrow: 'VP en Citi | AI Adoption | Product Builder',
      title: 'Convierto IA y optimización en impacto de negocio real.',
      description:
        'Trabajo donde estrategia, operación y producto se cruzan para ejecutar iniciativas que mejoran servicio, velocidad y resultados.',
      primaryCta: 'Escribirme por LinkedIn',
      secondaryCta: 'Ir a contacto',
      proofPoints: ['VP en Citi', 'Founder de SurIA', 'Foco en ejecución real'],
      panelEyebrow: 'Cómo genero valor',
      panelTitle: 'Lidero transformación con criterio de negocio y disciplina operativa.',
      panelItems: [
        'Priorizo iniciativas por impacto, esfuerzo y viabilidad real.',
        'Conecto equipos de negocio con implementación para llegar a producción.',
        'Diseño sistemas de trabajo que sostienen resultados en el tiempo.',
      ],
    },
    what: {
      eyebrow: 'Qué hago',
      title: 'Tres capacidades para resolver problemas concretos',
      description: 'No vendo teoría. Diseño y ejecuto soluciones aplicadas en contextos exigentes.',
      labels: {
        problem: 'Problema',
        action: 'Cómo intervengo',
        outcome: 'Outcome',
      },
      items: [
        {
          title: 'AI Adoption',
          problem: 'La IA queda en pilotos aislados y no escala en la operación.',
          action: 'Defino roadmap, casos de uso y modelo de adopción con ownership claro.',
          outcome: 'Capacidades de IA implementadas, usadas y sostenibles.',
        },
        {
          title: 'Optimization',
          problem: 'Procesos de servicio lentos, costosos y con fricción interna.',
          action: 'Rediseño flujos críticos con métricas de performance y calidad.',
          outcome: 'Mejor experiencia para cliente interno y externo con mayor eficiencia.',
        },
        {
          title: 'Product',
          problem: 'Equipos con objetivos estratégicos pero sin lógica de producto para ejecutar.',
          action: 'Instalo enfoque de producto para priorizar, iterar y decidir mejor.',
          outcome: 'Iniciativas claras, medibles y alineadas con valor de negocio.',
        },
      ],
    },
    impact: {
      eyebrow: 'Impacto',
      title: 'Experiencia contada por resultados, no por puestos',
      description: 'Trabajo en entornos complejos donde el desafío es transformar sin perder estabilidad.',
      items: [
        {
          title: 'Transformación de servicio con foco en cliente',
          text: 'Conduzco mejoras estructurales que elevan tiempos de respuesta, consistencia y confianza.',
        },
        {
          title: 'IA aplicada en operación real',
          text: 'Paso de idea a implementación con gobernanza, adopción y valor concreto para el negocio.',
        },
        {
          title: 'Ejecución cross-funcional en ambientes regulados',
          text: 'Alineo negocio, operación y control para mover iniciativas críticas con seguridad y velocidad.',
        },
      ],
    },
    now: {
      eyebrow: 'En qué estoy',
      title: 'Líneas activas de trabajo hoy',
      description: 'Esta sección se mantiene curada para reflejar lo que estoy construyendo ahora.',
      items: [
        {
          title: 'Escalamiento de SurIA',
          status: 'Construyendo',
          detail: 'Consolidando playbooks de adopción de IA para operaciones de servicio.',
          next: 'Próximo hito: cerrar framework por vertical de negocio.',
        },
        {
          title: 'Operating model con IA para servicio enterprise',
          status: 'Escalando',
          detail: 'Integrando automatización y soporte a decisión en procesos críticos.',
          next: 'Próximo hito: ampliar cobertura en journeys de mayor impacto.',
        },
        {
          title: 'Matriz valor-riesgo-esfuerzo',
          status: 'Explorando',
          detail: 'Refinando criterios de priorización para ejecutar mejor y más rápido.',
          next: 'Próximo hito: validar con casos reales de negocio.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Si estás impulsando AI adoption con foco en impacto, conversemos.',
      description: 'Podemos trabajar en advisory, diseño de iniciativas o ejecución de transformación aplicada.',
      primaryCta: 'Escribirme por LinkedIn',
      whatsappCta: 'WhatsApp',
      responseTime: 'Tiempo de respuesta habitual: 24 a 48 horas hábiles.',
      formTitle: 'Enviar mensaje directo',
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
        company: 'Nombre de tu empresa',
        message: 'Contame brevemente en qué te gustaría que colaboremos.',
      },
      status: {
        success: 'Mensaje enviado. Te voy a responder pronto.',
        error: 'No se pudo enviar el mensaje. Intentá nuevamente o escribime por LinkedIn/WhatsApp.',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez | VP en Citi | AI adoption, optimization y product execution',
      backTop: 'Volver arriba',
    },
  },
  en: {
    nav: {
      what: 'What I do',
      impact: 'Impact',
      now: 'What I am building',
      contact: 'Contact',
      lang: 'Language',
      theme: 'Theme',
    },
    hero: {
      eyebrow: 'VP at Citi | AI Adoption | Product Builder',
      title: 'I turn AI and optimization into real business impact.',
      description:
        'I work at the intersection of strategy, operations, and product to execute initiatives that improve service, speed, and outcomes.',
      primaryCta: 'Message me on LinkedIn',
      secondaryCta: 'Go to contact',
      proofPoints: ['VP at Citi', 'Founder at SurIA', 'Execution over hype'],
      panelEyebrow: 'How I create value',
      panelTitle: 'I lead transformation with business judgment and operating rigor.',
      panelItems: [
        'I prioritize initiatives by impact, effort, and real feasibility.',
        'I connect business teams with implementation to reach production.',
        'I design operating systems that sustain measurable outcomes.',
      ],
    },
    what: {
      eyebrow: 'What I do',
      title: 'Three capabilities to solve real problems',
      description: 'I do not sell theory. I design and execute applied solutions in demanding environments.',
      labels: {
        problem: 'Problem',
        action: 'How I work',
        outcome: 'Outcome',
      },
      items: [
        {
          title: 'AI Adoption',
          problem: 'AI gets stuck in isolated pilots and fails to scale in operations.',
          action: 'I define roadmap, use cases, and adoption model with clear ownership.',
          outcome: 'AI capabilities implemented, adopted, and sustained.',
        },
        {
          title: 'Optimization',
          problem: 'Service processes are slow, expensive, and friction-heavy.',
          action: 'I redesign critical flows using performance and quality metrics.',
          outcome: 'Better internal and external service experience with higher efficiency.',
        },
        {
          title: 'Product',
          problem: 'Teams have strategic goals but lack product logic to execute.',
          action: 'I install a product mindset to prioritize, iterate, and decide faster.',
          outcome: 'Clear initiatives, measurable progress, and business-aligned outcomes.',
        },
      ],
    },
    impact: {
      eyebrow: 'Impact',
      title: 'Experience framed by outcomes, not job titles',
      description: 'I operate in complex environments where transformation must happen without losing stability.',
      items: [
        {
          title: 'Service transformation with customer focus',
          text: 'I lead structural improvements that increase response quality, speed, and trust.',
        },
        {
          title: 'AI applied in real operations',
          text: 'I move from idea to implementation with governance, adoption, and tangible value.',
        },
        {
          title: 'Cross-functional execution in regulated contexts',
          text: 'I align business, operations, and control areas to move critical initiatives safely and fast.',
        },
      ],
    },
    now: {
      eyebrow: 'What I am building',
      title: 'Current active workstreams',
      description: 'This section is manually curated to reflect what I am actively building right now.',
      items: [
        {
          title: 'SurIA scale-up',
          status: 'Building',
          detail: 'Standardizing AI adoption playbooks for service operations.',
          next: 'Next milestone: finalize implementation framework by business vertical.',
        },
        {
          title: 'AI-enabled operating model for enterprise service',
          status: 'Scaling',
          detail: 'Integrating automation and decision support in critical workflows.',
          next: 'Next milestone: expand coverage across highest-impact journeys.',
        },
        {
          title: 'Value-risk-effort prioritization model',
          status: 'Exploring',
          detail: 'Refining prioritization criteria to execute faster and smarter.',
          next: 'Next milestone: validate model with real business cases.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'If you are driving AI adoption with an impact mindset, let’s connect.',
      description: 'We can collaborate on advisory, initiative design, or transformation execution.',
      primaryCta: 'Message me on LinkedIn',
      whatsappCta: 'WhatsApp',
      responseTime: 'Typical response time: 24 to 48 business hours.',
      formTitle: 'Send a direct message',
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
        company: 'Company name',
        message: 'Share briefly how you would like to collaborate.',
      },
      status: {
        success: 'Message sent. I will get back to you soon.',
        error: 'Could not send the message. Please try again or contact me via LinkedIn/WhatsApp.',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez | VP at Citi | AI adoption, optimization, and product execution',
      backTop: 'Back to top',
    },
  },
};

const WHATSAPP_NUMBER = '+5492215719109';
const WHATSAPP_MESSAGE = 'Hola Benjamin, quiero conversar sobre una oportunidad de AI adoption.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/ibanezbenjamin/';
const EMAIL = 'bibanez00@gmail.com';
const STORAGE_LANGUAGE = 'site_language';
const STORAGE_THEME = 'site_theme';

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4.9 19.1 3 21l1.9-1.9a9 9 0 1 1 3.7 2.4L3 21l1.9-5.6a9 9 0 0 1 0-3.3" />
    <path d="M9.5 8.8c.2-.4.4-.4.7-.4h.6c.2 0 .4.1.5.4l.6 1.5c.1.2.1.4 0 .6l-.4.6c-.1.2-.1.4 0 .6.4.8 1.1 1.5 1.9 1.9.2.1.4.1.6 0l.6-.4c.2-.1.4-.1.6 0l1.5.6c.2.1.4.3.4.5v.6c0 .3 0 .5-.4.7l-.8.4c-.5.2-1.1.3-1.7.2-2.3-.4-4.5-2.6-4.9-4.9-.1-.6 0-1.2.2-1.7l.4-.8Z" />
  </svg>
);

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
  const [language, setLanguage] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('light');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: '',
  });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_THEME, theme);
  }, [theme]);

  const content = useMemo(() => CONTENT[language], [language]);

  const navItems = useMemo(
    () => [
      { id: 'que-hago', label: content.nav.what },
      { id: 'impacto', label: content.nav.impact },
      { id: 'en-que-estoy', label: content.nav.now },
      { id: 'contacto', label: content.nav.contact },
    ],
    [content.nav.contact, content.nav.impact, content.nav.now, content.nav.what],
  );

  const toggleLanguage = () => setLanguage((current) => (current === 'es' ? 'en' : 'es'));
  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  const onFormFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage('');
    }
  };

  const onContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('sending');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          website: formData.website,
          locale: language,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || payload.ok !== true) {
        throw new Error(payload.error || 'Request failed');
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
    } catch {
      setSubmitState('error');
      setSubmitMessage(content.contact.status.error);
    }
  };

  return (
    <div className="site-shell" data-theme={theme}>
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">BI</span>
            <span className="brand-text">Benjamin Ibanez</span>
          </a>

          <nav className="nav-desktop" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar-actions">
            <button className="chip-btn" onClick={toggleLanguage} aria-label={content.nav.lang}>
              <Languages size={14} /> {language.toUpperCase()}
            </button>
            <button className="chip-btn" onClick={toggleTheme} aria-label={content.nav.theme}>
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <a className="nav-cta" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn DM <ArrowUpRight size={14} />
            </a>
            <button className="menu-trigger" onClick={() => setMenuOpen((v) => !v)} aria-label="Open menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            <div className="container mobile-nav-items">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <div className="mobile-controls">
                <button className="chip-btn" onClick={toggleLanguage}>
                  <Languages size={14} /> {language.toUpperCase()}
                </button>
                <button className="chip-btn" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                </button>
              </div>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                LinkedIn DM
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="hero" id="top">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="hero-eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="hero-description">{content.hero.description}</p>

              <div className="hero-actions">
                <a className="btn btn-primary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  {content.hero.primaryCta} <ArrowUpRight size={15} />
                </a>
                <a className="btn btn-secondary" href="#contacto">
                  {content.hero.secondaryCta} <ArrowRight size={15} />
                </a>
              </div>

              <div className="proof-row">
                {content.hero.proofPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </div>

            <aside className="hero-panel">
              <div className="hero-image-wrap">
                <img src={profileImage} alt="Benjamin Ibanez" className="hero-image" />
              </div>
              <p className="eyebrow">{content.hero.panelEyebrow}</p>
              <h3>{content.hero.panelTitle}</h3>
              <ul>
                {content.hero.panelItems.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="section" id="que-hago">
          <div className="container">
            <SectionHeading
              eyebrow={content.what.eyebrow}
              title={content.what.title}
              description={content.what.description}
            />

            <div className="capability-grid">
              {content.what.items.map((item) => (
                <article key={item.title} className="card capability-card">
                  <h3>{item.title}</h3>
                  <div className="capability-block">
                    <p className="label">{content.what.labels.problem}</p>
                    <p>{item.problem}</p>
                  </div>
                  <div className="capability-block">
                    <p className="label">{content.what.labels.action}</p>
                    <p>{item.action}</p>
                  </div>
                  <div className="capability-block">
                    <p className="label">{content.what.labels.outcome}</p>
                    <p>{item.outcome}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-toned" id="impacto">
          <div className="container">
            <SectionHeading
              eyebrow={content.impact.eyebrow}
              title={content.impact.title}
              description={content.impact.description}
            />

            <div className="impact-grid">
              {content.impact.items.map((item) => (
                <article key={item.title} className="card impact-card">
                  <div className="impact-icon">
                    <BriefcaseBusiness size={18} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="en-que-estoy">
          <div className="container">
            <SectionHeading eyebrow={content.now.eyebrow} title={content.now.title} description={content.now.description} />

            <div className="now-grid">
              {content.now.items.map((stream) => (
                <article key={stream.title} className="card now-card">
                  <div className="now-head">
                    <h3>{stream.title}</h3>
                    <span>{stream.status}</span>
                  </div>
                  <p>{stream.detail}</p>
                  <p className="next-step">{stream.next}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-toned" id="contacto">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.description}</p>

              <div className="contact-actions">
                <a className="btn btn-primary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                  {content.contact.primaryCta} <ArrowUpRight size={15} />
                </a>
                <a className="btn btn-secondary" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  {content.contact.whatsappCta} <WhatsAppIcon size={15} />
                </a>
              </div>

              <a className="contact-email" href={`mailto:${EMAIL}`}>
                <Mail size={15} /> {EMAIL}
              </a>
              <small>{content.contact.responseTime}</small>
            </div>

            <article className="card contact-form-card">
              <h3>
                <Building2 size={18} /> {content.contact.formTitle}
              </h3>

              <form className="contact-form" onSubmit={onContactSubmit}>
                <label htmlFor="name">{content.contact.fields.name}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={content.contact.placeholders.name}
                  value={formData.name}
                  onChange={onFormFieldChange}
                  required
                  maxLength={120}
                />

                <label htmlFor="email">{content.contact.fields.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={content.contact.placeholders.email}
                  value={formData.email}
                  onChange={onFormFieldChange}
                  required
                  maxLength={160}
                />

                <label htmlFor="company">{content.contact.fields.company}</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder={content.contact.placeholders.company}
                  value={formData.company}
                  onChange={onFormFieldChange}
                  maxLength={160}
                />

                <label htmlFor="message">{content.contact.fields.message}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={content.contact.placeholders.message}
                  value={formData.message}
                  onChange={onFormFieldChange}
                  required
                  minLength={20}
                  maxLength={2000}
                  rows={5}
                />

                <input
                  className="honeypot"
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={onFormFieldChange}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button className="btn btn-primary submit-btn" type="submit" disabled={submitState === 'sending'}>
                  {submitState === 'sending' ? content.contact.fields.sending : content.contact.fields.submit}
                </button>

                {submitMessage ? (
                  <p className={`form-feedback ${submitState === 'success' ? 'success' : 'error'}`}>{submitMessage}</p>
                ) : null}
              </form>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>{content.footer.copy}</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {content.footer.backTop} <ChevronUp size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}
