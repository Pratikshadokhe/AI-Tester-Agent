from collections import defaultdict

class PatternEngine:
    def __init__(self):
        self.module_history = defaultdict(int)

    def learn(self, module):
        self.module_history[module] += 1
    
    def get_history(self, module):
        return self.module_history.get(module, 0)