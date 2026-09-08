from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="DGIS GeoAI Platform Backend", version="1.0.0")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "stage": "preprod"}

@app.get("/api/search")
def search():
    return {"message": "Search API placeholder"}

@app.get("/api/change-detection")
def change_detection():
    return {"message": "Change detection API placeholder"}

@app.get("/ws/scan")
def ws_scan():
    return {"message": "Websocket Scan API placeholder"}
 
