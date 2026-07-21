import { useState } from 'react';
import './App.css'

//Initial Todos
const todoList = [{
  text: "make dinner and what happens when the thing overflows I have no idea that is why Im testing it",
  isCompleted: true,
  id: crypto.randomUUID()
},{
  text: "wash dishes",
  isCompleted: false,
  id: crypto.randomUUID()
}]

export default function App() {
  const [todos, setTodos] = useState(todoList);
  return (
    <>
      <ProgressBox todos={todos}/>
      <TodoInputBox todos={todos} setTodos={setTodos}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </>
  );
}

function ProgressBox({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.isCompleted).length;
  const progressPercent = (completedTodos / totalTodos) * 100;
  return (
    <div className="progress-box">
      <div className="todo-text">
        <h1>Todo App</h1>
        <p>Keep it up!</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%`}}></div>
        </div>
      </div>
      <div className="todo-circle">{completedTodos}/{totalTodos}</div>
    </div>
  );
}

function TodoInputBox({ todos, setTodos }) {
  const [inputText, setinputText] = useState('');
  
  return (
    <div className="input-set">
      <input 
        type="text" 
        placeholder='Write your task' className="input-box"
        value={inputText}
        onChange={event => {
          setinputText(event.target.value);
        }}
        onKeyDown={event => {
          if ((event.key === 'Enter') && (inputText != '')) {
            setTodos([
              ...todos,
              {
                text: inputText,
                isCompleted: false,
                id: crypto.randomUUID()
              }
            ])
            setinputText('');
          }
        }}>
      </input> 
      <p
        onClick={() => {
          if (inputText != '') {
            setTodos([
              ...todos,
              {
                text: inputText,
                isCompleted: false,
                id: crypto.randomUUID()
              }
            ])
            setinputText('');
        }
          }}>+</p>
        
    </div>
  )
}

function TodoList({ todos, setTodos }) {
  const handleCheckbox = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, isCompleted: !todo.isCompleted};
        }
        return todo;
      })
    );
  };
  
  const handleDelete = (id) => {
    setTodos(
      todos.filter((todo => todo.id != id))
    );
  };
  
  //To edit the text
  const  [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  const handleSaveEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? {...todo, text: editText} : todo
      })
    );
    setEditingId(null);
  };
  
  return (
    <div className="todo-list">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;
        return (
          <div className="single-todo" key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.isCompleted}
              onChange={() => {
                handleCheckbox(todo.id);
              }}>
            </input>
            {isEditing ? (
              <textarea
              type="text"   
              value={editText}
              className="edit-input-box"
              onChange={event => {
                setEditText(event.target.value);
              }}
              
              onKeyDown={event => {
                if ((event.key === 'Enter' && !event.shiftKey && editText != '')) {
                  handleSaveEdit(todo.id); 
              }}}/> ) : (
            <p>{todo.text}</p>
              )
            }
            {isEditing ? <p
              onClick={() => {
                handleSaveEdit(todo.id);
              }}>️💾</p> : 
              <p
              onClick={() => {
                handleStartEdit(todo);
              }}>✏️</p>
            }
            <p
              onClick={() => {
                handleDelete(todo.id);
              }}>❌</p>
          </div>
        );
      })}
    </div>
  );
}