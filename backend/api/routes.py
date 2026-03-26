import random
import time
from fastapi import APIRouter
from services.story_analyzer import analyze_story
from services.risk_engine import RiskEngine
# from services.rag_service import retrieve_defects
from services.test_generator_llm_service import generate_tests
from services.defect_generator import generate_defects

from services.vector_memory import VectorMemory
from services.pattern_engine import PatternEngine

from services.llm_summary import generate_summary

from services.test_executor import execute_tests

from services.jira_service import JiraService

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
    # story = data["story"]

    # extracting stories from JIRA tool
    jira_service = JiraService()

    jira_data = {}
    if "jira_id" in data:
        jira_data = jira_service.get_issue(data["jira_id"])
        if "error" in jira_data:
            return{
                "error": "Jira fetch failed",
                "details": jira_data
            }
        summary = jira_data.get("summary", "")
        description = jira_data.get("description", "")
        story = f"""
        Feature: {summary}
        Description: {description}
        """
    else:
        summary = ""
        description = ""
        story = data.get("story", "")
    # -end- #

    analysis = analyze_story(story)

    defects = generate_defects(story)

# storing defects in memory
    for d in defects:
        memory.store(d)

    # query = story + " " + analysis.get("action", "")
    query = f"""
    {summary} {description} 
    Action: {analysis.get('action', '')} 
    Focus: defects, bugs, failures, edge cases, negative scenarios, boundary testing
    """

    print("SUMMARY: ", summary)
    print("DESCRIPTION: ", description)

    
    # memory_defects = memory.search(analysis["action"])
    # memory_defects = memory.search(query, top_k=5)
    raw_memory = memory.search(query, top_k=5)
    
    keywords = analysis.get("action", "").lower()

    for d in raw_memory:
        text = d["description"].lower()

        if keywords in text:
            d["similarity"] += 0.2   # boost

    memory_defects = []
    for d in raw_memory:
        if d["similarity"] > 0.6:   # threshold
            memory_defects.append(d)

    memory_defects = sorted(memory_defects, key=lambda x: x["similarity"], reverse=True)

# learning
    pattern_engine.learn(analysis.get("action", "general"), len(defects))

    history = pattern_engine.get_history(analysis.get("action", "general"))

# removing duplicates
    # all_defects = defects + memory_defects
    def is_duplicate(d1, d2):
        return d1["description"].lower() == d2["description"].lower()
    
    all_defects = defects.copy()

    for d in memory_defects:
        if not any(is_duplicate(d, existing) for existing in all_defects):
            all_defects.append(d)

    # complexity = len(story.split()) / 20
    complexity = min(len(story.split()) / 20, 5)

    risk = risk_engine.calculate_risk(
        all_defects,
        analysis.get("action", "unknown"),
        history,
        complexity
    )

    # risk highlight
    high_risk_modules = []
    if risk["risk"] == "HIGH":
            high_risk_modules.append(analysis["action"])

    tests = generate_tests(
        summary = summary,
        description=description,
        defects=all_defects
    )

    summary_text = generate_summary(story, risk)

    return {
        "analysis": analysis,
        "User_Story_Title": summary,
        "defects": all_defects,
        "risk": risk,

        # self learning system proof
        "learning": {
             "past_defects_used": len(memory_defects),
             "history_count": history,
             "message": "System reused past defects and improved prediction"
        },

        # for context aware testing because right now embeddings are invisible
        "context": {
             "query_used": query,
             "matched_defects": [
                 {
                     "description": d["description"],
                     "similarity": round(float(d["similarity"]), 2)
                 }
                 for d in memory_defects
             ]
        },
        
        "insights": {
            "high_risk_modules": high_risk_modules
        },
        "ai_summary": summary_text,
        "summary": {
            "total_defects": len(all_defects),
            "high_severity": [
                d for d in all_defects if d.get("severity", "low") in ["high", "critical"]
            ]
        },

        "tests": tests
    }

@router.get("/jira/{issue_key}")
def fetch_jira(issue_key:str):
    jira_service = JiraService()
    return jira_service.get_issue(issue_key)

@router.post("/execute-tests")
def execute_tests_api(data: dict = {}):
    """
    Execute generated test cases (dummy/simulated execution).
    If `story` or `jira_id` is provided, it will fetch test cases first.
    """

    test_cases = []
    summary = ""
    description = ""

    if "jira_id" in data:
        jira_service = JiraService()
        jira_data = jira_service.get_issue(data["jira_id"])
        if "error" in jira_data:
            return {"error": "Jira fetch failed", "details": jira_data}
        summary = jira_data.get("summary", "")
        description = jira_data.get("description", "")
        story = f"Feature: {summary}\nDescription: {description}"
    else:
        story = data.get("story", "")

    defects = generate_defects(story)
    for d in defects:
        memory.store(d)

   
    tests = generate_tests(summary=summary, description=description, defects=defects)
    test_cases = tests if tests else []

    
    executed_cases = []
    
    fail_index = random.randint(0, len(test_cases) - 1)

    for i, tc in enumerate(test_cases):
        # Simulated pass/fail
        fail_index = random.randint(0, len(test_cases) - 1)  # random failing test
        status = "fail" if i == fail_index else "pass"
        duration_ms = random.randint(100, 800)
        error = None
        screenshot = None

        if status == "fail":
            error = f"AssertionError: Expected result for {tc.get('title')} not met"
            screenshot = f"screenshot_{tc.get('id', i)}.png"

        steps_result = []
        for step in tc.get("steps", []):
            step_status = "fail" if status == "fail" and random.random() < 0.3 else "pass"
            step_duration = random.randint(20, 200)
            steps_result.append({
                "step": step,
                "status": step_status,
                "duration_ms": step_duration
            })

        executed_cases.append({
            **tc,
            "status": status,
            "duration_ms": duration_ms,
            "error": error,
            "screenshot": screenshot,
            "steps_result": steps_result
        })

    execution_id = f"exec_{int(time.time())}"

    return {
        "execution_id": execution_id,
        "started_at": time.time(),
        "test_cases": executed_cases
    }