

from fastapi import APIRouter

router = APIRouter()

# POST /api/diagnostics  → soumettre image + métadonnées → prédiction ConvNeXt
# GET  /api/diagnostics  → historique du user connecté
