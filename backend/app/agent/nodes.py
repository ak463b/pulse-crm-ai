import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, ToolMessage

from app.core.config import settings
from app.agent.state import AgentState
from app.agent.prompts import SYSTEM_PROMPT
from app.agent.tools import lookup_hcp_in_database, extract_crm_form_data

# 1. FORCE PYTHON TO LOAD THE .ENV FILE RIGHT HERE
# We use find_dotenv() to make sure it searches the directory tree until it finds it
from dotenv import find_dotenv
load_dotenv(find_dotenv())

# 2. Grab the keys directly from the operating system
GROQ_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("AGENT_MODEL_NAME", "llama-3.3-70b-versatile")

# Add a safety check so we can see in the terminal exactly what is happening
if not GROQ_KEY:
    print("\n" + "="*50)
    print("🚨 CRITICAL ERROR: YOUR API KEY IS STILL HIDDEN! 🚨")
    print("Python cannot see the GROQ_API_KEY in your .env file.")
    print("="*50 + "\n")

# Initialize the blazing-fast Groq model using the OS variables
llm = ChatGroq(
    model=MODEL_NAME, 
    api_key=GROQ_KEY,
    temperature=0.2 
)

# Bind our Python tools to the model
tools = [lookup_hcp_in_database, extract_crm_form_data]
llm_with_tools = llm.bind_tools(tools)

def call_model(state: AgentState):
    """Node that actually calls the LLM."""
    messages = state.get("messages", [])
    
    # Ensure the system prompt is always injected as the first message
    if not messages or not isinstance(messages[0], SystemMessage):
        messages = [SystemMessage(content=SYSTEM_PROMPT)] + list(messages)

    # Call Groq
    response = llm_with_tools.invoke(messages)
    
    extracted_data = state.get("extractedData", {})

    # Check if the AI decided to call the 'extract_crm_form_data' tool
    if response.tool_calls:
        for tool_call in response.tool_calls:
            if tool_call["name"] == "extract_crm_form_data":
                extracted_data = tool_call["args"]

    return {
        "messages": [response],
        "extractedData": extracted_data
    }