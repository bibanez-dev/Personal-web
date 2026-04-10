import type { SocialFeedPayload } from '../types/social';

export const SOCIAL_FALLBACK_DATA: SocialFeedPayload = {
  instagram: {
    source: 'curated_fallback',
    profileUrl: 'https://www.instagram.com/benjaminibanezz/',
    items: [
      {
        id: 'ig-curated-1',
        url: 'https://www.instagram.com/benjaminibanezz/',
        title: 'Workshop de adopcion GenAI para operaciones de servicio',
        excerpt: 'Marco practico para detectar quick wins de automatizacion y elevar calidad de atencion.',
        imageUrl:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
        publishedAt: '2026-03-21',
        tag: 'AI Adoption',
      },
      {
        id: 'ig-curated-2',
        url: 'https://www.instagram.com/benjaminibanezz/',
        title: 'Ejecucion de pilotos: de idea a impacto en 6 semanas',
        excerpt: 'Como pasar de PoC aisladas a capacidades replicables en equipos de negocio.',
        imageUrl:
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
        publishedAt: '2026-03-14',
        tag: 'Execution',
      },
      {
        id: 'ig-curated-3',
        url: 'https://www.instagram.com/benjaminibanezz/',
        title: 'Service design orientado a clientes corporativos',
        excerpt: 'Diseno de journeys con foco en confiabilidad, tiempos de respuesta y transparencia.',
        imageUrl:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
        publishedAt: '2026-03-02',
        tag: 'Service Transformation',
      },
      {
        id: 'ig-curated-4',
        url: 'https://www.instagram.com/benjaminibanezz/',
        title: 'Product strategy para equipos no-product',
        excerpt: 'Herramientas para priorizar valor en areas operativas y de servicio.',
        imageUrl:
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
        publishedAt: '2026-02-26',
        tag: 'Product Strategy',
      },
      {
        id: 'ig-curated-5',
        url: 'https://www.instagram.com/benjaminibanezz/',
        title: 'Cultura de innovacion con disciplina operativa',
        excerpt: 'Rituales de gestion para experimentar sin perder control del servicio.',
        imageUrl:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
        publishedAt: '2026-02-11',
        tag: 'Innovation',
      },
      {
        id: 'ig-curated-6',
        url: 'https://www.instagram.com/benjaminibanezz/',
        title: 'Dashboard de impacto para iniciativas AI',
        excerpt: 'Metricas clave para alinear liderazgo, adopcion y retorno de iniciativas.',
        imageUrl:
          'https://images.unsplash.com/photo-1551281044-8b1c0f5f57b4?auto=format&fit=crop&w=900&q=80',
        publishedAt: '2026-01-29',
        tag: 'Metrics',
      },
    ],
  },
  linkedin: {
    source: 'curated_manual',
    profileUrl: 'https://www.linkedin.com/in/ibanezbenjamin/',
    lastUpdated: '2026-04-01',
    items: [
      {
        id: 'li-curated-1',
        url: 'https://www.linkedin.com/in/ibanezbenjamin/',
        title: 'AI adoption en banca corporativa: menos hype, mas sistema',
        excerpt:
          'Comparti un framework para priorizar casos de uso por impacto en cliente, riesgo operativo y factibilidad de ejecucion.',
        publishedAt: '2026-03-30',
        tag: 'AI Adoption',
      },
      {
        id: 'li-curated-2',
        url: 'https://www.linkedin.com/in/ibanezbenjamin/',
        title: 'Service transformation con mentalidad de producto',
        excerpt:
          'Una transformacion de servicio sostenible combina ownership transversal, datos utiles y rituales de aprendizaje continuo.',
        publishedAt: '2026-03-18',
        tag: 'Service Transformation',
      },
      {
        id: 'li-curated-3',
        url: 'https://www.linkedin.com/in/ibanezbenjamin/',
        title: 'De operaciones a estrategia: el rol del execution design',
        excerpt:
          'Explique como convertir equipos de operacion en motores de innovacion con foco en valor de negocio y experiencia de cliente.',
        publishedAt: '2026-03-05',
        tag: 'Product Strategy',
      },
      {
        id: 'li-curated-4',
        url: 'https://www.linkedin.com/in/ibanezbenjamin/',
        title: 'Lecciones practicas de liderar iniciativas GenAI internas',
        excerpt:
          'Documente patrones para escalar iniciativas sin friccion con governance y compliance en entornos enterprise.',
        publishedAt: '2026-02-20',
        tag: 'Innovation',
      },
    ],
  },
};
