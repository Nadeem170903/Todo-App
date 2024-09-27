import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoItem, settodoItem] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    let background = getColor();
    let textColor = getTextColor(background)
    const newTodoItem = { id: Date.now(), text: newTodo,background:background,textColor:textColor }; // Add unique id to each todo item
    settodoItem([...todoItem, newTodoItem]);
    setNewTodo('');
  };

  const keypresss = (e) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  };

  const deleteItem = (targetId) => {
    const deleteElement = document.querySelector(`#item-${targetId}`);
    deleteElement.classList.add('fade-out');

    setTimeout(() => {
      const newTodoList = todoItem.filter((item) => item.id !== targetId);
      settodoItem(newTodoList);
    }, 300);
  };

  useEffect(()=>{
    const item = document.querySelector
  })

  const getColor = ()=>{
    const letters = '0123456789ABCDEF'
    let color = '#';

    for(let i = 0; i< 6; i++){
      color += letters[Math.floor(Math.random()*16)];
    }

    return color;
  }

  const getTextColor = (background)=>{
     let rgb = parseInt(background.substring(1), 16);
     let r = (rgb >> 16) & 0xFF;
     let g = (rgb >> 8) & 0xFF;
     let b = rgb & 0xFF;
       const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
       return luminance > 128 ? '#000000' : '#FFFFFF';


  };

  return (
    <>
      <div className="main">
        <h1>Todo List</h1>
        <div className="Todo-container">
          <div className="input-button">
            <input
              placeholder="Write task here"
              value={newTodo}
              onKeyUp={newTodo !== '' ? keypresss : null}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ol>
            {todoItem.map((item) => (
              <div id={`item-${item.id}`} style={{background:item.background,color:item.textColor}} className="item" key={item.id}>
                <li>{item.text}</li>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
