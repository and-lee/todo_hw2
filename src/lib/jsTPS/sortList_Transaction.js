/**
 * sortList_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
import jsTPS_Transaction from './jsTPS_Transaction'

export default class sortList_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param compare
     */
    constructor(initList, compare) {
        super();
        this.list = initList;
        this.oldList = new Array();
        for (let i = 0; i < initList.items.length; i++) {
            this.oldList.push({
                key: initList.items[i].key,
                description: initList.items[i].description,
                due_date: initList.items[i].due_date,
                assigned_to: initList.items[i].assigned_to,
                completed: initList.items[i].completed
            });
        }
        this.newList = new Array();
        for (let i = 0; i < initList.items.length; i++) {
            this.newList.push({
                key: initList.items[i].key,
                description: initList.items[i].description,
                due_date: initList.items[i].due_date,
                assigned_to: initList.items[i].assigned_to,
                completed: initList.items[i].completed
            });
        }
        this.compare = compare;
    }

    /**
     * This transaction sorts the items in the list.
     */
    doTransaction() {
        this.newList.sort(this.compare);
        for (let i = 0; i < this.newList.length; i++) {
            this.list.items[i] = ({
                key: this.newList[i].key,
                description: this.newList[i].description,
                due_date: this.newList[i].due_date,
                assigned_to: this.newList[i].assigned_to,
                completed: this.newList[i].completed
            });
        }
        
        console.log(this.oldList);
    }

    /**
     * As the reverse of do, this method reverts the list to its previous unsorted state.
     */
    undoTransaction() {
        //this.list.items = this.oldList;
        for (let i = 0; i < this.oldList.length; i++) {
            this.list.items[i] = ({
                key: this.oldList[i].key,
                description: this.oldList[i].description,
                due_date: this.oldList[i].due_date,
                assigned_to: this.oldList[i].assigned_to,
                completed: this.oldList[i].completed
            });
        }
        console.log(this.oldList);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Sort " + this.list.items;
    }
}