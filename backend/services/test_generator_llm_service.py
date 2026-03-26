# # from openai import OpenAI
# import os
# from groq import Groq

# from dotenv import load_dotenv

# load_dotenv()

# # client = OpenAI()
# api_key =os.getenv("GROQ_API_KEY")

# client = Groq(api_key=api_key)

# def generate_tests(story, defects):
#     prompt = f"""
#     Generate test cases.PermissionError

#     Story:
#     {story}

#     Known defects:
#     {defects}

#     Include:
#     - positive tests
#     - negative tests
#     - edge cases

#     Return JSON list with severity
#     """

#     response = client.chat.completions.create(
#         model="llama-3.1-8b-instant",
#         messages=[{"role": "user", "content": prompt}]
#     )

#     return response.choices[0].message.content
# import os
# import json
# from groq import Groq
# from dotenv import load_dotenv

# load_dotenv()

# api_key = os.getenv("GROQ_API_KEY")

# # ✅ Correct client
# client = Groq(api_key=api_key)


# def generate_tests(story, defects):

#     prompt = f"""
#     Convert the given user story into executable UI automation test cases.

#     STRICT RULES:
#     - Output ONLY JSON (no explanation, no markdown)
#     - Format must be:

#     [
#       {{
#         "test_name": "Open website",
#         "steps": [
#           {{"action": "goto", "locator": "https://example.com"}},
#           {{"action": "wait"}}
#         ]
#       }}
#     ]

#     Only use these actions:
#     - goto
#     - fill
#     - click
#     - wait

#     Story:
#     {story}

#     Defects:
#     {defects}
#     """

#     try:
#         response = client.chat.completions.create(
#             model="llama-3.1-8b-instant",
#             messages=[{"role": "user", "content": prompt}]
#         )

#         result = response.choices[0].message.content.strip()

#         # remove markdown if present
#         if "```" in result:
#             result = result.replace("```json", "").replace("```", "").strip()

#         return json.loads(result)

#     except Exception as e:
#         print("❌ ERROR in test generation:", e)
#         print("RAW OUTPUT:", result if 'result' in locals() else "No result")

#         # ✅ fallback (VERY IMPORTANT)
#         return [
#             {
#                 "test_name": "Fallback Test",
#                 "steps": [
#                     {"action": "goto", "locator": "https://example.com"},
#                     {"action": "wait"}
#                 ]
#             }
#         ]
# import os
# import json
# import re
# from groq import Groq
# from dotenv import load_dotenv

# load_dotenv()
# api_key = os.getenv("GROQ_API_KEY")

# client = Groq(api_key=api_key)

# def extract_json(text):
#     matches = re.findall(r'\[.*\]', text, re.DOTALL)
#     for m in matches:
#         try:
#             return json.loads(m)
#         except:
#             continue
#     return []

# def fallback_tests():
#     return [
#         {
#             "test_name": "Fallback Test",
#             "steps": [
#                 {"action": "goto", "locator": "https://example.com"},
#                 {"action": "wait"}
#             ]
#         }
#     ]

# def generate_tests(story, defects):

#     prompt = f"""
#     Convert the given user story into executable UI automation test cases.

#     STRICT RULES:
#     - Respond ONLY with valid JSON array
#     - No explanation
#     - No markdown
#     - No text outside JSON

#     Format:
#     [
#       {{
#         "test_name": "Open website",
#         "steps": [
#           {{"action": "goto", "locator": "https://example.com"}},
#           {{"action": "wait"}}
#         ]
#       }}
#     ]

#     Only use:
#     - goto
#     - fill
#     - click
#     - wait

#     Story:
#     {story}

#     Defects:
#     {defects}
#     """

#     try:
#         response = client.chat.completions.create(
#             model="llama-3.1-8b-instant",
#             messages=[{"role": "user", "content": prompt}]
#         )

#         result = response.choices[0].message.content.strip()

#         print("LLM RAW OUTPUT:", result)

#         if "```" in result:
#             result = result.replace("```json", "").replace("```", "").strip()

#         parsed = extract_json(result)

#         if not parsed:
#             return fallback_tests()

#         return parsed

#     except Exception as e:
#         print("ERROR:", e)
#         return fallback_tests()

import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

# Correct client
client = Groq(api_key=api_key)


# Robust JSON extractor (BEST VERSION)
def extract_json(text):
    try:
        start = text.find("[")
        end = text.rfind("]") + 1

        if start != -1 and end != -1:
            return json.loads(text[start:end])

    except Exception as e:
        print("⚠️ JSON extraction error:", e)

    return []


# Strong fallback (better than before)
def fallback_tests():
    return [
        {
            "test_name": "Login Basic Test",
            "steps": [
                {"action": "goto", "locator": "https://example.com"},
                {"action": "fill", "locator": "input[type=email]", "value": "test@email.com"},
                {"action": "fill", "locator": "input[type=password]", "value": "password123"},
                {"action": "click", "locator": "button[type=submit]"},
                {"action": "wait"}
            ]
        }
    ]


def generate_tests(story, defects):

    prompt = f"""
    Convert the given user story into executable UI automation test cases.

    STRICT RULES:
    - Output MUST be valid JSON array
    - Do NOT include explanation
    - Do NOT include markdown
    - Do NOT include text before or after JSON
    - Always return JSON even if unsure

    FORMAT:
    [
      {{
        "test_name": "Login success",
        "steps": [
          {{"action": "goto", "locator": "https://example.com"}},
          {{"action": "fill", "locator": "input[type=email]", "value": "test@email.com"}},
          {{"action": "fill", "locator": "input[type=password]", "value": "password123"}},
          {{"action": "click", "locator": "button[type=submit]"}},
          {{"action": "wait"}}
        ]
      }}
    ]

    Allowed actions ONLY:
    - goto
    - fill
    - click
    - wait

    Story:
    {story}

    Defects:
    {defects}
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}]
        )

        result = response.choices[0].message.content.strip()

        # Debug log (important)
        print(" LLM RAW OUTPUT:", result)

        # Clean markdown if present
        if "```" in result:
            result = result.replace("```json", "").replace("```", "").strip()

        #  Extract JSON safely
        parsed = extract_json(result)

        if not parsed:
            print("⚠️ No valid JSON found, using fallback")
            return fallback_tests()

        return parsed
    

    except Exception as e:
        print("ERROR in test generation:", e)
        return fallback_tests()