import React, { Component } from 'react'

export class ListTrash extends Component {
    state = {
        show: false
    }

    showModal = () => {
        this.setState({show: true});
    }

    hideModal = () => {
        this.setState({show: false});
    }

    render() {
        return (
            <main>
                <div class="modal" id="modal_yes_no_dialog" data-animation="slideInOutLeft" show={this.state.show} handleClose={this.hideModal}>
                    <div class="modal_dialog">
                        <header class="dialog_header">
                            Delete list?
                        </header>
                        <section class="dialog_content">
                            <p><strong>Are you sure you want to delete this list?</strong></p>
                        </section>
                        <button id="dialog_yes_button">Yes</button>
                        <button id="dialog_no_button" >No</button>
                        <footer class="dialog_footer">
                            The list will not be retreivable.
                        </footer>
                    </div>
                </div>
    
                <div id="list_trash" onClick={() => this.showModal}>&#128465;</div>
            </main>
            
        )
    }
}

export default ListTrash
