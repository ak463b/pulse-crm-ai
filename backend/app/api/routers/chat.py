from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import logging

# We will define these in the upcoming steps
from app.core.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.agent.graph import process_chat_message 

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["AI Co-Pilot"])

@router.post("/", response_model=ChatResponse)
async def chat_with_agent(request: ChatRequest, db: Session = Depends(get_db)):
    """
    Receives a natural language message from the rep, passes it through the 
    LangGraph agent (powered by Groq), and returns a structured response.
    """
    try:
        # We pass the user's message, the current form state (context), 
        # and the db session (so LangGraph tools can read/write data).
        agent_result = await process_chat_message(
            message=request.message,
            context=request.context,
            db=db
        )
        
        return ChatResponse(
            reply=agent_result.get("reply", "I have processed your request."),
            extractedData=agent_result.get("extractedData", None)
        )
    except Exception as e:
        logger.error(f"Agent processing error: {str(e)}")
        raise HTTPException(status_code=500, detail="The AI Co-pilot encountered an error.")