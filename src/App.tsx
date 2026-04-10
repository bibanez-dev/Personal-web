/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Linkedin, 
  Instagram, 
  Mail, 
  MapPin, 
  Briefcase, 
  ChevronUp, 
  ExternalLink,
  Globe,
  Award,
  BookOpen,
  Cpu,
  TrendingUp,
  Users,
  Smartphone,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'es' | 'en';

interface Translation {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translation = {
  nav_about: { es: 'Sobre mí', en: 'About me' },
  nav_exp: { es: 'Experiencia', en: 'Experience' },
  nav_projects: { es: 'Proyectos', en: 'Projects' },
  nav_skills: { es: 'Skills', en: 'Skills' },
  nav_edu: { es: 'Formación', en: 'Education' },
  nav_social: { es: 'Social', en: 'Social' },
  nav_contact: { es: 'Contacto', en: 'Contact' },
  hero_badge: { es: 'La Plata, Buenos Aires · Disponible para conectar', en: 'La Plata, Buenos Aires · Open to connect' },
  hero_subtitle: { es: 'VP · Senior Service Manager · CitiService', en: 'VP · Senior Service Manager · CitiService' },
  hero_desc: { es: 'Liderando la excelencia operativa y la transformación digital en servicios financieros corporativos, con un enfoque estratégico en la adopción de Inteligencia Artificial Generativa.', en: 'Leading operational excellence and digital transformation in corporate financial services, with a strategic focus on Generative AI adoption.' },
  hero_btn_contact: { es: 'Contactar', en: 'Contact' },
  hero_btn_linkedin: { es: 'LinkedIn', en: 'LinkedIn' },
  hero_stat_citi: { es: 'CitiService', en: 'CitiService' },
  hero_stat_ai: { es: 'Proyecto de IA', en: 'AI Project' },
  hero_stat_culture: { es: 'Cultura argentina', en: 'Argentine Culture' },
  hero_stat_tz: { es: 'La Plata / GMT-3', en: 'La Plata / GMT-3' },
  card_employee: { es: 'EMPLEADO CITI', en: 'CITI EMPLOYEE' },
  about_title: { es: 'Sobre mí', en: 'About me' },
  about_p1: { es: 'Como <strong>VP Senior Service Manager</strong> en <strong>CitiService</strong>, mi misión es optimizar la experiencia de clientes corporativos a través de modelos operativos eficientes y soluciones innovadoras.', en: 'As a <strong>Senior Service Manager VP</strong> at <strong>CitiService</strong>, my mission is to optimize the corporate client experience through efficient operating models and innovative solutions.' },
  about_p2: { es: 'Actualmente lidero iniciativas de <strong>adopción de GenAI</strong> internamente, transformando procesos tradicionales en flujos de trabajo inteligentes y automatizados que escalan el valor del negocio.', en: 'I currently lead <strong>GenAI adoption</strong> initiatives internally, transforming traditional processes into intelligent, automated workflows that scale business value.' },
  about_p3: { es: 'Apasionado por el <strong>producto y la innovación</strong>, busco constantemente el equilibrio entre la robustez de la banca global y la agilidad del ecosistema emprendedor.', en: 'Passionate about <strong>product and innovation</strong>, I constantly seek the balance between the robustness of global banking and the agility of the entrepreneurial ecosystem.' },
  info_company: { es: 'Empresa', en: 'Company' },
  info_role: { es: 'Rol', en: 'Role' },
  info_area: { es: 'Área', en: 'Area' },
  info_location: { es: 'Ubicación', en: 'Location' },
  info_projects: { es: 'Proyectos', en: 'Projects' },
  exp_title: { es: 'Experiencia', en: 'Experience' },
  exp_citi_badge: { es: 'Actual · 3 años+', en: 'Current · 3 years+' },
  exp_citi_desc: { es: 'Gestión end-to-end de clientes corporativos, transformación digital, GenAI.', en: 'End-to-end management of corporate clients, digital transformation, GenAI.' },
  exp_sya_desc: { es: 'Onboarding y reportes de servicio para clientes globales.', en: 'Onboarding and service reporting for global clients.' },
  exp_ey_desc: { es: 'Service Management Office en cumplimiento global y reportes.', en: 'Service Management Office in global compliance and reporting.' },
  exp_didi_desc: { es: 'Operaciones y liderazgo de equipo en el centro de conductores.', en: 'Operations and team leadership at the driver center.' },
  exp_acc_desc: { es: 'Control de proyectos y automatización de operaciones de seguridad.', en: 'Project control and security operations automation.' },
  proj_title: { es: 'Proyectos', en: 'Projects' },
  proj_suria_cat: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
  proj_suria_desc: { es: 'Plataforma de IA para automatizar y escalar procesos...', en: 'AI platform to automate and scale processes...' },
  proj_postales_cat: { es: 'Cultura & Diseño', en: 'Culture & Design' },
  proj_postales_desc: { es: 'Marca cultural que celebra la identidad argentina...', en: 'Cultural brand celebrating Argentine identity...' },
  skills_title: { es: 'Skills', en: 'Skills' },
  skills_cat1: { es: 'Optimización & Servicio', en: 'Optimization & Service' },
  skills_cat2: { es: 'AI & Tecnología', en: 'AI & Technology' },
  skills_cat3: { es: 'Liderazgo & Proyectos', en: 'Leadership & Projects' },
  edu_title: { es: 'Formación & Certificaciones', en: 'Education & Certifications' },
  edu_uni: { es: 'Universidad Del Este La Plata', en: 'Universidad Del Este La Plata' },
  edu_degree: { es: 'Lic. en Administración de Empresas', en: 'B.S. in Business Administration' },
  social_title: { es: 'Social', en: 'Social' },
  social_ig_preview: { es: 'Vista previa — imágenes reales desde Instagram', en: 'Preview — real images from Instagram' },
  social_li_post1: { es: 'Explorando el impacto de la <strong>IA Generativa</strong> en la banca corporativa. La eficiencia no es solo velocidad, es precisión.', en: 'Exploring the impact of <strong>Generative AI</strong> in corporate banking. Efficiency is not just speed, it is precision.' },
  social_li_post2: { es: 'Orgulloso del progreso con <strong>SurIA</strong>. Automatizar lo repetitivo para liberar el potencial creativo.', en: 'Proud of the progress with <strong>SurIA</strong>. Automating the repetitive to unleash creative potential.' },
  social_li_post3: { es: '<strong>Postales Argentinas</strong>: conectando con nuestras raíces a través del diseño moderno.', en: '<strong>Postales Argentinas</strong>: connecting with our roots through modern design.' },
  social_li_connect: { es: 'Conectar en LinkedIn', en: 'Connect on LinkedIn' },
  contact_title: { es: 'Contacto', en: 'Contact' },
  contact_desc: { es: '¿Interesado en colaborar o charlar sobre innovación? Estoy a un mensaje de distancia.', en: 'Interested in collaborating or chatting about innovation? I am just a message away.' },
  footer_copy: { es: '© 2026 · Buenos Aires', en: '© 2026 · Buenos Aires' },
  footer_top: { es: 'Volver arriba', en: 'Back to top' },
};

interface SkillBarProps {
  label: string;
  percentage: number;
  animate: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ label, percentage, animate }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-citi-medium">{percentage}%</span>
      </div>
      <div className="skill-bar-container">
        <div 
          className="skill-bar-fill" 
          style={{ width: animate ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [skillsVisible, setSkillsVisible] = useState<boolean>(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => {
    return translations[key] ? translations[key][lang] : key;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="glass-nav h-16 flex items-center px-6 md:px-12">
        <div className="flex items-center gap-4">
          <div className="w-[2px] h-6 bg-citi-red"></div>
          <span className="font-bold text-lg tracking-tight text-citi-blue">Benjamín Ibáñez</span>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {['about', 'exp', 'projects', 'skills', 'edu', 'social', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="text-sm font-medium text-gray-600 hover:text-citi-blue transition-colors"
            >
              {t(`nav_${item}`)}
            </a>
          ))}
        </div>
        
        <div className="flex-1 md:flex-none flex justify-end">
          <div className="bg-gray-100 p-1 rounded-full flex gap-1">
            <button 
              onClick={() => setLang('es')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'es' ? 'bg-citi-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ES
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-citi-blue text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col">
        <div className="citi-gradient-bar"></div>
        
        <div className="flex-1 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 py-12">
          {/* Left Column */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-green"></span>
              <span className="text-xs font-medium text-gray-600">{t('hero_badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-citi-blue leading-tight mb-4">
              Benjamín Ibáñez
            </h1>
            
            <h2 className="text-xl md:text-2xl font-semibold text-citi-medium mb-6">
              {t('hero_subtitle')}
            </h2>
            
            <p className="text-lg text-gray-500 font-light max-w-[540px] leading-relaxed mb-8">
              {t('hero_desc')}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-8 py-3 bg-citi-blue text-white font-bold rounded-lg hover:bg-citi-medium transition-all shadow-md hover:shadow-lg">
                {t('hero_btn_contact')}
              </button>
              <button className="px-8 py-3 border-2 border-citi-blue text-citi-blue font-bold rounded-lg hover:bg-citi-pale transition-all">
                {t('hero_btn_linkedin')}
              </button>
            </div>
            
            <div className="flex items-center gap-6 py-4 border-t border-gray-200">
              {[
                { label: t('hero_stat_citi') },
                { label: t('hero_stat_ai') },
                { label: t('hero_stat_culture') },
                { label: t('hero_stat_tz') }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
                  {i < 3 && <div className="w-[1px] h-4 bg-gray-200"></div>}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Employee Card */}
          <div className="w-full md:w-auto flex justify-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-[280px] bg-white rounded-2xl shadow-medium border-t-4 border-linear-to-r from-citi-blue to-citi-red overflow-hidden"
            >
              <div className="p-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-citi-blue to-citi-medium flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-inner">
                  BI
                </div>
                <h3 className="font-bold text-lg text-citi-blue">Benjamín Ibáñez</h3>
                <p className="text-xs text-citi-medium font-medium mb-4">VP · Senior Service Manager</p>
                
                <div className="w-full h-[1px] bg-gray-100 mb-4"></div>
                
                <div className="w-full space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Briefcase size={14} className="text-citi-blue" />
                    <span>Citi Argentina</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={14} className="text-citi-blue" />
                    <span>La Plata, AR</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={14} className="text-citi-blue" />
                    <span className="truncate">bibanez00@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Zap size={14} className="text-citi-blue" />
                    <span>SurIA · Postales ARG</span>
                  </div>
                </div>
                
                <div className="w-full py-2 bg-citi-pale rounded-lg flex items-center justify-center gap-2">
                  <div className="w-6 h-4 bg-citi-blue rounded-sm flex items-center justify-center">
                    <div className="w-3 h-2 border-t-2 border-white rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-black text-citi-blue tracking-tighter">{t('card_employee')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Stats Bar */}
        <div className="bg-citi-pale py-8">
          <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-between gap-8">
            {[
              { val: '10+', label: lang === 'es' ? 'Años de Experiencia' : 'Years of Experience' },
              { val: '500+', label: lang === 'es' ? 'Clientes Corporativos' : 'Corporate Clients' },
              { val: '15+', label: lang === 'es' ? 'Proyectos GenAI' : 'GenAI Projects' },
              { val: '2', label: lang === 'es' ? 'Emprendimientos' : 'Ventures' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-extrabold text-citi-blue">{item.val}</span>
                <span className="text-xs font-bold text-citi-medium uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-citi-blue mb-8">{t('about_title')}</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p dangerouslySetInnerHTML={{ __html: t('about_p1') }} />
                <p dangerouslySetInnerHTML={{ __html: t('about_p2') }} />
                <p dangerouslySetInnerHTML={{ __html: t('about_p3') }} />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-8">
              <div className="flex flex-wrap gap-3">
                {[
                  '🚀 Client Optimization', '⚙️ Operating Models', '🤖 GenAI Adoption', 
                  '🏦 Banca Corporativa', '💡 Entrepreneurship', '🇦🇷 Culture', 
                  '🌍 Global mindset', '🗣️ ES/EN'
                ].map((pill, i) => (
                  <div 
                    key={i} 
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-citi-pale hover:border-citi-medium transition-all cursor-default"
                  >
                    {pill}
                  </div>
                ))}
              </div>
              
              <div className="bg-white rounded-xl shadow-subtle border border-gray-100 overflow-hidden">
                <div className="bg-citi-blue p-4">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest">Información Profesional</h4>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: t('info_company'), val: 'Citi Argentina' },
                    { label: t('info_role'), val: 'VP · Senior Service Manager' },
                    { label: t('info_area'), val: 'CitiService' },
                    { label: t('info_location'), val: 'La Plata, Buenos Aires' },
                    { label: 'Email', val: 'bibanez00@gmail.com' },
                    { label: t('info_projects'), val: 'SurIA · Postales Argentinas' }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-xs font-bold text-gray-400 uppercase">{row.label}</span>
                      <span className="text-sm font-semibold text-citi-blue">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="exp" className="py-24 bg-citi-bg">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-citi-blue mb-16 text-center">{t('exp_title')}</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                company: 'Citi',
                role: 'VP Senior Service Manager · CitiService',
                period: 'ene 2023–presente',
                badge: t('exp_citi_badge'),
                desc: t('exp_citi_desc'),
                icon: <div className="w-full h-full bg-citi-blue flex items-center justify-center text-white font-black text-xs">citi</div>
              },
              {
                company: 'SupportYourApp',
                role: 'Service Delivery Manager',
                period: 'feb 2022–ene 2023',
                badge: '1 año',
                desc: t('exp_sya_desc'),
                icon: <div className="w-full h-full bg-white flex items-center justify-center text-xl">🎧</div>
              },
              {
                company: 'EY',
                role: 'Global Compliance & Reporting Senior',
                period: 'dic 2021–feb 2022',
                badge: '3 meses',
                desc: t('exp_ey_desc'),
                icon: <div className="w-full h-full bg-[#2E2E38] flex items-center justify-center text-[#FFE600] font-bold text-xs">EY</div>
              },
              {
                company: 'DiDi',
                role: 'Driver Center Sr. Analyst + Team Leader',
                period: 'jun 2020–dic 2021',
                badge: '1 año 7 meses',
                desc: t('exp_didi_desc'),
                icon: <div className="w-full h-full bg-black flex items-center justify-center text-[#FF7D00] font-bold text-xs">DiDi</div>
              },
              {
                company: 'Accenture',
                role: 'PMO Analyst + Security Operations',
                period: 'jul 2014–sep 2017',
                badge: '3 años 3 meses',
                desc: t('exp_acc_desc'),
                icon: <div className="w-full h-full bg-[#A100FF] flex items-center justify-center text-white font-bold text-xs text-center leading-tight">ACC</div>
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative flex gap-6 p-6 bg-white rounded-xl border border-transparent hover:border-citi-pale hover:shadow-medium transition-all duration-300"
              >
                <div className="flex-none w-12 h-12 rounded-lg overflow-hidden shadow-sm">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg text-citi-blue">{item.company}</h3>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${i === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-citi-medium mb-3">
                    <span>{item.role}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400 font-normal">{item.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-citi-blue mb-16 text-center">{t('proj_title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'SurIA',
                cat: t('proj_suria_cat'),
                desc: t('proj_suria_desc'),
                tags: ['AI', 'Automation', 'LLMs', 'SaaS'],
                icon: <Cpu className="text-citi-blue" />
              },
              {
                name: 'Postales Argentinas',
                cat: t('proj_postales_cat'),
                desc: t('proj_postales_desc'),
                tags: ['Culture', 'Design', 'Brand', 'Argentina'],
                icon: <Globe className="text-citi-blue" />
              }
            ].map((proj, i) => (
              <div 
                key={i} 
                className="group p-8 bg-white border border-gray-100 rounded-2xl shadow-subtle hover:shadow-medium hover:-translate-y-1 hover:border-t-4 hover:border-t-citi-pale transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-citi-pale rounded-xl flex items-center justify-center">
                    {proj.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-citi-blue">{proj.name}</h3>
                    <span className="text-xs font-bold text-citi-medium uppercase tracking-widest">{proj.cat}</span>
                  </div>
                </div>
                <p className="text-gray-500 mb-8 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((tag, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-24 bg-citi-bg">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-citi-blue mb-16 text-center">{t('skills_title')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('skills_cat1'),
                icon: '📈',
                skills: [
                  { label: 'Client Optimization', val: 95 },
                  { label: 'Operating Model Optimization', val: 92 },
                  { label: 'Service Transformation', val: 90 },
                  { label: 'Gestión de stakeholders', val: 93 }
                ]
              },
              {
                title: t('skills_cat2'),
                icon: '🤖',
                skills: [
                  { label: 'GenAI / LLMs', val: 90 },
                  { label: 'Adopción de IA', val: 88 },
                  { label: 'Digital Transformation', val: 85 },
                  { label: 'Automation & Self-service', val: 87 }
                ]
              },
              {
                title: t('skills_cat3'),
                icon: '🎯',
                skills: [
                  { label: 'Liderazgo de equipos', val: 91 },
                  { label: 'Gestión de proyectos', val: 89 },
                  { label: 'Estrategia de negocio', val: 86 },
                  { label: 'Emprendimiento', val: 88 }
                ]
              }
            ].map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-subtle border border-gray-100">
                <div className="bg-citi-pale p-6 border-b border-gray-100 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-bold text-citi-blue">{cat.title}</h3>
                </div>
                <div className="p-6">
                  {cat.skills.map((skill, j) => (
                    <SkillBar 
                      key={j} 
                      label={skill.label} 
                      percentage={skill.val} 
                      animate={skillsVisible} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="edu" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-citi-blue mb-16 text-center">{t('edu_title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-citi-blue" />
                <h3 className="text-xl font-bold text-citi-blue uppercase tracking-widest text-sm">Educación Formal</h3>
              </div>
              <div className="p-6 bg-citi-bg rounded-2xl border border-gray-100">
                <h4 className="font-bold text-citi-blue mb-1">{t('edu_uni')}</h4>
                <p className="text-citi-medium font-semibold text-sm mb-4">{t('edu_degree')}</p>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">2015–2020</span>
              </div>
            </div>
            
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-citi-blue" />
                <h3 className="text-xl font-bold text-citi-blue uppercase tracking-widest text-sm">Certificaciones</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: 'Generative AI for Leaders & Business Professionals', icon: '🤖' },
                  { title: 'Generative AI – Risks & Cyber Security Masterclass 2024', icon: '🔐' },
                  { title: 'ChatGPT for Finance and Investment Professionals', icon: '💹' },
                  { title: 'The Fundamentals of Digital Marketing', icon: '📱' }
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-subtle transition-all">
                    <span className="text-xl">{cert.icon}</span>
                    <span className="text-sm font-semibold text-gray-700">{cert.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section id="social" className="py-24 bg-citi-bg">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-citi-blue mb-16 text-center">{t('social_title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Instagram @benjaminibanezz */}
            <div className="bg-white rounded-2xl shadow-subtle overflow-hidden border border-gray-100">
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-linear-to-br from-citi-blue to-citi-medium flex items-center justify-center text-white text-[10px] font-bold">BI</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">@benjaminibanezz</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instagram</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all">
                  Ver perfil
                </button>
              </div>
              <div className="grid grid-cols-3 p-1 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="aspect-square bg-linear-to-br from-gray-100 to-gray-200 relative group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-xl opacity-40">📸</div>
                    <div className="absolute inset-0 bg-citi-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Instagram className="text-white" size={20} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <span className="text-[10px] text-gray-400 font-medium italic">{t('social_ig_preview')}</span>
              </div>
            </div>
            
            {/* Instagram @postalesargentinas */}
            <div className="bg-white rounded-2xl shadow-subtle overflow-hidden border border-gray-100">
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-400 to-yellow-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-citi-blue flex items-center justify-center text-yellow-400 text-[10px] font-black">PA</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">@postalesargentinas</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instagram</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-all">
                  Ver perfil
                </button>
              </div>
              <div className="grid grid-cols-3 p-1 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="aspect-square bg-linear-to-br from-blue-50 to-yellow-50 relative group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-xl opacity-40">🇦🇷</div>
                    <div className="absolute inset-0 bg-citi-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Instagram className="text-white" size={20} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <span className="text-[10px] text-gray-400 font-medium italic">{t('social_ig_preview')}</span>
              </div>
            </div>
          </div>
          
          {/* LinkedIn Widget */}
          <div className="bg-white rounded-2xl shadow-subtle border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-citi-blue to-citi-medium flex items-center justify-center text-white text-xl font-bold shadow-sm">BI</div>
                <div>
                  <h4 className="font-bold text-lg text-gray-800">Benjamín Ibáñez</h4>
                  <p className="text-xs text-citi-medium font-semibold">VP Senior Service Manager | GenAI Adoption | Innovation</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-citi-pale text-citi-blue font-bold rounded-full hover:bg-citi-blue hover:text-white transition-all shadow-sm">
                {t('social_li_connect')}
              </button>
            </div>
            
            <div className="p-8 grid md:grid-cols-3 gap-6">
              {[
                { text: t('social_li_post1'), date: '2d' },
                { text: t('social_li_post2'), date: '1w' },
                { text: t('social_li_post3'), date: '3w' }
              ].map((post, i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-citi-blue flex items-center justify-center text-white text-[10px] font-bold">BI</div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-800">Benjamín Ibáñez</span>
                      <span className="text-[8px] text-gray-400">{post.date} • 🌐</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6 flex-1" dangerouslySetInnerHTML={{ __html: post.text }} />
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 hover:text-citi-blue cursor-pointer">Me gusta</span>
                      <span className="text-[10px] font-bold text-gray-400 hover:text-citi-blue cursor-pointer">Comentar</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 hover:text-citi-blue cursor-pointer">Compartir</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-citi-blue mb-8 text-center">{t('contact_title')}</h2>
          <p className="text-center text-gray-500 max-w-[500px] mx-auto mb-16 leading-relaxed">
            {t('contact_desc')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Mail className="text-citi-blue" />, label: 'Email', val: 'bibanez00@gmail.com' },
              { icon: <Linkedin className="text-citi-blue" />, label: 'LinkedIn', val: 'ibanezbenjamin' },
              { icon: <Instagram className="text-citi-blue" />, label: 'Instagram', val: '@benjaminibanezz' }
            ].map((item, i) => (
              <div 
                key={i} 
                className="p-8 bg-white border border-gray-100 rounded-2xl shadow-subtle hover:shadow-medium hover:-translate-y-1 hover:border-citi-pale transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-citi-pale rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{item.label}</span>
                <span className="text-sm font-bold text-citi-blue">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-citi-blue py-12 text-white">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-[2px] h-6 bg-citi-red"></div>
            <span className="font-bold text-lg tracking-tight">Benjamín Ibáñez</span>
          </div>
          
          <div className="text-sm font-medium text-blue-200">
            {t('footer_copy')}
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200 transition-colors group"
          >
            {t('footer_top')}
            <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
}
