from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

# Import the Base declarative class we set up in database.py
from app.core.database import Base

class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    specialty = Column(String, index=True)
    hospital = Column(String)
    last_seen = Column(Date)
    status = Column(String, default="Active")  # e.g., 'Target', 'Active'
    created_at = Column(DateTime, default=datetime.utcnow)

    # Establish a One-to-Many relationship with Interactions
    # When you fetch an HCP, you can access hcp.interactions to get all their logs
    interactions = relationship("Interaction", back_populates="hcp", cascade="all, delete-orphan")