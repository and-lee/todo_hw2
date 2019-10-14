import React, { Component } from 'react'
import Banner from './Banner'
import HomeHeader from './HomeHeader'
import TodoListLinks from './TodoListLinks'
import PropTypes from 'prop-types';

export class HomeScreen extends Component {
    newKey() {
        for(let i =0; i<this.props.todoLists.length; i++) {
            if(this.props.todoLists.find(function(item){return item.key==i})==null) {
                return i;
            }
        }
        return this.props.todoLists.length;
    }

    newList() {
        let newList = {
            "key": this.newKey(),
            "name": "",
            "owner": "",
            "items": []
        }
        this.props.todoLists.unshift(newList);

        return newList;
    }

    render() {
        return (
            <div id="todo_home">
                <div id="home_your_lists_container">
                    <HomeHeader />
                    <TodoListLinks loadList={this.props.loadList} todoLists={this.props.todoLists} />
                </div>
                <Banner />
                <div id="home_new_list_container">
                    <button id="home_new_list_button"
                        onClick={() => this.props.loadList(this.newList())}>
                        Create a New To Do List
                    </button>
                </div>
            </div>
        )
    }
}

HomeScreen.propTypes = {
    loadList: PropTypes.func.isRequired,
    todoLists: PropTypes.array.isRequired
}

export default HomeScreen
