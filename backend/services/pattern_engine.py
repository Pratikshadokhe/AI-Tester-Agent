from collections import defaultdict
import math

class PatternEngine:
    def __init__(self):
        # This creates dictionary
        self.module_history = defaultdict(int)

    # When new defect comes history dict increases
    def learn(self, module, count=1):
        # too many defects becomes too noisy
        self.module_history[module] += math.log(1 + count)
    
    def get_history(self, module):
        return self.module_history.get(module, 0)