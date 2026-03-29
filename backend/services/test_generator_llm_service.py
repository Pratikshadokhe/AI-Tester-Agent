# from openai import OpenAI
import os
import json
from groq import Groq
import re
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

# Correct client
client = Groq(api_key=api_key)

def extract_json(text):
    match = re.search(r'\[\s*{.*?}\s*\]', text, re.DOTALL)    
    if match:
        return match.group(0)
    return "[]"

def generate_tests(summary, description, defects):
    prompt = f"""
    You are a QA engineer.

    Convert the following Jira issue into structered test cases.

    Summary:
    {summary}

    Description:
    {description}

    Defects:
    {defects}

    Generate test cases in STRICT JSON format:

    [
    {{
        "title": "Test case title",
        "category": "ui | validation | integration | functional",
        "steps": ["step1", "step2"],
        "expected": "expected result",
        "severity": "low | medium | high"
    }}
    ]

    Rules:
    - Include positive, negative, and edge cases
    - Assign category based on functionality (UI, validation, API, etc.)
    - Assign priority based on risk/impact
    - Keep steps clear and simple
    - Do NOT return anything except JSON
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    output = response.choices[0].message.content

    try:
        clean_json = extract_json(output)
        test_cases = json.loads(clean_json)
        
        for tc in test_cases:
            if not tc.get("category"):
                desc = (tc.get("title", "") + tc.get("expected", "")).lower()

                if "ui" in desc or "button" in desc:
                    tc["category"] = "ui"
                elif "invalid" in desc or "validation" in desc:
                    tc["category"] = "validation"
                elif "api" in desc or "backend" in desc:
                    tc["category"] = "integration"
                else:
                    tc["category"] = "functional"

        tc["category"] = tc["category"].lower()

        return test_cases
    except:
        print("test_generator_llm Error: ", output)
        return []
   
