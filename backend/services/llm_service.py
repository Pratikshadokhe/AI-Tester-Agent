# from openai import OpenAI
import os
from groq import Groq

from dotenv import load_dotenv

load_dotenv()

# client = OpenAI()
api_key =os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key)

def generate_tests(story, defects):
    prompt = f"""
    Generate test cases.PermissionError

    Story:
    {story}

    Known defects:
    {defects}

    Include:
    - positive tests
    - negative tests
    - edge cases
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content