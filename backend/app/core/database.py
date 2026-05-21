from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

# SQLAlchemy setup
# Note: check_same_thread=False is required ONLY for SQLite in FastAPI to prevent thread sharing issues.
connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

try:
    engine = create_engine(
        settings.DATABASE_URL, 
        connect_args=connect_args,
        echo=False # Set to True if you want to see the raw SQL queries in your terminal
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    
    # This is the Base class that all our future database models will inherit from
    Base = declarative_base()
    
except Exception as e:
    logger.error(f"Failed to initialize database connection: {e}")
    raise e

# Dependency function for FastAPI routes
def get_db():
    """
    Creates a new database session for a request and closes it once the request is finished.
    This ensures clean connections and prevents memory leaks.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()