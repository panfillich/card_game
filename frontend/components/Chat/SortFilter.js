import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import ChatAction from '../../actions/ChatActions'

class SortFilter extends Component {
    render() {
        let {setSort, setFilterByName} = this.props;
        return (
        <div>
        <div className="input-group" style={{"padding-top":"7px", "padding-bottom":"7px"}}>
            <div className="input-group-btn search-panel">
                <button type="button" className="btn btn-outline-info dropdown-toggle bg-faded" data-toggle="dropdown">
                 <span id="search_concept">Sort by</span> <span className="caret"></span>
                </button>
                <ul className="dropdown-menu float-left" aria-labelledby="search_concept">
                    <li className="dropdown-item" onClick={function () {setSort('relevant')}}>relevant</li>
                    <li className="dropdown-item" onClick={function () {setSort('message')}}>message</li>
                    <li className="dropdown-item" onClick={function () {setSort('name')}}>name</li>
                </ul>
            </div>
            <input onChange={function (elem) {setFilterByName(elem.target.value)}}
                   className="form-control" name="x"
                   placeholder="Filter by name..."
                   type="text"
            />
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
        setSort          : bindActionCreators(ChatAction.Client.setSort, dispatch),
        setFilterByName  : bindActionCreators(ChatAction.Client.setFilterByName, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);