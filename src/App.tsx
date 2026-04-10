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

const navItems = [
  { id: 'story', label: 'Propuesta' },
  { id: 'experience', label: 'Trayectoria' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'capabilities', label: 'Capacidades' },
  { id: 'education', label: 'Formacion' },
  { id: 'social', label: 'Social' },
  { id: 'contact', label: 'Contacto' },
] as const;

const impactMetrics = [
  { value: '10+', label: 'anios liderando operaciones y servicio enterprise' },
  { value: '500+', label: 'clientes corporativos impactados' },
  { value: '15+', label: 'iniciativas AI y automatizacion impulsadas' },
  { value: '3', label: 'frentes estrategicos activos: banca, AI, producto' },
];

const valuePillars = [
  {
    icon: Building2,
    title: 'Enterprise Service Transformation',
    text: 'Redisenio operaciones de servicio complejas para elevar velocidad, consistencia y confianza del cliente corporativo.',
  },
  {
    icon: Brain,
    title: 'AI Adoption con foco de negocio',
    text: 'Convierto GenAI en capacidades reales: casos de uso priorizados, procesos claros y medicion de impacto tangible.',
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
      'Gestion de servicio corporativo end-to-end, mejora de SLAs criticos y liderazgo de iniciativas de transformacion digital con AI.',
  },
  {
    period: '2022 - 2023',
    role: 'Service Delivery Manager - SupportYourApp',
    summary:
      'Escalado de operaciones globales, estandarizacion de reporting y mejora de eficiencia operativa para cuentas internacionales.',
  },
  {
    period: '2021 - 2022',
    role: 'Global Compliance & Reporting Senior - EY',
    summary:
      'Coordinacion de reporting ejecutivo y compliance global, con foco en control, trazabilidad y toma de decisiones.',
  },
  {
    period: '2020 - 2021',
    role: 'Sr Analyst + Team Leader - DiDi',
    summary:
      'Liderazgo de equipos de atencion operacional y optimizacion de tiempos de respuesta en un entorno de alta demanda.',
  },
];

