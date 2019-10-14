import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        description: this.props.todoItem.description,
        assigned_to: this.props.todoItem.assigned_to,
        due_date: this.props.todoItem.due_date,
        completed: this.props.todoItem.completed,
    }

    constructor(props) {
        super(props);
    
        /*this.state = {
            description: this.props.todoItem.description,
            assigned_to: this.props.todoItem.assigned_to,
            due_date: this.props.todoItem.due_date,
            completed: this.props.todoItem.completed,
        }*/

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    updateDescription(descrip) {
        this.setState({
            description: descrip
        });
    }
    updateAssignedTo(assign) {
        this.setState({
            assigned_to: assign
        });
    }
    updateDueDate(date) {
        this.setState({
            due_date: date
        });
    }
    updateCompleted(complete) {
        this.setState({
            completed: complete
        });
    }

    newKey() {
        for(let i =0; i<this.props.todoList.items.length; i++) {
            if(this.props.todoList.items.find(function(item){return item.key==i})==null) {
                return i;
            }
        }
        return this.props.todoList.items.length;
    }

    handleSubmit() {
        this.props.todoItem.description = this.state.description;
        this.props.todoItem.assigned_to = this.state.assigned_to;
        this.props.todoItem.due_date = this.state.due_date;
        this.props.todoItem.completed = this.state.completed;
        if(this.props.todoItem.key==null) { // new item added
            // assign key value
            //this.props.todoItem.key = this.props.todoList.items.length;
            this.props.todoItem.key = this.newKey();

            this.props.todoList.items.push(this.props.todoItem);
        }
        this.props.loadList(this.props.todoList);
    }

    render() {
        return (
            <div id="todo_item">
                <h3 id="item_heading">Item</h3>
                <div id="item_form_container">
                    <div id="item_description_prompt" className="item_prompt">Description:</div>
                    <input 
                        defaultValue={this.props.todoItem.description}
                        onChange={e => this.updateDescription(e.target.value)}
                        id="item_description_textfield" className="item_input" type="input" />
                    
                    <div id="item_assigned_to_prompt" className="item_prompt">Assigned To:</div>
                    <input 
                        defaultValue={this.props.todoItem.assigned_to}
                        onChange={e => this.updateAssignedTo(e.target.value)}
                        id="item_assigned_to_textfield" className="item_input" type="input" />
                    
                    <div id="item_due_date_prompt" className="item_prompt">Due Date:</div>
                    <input 
                        defaultValue={this.props.todoItem.due_date}
                        onChange={e => this.updateDueDate(e.target.value)}
                        id="item_due_date_picker" className="item_input" type="date" />
                    
                    <div id="item_completed_prompt" className="item_prompt">Completed:</div>
                    <input 
                        defaultChecked={this.props.todoItem.completed}
                        onChange={e => this.updateCompleted(e.target.checked)}
                        id="item_completed_checkbox" className="item_input" type="checkbox" />

                    <footer>
                        <button id="item_form_submit_button" className="input_button item_button" 
                            onClick={this.handleSubmit}>Submit</button>
                        &nbsp;
                        <button id="item_form_cancel_button" className="input_button item_button"
                            onClick={() => this.props.loadList(this.props.todoList)}>Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired, // not required...
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
