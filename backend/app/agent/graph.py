from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.agent.state import AgentState
from app.agent.nodes import call_model, tools
from app.agent.tools import lookup_hcp_in_database, extract_crm_form_data

# ==========================================================================
# 1. Define the LangGraph Routing Logic
# ==========================================================================

def execute_tools_node(state: AgentState):
    """
    A custom node that executes tools if the LLM requested them.
    This fulfills the requirement of manual or automated tool execution loop.
    """
    messages = state.get("messages", [])
    last_message = messages[-1] if messages else None
    extracted_data = state.get("extractedData", {})
    
    # If the model didn't request any tools, just return current state
    if not last_message or not getattr(last_message, "tool_calls", None):
        return {}

    new_messages = []
    for tool_call in last_message.tool_calls:
        tool_name = tool_call["name"]
        tool_args = tool_call["args"]
        tool_id = tool_call["id"]
        
        # Execute the specific tool chosen by the LLM
        if tool_name == "lookup_hcp_in_database":
            result = lookup_hcp_in_database.invoke(tool_args)
            # Create a ToolMessage to feed back into the conversation history
            from langchain_core.messages import ToolMessage
            new_messages.append(ToolMessage(content=str(result), tool_call_id=tool_id))
            
        elif tool_name == "extract_crm_form_data":
            # This tool's arguments are already parsed in nodes.py,
            # but we invoke it here to generate the correct structural message track.
            result = extract_crm_form_data.invoke(tool_args)
            from langchain_core.messages import ToolMessage
            new_messages.append(ToolMessage(content=str(result), tool_call_id=tool_id))
            extracted_data = tool_args

    return {"messages": new_messages, "extractedData": extracted_data}


def route_after_model(state: AgentState) -> str:
    """
    Conditional edge router. Tells the graph whether to loop into 
    tool execution or finish and reply to the frontend.
    """
    messages = state.get("messages", [])
    last_message = messages[-1] if messages else None
    
    if last_message and getattr(last_message, "tool_calls", None):
        return "execute_tools"
    return END

# ==========================================================================
# 2. Build and Compile the Graph
# ==========================================================================

workflow = StateGraph(AgentState)

# Add our processing units (Nodes)
workflow.add_node("call_model", call_model)
workflow.add_node("execute_tools", execute_tools_node)

# Set the starting point
workflow.set_entry_point("call_model")

# Add conditional routing logic
workflow.add_conditional_edges(
    "call_model",
    route_after_model,
    {
        "execute_tools": "execute_tools",
        END: END
    }
)

# Loop back into the model after tools finish so it can read results
workflow.add_edge("execute_tools", "call_model")

# Compile the compiled workflow into an executable application
app_graph = workflow.compile()

# ==========================================================================
# 3. Main FastAPI Interface Function
# ==========================================================================

async def process_chat_message(message: str, context: Dict[str, Any], db: Session) -> Dict[str, Any]:
    """
    The orchestrator endpoint called by api/routers/chat.py.
    Takes incoming user text, runs it through LangGraph, and extracts the results.
    """
    # 1. Initialize state inputs
    inputs = {
        "messages": [HumanMessage(content=message)],
        "context": context or {},
        "extractedData": {}
    }
    
    # 2. Run the graph synchronously/asynchronously
    final_state = await app_graph.ainvoke(inputs)
    
    # 3. Grab the final conversational output from the message stream
    final_messages = final_state.get("messages", [])
    ai_reply = "I've processed your request."
    
    if final_messages:
        # Loop backwards to find the last text response from the assistant
        for msg in reversed(final_messages):
            if isinstance(msg, AIMessage) and msg.content:
                ai_reply = msg.content
                break

    # 4. Return clean dictionary payload straight back to FastAPI -> React
    return {
        "reply": ai_reply,
        "extractedData": final_state.get("extractedData", {})
    }