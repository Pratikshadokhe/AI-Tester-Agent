import os
from dotenv import load_dotenv
from groq import Groq
import json

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

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

    if result.startswith("```"):
        result = result.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return []