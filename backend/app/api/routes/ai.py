from fastapi import APIRouter
from app.schemas.ai import AIQueryRequest, AIQueryResponse
from app.services.ai import AIService

router = APIRouter()
ai_service = AIService()

@router.post("/query", response_model=AIQueryResponse)
def query_ai(request: AIQueryRequest):
    context = request.context.model_dump() if request.context else {}
    if request.buildingId:
        context["buildingId"] = request.buildingId
    return ai_service.process_query(request.query, context)
