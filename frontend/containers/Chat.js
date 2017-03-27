import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import RightSideAction  from '../actions/RightSideAction'
import CloseButton from '../components/Chat/CloseButton'

class Chat extends Component {
    render() {
        return (
            <div className="portlet portlet-default">
                <div className="portlet-heading">
                    <CloseButton className='btn btn-primary' />

                    <div className="portlet-title">
                        <h4><i className="fa fa-circle text-green"> Jane Smith</i></h4>
                    </div>
                    <div className="portlet-widgets">
                        <div className="btn-group">
                            <button type="button" className="btn btn-white dropdown-toggle btn-xs"
                                    data-toggle="dropdown" id="chat-status-dropdown">
                               Status
                            </button>

                            <div className="dropdown-menu float-left" aria-labelledby="chat-status-dropdown">
                                <a className="dropdown-item" onClick={()=>{}} value="en" href="#">Online</a>
                                <a className="dropdown-item" onClick={()=>{}} value="ru" href="#">Away</a>
                                <a className="dropdown-item" onClick={()=>{}} value="ru" href="#">Offline</a>
                            </div>

                        </div>
                        <span className="divider"></span>
                        <a data-toggle="collapse" data-parent="#accordion" href="#chat"><i className="fa fa-chevron-down"></i></a>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div id="chat" className="panel-collapse collapse in">
                    <div className="portlet-body chat-widget" style={{"overflow-y": "auto","width": "auto", "height": "300px"}}>
                        <div className="row">
                            <div className="col-lg-12">
                                <p className="text-center text-muted small">January 1, 2014 at 12:23 PM</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="media">
                                    <div className="media-body">
                                        <h4 className="media-heading">Jane Smith
                                            <span className="small pull-right">12:23 PM</span>
                                        </h4>
                                        <p>Hi, I wanted to make sure you got the latest product report. Did Roddy get it to you?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="media">
                                    <div className="media-body">
                                        <h4 className="media-heading">John Smith
                                            <span className="small pull-right">12:28 PM</span>
                                        </h4>
                                        <p>Yeah I did. Everything looks good.</p>
                                        <p>Did you have an update on purchase order #302?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="media">
                                    <div className="media-body">
                                        <h4 className="media-heading">Jane Smith
                                            <span className="small pull-right">12:39 PM</span>
                                        </h4>
                                        <p>No not yet, the transaction hasn't cleared yet. I will let you know as soon as everything goes through. Any idea where you want to get lunch today?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portlet-footer">
                        <form role="form">
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Enter message..."></textarea>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-default pull-right">Send</button>
                                <div className="clearfix"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeChat : bindActionCreators(RightSideAction.closeChat, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Chat);





