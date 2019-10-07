import React, { Component } from 'react'

const Modal = ({show, handleClose, handleConfirm}) => {
    return (
      <div className={show ? 'modal modal_is_visible' : 'modal modal_is_hidden'} id="modal_yes_no_dialog">
        <div class='modal_dialog'>
            <header class="dialog_header">
                Delete list?
            </header>
            <section class="dialog_content">
                <p><strong>Are you sure you want to delete this list?</strong></p>
            </section>
            <button id="dialog_yes_button" onClick={handleConfirm}>Yes</button>
            &nbsp;
            <button id="dialog_no_button" onClick={handleClose}>No</button>
            <footer class="dialog_footer">
                The list will not be retreivable.
            </footer>
        </div>
      </div>
    );
};

export class ListTrash extends Component {
    state = {
        show: false // for modal
    }

    showModal = () => {
        this.setState({show: true});
    }

    hideModal = () => {
        this.setState({show: false});
    }

    deleteList = () => {
        this.props.todoLists.splice(this.props.todoList.key, 1);
        //redo key values
        for (let i = this.props.todoList.key; i < this.props.todoLists.length; i++) {
            this.props.todoLists[i].key = i;
        }

        //go home
        this.props.goHome();
    }

    render() {
        return (
            <>
                <div id="list_trash" onClick={this.showModal}>&#128465;</div>
                <Modal show={this.state.show} handleClose={this.hideModal} handleConfirm={this.deleteList}></Modal>
            </>
            
        )
    }
}

export default ListTrash
