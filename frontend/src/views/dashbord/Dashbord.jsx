


import React, { useState } from "react";
import {
  Upload,
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  BarChart3,
  ShieldCheck,
  RefreshCw,
  XCircle
} from "lucide-react";

export default function GeminiDash() {
  // États de simulation : 'idle' | 'analyzing' | 'results' | 'invalid'
  const [status, setStatus] = useState("idle");

  // Simulation des données de résultat
  const mockPredictions = [
    { label: "Mélanome (MEL)", score: 73, color: "bg-rose-500", text: "text-rose-700" },
    { label: "Nævus (NV)", score: 18, color: "bg-teal-500", text: "text-teal-700" },
    { label: "Carcinome Basocellulaire (BCC)", score: 5, color: "bg-amber-500", text: "text-amber-700" },
    { label: "Kératose Séborrhéique (BKL)", score: 3, color: "bg-slate-400", text: "text-slate-600" },
    { label: "Autres", score: 1, color: "bg-slate-300", text: "text-slate-500" },
  ];

  const handleSimulateSuccess = (e) => {
    e.preventDefault();
    setStatus("analyzing");
    setTimeout(() => setStatus("results"), 2000);
  };

  const handleSimulateInvalid = (e) => {
    e.preventDefault();
    setStatus("analyzing");
    setTimeout(() => setStatus("invalid"), 1500);
  };

  const resetForm = () => setStatus("idle");

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* En-tête du Dashboard */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-teal-600" size={28} />
              Nouvelle Analyse Multimodale
            </h1>
            <p className="text-slate-500 mt-1">
              Soumettez une image clinique et les métadonnées du patient.
            </p>
          </div>
          {status === "results" && (
            <button className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm">
              <FileText size={18} />
              Générer Rapport PDF
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── COLONNE GAUCHE : Formulaire & Inputs (5 colonnes) ── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
                <ImageIcon className="text-slate-400" size={20} />
                Données d'entrée
              </h2>

              <form className="space-y-5">
                {/* Drag & Drop Image */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Image de la lésion
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-teal-400 transition cursor-pointer group">
                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload size={24} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      Cliquez ou glissez une image
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      PNG, JPG jusqu'à 10MB
                    </span>
                  </div>
                </div>

                {/* Métadonnées Cliniques */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Âge</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 45" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sexe</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition">
                      <option value="">Sélectionner</option>
                      <option value="male">Homme</option>
                      <option value="female">Femme</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Localisation anatomique
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition">
                    <option value="">Sélectionner la zone</option>
                    <option value="back">Dos</option>
                    <option value="lower extremity">Membres inférieurs</option>
                    <option value="trunk">Tronc</option>
                    <option value="face">Visage</option>
                  </select>
                </div>

                {/* Boutons de simulation (Pour la démo) */}
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={handleSimulateSuccess}
                    disabled={status === "analyzing"}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {status === "analyzing" ? <RefreshCw className="animate-spin" size={18} /> : <Activity size={18} />}
                    {status === "analyzing" ? "Analyse en cours..." : "Lancer l'Analyse IA"}
                  </button>
                  
                  {status === "idle" && (
                    <button 
                      onClick={handleSimulateInvalid}
                      className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2.5 rounded-xl transition text-sm"
                    >
                      Test : Simuler une image non-médicale
                    </button>
                  )}
                  {status !== "idle" && status !== "analyzing" && (
                     <button 
                      onClick={resetForm}
                      className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium py-2.5 rounded-xl transition text-sm"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* ── COLONNE DROITE : Résultats & Explicabilité (8 colonnes) ── */}
          <div className="lg:col-span-8">
            
            {/* État : En attente */}
            {status === "idle" && (
              <div className="h-full min-h-[500px] bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <BarChart3 size={48} className="mb-4 opacity-20" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Aucune analyse active</h3>
                <p className="max-w-sm text-sm">
                  Remplissez le formulaire et soumettez une image pour générer les probabilités diagnostiques et l'activation Grad-CAM.
                </p>
              </div>
            )}

            {/* État : Chargement */}
            {status === "analyzing" && (
              <div className="h-full min-h-[500px] bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Inférence du modèle en cours</h3>
                <p className="text-slate-500 text-sm">Passage dans ConvNeXt et extraction des features tabulaires...</p>
              </div>
            )}

            {/* État : Image Invalide (Rejet) */}
            {status === "invalid" && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full shadow-sm text-rose-600 shrink-0">
                    <XCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-rose-800 mb-2">Image non conforme détectée</h3>
                    <p className="text-rose-700 leading-relaxed mb-4">
                      Le système a rejeté cette analyse. L'image soumise ne semble pas présenter de tissu cutané ou la qualité est insuffisante pour un diagnostic clinique fiable.
                    </p>
                    <div className="bg-white/60 p-4 rounded-xl border border-rose-100 text-sm text-rose-800">
                      <span className="font-semibold">Log système :</span> Activations des premières couches du backbone très éloignées de la distribution de la base HAM10000.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* État : Résultats Réussis */}
            {status === "results" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Badge de validation image */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                  <p className="text-sm text-emerald-800">
                    <span className="font-semibold">Contrôle qualité :</span> Image validée. Tissu cutané reconnu avec une confiance de 98.4%.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Visuels (Original vs Heatmap) */}
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <ImageIcon size={16} className="text-teal-600"/>
                        Comparaison Visuelle (Grad-CAM)
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {/* Fausse image originale */}
                        <div className="relative aspect-square bg-[#e8d5c4] rounded-lg overflow-hidden border border-slate-200">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-14 bg-[#4a3628] rounded-[40%_60%_70%_30%] blur-[2px]"></div>
                          <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/80 font-medium bg-black/30 py-1">
                            Image soumise
                          </div>
                        </div>
                        {/* Fausse Heatmap Grad-CAM */}
                        <div className="relative aspect-square bg-[#e8d5c4] rounded-lg overflow-hidden border border-slate-200">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-14 bg-[#4a3628] rounded-[40%_60%_70%_30%] blur-[2px]"></div>
                           {/* Calque Heatmap */}
                           <div className="absolute inset-0 bg-gradient-radial from-red-500/60 via-yellow-400/40 to-blue-500/20 mix-blend-overlay"></div>
                           <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/80 font-medium bg-black/30 py-1">
                            Heatmap d'activation
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 text-center">
                        La zone rouge indique les pixels ayant le plus fortement influencé le modèle vers le diagnostic principal.
                      </p>
                    </div>

                    {/* Avertissement (Copie de Home.jsx) */}
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4 items-start">
                      <ShieldCheck size={18} className="text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 leading-relaxed">
                        <span className="font-semibold">Avertissement :</span> MelanoScan est un outil d'assistance. Une probabilité élevée de mélanome nécessite impérativement une vérification histopathologique (biopsie).
                      </p>
                    </div>
                  </div>

                  {/* Probabilités Softmax */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-800 mb-6 flex items-center gap-2">
                      <BarChart3 size={16} className="text-teal-600"/>
                      Scores de Confiance (Softmax)
                    </h3>
                    
                    <div className="space-y-5 flex-1">
                      {mockPredictions.map((pred, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium text-slate-700">{pred.label}</span>
                            <span className={`font-bold ${pred.text}`}>{pred.score}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${pred.color}`} 
                              style={{ 
                                width: `${pred.score}%`, 
                                transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="sm:hidden w-full mt-6 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium transition shadow-sm">
                      <FileText size={18} />
                      Télécharger PDF
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

