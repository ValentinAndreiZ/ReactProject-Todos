import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

class AddTodosForm extends React.Component {


    state = { description: '' }

    componentDidMount() {
        window.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                this.onFormSubmit()
            }
        })
    }

    onInputChange = (e) => {
        this.setState({ description: e.target.value })
    }

    onFormSubmit = () => {
        this.props.addTodoProp(
            {
                id: uuidv4(),
                completed: false,
                description: this.state.description,
                createdAt: moment().unix(),
                updatedAt: null,
                extendedDescription: '',
                deadline: undefined,
                isPriority: false
            }
        )
        this.setState({ description: '' })
    }

    render() {
        return (
            <div className="addTodosForm" >

                <input onChange={this.onInputChange} value={this.state.description} type="text" placeholder="Write todo here for idiots..." />
                <div className="addTodosForm-Links">

                    <a onClick={this.onFormSubmit}>
                    <i className="pencil alternate icon"></i>
                        Add Todo
                     </a>
                    <a onClick={this.props.removeAllProp} >
                        <i className="eraser icon"></i>
                        Remove All
                    </a>
                </div>

            </div>
        )
    }
}

export default AddTodosForm;