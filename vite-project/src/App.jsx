import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todoItem, setTodoItem] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = async () => {
    let background = getColor();
    let textColor = getTextColor(background);
    const newTodoItem = {text: newTodo, background, textColor };
   

    try {
      const res = await axios.post('http://localhost:3001/add', newTodoItem);
      console.log(res.data);
      setTodoItem([...todoItem, res.data.item]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
    setNewTodo('');
  };

  const keypresss = (e) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  };

  const deleteItem = async (targetId) => {
    console.log(targetId)
    try {
      const res = await axios.delete(`http://localhost:3001/delete/${targetId}`);
      console.log(res.data);

      // Immediately remove the item from the state and UI
      const newTodoList = todoItem.filter((item) => item._id !== targetId);
      setTodoItem(newTodoList);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3001/get');
        setTodoItem(res.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []); // Added an empty dependency array to only run once on mount

  const getColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getTextColor = (background) => {
    let rgb = parseInt(background.substring(1), 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = rgb & 0xff;
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? '#000000' : '#FFFFFF';
  };

  return (
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
          {todoItem && todoItem.map((item) => (
            <div
              id={`item-${item.id}`}
              style={{ background: item.background, color: item.textColor }}
              className="item"
              key={item._id}
            >
              <li>{item.text}</li>
              <button className="delete-btn" onClick={() => deleteItem(item._id)}>
                Delete
              </button>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
