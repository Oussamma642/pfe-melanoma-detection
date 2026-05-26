import React from 'react';
import { Activity, Shield, Eye, FileText, History, ArrowRight, BrainCircuit } from 'lucide-react';

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Navbar Minimaliste */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Activity className="text-teal-600" size={28} />
              <span className="text-xl font-bold text-slate-800">MelanoScan</span>
            </div>
            <div>
              <button className="text-slate-600 font-medium hover:text-teal-600 transition px-4 py-2">
                Se connecter
              </button>
              <button className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg font-medium transition ml-2">
                Créer un compte
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-medium text-sm mb-8 border border-teal-100">
              <Shield size={16} />
              Plateforme certifiée Projet de Fin d'Études (PFE)
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              L'Intelligence Artificielle au service du <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                diagnostic dermatologique
              </span>
            </h1>
            
            <p className="mt-4 text-xl text-slate-500 max-w-3xl mx-auto mb-10">
              MelanoScan combine la vision par ordinateur (ConvNeXt) et les métadonnées cliniques du patient pour offrir une analyse multimodale des lésions cutanées. Un outil d'aide à la décision conçu pour la précision et la transparence.
            </p>
            
            <button 
              onClick={() => onNavigate('analysis')}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg shadow-teal-200 transition transform hover:-translate-y-1"
            >
              Démarrer une analyse
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Section Fonctionnalités (Les Valeurs Ajoutées) */}
        <div className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Une architecture pensée pour le milieu clinique</h2>
              <p className="mt-4 text-lg text-slate-600">Au-delà de la simple prédiction, une suite d'outils explicables et traçables.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <BrainCircuit size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">IA Multimodale</h3>
                <p className="text-slate-600 text-sm">
                  Fusion intermédiaire (Feature Fusion) des pixels de l'image avec l'âge, le sexe et la localisation pour une précision maximale (73.6% B-Acc).
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Eye size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Explicabilité Grad-CAM</h3>
                <p className="text-slate-600 text-sm">
                  Le modèle n'est plus une "boîte noire". Une cartographie thermique indique visuellement la zone exacte ayant motivé le diagnostic de l'IA.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <History size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Suivi & Comparaison</h3>
                <p className="text-slate-600 text-sm">
                  Historisation des patients et interface de comparaison côte-à-côte pour surveiller l'évolution d'un grain de beauté dans le temps.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Rapports PDF</h3>
                <p className="text-slate-600 text-sm">
                  Génération instantanée d'un compte-rendu médical exportable contenant les scores Softmax, les images et les données saisies.
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer Médical */}
      <footer className="bg-slate-900 py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-slate-400 text-sm">
            © 2026 MelanoScan - Projet de Fin d'Études.
          </p>
          <p className="text-slate-500 text-xs mt-2 max-w-2xl mx-auto">
            Avertissement : MelanoScan est un outil académique de démonstration technologique. Les résultats fournis par l'Intelligence Artificielle ne constituent en aucun cas un diagnostic médical définitif et ne remplacent pas une biopsie ou l'avis d'un dermatologue qualifié.
          </p>
        </div>
      </footer>
    </div>
  );
}