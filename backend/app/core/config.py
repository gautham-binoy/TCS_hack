from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    port: int = 8000
    frontend_url: str = "http://localhost:5173"
    ai_api_key: str = ""
    groq_api_key: str = ""
    groq_model: str = "llama3-8b-8192"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

@lru_cache()
def get_settings() -> Settings:
    return Settings()
