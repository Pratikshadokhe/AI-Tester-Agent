import json

def retrieve_defects(module):
    with open("memory/seed_defects.json") as f:
        defects = json.load(f)

    results = []

    for d in defects:
        if module in d["module"]:
            results.append(d["defect"])

    return results