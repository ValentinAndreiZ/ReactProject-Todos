import React from 'react';

const Todo = ({ idProp, descriptionProp, removeTodoProp, editTodoProp, showDetailsProp, markTodoAsCompleted, todoCompleted, prioritizeTodo, isPriority }) => {

    return (
        <div className="todo-container">
            <input type="checkbox" checked={todoCompleted} onChange={(e) => { markTodoAsCompleted(e.target.checked, idProp) }} />
            <input type="text" placeholder='Type in your todo...' value={descriptionProp} ispriority={isPriority ? 1 : 0} onChange={(e) => { editTodoProp(e.target.value, idProp) }} />
            <button onClick={() => { removeTodoProp(idProp) }}><i className="trash icon"></i></button>
            <button onClick={() => { showDetailsProp(idProp) }}><i className="list alternate outline icon"></i></button>
            <button onClick={() => { prioritizeTodo(idProp) }} ispriority={isPriority ? 1 : 0}><i className="thumbtack icon"></i></button>
        </div>
    )
}

export default Todo;