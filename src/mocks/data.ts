// Mock data for development/testing

export interface ServiceCard {
  id: string;
  title: string;
  serviceTypeId: string;
  categoryId: string;
  category: string;
  city: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  providerName: string;
  providerAvatar: string;
  description: string;
  tags: string[];
}

export interface ProviderProfile {
  id: string;
  name: string;
  avatar: string;
  city: string;
  bio: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  services: ServiceCard[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: "text" | "image";
}

export const mockServices: ServiceCard[] = [
  {
    id: "1",
    title: "Decoración de cumpleaños infantil",
    serviceTypeId: "2",
    categoryId: "2-1",
    category: "Cumpleaños",
    city: "CDMX",
    price: 2500,
    rating: 4.8,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
    providerName: "Fiestas Mágicas",
    providerAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    description: "Decoración profesional para cumpleaños con temática personalizada",
    tags: ["Experiencia", "Profesional", "Decoración"],
  },
  {
    id: "2",
    title: "Limpieza profunda del hogar",
    serviceTypeId: "1",
    categoryId: "1-6",
    category: "Limpieza",
    city: "CDMX",
    price: 800,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1584622281867-8d4c9ec4f577?w=400&h=400&fit=crop",
    providerName: "Limpios & Brillantes",
    providerAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    description: "Limpieza integral del hogar con productos ecológicos",
    tags: ["Confiable", "Rápido", "Eco-friendly"],
  },
  {
    id: "3",
    title: "Fotografía de eventos",
    serviceTypeId: "2",
    categoryId: "2-3",
    category: "Fotografía",
    city: "CDMX",
    price: 3500,
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    providerName: "Momentos Captured",
    providerAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    description: "Cobertura fotográfica profesional para bodas, cumpleaños y eventos",
    tags: ["Profesional", "Portafolio", "Edición"],
  },
  {
    id: "4",
    title: "Reparación de electrodomésticos",
    serviceTypeId: "6",
    categoryId: "6-1",
    category: "Reparaciones",
    city: "CDMX",
    price: 400,
    rating: 4.6,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1547457373-d7214714519e?w=400&h=400&fit=crop",
    providerName: "Técnico Rápido",
    providerAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    description: "Reparación rápida y garantizada de todos los electrodomésticos",
    tags: ["Urgente", "Garantía", "Experiencia"],
  },
  {
    id: "5",
    title: "Clases de yoga y meditación",
    serviceTypeId: "5",
    categoryId: "5-1",
    category: "Bienestar",
    city: "CDMX",
    price: 300,
    rating: 4.9,
    reviewCount: 127,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    providerName: "Zen Flow",
    providerAvatar:
      "https://images.unsplash.com/photo-1517841905240-1c675cb57c60?w=150&h=150&fit=crop",
    description: "Clases personalizadas de yoga, pilates y meditación",
    tags: ["Certificado", "Flexible", "Grupal"],
  },
  {
    id: "6",
    title: "Instalación y reparación sanitaria",
    serviceTypeId: "1",
    categoryId: "1-1",
    category: "Sanitarios",
    city: "CDMX",
    price: 950,
    rating: 4.7,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=900&h=600&fit=crop",
    providerName: "Sanitarios Rivera",
    providerAvatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    description: "Mantenimiento, instalación y reparación de sanitarios con garantía.",
    tags: ["Garantía", "Domicilio", "Urgencias"],
  },
  {
    id: "7",
    title: "Pintura interior residencial",
    serviceTypeId: "1",
    categoryId: "1-4",
    category: "Pintura",
    city: "CDMX",
    price: 1800,
    rating: 4.8,
    reviewCount: 58,
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&h=700&fit=crop",
    providerName: "Color y Acabados MX",
    providerAvatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop",
    description: "Aplicación profesional de pintura interior con preparación de superficies.",
    tags: ["Acabado fino", "Limpieza", "Presupuesto"],
  },
  {
    id: "8",
    title: "Catering para eventos corporativos",
    serviceTypeId: "2",
    categoryId: "2-2",
    category: "Catering",
    city: "CDMX",
    price: 6200,
    rating: 4.9,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1000&h=650&fit=crop",
    providerName: "Sabores Ejecutivo",
    providerAvatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop",
    description: "Menús personalizados para reuniones de empresa y lanzamientos de marca.",
    tags: ["Menú premium", "Puntualidad", "Personal"],
  },
  {
    id: "9",
    title: "Tutoría de matemáticas secundaria",
    serviceTypeId: "3",
    categoryId: "3-1",
    category: "Tutoría",
    city: "CDMX",
    price: 450,
    rating: 4.8,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=700&fit=crop",
    providerName: "Profe Laura Méndez",
    providerAvatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    description: "Refuerzo de matemáticas con plan semanal y seguimiento por objetivos.",
    tags: ["Online", "Presencial", "Resultados"],
  },
  {
    id: "10",
    title: "Clases de inglés conversacional",
    serviceTypeId: "3",
    categoryId: "3-2",
    category: "Idiomas",
    city: "CDMX",
    price: 500,
    rating: 4.9,
    reviewCount: 138,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1100&h=700&fit=crop",
    providerName: "English Lab",
    providerAvatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop",
    description: "Sesiones enfocadas en conversación para trabajo, viajes y entrevistas.",
    tags: ["B2-C1", "Práctica real", "Flexible"],
  },
  {
    id: "11",
    title: "Servicio de peluquería a domicilio",
    serviceTypeId: "4",
    categoryId: "4-1",
    category: "Peluquería",
    city: "CDMX",
    price: 700,
    rating: 4.7,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&h=700&fit=crop",
    providerName: "Studio Hair Home",
    providerAvatar:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop",
    description: "Corte, peinado y styling profesional sin salir de casa.",
    tags: ["Domicilio", "Profesional", "Reserva rápida"],
  },
  {
    id: "12",
    title: "Masaje descontracturante",
    serviceTypeId: "4",
    categoryId: "4-3",
    category: "Masajes",
    city: "CDMX",
    price: 650,
    rating: 4.8,
    reviewCount: 66,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=680&fit=crop",
    providerName: "Relax Therapy",
    providerAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    description: "Masaje terapéutico orientado a aliviar tensión muscular y estrés.",
    tags: ["Terapéutico", "Cabina", "Certificado"],
  },
  {
    id: "13",
    title: "Asesoría IT para PyMEs",
    serviceTypeId: "6",
    categoryId: "6-2",
    category: "Asesoría IT",
    city: "CDMX",
    price: 1200,
    rating: 4.9,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=680&fit=crop",
    providerName: "IT Partner MX",
    providerAvatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=150&h=150&fit=crop",
    description: "Diagnóstico de infraestructura y plan de mejora tecnológica para PyMEs.",
    tags: ["Consultoría", "Seguridad", "Escalable"],
  },
  {
    id: "14",
    title: "Desarrollo de landing pages",
    serviceTypeId: "6",
    categoryId: "6-3",
    category: "Desarrollo Web",
    city: "CDMX",
    price: 2800,
    rating: 4.8,
    reviewCount: 51,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1100&h=700&fit=crop",
    providerName: "WebLaunch Studio",
    providerAvatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop",
    description: "Diseño y desarrollo de landing pages optimizadas para conversión.",
    tags: ["UI moderna", "SEO", "Analytics"],
  },
];

export const mockProvider: ProviderProfile = {
  id: "1",
  name: "Fiestas Mágicas",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  city: "CDMX",
  bio: "Especialista en decoración y organización de eventos para niños. 8 años de experiencia transformando espacios en lugares mágicos.",
  rating: 4.8,
  reviewCount: 42,
  responseTime: "< 2 horas",
  services: [mockServices[0]],
};

export const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "provider1",
    senderName: "Fiestas Mágicas",
    senderAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "¡Hola! Gracias por tu interés. ¿Cuándo es el cumpleaños?",
    timestamp: new Date(Date.now() - 600000),
    type: "text",
  },
  {
    id: "2",
    senderId: "client1",
    senderName: "Tú",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "Es el próximo sábado 15 de junio. Mi hijo cumple 7 años",
    timestamp: new Date(Date.now() - 300000),
    type: "text",
  },
  {
    id: "3",
    senderId: "provider1",
    senderName: "Fiestas Mágicas",
    senderAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content:
      "¿Cuál es su temática favorita? Tenemos opciones de superhéroes, princesas, dinosaurios...",
    timestamp: new Date(Date.now() - 180000),
    type: "text",
  },
  {
    id: "4",
    senderId: "client1",
    senderName: "Tú",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "Le encantan los dinosaurios! ¿Cuál es tu precio?",
    timestamp: new Date(Date.now() - 60000),
    type: "text",
  },
];

