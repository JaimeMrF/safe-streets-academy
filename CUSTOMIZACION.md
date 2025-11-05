# 🎨 GUÍA DE CUSTOMIZACIÓN - ITAL

Esta guía te explica cómo personalizar completamente la plataforma para el ITAL.

---

## 📋 TABLA DE CONTENIDOS

1. [Colores y Diseño](#1-colores-y-diseño)
2. [Logos e Imágenes](#2-logos-e-imágenes)
3. [Videos Educativos](#3-videos-educativos)
4. [Recursos Descargables](#4-recursos-descargables)
5. [Información Institucional](#5-información-institucional)
6. [Links y Navegación](#6-links-y-navegación)

---

## 1. COLORES Y DISEÑO

### Archivo: `src/config/site.config.ts`

**Líneas 18-30 - Colores principales:**

```typescript
colors: {
  primary: "142 76% 36%",      // ⚠️ Color principal (Verde ITAL)
  primaryHover: "142 76% 28%", // ⚠️ Color hover
  accent: "142 60% 45%",       // ⚠️ Color acento
  secondary: "0 0% 100%",      // ⚠️ Color secundario (blanco)
  
  // Colores por nivel educativo
  preescolar: "#22C55E",       // ⚠️ Verde claro
  primaria: "#16A34A",         // ⚠️ Verde medio
  secundaria: "#15803D",       // ⚠️ Verde oscuro
  bachillerato: "#166534",     // ⚠️ Verde muy oscuro
}
```

**Formato de colores:**
- Para `primary`, `primaryHover`, `accent`, `secondary`: Formato HSL sin "hsl()"
  - Ejemplo: `"142 76% 36%"` = verde
  - Generador: https://hslpicker.com/

- Para niveles educativos: Formato HEX
  - Ejemplo: `"#22C55E"` = verde claro
  - Generador: https://colorpicker.me/

---

## 2. LOGOS E IMÁGENES

### Archivo: `src/config/site.config.ts`

**Líneas 35-45 - URLs de imágenes:**

```typescript
logo: {
  url: "https://ital.edu.co/wp-content/uploads/2021/10/logo-ital-500-365x365.webp", 
  // ⚠️⚠️⚠️ CAMBIA ESTA URL POR LA RUTA DE TU LOGO ⚠️⚠️⚠️
  alt: "Logo Instituto Técnico Alfonso López"
},
banner: {
  url: "https://ital.edu.co/wp-content/uploads/2021/10/bandera-ital.webp",
  // ⚠️⚠️⚠️ CAMBIA ESTA URL POR LA RUTA DE TU BANDERA ⚠️⚠️⚠️
  alt: "Bandera ITAL"
},
heroImage: {
  url: "/hero-road-safety.jpg",
  // ⚠️⚠️⚠️ CAMBIA ESTA RUTA POR TU IMAGEN HERO ⚠️⚠️⚠️
  alt: "Educación Vial ITAL"
}
```

**Opciones para imágenes:**

1. **URL externa** (como está ahora):
   - Ventaja: No necesitas subir archivos
   - Ejemplo: `"https://ital.edu.co/images/logo.png"`

2. **Ruta local** (si subes archivos a `public/`):
   - Coloca tu imagen en: `public/images/logo.png`
   - Usa: `"/images/logo.png"`

---

## 3. VIDEOS EDUCATIVOS

### Archivo: `src/config/site.config.ts`

**Líneas 47-90 - Lista de videos:**

```typescript
videos: [
  {
    title: "Semáforos y Señales Básicas",
    duration: "5:30",
    level: "Preescolar",
    // ⚠️⚠️⚠️ REEMPLAZA "VIDEO_ID_AQUI" CON EL ID REAL ⚠️⚠️⚠️
    youtubeEmbedUrl: "https://www.youtube.com/embed/VIDEO_ID_AQUI",
    thumbnail: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
    description: "Aprende los colores del semáforo de forma divertida"
  },
  // ... más videos
]
```

**Cómo obtener el ID del video de YouTube:**

1. Abre el video en YouTube
2. La URL será: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. El ID es: `dQw4w9WgXcQ`
4. Usa: `"https://www.youtube.com/embed/dQw4w9WgXcQ"`

**Cómo agregar más videos:**

```typescript
videos: [
  // Videos existentes...
  {
    title: "Nuevo Video",           // ⚠️ Nombre del video
    duration: "10:00",               // ⚠️ Duración
    level: "Secundaria",             // ⚠️ Nivel: Preescolar, Primaria, Secundaria, Bachillerato
    youtubeEmbedUrl: "https://www.youtube.com/embed/TU_ID_AQUI", // ⚠️ ID del video
    thumbnail: "https://URL_IMAGEN", // ⚠️ URL de miniatura
    description: "Descripción"       // ⚠️ Descripción corta
  }
]
```

---

## 4. RECURSOS DESCARGABLES

### Archivo: `src/config/site.config.ts`

**Líneas 92-113 - Lista de recursos:**

```typescript
resources: [
  {
    title: "Guía de Señales de Tránsito",
    type: "PDF",  // ⚠️ Tipo: PDF, ZIP, DOC, etc.
    size: "2.5 MB", // ⚠️ Tamaño del archivo
    // ⚠️⚠️⚠️ RUTA DEL ARCHIVO ⚠️⚠️⚠️
    downloadUrl: "/resources/guia-senales.pdf"
  },
  // ... más recursos
]
```

**Cómo agregar archivos descargables:**

**Opción 1 - Archivos locales:**
1. Crea la carpeta `public/resources/`
2. Coloca tus PDFs/ZIPs ahí
3. Usa: `"/resources/nombre-archivo.pdf"`

**Opción 2 - URL externa:**
1. Sube el archivo a Google Drive, Dropbox, etc.
2. Obtén el link de descarga directo
3. Usa: `"https://drive.google.com/..."`

**Agregar nuevo recurso:**

```typescript
resources: [
  // Recursos existentes...
  {
    title: "Nuevo Recurso",                    // ⚠️ Nombre
    type: "PDF",                               // ⚠️ Tipo
    size: "3.2 MB",                           // ⚠️ Tamaño
    downloadUrl: "/resources/nuevo.pdf"       // ⚠️ Ruta
  }
]
```

---

## 5. INFORMACIÓN INSTITUCIONAL

### Archivo: `src/config/site.config.ts`

**Líneas 7-17 - Información del ITAL:**

```typescript
name: "ITAL - Educación Vial",              // ⚠️ Nombre corto
shortName: "ITAL",                          // ⚠️ Iniciales (para logo)
fullName: "Instituto Técnico Alfonso López", // ⚠️ Nombre completo
location: "Ocaña, Norte de Santander, Colombia", // ⚠️ Ubicación
description: "Plataforma educativa...",     // ⚠️ Descripción

// Identidad institucional
mission: "Formación integral...",           // ⚠️ Misión
vision: "Ser líder en...",                  // ⚠️ Visión
```

**Líneas 115-130 - Contacto y redes sociales:**

```typescript
contact: {
  email: "contacto@ital.edu.co",            // ⚠️ Email
  phone: "+57 (5) 569 0210",                // ⚠️ Teléfono
  address: "Ocaña, Norte de Santander, Colombia", // ⚠️ Dirección
  website: "https://ital.edu.co",           // ⚠️ Sitio web
  social: {
    facebook: "https://facebook.com/italocana",   // ⚠️ Facebook
    twitter: "https://twitter.com/italocana",     // ⚠️ Twitter
    instagram: "https://instagram.com/italocana", // ⚠️ Instagram
    youtube: "https://youtube.com/@italocana"     // ⚠️ YouTube
  }
}
```

---

## 6. LINKS Y NAVEGACIÓN

### Archivo: `src/config/site.config.ts`

**Líneas 134-152 - Links del footer:**

```typescript
navigation: {
  footer: {
    product: [
      { name: "Características", href: "#features" },  // ⚠️ Link a sección
      { name: "Niveles", href: "#levels" },
      { name: "Recursos", href: "#resources" },
      { name: "Videos", href: "#videos" },
    ],
    company: [
      { name: "Acerca de", href: "/about" },          // ⚠️ Link a página
      { name: "Blog", href: "/blog" },
      { name: "Contacto", href: "/contact" },
      { name: "Soporte", href: "/support" },
    ],
    legal: [
      { name: "Privacidad", href: "/privacy" },       // ⚠️ Link a página legal
      { name: "Términos", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
    ]
  }
}
```

**Tipos de links:**

1. **Link a sección de la misma página:** `href: "#seccion"`
   - Ejemplo: `"#features"` → Va a la sección con `id="features"`

2. **Link a otra página:** `href: "/pagina"`
   - Ejemplo: `"/about"` → Va a la página "Acerca de"

3. **Link externo:** `href: "https://..."`
   - Ejemplo: `"https://ital.edu.co"` → Abre sitio externo

---

## 🚀 RESUMEN RÁPIDO

### Para cambiar TODO el color del sitio:
1. Abre `src/config/site.config.ts`
2. Línea 20: Cambia `primary: "142 76% 36%"`
3. Usa formato HSL: https://hslpicker.com/

### Para cambiar el logo:
1. Abre `src/config/site.config.ts`
2. Línea 37: Cambia `url: "TU_URL_AQUI"`

### Para agregar videos:
1. Abre `src/config/site.config.ts`
2. Ve a la sección `videos:` (línea 50)
3. Copia un video existente
4. Cambia el `youtubeEmbedUrl` con el ID de tu video

### Para agregar recursos:
1. Coloca tu PDF en `public/resources/`
2. Abre `src/config/site.config.ts`
3. Ve a la sección `resources:` (línea 95)
4. Agrega un nuevo objeto con la ruta `/resources/tu-archivo.pdf`

---

## 📞 SOPORTE

Si necesitas ayuda, contacta al equipo técnico del ITAL.

**Fecha:** Noviembre 2025  
**Versión:** 1.0
