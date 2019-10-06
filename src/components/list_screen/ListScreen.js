import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }

    addItem() {
        let newItem = {
            "key": this.props.todoList.items.length,
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false
        }

        this.props.todoList.items.push(newItem);
        return newItem;
    }

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            defaultValue={this.getListName()}
                            onChange={e => this.props.todoList.name = e.target.value} 
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            defaultValue={this.getListOwner()}
                            onChange={e => this.props.todoList.owner = e.target.value}
                            type="text" 
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList} loadList={this.props.loadList} loadItem={this.props.loadItem} />
                <div className="list_item_add_card" onClick={() => this.props.loadItem(this.addItem())}>+</div>
            </div>
        )
    }
}

export default ListScreen
