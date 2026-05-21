from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
from dotenv import load_dotenv

# 1. Explicitly force Python to load the .env file into the system environment
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "PulseCRM AI Agent"
    
    # Database Settings
    DATABASE_URL: str = "sqlite:///./crm_local.db"
    
    # AI / LLM Settings
    GROQ_API_KEY: Optional[str] = None
    
    # UPDATE THIS LINE:
    AGENT_MODEL_NAME: str = "llama-3.3-70b-versatile" 

    # 2. Pydantic V2 strictly requires this model_config format
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

# Create a global instance of the settings to import across the app
settings = Settings()