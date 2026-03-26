# # # from playwright.sync_api import sync_playwright

# # # def run_sample():
# # #     with sync_playwright() as p:
# # #         browser = p.chromium.launch(headless=False)
# # #         page = browser.new_page()

# # #         page.goto("https://example.com")

# # #         print("Page title:", page.title())

# # #         browser.close()

# # # run_sample()
# # from playwright.sync_api import sync_playwright
# # from automation.script_generator import execute_steps

# # def run_test_cases(test_cases):

# #     all_results = []

# #     with sync_playwright() as p:
# #         browser = p.chromium.launch(headless=False)
# #         page = browser.new_page()

# #         for test in test_cases:

# #             steps = test.get("steps", [])

# #             result = execute_steps(page, steps)

# #             all_results.append({
# #                 "test": test,
# #                 "result": result
# #             })

# #         browser.close()

# #     return all_results

# # browser = p.chromium.launch(headless=False)
# # import time
# # from playwright.sync_api import sync_playwright
# # from automation.script_generator import execute_steps

# # def run_test_cases(test_cases):

# #     all_results = []

# #     # ✅ Playwright context (yaha p define hota hai)
# #     with sync_playwright() as p:

# #         browser = p.chromium.launch(headless=False)
# #         page = browser.new_page()

# #         for test in test_cases:

# #             steps = test.get("steps", [])

# #             result = execute_steps(page, steps)

# #             all_results.append({
# #                 "test": test,
# #                 "result": result
# #             })
        
# #         time.sleep(5)
# #         browser.close()

# #     return all_results

# # from playwright.sync_api import sync_playwright


# # def run_test_cases(test_cases):
# #     results = []

# #     with sync_playwright() as p:
# #         browser = p.chromium.launch(headless=False)
# #         page = browser.new_page()

# #         for test in test_cases:
# #             try:
# #                 for step in test.get("steps", []):

# #                     action = step.get("action")

# #                     if action == "goto":
# #                         page.goto(step.get("locator"))

# #                     elif action == "fill":
# #                         page.fill(step.get("locator"), step.get("value", ""))

# #                     elif action == "click":
# #                         page.click(step.get("locator"))

# #                     elif action == "wait":
# #                         page.wait_for_timeout(2000)

# #                 results.append({
# #                     "test_name": test.get("test_name"),
# #                     "status": "passed"
# #                 })

# #             except Exception as e:
# #                 results.append({
# #                     "test_name": test.get("test_name"),
# #                     "status": "failed",
# #                     "error": str(e)
# #                 })

# #         browser.close()

# #     return results

# # from playwright.sync_api import sync_playwright


# # def run_test_cases(test_cases):
# #     results = []

# #     with sync_playwright() as p:
# #         browser = p.chromium.launch(headless=False)

# #         for test in test_cases:
# #             page = browser.new_page()   # ✅ NEW PAGE per test

# #             try:
# #                 for step in test.get("steps", []):

# #                     action = step.get("action")

# #                     if action == "goto":
# #                         page.goto(step.get("locator"))

# #                     elif action == "fill":
# #                         page.fill(step.get("locator"), step.get("value", ""))

# #                     elif action == "click":
# #                         page.click(step.get("locator"))

# #                     elif action == "wait":
# #                         page.wait_for_timeout(2000)

# #                 results.append({
# #                     "test_name": test.get("test_name"),
# #                     "status": "passed"
# #                 })

# #             except Exception as e:
# #                 results.append({
# #                     "test_name": test.get("test_name"),
# #                     "status": "failed",
# #                     "error": str(e)
# #                 })

# #             finally:
# #                 page.close()   # ✅ close page AFTER each test

# #         browser.close()

# #     return results

# from playwright.sync_api import sync_playwright
# import os

# def run_test_cases(test_cases):
#     results = []

#     os.makedirs("screenshots", exist_ok=True)

#     with sync_playwright() as p:
#         browser = p.chromium.launch(headless=False)

#         for test in test_cases:
#             page = browser.new_page()
#             test_result = {
#                 "test_name": test["test_name"],
#                 "status": "passed",
#                 "screenshots": []
#             }

#             try:
#                 step_no = 1

