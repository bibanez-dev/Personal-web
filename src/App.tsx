import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
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

const CONTENT = {
  es: {
    meta: {
      title: 'Benjamin Ibanez | AI Adoption, Service Transformation & Product Discipline',
      description:
        'Benjamin Ibanez lidera iniciativas de AI adoption, service transformation y product discipline para operaciones exigentes y contextos de alta responsabilidad.',
    },
    a11y: { skip: 'Ir al contenido principal', open: 'Abrir menu', close: 'Cerrar menu' },
    nav: { capabilities: 'Capacidades', impact: 'Impacto', focus: 'Foco actual', contact: 'Contacto', lang: 'Cambiar idioma', theme: 'Cambiar tema' },
    hero: {
      eyebrow: 'VP at Citi | AI Adoption | Service Transformation | Product Builder',
      title: 'Transformo ambicion estrategica en sistemas operativos que el negocio realmente usa.',
      description:
        'Lidero iniciativas donde IA aplicada, rediseño de servicio y disciplina de producto conviven con rigor, velocidad y ejecucion confiable.',
      context:
        'Trabajo entre boardroom y delivery: alineo decisiones, diseño operating models y muevo frentes complejos a implementacion concreta.',
      primaryCta: 'Abrir conversacion en LinkedIn',
      secondaryCta: 'Ir a contacto',
      availability:
        'Disponible para conversaciones selectivas sobre AI adoption, transformation design y advisory ejecutivo.',
      signals: [
        { label: 'Rol actual', value: 'VP at Citi' },
        { label: 'Builder track', value: 'Founder at SurIA' },
        { label: 'Ventaja', value: 'Execution over hype' },
      ],
      briefEyebrow: 'Executive brief',
      briefTitle: 'Seniority operativo para mover iniciativas que no admiten improvisacion.',
      briefSummary:
        'Mi valor esta en traducir vision en decisiones, gobernanza y ejecucion visible sin perder estabilidad ni velocidad.',
      briefPoints: [
        'Priorizo por impacto, friccion operativa y viabilidad real.',
        'Conecto sponsors, operacion y tecnologia con ownership claro.',
        'Instalo ritmo de delivery para que la adopcion no quede en piloto.',
      ],
      signatureLabel: 'Modo de trabajo',
      signatureValue: 'Strategic alignment, operating rigor, measurable movement.',
    },
    sections: {
      capabilities: {
        eyebrow: 'Capacidades',
        title: 'Tres frentes donde agrego claridad ejecutiva y capacidad de ejecucion.',
        description:
          'No entro para sumar discurso. Entro para ordenar criterio, secuencia de decisiones y delivery en contextos donde el costo de errar es alto.',
        items: [
          {
            title: 'AI adoption systems',
            description: 'Defino donde la IA aporta valor, que modelo operativo la sostiene y como se instala ownership para que llegue a uso real.',
            emphasis: 'Roadmaps con casos priorizados, gobernanza y adopcion sostenida.',
          },
          {
            title: 'Service transformation',
            description: 'Rediseño flujos criticos cuando la operacion necesita mas consistencia, velocidad y control.',
            emphasis: 'Menos friccion, mejor respuesta y decisiones mejor orquestadas.',
          },
          {
            title: 'Product discipline for execution',
            description: 'Aplico logica de producto para bajar estrategia a prioridades, aprendizaje y foco de negocio.',
            emphasis: 'Equipos con mejor criterio, menos dispersion y delivery mas confiable.',
          },
        ],
      },
      impact: {
        eyebrow: 'Impacto',
        title: 'Experiencia contada como movimiento real, no como lista de puestos.',
        description:
          'Mi trabajo entra donde hay presion por transformar sin romper la operacion. Ahi el diferencial no es la idea: es la calidad de ejecucion.',
        items: [
          {
            label: 'Service operations',
            title: 'Transformacion de servicio con foco en estabilidad y percepcion de calidad.',
            narrative: 'Conduzco rediseños estructurales para mejorar tiempos de respuesta, consistencia y confianza.',
            result: '20%–35% menos tiempo de ciclo en procesos criticos.',
          },
          {
            label: 'Applied AI',
            title: 'IA aplicada con gobernanza, adopcion y lectura real de valor.',
            narrative: 'Paso de exploracion a implementacion en operaciones exigentes con foco en uso sostenido.',
            result: 'Pilot-to-production en 8–12 semanas para casos priorizados.',
          },
          {
            label: 'Cross-functional execution',
            title: 'Alineacion entre negocio, operacion y control para mover frentes complejos.',
            narrative: 'Ordeno conversaciones, ownership y secuencia para reducir retrabajo y acelerar decisiones.',
            result: '18%–25% menos retrabajo en iniciativas complejas.',
          },
        ],
      },
      focus: {
        eyebrow: 'Foco actual',
        title: 'Hoy concentro mi energia en tres lineas de alto apalancamiento.',
        description:
          'Mantengo una agenda dual entre ejecucion enterprise y construccion aplicada, con foco en sistemas de decision y adopcion escalable.',
        items: [
          { title: 'Enterprise AI operating model', description: 'Escalando automatizacion y soporte de decision en procesos de servicio de alto impacto.', status: 'Scaling at Citi' },
          { title: 'SurIA consulting playbooks', description: 'Convirtiendo frameworks de adopcion en ofertas mas claras y ejecutables para equipos de operaciones y producto.', status: 'Packaging the offer' },
          { title: 'Value-risk-effort decision system', description: 'Refinando un criterio practico para priorizar iniciativas con mayor retorno y menor friccion de ejecucion.', status: 'Validating v1' },
        ],
      },
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Si estas moviendo una agenda seria de transformacion, conversemos.',
      description: 'Uso LinkedIn para primeros intercambios y email para oportunidades concretas donde haga sentido profundizar.',
      primaryCta: 'Escribirme por LinkedIn',
      secondaryCta: 'Enviar email',
      responseTime: 'Tiempo de respuesta habitual: 24 a 48 horas habiles.',
      formTitle: 'Enviar mensaje directo',
      fields: { name: 'Nombre', email: 'Email', company: 'Empresa', message: 'Mensaje', submit: 'Enviar mensaje', sending: 'Enviando…' },
      placeholders: {
        name: 'Tu nombre',
        email: 'tu@email.com',
        company: 'Tu empresa',
        message: 'Contame brevemente el contexto, el desafio y que conversacion te gustaria tener…',
      },
      status: {
        idle: 'Completa el formulario y te respondo por email.',
        sending: 'Enviando mensaje…',
        success: 'Mensaje enviado. Te voy a responder pronto.',
        error: 'No se pudo enviar el mensaje. Intentalo de nuevo o escribime por LinkedIn/email.',
        timeout: 'La solicitud demoro demasiado. Intentalo nuevamente.',
        unexpected: 'Respuesta inesperada del servidor. Intentalo nuevamente en unos minutos.',
      },
    },
    footer: { copy: 'Benjamin Ibanez', subcopy: 'AI adoption, service transformation & product discipline for high-stakes operations', navigation: 'Navegacion', backTop: 'Volver arriba' },
    floatingCta: { trigger: 'Conectar', linkedin: 'LinkedIn', whatsapp: 'WhatsApp', email: 'Email', whatsappUnavailable: 'WhatsApp no disponible' },
  },
  en: {
    meta: {
      title: 'Benjamin Ibanez | AI Adoption, Service Transformation & Product Discipline',
      description:
        'Benjamin Ibanez leads AI adoption, service transformation, and product discipline initiatives for high-stakes operations and complex environments.',
    },
    a11y: { skip: 'Skip to main content', open: 'Open menu', close: 'Close menu' },
    nav: { capabilities: 'Capabilities', impact: 'Impact', focus: 'Current focus', contact: 'Contact', lang: 'Change language', theme: 'Change theme' },
    hero: {
      eyebrow: 'VP at Citi | AI Adoption | Service Transformation | Product Builder',
      title: 'I turn strategic ambition into operating systems the business will actually use.',
      description: 'I lead initiatives where applied AI, service redesign, and product discipline coexist with rigor, speed, and reliable execution.',
      context: 'I operate between boardroom alignment and delivery reality: shaping decisions, designing operating models, and moving complex work into implementation.',
      primaryCta: 'Start the conversation on LinkedIn',
      secondaryCta: 'Go to contact',
      availability: 'Available for selective conversations on AI adoption, transformation design, and executive advisory.',
      signals: [
        { label: 'Current role', value: 'VP at Citi' },
        { label: 'Builder track', value: 'Founder at SurIA' },
        { label: 'Advantage', value: 'Execution over hype' },
      ],
      briefEyebrow: 'Executive brief',
      briefTitle: 'Operating seniority for initiatives that cannot afford improvisation.',
      briefSummary: 'My edge is translating vision into decisions, governance, and visible execution without losing stability or pace.',
      briefPoints: [
        'I prioritize by impact, operating friction, and real feasibility.',
        'I align sponsors, operations, and technology around clear ownership.',
        'I install delivery rhythm so adoption does not stall in pilot mode.',
      ],
      signatureLabel: 'Working style',
      signatureValue: 'Strategic alignment, operating rigor, measurable movement.',
    },
    sections: {
      capabilities: {
        eyebrow: 'Capabilities',
        title: 'Three areas where I add executive clarity and executional strength.',
        description: 'I do not step in to add narrative. I step in to sharpen judgment, sequence decisions, and improve delivery in environments where mistakes are expensive.',
        items: [
          { title: 'AI adoption systems', description: 'I define where AI creates value, what operating model can sustain it, and how ownership gets installed so usage becomes real.', emphasis: 'Roadmaps with prioritized use cases, governance, and sustained adoption.' },
          { title: 'Service transformation', description: 'I redesign critical service flows when operations need stronger consistency, speed, and control.', emphasis: 'Less friction, better response quality, and more coordinated decisions.' },
          { title: 'Product discipline for execution', description: 'I apply product logic to turn strategy into priorities, learning cycles, and sharper business focus.', emphasis: 'Teams with better judgment, less sprawl, and more reliable delivery.' },
        ],
      },
      impact: {
        eyebrow: 'Impact',
        title: 'Experience framed as real movement, not a list of job titles.',
        description: 'My work enters where there is pressure to transform without destabilizing operations. In that environment, the differentiator is not the idea. It is execution quality.',
        items: [
          { label: 'Service operations', title: 'Service transformation with stability and quality perception in view.', narrative: 'I lead structural redesigns that improve response time, consistency, and trust.', result: '20%–35% cycle-time reduction in critical processes.' },
          { label: 'Applied AI', title: 'AI deployed with governance, adoption, and a real value lens.', narrative: 'I move from exploration to implementation in demanding operations with focus on sustained usage.', result: 'Pilot-to-production in 8–12 weeks for priority use cases.' },
          { label: 'Cross-functional execution', title: 'Business, operations, and control teams aligned around complex work.', narrative: 'I structure conversations, ownership, and sequencing to reduce rework and accelerate decisions.', result: '18%–25% less rework across complex initiatives.' },
        ],
      },
      focus: {
        eyebrow: 'Current focus',
        title: 'Right now I am concentrating energy on three high-leverage tracks.',
        description: 'I keep a dual agenda across enterprise execution and applied building, with emphasis on scalable adoption and stronger decision systems.',
        items: [
          { title: 'Enterprise AI operating model', description: 'Scaling automation and decision support across high-impact service processes.', status: 'Scaling at Citi' },
          { title: 'SurIA consulting playbooks', description: 'Turning adoption frameworks into clearer, more executable offers for product and operations teams.', status: 'Packaging the offer' },
          { title: 'Value-risk-effort decision system', description: 'Refining a practical decision lens for prioritizing initiatives with stronger returns and lower execution drag.', status: 'Validating v1' },
        ],
      },
    },
    contact: {
      eyebrow: 'Contact',
      title: 'If you are moving a serious transformation agenda, let’s talk.',
      description: 'I use LinkedIn for first contact and email for concrete opportunities where it makes sense to go deeper.',
      primaryCta: 'Message me on LinkedIn',
      secondaryCta: 'Send an email',
      responseTime: 'Typical response time: 24 to 48 business hours.',
      formTitle: 'Send a direct message',
      fields: { name: 'Name', email: 'Email', company: 'Company', message: 'Message', submit: 'Send message', sending: 'Sending…' },
      placeholders: {
        name: 'Your name',
        email: 'you@email.com',
        company: 'Your company',
        message: 'Share the context, the challenge, and the conversation you would like to have…',
      },
      status: {
        idle: 'Complete the form and I will reply by email.',
        sending: 'Sending message…',
        success: 'Message sent. I will get back to you soon.',
        error: 'Could not send the message. Please try again or reach me via LinkedIn/email.',
        timeout: 'The request took too long. Please try again.',
        unexpected: 'Unexpected server response. Please try again in a few minutes.',
      },
    },
    footer: { copy: 'Benjamin Ibanez', subcopy: 'AI adoption, service transformation & product discipline for high-stakes operations', navigation: 'Navigation', backTop: 'Back to top' },
    floatingCta: { trigger: 'Connect', linkedin: 'LinkedIn', whatsapp: 'WhatsApp', email: 'Email', whatsappUnavailable: 'WhatsApp unavailable' },
  },
} as const;

