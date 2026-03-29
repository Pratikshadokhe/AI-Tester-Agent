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
import time

def run_test_cases(test_cases, take_screenshot=False):
    results = []

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    screenshot_dir = os.path.join(BASE_DIR, "screenshots")
    os.makedirs(screenshot_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()

        for i, test in enumerate(test_cases):
            page = context.new_page()
            test_name = test.get("test_name", f"test_{i}")
            start_time = time.time()

            try:
                
                executed_steps = []
                for step in test["steps"]:
                    if(isinstance(step, str)):
                        print("Skipping non-dict step: ", step)
                        continue
                    
                    action = step.get("action")
                    locator = step.get("locator") or step.get("selector")

                    
                    if action in ["click", "fill", "assert_visible", "assert_text"] and not locator:
                        raise Exception(f"Missing locator for action: {action}")
                    
                    executed_steps.append({
                            "action": action,
                            "locator": locator
                        })
                    
                    url = step.get("url")

                    print("➡️ Running step:", action, locator)

                    if action == "goto":
                        url = step.get("url") or step.get("locator")
                        if not url:
                            raise Exception("Missing URL in goto step")
                        page.goto(url)
                        # page.wait_for_load_state("networkidle")
                        # page.wait_for_selector("body")
                        page.wait_for_load_state("domcontentloaded")
                        page.wait_for_timeout(2000)

                    elif action == "fill":
                        page.wait_for_selector(locator)
                        page.fill(locator, step.get("value", ""))

                    elif action == "click":
                        page.wait_for_selector(locator)
                        page.click(locator)
                        page.wait_for_timeout(1000)

                    elif action == "assert_visible":
                        page.wait_for_selector(locator, timeout=5000)
                        if not page.is_visible(locator):
                            raise Exception(f"Element not visible: {locator}")

                    elif action == "assert_text":
                        page.wait_for_selector(locator)
                        actual = page.locator(locator).inner_text()
                        expected = step.get("text", "")
                        if expected not in actual:
                            raise Exception(f"Text mismatch: {actual}")

                    elif action == "assert_url":
                        expected = step.get("url")
                        if not expected:
                            raise Exception("Missing expected URL in assert_url")
                        if expected not in page.url:
                            raise Exception(f"URL mismatch: {page.url}")
                    elif action == "wait":
                        page.wait_for_timeout(2000)

                # ✅ PASS screenshot
                filename = f"{test_name}_{int(time.time())}_pass.png"
                path = os.path.join(screenshot_dir, filename)

                page.wait_for_load_state("domcontentloaded")
                page.wait_for_timeout(2000)
                screenshot_url = None

                if take_screenshot:
                    page.screenshot(path=path, full_page=True)
                    screenshot_url = f"/screenshots/{filename}"
                
                duration = max(1, int((time.time() - start_time) * 1000))

                results.append({
                    "test_name": test_name,
                    "status": "passed",
                    "steps": executed_steps,
                    "screenshot": screenshot_url,
                    "duration_ms": duration
                })

            except Exception as e:
                print("❌ ERROR in test:", test_name)
                print("👉 Error:", str(e))
                print("👉 Failed step:", step)

                screenshot_dir = os.path.join(BASE_DIR, "screenshots")
                os.makedirs(screenshot_dir, exist_ok=True)

                filename = f"{test_name}_{int(time.time())}_fail.png"
                path = os.path.join(screenshot_dir, filename)

                try:
                    page.wait_for_timeout(1000)
                    page.screenshot(path=path, full_page=True)
                    print("📸 Fail screenshot saved:", path)
                except:
                    print("⚠️ Screenshot failed")

                duration = int((time.time() - start_time) * 1000)

                results.append({
                    "test_name": test_name,
                    "status": "failed",
                    "error": str(e),
                    "steps": executed_steps,
                    "screenshot": f"/screenshots/{filename}",
                    "duration_ms": duration
                })

            page.close()

        browser.close()

    return results