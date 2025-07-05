from langchain_community.vectorstores import FAISS
from langchain_cohere import CohereEmbeddings
from langchain_community.document_loaders import PyPDFLoader
import os
from dotenv import load_dotenv
load_dotenv()

def create_vector_store_from_pdfs(folder_path):
    docs = []
    for file in os.listdir(folder_path):
        if file.endswith(".pdf"):
            loader = PyPDFLoader(os.path.join(folder_path, file))
            docs.extend(loader.load())

    texts = [doc.page_content for doc in docs]
    print(f"[INFO] Loaded {len(texts)} documents.")

    if not texts:
        raise ValueError("No valid content extracted from PDFs")

    embeddings = CohereEmbeddings(
    model="embed-v4.0",
    cohere_api_key=os.getenv("COHERE_API_KEY")
)

    db = FAISS.from_texts(texts, embeddings)
    db.save_local("faiss_index")
    print("[INFO] Vector store created and saved successfully.")


def load_vector_store():
    cohere_api_key = os.getenv("COHERE_API_KEY")
    if not cohere_api_key:
        raise ValueError("COHERE_API_KEY is not set in environment variables.")

    embeddings = CohereEmbeddings(
    model="embed-v4.0",
    cohere_api_key=cohere_api_key
)
    return FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)