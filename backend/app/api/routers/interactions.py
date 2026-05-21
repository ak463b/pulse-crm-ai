from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import InteractionCreate, InteractionResponse

router = APIRouter(prefix="/interactions", tags=["Interactions"])

@router.post("/", response_model=InteractionResponse)
def create_interaction(interaction: InteractionCreate, db: Session = Depends(get_db)):
    """
    Manually log an interaction bypassing the AI. 
    This receives the exact JSON from the React Left-Pane form.
    """
    db_interaction = Interaction(**interaction.dict())
    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)
    return db_interaction

@router.get("/", response_model=List[InteractionResponse])
def get_interaction_history(hcp_id: int = None, db: Session = Depends(get_db)):
    """Fetch interaction history, optionally filtered by a specific HCP."""
    query = db.query(Interaction)
    if hcp_id:
        query = query.filter(Interaction.hcp_id == hcp_id)
    
    # Order by newest first
    return query.order_by(Interaction.date.desc()).all()