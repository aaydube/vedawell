from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from vedawell import load_vector_store
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from vedawell import create_vector_store_from_pdfs
import os

load_dotenv()
# Ensure vector store is created first (this should only be run once)
if not os.path.exists("faiss_index"):
    create_vector_store_from_pdfs("pdfs")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# STEP 1: Load the saved vector store
db = load_vector_store()

# STEP 2: Setup LLM with the correct parameters
llm = ChatGroq(model="llama-3.3-70b-versatile")

# STEP 3: Create Retrieval QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm, 
    chain_type="stuff", 
    retriever=db.as_retriever()
)

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
def ask_question(request: QueryRequest):
    answer = qa_chain.invoke({"query": request.query})
    return {"answer": answer['result']}