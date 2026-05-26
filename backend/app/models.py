from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Enum, Boolean
from sqlalchemy import JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(100), nullable=False)
    email       = Column(String(255), unique=True, nullable=False, index=True)
    password    = Column(String(255), nullable=False)
    created_at  = Column(DateTime, default=datetime.utcnow)

    analyses    = relationship("Analysis", back_populates="user")


class Analysis(Base):
    """
    Table centrale — une ligne = une analyse complète soumise par un utilisateur.
    """
    __tablename__ = "analyses"

    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(Integer, ForeignKey("users.id"), nullable=False)

    # ── Images ────────────────────────────────────────────────────────────────
    # Image originale uploadée par l'utilisateur
    image_path      = Column(String(500), nullable=False)
    # Heatmap Grad-CAM générée après l'inférence
    gradcam_path    = Column(String(500), nullable=True)

    # ── Résultat de prédiction ────────────────────────────────────────────────
    # Classe prédite ex: "Melanoma" ou "Benign"
    predicted_class = Column(String(100), nullable=False)
    # Score de confiance de la classe prédite ex: 0.94
    confidence      = Column(Float, nullable=False)
    # Scores softmax complets pour toutes les classes {"Melanoma": 0.94, "Benign": 0.06}
    all_probs       = Column(JSON, nullable=True)

    # ── Données cliniques saisies par l'utilisateur ───────────────────────────
    # Âge du patient
    patient_age         = Column(Integer, nullable=True)
    # Sexe: "male" | "female"
    patient_sex         = Column(Enum("male", "female", "other", name="sex_enum"), nullable=True)
    # Localisation anatomique ex: "upper extremity", "back", "face"
    lesion_localization = Column(String(100), nullable=True)
    # Notes libres du clinicien (optionnel)
    clinical_notes      = Column(Text, nullable=True)

    # ── Rapport PDF ───────────────────────────────────────────────────────────
    # Chemin vers le PDF généré automatiquement après l'analyse
    pdf_report_path = Column(String(500), nullable=True)

    # ── Suivi dans le temps (idée supplémentaire) ─────────────────────────────
    # Permet de regrouper plusieurs analyses de la MÊME lésion
    # Si NULL : analyse isolée
    # Si renseigné : toutes les analyses avec le même lesion_id forment un suivi
    lesion_id       = Column(String(100), nullable=True, index=True)

    # ── Feedback médecin (idée supplémentaire) ────────────────────────────────
    # Le médecin peut confirmer ou corriger le diagnostic de l'IA
    # NULL = pas encore reviewé | "confirmed" | "corrected"
    doctor_feedback     = Column(Enum("confirmed", "corrected", name="feedback_enum"), nullable=True)
    # Si corrigé, le vrai diagnostic selon le médecin
    doctor_true_label   = Column(String(100), nullable=True)

    # ── Métadonnées ───────────────────────────────────────────────────────────
    created_at  = Column(DateTime, default=datetime.utcnow)

    user        = relationship("User", back_populates="analyses")