# text → embedding → stored in FAISS → similarity search

import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

class VectorMemory:
    model = SentenceTransformer("all-MiniLM-L6-v2")
    def __init__(self):
        dimension = self.model.get_sentence_embedding_dimension()
        # self.index = faiss.IndexFlatL2(384)
        self.index = faiss.IndexFlatL2(dimension)
        self.memory = []

    def store(self, defect):
        text = defect["description"]
        embedding = self.model.encode([text])
        embedding = np.array(embedding).astype("float32")

        self.index.add(embedding)

        self.memory.append(defect)
    

    def search(self, query, top_k = 5):
        if len(self.memory) == 0:
            return []
        
        q = self.model.encode([query])
        q = np.array(q).astype("float32")

        distances, indexes = self.index.search(q, top_k)

        results = []

        for i, dist in zip(indexes[0], distances[0]):
            if i < len(self.memory):
                defect = self.memory[i].copy()

                # convert distance to similarity
                similarity = 1 / (1+float(dist))
                defect["similarity"] = float(similarity)
                results.append(defect)

        return results