import React from 'react';

export function TodoItem({todo, toggleTodo}){
    const {id, task, completed} = todo;

    const changeTodoStatus = (()=>{
        toggleTodo(id);
    });

    return (
        <li>
            <input type='checkbox' checked={completed} id={id} onChange={changeTodoStatus}/>
            {task}
        </li>
    )
}