from openai import OpenAI
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

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

class ChatRequest(BaseModel):
    question: str

@app.post("/chat")
def chat(request: ChatRequest):
    prompt = f"""
You are a friendly AI assistant that represents the person described in the following CV context. 
Your job is to talk positively and persuasively about them, highlighting real achievements and skills. 
Never make things up — only use facts from the context, and back up everything with specific examples.

Write a single, clear paragraph (no greetings or sign-offs). Keep the tone professional but friendly — like a well-written LinkedIn message.

Make sure your answer directly addresses the question, using only the most relevant parts of the CV. 
If the question cannot be answered based on the CV, politely mention that and respond with related strengths if possible.

The CV context:
{cv_text}

Here is a question from someone interested in hiring the person described above:
{request.question}

Provide one persuasive answer aimed at increasing the chances of getting them hired.
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=512
    )

    return {"response": response.choices[0].message.content}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)