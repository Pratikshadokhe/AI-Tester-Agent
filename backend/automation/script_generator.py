# def execute_steps(page, steps):

#     for step in steps:

#         if step["action"] == "goto":
#             page.goto(step["locator"])

#         elif step["action"] == "click":
#             page.click(step["locator"])

#         elif step["action"] == "fill":
#             page.fill(step["locator"], step["value"])
from datetime import datetime

def execute_steps(page, steps):

    results = []

    for step in steps:

        try:
            action = step.get("action")
            locator = step.get("locator")
            value = step.get("value", "")

            if action == "goto":
                page.goto(locator)

            elif action == "click":
                page.click(locator)

            elif action == "fill":
                page.fill(locator, value)

            elif action == "wait":
                page.wait_for_timeout(2000)

            results.append({
                "step": step,
                "status": "PASS"
            })

        except Exception as e:

            path = f"automation/screenshots/failure_{datetime.now().timestamp()}.png"
            page.screenshot(path=path)

            results.append({
                "step": step,
                "status": "FAIL",
                "error": str(e),
                "screenshot": path
            })

    return results