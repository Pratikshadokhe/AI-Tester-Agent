import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key =os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key)

def generate_summary(story, risk):

    prompt = f"""
    Explain why this story is {risk['risk']} risk.

    Story: {story}
    Risk Details: {risk}

    Give short explanation.
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content