from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

# We will define these models and schemas next
from app.core.database import get_db
from app.models.hcp import HCP
from app.schemas.hcp import HCPResponse, HCPUpdate

router = APIRouter(prefix="/hcps", tags=["Healthcare Professionals"])

@router.get("/", response_model=List[HCPResponse])
def get_all_hcps(
    specialty: Optional[str] = Query(None, description="Filter by medical specialty"),
    status: Optional[str] = Query(None, description="Filter by status (e.g., Target, Active)"),
    db: Session = Depends(get_db)
):
    """Fetch the directory of Healthcare Professionals."""
    query = db.query(HCP)
    
    # Apply optional query filters if the frontend sends them
    if specialty and specialty != 'All':
        query = query.filter(HCP.specialty == specialty)
    if status and status != 'All':
        query = query.filter(HCP.status == status)
        
    return query.all()

@router.get("/{hcp_id}", response_model=HCPResponse)
def get_hcp(hcp_id: int, db: Session = Depends(get_db)):
    """Fetch a specific HCP profile by ID."""
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()
    if not hcp:
        raise HTTPException(status_code=404, detail="HCP not found in database.")
    return hcp

@router.patch("/{hcp_id}", response_model=HCPResponse)
def update_hcp_status(hcp_id: int, hcp_data: HCPUpdate, db: Session = Depends(get_db)):
    """Update an HCP record (e.g., changing status from Active to Target)."""
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()
    if not hcp:
        raise HTTPException(status_code=404, detail="HCP not found.")
    
    # Update only the fields provided in the request
    for key, value in hcp_data.dict(exclude_unset=True).items():
        setattr(hcp, key, value)
        
    db.commit()
    db.refresh(hcp)
    return hcp