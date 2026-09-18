from typing import Dict, Any
import json
import math
from groq import Groq
from app.repositories.base import BuildingRepository, WasteBinRepository
from app.config import get_settings

settings = get_settings()
building_repo = BuildingRepository()
waste_bin_repo = WasteBinRepository()

class AIService:
    def __init__(self):
        # Fallback to ai_api_key if groq_api_key isn't explicitly set
        api_key = settings.groq_api_key or settings.ai_api_key
        self.client = Groq(api_key=api_key) if api_key else None
        self.model = settings.groq_model

    def process_query(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        if not self.client:
            return {
                "answer": "Groq API Key is missing. Please configure GROQ_API_KEY or AI_API_KEY in the .env file.",
                "locations": [],
                "metrics": [],
                "recommendations": [],
                "alerts": []
            }
            
        buildings = building_repo.get_all()
        waste_bins = waste_bin_repo.get_all()
        
        # Prepare context data to inject into prompt
        context_data = {
            "buildings": buildings,
            "waste_bins": waste_bins,
            "user_context": context
        }
        
        system_prompt = f"""
You are the AI assistant for Campus EcoTwin. 
Use the following JSON context representing the current state of the campus to answer the user's question.
If the user asks for the nearest waste bin and provides their location, calculate the distance. 
Return ONLY a raw JSON object (no markdown formatting, no code blocks, no backticks) with this structure:
{{
    "answer": "string",
    "locations": [{{"lat": float, "lng": float}}],
    "metrics": [],
    "recommendations": [],
    "alerts": []
}}
Context Data: {json.dumps(context_data, default=str)}
"""

        try:
            chat_completion = self.client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": query}
                ],
                model=self.model,
                temperature=0.2,
                response_format={"type": "json_object"}
            )
            
            response_content = chat_completion.choices[0].message.content
            return json.loads(response_content)
            
        except Exception as e:
            return {
                "answer": f"Error processing AI request: {str(e)}",
                "locations": [],
                "metrics": [],
                "recommendations": [],
                "alerts": []
            }
