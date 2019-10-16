/**
 * editItem_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
import jsTPS_Transaction from './jsTPS_Transaction'

export default class editItem_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initItem
     */
    constructor(initItem, description, assignedTo, dueDate, completed) {
        super();
        this.item = initItem;
        this.oldDescription = initItem.description;
        this.oldAssignedTo = initItem.assigned_to;
        this.oldDueDate = initItem.due_date;
        this.oldCompleted = initItem.completed;
        this.newDescription = description;
        this.newAssignedTo = assignedTo;
        this.newDueDate = dueDate;
        this.newCompleted = completed;
    }

    /**
     * This transaction edits the item.
     */
    doTransaction() {
        this.item.description = this.newDescription;
        this.item.assigned_to = this.newAssignedTo;
        this.item.due_date = this.newDueDate;
        this.item.completed = this.newCompleted;

    }

    /**
     * As the reverse of do, this method reverts the item to its original state.
     */
    undoTransaction() {
        this.item.description = this.oldDescription;
        this.item.assigned_to = this.oldAssignedTo;
        this.item.due_date = this.oldDueDate;
        this.item.completed = this.oldCompleted;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Edit Item " + this.item.description + " | " + this.item.assigned_to + " | " + this.item.due_date + " | " + this.item.completed;
    }
}