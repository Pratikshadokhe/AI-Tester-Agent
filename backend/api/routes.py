# # from fastapi import APIRouter
# # from services.story_analyzer import analyze_story
# # from services.risk_engine import RiskEngine
# # # from services.rag_service import retrieve_defects
# # from services.test_generator_llm_service import generate_tests
# # from services.defect_generator import generate_defects

# # from services.vector_memory import VectorMemory
# # from services.pattern_engine import PatternEngine

# # from services.llm_summary import generate_summary
# # from automation.playwright_runner import run_test_cases

# # router = APIRouter()

# # memory = VectorMemory()
# # pattern_engine = PatternEngine()
# # risk_engine = RiskEngine()

# # @router.get("/")
# # def home():
# #     return {"message": "Hello World"}



# # @router.post("/analyze-story")
# # def analyze(story: dict):
# #     result = analyze_story(story["description"])
# #     return {"analysis": result}

# # @router.post("/generate-tests")
# # def generate_tests_api(data: dict):
# #     story = data["story"]

# #     analysis = analyze_story(story)

# #     defects = generate_defects(story)



# # # storing defects in memory
# #     for d in defects:
# #         memory.store(d)

# #     # query = story + " " + analysis.get("action", "")
# #     query = f"{story} {analysis.get('action', '')} defects bugs failure edge cases"
# #     # memory_defects = memory.search(analysis["action"])
# #     # memory_defects = memory.search(query, top_k=5)
# #     raw_memory = memory.search(query, top_k=5)
    
# #     keywords = analysis.get("action", "").lower()

# #     for d in raw_memory:
# #         text = d["description"].lower()

# #         if keywords in text:
# #             d["similarity"] += 0.2   # boost

# #     memory_defects = []
# #     for d in raw_memory:
# #         if d["similarity"] > 0.6:   # threshold
# #             memory_defects.append(d)

# #     memory_defects = sorted(memory_defects, key=lambda x: x["similarity"], reverse=True)

# # # learning
# #     pattern_engine.learn(analysis.get("action", "general"), len(defects))

# #     history = pattern_engine.get_history(analysis.get("action", "general"))

# # # removing duplicates
# #     # all_defects = defects + memory_defects
# #     def is_duplicate(d1, d2):
# #         return d1["description"].lower() == d2["description"].lower()
    
# #     all_defects = defects.copy()

# #     for d in memory_defects:
# #         if not any(is_duplicate(d, existing) for existing in all_defects):
# #             all_defects.append(d)

# #     # complexity = len(story.split()) / 20
# #     complexity = min(len(story.split()) / 20, 5)

# #     risk = risk_engine.calculate_risk(
# #         all_defects,
# #         analysis.get("action", "unknown"),
# #         history,
# #         complexity
# #     )

# #     # risk highlight
# #     high_risk_modules = []
# #     if risk["risk"] == "HIGH":
# #             high_risk_modules.append(analysis["action"])

# #     tests = generate_tests(story, all_defects)

# #     summary_text = generate_summary(story, risk)

# #     return {
# #         "analysis": analysis,
# #         "defects": all_defects,
# #         "risk": risk,

# #         # self learning system proof
# #         "learning": {
# #              "past_defects_used": len(memory_defects),
# #              "history_count": history,
# #              "message": "System reused past defects and improved prediction"
# #         },

# #         # for context aware testing because right now embeddings are invisible
# #         "context": {
# #              "query_used": query,
# #              "matched_defects": [
# #                  {
# #                      "description": d["description"],
# #                      "similarity": round(float(d["similarity"]), 2)
# #                  }
# #                  for d in memory_defects
# #              ]
# #         },
        
# #         "insights": {
# #             "high_risk_modules": high_risk_modules
# #         },
# #         "ai_summary": summary_text,
# #         "summary": {
# #             "total_defects": len(all_defects),
# #             "high_severity": [
# #                 d for d in all_defects if d.get("severity", "low") in ["high", "critical"]
# #             ]
# #         },

# #         "tests": tests
# #     }

# # @router.post("/execute-tests")
# # def execute_tests(data: dict):

# #     test_cases = data.get("tests", [])

# #     results = run_test_cases(test_cases)

# #     return {"results": results}

# from fastapi import APIRouter
# from services.story_analyzer import analyze_story
# from services.risk_engine import RiskEngine
# from services.test_generator_llm_service import generate_tests
# from services.defect_generator import generate_defects
# from services.jira_service import fetch_story
# from services.vector_memory import VectorMemory
# from services.pattern_engine import PatternEngine
# from services.llm_summary import generate_summary

