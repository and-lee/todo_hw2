/**
 * nameChange_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 */
import jsTPS_Transaction from './jsTPS_Transaction'

export default class nameChange_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initList
     * @param initName
     */
    constructor(initList, initName) { //initListName, 
        super();
        // THIS IS THE OBJECT IT WILL MANIPULATE
        this.list = initList;

        // name TO change FOR list name
        this.newName = initName;
        this.oldName = initList.name;
    }

    /**
     * This transaction changes the list name to new name.
     */
    doTransaction() {
        this.list.name = this.newName;
    }

    /**
     * As the reverse of do, this method reverts list name to original name.
     */
    undoTransaction() {
        this.list.name = this.oldName;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Name Change " + this.newName;
    }
}