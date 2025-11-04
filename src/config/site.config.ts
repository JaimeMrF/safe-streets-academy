// ============================================
// CONFIGURACIÓN PRINCIPAL DEL SITIO
// ============================================
// CAMBIA ESTOS VALORES PARA CUSTOMIZAR TU SITIO

export const siteConfig = {
  // ============================================
  // INFORMACIÓN BÁSICA
  // ============================================
  name: "ViaSafe Educación",
  shortName: "VS", // Para el logo cuadrado
  description: "Plataforma educativa integral con contenido interactivo, videos profesionales y recursos descargables adaptados a cada nivel educativo.",
  
  // ============================================
  // COLORES PRINCIPALES (formato HSL)
  // ============================================
  // Cambia estos valores para cambiar todo el esquema de colores del sitio
  colors: {
    primary: "220 90% 56%",      // Azul principal - AQUI CAMBIAS EL COLOR PRINCIPAL
    primaryHover: "220 85% 48%", // Azul hover - Más oscuro que el principal
    accent: "280 60% 50%",       // Morado acento
    secondary: "340 75% 55%",    // Rosa secundario
    
    // Colores por nivel educativo
    preescolar: "#EF4444",      // Rojo
    primaria: "#3B82F6",        // Azul
    secundaria: "#10B981",      // Verde
    bachillerato: "#8B5CF6",    // Morado
  },
  
  // ============================================
  // LOGOTIPOS Y RECURSOS VISUALES
  // ============================================
  // AQUI PONES LA RUTA DE TUS IMAGENES
  logo: {
    url: "/viasafe-logo.png",           // CAMBIA ESTA RUTA A TU LOGO
    alt: "ViaSafe Logo"
  },
  heroImage: {
    url: "/hero-road-safety.jpg",       // CAMBIA ESTA RUTA A TU IMAGEN HERO
    alt: "Educación Vial"
  },
  
  // ============================================
  // VIDEOS EDUCATIVOS
  // ============================================
  // AQUI PONES LOS LINKS DE TUS VIDEOS DE YOUTUBE
  // Formato: https://www.youtube.com/embed/VIDEO_ID
  videos: [
    {
      title: "Semáforos y Señales Básicas",
      duration: "5:30",
      level: "Preescolar",
      // ⚠️ AQUI PONES EL LINK DEL VIDEO ⚠️
      youtubeEmbedUrl: "https://www.youtube.com/embed/VIDEO_ID_AQUI",
      thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
      description: "Aprende los colores del semáforo de forma divertida"
    },
    {
      title: "Cómo Cruzar la Calle Seguro",
      duration: "7:15",
      level: "Primaria",
      // ⚠️ AQUI PONES EL LINK DEL VIDEO ⚠️
      youtubeEmbedUrl: "https://www.youtube.com/embed/VIDEO_ID_AQUI",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      description: "Pasos para cruzar de manera segura"
    },
    {
      title: "Ciclismo Urbano Seguro",
      duration: "10:45",
      level: "Secundaria",
      // ⚠️ AQUI PONES EL LINK DEL VIDEO ⚠️
      youtubeEmbedUrl: "https://www.youtube.com/embed/VIDEO_ID_AQUI",
      thumbnail: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
      description: "Reglas y equipamiento para ciclistas"
    },
    {
      title: "Preparación para la Licencia",
      duration: "12:20",
      level: "Bachillerato",
      // ⚠️ AQUI PONES EL LINK DEL VIDEO ⚠️
      youtubeEmbedUrl: "https://www.youtube.com/embed/VIDEO_ID_AQUI",
      thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
      description: "Todo sobre el examen de conducción"
    }
  ],
  
  // ============================================
  // RECURSOS DESCARGABLES
  // ============================================
  // AQUI PONES LOS LINKS DE TUS ARCHIVOS PDF/ZIP
  resources: [
    {
      title: "Guía de Señales de Tránsito",
      type: "PDF",
      size: "2.5 MB",
      // ⚠️ AQUI PONES EL LINK DEL ARCHIVO ⚠️
      downloadUrl: "/resources/guia-senales.pdf"
    },
    {
      title: "Manual del Peatón",
      type: "PDF",
      size: "1.8 MB",
      // ⚠️ AQUI PONES EL LINK DEL ARCHIVO ⚠️
      downloadUrl: "/resources/manual-peaton.pdf"
    },
    {
      title: "Actividades Imprimibles",
      type: "ZIP",
      size: "5.4 MB",
      // ⚠️ AQUI PONES EL LINK DEL ARCHIVO ⚠️
      downloadUrl: "/resources/actividades.zip"
    }
  ],
  
  // ============================================
  // NIVELES EDUCATIVOS
  // ============================================
  educationLevels: [
    { level: "Preescolar", age: "3-5 años", icon: "🚦" },
    { level: "Primaria", age: "6-11 años", icon: "🚸" },
    { level: "Secundaria", age: "12-14 años", icon: "🚴" },
    { level: "Bachillerato", age: "15-18 años", icon: "🚗" },
  ],
  
  // ============================================
  // NAVEGACIÓN Y LINKS
  // ============================================
  // AQUI DEFINES TODOS LOS LINKS DE NAVEGACIÓN
  navigation: {
    // Links del footer
    footer: {
      product: [
        { name: "Características", href: "#features" },
        { name: "Niveles", href: "#levels" },
        { name: "Recursos", href: "#resources" },
        { name: "Videos", href: "#videos" },
      ],
      company: [
        { name: "Acerca de", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contacto", href: "/contact" },
        { name: "Soporte", href: "/support" },
      ],
      legal: [
        { name: "Privacidad", href: "/privacy" },
        { name: "Términos", href: "/terms" },
        { name: "Cookies", href: "/cookies" },
      ]
    }
  },
  
  // ============================================
  // CONTACTO Y REDES SOCIALES
  // ============================================
  // AQUI PONES TUS REDES SOCIALES Y CONTACTO
  contact: {
    email: "contacto@viasafe.edu",
    phone: "+34 123 456 789",
    address: "Calle Principal 123, Ciudad, País",
    social: {
      facebook: "https://facebook.com/viasafe",
      twitter: "https://twitter.com/viasafe",
      instagram: "https://instagram.com/viasafe",
      youtube: "https://youtube.com/viasafe"
    }
  }
};
