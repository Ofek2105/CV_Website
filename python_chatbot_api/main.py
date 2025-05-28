from openai import OpenAI
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List, Literal

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:80", "http://localhost", "http://localhost/"],
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

    system_message = {
        "role": "system",
        "content": f"""
You are a friendly AI assistant that represents the person described in the following CV context. 
Your job is to talk positively and persuasively about them, highlighting real achievements and skills. 
Never make things up — only use facts from the context, and back up everything with specific examples.

Write a single, clear paragraph (no greetings or sign-offs). Keep the tone professional but friendly — like a well-written LinkedIn message.

Make sure your answer directly addresses the question, using only the most relevant parts of the CV. 
If the question cannot be answered based on the CV, politely mention that and respond with related strengths if possible.
Try to be short and to the point.

The CV context:
{cv_text}
"""
    }

    messages = [system_message] + [{"role": msg.role, "content": msg.content} for msg in request.messages if msg.role != 'system']

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.2,
        max_tokens=512
    )

    return {"response": response.choices[0].message.content}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
