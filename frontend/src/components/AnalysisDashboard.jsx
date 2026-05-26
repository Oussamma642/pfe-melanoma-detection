import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Activity, ChevronRight } from 'lucide-react';

export default function AnalysisDashboard() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    // Simulation du temps de réponse de FastAPI
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        validImage: true,
        predictions: [
          { label: 'Mélanome (MEL)', score: 73, color: 'bg-red-500' },
          { label: 'Nævus (NV)', score: 18, color: 'bg-green-500' },
          { label: 'Kératose Séborrhéique (BKL)', score: 5, color: 'bg-yellow-500' },
          { label: 'Carcinome Basocellulaire (BCC)', score: 3, color: 'bg-orange-500' },
          { label: 'Autres', score: 1, color: 'bg-slate-400' }
        ]
      });
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* En-tête */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Activity className="text-teal-600" size={32} />
            MelanoScan
          </h1>
          <p className="text-slate-500 mt-1">Plateforme d'Analyse Dermatologique Multimodale</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLONNE GAUCHE : Formulaire d'entrée */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">1. Données Patient</h2>
          <form onSubmit={handleAnalyze} className="space-y-4">
            
            {/* Zone d'upload Image */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition">
              <Upload className="mx-auto text-slate-400 mb-2" size={24} />
              <p className="text-sm text-slate-600 font-medium">Glissez l'image clinique ici</p>
              <p className="text-xs text-slate-400">JPG, PNG (Max 5MB)</p>
            </div>

            {/* Données Cliniques */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Âge</label>
              <input type="number" className="w-full p-2 border rounded-md" placeholder="Ex: 45" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sexe</label>
              <select className="w-full p-2 border rounded-md" required>
                <option value="">Sélectionner...</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Localisation de la lésion</label>
              <select className="w-full p-2 border rounded-md" required>
                <option value="">Sélectionner...</option>
                <option value="back">Dos</option>
                <option value="lower extremity">Membres inférieurs</option>
                <option value="trunk">Tronc</option>
                <option value="face">Visage</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={analyzing}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {analyzing ? 'Analyse en cours...' : 'Lancer l\'Analyse IA'}
              {!analyzing && <ChevronRight size={18} />}
            </button>
          </form>
        </div>

        {/* COLONNE DROITE : Résultats */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !analyzing && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white rounded-xl border border-slate-200 p-10 shadow-sm">
              <Activity size={48} className="mb-4 opacity-20" />
              <p>Veuillez soumettre une image et les données cliniques pour voir les résultats.</p>
            </div>
          )}

          {analyzing && (
             <div className="h-full flex items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-teal-600 font-medium">Inférence ConvNeXt en cours...</p>
                </div>
             </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Alerte Image Valide */}
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg flex items-center gap-3 shadow-sm">
                <CheckCircle className="text-emerald-500" />
                <div>
                  <p className="font-semibold">Validation tissulaire réussie</p>
                  <p className="text-sm opacity-90">L'image a passé le filtre de qualité. Lésion cutanée détectée (Confiance: 99%).</p>
                </div>
              </div>

              {/* Les deux images (Origine + Grad-CAM) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Image Originale</p>
                  <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border overflow-hidden">
                     {/* Remplacer par l'image uploadée */}
                     <span className="text-slate-400">Photo patient</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Activation Grad-CAM</p>
                  <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border relative">
                     {/* Simulation de heatmap (A remplacer par l'image générée par le backend) */}
                     <span className="text-slate-400 relative z-10">Heatmap IA</span>
                     <div className="absolute inset-0 bg-gradient-radial from-red-500/40 via-yellow-400/20 to-transparent mix-blend-multiply rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Probabilités et PDF */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">Scores de Confiance (Softmax)</h3>
                  <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition">
                    <FileText size={16} />
                    Générer Rapport PDF
                  </button>
                </div>
                
                <div className="space-y-4">
                  {result.predictions.map((pred, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">{pred.label}</span>
                        <span className="font-bold text-slate-900">{pred.score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${pred.color}`} 
                          style={{ width: `${pred.score}%`, transition: 'width 1s ease-in-out' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {result.predictions[0].score > 50 && result.predictions[0].label.includes('Mélanome') && (
                  <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md flex gap-3">
                    <AlertCircle className="text-red-500 mt-0.5" size={20} />
                    <p className="text-sm text-red-800 font-medium">
                      Attention : Probabilité élevée de pathologie maligne. Une vérification histopathologique (biopsie) est fortement recommandée. Ce résultat généré par IA ne constitue pas un diagnostic définitif.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}