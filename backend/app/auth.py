

import bcrypt, jwt, datetime
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from config import SECRET_KEY
from app.database import get_db
from app.models import User
from app.schemas import LoginRequest, RegisterRequest

router = APIRouter()

def _hash(pwd):      return bcrypt.hashpw(pwd.encode(), bcrypt.gensalt()).decode()
def _verify(pwd, h): return bcrypt.checkpw(pwd.encode(), h.encode())
def _token(uid):
    return jwt.encode(
        {"sub": uid, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)},
        SECRET_KEY, algorithm="HS256"
    )

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=data.email).first()
    if not user or not _verify(data.password, user.password):
        # React reads err.response.data.message ✅
        return JSONResponse(status_code=401, content={"message": "Identifiants incorrects."})
    return {
        "token": _token(user.id),
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter_by(email=data.email).first():
        # React reads err.response.data.errors ✅
        return JSONResponse(status_code=422, content={"errors": {"email": ["Email déjà utilisé."]}})
    user = User(name=data.name, email=data.email, password=_hash(data.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {
        "token": _token(user.id),
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }

# import bcrypt, jwt, datetime
# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from config import SECRET_KEY
# from app.database import get_db
# from app.models import User
# from app.schemas import LoginRequest, RegisterRequest

# router = APIRouter()

# def _hash(pwd):    return bcrypt.hashpw(pwd.encode(), bcrypt.gensalt()).decode()
# def _verify(pwd, h): return bcrypt.checkpw(pwd.encode(), h.encode())
# def _token(uid):
#     return jwt.encode(
#         {"sub": uid, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)},
#         SECRET_KEY, algorithm="HS256"
#     )

# @router.post("/login")
# def login(data: LoginRequest, db: Session = Depends(get_db)):
#     user = db.query(User).filter_by(email=data.email).first()
#     if not user or not _verify(data.password, user.password):
#         raise HTTPException(status_code=401, detail={"message": "Identifiants incorrects."})
#     return {"token": _token(user.id), "user": {"id": user.id, "name": user.name, "email": user.email}}

# @router.post("/register")
# def register(data: RegisterRequest, db: Session = Depends(get_db)):
#     if db.query(User).filter_by(email=data.email).first():
#         raise HTTPException(status_code=422, detail={"errors": {"email": ["Email déjà utilisé."]}})
#     user = User(name=data.name, email=data.email, password=_hash(data.password))
#     db.add(user); db.commit(); db.refresh(user)
#     return {"token": _token(user.id), "user": {"id": user.id, "name": user.name, "email": user.email}}
