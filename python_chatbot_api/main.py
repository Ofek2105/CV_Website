from langchain_core import chat_history
from openai import OpenAI
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List, Literal
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from supabase import create_client, Client

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
SUPABASE_TABLE_NAME = os.getenv("SUPABASE_TABLE_NAME")

embedding_model = OpenAIEmbeddings()
vector_db = FAISS.load_local("my_faiss_index", embedding_model, allow_dangerous_deserialization=True)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:80", "http://localhost", "http://localhost/"],  # ["http://localhost:80", "http://localhost", "http://localhost/"]
    allow_origins=["*"],  # ["http://localhost:80", "http://localhost", "http://localhost/"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("cv2.txt", "r", encoding="utf-8") as f:
    cv_text = f.read()


class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


@app.get("/test_api_now")
def chat():
    return "tested successfully"


@app.post("/chat")
def chat(request: ChatRequest, request_http: Request):
    user_query = request.messages[-1].content if len(request.messages) > 0 else ""

    # Perform similarity search on the query
    if user_query != "":
        results = vector_db.similarity_search(user_query, k=10)
        retrieved_context = "\n\n".join([doc.page_content for doc in results])
    else:
        retrieved_context = "Nothing to retrieve"

    system_message = {
        "role": "system",
        "content": f"""
        You are a friendly AI assistant that represents the person described in the following CV and RAG context. 
        Your job is to talk positively and persuasively about them, highlighting real achievements and skills. 
        Never make things up — only use facts from the contexts, and back up everything with specific examples.
        
        Write a single, clear paragraph (no greetings or sign-offs). Keep the tone professional but friendly — like a well-written LinkedIn message.
        
        Make sure your answer directly addresses the question, using only the most relevant parts of the contexts. 
        If the question cannot be answered based on the contexts, politely mention that and respond with related strengths if possible.
        Try to be short and to the point.

        CV context:
        {cv_text}
        RAG context:
        {retrieved_context}
        """
    }

    if len(request.messages) > 1:
        chat_history_messages = request.messages[:-1].__str__()
    else:
        chat_history_messages = "None"

    messages = [system_message] + [{"role": msg.role, "content": msg.content} for msg in request.messages if
                                   msg.role != 'system']

    open_ai_http_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.8,
        max_tokens=512
    )
    open_ai_answer = open_ai_http_response.choices[0].message.content
    try:
        table_data = {
            'question': user_query,
            'chat_history': chat_history_messages,
            'response': open_ai_answer,
            'ip': getattr(request_http.client, "host", "None") if request_http.client else "None"
        }
        supabase_response = supabase.table(SUPABASE_TABLE_NAME).insert(table_data).execute()
    except:
        pass

    return {"response": open_ai_answer}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
