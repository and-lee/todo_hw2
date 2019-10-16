/**
 * addItem_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
import jsTPS_Transaction from './jsTPS_Transaction'

export default class addItem_Transaction extends jsTPS_Transaction {
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
        this.item = initItem;
        this.itemIndex = this.list.items.indexOf(initItem);
    }

    /**
     * This transaction adds the item to the list.
     */
    doTransaction() {
        this.list.items.push(this.item);
    }

    /**
     * As the reverse of do, this method reverts the list to its original state without the new item.
     */
    undoTransaction() {
        // remove item
        let item = this.item;
        this.list.items = this.list.items.filter(function(i){return i!==item});
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Add Item " + this.item.description + " | " + this.item.assigned_to + " | " + this.item.due_date + " | " + this.item.completed;
    }
}