# def calculate_risk(defects):
    # count = len(defects)

    # if count >= 3:
    #     return "HIGH"
    # elif count == 2:
    #     return "MEDIUM"
    # else:
    #     return "LOW"

import json

class RiskEngine:
    def __init__(self, config_path = "memory/risk_config.json"):
        with open(config_path) as f:
            self.config = json.load(f)

    def calculate_risk(self, defects, module, history_count, complexity):
        severity_weights = self.config["severity_weights"]
        module_weights = self.config["module_weights"]
        thresholds = self.config["risk_thresholds"]

        score = 0
        reasons = []

        for defect in defects:
            severity = defect.get("severity", "low")
            weight = severity_weights.get(severity, 1)

            score += weight
            reasons.append(f"{severity} defect detected")

        # to find module criticality
        module_score = module_weights.get(module, 2)
        score += module_score

        if module_score >= 4:
            reasons.append("critical module involved")

        # historial defect trend
        score += history_count
        if history_count > 2:
            reasons.append("historical defects present")

        # adding story complexity
        score += complexity

        if complexity > 3:
            reasons.append("high story complexity")

        if score >= thresholds["high"]:
            risk = "HIGH"
        elif score >= thresholds["medium"]:
            risk = "MEDIUM"
        else:
            risk = "LOW"

        max_score = thresholds["high"]+5
        confidence = min(score/max_score, 1.0)

        return {
            "risk": risk,
            "score": score,
            "confidence": confidence,
            "reasons": reasons
        }