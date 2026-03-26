def execute_tests(tests):
    results = []
    for t in tests:
        # pseudo-execution logic
        result = {
            "test_id": t.get("id"),
            "description": t.get("description"),
            "status": "PASS"  # or FAIL based on actual execution
        }
        results.append(result)
    return results