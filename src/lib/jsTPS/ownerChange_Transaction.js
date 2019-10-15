/**
 * ownerChange_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
import jsTPS_Transaction from './jsTPS_Transaction'

export default class ownerChange_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initOwner
     */
    constructor(initList, initOwner) { //initListName, 
        super();
        // THIS IS THE OBJECT IT WILL MANIPULATE
        this.list = initList;

        // name TO change FOR list owner
        this.newOwner = initOwner;
        this.oldOwner = initList.owner;
    }

    /**
     * This transaction changes the list owner to new owner.
     */
    doTransaction() {
        this.list.owner = this.newOwner;
    }

    /**
     * As the reverse of do, this method reverts list owner to original owner.
     */
    undoTransaction() {
        this.list.owner = this.oldOwner;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Owner Change" + this.newName;
    }
}