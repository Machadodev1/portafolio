export interface TechSkill {
  id: string;
  name: string;
  category: string;
  level: string;
  description: string;
  highlights: string[];
}

export interface SoftSkill {
  title: string;
  description: string;
}

export interface SigifModule {
  title: string;
  description: string;
}

export interface FeaturedProject {
  title: string;
  fullName: string;
  tagline: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  stack: string[];
  modules: SigifModule[];
  highlights: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    alias: string;
    title: string;
    status: string;
    headline: string;
    subheadline: string;
    biography: string;
    location: string;
    github: string;
    linkedin: string;
    whatsapp: string;
    phone: string;
    email: string;
  };
  navigation: { label: string; href: string }[];
  coreSkills: TechSkill[];
  softSkills: SoftSkill[];
  philosophyWords: string;
  featuredProject: FeaturedProject;
}

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Andrés Machado",
    alias: "Machadodev1",
    title: "Desarrollador de Software Junior",
    status: "En Etapa Práctica",
    headline: "Soy Andrés Machado. Desarrollador de Software Junior.",
    subheadline:
      "Construyo aplicaciones web y móviles combinando lógica de backend sólida, bases de datos eficientes y experiencias de usuario pulidas.",
    biography:
      "Desarrollador de software junior en etapa práctica ubicado en Medellín, Colombia. Cuento con formación técnica rigurosa y experiencia práctica creando soluciones reales como sistemas de inventario, facturación y plataformas empresariales. Me caracteriza la lógica estructurada, el aprendizaje autónomo continuo y el compromiso por entregar código limpio y mantenible.",
    location: "Medellín, Colombia",
    github: "https://github.com/machadodev1",
    linkedin: "https://www.linkedin.com/in/machadodev1",
    whatsapp: "https://wa.me/573126691941",
    phone: "+57 312 669 1941",
    email: "machadoandres444@gmail.com",
  },
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Proyecto", href: "#proyecto" },
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Contacto", href: "#contacto" },
  ],
  coreSkills: [
    {
      id: "django",
      name: "Django & Python",
      category: "Backend & APIs",
      level: "Avanzado",
      description:
        "Desarrollo de servicios backend empresariales, APIs RESTful con Django REST Framework, autenticación robusta con PBKDF2 y control de acceso RBAC.",
      highlights: ["Django REST Framework", "ORM & Consultas Avanzadas", "Rate Limiting & Seguridad"],
    },
    {
      id: "flutter",
      name: "Flutter",
      category: "Mobile Multiplataforma",
      level: "Intermedio - Avanzado",
      description:
        "Creación de aplicaciones móviles nativas para iOS y Android con renderizado fluido a 60 FPS, arquitectura reactiva y consumo eficiente de APIs.",
      highlights: ["Multiplataforma iOS / Android", "Manejo de Estado", "Diseño Declarativo"],
    },
    {
      id: "node",
      name: "Node.js",
      category: "Backend & Microservicios",
      level: "Intermedio",
      description:
        "Construcción de servidores ligeros y endpoints API asíncronos en JavaScript/TypeScript, integrando bases de datos y middleware de autenticación.",
      highlights: ["Express & APIs REST", "Arquitectura Asíncrona", "Integración de Servicios"],
    },
    {
      id: "figma",
      name: "Figma",
      category: "Diseño UI/UX & Prototipado",
      level: "Avanzado",
      description:
        "Diseño de interfaces bajo lineamientos Apple Human Interface, creación de sistemas de diseño, tokens visuales y prototipado interactivo de alta fidelidad.",
      highlights: ["Sistemas de Diseño Atómico", "Prototipos Interactivos", "Apple Aesthetic"],
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "Bases de Datos Relacionales",
      level: "Avanzado",
      description:
        "Modelado de datos normalizado, transacciones ACID seguras, optimización de consultas complejas mediante índices y diseño de integridad referencial.",
      highlights: ["Transacciones ACID", "Índices B-Tree", "Integridad Referencial"],
    },
  ],
  softSkills: [
    {
      title: "Lógica de Programación",
      description: "Análisis riguroso de algoritmos y solución estructurada de problemas paso a paso.",
    },
    {
      title: "Comunicación Asertiva",
      description: "Claridad al documentar requerimientos, exponer avances técnicos y coordinar flujos.",
    },
    {
      title: "Trabajo en Equipo",
      description: "Colaboración proactiva con Git, code reviews y metodologías ágiles de entrega continua.",
    },
    {
      title: "Aprendizaje Autónomo",
      description: "Capacidad comprobada para investigar, dominar nuevas tecnologías y adaptarme rápidamente.",
    },
  ],
  philosophyWords:
    "La excelencia técnica no es casualidad. Es el equilibrio exacto entre arquitecturas resilientes, código estructurado y obsesión por cada micro-detalle.",
  featuredProject: {
    title: "SIGIF",
    fullName: "Sistema de Información para la Gestión de Inventario y Facturación",
    tagline:
      "Plataforma web empresarial que integra operación comercial, inventario, finanzas y auditoría en tiempo real para talleres y empresas de repuestos.",
    description:
      "SIGIF resuelve el caos de llevar inventario, ventas y cuentas en hojas de cálculo desconectadas. Centraliza en una sola plataforma el control de stock, la facturación con IVA, la cartera de clientes y la trazabilidad completa de cada acción.",
    liveUrl: "https://sigif-final.vercel.app",
    repoUrl: "https://github.com/machadodev1/sigif-final",
    stack: ["Python · Django", "PostgreSQL", "Django REST Framework", "Bootstrap 5", "pytest"],
    modules: [
      {
        title: "Seguridad & Acceso",
        description:
          "Login con PBKDF2, bloqueo de IP tras 5 intentos fallidos (5 min), control de acceso por roles: SuperAdmin, Admin y Empleado.",
      },
      {
        title: "Inventario",
        description:
          "Entradas de mercancía con consecutivo único (ENT-00001), control de stock crítico (<5 unidades), agotado y óptimo con trazabilidad completa.",
      },
      {
        title: "Facturación",
        description:
          "Facturas con IVA 19%, descuentos automáticos, múltiples métodos de pago (Efectivo, Tarjeta, Transferencia, Crédito) y descuento de stock en tiempo real.",
      },
      {
        title: "Finanzas",
        description:
          "Gastos operativos, cuentas por pagar y por cobrar, conciliación de caja y análisis de rentabilidad por categoría.",
      },
      {
        title: "Auditoría",
        description:
          "Registro automático de cada acción crítica: usuario, módulo, detalle exacto y timestamp. Trazabilidad total e inmutable.",
      },
      {
        title: "API REST & QA",
        description:
          "API documentada con OpenAPI/Swagger, tokens con expiración automática, rate limiting y pruebas automatizadas con pytest cubriendo seguridad, roles y flujos.",
      },
    ],
    highlights: [
      "PBKDF2 + Brute-force protection",
      "RBAC (3 niveles de rol)",
      "Stock en tiempo real",
      "IVA 19% + multi-pago",
      "Backups automáticos",
      "OpenAPI / Swagger",
    ],
  },
};
