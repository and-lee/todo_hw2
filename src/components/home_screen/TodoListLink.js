import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoListLink extends Component {

    clickListLinkHandler() {
        //move clicked list to the top of the list links
        //this.props.todoList.key = 0;
        this.props.todoLists.splice(this.props.todoList.key, 1); //delete list
        this.props.todoLists.unshift(this.props.todoList); //add list back to the head

        //redo keys
        for (let i = 0; i < this.props.todoLists.length; i++) {
            this.props.todoLists[i].key = i;
        }
        
        this.props.loadList(this.props.todoList);
    }
    render() {        
        return (
            <a 
                className='home_list_link'
                onClick={() => this.clickListLinkHandler()}
            >
                {this.props.todoList.name}<br />
            </a>
        )
    }
}

TodoListLink.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired
}

export default TodoListLink