# from automation.playwright_runner import run_test_cases

# router = APIRouter()

# memory = VectorMemory()
# pattern_engine = PatternEngine()
# risk_engine = RiskEngine()


# # ✅ Home route
# @router.get("/")
# def home():
#     return {"message": "Hello World"}


# # ✅ Analyze story
# @router.post("/analyze-story")
# def analyze(data: dict):
#     story = data.get("description", "")
#     result = analyze_story(story)
#     return {"analysis": result}


# # ✅ Generate tests + full pipeline
# @router.post("/generate-tests")
# def generate_tests_api(data: dict):

#     story = data.get("story", "")

#     if not story:
#         return {"error": "Story is required"}

#     # Step 1: Analyze
#     analysis = analyze_story(story)

#     # Step 2: Generate defects
#     defects = generate_defects(story)

#     # ✅ SAFE memory storage
#     for d in defects:
#         if isinstance(d, dict) and "description" in d:
#             memory.store(d)

#     # Step 3: Memory search
#     query = f"{story} {analysis.get('action', '')} defects bugs failure edge cases"
#     raw_memory = memory.search(query, top_k=5)

#     keywords = str(analysis.get("action", "")).lower()

#     # boost relevant defects
#     for d in raw_memory:
#         text = d.get("description", "").lower()
#         if keywords in text:
#             d["similarity"] += 0.2

#     # filter relevant
#     memory_defects = []
#     for d in raw_memory:
#         if d.get("similarity", 0) > 0.6:
#             memory_defects.append(d)

#     memory_defects = sorted(memory_defects, key=lambda x: x["similarity"], reverse=True)

#     # Step 4: Learning
#     pattern_engine.learn(analysis.get("action", "general"), len(defects))
#     history = pattern_engine.get_history(analysis.get("action", "general"))

#     # Step 5: Merge defects (remove duplicates)
#     def is_duplicate(d1, d2):
#         return d1.get("description", "").lower() == d2.get("description", "").lower()

#     all_defects = defects.copy()

#     for d in memory_defects:
#         if not any(is_duplicate(d, existing) for existing in all_defects):
#             all_defects.append(d)

#     # Step 6: Risk calculation
#     complexity = min(len(story.split()) / 20, 5)

#     risk = risk_engine.calculate_risk(
#         all_defects,
#         analysis.get("action", "unknown"),
#         history,
#         complexity
#     )

#     # Step 7: Risk insights
#     high_risk_modules = []
#     if risk.get("risk") == "HIGH":
#         high_risk_modules.append(analysis.get("action", "unknown"))

#     # Step 8: Generate tests
#     tests = generate_tests(story, all_defects)

#     # Step 9: Summary
#     summary_text = generate_summary(story, risk)

#     return {
#         "analysis": analysis,
#         "defects": all_defects,
#         "risk": risk,

#         "learning": {
#             "past_defects_used": len(memory_defects),
#             "history_count": history,
#             "message": "System reused past defects and improved prediction"
#         },

#         "context": {
#             "query_used": query,
#             "matched_defects": [
#                 {
#                     "description": d.get("description", ""),
#                     "similarity": round(float(d.get("similarity", 0)), 2)
#                 }
#                 for d in memory_defects
#             ]
#         },

#         "insights": {
#             "high_risk_modules": high_risk_modules
#         },

#         "ai_summary": summary_text,

#         "summary": {
#             "total_defects": len(all_defects),
#             "high_severity": [
#                 d for d in all_defects if d.get("severity", "low") in ["high", "critical"]
#             ]
#         },

#         "tests": tests
#     }


# # ✅ Execute tests (Playwright)
# @router.post("/execute-tests")
# def execute_tests(data: dict):

#     test_cases = data.get("tests", [])

#     if not test_cases:
#         return {
#             "error": "No test cases provided",
#             "results": []
#         }

#     try:
#         results = run_test_cases(test_cases)
#         return {"results": results}

#     except Exception as e:
#         return {
#             "error": str(e),
#             "results": []
#         }

# @router.post("/run-from-jira")
# def run_from_jira(data: dict):
#     issue_key = data["issue_key"]

#     # 1. Fetch story from JIRA
#     story = fetch_story(issue_key)

#     # 2. Generate defects + tests
#     analysis = analyze_story(story)
#     defects = generate_defects(story)

