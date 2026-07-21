import { useState } from 'react';
import './App.css'

export default function App() {
  return (
    <>
      <ProgressBox />
      <TodoInputBox />
      <TodoList />
    </>
  );
}

function ProgressBox() {
  return (
    <div className="progress-box">
      <div className="todo-text">
        <h1>Todo App</h1>
        <p>Keep it up!</p>
        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
      </div>
      <div className="todo-circle">0/0</div>
    </div>
  );
}

function TodoInputBox() {
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
          if (event.key === 'Enter') {
            console.log(inputText);
            setinputText('');
          }
        }}>
      </input> 
      <p
        onClick={() => {
          console.log(inputText)
          setinputText('');
          }}>+</p>
        
    </div>
  )
}

function TodoList() {
  const todoList = [{
    text: "make dinner and what happens when the thing overflows I have no idea that is why Im testing it",
    isCompleted: true,
    id: crypto.randomUUID()
  },{
    text: "wash dishes",
    isCompleted: false,
    id: crypto.randomUUID()
  }]
  
  return (
    <div className="todo-list">
      {todoList.map((todo) => {
        return (
          <div className="single-todo" key={todo.id}>
            <input type="checkbox" checked={todo.isCompleted} readOnly></input>
            <p>{todo.text}</p>
            <p>✏️</p>
            <p>❌</p>
          </div>
        );
      })}
    </div>
  );
}