from fastapi import APIRouter
from services.story_analyzer import analyze_story
from services.risk_engine import RiskEngine
from services.rag_service import retrieve_defects
from services.test_generator_llm_service import generate_tests
from services.defect_generator import generate_defects

from services.vector_memory import VectorMemory
from services.pattern_engine import PatternEngine

router = APIRouter()

memory = VectorMemory()
pattern_engine = PatternEngine()
risk_engine = RiskEngine()

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

    defects = generate_defects(story)

    for d in defects:
        memory.store(d)

    memory_defects = memory.search(analysis["action"])

    pattern_engine.learn(analysis["action"])

    history = pattern_engine.get_history(analysis["action"])

    all_defects = defects + memory_defects
    
    complexity = len(story.split()) / 20

    risk = risk_engine.calculate_risk(
        all_defects,
        analysis["action"],
        history,
        complexity
    )

    tests = generate_tests(story, all_defects)

    return {
        "analysis": analysis,
        "defects": all_defects,
        "risk": risk,
        "tests": tests
    }
