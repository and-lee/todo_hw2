/**
 * deleteItem_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
import jsTPS_Transaction from './jsTPS_Transaction'

export default class deleteItem_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initItem
     */
    constructor(initList, initItem) {
        super();
        this.list = initList;
        this.oldList = initList.items;
        this.item = initItem;
        this.itemIndex = this.list.items.indexOf(initItem);
    }

    /**
     * This transaction deletes the item from the list.
     */
    doTransaction() {
        //this.list.items.splice(this.itemIndex, 1);
        let item = this.item;
        this.list.items = this.list.items.filter(function(i){return i!==item});

    }

    /**
     * As the reverse of do, this method reverts the list to its original state.
     */
    undoTransaction() {
        // add deleted item back into list
        this.list.items = this.oldList;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Delete Item " + this.item.description + " | " + this.item.assigned_to + " | " + this.item.due_date + " | " + this.item.completed ;
    }
}