import React, { Component } from 'react'
import { connect } from 'react-redux'
import CloseButton from './CloseButton'

class Header extends Component {
    render() {
        let {selected_friend_recordId, friends} = this.props.chat;
        let login = '---';

        if(selected_friend_recordId) {
            let friend = friends.get(selected_friend_recordId);
            login = friend.login;
        }

        return (
            <div className="portlet-heading">
                <nav className="bg-faded">
                    <div className="btn-group" style={{width:"100%"}}>
                        <button type="button" className="btn btn-outline-info"
                                data-toggle="dropdown" id="chat-status-dropdown" style={{width:"30%"}}>
                            <span id="search_concept">Status</span><span className="caret dropdown-toggle"></span>
                        </button>
                        <ul className="dropdown-menu float-left" aria-labelledby="chat-status-dropdown">
                            <li><a className="dropdown-item" onClick={()=>{}} value="en" href="#">Online</a></li>
                            <li><a className="dropdown-item" onClick={()=>{}} value="ru" href="#">Offline</a></li>
                        </ul>
                        <button type="button" style={{width:"50%"}} className="btn btn-outline-info">
                            <span id="search_concept">{login}</span><span className="caret"></span>
                        </button>

                        <CloseButton style={{float:"right", width:"20%"}} className='btn btn-outline-danger btn btn-outline-success'/>
                    </div>

                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        chat: state.chat,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // changeLanguage  : bindActionCreators(LangAction.changeLanguage, dispatch),
        // logout          : bindActionCreators(UserAction.logout, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);