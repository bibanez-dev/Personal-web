import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronUp,
  ExternalLink,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { useSocialFeed } from './hooks/useSocialFeed';
import profileImage from './assets/profile-benjamin.png';

const navItems = [
  { id: 'story', label: 'Propuesta' },
  { id: 'experience', label: 'Trayectoria' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'capabilities', label: 'Capacidades' },
  { id: 'education', label: 'Formación' },
  { id: 'social', label: 'Social' },
  { id: 'contact', label: 'Contacto' },
] as const;

const impactMetrics = [
  { value: '10+', label: 'años liderando operaciones y servicio enterprise' },
  { value: '+20', label: 'clientes corporativos impactados' },
  { value: '15+', label: 'iniciativas AI y automatización impulsadas' },
  { value: '3', label: 'frentes estratégicos activos: banca, AI, producto' },
];

const valuePillars = [
  {
    icon: Building2,
    title: 'Enterprise Service Transformation',
    text: 'Rediseño operaciones de servicio complejas para elevar velocidad, consistencia y confianza del cliente corporativo.',
  },
  {
    icon: Brain,
    title: 'AI Adoption con foco de negocio',
    text: 'Convierto GenAI en capacidades reales: casos de uso priorizados, procesos claros y medición de impacto tangible.',
  },
  {
    icon: Layers,
    title: 'Product Strategy aplicada',
    text: 'Uso mentalidad de producto para alinear equipos, priorizar valor y ejecutar transformaciones sin perder gobernanza.',
  },
];

const timeline = [
  {
    period: '2023 - Hoy',
    role: 'VP Senior Service Manager - CitiService, Citi Argentina',
    summary:
      'Gestión de servicio corporativo end-to-end, mejora de SLAs críticos y liderazgo de iniciativas de transformación digital con AI.',
  },
  {
    period: '2022 - 2023',
    role: 'Service Delivery Manager - SupportYourApp',
    summary:
      'Escalado de operaciones globales, estandarización de reporting y mejora de eficiencia operativa para cuentas internacionales.',
  },
  {
    period: '2021 - 2022',
    role: 'Global Compliance & Reporting Senior - EY',
    summary:
      'Coordinación de reporting ejecutivo y compliance global, con foco en control, trazabilidad y toma de decisiones.',
  },
  {
    period: '2020 - 2021',
    role: 'Sr Analyst + Team Leader - DiDi',
    summary:
      'Liderazgo de equipos de atención operacional y optimización de tiempos de respuesta en un entorno de alta demanda.',
  },
];

const projects = [
  {
    name: 'SurIA',
    type: 'AI adoption platform',
    challenge: 'Equipos de servicio con alta carga manual, baja trazabilidad y tiempos de respuesta inestables.',
    approach: 'Diseño de flujos asistidos por AI para automatizar tareas repetitivas, asistir decisiones y reducir fricción operativa.',
    impact: [
      'Framework de priorización de casos de uso AI por valor de negocio y factibilidad.',
      'Playbook replicable para escalar adopción de AI en operaciones de servicio.',
      'Mejor visibilidad para líderes con métricas de adopción, calidad y velocidad.',
    ],
    tags: ['AI Adoption', 'Automation', 'Ops Design', 'Execution'],
  },
  {
    name: 'Postales Argentinas',
    type: 'Cultural product venture',
    challenge: 'Construir una marca con identidad local fuerte y ejecución digital consistente en un mercado saturado.',
    approach: 'Estrategia de narrativa de marca, producto visual y distribución digital con ciclos rápidos de aprendizaje.',
    impact: [
      'Posicionamiento diferencial con una propuesta cultural y contemporánea.',
      'Sistema de contenido para sostener frecuencia y coherencia de marca.',
      'Aprendizajes aplicables a product storytelling en contextos corporativos.',
    ],
    tags: ['Brand Strategy', 'Narrative', 'Digital Product', 'Growth'],
  },
];