export const categories = [
  {
    id: "1",
    name: "Hogar",
    icon: "🏠",
    subcategories: [
      { id: "1-1", name: "Sanitarios", icon: "🚰" },
      { id: "1-2", name: "Electricidad", icon: "⚡" },
      { id: "1-3", name: "Plomería", icon: "🔧" },
      { id: "1-4", name: "Pintura", icon: "🎨" },
      { id: "1-5", name: "Carpintería", icon: "🪵" },
      { id: "1-6", name: "Limpieza", icon: "🧹" },
    ],
  },
  {
    id: "2",
    name: "Eventos",
    icon: "🎉",
    subcategories: [
      { id: "2-1", name: "Decoración", icon: "✨" },
      { id: "2-2", name: "Catering", icon: "🍽️" },
      { id: "2-3", name: "Fotografía", icon: "📷" },
      { id: "2-4", name: "Música y DJ", icon: "🎵" },
      { id: "2-5", name: "Coordinación", icon: "📋" },
    ],
  },
  {
    id: "3",
    name: "Educación",
    icon: "📚",
    subcategories: [
      { id: "3-1", name: "Tutoría", icon: "👨‍🏫" },
      { id: "3-2", name: "Idiomas", icon: "🌐" },
      { id: "3-3", name: "Música", icon: "🎸" },
      { id: "3-4", name: "Deporte", icon: "⚽" },
      { id: "3-5", name: "Arte", icon: "🖼️" },
    ],
  },
  {
    id: "4",
    name: "Belleza",
    icon: "💅",
    subcategories: [
      { id: "4-1", name: "Peluquería", icon: "💇" },
      { id: "4-2", name: "Manicura", icon: "💅" },
      { id: "4-3", name: "Masajes", icon: "🧖" },
      { id: "4-4", name: "Estetica", icon: "✨" },
    ],
  },
  {
    id: "5",
    name: "Bienestar",
    icon: "🧘",
    subcategories: [
      { id: "5-1", name: "Yoga", icon: "🧘" },
      { id: "5-2", name: "Fitness", icon: "💪" },
      { id: "5-3", name: "Nutrición", icon: "🥗" },
      { id: "5-4", name: "Salud Mental", icon: "🧠" },
    ],
  },
  {
    id: "6",
    name: "Tecnología",
    icon: "💻",
    subcategories: [
      { id: "6-1", name: "Reparación", icon: "🔧" },
      { id: "6-2", name: "Asesoría IT", icon: "👨‍💼" },
      { id: "6-3", name: "Desarrollo Web", icon: "💻" },
      { id: "6-4", name: "Ciberseguridad", icon: "🔒" },
    ],
  },
];
