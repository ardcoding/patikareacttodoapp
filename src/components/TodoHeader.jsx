import React, { useEffect, useState } from 'react'
import "../App.css"
import {nanoid} from 'nanoid'

function TodoHeader() {
  const [todos, setTodos] = useState([])
  const [content,setContent] = useState('');
  const [filter,setFilter] = useState([todos])
  const [checked, setChecked] = useState({all: true, active: false, completed: false})


  useEffect(() => {
    filtercomplete()
  }, [checked, todos])

  
  function add(e){
    e.preventDefault()
    if(content.length < 1 || content === null || content === " " || content === undefined){
        return;
    }

    setTodos([...todos,{todoID:nanoid(), todoContent:content, completed:false}]);
    setContent('')
  }

  function deleteTodo(index) { 
    index=todos.findIndex((todo,i) => todo.todoID === index)
    setTodos(todos.filter((_, i) => i !== index));
  }

  function deleteAll(){
        setTodos([])
  }

  function isCompleted(index) {
    const target = [...todos];
    index=target.findIndex((todo,i) => todo.todoID === index)
    target[index].completed = !target[index].completed;
    setTodos(target);
  }

  function completedAll() {
    const target = [...todos];
    const everycompleted = target.every(todo => todo.completed)
    if(everycompleted){
        for(let i=0; i < todos.length; i++){
            target[i].completed = false;
            setTodos(target);
        }
    }else{
        for(let i=0; i < todos.length; i++){
        target[i].completed = true;
        setTodos(target);
        }
    }
  }

  function filtercomplete() {
    if(checked.active){ // active checkbox işaretli ise tamamlanmamış verileri getir
      setFilter(todos.filter((todo, i) => todo.completed === false))
    } else if (checked.completed){ // completed checkbox işaretli ise tamamlanmış verileri getir
      setFilter(todos.filter((todo, i) => todo.completed === true))
    } else { // all checkbox işaretli ise tüm verileri getir
      setFilter(todos)
    }
  }


  return (
    <div>
	<header className="header">
		<h1>TODOS</h1>
		<form onSubmit={add}>
			<input className="new-todo" name='writetodo' placeholder="What needs to be done?" autoFocus value={content} onChange={((event)=>setContent(event.target.value))} />
		</form>

        </header>
            {
            todos.length !== 0 ?  (    
            <>
            <section className="main">
		    <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all" onClick={() => completedAll()}>Mark all as complewqete</label>
            <ul className="todo-list">
                {filter.map((todo, index) => (
                <li key={index} className={todo.completed ? "completed" : ""}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.completed} onChange={() =>isCompleted(todo.todoID)}/>
                    <label>{todo.todoContent}</label>
                    <button className="destroy" onClick={() => deleteTodo(todo.todoID)}></button>
                </div>
                </li>
                ))}
            </ul>
        </section>

    <footer className="footer">
		<span className="todo-count">
			<strong>{todos.length} </strong>
			items left
		</span>

        <ul className="filters">
            <li>
                <input type='checkbox' checked={checked.all} onChange={() => setChecked({all: true, active: false, completed: false})}></input>
                <label>All</label>
            </li>
            <li>
                <input type='checkbox' checked={checked.active} onChange={() => setChecked({all: false, active: true, completed: false})}></input>
                <label>Active</label>
            </li>
            <li>
                <input type='checkbox' checked={checked.completed} onChange={() => setChecked({all: false, active: false, completed: true})}></input>
                <label>Completed</label>
            </li>
        </ul>

		<button className="clear-completed" onClick={() => {deleteAll()}}>
			Clear completed
		</button>
	</footer>
    </>
    ) : null
    }
    </div>
  )
}

export default TodoHeader