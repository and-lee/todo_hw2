import React, { Component } from 'react'

export class ListItemCard extends Component {
    moveDown(listItem, e) {
        var keyV = listItem.key;
        var next = this.props.todoList.items[listItem.key+1];
        //var temp = listItem;
        this.props.todoList.items[listItem.key] = this.props.todoList.items[listItem.key+1];
        this.props.todoList.items[listItem.key+1] = listItem;
        //update key value
        listItem.key = keyV+1;
        next.key = keyV;

        //load list
        this.props.loadList(this.props.todoList);
        e.stopPropagation();
    }
    
    deleteItem(listItem) {
        this.props.todoList.items.splice(listItem.key, 1);
        //reassign key values
        for (let i = listItem.key; i < this.props.todoList.items.length; i++) {
            this.props.todoList.items[i].key = i;
        }

        //load list
        this.props.loadList(this.props.todoList);
    }
    
    moveUp(listItem, e) {
        var keyV = listItem.key;
        var prev = this.props.todoList.items[listItem.key-1];
        this.props.todoList.items[listItem.key] = this.props.todoList.items[listItem.key-1];
        this.props.todoList.items[listItem.key-1] = listItem;
        //update key value
        listItem.key = keyV-1;
        prev.key = keyV;

        //load list
        this.props.loadList(this.props.todoList);
        
        e.stopPropagation();
    }

    render() {
        return (
            <div className='list_item_card' onClick={() => this.props.loadItem(this.props.listItem)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                {this.props.listItem.completed ? <div className='list_item_card_completed'>Completed</div> : 
                    <div className='list_item_card_not_completed'>Pending</div>}

                <div className='list_item_card_toolbar'>
                    {this.props.listItem.key==0 ? <div className='list_item_card_button disabled' onClick={e=> e.stopPropagation()}>⇧</div> :
                        <div className='list_item_card_button' onClick={e => this.moveUp(this.props.listItem, e)}>⇧</div>}
                    
                    {this.props.listItem.key==this.props.todoList.items.length-1 ? <div className='list_item_card_button disabled' onClick={e=> e.stopPropagation()}>⇩</div> :
                        <div className='list_item_card_button' onClick={e => this.moveDown(this.props.listItem, e)}>⇩</div>}
                    
                    <div className='list_item_card_button'
                        onClick={() => this.deleteItem(this.props.listItem)}>✕</div>
                </div>

            </div>
        )
    }
}

export default ListItemCard