const LINKEDIN_URL = 'https://www.linkedin.com/in/ibanezbenjamin/';
const EMAIL = 'bibanez00@gmail.com';
const WHATSAPP_URL = (import.meta.env.VITE_WHATSAPP_URL as string | undefined)?.trim() ?? '';
const STORAGE_LANGUAGE = 'site_language';
const STORAGE_THEME = 'site_theme';
const PROFILE_IMAGE_WIDTH = 864;
const PROFILE_IMAGE_HEIGHT = 1096;

const prefersReducedMotion = (): boolean => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

const setMetaDescription = (description: string): void => {
  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute('content', description);
  }
};

const SectionHeading: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
}> = ({ eyebrow, title, description }) => (
  <header className="section-heading">
    <p className="section-eyebrow">{eyebrow}</p>
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
    if (!node || prefersReducedMotion() || typeof window.IntersectionObserver === 'undefined') return;
    if (node.getBoundingClientRect().top <= window.innerHeight * 0.9) return;
    setState('hidden');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setState('visible');
          observer.disconnect();
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={blockRef} className={`reveal-block ${className ?? ''}`.trim()} data-reveal-state={state} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>{children}</div>;
};
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [floatingCtaOpen, setFloatingCtaOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('es');
  const [theme, setTheme] = useState<Theme>('light');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', website: '' });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitMessage, setSubmitMessage] = useState(CONTENT.es.contact.status.idle);
  const floatingCtaRef = useRef<HTMLDivElement | null>(null);
  const formFeedbackRef = useRef<HTMLParagraphElement | null>(null);
  const content = CONTENT[language];
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const navItems = useMemo(() => [
    { id: 'capabilities', label: content.nav.capabilities },
    { id: 'impact', label: content.nav.impact },
    { id: 'focus', label: content.nav.focus },
    { id: 'contact', label: content.nav.contact },
  ], [content.nav.capabilities, content.nav.contact, content.nav.focus, content.nav.impact]);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_LANGUAGE);
    if (savedLanguage === 'es' || savedLanguage === 'en') setLanguage(savedLanguage);
    const savedTheme = window.localStorage.getItem(STORAGE_THEME);
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_LANGUAGE, language);
    document.documentElement.lang = language;
    document.title = content.meta.title;
    setMetaDescription(content.meta.description);
    if (submitState === 'idle') setSubmitMessage(CONTENT[language].contact.status.idle);
  }, [content.meta.description, content.meta.title, language, submitState]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_THEME, theme);
    document.documentElement.style.colorScheme = theme;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0b1320' : '#efe7d9');
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    if (submitState === 'success' || submitState === 'error') formFeedbackRef.current?.focus();
  }, [submitState]);

  useEffect(() => {
    if (!floatingCtaOpen) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!floatingCtaRef.current?.contains(target)) setFloatingCtaOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFloatingCtaOpen(false);
    };
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [floatingCtaOpen]);

  const onFormFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage(CONTENT[language].contact.status.idle);
    }
  };

  const onContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('sending');
    setSubmitMessage(content.contact.status.sending);
    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => abortController.abort(), 15000);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale: language }),
        signal: abortController.signal,
      });
      const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
      const responseClone = response.clone();
      let payload: { ok?: boolean; error?: string } | null = null;
      let nonJsonBody = '';
      if (contentType.includes('application/json')) {
        try { payload = await response.json() as { ok?: boolean; error?: string }; }
        catch { nonJsonBody = await responseClone.text(); }
      } else {
        nonJsonBody = await response.text();
      }
      if (!response.ok || payload?.ok !== true) {
        const normalizedText = nonJsonBody.trim().replace(/\s+/g, ' ').slice(0, 180);
        throw new Error(payload?.error || normalizedText || content.contact.status.unexpected);
      }
      setSubmitState('success');
      setSubmitMessage(content.contact.status.success);
      setFormData({ name: '', email: '', company: '', message: '', website: '' });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') setSubmitMessage(content.contact.status.timeout);
      else if (error instanceof Error && error.message) setSubmitMessage(error.message);
      else setSubmitMessage(content.contact.status.error);
      setSubmitState('error');
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <div className="site-shell" data-theme={theme}>
      <a className="skip-link" href="#main-content">{content.a11y.skip}</a>
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand" translate="no" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">BI</span>
            <span className="brand-lockup"><span className="brand-name">Benjamin Ibanez</span><span className="brand-role">AI Adoption & Transformation</span></span>
          </a>
          <nav className="nav-desktop" aria-label="Primary navigation">{navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
          <div className="topbar-actions">
            <button className="chip-btn" type="button" onClick={() => setLanguage((current) => (current === 'es' ? 'en' : 'es'))} aria-label={content.nav.lang}><Languages size={14} aria-hidden="true" /><span>{language.toUpperCase()}</span></button>
            <button className="chip-btn icon-only" type="button" onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} aria-label={content.nav.theme}>{theme === 'light' ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}</button>
            <a className="nav-cta" href={LINKEDIN_URL} target="_blank" rel="noreferrer">{content.hero.primaryCta} <ArrowUpRight size={14} aria-hidden="true" /></a>
            <button className="menu-trigger" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? content.a11y.close : content.a11y.open} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}</button>
          </div>
        </div>
        {menuOpen && <div className="mobile-nav" id="mobile-navigation"><div className="container mobile-nav-items">{navItems.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<div className="mobile-controls"><button className="chip-btn" type="button" onClick={() => setLanguage((current) => (current === 'es' ? 'en' : 'es'))} aria-label={content.nav.lang}><Languages size={14} aria-hidden="true" /><span>{language.toUpperCase()}</span></button><button className="chip-btn icon-only" type="button" onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} aria-label={content.nav.theme}>{theme === 'light' ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}</button></div><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>{content.hero.primaryCta}</a></div></div>}
      </header>
      <main id="main-content">
        <section className="hero" id="top"><div className="hero-orbit hero-orbit-left" aria-hidden="true" /><div className="hero-orbit hero-orbit-right" aria-hidden="true" /><div className="container hero-grid"><RevealBlock className="hero-copy" delay={40}><p className="hero-eyebrow">{content.hero.eyebrow}</p><h1>{content.hero.title}</h1><p className="hero-description">{content.hero.description}</p><p className="hero-context">{content.hero.context}</p><div className="hero-actions"><a className="btn btn-primary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">{content.hero.primaryCta}<ArrowUpRight size={15} aria-hidden="true" /></a><a className="btn btn-secondary" href="#contact">{content.hero.secondaryCta}<ArrowRight size={15} aria-hidden="true" /></a></div><p className="hero-availability">{content.hero.availability}</p><div className="hero-signals" aria-label="Credibility signals">{content.hero.signals.map((signal) => <div key={signal.label} className="hero-signal"><span>{signal.label}</span><strong translate="no">{signal.value}</strong></div>)}</div></RevealBlock><RevealBlock className="hero-brief" delay={140}><div className="hero-portrait-wrap"><img src={profileImage} alt="Benjamin Ibanez" className="hero-portrait" width={PROFILE_IMAGE_WIDTH} height={PROFILE_IMAGE_HEIGHT} fetchPriority="high" /></div><p className="brief-eyebrow">{content.hero.briefEyebrow}</p><h2>{content.hero.briefTitle}</h2><p className="brief-summary">{content.hero.briefSummary}</p><ul className="brief-list">{content.hero.briefPoints.map((point) => <li key={point}><Check size={15} aria-hidden="true" /><span>{point}</span></li>)}</ul><div className="brief-signature"><span>{content.hero.signatureLabel}</span><strong>{content.hero.signatureValue}</strong></div></RevealBlock></div></section>
        <section className="section section-divider" id="capabilities"><div className="container"><RevealBlock><SectionHeading eyebrow={content.sections.capabilities.eyebrow} title={content.sections.capabilities.title} description={content.sections.capabilities.description} /></RevealBlock><div className="value-list" role="list">{content.sections.capabilities.items.map((item, index) => <RevealBlock key={item.title} delay={index * 80} className="value-item-reveal"><article className="value-item" role="listitem"><div className="value-index" aria-hidden="true">0{index + 1}</div><div className="value-title-wrap"><h3>{item.title}</h3></div><p className="value-description">{item.description}</p><p className="value-emphasis">{item.emphasis}</p></article></RevealBlock>)}</div></div></section>
        <section className="section section-muted" id="impact"><div className="container"><RevealBlock><SectionHeading eyebrow={content.sections.impact.eyebrow} title={content.sections.impact.title} description={content.sections.impact.description} /></RevealBlock><div className="impact-list">{content.sections.impact.items.map((item, index) => <RevealBlock key={item.title} delay={index * 90}><article className="impact-row"><div className="impact-copy"><p className="impact-label">{item.label}</p><h3>{item.title}</h3><p>{item.narrative}</p></div><p className="impact-result">{item.result}</p></article></RevealBlock>)}</div></div></section>
        <section className="section section-divider" id="focus"><div className="container"><RevealBlock><SectionHeading eyebrow={content.sections.focus.eyebrow} title={content.sections.focus.title} description={content.sections.focus.description} /></RevealBlock><div className="focus-grid">{content.sections.focus.items.map((item, index) => <RevealBlock key={item.title} delay={index * 90}><article className="focus-item"><span className="focus-status">{item.status}</span><h3>{item.title}</h3><p>{item.description}</p></article></RevealBlock>)}</div></div></section>
        <section className="section section-contact" id="contact"><div className="container contact-layout"><RevealBlock><div className="contact-copy"><p className="section-eyebrow">{content.contact.eyebrow}</p><h2>{content.contact.title}</h2><p>{content.contact.description}</p><div className="contact-actions"><a className="btn btn-primary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">{content.contact.primaryCta}<Linkedin size={15} aria-hidden="true" /></a><a className="btn btn-secondary" href={`mailto:${EMAIL}`}>{content.contact.secondaryCta}<Mail size={15} aria-hidden="true" /></a></div><a className="contact-email" href={`mailto:${EMAIL}`}><Mail size={15} aria-hidden="true" /><span translate="no">{EMAIL}</span></a><small>{content.contact.responseTime}</small></div></RevealBlock><RevealBlock delay={120}><article className="contact-panel"><h3><Building2 size={18} aria-hidden="true" />{content.contact.formTitle}</h3><form className="contact-form" onSubmit={onContactSubmit}><label htmlFor="name">{content.contact.fields.name}</label><input id="name" name="name" type="text" autoComplete="name" placeholder={content.contact.placeholders.name} value={formData.name} onChange={onFormFieldChange} required maxLength={120} disabled={submitState === 'sending'} /><label htmlFor="email">{content.contact.fields.email}</label><input id="email" name="email" type="email" autoComplete="email" inputMode="email" spellCheck={false} placeholder={content.contact.placeholders.email} value={formData.email} onChange={onFormFieldChange} required maxLength={160} disabled={submitState === 'sending'} /><label htmlFor="company">{content.contact.fields.company}</label><input id="company" name="company" type="text" autoComplete="organization" placeholder={content.contact.placeholders.company} value={formData.company} onChange={onFormFieldChange} maxLength={160} disabled={submitState === 'sending'} /><label htmlFor="message">{content.contact.fields.message}</label><textarea id="message" name="message" autoComplete="off" placeholder={content.contact.placeholders.message} value={formData.message} onChange={onFormFieldChange} required minLength={20} maxLength={2000} rows={5} disabled={submitState === 'sending'} /><input className="honeypot" type="text" name="website" value={formData.website} onChange={onFormFieldChange} tabIndex={-1} autoComplete="off" disabled={submitState === 'sending'} /><button className="btn btn-primary submit-btn" type="submit" disabled={submitState === 'sending'}>{submitState === 'sending' ? content.contact.fields.sending : content.contact.fields.submit}</button><p ref={formFeedbackRef} className={`form-feedback ${submitState}`} tabIndex={-1} role={submitState === 'error' ? 'alert' : 'status'} aria-live={submitState === 'error' ? 'assertive' : 'polite'} aria-atomic="true">{submitMessage}</p></form></article></RevealBlock></div></section>
      </main>
      <footer className="footer"><div className="container footer-inner"><div className="footer-brand"><p className="footer-name" translate="no">{content.footer.copy}</p><p className="footer-copy">{content.footer.subcopy}</p><p className="footer-year">{currentYear}</p></div><div className="footer-links-wrap"><p className="footer-links-label">{content.footer.navigation}</p><nav className="footer-links" aria-label="Footer navigation">{navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}<a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a></nav></div><button type="button" className="back-top" onClick={scrollToTop}>{content.footer.backTop}<ChevronUp size={14} aria-hidden="true" /></button></div></footer>
      <div className="floating-cta-mobile" ref={floatingCtaRef}><div className={`floating-cta-popover ${floatingCtaOpen ? 'is-open' : ''}`} id="mobile-connect-popover"><a className={`floating-cta-item ${WHATSAPP_URL ? '' : 'is-disabled'}`.trim()} href={WHATSAPP_URL || '#'} target="_blank" rel="noreferrer" aria-disabled={!WHATSAPP_URL} tabIndex={WHATSAPP_URL ? undefined : -1} title={WHATSAPP_URL ? content.floatingCta.whatsapp : content.floatingCta.whatsappUnavailable} onClick={(event) => { if (!WHATSAPP_URL) { event.preventDefault(); return; } setFloatingCtaOpen(false); }}><MessageCircle size={16} aria-hidden="true" /><span>{content.floatingCta.whatsapp}</span></a><a className="floating-cta-item" href={LINKEDIN_URL} target="_blank" rel="noreferrer" onClick={() => setFloatingCtaOpen(false)}><Linkedin size={16} aria-hidden="true" /><span>{content.floatingCta.linkedin}</span></a><a className="floating-cta-item" href={`mailto:${EMAIL}`} onClick={() => setFloatingCtaOpen(false)}><Mail size={16} aria-hidden="true" /><span>{content.floatingCta.email}</span></a></div><button className={`floating-cta-trigger ${floatingCtaOpen ? 'is-open' : ''}`} type="button" aria-label={content.floatingCta.trigger} aria-expanded={floatingCtaOpen} aria-controls="mobile-connect-popover" onClick={() => setFloatingCtaOpen((current) => !current)}><span>{content.floatingCta.trigger}</span>{floatingCtaOpen ? <X size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</button></div>
    </div>
  );
}


