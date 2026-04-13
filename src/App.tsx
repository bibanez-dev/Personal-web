import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronUp,
  Languages,
  Mail,
  Menu,
  Moon,
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
  metrics: string[];
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
    dualTrack: string;
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
    secondaryCta: string;
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
    subcopy: string;
    navigation: string;
    backTop: string;
  };
}

const CONTENT: Record<Language, LandingContent> = {
  es: {
    nav: {
      what: 'Que hago',
      impact: 'Impacto',
      now: 'En que estoy',
      contact: 'Contacto',
      lang: 'Idioma',
      theme: 'Tema',
    },
    hero: {
      eyebrow: 'VP en Citi | AI Adoption | Product Builder',
      title: 'Convierto IA y optimizacion en impacto de negocio real.',
      description:
        'Trabajo donde estrategia, operacion y producto se cruzan para ejecutar iniciativas que mejoran servicio, velocidad y resultados.',
      dualTrack: 'Perfil dual: lidero transformacion enterprise en Citi y construyo productos aplicados con SurIA.',
      primaryCta: 'Escribirme por LinkedIn',
      secondaryCta: 'Ir a contacto',
      proofPoints: ['VP en Citi', 'Founder de SurIA', 'Ejecucion sobre hype'],
      panelEyebrow: 'Como genero valor',
      panelTitle: 'Transformacion con criterio de negocio y disciplina operativa.',
      panelItems: [
        'Priorizo iniciativas por impacto, esfuerzo y viabilidad real.',
        'Conecto negocio y tecnologia para llegar a produccion.',
        'Instalo sistemas de trabajo que sostienen resultados en el tiempo.',
      ],
    },
    what: {
      eyebrow: 'Que hago',
      title: 'Tres capacidades para resolver problemas concretos',
      description: 'No vendo teoria. Diseno y ejecuto soluciones aplicadas en contextos exigentes.',
      labels: {
        problem: 'Problema',
        action: 'Como intervengo',
        outcome: 'Outcome',
      },
      items: [
        {
          title: 'AI Adoption',
          problem: 'La IA queda en pilotos aislados y no escala en la operacion.',
          action: 'Defino roadmap, casos de uso y modelo de adopcion con ownership claro.',
          outcome: 'Capacidades de IA implementadas, usadas y sostenibles.',
        },
        {
          title: 'Optimization',
          problem: 'Procesos de servicio lentos, costosos y con friccion interna.',
          action: 'Rediseno flujos criticos con metricas de performance y calidad.',
          outcome: 'Mejor experiencia para cliente interno y externo con mayor eficiencia.',
        },
        {
          title: 'Product',
          problem: 'Equipos con objetivos estrategicos pero sin logica de producto para ejecutar.',
          action: 'Instalo enfoque de producto para priorizar, iterar y decidir mejor.',
          outcome: 'Iniciativas claras, medibles y alineadas con valor de negocio.',
        },
      ],
    },
    impact: {
      eyebrow: 'Impacto',
      title: 'Experiencia contada por resultados, no por puestos',
      description: 'Trabajo en entornos complejos donde el desafio es transformar sin perder estabilidad.',
      items: [
        {
          title: 'Transformacion de servicio con foco en cliente',
          text: 'Conduzco mejoras estructurales para elevar tiempos de respuesta, consistencia y confianza.',
          metrics: ['20% a 35% menos tiempo de ciclo en procesos criticos', '+15 pp en cumplimiento de SLA en frentes priorizados'],
        },
        {
          title: 'IA aplicada en operacion real',
          text: 'Paso de idea a implementacion con gobernanza, adopcion y valor concreto para el negocio.',
          metrics: ['De piloto a produccion en 8-12 semanas para casos priorizados', '2x en velocidad de respuesta en tareas asistidas por IA'],
        },
        {
          title: 'Ejecucion cross-funcional en ambientes regulados',
          text: 'Alineo negocio, operacion y control para mover iniciativas criticas con seguridad y velocidad.',
          metrics: ['Roadmaps compartidos con stakeholders clave en menos de 30 dias', 'Reduccion de retrabajo entre 18% y 25% en iniciativas complejas'],
        },
      ],
    },
    now: {
      eyebrow: 'En que estoy',
      title: 'Dos tracks activos: corporate execution + builder mode',
      description: 'Mantengo un enfoque dual para llevar aprendizajes enterprise a productos aplicados y viceversa.',
      items: [
        {
          title: 'Enterprise AI operating model (Citi)',
          status: 'Escalando',
          detail: 'Integrando automatizacion y soporte de decision en procesos de servicio de alto impacto.',
          next: 'Proximo hito: expandir cobertura en journeys prioritarios con medicion de valor.',
        },
        {
          title: 'SurIA playbooks para consulting',
          status: 'Construyendo',
          detail: 'Estandarizando marcos de adopcion de IA para equipos de operaciones y producto.',
          next: 'Proximo hito: paquetizar oferta por vertical para implementaciones mas rapidas.',
        },
        {
          title: 'Decision system valor-riesgo-esfuerzo',
          status: 'Validando',
          detail: 'Refinando criterios para priorizar iniciativas con mayor impacto y menor friccion.',
          next: 'Proximo hito: cerrar version v1 con evidencia de resultados en casos reales.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Si queres acelerar AI adoption con foco en impacto, conversemos.',
      description: 'Canales principales: LinkedIn para primer contacto y email para oportunidades concretas.',
      primaryCta: 'Escribirme por LinkedIn',
      secondaryCta: 'Enviar email',
      responseTime: 'Tiempo de respuesta habitual: 24 a 48 horas habiles.',
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
        message: 'Contame brevemente en que te gustaria que colaboremos.',
      },
      status: {
        success: 'Mensaje enviado. Te voy a responder pronto.',
        error: 'No se pudo enviar el mensaje. Intenta nuevamente o escribime por LinkedIn/email.',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez',
      subcopy: 'VP en Citi | AI adoption, optimization y product execution',
      navigation: 'Navegacion',
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
      dualTrack: 'Dual track profile: enterprise execution at Citi plus independent product building with SurIA.',
      primaryCta: 'Message me on LinkedIn',
      secondaryCta: 'Go to contact',
      proofPoints: ['VP at Citi', 'Founder at SurIA', 'Execution over hype'],
      panelEyebrow: 'How I create value',
      panelTitle: 'Transformation led with business judgment and operating rigor.',
      panelItems: [
        'I prioritize initiatives by impact, effort, and real feasibility.',
        'I connect business and technology to reach production.',
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
          metrics: ['20% to 35% cycle-time reduction in critical processes', '+15 pp SLA compliance improvement in priority operations'],
        },
        {
          title: 'AI applied in real operations',
          text: 'I move from idea to implementation with governance, adoption, and tangible value.',
          metrics: ['Pilot-to-production in 8-12 weeks for priority use cases', '2x faster response time in AI-assisted workflows'],
        },
        {
          title: 'Cross-functional execution in regulated contexts',
          text: 'I align business, operations, and control teams to move critical initiatives safely and fast.',
          metrics: ['Shared execution roadmaps aligned in under 30 days', '18% to 25% less rework across complex initiatives'],
        },
      ],
    },
    now: {
      eyebrow: 'What I am building',
      title: 'Two active tracks: corporate execution + builder mode',
      description: 'I run a dual strategy to transfer enterprise-grade discipline into practical products and consulting.',
      items: [
        {
          title: 'Enterprise AI operating model (Citi)',
          status: 'Scaling',
          detail: 'Embedding automation and decision support in high-impact service processes.',
          next: 'Next milestone: expand coverage across priority journeys with measurable value tracking.',
        },
        {
          title: 'SurIA playbooks for consulting',
          status: 'Building',
          detail: 'Productizing AI adoption frameworks for operations and product teams.',
          next: 'Next milestone: package vertical-specific offers for faster implementation.',
        },
        {
          title: 'Value-risk-effort decision system',
          status: 'Validating',
          detail: 'Refining prioritization criteria to ship high-value initiatives with less friction.',
          next: 'Next milestone: close v1 with evidence from real business cases.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'If you are driving AI adoption with an impact mindset, let\'s connect.',
      description: 'Primary channels: LinkedIn for first outreach and email for concrete opportunities.',
      primaryCta: 'Message me on LinkedIn',
      secondaryCta: 'Send an email',
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
        error: 'Could not send the message. Please try again or reach me via LinkedIn/email.',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez',
      subcopy: 'VP at Citi | AI adoption, optimization, and product execution',
      navigation: 'Navigation',
      backTop: 'Back to top',
    },
  },
};

const LINKEDIN_URL = 'https://www.linkedin.com/in/ibanezbenjamin/';
const EMAIL = 'bibanez00@gmail.com';
const STORAGE_LANGUAGE = 'site_language';
const STORAGE_THEME = 'site_theme';

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

const RevealBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<'visible' | 'hidden'>('visible');

  useEffect(() => {
    const node = blockRef.current;
    if (!node) {
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || typeof window.IntersectionObserver === 'undefined') {
      setState('visible');
      return;
    }

    const isInitiallyVisible = node.getBoundingClientRect().top <= window.innerHeight * 0.92;
    if (isInitiallyVisible) {
      setState('visible');
      return;
    }

    setState('hidden');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState('visible');
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      },
    );

    observer.observe(node);

    // Failsafe: if observer logic breaks in runtime, keep content visible.
    const fallbackTimer = window.setTimeout(() => {
      setState('visible');
      observer.disconnect();
    }, 1500);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={blockRef}
      className={`reveal-block ${className ?? ''}`.trim()}
      data-reveal-state={state}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

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
  const currentYear = useMemo(() => new Date().getFullYear(), []);

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
              <p className="hero-dual-track">{content.hero.dualTrack}</p>

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
            <RevealBlock>
              <SectionHeading
                eyebrow={content.what.eyebrow}
                title={content.what.title}
                description={content.what.description}
              />
            </RevealBlock>

            <div className="capability-grid">
              {content.what.items.map((item, index) => (
                <RevealBlock key={item.title} delay={90 * index}>
                  <article className="card capability-card">
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
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-toned" id="impacto">
          <div className="container">
            <RevealBlock>
              <SectionHeading
                eyebrow={content.impact.eyebrow}
                title={content.impact.title}
                description={content.impact.description}
              />
            </RevealBlock>

            <div className="impact-grid">
              {content.impact.items.map((item, index) => (
                <RevealBlock key={item.title} delay={90 * index}>
                  <article className="card impact-card">
                    <div className="impact-icon">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <ul className="impact-metrics">
                      {item.metrics.map((metric) => (
                        <li key={metric}>{metric}</li>
                      ))}
                    </ul>
                  </article>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="en-que-estoy">
          <div className="container">
            <RevealBlock>
              <SectionHeading eyebrow={content.now.eyebrow} title={content.now.title} description={content.now.description} />
            </RevealBlock>

            <div className="now-grid">
              {content.now.items.map((stream, index) => (
                <RevealBlock key={stream.title} delay={90 * index}>
                  <article className="card now-card">
                    <div className="now-head">
                      <h3>{stream.title}</h3>
                      <span>{stream.status}</span>
                    </div>
                    <p>{stream.detail}</p>
                    <p className="next-step">{stream.next}</p>
                  </article>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-toned" id="contacto">
          <div className="container contact-layout">
            <RevealBlock>
              <div className="contact-copy">
                <p className="eyebrow">{content.contact.eyebrow}</p>
                <h2>{content.contact.title}</h2>
                <p>{content.contact.description}</p>

                <div className="contact-actions">
                  <a className="btn btn-primary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                    {content.contact.primaryCta} <ArrowUpRight size={15} />
                  </a>
                  <a className="btn btn-secondary" href={`mailto:${EMAIL}`}>
                    {content.contact.secondaryCta} <Mail size={15} />
                  </a>
                </div>

                <a className="contact-email" href={`mailto:${EMAIL}`}>
                  <Mail size={15} /> {EMAIL}
                </a>
                <small>{content.contact.responseTime}</small>
              </div>
            </RevealBlock>

            <RevealBlock delay={120}>
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
            </RevealBlock>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <p className="footer-name">{content.footer.copy}</p>
            <p className="footer-copy">{content.footer.subcopy}</p>
            <p className="footer-year">{currentYear}</p>
          </div>

          <div className="footer-links-wrap">
            <p className="footer-links-label">{content.footer.navigation}</p>
            <nav className="footer-links" aria-label="Footer navigation">
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

          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {content.footer.backTop} <ChevronUp size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}
