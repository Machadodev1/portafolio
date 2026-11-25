"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Check,
  Copy,
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  AlertCircle,
  Building2,
  ShoppingBag,
  Smartphone,
  Globe,
  TrendingUp,
  Clock,
  Sparkles,
  Users,
  BarChart3,
  CreditCard,
  Bell,
  Boxes,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Layers,
} from "lucide-react";
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface OptionItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ReactNode;
  accent: string;
}

const PROJECT_TYPES: OptionItem[] = [
  {
    id: "empresarial",
    title: "Sistema para mi Negocio",
    subtitle: "Organizar inventario, ventas, facturación, empleados o finanzas.",
    badge: "Más popular",
    icon: <Building2 className="w-5 h-5 text-[#0071e3]" />,
    accent: "#0071e3",
  },
  {
    id: "ventas",
    title: "Tienda o Catálogo Online",
    subtitle: "Mostrar mis productos o servicios y recibir pedidos por internet.",
    badge: "Comercio",
    icon: <ShoppingBag className="w-5 h-5 text-[#34c759]" />,
    accent: "#34c759",
  },
  {
    id: "app_movil",
    title: "Aplicación para Celular",
    subtitle: "Una app propia para que mis clientes o mi equipo la usen en Android y iPhone.",
    badge: "iOS & Android",
    icon: <Smartphone className="w-5 h-5 text-[#af52de]" />,
    accent: "#af52de",
  },
  {
    id: "web_corporativa",
    title: "Página Web Profesional",
    subtitle: "Dar a conocer mi marca o empresa con un diseño moderno y rápido.",
    badge: "Imagen",
    icon: <Globe className="w-5 h-5 text-[#ff9500]" />,
    accent: "#ff9500",
  },
];

const PROJECT_GOALS: OptionItem[] = [
  {
    id: "ahorrar_tiempo",
    title: "Ahorrar tiempo y dejar el papel o Excel",
    subtitle: "Automatizar tareas repetitivas y evitar errores manuales en las cuentas.",
    icon: <Clock className="w-5 h-5 text-[#0071e3]" />,
    accent: "#0071e3",
  },
  {
    id: "vender_mas",
    title: "Atraer más clientes y aumentar ventas",
    subtitle: "Tener presencia digital profesional disponible las 24 horas.",
    icon: <TrendingUp className="w-5 h-5 text-[#34c759]" />,
    accent: "#34c759",
  },
  {
    id: "control_total",
    title: "Tener control total de mi negocio",
    subtitle: "Saber cuánto vendo, qué tengo en bodega y quién hace cada movimiento.",
    icon: <ShieldCheck className="w-5 h-5 text-[#ff9500]" />,
    accent: "#ff9500",
  },
  {
    id: "idea_nueva",
    title: "Lanzar una idea o emprendimiento desde cero",
    subtitle: "Convertir un proyecto que tengo en mente en un producto real.",
    icon: <Sparkles className="w-5 h-5 text-[#af52de]" />,
    accent: "#af52de",
  },
];

const FEATURE_BLOCKS = [
  {
    id: "Usuarios y Roles",
    label: "Cuentas para empleados o clientes",
    desc: "Que cada persona entre con su clave y vea solo lo que le corresponde.",
    icon: <Users className="w-4 h-4 text-[#0071e3]" />,
  },
  {
    id: "Inventario y Productos",
    label: "Catálogo y control de mercancía",
    desc: "Saber qué productos hay disponibles y recibir alertas cuando se agoten.",
    icon: <Boxes className="w-4 h-4 text-[#ff9500]" />,
  },
  {
    id: "Pagos y Facturación",
    label: "Cobros, recibos o facturación",
    desc: "Registrar ventas, métodos de pago, descuentos e impuestos fácilmente.",
    icon: <CreditCard className="w-4 h-4 text-[#34c759]" />,
  },
  {
    id: "Panel de Estadísticas",
    label: "Resumen de ganancias y reportes",
    desc: "Ver en gráficas claras cuánto dinero entra, gastos y resultados del mes.",
    icon: <BarChart3 className="w-4 h-4 text-[#af52de]" />,
  },
  {
    id: "Notificaciones y Alertas",
    label: "Avisos por correo o WhatsApp",
    desc: "Enviar confirmaciones automáticas, recordatorios o respaldos.",
    icon: <Bell className="w-4 h-4 text-[#ff3b30]" />,
  },
  {
    id: "Diseño a Medida",
    label: "Diseño moderno con tu marca",
    desc: "Fácil de usar desde cualquier celular o computador sin manuales complicados.",
    icon: <Sparkles className="w-4 h-4 text-[#0071e3]" />,
  },
];

