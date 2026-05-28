import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Brain,
  FileText,
  History,
  Flame,
  ScanLine,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

// ── Données statiques ──────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Brain,
    color: "bg-teal-50 text-teal-700",
    title: "IA Multimodale",
    desc: "Fusion image + âge, sexe et localisation anatomique pour une précision maximale.",
  },
  {
    icon: Flame,
    color: "bg-rose-50 text-rose-700",
    title: "Grad-CAM",
    desc: "Cartographie thermique de la zone décisive. Le modèle n'est plus une boîte noire.",
  },
  {
    icon: History,
    color: "bg-blue-50 text-blue-700",
    title: "Suivi dans le temps",
    desc: "Historique par lésion. Comparez l'évolution d'un grain de beauté entre analyses.",
  },
  {
    icon: FileText,
    color: "bg-violet-50 text-violet-700",
    title: "Rapport PDF",
    desc: "Compte-rendu exportable avec image, heatmap, scores et données cliniques saisies.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Upload de l'image",
    desc: "Photo dermatoscopique de la lésion cutanée.",
  },
  {
    num: "02",
    title: "Données cliniques",
    desc: "Âge, sexe, localisation anatomique du patient.",
  },
  {
    num: "03",
    title: "Analyse ConvNeXt",
    desc: "Inférence multimodale + génération Grad-CAM.",
  },
  {
    num: "04",
    title: "Rapport & suivi",
    desc: "PDF exportable et historique consultable.",
  },
];

const PROBS = [
  { label: "Mélanome", pct: 91, color: "bg-rose-600" },
  { label: "Nævus bénin", pct: 6, color: "bg-slate-400" },
  { label: "Kératose", pct: 3, color: "bg-slate-300" },
];

// ── Composant carte de scan démo ───────────────────────────────────────────────
function ScanDemo() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-600">
          Analyse #0042 · Patient M., 54 ans
        </span>
        <span className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full font-medium">
          Complété
        </span>
      </div>

      {/* Image + heatmap simulée */}
      <div className="relative bg-slate-100 rounded-xl h-36 flex items-center justify-center mb-4 overflow-hidden">
        {/* Heatmap radial */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "radial-gradient(ellipse at 55% 45%, rgba(220,38,38,0.45) 0%, rgba(234,179,8,0.3) 35%, transparent 65%)",
          }}
        />
        {/* Lésion simulée */}
        <div
          className="relative z-10 bg-slate-500 opacity-75"
          style={{
            width: 52,
            height: 44,
            borderRadius: "50% 45% 55% 40%",
          }}
        />
        {/* Label heatmap */}
        <span className="absolute bottom-2 right-3 text-[10px] text-white/80 font-medium tracking-wide">
          Grad-CAM
        </span>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
          <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">
            Diagnostic IA
          </p>
          <p className="text-base font-semibold text-rose-700">Mélanome</p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
          <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-1">
            Confiance
          </p>
          <p className="text-base font-semibold text-slate-800">91.4 %</p>
        </div>
      </div>

      {/* Barres de probabilité */}
      <div className="space-y-2">
        {PROBS.map(({ label, pct, color }) => (
          <div key={label} className="flex items-center gap-2 text-xs">
            <span className="w-20 text-right text-slate-500 shrink-0">
              {label}
            </span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-1.5 rounded-full ${color}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-7 text-slate-400">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────────
export default function Home({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm"
            : "bg-white border-b border-slate-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center">
              <Activity size={16} className="text-teal-100" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 leading-none">
                MelanoScan
              </p>
              <p className="text-[10px] text-slate-400 tracking-wide uppercase leading-none mt-0.5">
                Dermatology AI
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* <button
              onClick={() => onNavigate?.("/auth/login")}
              className="text-sm text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              Se connecter
            </button> */}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-sm bg-teal-700 cursor-pointer hover:bg-teal-800 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              {/* Créer un compte */}
              S'authentifier
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-500 text-xs px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Projet de Fin d'Études · PFE 2026
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-5">
              Détection précoce du{" "}
              <span className="text-teal-700 italic font-serif">mélanome</span>{" "}
              par intelligence artificielle
            </h1>

            <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-lg">
              MelanoScan analyse les lésions cutanées par vision par ordinateur
              (ConvNeXt) combinée aux métadonnées cliniques. Chaque analyse
              génère une carte thermique Grad-CAM et un rapport PDF exportable.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate?.("analysis")}
                className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl font-medium text-sm shadow-lg shadow-teal-100 transition hover:-translate-y-0.5"
              >
                <ScanLine size={16} />
                Démarrer une analyse
                <ArrowRight size={14} />
              </button>
              <button className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 px-5 py-3 border border-slate-200 bg-white rounded-xl transition hover:border-slate-300">
                En savoir plus
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Stats rapides */}
            <div className="mt-10 flex gap-8 border-t border-slate-100 pt-6">
              {[
                { val: "73.6%", label: "B-Accuracy" },
                { val: "9", label: "Classes de lésions" },
                { val: "Grad-CAM", label: "Explicabilité" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-lg font-semibold text-slate-800">{val}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Carte démo */}
          <div className="lg:pl-4">
            <ScanDemo />
          </div>
        </div>
      </section>

      {/* ── Fonctionnalités ────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-b border-slate-200 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
            Fonctionnalités
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-10">
            Une suite clinique complète
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-sm transition"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${color}`}
                >
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1.5">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Étapes ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
          Workflow
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mb-10">
          Comment ça fonctionne
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="bg-white p-6">
              <p className="text-xs text-slate-300 font-mono mb-3">{num}</p>
              <p className="text-sm font-semibold text-slate-800 mb-1.5">
                {title}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Avertissement médical ──────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4 items-start">
          <ShieldCheck size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-semibold">Avertissement médical :</span>{" "}
            MelanoScan est un outil académique de démonstration technologique.
            Les résultats fournis par l'intelligence artificielle ne constituent
            en aucun cas un diagnostic médical définitif et ne remplacent pas
            une biopsie ou l'avis d'un dermatologue qualifié.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-teal-700 rounded flex items-center justify-center">
              <Activity size={12} className="text-teal-100" />
            </div>
            <span className="text-xs font-medium text-slate-600">
              MelanoScan
            </span>
          </div>
          <p className="text-xs text-slate-400">
            © 2026 MelanoScan · Projet de Fin d'Études
          </p>
        </div>
      </footer>
    </div>
  );
}
