import React, { Component } from 'react'

export default class Modal extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        $('#myModal').modal('show');
        
        // this.modal.modal('show');
        // console.log(this.modal);
        // this.modal.modal('show');
    }

    render() {
        // console.dir(this.modal);
        return(
        <div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
        </button>


        <div
            ref={(input) => {this.modal = input}}
            className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
    </button>
    </div>
        <div className="modal-body">
            ...
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
        </div>
    </div>
    </div>
    </div>

            </div>
        );

        /*return (
            <div className="modal fade bs-example-modal-sm" id="myPleaseWait" tabindex="-1"
                 role="dialog" aria-hidden="true" data-backdrop="static">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                    <span className="glyphicon glyphicon-time">
                    </span>Please Wait
                            </h4>
                        </div>
                        <div className="modal-body">
                            <div className="progress">
                                <div className="progress-bar progress-bar-info
                    progress-bar-striped active"
                                     style="width: 100%">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );*/
    }
};
