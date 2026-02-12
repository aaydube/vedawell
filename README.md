# Vedawell

## Project Overview

Vedawell is a modern web application designed to bridge the gap between traditional Ayurvedic wisdom and modern artificial intelligence. It serves as an intelligent health companion, using Retrieval-Augmented Generation (RAG) to provide context-aware, personalized wellness advice grounded in authentic Ayurvedic texts.

**Key Features:**
- Context-Aware Conversations: powered by LLaMA 3, enabling natural and nuanced dialogue.
- Grounded Accuracy: Uses RAG to cite or reference specific Ayurvedic concepts rather than generating generic advice.
- Modern UI: A clean, responsive chat interface built with React and TypeScript for a seamless user experience.


## Tech Stack

### Backend
- **Framework:** FastAPI (Python)
- **LLM & RAG:** LangChain, LangChain-Community
- **Language Model:** Groq (LLama 3.3 70B)
- **Embeddings:** Cohere Embeddings (embed-v4.0)
- **Vector Database:** FAISS (Facebook AI Similarity Search)
- **Document Loading:** PyPDFLoader
- **Server:** Uvicorn
- **Environment Management:** python-dotenv

### Frontend
- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Markdown Rendering:** react-markdown
- **Linting:** ESLint

### Deployment
- **Platform:** Render.com
- **Runtime:** Python (Backend), Node.js (Frontend)

## Steps to Run the Project Locally

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- API Keys:
  - **Cohere API Key** (for embeddings)
  - **Groq API Key** (for LLM)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create a `.env` file in the backend directory with your API keys:**
   ```
   COHERE_API_KEY=your_cohere_api_key_here
   GROQ_API_KEY=your_groq_api_key_here
   ```

6. **Add PDF documents:**
   - Place your PDF files in the `backend/pdfs/` directory

7. **Start the backend server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The backend will be running at `http://localhost:8000`

### Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in the terminal)

### Verify Setup

- Backend API docs: `http://localhost:8000/docs`
- Frontend application: `http://localhost:5173`
- Test the `/ask` endpoint with a POST request to verify the backend is working

