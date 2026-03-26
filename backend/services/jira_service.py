# import requests
# import os
# from dotenv import load_dotenv

# load_dotenv()

# JIRA_URL = os.getenv("https://dokhepratiksha02.atlassian.net")
# JIRA_EMAIL = os.getenv("dokhepratiksha02@gmail.com")
# JIRA_API_TOKEN = os.getenv("ATATT3xFfGF0YhGdDp_wV95bVUvk_bwGh8miMogoqECd1UHTkgmudahz_vCHmCTIFMWhw8WRepfwJiJro9e7n01By2UG0D-ImbDOdH8WtrpSVy4-SP-eok5VvxFQgt1mIVyrnbFKSaMZSYpdKyWMkwKGL7oqqjRtsRiSiamBMkuxjlUpSE65Qwk=F5B8DE81w")

# def fetch_story(issue_key):
#     url = f"{JIRA_URL}/rest/api/3/issue/{issue_key}"

#     response = requests.get(
#         url,
#         auth=(JIRA_EMAIL, JIRA_API_TOKEN),
#         headers={"Accept": "application/json"}
#     )

#     data = response.json()

#     summary = data["fields"]["summary"]
#     description = data["fields"]["description"]

#     return f"{summary} {description}"

import os
import requests
from dotenv import load_dotenv

load_dotenv()

JIRA_URL = os.getenv("JIRA_URL")
JIRA_EMAIL = os.getenv("JIRA_EMAIL")
JIRA_API_TOKEN = os.getenv("JIRA_API_TOKEN")


def get_jira_story(issue_key: str):
    url = f"{JIRA_URL}/rest/api/3/issue/{issue_key}"

    auth = (JIRA_EMAIL, JIRA_API_TOKEN)

    headers = {
        "Accept": "application/json"
    }

    response = requests.get(url, headers=headers, auth=auth)

    if response.status_code != 200:
        raise Exception(f"JIRA fetch failed: {response.text}")

    data = response.json()

    summary = data["fields"]["summary"]
    description = data["fields"]["description"]

    # description parsing (simple fallback)
    desc_text = ""

    if description and "content" in description:
        for block in description["content"]:
            if "content" in block:
                for item in block["content"]:
                    if "text" in item:
                        desc_text += item["text"] + " "

    full_story = f"{summary}. {desc_text}"

    return full_story.strip()