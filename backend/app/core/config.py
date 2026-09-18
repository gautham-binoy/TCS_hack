from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = BASE_DIR / ".env"

class Settings(BaseSettings):
    port: int = 8000
    frontend_url: str = "http://localhost:5173"
    
    # Gemini Configuration
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.1-flash-lite"
    
    # Fallback / Alternative Keys
    ai_api_key: str = ""
    groq_api_key: str = ""
    groq_model: str = "llama3-8b-8192"

    model_config = SettingsConfigDict(
        env_file=[str(ENV_FILE), ".env"],
        extra="ignore"
    )

@lru_cache()
def get_settings() -> Settings:
    return Settings()
