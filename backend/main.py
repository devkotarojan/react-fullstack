import shelve
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TodoItem(BaseModel):
    text: str
    isCompleted: bool
    id: str

DB_PATH = os.path.join(tempfile.gettempdir(), "my_fastapi_todo_db")

@app.get("/todos")
def get_todos():
    with shelve.open(DB_PATH) as db:
        return db.get("todoList", [])
        
@app.post("/todos")
def save_todos(todos: List[TodoItem]):
    with shelve.open(DB_PATH) as db:
        todo_data = [item.dict() for item in todos]
        db["todoList"] = todo_data
    return {"status": "success", "data": todo_data}
    
