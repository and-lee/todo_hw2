import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

import nameChange_Transaction from '../../lib/jsTPS/nameChange_Transaction'
import ownerChange_Transaction from '../../lib/jsTPS/ownerChange_Transaction'

export class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.ctrlZYFunction = this.ctrlZYFunction.bind(this);
        //this.undoTransaction = this.undoTransaction.bind(this);
        //this.redoTransaction = this.redoTransaction.bind(this);
    }
    state = {
        name: this.props.todoList.name,
        owner: this.props.todoList.owner
    }

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name; // return name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner; //return owner;
        }
    }

    setListName(name) {
        /*if(this.getListName() == name) { // disable adding Transaction
            //console.log("nothing happens");
            return;
        }*/
        let transaction = new nameChange_Transaction(this.props.todoList, name);
        this.props.jsTPS.addTransaction(transaction);
        this.setState({name: this.getListName()});
    }
    setListOwner(owner) {
        let transaction = new ownerChange_Transaction(this.props.todoList, owner);
        this.props.jsTPS.addTransaction(transaction);
        this.setState({owner: this.getListOwner()});
    }

    addItem() {
        let newItem = {
            //"key": this.props.todoList.items.length,
            "description": "",
            "due_date": "",
            "assigned_to": "",
            "completed": false
        }

        //this.props.todoList.items.push(newItem);
        return newItem;
    }

    ctrlZYFunction(event){ // key pressing input function
        if(event.keyCode === 90 && event.ctrlKey) { //ctrl + z
            this.props.jsTPS.undoTransaction();
            this.setState({name: this.getListName(), owner: this.getListOwner()});
            this.props.loadList(this.props.todoList);
            console.log(this.props.jsTPS.toString());
            event.preventDefault();
        } else if(event.keyCode === 89 && event.ctrlKey) { // ctrl + y
            this.props.jsTPS.doTransaction();
            this.setState({name: this.getListName(), owner: this.getListOwner()});
            this.props.loadList(this.props.todoList);
            console.log(this.props.jsTPS.toString());
            event.preventDefault();
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.ctrlZYFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.ctrlZYFunction, false);
    }

    render() {
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash todoLists={this.props.todoLists} todoList={this.props.todoList} goHome={this.props.goHome}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.state.name}
                            onChange={e => this.setListName(e.target.value)}
                            type="text" 
                            id="list_name_textfield" />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.state.owner}
                            onChange={e => this.setListOwner(e.target.value)}
                            type="text" 
                            id="list_owner_textfield" />
                    </div>
                </div>
                <ListItemsTable 
                    todoList={this.props.todoList} 
                    loadList={this.props.loadList} 
                    loadItem={this.props.loadItem}
                    jsTPS={this.props.jsTPS} />
                <div className="list_item_add_card" onClick={() => this.props.loadItem(this.addItem())}>+</div>
            </div>
        )
    }
}

export default ListScreen
