import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { CodeReveal } from "@/components/sections/CodeReveal";
import { InteractiveBillingEngine } from "@/components/sections/InteractiveBillingEngine";
import { AuditTimelineScroll } from "@/components/sections/AuditTimelineScroll";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { PhilosophyReveal } from "@/components/sections/PhilosophyReveal";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function Home() {
  return (
    <div className="bg-white text-[#1d1d1f]">
      {/* Floating Apple Header */}
      <Navbar />

      <main>
        {/* 1. Hero: Presentación de Andrés Machado (Junior en Prácticas) + 3D Avatar Interactivo */}
        <HeroSection />

        {/* 2. Capacidades y Habilidades (Django, Flutter, Node, Figma, PostgreSQL) */}
        <SkillsSection />

        {/* 3. Sobre Mí (Perfil Profesional, Educación ADSO SENA, Filosofía) */}
        <AboutMeSection />

        {/* 4. Scroll Reveal Cinematográfico: Python / Django Security Core */}
        <CodeReveal />

        {/* 5. Scroll Reveal: Engine de Facturación e Inventario en Tiempo Real */}
        <InteractiveBillingEngine />

        {/* 6. Scroll Reveal: Auditoría Forense y Respaldo Inmutable */}
        <AuditTimelineScroll />

        {/* 7. Proyecto Destacado: SIGIF Showcase Completo */}
        <ProjectShowcase />

        {/* 8. Filosofía de Desarrollo Progresiva */}
        <PhilosophyReveal />
      </main>

      {/* 9. Contacto Directo: WhatsApp, LinkedIn, GitHub, Email & Formulario */}
      <ContactFooter />
    </div>
  );
}