const TIMELINES = [
  { id: "Lo antes posible (Urgente)", label: "Lo antes posible", sub: "Prioridad alta" },
  { id: "En 1 a 2 meses", label: "En 1 a 2 meses", sub: "Ritmo ideal" },
  { id: "Sin prisa, paso a paso", label: "Paso a paso", sub: "Planeación flexible" },
];

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Interactive Interview Wizard State
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<OptionItem>(PROJECT_TYPES[0]);
  const [selectedGoal, setSelectedGoal] = useState<OptionItem>(PROJECT_GOALS[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Usuarios y Roles",
    "Panel de Estadísticas",
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINES[1].id);

  // Contact Details
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 3D Holographic Blueprint Card Tilt Physics
  const blueprintRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const layerZ = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const handleBlueprintMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!blueprintRef.current) return;
    const rect = blueprintRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleBlueprintLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleFeature = (featId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featId) ? prev.filter((item) => item !== featId) : [...prev, featId]
    );
  };

  const copy = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetWizard = () => {
    setSent(false);
    setStep(1);
    setForm({ name: "", email: "", message: "" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setSending(true);
    setErrorMsg(null);

    const autoSummary =
      form.message.trim().length > 0
        ? form.message
        : `Hola Andrés, me gustaría crear un proyecto tipo "${selectedType.title}" enfocado en "${selectedGoal.title}".`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: autoSummary,
          project: {
            projectType: selectedType.title,
            goal: selectedGoal.title,
            features: selectedFeatures,
            timeline: selectedTimeline,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar la solicitud.");
      }

      setSent(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocurrió un error al enviar el proyecto. Intenta de nuevo o escríbeme por WhatsApp.";
      setErrorMsg(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <footer id="contacto" className="border-t border-black/[0.06] bg-[#fbfbfd]">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-20">
        {/* Top Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-2xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#1d1d1f]">
              Asistente Interactivo de Proyectos
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-4">
            Arma tu idea paso a paso.{" "}
            <span className="text-[#86868b] font-normal">Sin palabras técnicas.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] leading-relaxed">
            No necesitas saber de programación. Elige en este menú interactivo qué quieres lograr y mira cómo se construye la estructura de tu proyecto en 3D antes de enviármela al correo.
          </p>
        </div>

        {/* Main Interactive Grid: Left Wizard (7 cols) + Right 3D Live Blueprint (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ================= LEFT: MINI-INTERVIEW WIZARD ================= */}
          <div className="lg:col-span-7 bg-white rounded-[32px] border border-black/[0.08] p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between pb-6 mb-7 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((num) => {
                  const isActive = step === num;
                  const isDone = step > num || sent;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => !sent && setStep(num)}
                      className={`h-8 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? "bg-[#1d1d1f] text-white shadow-sm scale-105"
                          : isDone
                          ? "bg-[#0071e3]/10 text-[#0071e3]"
                          : "bg-[#f5f5f7] text-[#86868b] hover:bg-black/[0.06]"
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : <span>{num}</span>}
                      <span className="hidden sm:inline">
                        {num === 1 && "Tu Idea"}
                        {num === 2 && "Objetivo"}
                        {num === 3 && "Funciones"}
                        {num === 4 && "Enviar"}
                      </span>
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-mono text-[#86868b]">Paso {step} de 4</span>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                /* SUCCESS SCREEN */
                <motion.div
                  key="sent-screen"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#34c759]/15 text-[#248a3d] flex items-center justify-center mx-auto mb-5">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">
                    ¡Estructura enviada a tu correo!
                  </h3>
                  <p className="text-sm text-[#86868b] max-w-md mx-auto mb-6 leading-relaxed">
                    Te acabo de enviar una copia detallada de tu proyecto{" "}
                    <strong className="text-[#1d1d1f]">{selectedType.title}</strong> a tu bandeja de entrada. Te responderé en menos de 24 horas.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={PORTFOLIO_DATA.personal.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-3 rounded-full bg-[#25D366] text-white hover:opacity-95 transition-opacity"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Adelantar conversación por WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={resetWizard}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-3 rounded-full bg-[#f5f5f7] text-[#1d1d1f] hover:bg-black/[0.08] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Armar otro proyecto
                    </button>
                  </div>
                </motion.div>
              ) : step === 1 ? (
                /* STEP 1: PROJECT TYPE */
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mb-1.5">
                    1. ¿Qué tipo de proyecto tienes en mente?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] mb-6">
                    Selecciona la opción que mejor describa lo que necesitas para tu negocio o idea.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                    {PROJECT_TYPES.map((item) => {
                      const active = selectedType.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedType(item)}
                          className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                            active
                              ? "bg-[#0071e3]/[0.06] border-[#0071e3] shadow-[0_10px_25px_rgba(0,113,227,0.1)] scale-[1.01]"
                              : "bg-[#fafafa] border-black/[0.06] hover:bg-white hover:border-black/[0.15]"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shadow-2xs">
                                {item.icon}
                              </div>
                              {item.badge && (
                                <span
                                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                                    active
                                      ? "bg-[#0071e3] text-white"
                                      : "bg-white text-[#86868b] border border-black/[0.06]"
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-[#1d1d1f] mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#86868b] leading-relaxed">
                              {item.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
                    >
                      <span>Siguiente: Tu Objetivo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                /* STEP 2: PRIMARY GOAL */
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mb-1.5">
                    2. ¿Cuál es tu prioridad principal?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] mb-6">
                    Esto me ayuda a enfocar el diseño en lo que más valor te va a dar.
                  </p>

                  <div className="space-y-3 mb-8">
                    {PROJECT_GOALS.map((item) => {
                      const active = selectedGoal.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedGoal(item)}
                          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 cursor-pointer ${
                            active
                              ? "bg-[#0071e3]/[0.06] border-[#0071e3] shadow-sm"
                              : "bg-[#fafafa] border-black/[0.06] hover:bg-white hover:border-black/[0.15]"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 shadow-2xs">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-[#1d1d1f]">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#86868b]">{item.subtitle}</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              active
                                ? "bg-[#0071e3] border-[#0071e3] text-white"
                                : "border-black/[0.15]"
                            }`}
                          >
                            {active && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1d1f] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
                    >
                      <span>Siguiente: ¿Qué debe incluir?</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : step === 3 ? (
                /* STEP 3: MODULES / FEATURES + TIMELINE */
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mb-1.5">
                    3. ¿Qué piezas quieres incluir en tu proyecto?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] mb-5">
                    Puedes marcar todas las que necesites. Mira cómo se apilan en tu modelo 3D a la derecha.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {FEATURE_BLOCKS.map((feat) => {
                      const active = selectedFeatures.includes(feat.id);
                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => toggleFeature(feat.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                            active
                              ? "bg-[#0071e3]/[0.07] border-[#0071e3] shadow-2xs"
                              : "bg-[#fafafa] border-black/[0.06] hover:bg-white"
                          }`}
                        >
                          <div className="mt-0.5 p-1.5 rounded-lg bg-white border border-black/[0.05]">
                            {feat.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#1d1d1f]">
                                {feat.label}
                              </span>
                              {active && <Check className="w-3.5 h-3.5 text-[#0071e3]" />}
                            </div>
                            <p className="text-[11px] text-[#86868b] leading-snug mt-0.5">
                              {feat.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Timeline Selector */}
                  <div className="mb-7">
                    <p className="text-xs font-bold text-[#1d1d1f] mb-2.5">
                      ¿Para cuándo te gustaría tenerlo listo?
                    </p>
                    <div className="grid grid-cols-3 gap-2.5">
                      {TIMELINES.map((tl) => {
                        const active = selectedTimeline === tl.id;
                        return (
                          <button
                            key={tl.id}
                            type="button"
                            onClick={() => setSelectedTimeline(tl.id)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              active
                                ? "bg-[#1d1d1f] text-white border-[#1d1d1f]"
                                : "bg-[#fafafa] text-[#1d1d1f] border-black/[0.06] hover:bg-white"
                            }`}
                          >
                            <div className="text-xs font-semibold">{tl.label}</div>
                            <div
                              className={`text-[10px] ${
                                active ? "text-white/70" : "text-[#86868b]"
                              }`}
                            >
                              {tl.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071e3] text-white text-xs sm:text-sm font-semibold hover:bg-[#005bb5] transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Paso Final: Enviar mi Estructura</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* STEP 4: CLIENT CONTACT INFO & SUBMIT */
                <motion.form
                  key="step-4"
                  onSubmit={submit}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mb-1">
                      4. ¿A dónde te envío el resumen y la propuesta?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#86868b]">
                      Al darle enviar, recibirás automáticamente en tu correo la ficha completa de la estructura que acabas de armar.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Tu Nombre o Empresa *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={sending}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ej. Carlos Gómez"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.1] text-sm text-[#1d1d1f] placeholder:text-[#c0c0c5] focus:outline-none focus:border-[#0071e3] bg-[#fafafa] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Tu Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        disabled={sending}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.1] text-sm text-[#1d1d1f] placeholder:text-[#c0c0c5] focus:outline-none focus:border-[#0071e3] bg-[#fafafa] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      ¿Quieres contarme algún detalle extra sobre tu idea? (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      disabled={sending}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ej. Tengo una ferretería y quiero que mis vendedores facturen desde una tablet..."
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.1] text-sm text-[#1d1d1f] placeholder:text-[#c0c0c5] focus:outline-none focus:border-[#0071e3] bg-[#fafafa] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Modificar piezas
                    </button>

                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1d1d1f] text-white text-sm font-semibold hover:bg-black disabled:opacity-60 transition-all shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? "Generando y enviando correo..." : "Enviar Proyecto y Recibir Copia"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ================= RIGHT: 3D APPLE WHITE PROJECT BLUEPRINT ================= */}
          <div className="lg:col-span-5" style={{ perspective: 1200 }}>
            <motion.div
              ref={blueprintRef}
              onMouseMove={handleBlueprintMove}
              onMouseLeave={handleBlueprintLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-[32px] bg-white text-[#1d1d1f] p-7 shadow-[0_25px_65px_rgba(0,0,0,0.06)] hover:shadow-[0_35px_85px_rgba(0,113,227,0.1)] border border-black/[0.08] transition-shadow duration-500 overflow-hidden select-none"
            >
              {/* Subtle Apple Light Mode Ambient Aura */}
              <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20 transition-colors duration-500"
                style={{ backgroundColor: selectedType.accent }}
              />

              {/* Top Blueprint Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#34c759] animate-pulse" />
                  <Layers className="w-4 h-4 text-[#0071e3]" />
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#86868b]">
                    Estructura en Vivo · 3D
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3]">
                  {selectedFeatures.length + 2} Capas Activas
                </span>
              </div>

              {/* 3D Isometric Stacked Visual Layers (White & Titanium Glass) */}
              <div className="relative py-5 px-3 mb-5 flex flex-col items-center justify-center min-h-[210px] rounded-2xl bg-gradient-to-b from-[#fbfbfd] to-[#f4f5f8] border border-black/[0.05]">
                {/* Base Layer: Core Solution */}
                <motion.div
                  style={{ x: layerZ }}
                  layout
                  className="w-full max-w-[300px] p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-[0_10px_25px_rgba(0,0,0,0.05)] mb-2.5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#f5f5f7] border border-black/[0.04] flex items-center justify-center shrink-0">
                    {selectedType.icon}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] uppercase tracking-wider text-[#86868b] font-mono font-semibold">
                      1. Base del Sistema
                    </div>
                    <div className="text-xs font-bold text-[#1d1d1f] truncate">
                      {selectedType.title}
                    </div>
                  </div>
                </motion.div>

                {/* Middle Layer: Primary Goal */}
                <motion.div
                  layout
                  className="w-full max-w-[280px] p-3 rounded-2xl bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-[0_6px_16px_rgba(0,0,0,0.03)] mb-3 flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#f5f5f7] flex items-center justify-center shrink-0">
                    {selectedGoal.icon}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[9px] uppercase tracking-wider text-[#86868b] font-mono font-semibold">
                      2. Enfoque Principal
                    </div>
                    <div className="text-[11px] font-semibold text-[#1d1d1f] truncate">
                      {selectedGoal.title}
                    </div>
                  </div>
                </motion.div>

                {/* Floating 3D Module Pills */}
                <div className="w-full max-w-[300px] pt-1">
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#86868b] mb-2 text-center">
                    3. Piezas Incluidas ({selectedFeatures.length})
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <AnimatePresence>
                      {selectedFeatures.map((featId) => (
                        <motion.span
                          key={featId}
                          initial={{ opacity: 0, scale: 0.8, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white border border-[#0071e3]/25 text-[#1d1d1f] shadow-2xs flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5 text-[#0071e3]" />
                          {featId}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Blueprint Summary Metadata */}
              <div className="p-4 rounded-2xl bg-[#fafafa] border border-black/[0.06] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#86868b] font-medium">Tiempo estimado:</span>
                  <span className="font-bold text-[#0071e3]">{selectedTimeline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#86868b] font-medium">Copia de estructura al correo:</span>
                  <span className="font-semibold text-[#248a3d] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Automática
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Direct Contact Channels Below 3D Card */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={copy}
                className="p-3.5 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.15] transition-all flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#0071e3] shrink-0" />
                  <div className="truncate">
                    <div className="text-[10px] font-semibold uppercase text-[#86868b]">
                      {copied ? "¡Correo Copiado!" : "Copiar Correo"}
                    </div>
                    <div className="text-xs font-semibold text-[#1d1d1f] truncate">
                      {PORTFOLIO_DATA.personal.email}
                    </div>
                  </div>
                </div>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#34c759] shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#86868b] shrink-0" />
                )}
              </button>

              <a
                href={PORTFOLIO_DATA.personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white border border-black/[0.06] hover:border-[#25D366]/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-[#86868b]">
                      WhatsApp Directo
                    </div>
                    <div className="text-xs font-semibold text-[#1d1d1f]">
                      {PORTFOLIO_DATA.personal.phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#86868b] group-hover:text-[#25D366] transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Social Bar */}
      <div className="border-t border-black/[0.06] bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#86868b]">
            <span>© 2026 Andrés Machado · Machadodev1</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-[#1d1d1f] font-medium">
              <MapPin className="w-3 h-3 text-[#0071e3]" />
              Medellín, Colombia
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#86868b] hover:text-[#0071e3] transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
