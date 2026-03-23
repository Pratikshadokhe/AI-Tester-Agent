import os
from dotenv import load_dotenv
from groq import Groq
import json
import re

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

def extract_json(text):
    matches = re.findall(r'\[.*?\]', text, re.DOTALL)

    all_defects = []

    for m in matches:
        try:
            data = json.loads(m)
            if isinstance(data, list):
                all_defects.extend(data)
        except:
            continue

    return all_defects

def generate_defects(story):
    
    prompt = f"""
    Analyze the user story and list possible software defects.

    User Story: 
    {story}

    Return ONLY JSON array like this:
    
    [
        {{
        "description": "defect description",
        "severity": "low | medium | high | critical"
        }}
    ]
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    result = response.choices[0].message.content.strip()
    print("Raw defect_generator output: ", result)

    # if result.startswith("```"):
    #     result = result.replace("```json", "").replace("```", "").strip()

    # try:
    #     return json.loads(result)
    # except json.JSONDecodeError:
    #     return []

    defects = extract_json(result)

    if not defects:
        print("⚠️ No defects extracted, using fallback")
        defects = [
            {"description": "Unexpected system failure", "severity": "medium"},
            {"description": "Invalid input handling issue", "severity": "low"}
        ]

    return defects