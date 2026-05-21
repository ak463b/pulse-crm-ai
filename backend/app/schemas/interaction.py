from pydantic import BaseModel, ConfigDict
from typing import Optional
# Notice the alias added to 'time' on this line:
from datetime import date, datetime, time as dt_time

class InteractionBase(BaseModel):
    hcp_id: Optional[int] = None
    interaction_type: str = "Meeting"
    date: date
    # Now Python knows exactly which 'time' is the variable and which is the type
    time: Optional[dt_time] = None
    attendees: Optional[str] = None
    
    topics_discussed: Optional[str] = None
    materials_shared: Optional[str] = None
    samples_distributed: Optional[str] = None
    
    sentiment: Optional[str] = "neutral"
    outcomes: Optional[str] = None
    follow_up_actions: Optional[str] = None

class InteractionCreate(InteractionBase):
    # This is used when the frontend sends a POST request to create a new log
    pass

class InteractionResponse(InteractionBase):
    id: int
    created_at: datetime

    # Allows seamless conversion from SQLAlchemy to JSON
    model_config = ConfigDict(from_attributes=True)