const capabilities = [
  {
    title: 'AI Adoption Leadership',
    level: 'Avanzado',
    evidence: 'Defino roadmaps de adopción, marco de priorización y rituales para pasar de piloto a capacidad estable.',
  },
  {
    title: 'Service Model Design',
    level: 'Experto',
    evidence: 'Transformo modelos operativos de servicio con foco en SLA, experiencia de cliente y eficiencia.',
  },
  {
    title: 'Product Strategy para entornos enterprise',
    level: 'Avanzado',
    evidence: 'Traduzco objetivos ejecutivos en iniciativas ejecutables con ownership, métricas y gobernanza.',
  },
  {
    title: 'Stakeholder & Change Management',
    level: 'Experto',
    evidence: 'Alineo liderazgo, equipos y áreas de control para ejecutar cambios sin perder estabilidad.',
  },
  {
    title: 'Innovation Program Execution',
    level: 'Avanzado',
    evidence: 'Convierto visión de innovación en programas concretos, con entregables visibles y aprendizaje continuo.',
  },
  {
    title: 'Data-informed decision making',
    level: 'Sólido',
    evidence: 'Diseño tableros y métricas accionables para gestionar performance y calidad de servicio.',
  },
];

const educationItems = [
  {
    label: 'Licenciatura en Administración de Empresas',
    detail: 'Universidad del Este La Plata',
    period: '2015 - 2020',
  },
];

const certifications = [
  'Generative AI for Leaders and Business Professionals',
  'Generative AI Risks and Cyber Security Masterclass',
  'ChatGPT for Finance and Investment Professionals',
  'The Fundamentals of Digital Marketing',
];

const WHATSAPP_NUMBER = '+5492215719109';
const WHATSAPP_MESSAGE = 'Hola Benjamin, vi tu portfolio y quiero contactarte.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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

