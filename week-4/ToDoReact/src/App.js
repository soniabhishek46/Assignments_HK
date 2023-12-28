import './App.css';
import { useState } from 'react';

function App() {

  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ops, setOps] = useState({});

  function Header(){
    return(
      <div className='myheader'>
        <h2 className='myheader-txt'>My Simple ToDo App (REACT)</h2>
      </div>
    );
  }
  
  function UserInputs(){
    return(
      <div className='user-input'>
        <div><input type='text' 
                    placeholder='Title' 
                    className='textbox'
                    value = {title} 
                    onInput={event => setTitle(event.target.value)}>
              </input>
        </div>
        <div><input type='text' 
                    placeholder='Descriptiion' 
                    className='textbox'
                    value = {description} 
                    onInput={event => setDescription(event.target.value)}>
            </input>
        </div>
        <div><button onClick={addTodo} className='btn'>Add</button></div>
      </div>
    );
  }

  function addTodo(){
    let tds = todos; 
    if (Object.keys(ops).length > 0){
      let idx = tds.findIndex(td => ops.id === td.id)
      tds[idx].title = title;
      tds[idx].description = description;
    }
    else{
    tds.push({id, title, description});
    setId(id + 1);
    }
    setTodos(tds);
    setTitle('');
    setDescription('');
    setOps('');
  }

  function todo_list(tdos){
    return tdos.map( todo =>{
      return(
        <div className='show-todo' key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <button onClick={()=> onEdit(todo)} className='edit-btn'>Edit</button>
          <button onClick={()=> onDelete(todo)} className='del-btn'>Delete</button>
        </div>
      );
    })
  }

  function onEdit(todo){
    setTitle(todo.title);
    setDescription(todo.description);
    setOps({ops: 'edit', id: todo.id});
  }

  function onDelete(todo){
    let filtered_todos = todos.filter(td => td.id !== todo.id);
    setTodos(filtered_todos);
  }

  return (
    <div className='container'>
      {Header()}
      {UserInputs()}
      {todo_list(todos)}
    </div>
  );
}

export default App;
