def execute_steps(page, steps):

    for step in steps:

        if step["action"] == "goto":
            page.goto(step["locator"])

        elif step["action"] == "click":
            page.click(step["locator"])

        elif step["action"] == "fill":
            page.fill(step["locator"], step["value"])