const contactLinks = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'bibanez00@gmail.com',
    href: 'mailto:bibanez00@gmail.com',
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    value: '/in/ibanezbenjamin',
    href: 'https://www.linkedin.com/in/ibanezbenjamin/',
  },
  {
    icon: <Instagram size={18} />,
    label: 'Instagram',
    value: '@benjaminibanezz',
    href: 'https://www.instagram.com/benjaminibanezz/',
  },
  {
    icon: <WhatsAppIcon size={18} />,
    label: 'WhatsApp',
    value: WHATSAPP_NUMBER,
    href: WHATSAPP_LINK,
  },
];

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  return new Intl.DateTimeFormat('es-AR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};

const SectionTitle: React.FC<{ eyebrow: string; title: string; description: string }> = ({
  eyebrow,
  title,
  description,
}) => (
  <div className="section-title">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: socialData, loading: socialLoading, error: socialError } = useSocialFeed();

  const instagramItems = socialData.instagram.items;
  const linkedinItems = socialData.linkedin.items;

  const socialStatus = useMemo(() => {
    if (socialData.instagram.source === 'instagram_api') {
      return 'Instagram conectado en vivo vía Meta Graph API';
    }
    return 'Instagram en modo curado temporal (fallback cacheado)';
  }, [socialData.instagram.source]);

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">BI</span>
            <span className="brand-copy">
              <strong>Benjamin Ibanez</strong>
              <small>AI adoption | Product strategy | Service transformation</small>
            </span>
          </a>

          <nav className="nav-desktop">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <button className="menu-trigger" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menú">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            <div className="container mobile-nav-items">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div>
              <span className="hero-badge">
                <MapPin size={14} /> La Plata, Buenos Aires | Disponible para colaboraciones estratégicas
              </span>
              <h1>
                Convierto AI adoption
                <span> en resultados de negocio.</span>
              </h1>
              <p>
                Soy VP Senior Service Manager en CitiService. Combino experiencia en banca corporativa, ejecución operativa y
                product strategy para diseñar transformaciones de alto impacto que sí llegan a producción.
              </p>

              <div className="hero-cta-row">
                <a className="btn btn-primary" href="#projects">
                  Ver proyectos <ArrowRight size={16} />
                </a>
                <a className="btn btn-secondary" href="https://www.linkedin.com/in/ibanezbenjamin/" target="_blank" rel="noreferrer">
                  Conectar en LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="metric-grid">
                {impactMetrics.map((metric) => (
                  <article key={metric.value + metric.label} className="metric-card">
                    <strong>{metric.value}</strong>
                    <p>{metric.label}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="hero-aside">
              <div className="hero-portrait-wrap">
                <img src={profileImage} alt="Benjamin Ibanez" className="hero-portrait" />
              </div>
              <p className="eyebrow">Posicionamiento</p>
              <h3>Perfil híbrido para entornos complejos</h3>
              <p>
                Lidero la intersección entre estrategia, operaciones y tecnología para acelerar decisión, ejecución y resultados en
                negocios de servicio.
              </p>
              <ul>
                <li>
                  <CheckCircle2 size={16} /> Visión enterprise con mentalidad builder.
                </li>
                <li>
                  <CheckCircle2 size={16} /> Foco en impacto medible, no en experimentos aislados.
                </li>
                <li>
                  <CheckCircle2 size={16} /> Capacidad de alinear negocio, riesgo y ejecución.
                </li>
              </ul>
              <a className="inline-link" href="mailto:bibanez00@gmail.com">
                Iniciar conversación <ExternalLink size={15} />
              </a>
            </aside>
          </div>
        </section>

        <section className="section" id="story">
          <div className="container">
            <SectionTitle
              eyebrow="Propuesta de valor"
              title="No solo gestiono operaciones: construyo capacidades de transformación"
              description="Mi diferencial es integrar disciplina enterprise con velocidad de producto para llevar ideas de innovación a resultados sostenibles."
            />
            <div className="pillar-grid">
              {valuePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article key={pillar.title} className="panel panel-hover">
                    <span className="icon-box">
                      <Icon size={20} />
                    </span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section-muted" id="experience">
          <div className="container">
            <SectionTitle
              eyebrow="Trayectoria"
              title="Experiencia construida en servicio corporativo, compliance y operaciones globales"
              description="Un recorrido que combina rigor operativo, liderazgo de equipos y ejecución de iniciativas estratégicas."
            />
            <div className="timeline-list">
              {timeline.map((item) => (
                <article key={item.role} className="timeline-item panel">
                  <div className="timeline-meta">
                    <span>{item.period}</span>
                    <Briefcase size={16} />
                  </div>
                  <h3>{item.role}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <SectionTitle
              eyebrow="Proyectos"
              title="Iniciativas con contexto, criterio de priorización e impacto"
              description="Cada proyecto está pensado como una plataforma de aprendizaje y ejecución para resolver problemas reales de negocio."
            />
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className="panel project-card">
                  <div className="project-head">
                    <h3>{project.name}</h3>
                    <span>{project.type}</span>
                  </div>
                  <div className="project-block">
                    <p className="label">Problema</p>
                    <p>{project.challenge}</p>
                  </div>
                  <div className="project-block">
                    <p className="label">Enfoque</p>
                    <p>{project.approach}</p>
                  </div>
                  <div className="project-block">
                    <p className="label">Impacto</p>
                    <ul>
                      {project.impact.map((point) => (
                        <li key={point}>
                          <CheckCircle2 size={14} /> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="chip-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-muted" id="capabilities">
          <div className="container">
            <SectionTitle
              eyebrow="Capacidades"
              title="Skills priorizadas por valor, no por barras de porcentaje"
              description="Este stack refleja dónde agrego más valor estratégico y operativo en entornos de transformación."
            />
            <div className="capability-grid">
              {capabilities.map((capability) => (
                <article key={capability.title} className="panel capability-card">
                  <div className="capability-head">
                    <h3>{capability.title}</h3>
                    <span>{capability.level}</span>
                  </div>
                  <p>{capability.evidence}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="education">
          <div className="container">
            <SectionTitle
              eyebrow="Formación"
              title="Base académica y upskilling continuo orientado a AI + negocio"
              description="Formación formal más certificaciones prácticas para liderar transformaciones en contextos enterprise."
            />
            <div className="education-grid">
              <article className="panel">
                <h3>Formación académica</h3>
                <div className="edu-list">
                  {educationItems.map((item) => (
                    <div key={item.label}>
                      <strong>{item.label}</strong>
                      <p>{item.detail}</p>
                      <span>{item.period}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <h3>Certificaciones destacadas</h3>
                <div className="cert-list">
                  {certifications.map((certification) => (
                    <p key={certification}>
                      <Sparkles size={14} /> {certification}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-muted" id="social">
          <div className="container">
            <SectionTitle
              eyebrow="Presencia digital"
              title="Sección social conectada para producción"
              description="Instagram consume API real cuando hay credenciales. LinkedIn usa una capa curada y mantenible sin scraping."
            />

            <div className="social-status panel">
              <p>
                <Target size={16} /> {socialStatus}
              </p>
              <p>
                <Linkedin size={16} /> LinkedIn curado manualmente desde dataset estructurado y versionable.
              </p>
            </div>

            {socialError ? <div className="social-alert">No se pudo refrescar el feed en vivo. Se muestra fallback curado.</div> : null}

            <div className="social-grid">
              <article className="panel social-card">
                <div className="social-head">
                  <div>
                    <h3>Instagram</h3>
                    <p>Últimos contenidos visuales</p>
                  </div>
                  <a href={socialData.instagram.profileUrl} target="_blank" rel="noreferrer">
                    Ver perfil <ArrowUpRight size={15} />
                  </a>
                </div>

                {socialLoading ? (
                  <div className="instagram-grid instagram-loading">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={`ig-skeleton-${index}`} className="skeleton-box" />
                    ))}
                  </div>
                ) : instagramItems.length === 0 ? (
                  <div className="empty-state">Todavía no hay posts para mostrar.</div>
                ) : (
                  <div className="instagram-grid">
                    {instagramItems.map((post) => (
                      <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="instagram-item">
                        <img src={post.imageUrl} alt={post.title} loading="lazy" />
                        <span>{post.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </article>

              <article className="panel social-card">
                <div className="social-head">
                  <div>
                    <h3>LinkedIn Insights</h3>
                    <p>Feed editorial curado para marca profesional</p>
                  </div>
                  <a href={socialData.linkedin.profileUrl} target="_blank" rel="noreferrer">
                    Ir a LinkedIn <ArrowUpRight size={15} />
                  </a>
                </div>

                {socialLoading ? (
                  <div className="linkedin-list">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={`li-skeleton-${index}`} className="skeleton-line" />
                    ))}
                  </div>
                ) : linkedinItems.length === 0 ? (
                  <div className="empty-state">Todavía no hay entradas curadas.</div>
                ) : (
                  <div className="linkedin-list">
                    {linkedinItems.map((post) => (
                      <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="linkedin-item">
                        <div className="linkedin-meta">
                          <span>{post.tag ?? 'LinkedIn'}</span>
                          <time>{formatDate(post.publishedAt)}</time>
                        </div>
                        <h4>{post.title}</h4>
                        <p>{post.excerpt}</p>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <SectionTitle
              eyebrow="Contacto"
              title="Si estás impulsando AI adoption o transformación de servicio, conversemos"
              description="Disponible para colaboraciones en consultoría estratégica, advisory en adopción AI y proyectos de innovación aplicada."
            />

            <div className="contact-grid">
              {contactLinks.map((item) => {
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="panel contact-item">
                    <span>
                      {item.icon}
                    </span>
                    <p>{item.label}</p>
                    <strong>{item.value}</strong>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>Benjamin Ibanez | AI adoption, product strategy, service transformation</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Volver arriba <ChevronUp size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
}
