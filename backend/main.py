from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging

# Import database engine and declarative base
from app.core.database import engine, Base
from app.core.config import settings

# Import routers
from app.api.routers import chat, hcps, interactions

# Import models so SQLAlchemy registers them before creating tables
from app.models import hcp, interaction

# Set up basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Automatically generate database tables based on our SQLAlchemy models
logger.info("Initializing database tables...")
Base.metadata.create_all(bind=engine)

# Initialize FastAPI App
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API Engine for the AI-Driven HCP Interaction Manager",
    version="1.0.0"
)

# Configure Cross-Origin Resource Sharing (CORS)
# This prevents your browser from blocking requests between the React frontend and FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Allow Vite local dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PATCH, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Mount the routers under the /api prefix
app.include_router(chat.router, prefix="/api")
app.include_router(hcps.router, prefix="/api")
app.include_router(interactions.router, prefix="/api")

@app.get("/")
def health_check():
    """Simple health check endpoint to verify the server is running."""
    return {
        "status": "online", 
        "service": settings.PROJECT_NAME,
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    # Runs the server using uvicorn when you execute this script directly
    logger.info("Starting FastAPI server on http://localhost:8000")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)