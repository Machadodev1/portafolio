"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ArrowUpRight, Mail, MapPin, Send, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const copy = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSending(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo enviar el correo.");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      console.error("Error enviando mensaje:", err);
      const message = err instanceof Error ? err.message : "Ocurrió un error al enviar el correo. Por favor intenta de nuevo o escríbeme por WhatsApp.";
      setErrorMsg(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <footer id="contacto" className="border-t border-black/[0.06] bg-white">

      {/* CTA block */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-20">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#86868b] mb-4">
          Contacto Directo
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left — headline + channels */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-6">
              ¿Tienes una oportunidad o proyecto en mente?
            </h2>
            <p className="text-base text-[#86868b] leading-relaxed mb-8">
              Estoy en etapa práctica y abierto a oportunidades como Desarrollador Junior para aportar en proyectos web y móviles.
            </p>

            <div className="space-y-4 mb-8">
              {/* Email row with Copy */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fafafa] border border-black/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#0071e3] shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                      Correo Electrónico
                    </p>
                    <p className="text-sm font-semibold text-[#1d1d1f] font-mono select-all">
                      {PORTFOLIO_DATA.personal.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#34c759]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>

              {/* WhatsApp direct row */}
              <a
                href={PORTFOLIO_DATA.personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-[#fafafa] border border-black/[0.05] hover:bg-white hover:border-[#25D366]/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                      WhatsApp Directo
                    </p>
                    <p className="text-sm font-semibold text-[#1d1d1f]">
                      {PORTFOLIO_DATA.personal.phone}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#86868b] group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Social Channels: GitHub & LinkedIn */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#fafafa] border border-black/[0.05] hover:bg-white hover:border-black/[0.2] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-[#1d1d1f]" />
                    <span className="text-xs font-semibold text-[#1d1d1f]">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#86868b] group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#fafafa] border border-black/[0.05] hover:bg-white hover:border-[#0071e3]/30 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedInIcon className="w-4 h-4 text-[#0071e3]" />
                    <span className="text-xs font-semibold text-[#1d1d1f]">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#86868b] group-hover:text-[#0071e3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Location Badge */}
              <div className="p-4 rounded-2xl bg-[#fafafa] border border-black/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0071e3]" />
                  <span className="text-xs font-medium text-[#1d1d1f]">
                    {PORTFOLIO_DATA.personal.location}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#34c759]">
                  <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                  Activo
                </span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#fafafa] border border-black/[0.06]">
            <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              Enviar Mensaje
            </h3>
            <p className="text-xs text-[#86868b] mb-6">
              Recibirás una respuesta de confirmación inmediata en tu bandeja de entrada.
            </p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#34c759]/10 text-[#248a3d] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1d1d1f] mb-1">
                    ¡Mensaje enviado con éxito!
                  </h4>
                  <p className="text-xs text-[#86868b] max-w-sm mx-auto mb-6 leading-relaxed">
                    Te he enviado un correo de confirmación con los detalles de tu consulta. Te responderé en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-black/[0.08] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        disabled={sending}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.08] text-sm text-[#1d1d1f] placeholder:text-[#c0c0c5] focus:outline-none focus:border-[#0071e3] transition-colors bg-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        disabled={sending}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.08] text-sm text-[#1d1d1f] placeholder:text-[#c0c0c5] focus:outline-none focus:border-[#0071e3] transition-colors bg-white disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={sending}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Cuéntame sobre tu proyecto o propuesta laboral..."
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.08] text-sm text-[#1d1d1f] placeholder:text-[#c0c0c5] focus:outline-none focus:border-[#0071e3] transition-colors resize-none bg-white disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 rounded-xl bg-[#1d1d1f] text-white text-sm font-semibold hover:bg-black disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    {sending ? "Enviando por servidor..." : "Enviar mensaje"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-[#86868b]">
            © 2026 Andrés Machado · Machadodev1 · Medellín, Colombia
          </span>
          <span className="text-xs text-[#86868b]">
            Diseñado bajo estándares de calidad y estética Apple.
          </span>
        </div>
      </div>

    </footer>
  );
};
