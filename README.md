# 🧬 PulseCRM: AI-Driven Life Sciences Interaction Manager

An intelligent, full-stack CRM application designed to eliminate manual data entry for pharmaceutical and medical device field representatives. PulseCRM uses a state-driven AI agent to process natural language inputs, instantly extracting structured compliance data and seamlessly persisting it to a relational database.

---

## 🚀 System Architecture & Tech Stack

This project is built with a modern, decoupled Full-Stack architecture, separating the client-side presentation layer from the AI orchestration and data persistence backend.

### **Frontend (Client Layer)**
* **Framework:** React.js (Vite)
* **Styling:** Custom CSS with CSS Modules
* **Key Features:** Real-time chat interface, asynchronous API polling, and dynamic form state hydration.

### **Backend (API & AI Layer)**
* **Framework:** FastAPI (Python)
* **AI Orchestration:** LangGraph & LangChain 
* **LLM:** Groq (`llama-3.3-70b-versatile`) for ultra-low latency inference
* **Key Features:** RESTful endpoints, CORS middleware routing, and state-machine-based tool execution.

### **Database (Persistence Layer)**
* **DBMS:** SQLite (Local Development)
* **ORM:** SQLAlchemy
* **Validation:** Pydantic V2
* **Data Models:** Relational mapping between Healthcare Professionals (`HCP`) and `Interactions`.

---

## ✨ Core Features

* **🗣️ Natural Language Processing:** Users can type or dictate raw interaction summaries (e.g., *"Met with Dr. Smith, discussed OncoBoost Phase 3 trials, sentiment was very positive. Need to send a follow-up PDF."*).
* **🧠 State-Driven AI Extraction:** The LangGraph agent evaluates the input, triggers internal Python tools, and extracts strictly typed JSON data (Interaction Type, Sentiment, Topics, Follow-up Actions).
* **⚡ Instant UI Hydration:** The React frontend asynchronously receives the extracted JSON and instantly auto-fills the CRM UI without requiring a page reload.
* **🛡️ Compliant Data Persistence:** Data is validated through Pydantic schemas before being securely committed to the SQL database via SQLAlchemy.

---

## 🛠️ Local Installation & Setup

To run this application locally, you will need two terminal windows—one for the backend server and one for the frontend client.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/pulse-crm-ai.git](https://github.com/your-username/pulse-crm-ai.git)
cd pulse-crm-ai