from dotenv import load_dotenv
import os

import requests

load_dotenv()

class JiraService:
    def __init__(self):
        self.base_url = os.getenv("JIRA_DOMAIN")
        self.auth = (
            os.getenv("JIRA_EMAIL"),
            os.getenv("JIRA_API_TOKEN")
        )
        self.headers = {
            "Accept": "application/json"
        }

    def get_issue(self, issue_key):
        url = f"{self.base_url}/rest/api/3/search/jql?jql=key={issue_key}&fields=summary,description"

        # params = {
        #     "jql": f"key={issue_key}",
        #     "fields": "summary,description"
        # }

        response = requests.get(url, headers=self.headers, auth=self.auth)

        print("Final URL: ", response.url)
        print("Response:", response.text)

        if response.status_code != 200:
            print("Status: ", response.status_code)
            print("Response: ", response.text)

            return {
                "error": "Failed to fetch issue",
                "status": response.status_code,
                "details": response.text
            }
        
        data = response.json()

        print("Full Data: ", data)

        issues = data.get("issues", [])

        if not issues:
            return {"summary": "", "description": ""}

        # fields = data.get("fields", {})
        fields = issues[0].get("fields", {})
        
        summary = fields.get("summary", "")
        description = fields.get("description", "")

        if isinstance(description, dict):
            description = self.extract_text(description)

        if description is None:
            description = ""

        return {
            "summary": summary,
            "description": description
        }

    def extract_text(self, desc):
        text = ""
        
        if isinstance(desc, dict):
            if desc.get("type") == "text":
                text += desc.get("text", "") + " "

            for child in desc.get("content", []):
                text += self.extract_text(child)

        elif isinstance(desc, list):
            for item in desc:
                text += self.extract_text(item)

        return text