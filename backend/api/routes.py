from fastapi import APIRouter
from services.story_analyzer import analyze_story
from services.risk_engine import calculate_risk
from services.rag_service import retrieve_defects
from services.llm_service import generate_tests

router = APIRouter()

@router.get("/")
def home():
    return {"message": "Hello World"}

@router.post("/analyze-story")
def analyze(story: dict):
    result = analyze_story(story["description"])
    return {"analysis": result}

@router.post("/generate-tests")
def generate_tests_api(data: dict):
    story = data["story"]

    analysis = analyze_story(story)

    defects = retrieve_defects(analysis["action"])

    risk = calculate_risk(defects)

    tests = generate_tests(story, defects)

    return {
        "analysis": analysis,
        "risk": risk,
        "tests": tests
    }