#     tests = generate_tests(story, defects)

#     # 3. Execute tests
#     results = run_test_cases(tests)

#     return {
#         "story": story,
#         "tests": tests,
#         "results": results
#     }

from fastapi import APIRouter

# Core services
from services.story_analyzer import analyze_story
from services.defect_generator import generate_defects
from services.test_generator_llm_service import generate_tests
from services.risk_engine import RiskEngine
from services.llm_summary import generate_summary

# Memory + Learning
from services.vector_memory import VectorMemory
from services.pattern_engine import PatternEngine

# Execution
from automation.playwright_runner import run_test_cases

# JIRA
from services.jira_service import get_jira_story

router = APIRouter()

# 🔥 Initialize once
memory = VectorMemory()
pattern_engine = PatternEngine()
risk_engine = RiskEngine()


# ✅ Health Check
@router.get("/")
def home():
    return {"message": "AI Tester Agent Running"}


# ✅ Analyze only
@router.post("/analyze-story")
def analyze(story: dict):
    result = analyze_story(story["description"])
    return {"analysis": result}


# ✅ Generate Tests (FULL PIPELINE)
@router.post("/generate-tests")
def generate_tests_api(data: dict):

    story = data["story"]

    # 1️⃣ Analyze
    analysis = analyze_story(story)

    # 2️⃣ Generate defects
    defects = generate_defects(story)

    # 3️⃣ Store in memory
    for d in defects:
        memory.store(d)

    # 4️⃣ Retrieve similar defects
    query = f"{story} {analysis.get('action', '')} defects bugs failure edge cases"
    raw_memory = memory.search(query, top_k=5)

    # Boost relevance
    keywords = analysis.get("action", "").lower()
    for d in raw_memory:
        if keywords in d["description"].lower():
            d["similarity"] += 0.2

    # Filter
    memory_defects = [d for d in raw_memory if d["similarity"] > 0.6]
    memory_defects = sorted(memory_defects, key=lambda x: x["similarity"], reverse=True)

    # 5️⃣ Learning
    pattern_engine.learn(analysis.get("action", "general"), len(defects))
    history = pattern_engine.get_history(analysis.get("action", "general"))

    # 6️⃣ Merge defects (remove duplicates)
    def is_duplicate(d1, d2):
        return d1["description"].lower() == d2["description"].lower()

    all_defects = defects.copy()
    for d in memory_defects:
        if not any(is_duplicate(d, ex) for ex in all_defects):
            all_defects.append(d)

    # 7️⃣ Risk
    complexity = min(len(story.split()) / 20, 5)
    risk = risk_engine.calculate_risk(
        all_defects,
        analysis.get("action", "unknown"),
        history,
        complexity
    )

    # 8️⃣ Generate Tests
    tests = generate_tests(story, all_defects)

    # 9️⃣ Summary
    summary_text = generate_summary(story, risk)

    return {
        "analysis": analysis,
        "defects": all_defects,
        "risk": risk,

        "learning": {
            "past_defects_used": len(memory_defects),
            "history_count": history,
            "message": "System reused past defects and improved prediction"
        },

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
            "high_risk_modules": [analysis.get("action", "")]
            if risk["risk"] == "HIGH" else []
        },

        "ai_summary": summary_text,

        "summary": {
            "total_defects": len(all_defects),
            "high_severity": [
                d for d in all_defects
                if d.get("severity", "low") in ["high", "critical"]
            ]
        },

        "tests": tests
    }


# ✅ Execute Tests
@router.post("/execute-tests")
def execute_tests(data: dict):

    test_cases = data.get("tests", [])

    if not test_cases:
        return {"error": "No test cases provided"}

    results = run_test_cases(test_cases)

    return {"results": results}


# 🚀 NEW: Run directly from JIRA
@router.post("/run-from-jira")
def run_from_jira(data: dict):

    issue_key = data.get("issue_key")

    if not issue_key:
        return {"error": "issue_key required"}

    # 1️⃣ Fetch from JIRA
    story = get_jira_story(issue_key)

    # 2️⃣ Analyze
    analysis = analyze_story(story)

    # 3️⃣ Defects
    defects = generate_defects(story)

    # 4️⃣ Tests
    tests = generate_tests(story, defects)

    # 5️⃣ Execute
    results = run_test_cases(tests)

    return {
        "issue_key": issue_key,
        "story": story,
        "analysis": analysis,
        "defects": defects,
        "tests": tests,
        "results": results
    }