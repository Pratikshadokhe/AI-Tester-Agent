# AI Tester Agent
backend
│
├── api
│   └── routes.py
│
├── services
│   ├── story_analyzer.py
│   ├── llm_service.py
│   ├── rag_service.py
│   ├── risk_engine.py
│   └── memory_engine.py
│
├── vector_store
│   └── faiss_index
│
└── main.py

# Pipeline
User Story
   ↓
LLM Story Analyzer
   ↓
Generate Defects
   ↓
Store in Vector Memory
   ↓
Retrieve Similar Defects
   ↓
Risk Engine
   ↓
Risk Report

# Embeddings → convert text to vectors

# FAISS → fast similarity search
