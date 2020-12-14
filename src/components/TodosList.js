import React from 'react';
import Todo from './Todo';

const TodosList = ({ todosProp, removeTodoProp, editTodoProp, showDetailsProp, markTodoAsCompleted, moveCompletedBottom, prioritizeTodo }) => {

    let whichListToDisplay = []


    const todosSortedByPriority = todosProp.sort((a, b) => {
        if (a.isPriority === false && b.isPriority === true) {
            return 1
        } else if (a.isPriority === true && b.isPriority === false) {
            return -1
        } else {
            return 0
        }
    })

    const sortedCompletedBottom = todosProp.slice().sort((a, b) => {
        if (a.completed === false && b.completed === true) {
            return -1
        } else if (a.completed === false && b.completed === false) {
            return 0
        } else {
            return 1
        }
    })

    moveCompletedBottom === false ? whichListToDisplay = todosSortedByPriority : whichListToDisplay = sortedCompletedBottom;

    const todosList = whichListToDisplay.map(todo => {


        return (

            <Todo
                key={todo.id}
                idProp={todo.id}
                descriptionProp={todo.description}
                removeTodoProp={removeTodoProp}
                editTodoProp={editTodoProp}
                showDetailsProp={showDetailsProp}
                markTodoAsCompleted={markTodoAsCompleted}
                todoCompleted={todo.completed}
                prioritizeTodo={prioritizeTodo}
                isPriority={todo.isPriority}
            />
        )
    })


    return (
        <div className='todos-container'>{todosList}</div>
    )
}

export default TodosList;