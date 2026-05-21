from langchain_core.tools import tool
from app.core.database import SessionLocal
from app.models.hcp import HCP

@tool
def lookup_hcp_in_database(name: str) -> str:
    """
    Looks up a Healthcare Professional by name in the SQL database. 
    Use this when the user asks about a specific doctor.
    """
    db = SessionLocal()
    try:
        # Perform a case-insensitive search
        hcp = db.query(HCP).filter(HCP.name.ilike(f"%{name}%")).first()
        if hcp:
            return f"Found HCP: ID {hcp.id}, Name: {hcp.name}, Specialty: {hcp.specialty}, Status: {hcp.status}"
        return f"Could not find any HCP matching the name '{name}' in the database."
    finally:
        db.close()

@tool
def extract_crm_form_data(
    hcpName: str = "", 
    interactionType: str = "Meeting", 
    date: str = "", 
    topicsDiscussed: str = "", 
    sentiment: str = "neutral", 
    followUpActions: str = ""
) -> dict:
    """
    CRITICAL: You MUST use this tool whenever the user describes a meeting, call, or interaction.
    Pass the extracted details into this tool so they can be sent to the React frontend.
    """
    return {
        "hcpName": hcpName,
        "interactionType": interactionType,
        "date": date,
        "topicsDiscussed": topicsDiscussed,
        "sentiment": sentiment,
        "followUpActions": followUpActions
    }