const projects = [
  {
    name: 'SurIA',
    type: 'AI adoption platform',
    challenge: 'Equipos de servicio con alta carga manual, baja trazabilidad y tiempos de respuesta inestables.',
    approach: 'Disenio de flujos asistidos por AI para automatizar tareas repetitivas, asistir decisiones y reducir friccion operativa.',
    impact: [
      'Framework de priorizacion de casos de uso AI por valor de negocio y factibilidad.',
      'Playbook replicable para escalar adopcion de AI en operaciones de servicio.',
      'Mejor visibilidad para lideres con metricas de adopcion, calidad y velocidad.',
    ],
    tags: ['AI Adoption', 'Automation', 'Ops Design', 'Execution'],
  },
  {
    name: 'Postales Argentinas',
    type: 'Cultural product venture',
    challenge: 'Construir una marca con identidad local fuerte y ejecucion digital consistente en un mercado saturado.',
    approach: 'Estrategia de narrativa de marca, producto visual y distribucion digital con ciclos rapidos de aprendizaje.',
    impact: [
      'Posicionamiento diferencial con una propuesta cultural y contemporanea.',
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
    evidence: 'Defino roadmaps de adopcion, marco de priorizacion y rituales para pasar de piloto a capacidad estable.',
  },
  {
    title: 'Service Model Design',
    level: 'Experto',
    evidence: 'Transformo modelos operativos de servicio con foco en SLA, experiencia de cliente y eficiencia.',
  },
  {
    title: 'Product Strategy para entornos enterprise',
    level: 'Avanzado',
    evidence: 'Traduzco objetivos ejecutivos en iniciativas ejecutables con ownership, metricas y gobernanza.',
  },
  {
    title: 'Stakeholder & Change Management',
    level: 'Experto',
    evidence: 'Alineo liderazgo, equipos y areas de control para ejecutar cambios sin perder estabilidad.',
  },
  {
    title: 'Innovation Program Execution',
    level: 'Avanzado',
    evidence: 'Convierto vision de innovacion en programas concretos, con entregables visibles y aprendizaje continuo.',
  },
  {
    title: 'Data-informed decision making',
    level: 'Solido',
    evidence: 'Diseno tableros y metricas accionables para gestionar performance y calidad de servicio.',
  },
];

const educationItems = [
  {
    label: 'Licenciatura en Administracion de Empresas',
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

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'bibanez00@gmail.com',
    href: 'mailto:bibanez00@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/ibanezbenjamin',
    href: 'https://www.linkedin.com/in/ibanezbenjamin/',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@benjaminibanezz',
    href: 'https://www.instagram.com/benjaminibanezz/',
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
      return 'Instagram conectado en vivo via Meta Graph API';
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

          <button className="menu-trigger" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menu">
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
                <MapPin size={14} /> La Plata, Buenos Aires | Disponible para colaboraciones estrategicas
              </span>
              <h1>
                Ayudo a organizaciones a convertir
                <span> AI adoption + service transformation </span>
                en ventaja competitiva real.
              </h1>
              <p>
                Soy VP Senior Service Manager en CitiService. Combino experiencia en banca corporativa, ejecucion operativa y
                product strategy para disenar transformaciones de alto impacto que si llegan a produccion.
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
              <p className="eyebrow">Posicionamiento</p>
              <h3>Perfil hibrido para entornos complejos</h3>
              <p>
                Lidero la interseccion entre estrategia, operaciones y tecnologia para acelerar decision, ejecucion y resultados en
                negocios de servicio.
              </p>
              <ul>
                <li>
                  <CheckCircle2 size={16} /> Vision enterprise con mentalidad builder.
                </li>
                <li>
                  <CheckCircle2 size={16} /> Foco en impacto medible, no en experimentos aislados.
                </li>
                <li>
                  <CheckCircle2 size={16} /> Capacidad de alinear negocio, riesgo y ejecucion.
                </li>
              </ul>
              <a className="inline-link" href="mailto:bibanez00@gmail.com">
                Iniciar conversacion <ExternalLink size={15} />
              </a>
            </aside>
          </div>
        </section>

        <section className="section" id="story">
          <div className="container">
            <SectionTitle
              eyebrow="Propuesta de valor"
              title="No solo gestiono operaciones: construyo capacidades de transformacion"
              description="Mi diferencial es integrar disciplina enterprise con velocidad de producto para llevar ideas de innovacion a resultados sostenibles."
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
              description="Un recorrido que combina rigor operativo, liderazgo de equipos y ejecucion de iniciativas estrategicas."
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
              title="Iniciativas con contexto, criterio de priorizacion e impacto"
              description="Cada proyecto esta pensado como una plataforma de aprendizaje y ejecucion para resolver problemas reales de negocio."
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
              description="Este stack refleja donde agrego mas valor estrategico y operativo en entornos de transformacion."
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
              eyebrow="Formacion"
              title="Base academica y upskilling continuo orientado a AI + negocio"
              description="Formacion formal mas certificaciones practicas para liderar transformaciones en contextos enterprise."
            />
            <div className="education-grid">
              <article className="panel">
                <h3>Formacion academica</h3>
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
              title="Seccion social conectada para produccion"
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
                    <p>Ultimos contenidos visuales</p>
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
                  <div className="empty-state">Todavia no hay posts para mostrar.</div>
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
                  <div className="empty-state">Todavia no hay entradas curadas.</div>
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
              title="Si estas impulsando AI adoption o transformacion de servicio, conversemos"
              description="Disponible para colaboraciones en consultoria estrategica, advisory en adopcion AI y proyectos de innovacion aplicada."
            />

            <div className="contact-grid">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="panel contact-item">
                    <span>
                      <Icon size={18} />
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
