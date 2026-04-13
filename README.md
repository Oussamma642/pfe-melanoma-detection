
melanoscan/
│
├── data/                                données brutes + traitées
│   ├── raw/
│   │   ├── HAM10000_images_part1/       images JPEG originales
│   │   ├── HAM10000_images_part2/
│   │   └── HAM10000_metadata.csv
│   └── processed/
│       ├── images_resized/              224×224 pré-redimensionnées
│       ├── tabular_train.csv
│       ├── tabular_val.csv
│       └── tabular_test.csv
│
├── notebooks/                           exploration + entraînement
│   ├── 01_exploration.ipynb             EDA, distributions, métadonnées
│   ├── 02_preprocessing.ipynb           DataLoaders, augmentation, encodage
│   ├── 03A_cnn_scratch.ipynb            CNN léger from scratch (baseline)
│   ├── 03B_efficientnet.ipynb           Transfer Learning EfficientNetB0
│   ├── 03C_comparison.ipynb             Scratch vs Transfer Learning
│   ├── 04_random_forest.ipynb           Random Forest + GridSearchCV
│   └── 05_evaluation.ipynb              Métriques finales + Grad-CAM
│
├── src/                                 code Python réutilisable
│   ├── __init__.py
│   ├── dataset.py                       HAM10000Dataset, DataLoaders, sampler
│   ├── preprocessing.py                 transforms, encodage, imputation
│   ├── models/
│   │   ├── __init__.py
│   │   ├── cnn_scratch.py               architecture CNN légère (456K params)
│   │   ├── efficientnet.py              EfficientNetB0 fine-tuné
│   │   └── random_forest.py             RF wrapper + feature importance
│   ├── train_cnn.py                     boucle entraînement CNN (scratch + TL)
│   ├── train_rf.py                      entraînement + GridSearchCV RF
│   ├── evaluate.py                      métriques, matrices confusion, ROC-AUC
│   ├── gradcam.py                       génération heatmaps Grad-CAM
│   └── predict.py                       inférence unifiée (image + tabulaire)
│
├── models/                              modèles sauvegardés
│   ├── cnn_scratch_best.h5              baseline CNN from scratch
│   ├── efficientnet_best.h5             meilleur modèle CNN (production)
│   ├── random_forest_best.pkl           Random Forest sérialisé
│   ├── scaler.pkl                       StandardScaler (âge)
│   └── encoder.pkl                      One-Hot Encoder (sexe, localisation)
│
├── api/                                 backend FastAPI
│   ├── main.py                          point d'entrée FastAPI + CORS
│   ├── routes/
│   │   ├── auth.py                      /auth/register, /auth/login (JWT)
│   │   ├── predict.py                   /predict/tabular, /predict/image
│   │   └── report.py                    /report/{id} — génération PDF
│   ├── schemas.py                       modèles Pydantic (validation)
│   ├── database.py                      connexion + modèles ORM
│   └── utils.py                         chargement modèles, preprocessing
│
├── frontend/                            React / Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClinicalForm.jsx         formulaire âge/sexe/localisation
│   │   │   ├── ImageUpload.jsx          drag & drop image
│   │   │   ├── ResultCard.jsx           affichage prédiction + GradCAM
│   │   │   └── ReportButton.jsx         téléchargement rapport PDF
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx            page principale d'analyse
│   │   ├── api/
│   │   │   └── client.js                appels axios vers FastAPI
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── reports/
│   ├── figures/                         graphiques générés par les notebooks
│   └── results_summary.md               métriques finales documentées
│
├── requirements.txt                 dépendances Python
├── .env.example                     variables d'env (JWT_SECRET, DB_URL...)
├── .gitignore
└── README.md
