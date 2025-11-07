// ============================================
// CONFIGURACIÓN PRINCIPAL DEL SITIO - ITAL
// ============================================
// CAMBIA ESTOS VALORES PARA CUSTOMIZAR TU SITIO

export const siteConfig = {
  // ============================================
  // INFORMACIÓN BÁSICA - ITAL OCAÑA
  // ============================================
  name: "ITAL - Educación Vial",
  shortName: "ITAL", // Para el logo cuadrado
  fullName: "Instituto Técnico Alfonso López",
  location: "Ocaña, Norte de Santander, Colombia",
  description: "Plataforma educativa de seguridad vial del Instituto Técnico Alfonso López. Formación integral con contenido interactivo, videos profesionales y recursos descargables.",
  
  // Identidad institucional
  mission: "Formación integral del ser humano mediante investigación, TIC y educación en valores éticos, morales y ambientales.",
  vision: "Ser líder en formación integral, técnica, humana y social, con enfoque empresarial e investigativo.",
  
  // ============================================
  // COLORES INSTITUCIONALES (formato HSL)
  // ============================================
  // Verde institucional del ITAL + blanco
  colors: {
    primary: "142 76% 36%",      // Verde ITAL institucional - AQUI CAMBIAS EL COLOR PRINCIPAL
    primaryHover: "142 76% 28%", // Verde hover - Más oscuro
    accent: "142 60% 45%",       // Verde acento claro
    secondary: "0 0% 100%",      // Blanco secundario
    
    // Colores por nivel educativo (manteniendo verde institucional)
    preescolar: "#22C55E",      // Verde claro
    primaria: "#16A34A",        // Verde medio
    secundaria: "#15803D",      // Verde oscuro
    bachillerato: "#166534",    // Verde muy oscuro
  },
  
  // ============================================
  // LOGOTIPOS Y RECURSOS VISUALES - ITAL
  // ============================================
  // ⚠️ AQUI PONES LA RUTA DE TUS IMAGENES ⚠️
  logo: {
    url: "https://ital.edu.co/wp-content/uploads/2021/10/logo-ital-500-365x365.webp", // Logo ITAL
    alt: "Logo Instituto Técnico Alfonso López"
  },
  banner: {
    url: "https://ital.edu.co/wp-content/uploads/2021/10/bandera-ital.webp", // Bandera ITAL
    alt: "Bandera ITAL"
  },
  heroImage: {
    url: "/hero-road-safety.jpg",       // CAMBIA ESTA RUTA A TU IMAGEN HERO
    alt: "Educación Vial ITAL"
  },
  
  // ============================================
  // VIDEOS EDUCATIVOS - SEGURIDAD VIAL
  // ============================================
  // ⚠️⚠️⚠️ AQUI PONES LOS LINKS DE TUS VIDEOS DE YOUTUBE ⚠️⚠️⚠️
  // Formato correcto: https://www.youtube.com/embed/VIDEO_ID
  // Ejemplo: https://www.youtube.com/embed/dQw4w9WgXcQ
  videos: [
    {
      title: "Semáforos y Señales Básicas",
      duration: "5:30",
      level: "Preescolar",
   
      youtubeEmbedUrl: "https://www.youtube.com/embed/rnb0fkpeOao?si=g0LvJyIQsWyPiOaM",
      thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
      description: "Aprende los colores del semáforo de forma divertida"
    },
    {
      title: "Cómo Cruzar la Calle Seguro",
      duration: "7:15",
      level: "Primaria",
      // ⚠️⚠️⚠️ REEMPLAZA "VIDEO_ID_AQUI" CON EL ID REAL DEL VIDEO ⚠️⚠️⚠️
      youtubeEmbedUrl: "https://www.youtube.com/embed/7_UJryJ6UjI?si=0B-F9viFqKCYR2hY",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      description: "Pasos para cruzar de manera segura"
    },
    {
      title: "Ciclismo Urbano Seguro",
      duration: "10:45",
      level: "Secundaria",
      // ⚠️⚠️⚠️ REEMPLAZA "VIDEO_ID_AQUI" CON EL ID REAL DEL VIDEO ⚠️⚠️⚠️
      youtubeEmbedUrl: "https://www.youtube.com/embed/xZCzsf5X_Wo?si=UqEiIddKLUDLcjfE",
      thumbnail: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80",
      description: "Reglas y equipamiento para ciclistas"
    },
    {
      title: "Preparación para la Licencia",
      duration: "12:20",
      level: "Bachillerato",
      // ⚠️⚠️⚠️ REEMPLAZA "VIDEO_ID_AQUI" CON EL ID REAL DEL VIDEO ⚠️⚠️⚠️
      youtubeEmbedUrl: "https://www.youtube.com/embed/YBftXKmJQMQ?si=ROm6TOGqTgzLtdOW",
      thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
      description: "Todo sobre el examen de conducción"
    }
  ],
  
  // ============================================
  // RECURSOS DESCARGABLES
  // ============================================
  // ⚠️⚠️⚠️ AQUI PONES LOS LINKS DE TUS ARCHIVOS PDF/ZIP ⚠️⚠️⚠️
  // Puedes usar rutas locales (/resources/archivo.pdf) o URLs externas

  
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
};