def calculate_risk(defects):
    count = len(defects)

    if count >= 3:
        return "HIGH"
    elif count == 2:
        return "MEDIUM"
    else:
        return "LOW"