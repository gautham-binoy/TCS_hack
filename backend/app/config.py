# pyrefly: ignore [missing-import]
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    port: int = 8000
    frontend_url: str = "http://localhost:5173"
    ai_api_key: str = ""
    groq_api_key: str = ""
    groq_model: str = "gpt-oss-20b"

    model_config = SettingsConfigDict(env_file=".env")

@lru_cache()
def get_settings():
    return Settings()
