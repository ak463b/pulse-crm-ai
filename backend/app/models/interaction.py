from sqlalchemy import Column, Integer, String, Text, Date, Time, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign key linking back to the HCP table
    hcp_id = Column(Integer, ForeignKey("hcps.id"), nullable=True)

    # Core interaction details matching your frontend form
    interaction_type = Column(String, default="Meeting")  # Meeting, Call, Email
    date = Column(Date, nullable=False)
    time = Column(Time)
    attendees = Column(String)

    # Qualitative data fields
    topics_discussed = Column(Text)
    materials_shared = Column(String)
    samples_distributed = Column(String)

    # Assessment and Next Steps
    sentiment = Column(String, default="neutral")  # positive, neutral, negative
    outcomes = Column(Text)
    follow_up_actions = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship back to the HCP parent record
    hcp = relationship("HCP", back_populates="interactions")