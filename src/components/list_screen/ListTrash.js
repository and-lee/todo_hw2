import React, { Component } from 'react'

const Modal = ({show, handleClose, handleConfirm}) => {
    return (
      <div className={show ? 'modal is_visible' : 'modal is_hidden'} id="modal_yes_no_dialog" data-animation={show ? "slideInLeft" : "slideOutRight"}>
        <div className='modal_dialog'>
            <header className="dialog_header">
                Delete list?
            </header>
            <section className="dialog_content">
                <p><strong>Are you sure you want to delete this list?</strong></p>
            </section>
            <button id="dialog_yes_button" onClick={handleConfirm}>Yes</button>
            &nbsp;
            <button id="dialog_no_button" onClick={handleClose}>No</button>
            <footer className="dialog_footer">
                The list will not be retreivable.
            </footer>
        </div>
      </div>
    );
};

export class ListTrash extends Component {
    state = {
        show: false // for modal. resets to hidden when on screen
    }

    showModal = () => {
        this.setState({show: true});
    }

    hideModal = () => {
        this.setState({show: false});
    }

    deleteList = () => {
        var index = this.props.todoLists.indexOf(this.props.todoList);
        this.props.todoLists.splice(index, 1);
          
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
