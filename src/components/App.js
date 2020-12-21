import React from 'react';
import moment from 'moment';

import AddTodosForm from './AddTodosForm';
import TodosList from './TodosList';
import DetailsModal from './TodoDetailsModal';
import SortingBar from './SortingBar';
import tutorial from './Tutorial';


class App extends React.Component {

    state = {
        todos: [
            tutorial[0], 
            tutorial[1], 
            tutorial[2]
        ],
        detailsVisible: false,
        currentTodoInModal: '',

        //Sorting
        filters: {
            moveCompletedBottom: false,
        }
    };

    componentDidMount() {
        let parsedTodos = JSON.parse(localStorage.getItem('todos'))
        let parsedFilters = JSON.parse(localStorage.getItem('filters'))
        console.log(parsedFilters)
        if (parsedTodos !== null) {
            this.setState({ todos: parsedTodos, filters: { moveCompletedBottom: parsedFilters.moveCompletedBottom } }, () => { console.log(this.state.todos) })
        } else {
            console.log('No todos available in storage')
        }
    }

    updateLocalStorage = () => {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
        localStorage.setItem('filters', JSON.stringify(this.state.filters))
    }

    //TODOS ACTIONS

    addTodo = (newTodo) => {
        if (newTodo.description) {
            this.setState({ todos: [...this.state.todos, newTodo] }, this.updateLocalStorage)
        }
    }

    removeTodo = (todoId) => {
        this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== todoId)] }, this.updateLocalStorage)
    }

    removeAll = () => {
        this.setState({ todos: [] }, this.updateLocalStorage)
    }

    markTodoAsCompleted = (checkboxElementChecked, todoId) => {

        const todos = this.state.todos;

        todos.map(todo => {
            if (todo.id === todoId) {
                todo.completed = checkboxElementChecked
            }
        })

        this.setState({
            todos: todos
        }, this.updateLocalStorage)
    }

    editTodo = (description, todoId) => {
        const todos = this.state.todos;
        todos.map(todo => {
            if (todo.id === todoId && todo.completed === false) {
                todo.description = description
                todo.updatedAt = moment().unix()
            }
        })

        this.setState({
            todos: todos
        }, this.updateLocalStorage)
    }

    //MODAL ACTIONS

    //Edits the extended description for the currentTodoInModal, which is set always when a details button for any todo is clicked 
    editExtendedDescription = (extendedDescription, todoId) => {
        const todos = this.state.todos;
        todos.map(todo => {
            if (todo.id === todoId && todo.completed === false) {
                todo.extendedDescription = extendedDescription
                todo.updatedAt = moment().unix()
            }
        })
        this.setState({
            todos: todos
        }, this.updateLocalStorage)
    }

    setDeadline = (deadline, todoId) => {
        const todos = this.state.todos;
        todos.map(todo => {
            if (todo.id === todoId) {
                todo.deadline = deadline
            }
        })
        this.setState({
            todos: todos
        }, this.updateLocalStorage)
    }

    //Sets the value of the clicked element as the currentTodoInModal, then displays the modal with the currentTodoInModal (todo) values 
    showDetails = (todoId) => {
        this.setState({
            currentTodoInModal: this.state.todos.find(todo => todo.id === todoId),
            detailsVisible: true,
        })
        // this.forceUpdate()
    }

    hideDetails = () => {
        this.setState({ detailsVisible: false })
    }


    //SORTING ACTIONS 

    moveCompletedBottomSwitcher = () => {
        this.state.filters.moveCompletedBottom === false
            ? this.setState({ filters: { moveCompletedBottom: true } }, this.updateLocalStorage)
            : this.setState({ filters: { moveCompletedBottom: false } }, this.updateLocalStorage)
    }

    prioritizeTodo = (todoId) => {
        const todos = this.state.todos;
        todos.map(todo => {
            if (todo.id === todoId) {
                todo.isPriority === false ? todo.isPriority = true : todo.isPriority = false;
            }
        })

        this.setState({ todos: todos }, (this.updateLocalStorage))
    }

    render() {

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <AddTodosForm
                    descriptionProp={this.editTodo}
                    addTodoProp={this.addTodo}
                    removeAllProp={this.removeAll}
                />

                <SortingBar
                    moveCompletedBottom={this.state.filters.moveCompletedBottom}
                    moveCompletedBottomSwitcher={this.moveCompletedBottomSwitcher}
                />

                <TodosList
                    todosProp={this.state.todos}
                    removeTodoProp={this.removeTodo}
                    editTodoProp={this.editTodo}
                    showDetailsProp={this.showDetails}
                    markTodoAsCompleted={this.markTodoAsCompleted}
                    moveCompletedBottom={this.state.filters.moveCompletedBottom}
                    prioritizeTodo={this.prioritizeTodo}
                />

                <DetailsModal
                    visible={this.state.detailsVisible}
                    hideDetailsProp={this.hideDetails}
                    currentTodoInModal={this.state.currentTodoInModal}
                    editExtendedDescriptionProp={this.editExtendedDescription}
                    setDeadline={this.setDeadline}
                />
            </div>
        )
    }
}

export default App;