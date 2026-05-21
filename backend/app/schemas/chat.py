from pydantic import BaseModel
from typing import Optional, Dict, Any

class ChatRequest(BaseModel):
    message: str
    # Context represents the current state of the frontend form.
    # We pass it to the AI so it knows what fields have already been filled out!
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    reply: str
    # extractedData contains the exact JSON keys to update Redux (e.g., {"sentiment": "positive"})
    extractedData: Optional[Dict[str, Any]] = None