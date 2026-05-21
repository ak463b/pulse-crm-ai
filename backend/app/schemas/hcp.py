from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date, datetime

class HCPBase(BaseModel):
    name: str
    specialty: Optional[str] = None
    hospital: Optional[str] = None
    last_seen: Optional[date] = None
    status: Optional[str] = "Active"

class HCPCreate(HCPBase):
    pass

class HCPUpdate(BaseModel):
    # Everything is optional here because a PATCH request might only update one field (like status)
    name: Optional[str] = None
    specialty: Optional[str] = None
    hospital: Optional[str] = None
    last_seen: Optional[date] = None
    status: Optional[str] = None

class HCPResponse(HCPBase):
    id: int
    created_at: datetime

    # This tells Pydantic v2 to automatically read the data from SQLAlchemy ORM models
    model_config = ConfigDict(from_attributes=True)