from openai import OpenAI
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List, Literal
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

embedding_model = OpenAIEmbeddings()
vector_db = FAISS.load_local("my_faiss_index", embedding_model, allow_dangerous_deserialization=True)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:80", "http://localhost", "http://localhost/"],  # ["http://localhost:80", "http://localhost", "http://localhost/"]
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


@app.post("/chat")
def chat(request: ChatRequest):
    user_query = ""
    for msg in reversed(request.messages):
        if msg.role == "user":
            user_query = msg.content
            break

    # Perform similarity search on the query
    results = vector_db.similarity_search(user_query, k=10)
    retrieved_context = "\n\n".join([doc.page_content for doc in results])

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

    messages = [system_message] + [{"role": msg.role, "content": msg.content} for msg in request.messages if msg.role != 'system']


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.8,
        max_tokens=512
    )

    return {"response": response.choices[0].message.content}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
