from typing import TypedDict, Annotated, Sequence, Any, Dict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    # 'add_messages' ensures new messages are appended to the list rather than overwriting it
    messages: Annotated[Sequence[BaseMessage], add_messages]
    
    # What the React form currently looks like
    context: Dict[str, Any]
    
    # The JSON data we will send back to auto-fill the React form
    extractedData: Dict[str, Any]