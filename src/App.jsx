import React,{useState, Fragment, useRef, useEffect} from 'react';
import {TodoList} from './components/TodoList';
import {v4 as uuidv4} from 'uuid';
const KEY = 'todo-list.todos';

export function App(){
  //Array of todos
  const [todos, setTodos] = useState([{id:1, task: 'Task B', completed: false}]);
  
  const reference = useRef();

  //retrieve
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos){
      setTodos(storedTodos);
    }
  },[]);
  //save
  useEffect(()=>{
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos])

  const addNewTodo = (()=>{
    const newTask = reference.current.value;
    if(newTask === '') return;
    setTodos((prevTodos)=>{
      return [...prevTodos, {id: uuidv4(), task: newTask, completed:false}]
    })
    reference.current.value = null;
  });

  const toggleTodo = ((id)=>{
    const newTodos = [...todos];
    const todo = newTodos.find((todo)=> todo.id == id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  })

  const removeTodo = (()=> {
    //create a local copy of todo array
    //filter elements that are checked
    const uncompletedTodos = todos.filter((todo)=> !todo.completed);
    //with the unchecked elements
    setTodos(uncompletedTodos);
  });

  return(
    <Fragment>
      <TodoList todos = {todos} toggleTodo={toggleTodo}/>
      <input type='text'placeholder='Add new todo' ref={reference}/>
      <button onClick={addNewTodo}>Add</button>
      <button onClick={removeTodo}>Remove</button>
      <p>Tiene {todos.filter((todo)=> !todo.completed).length} todos por hacer</p>
    </Fragment>
    
  )
}