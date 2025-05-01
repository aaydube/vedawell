from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from pathlib import Path

DB_FAISS_PATH = "faiss_index"

def create_vector_store_from_pdfs(pdf_folder_path: str):
    # Load all PDFs from the folder
    pdf_files = list(Path(pdf_folder_path).glob("*.pdf"))
    if not pdf_files:
        raise ValueError("❌ No PDF files found in the given folder.")

    all_docs = []
    for pdf in pdf_files:
        loader = PyPDFLoader(str(pdf))
        documents = loader.load()
        all_docs.extend(documents)

    print(f"✅ Loaded {len(pdf_files)} PDFs with total {len(all_docs)} pages")

    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    docs = text_splitter.split_documents(all_docs)

    # Embed and create FAISS index
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    db = FAISS.from_documents(docs, embeddings)
    db.save_local(DB_FAISS_PATH)
    print(f"✅ Vector store saved to {DB_FAISS_PATH}")

def load_vector_store():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    if not os.path.exists(DB_FAISS_PATH):
        raise ValueError(f"❌ Vector store not found at {DB_FAISS_PATH}. Please run create_vector_store_from_pdfs().")
    return FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)
