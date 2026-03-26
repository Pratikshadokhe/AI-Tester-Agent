# from openai import OpenAI
import os
import json
from groq import Groq
import re

from dotenv import load_dotenv

load_dotenv()

# client = OpenAI()
api_key =os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key)

def extract_json(text):
    match = re.search(r'\[.*\]', text, re.DOTALL)
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

    Known defects:
    {defects}

    Generate test cases in STRICT JSON format:

    [
    {{
        "title": "Test case title",
        "steps": ["step1", "step2"],
        "expected": "expected result",
        "severity": "low/medium/high"
    }}
    ]

    Rules:
    - Include positive, negative, and edge cases
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
        return json.loads(clean_json)
    except:
        print("test_generator_llm Error: ", output)
        return []
   