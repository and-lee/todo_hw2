import React, { Component } from 'react'

export class ListItemCard extends Component {
    moveDown(listItem, e) {
        var index = this.props.todoList.items.indexOf(this.props.listItem);
        //var next = this.props.todoList.items[index+1];
        //var temp = listItem;
        this.props.todoList.items[index] = this.props.todoList.items[index+1];
        this.props.todoList.items[index+1] = listItem;

        //load list
        this.props.loadList(this.props.todoList);
        e.stopPropagation();
    }
    
    deleteItem(listItem, e) {
        var index = this.props.todoList.items.indexOf(this.props.listItem);
        this.props.todoList.items.splice(index, 1);

        //load list
        this.props.loadList(this.props.todoList);
        e.stopPropagation();
    }
    
    moveUp(listItem, e) {
        var index = this.props.todoList.items.indexOf(this.props.listItem);
        //var prev = this.props.todoList.items[index-1];
        this.props.todoList.items[index] = this.props.todoList.items[index-1];
        this.props.todoList.items[index-1] = listItem;

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
                    {this.props.todoList.items.indexOf(this.props.listItem)==0 ? <div className='list_item_card_button disabled' onClick={e=> e.stopPropagation()}>⇧</div> :
                        <div className='list_item_card_button' onClick={e => this.moveUp(this.props.listItem, e)}>⇧</div>}
                    
                    {this.props.todoList.items.indexOf(this.props.listItem)==this.props.todoList.items.length-1 ? <div className='list_item_card_button disabled' onClick={e=> e.stopPropagation()}>⇩</div> :
                        <div className='list_item_card_button' onClick={e => this.moveDown(this.props.listItem, e)}>⇩</div>}
                    
                    <div className='list_item_card_button'
                        onClick={e => this.deleteItem(this.props.listItem, e)}>✕</div>
                </div>

            </div>
        )
    }
}

export default ListItemCard
