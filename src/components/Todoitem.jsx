import React, { useState, useRef } from 'react'
import { useTodo } from '../contexts/TodoContext';

function Todoitems({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const [notification, setNotification] = useState(""); // State for notification
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const inputRef = useRef(null);

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && isTodoEditable) {
            editTodo()
        }
    }

    const handleEditButtonClick = () => {
        if(todo.completed) return

        if(isTodoEditable){
            editTodo();
        } else {
            setIsTodoEditable((prev) => !prev)
            inputRef.current.focus()
        }
    }

    return (
        <div className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c9ecaa]" : "bg-[#beced7]"}`}>

            {/* completed check */}
            <input
            type="checkbox"
            className='cursor-pointer'
            checked = {todo.completed}
            onChange={toggleCompleted}/>

            {/* todo msg */}
            <input type="text"
            className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
            value={todoMsg}
            onChange={(e)=> setTodoMsg(e.target.value)}
            readOnly = {!isTodoEditable}
            onKeyDown={handleKeyDown}
            ref={inputRef}
             />

            {/* edit button  */}
             <button className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50  hover:bg-gray-200 shrink-0 disabled:opacity-50'
             onClick={handleEditButtonClick}
             disabled={todo.completed}
             >
                {isTodoEditable ? "💾" : "✏️"}
             </button>

             {/* delete button */}

             <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-200 shrink-0"
              onClick={() => deleteTodo(todo.id)}
            >
              ❌
            </button>
        </div>

    )
}

export default Todoitems;