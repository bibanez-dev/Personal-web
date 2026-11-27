import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronUp,
  Copy,
  ExternalLink,
  Languages,
  Layers,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
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
    availability: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    identity: string;
    location: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
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
    approachLabel: string;
    criterionLabel: string;
    items: Array<{
      status: string;
      title: string;
      role: string;
      body: string;
      approach: string;
      criterion: string;
      tags: string[];
      link?: { url: string; label: string };
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    responseTime: string;
    formTitle: string;
    primaryCta: string;
    secondaryCta: string;
    copyEmail: string;
    copiedEmail: string;
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
      title: 'Benjamin Ibanez | VP en Citi · IA aplicada, operaciones y producto',
      description:
        'Benjamin Ibanez. VP en Citi y AI Champion LATAM. Adopción de IA, mejora de operaciones en banca corporativa y desarrollo de producto en proyectos propios como SurIA.',
    },
    nav: {
      services: 'Servicios',
      impact: 'Criterios',
      current: 'Proyectos',
      contact: 'Contacto',
      language: 'Cambiar idioma',
      theme: 'Cambiar tema',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      availability: 'Abierto a conversaciones B2B y asesoría en IA',
      eyebrow: 'VP en Citi · AI Champion LATAM · Founder',
      title: 'IA aplicada. Operaciones más simples.',
      subtitle:
        'Lidero la adopción de IA y la mejora continua de procesos en banca corporativa y proyectos propios. Conecto negocio, tecnología y producto para que cada solución resuelva una tarea concreta y pueda ser adoptada, auditada y sostenida por el equipo.',
      identity: 'VP Senior Service Manager en Citi · Construyendo SurIA de forma independiente.',
      location: 'Buenos Aires, Argentina · Clúster Cono Sur',
      primaryCta: 'Conectemos en LinkedIn',
      secondaryCta: 'Contactarme',
    },
    stats: [
      {
        value: '12+',
        label: 'Años de trayectoria',
        detail: 'Estrategia operativa, banca global y B2B',
      },
      {
        value: '10',
        label: 'Cuentas Globales',
        detail: 'Gestión y SLAs de clientes corporativos Tier-1 en Citi',
      },
      {
        value: '+200',
        label: 'Profesionales capacitados',
        detail: 'AI Champion Citi: casos reales en Argentina, México y Colombia',
      },
      {
        value: 'Founder',
        label: 'SurIA & Automatización',
        detail: 'Stack moderno en Supabase y Vercel para PyMEs',
      },
    ],
    services: {
      eyebrow: 'Servicios',
      title: 'Tres formas de aportar valor.',
      description:
        'Empiezo por entender la tarea, dónde se traba y quién tiene que decidir. Después elijo qué simplificar, qué automatizar y qué conviene seguir revisando con criterio humano.',
      items: [
        {
          title: 'Adopción de IA',
          body: 'Antes de sumar IA, analizo si la tarea se repite, qué información necesita y cómo se detecta un error. Si la salida no se puede revisar y auditar, falta resolver una parte crítica del problema.',
        },
        {
          title: 'Mejora de servicios',
          body: 'Reviso dónde una solicitud queda esperando, qué datos se piden más de una vez y qué decisiones no tienen un responsable claro. Esos puntos orientan qué cambiar primero para elevar los SLAs.',
        },
        {
          title: 'Estrategia de producto',
          body: 'Priorizo por el problema que se resuelve, la frecuencia con que aparece y el esfuerzo de mantener la solución. Una función nueva tiene que justificar la complejidad que agrega.',
        },
      ],
    },
    impact: {
      eyebrow: 'Criterios en la práctica',
      title: 'Cómo evalúo una iniciativa antes de llevarla a producción.',
      description:
        'Principios de diseño operativo para garantizar que la tecnología genere impacto real sin introducir riesgos imprevistos.',
      items: [
        {
          title: 'Flujos internos con IA',
          body: '¿La información de entrada alcanza? ¿Quién revisa la salida? Cada flujo con IA necesita una forma clara de auditar resultados, corregir desvíos y continuar el trabajo sin fricción.',
          metric: 'Criterio: salida revisable y auditable',
        },
        {
          title: 'Procesos de servicio & SLA',
          body: '¿Este paso ayuda a resolver la solicitud o solo la pasa a otra persona? Busco simplificar los traspasos sin perder controles regulatorios ni claridad para el cliente.',
          metric: 'Criterio: menos traspasos, mayor velocidad',
        },
        {
          title: 'Ejecución y gobernanza',
          body: 'Antes de avanzar, busco acordar quién decide, quién va a usar el cambio y qué evidencia permitirá sostenerlo o ajustarlo. Una implementación tiene que poder mantenerse viva en la operación.',
          metric: 'Criterio: uso efectivo y mantenimiento',
        },
      ],
    },
    current: {
      eyebrow: 'Proyectos',
      title: 'Ideas que llevo a la práctica.',
      description:
        'En Citi trabajo sobre operaciones de gran escala; con SurIA desarrollo automatizaciones para PyMEs; en Postales Argentinas, una mirada editorial. Cada espacio me obliga a decidir qué vale la pena construir.',
      approachLabel: 'Qué estoy haciendo',
      criterionLabel: 'Criterio clave',
      items: [
        {
          status: 'En curso · Banca',
          title: 'IA y operaciones en Citi',
          role: 'VP – Senior Service Manager & AI Champion',
          body: 'Lidero la relación de servicio y optimización para 10 clientes corporativos globales, coordinando equipos en varios países y actuando como AI Champion regional para capacitar a más de 200 profesionales en el uso práctico de IA.',
          approach:
            'Llevar la adopción de IA al trabajo cotidiano y revisar cómo se integra armoniosamente con los controles y procesos existentes.',
          criterion:
            'Una mejora tiene que poder explicarse, revisarse y sostenerse en la operación. La adopción cultural importa tanto como la herramienta.',
          tags: ['Banca Corporativa', 'Gestión de SLAs', 'Gobernanza', 'Human-in-the-loop'],
        },
        {
          status: 'En desarrollo · Startup',
          title: 'SurIA',
          role: 'Founder & Builder',
          body: 'Construyo SurIA de forma independiente como práctica y plataforma de consultoría de IA para pequeñas y medianas empresas. Desarrollé el stack completo (demo web, CRM en Supabase, despliegue en Vercel y agentes para WhatsApp).',
          approach:
            'Desarrollar automatizaciones orientadas a liberar trabajo manual repetitivo donde la IA es confiable, manteniendo supervisión humana.',
          criterion:
            'Empiezo por una tarea acotada: qué entra, qué debería salir y cuándo interviene una persona. Prefiero resolver bien ese recorrido antes de ampliarlo.',
          tags: ['Next.js', 'Supabase', 'Vercel', 'WhatsApp Agents', 'PyMEs'],
          link: {
            url: 'https://github.com/bibanez-dev/suria-core',
            label: 'Ver repositorio open source',
          },
        },
        {
          status: 'En construcción · Editorial',
          title: 'Postales Argentinas / Rutas Argentinas',
          role: 'Dirección Editorial & Multimedia',
          body: 'Proyecto de relatos visuales sobre identidad, paisajes y cultura argentina (Patagonia, Ruta 3, Moquehue, Río Atuel). Trabajo la selección temática, la dirección de arte y el tratamiento narrativo.',
          approach:
            'Crear relatos visuales y documentar destinos explorando nuevas formas de comunicar lo propio con alta calidad estética.',
          criterion:
            'Me interesa que cada pieza tenga una historia fundamentada que contar, además de una imagen atractiva. La curaduría y el contexto son esenciales.',
          tags: ['Visual Storytelling', 'Identidad & Cultura', 'Producción Audiovisual'],
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Una buena conversación puede ser el comienzo.',
      description:
        'Si estás evaluando una automatización, rediseñando un proceso o explorando soluciones de IA para tu operación o empresa, contame qué desafío tenés por delante.',
      responseTime: 'Suelo responder en 24 a 48 horas hábiles.',
      formTitle: 'Escribime un mensaje',
      primaryCta: 'Conectar por LinkedIn',
      secondaryCta: 'Enviar un email',
      copyEmail: 'Copiar email',
      copiedEmail: '¡Email copiado!',
      fields: {
        name: 'Nombre y apellido',
        email: 'Email de contacto',
        company: 'Empresa u organización (opcional)',
        message: 'Mensaje',
        submit: 'Enviar mensaje',
        sending: 'Enviando mensaje...',
      },
      placeholders: {
        name: 'Tu nombre',
        email: 'tu@email.com',
        company: 'Tu empresa o proyecto',
        message:
          '¿Qué tarea o proceso querés mejorar? Contame el contexto y qué probaste hasta ahora (mínimo 20 caracteres)...',
      },
      status: {
        idle: 'Completá el formulario y te respondo por email.',
        success: '¡Mensaje recibido! Te responderé a la brevedad.',
        error: 'No se pudo enviar. Podés probar de nuevo o escribirme directamente por LinkedIn o email.',
        timeout: 'La solicitud demoró más de lo esperado. Probá nuevamente.',
        unexpected: 'Ocurrió un error inesperado. Escribime a bibanez00@gmail.com.',
        sending: 'Enviando mensaje...',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez',
      subcopy: 'IA aplicada · Operaciones globales · Producto',
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
      title: 'Benjamin Ibanez | VP at Citi · Applied AI, Operations & Product',
      description:
        'Benjamin Ibanez. VP at Citi and LATAM AI Champion. Enterprise AI adoption, corporate banking operations, and independent product ventures like SurIA.',
    },
    nav: {
      services: 'Services',
      impact: 'Criteria',
      current: 'Projects',
      contact: 'Contact',
      language: 'Change language',
      theme: 'Change theme',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      availability: 'Open to B2B conversations & AI advisory',
      eyebrow: 'VP at Citi · LATAM AI Champion · Founder',
      title: 'Applied AI. Simpler Operations.',
      subtitle:
        'I lead practical AI adoption and service optimization across corporate banking and independent ventures. I connect business, technology, and product so teams can reliably use, audit, and sustain every solution.',
      identity: 'VP Senior Service Manager at Citi · Independently building SurIA.',
      location: 'Buenos Aires, Argentina · South America Cluster',
      primaryCta: 'Connect on LinkedIn',
      secondaryCta: 'Get in touch',
    },
    stats: [
      {
        value: '12+',
        label: 'Years of Experience',
        detail: 'Operations strategy, global banking & B2B',
      },
      {
        value: '10',
        label: 'Global Accounts',
        detail: 'SLA management for Tier-1 corporate clients at Citi',
      },
      {
        value: '+200',
        label: 'Professionals Trained',
        detail: 'Citi AI Champion: real-world use cases in Argentina, Mexico & Colombia',
      },
      {
        value: 'Founder',
        label: 'SurIA & Automation',
        detail: 'Modern AI stack on Supabase & Vercel for SMEs',
      },
    ],
    services: {
      eyebrow: 'Services',
      title: 'Three ways I bring value.',
      description:
        'I start by understanding the task, where it stalls, and who needs to decide. Then I select what to simplify, what to automate, and what still requires human judgment.',
      items: [
        {
          title: 'AI Adoption',
          body: 'Before adding AI, I look at whether the task is repeatable, what data it needs, and how errors are caught. If the output cannot be audited, a critical piece of the puzzle is missing.',
        },
        {
          title: 'Service Transformation',
          body: 'I analyze where requests linger, what data is requested multiple times, and which decisions lack a clear owner to streamline handoffs and improve customer SLAs.',
        },
        {
          title: 'Product Strategy',
          body: 'I prioritize based on problem severity, usage frequency, and maintenance overhead. A new feature must always justify the operational complexity it introduces.',
        },
      ],
    },
    impact: {
      eyebrow: 'Operational Criteria',
      title: 'How I evaluate an initiative before production.',
      description:
        'Guiding operational principles to ensure technology delivers measurable business impact without unexpected operational friction.',
      items: [
        {
          title: 'Internal AI Workflows',
          body: 'Is the input data sufficient? Who reviews the output? Every AI workflow needs a transparent mechanism to verify results, handle exceptions, and keep operations running smoothly.',
          metric: 'Criterion: reviewable & auditable output',
        },
        {
          title: 'Service Processes & SLAs',
          body: 'Does this step help resolve the request or merely pass the baton? I aim to reduce handoffs without sacrificing regulatory compliance or client clarity.',
          metric: 'Criterion: fewer handoffs, faster resolution',
        },
        {
          title: 'Execution & Governance',
          body: 'Before proceeding, I align on decision rights, user adoption, and key success metrics. An implementation must remain fully maintainable in real-world operations.',
          metric: 'Criterion: sustained usage & maintenance',
        },
      ],
    },
    current: {
      eyebrow: 'Projects',
      title: 'Ideas put into practice.',
      description:
        'At Citi I optimize high-stakes banking operations; with SurIA I build AI automation for SMEs; in Postales Argentinas, an editorial lens. Each environment shapes what is worth building.',
      approachLabel: 'What I am doing',
      criterionLabel: 'Core criterion',
      items: [
        {
          status: 'Ongoing · Banking',
          title: 'AI & Operations at Citi',
          role: 'VP – Senior Service Manager & AI Champion',
          body: 'I own service delivery and process optimization for 10 global corporate clients, coordinating cross-border teams and serving as regional AI Champion to train over 200 colleagues in practical AI adoption.',
          approach:
            'Bringing AI adoption into everyday operations while maintaining strict controls and alignment with established institutional processes.',
          criterion:
            'An improvement must be easily explained, reviewed, and sustained in daily operations. Cultural adoption matters as much as the tool itself.',
          tags: ['Corporate Banking', 'SLA Management', 'Governance', 'Human-in-the-loop'],
        },
        {
          status: 'In development · Startup',
          title: 'SurIA',
          role: 'Founder & Builder',
          body: 'Independently building SurIA as an applied AI consulting practice and platform for SMEs. Scaffolding the complete tech stack: web demo, Supabase CRM, Vercel deployments, and WhatsApp conversational agents.',
          approach:
            'Developing automations designed to eliminate tedious manual work where AI is dependable, retaining human review where judgment is vital.',
          criterion:
            'Start with a tightly scoped workflow: understand what enters, what exits, and when human intervention is necessary before expanding.',
          tags: ['Next.js', 'Supabase', 'Vercel', 'WhatsApp Agents', 'SMEs'],
          link: {
            url: 'https://github.com/bibanez-dev/suria-core',
            label: 'View open source repository',
          },
        },
        {
          status: 'In progress · Editorial',
          title: 'Postales Argentinas / Rutas Argentinas',
          role: 'Editorial & Multimedia Direction',
          body: 'Visual storytelling project exploring Argentine identity, culture, and landscapes (Patagonia, Route 3, Moquehue, Atuel River). Curating thematic narratives and visual brand direction.',
          approach:
            'Crafting visual stories and editorial pieces that celebrate local heritage with high aesthetic and narrative discipline.',
          criterion:
            'Every piece must tell a meaningful story beyond an attractive image. Curation and cultural context are fundamental.',
          tags: ['Visual Storytelling', 'Identity & Culture', 'Multimedia Production'],
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'A thoughtful conversation is where it begins.',
      description:
        'Whether you are assessing an automation, redesigning a process, or exploring AI applications for your company or operations, feel free to reach out.',
      responseTime: 'I typically reply within 24 to 48 business hours.',
      formTitle: 'Send a message',
      primaryCta: 'Connect on LinkedIn',
      secondaryCta: 'Send an email',
      copyEmail: 'Copy email',
      copiedEmail: 'Email copied!',
      fields: {
        name: 'Full name',
        email: 'Contact email',
        company: 'Company or organization (optional)',
        message: 'Message',
        submit: 'Send message',
        sending: 'Sending message...',
      },
      placeholders: {
        name: 'Your name',
        email: 'you@email.com',
        company: 'Your company or project',
        message:
          'What task or workflow would you like to improve? Share context and what you have explored so far (min 20 characters)...',
      },
      status: {
        idle: 'Fill out the form and I will follow up via email.',
        success: 'Message received! I will reply shortly.',
        error: 'Could not send. You can try again or reach out directly on LinkedIn or email.',
        timeout: 'The request took longer than expected. Please try again.',
        unexpected: 'An unexpected error occurred. Please write directly to bibanez00@gmail.com.',
        sending: 'Sending message...',
      },
    },
    footer: {
      copy: 'Benjamin Ibanez',
      subcopy: 'Applied AI · Global Operations · Product',
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
const DEFAULT_WHATSAPP_URL =
  'https://wa.me/5492215719109?text=Hola%20Benjam%C3%ADn%2C%20estuve%20viendo%20tu%20web%20personal';
const WHATSAPP_URL =
  (import.meta.env.VITE_WHATSAPP_URL as string | undefined)?.trim() || DEFAULT_WHATSAPP_URL;

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
  const [activeSection, setActiveSection] = useState<string>('top');
  const [emailCopied, setEmailCopied] = useState(false);

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

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const sections = ['top', 'services', 'impact', 'current', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2400);
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
        {language === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
      </a>

      <header className="topbar">
        <div className="site-container topbar-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">BI</span>
            <span className="brand-text">
              <span className="brand-name">Benjamin Ibanez</span>
              <span className="brand-subtitle">
                {language === 'es' ? 'IA · Operaciones · Producto' : 'AI · Operations · Product'}
              </span>
            </span>
          </a>

          <nav
            className="desktop-nav"
            aria-label={language === 'es' ? 'Navegación principal' : 'Primary navigation'}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
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
              <span>LinkedIn</span>
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
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                LinkedIn
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="hero" id="top">
          <div className="site-container hero-grid">
            <div className="hero-copy">
              <div className="availability-pill">
                <span className="availability-dot" aria-hidden="true" />
                <span>{content.hero.availability}</span>
              </div>

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
                <div className="portrait-badge">
                  <span className="badge-dot" aria-hidden="true" />
                  <span>{content.hero.location}</span>
                </div>
              </div>
              <div className="portrait-caption">
                <span>Benjamin Ibanez</span>
                <span>
                  {language === 'es' ? 'IA, operaciones y producto' : 'AI, operations & product'}
                </span>
              </div>
            </aside>
          </div>
        </section>

        {/* METRICS & CREDIBILITY STRIP */}
        <section className="stats-strip" aria-label="Métricas y credibilidad">
          <div className="site-container">
            <div className="stats-grid">
              {content.stats.map((stat, idx) => (
                <div className="stat-card" key={idx}>
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-detail">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
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
                  <div className="service-header">
                    <span className="item-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    {index === 0 && <Sparkles size={18} className="service-icon" />}
                    {index === 1 && <Workflow size={18} className="service-icon" />}
                    {index === 2 && <Layers size={18} className="service-icon" />}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT / ENFOQUE OPERATIVO SECTION */}
        <section className="section section-tinted" id="impact">
          <div className="site-container">
            <SectionHeading
              eyebrow={content.impact.eyebrow}
              title={content.impact.title}
              description={content.impact.description}
            />
            <div className="impact-list">
              {content.impact.items.map((item, idx) => (
                <article className="impact-item" key={item.title}>
                  <div className="impact-main">
                    <div className="impact-icon-wrap" aria-hidden="true">
                      {idx === 0 && <Workflow size={20} />}
                      {idx === 1 && <ShieldCheck size={20} />}
                      {idx === 2 && <Layers size={20} />}
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </div>
                  <div className="impact-badge-wrap">
                    <span className="impact-metric-pill">{item.metric}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CURRENT PROJECTS SECTION */}
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
                  <div className="project-top">
                    <span className="project-status">{item.status}</span>
                    <span className="project-role">{item.role}</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p className="project-description">{item.body}</p>

                  <div className="project-tags">
                    {item.tags.map((tag) => (
                      <span className="project-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <dl className="project-details">
                    <dt>{content.current.approachLabel}</dt>
                    <dd>{item.approach}</dd>
                    <dt>{content.current.criterionLabel}</dt>
                    <dd>{item.criterion}</dd>
                  </dl>

                  {item.link && (
                    <div className="project-footer-link">
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-action-link"
                      >
                        <span>{item.link.label}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
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

              <div className="contact-direct-actions">
                <a className="contact-email" href={`mailto:${EMAIL}`}>
                  <Mail size={16} />
                  <span>{EMAIL}</span>
                </a>
                <button
                  type="button"
                  className="copy-email-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copiar email"
                >
                  {emailCopied ? (
                    <>
                      <Check size={14} className="copy-success" />
                      <span>{content.contact.copiedEmail}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{content.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>

              <small className="response-time-notice">{content.contact.responseTime}</small>
            </div>

            <article className="contact-form-card">
              <h3>
                <Building2 size={18} />
                <span>{content.contact.formTitle}</span>
              </h3>
              <form
                className="contact-form"
                onSubmit={onSubmit}
                aria-busy={submitState === 'sending'}
              >
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

                <p className="field-hint" id="message-hint">
                  {language === 'es'
                    ? 'Entre 20 y 2.000 caracteres.'
                    : 'Between 20 and 2,000 characters.'}
                </p>

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

                <button
                  className="btn primary form-submit-btn"
                  type="submit"
                  disabled={submitState === 'sending'}
                >
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="site-container footer-inner">
          <div>
            <p className="footer-name">{content.footer.copy}</p>
            <p className="footer-copy">{content.footer.subcopy}</p>
            <p className="footer-copy copyright-year">© {year}</p>
          </div>

          <div>
            <p className="footer-label">{content.footer.navLabel}</p>
            <nav
              className="footer-nav"
              aria-label={language === 'es' ? 'Navegación al pie' : 'Footer navigation'}
            >
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <span>LinkedIn</span>
                <ArrowUpRight size={13} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <span>WhatsApp</span>
                <ArrowUpRight size={13} />
              </a>
            </nav>
          </div>

          <button
            className="top-button"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: smoothOrAuto })}
          >
            {content.footer.top}
            <ChevronUp size={14} />
          </button>
        </div>
      </footer>

      {/* FLOATING QUICK CONNECT BUTTON (MOBILE) */}
      <div className="floating-mobile" ref={floatingRef}>
        <div
          className={`floating-menu ${floatingOpen ? 'open' : ''}`}
          id="mobile-connect-popover"
          inert={!floatingOpen}
        >
          <a
            className="floating-item"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setFloatingOpen(false)}
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
          <a
            className="floating-item"
            href={`mailto:${EMAIL}`}
            onClick={() => setFloatingOpen(false)}
          >
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
