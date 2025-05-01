from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEndpoint
from vedawell import create_vector_store_from_pdfs, load_vector_store
import os

# Ensure vector store is created first (this should only be run once)
if not os.path.exists("faiss_index"):
    create_vector_store_from_pdfs("pdfs")

app = FastAPI()

# STEP 1: Load the saved vector store
db = load_vector_store()

# STEP 2: Setup LLM with the correct parameters
llm = HuggingFaceEndpoint(
    endpoint_url="https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    huggingfacehub_api_token=os.environ.get("HUGGINGFACE_API_TOKEN"),  # Make sure to set this environment variable
    temperature=0.5,  # Direct parameter, not in model_kwargs
    max_new_tokens=512,  # Direct parameter, not in model_kwargs
    task="text-generation"  # Required parameter
)

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
    answer = qa_chain.run({"query": request.query})
    return {"answer": answer}