import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

const ItemSortCriteria = {
    SORT_BY_TASK_INCREASING: "sort_by_task_increasing",
    SORT_BY_TASK_DECREASING: "sort_by_task_decreasing",
    SORT_BY_DUE_DATE_INCREASING: "sort_by_due_date_increasing",
    SORT_BY_DUE_DATE_DECREASING: "sort_by_due_date_decreasing",
    SORT_BY_STATUS_INCREASING: "sort_by_status_increasing",
    SORT_BY_STATUS_DECREASING: "sort_by_status_decreasing"
}

export class ListItemsTable extends Component {
    state = {
        currentItemSortCriteria: ""
    }
    constructor(props) {
        super(props);
    
        this.compare = this.compare.bind(this);
        this.isCurrentItemSortCriteria = this.isCurrentItemSortCriteria.bind(this);
    }

    /**
     * This method sorts the todo list items according to the provided sorting criteria.
     * 
     * @param {ItemSortCriteria} sortingCriteria Sorting criteria to use.
     */
    sortTasks(sortingCriteria) {
        this.setState({currentItemSortCriteria: sortingCriteria}, function(){
            this.props.todoList.items.sort(this.compare);
            
            this.props.loadList(this.props.todoList);
        });
    }

    /**
     * This method tests to see if the current sorting criteria is the same as the argument.
     * 
     * @param {ItemSortCriteria} testCriteria Criteria to test for.
     */
    isCurrentItemSortCriteria(testCriteria) {
        return this.state.currentItemSortCriteria === testCriteria;
    }

    /**
     * This method compares two items for the purpose of sorting according to what
     * is currently set as the current sorting criteria.
     * 
     * @param {TodoListItem} item1 First item to compare.
     * @param {TodoListItem} item2 Second item to compare.
     */
    compare(item1, item2) {
        // IF IT'S A DECREASING CRITERIA SWAP THE ITEMS
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
        if (this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_DECREASING)) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
        // SORT BY DUE DATE
        if(this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)) {
            if (item1.due_date < item2.due_date)
                return -1;
            else if (item1.due_date > item2.due_date)
                return 1;
            else
                return 0;
        }
        // SORT BY COMPLETED
        //else {
        if(this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)
            || this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_DECREASING)) {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
        
    }
    
    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">

                    {this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING) ? 
                        <div className="list_item_task_header" onClick={() => this.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING)}>Task</div> : 
                        <div className="list_item_task_header" onClick={() => this.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING)}>Task</div>
                    }                    

                    {this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING) ?
                        <div className="list_item_due_date_header" onClick={() => this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING)}>Due Date</div> : 
                        <div className="list_item_due_date_header" onClick={() => this.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)}>Due Date</div>
                    }
                    
                    {this.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING) ?
                        <div className="list_item_status_header" onClick={() => this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING)}>Status</div> : 
                        <div className="list_item_status_header" onClick={() => this.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING)}>Status</div>
                    }
                    
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            todoList={this.props.todoList}
                            loadList={this.props.loadList}
                            loadItem={this.props.loadItem}
                            jsTPS={this.props.jsTPS} />
                    ))
                }
            </div>
        )
    }
}

export default ListItemsTable
