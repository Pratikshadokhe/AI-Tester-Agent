import os
from dotenv import load_dotenv
from groq import Groq
import json

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=api_key)

def analyze_story(story_text):
    
    prompt = f"""
    You are an API that  extracts structured data.

    Analyze the following user story and return ONLY valid JSON.
    Do not include explanations, markdown, or multiple examples.

    User Story: {story_text}

    Return JSON with:
    actor
    action
    inputs
    expected
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You extract structured data from user stories."},
            {"role": "user", "content": prompt}]
    )

    result = response.choices[0].message.content.strip()
    print("Raw llm output: ", result)

    if result.startswith("```"):
        result = result.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {
            "actor": "",
            "action": "",
            "inputs": [],
            "expected": ""
        }