#                 for step in test["steps"]:
#                     action = step["action"]

#                     if action == "goto":
#                         page.goto(step["locator"])

#                     elif action == "fill":
#                         page.fill(step["locator"], step["value"])

#                     elif action == "click":
#                         page.click(step["locator"])

#                     elif action == "wait":
#                         page.wait_for_timeout(2000)

#                     # 📸 Screenshot after each step
#                     screenshot_path = f"screenshots/{test['test_name']}_{step_no}.png"
#                     page.screenshot(path=screenshot_path)
#                     test_result["screenshots"].append(screenshot_path)

#                     step_no += 1

#             except Exception as e:
#                 test_result["status"] = "failed"
#                 test_result["error"] = str(e)

#             page.close()
#             results.append(test_result)

#         browser.close()

#     return results

# from playwright.sync_api import sync_playwright
# import os
# import time

# def run_test_cases(test_cases):

#     results = []

#     BASE_DIR = os.path.dirname(os.path.abspath(__file__))
#     screenshot_dir = os.path.join(BASE_DIR, "screenshots")
#     os.makedirs(screenshot_dir, exist_ok=True)
#     print("Saving screenshot to:", screenshot_path)
#     with sync_playwright() as p:
#         browser = p.chromium.launch(headless=False)
#         context = browser.new_context()

#         for idx, test in enumerate(test_cases):

#             page = context.new_page()
#             start = time.time()

#             test_result = {
#                 "test_name": test.get("test_name", f"Test {idx+1}"),
#                 "status": "pass",
#                 "steps": test.get("steps", []),
#                 "error": None,
#                 "screenshot": None
#             }

#             try:
#                 for step in test.get("steps", []):

#                     action = step.get("action")

#                     if action == "goto":
#                         page.goto(step["locator"])

#                     elif action == "fill":
#                         page.fill(step["locator"], step.get("value", ""))

#                     elif action == "click":
#                         page.click(step["locator"])

#                     elif action == "wait":
#                         page.wait_for_timeout(2000)

#                 # ✅ PASS screenshot
#                 screenshot_name = f"test_{idx+1}_pass.png"
#                 screenshot_path = os.path.join(screenshot_dir, screenshot_name)

#                 page.screenshot(path=screenshot_path)

#                 test_result["screenshot"] = f"/screenshots/{screenshot_name}"

#             except Exception as e:
#                 test_result["status"] = "fail"
#                 test_result["error"] = str(e)

#                 # ❌ FAIL screenshot
#                 screenshot_name = f"test_{idx+1}_fail.png"
#                 screenshot_path = os.path.join(screenshot_dir, screenshot_name)

#                 page.screenshot(path=screenshot_path)

#                 test_result["screenshot"] = f"/screenshots/{screenshot_name}"

#             finally:
#                 duration = int((time.time() - start) * 1000)
#                 test_result["duration_ms"] = duration
#                 results.append(test_result)

#                 page.close()

#         browser.close()

#     return results

from playwright.sync_api import sync_playwright
import os

def run_test_cases(test_cases):
    results = []

    os.makedirs("automation/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)

        for i, test in enumerate(test_cases):
            page = browser.new_page()
            test_name = test.get("test_name", f"test_{i}")

            try:
                for step in test["steps"]:
                    action = step["action"]

                    if action == "goto":
                        page.goto(step["locator"])

                    elif action == "fill":
                        page.fill(step["locator"], step["value"])

                    elif action == "click":
                        page.click(step["locator"])

                    elif action == "wait":
                        page.wait_for_timeout(2000)

                # ✅ PASS screenshot
                filename = f"{test_name}_pass.png"
                path = f"automation/screenshots/{filename}"
                page.screenshot(path=path)

                results.append({
                    "test_name": test_name,
                    "status": "passed",
                    "screenshot": f"/screenshots/{filename}"
                })

            except Exception as e:
                # ❌ FAIL screenshot
                filename = f"{test_name}_fail.png"
                path = f"automation/screenshots/{filename}"
                page.screenshot(path=path)

                results.append({
                    "test_name": test_name,
                    "status": "failed",
                    "error": str(e),
                    "screenshot": f"/screenshots/{filename}"
                })

            page.close()

        browser.close()

    return results