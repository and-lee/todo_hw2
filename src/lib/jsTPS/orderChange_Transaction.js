/**
 * orderChange_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
import jsTPS_Transaction from './jsTPS_Transaction'

export default class orderChange_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * moveBy = how much do you want to move the item down/up by
     * 
     * @param initList
     * @param initItem
     * @param moveBy
     */
    constructor(initList, initItem, moveBy) {
        super();
        this.list = initList;
        this.item = initItem;
        this.itemIndex = this.list.items.indexOf(initItem);
        this.moveBy = moveBy;
    }

    /**
     * This transaction moves the item up or down one on the list.
     */
    doTransaction() {
        this.list.items[this.itemIndex] = this.list.items[this.itemIndex-this.moveBy];
        this.list.items[this.itemIndex-this.moveBy] = this.item;
    }

    /**
     * As the reverse of do, this method reverts the item to its previous index.
     */
    undoTransaction() {
        this.list.items[this.itemIndex-this.moveBy] = this.list.items[this.itemIndex];
        this.list.items[this.itemIndex] = this.item;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Order Change " + this.itemIndex + " -> " +this.list.items.indexOf(this.item);
    }
}