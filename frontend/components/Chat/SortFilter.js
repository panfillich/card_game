import React, { Component } from 'react'
import { connect } from 'react-redux'

class SortFilter extends Component {
    render() {
        return (
        <div>
        <div className="input-group" style={{"padding-top":"7px", "padding-bottom":"7px"}}>
            <div className="input-group-btn search-panel">
                <button type="button" className="btn btn-outline-info dropdown-toggle bg-faded" data-toggle="dropdown">
                 <span id="search_concept">Sort by</span> <span className="caret"></span>
                </button>
                <ul className="dropdown-menu float-left" aria-labelledby="search_concept">
                    <li><a className="dropdown-item" onClick={()=>{}} value="en" href="">Online</a></li>
                    <li><a className="dropdown-item" onClick={()=>{}} value="ru" href="">Away</a></li>
                    <li><a className="dropdown-item" onClick={()=>{}} value="ru" href="">Offline</a></li>
                </ul>
            </div>
            <input name="search_param" value="all" id="search_param" type="hidden" />
            <input className="form-control" name="x" placeholder="Filter by name..." type="text" />
        </div>
        </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        chat: state.chat
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // changeLanguage  : bindActionCreators(LangAction.changeLanguage, dispatch),
        // logout          : bindActionCreators(UserAction.logout, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);