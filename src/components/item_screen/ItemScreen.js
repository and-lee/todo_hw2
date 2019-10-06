import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            description: this.props.listItem.description,
            assigned_to: this.props.listItem.assigned_to,
            due_date: this.props.listItem.due_date,
            completed: this.props.listItem.completed
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    updateDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    updateAssignedTo(e) {
        this.setState({
            assigned_to: e.target.value
        });
    }
    updateDueDate(e) {
        this.setState({
            due_date: e.target.value
        });
    }
    updateCompleted(e) {
        this.setState({
            completed: e.target.checked
        });
    }
    handleSubmit() {
        this.props.listItem.description = this.state.description;
        this.props.listItem.assigned_to = this.state.assigned_to;
        this.props.listItem.due_date = this.state.due_date;
        this.props.listItem.completed = this.state.completed;
        this.props.loadList(this.props.todoList);
    }

    render() {
        return (
            <div id="todo_item">
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div id="item_description_prompt" class="item_prompt">Description:</div>
                    <input 
                        defaultValue={this.props.listItem.description}
                        onChange={e => this.updateDescription(e)}
                        id="item_description_textfield" class="item_input" type="input" />
                    
                    <div id="item_assigned_to_prompt" class="item_prompt">Assigned To:</div>
                    <input 
                        defaultValue={this.props.listItem.assigned_to}
                        onChange={e => this.updateAssignedTo(e)}
                        id="item_assigned_to_textfield" class="item_input" type="input" />
                    
                    <div id="item_due_date_prompt" class="item_prompt">Due Date:</div>
                    <input 
                        defaultValue={this.props.listItem.due_date}
                        onChange={e => this.updateDueDate(e)}
                        id="item_due_date_picker" class="item_input" type="date" />
                    
                    <div id="item_completed_prompt" class="item_prompt">Completed:</div>
                    <input 
                        defaultChecked={this.props.listItem.completed}
                        onChange={e => this.updateCompleted(e)}
                        id="item_completed_checkbox" class="item_input" type="checkbox" />

                    <footer>
                        <button id="item_form_submit_button" className="input_button item_button" 
                            onClick={this.handleSubmit}>Submit</button>
                        <button id="item_form_cancel_button" className="input_button item_button"
                            onClick={() => this.props.loadList(this.props.todoList)}>Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
