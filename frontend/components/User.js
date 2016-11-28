import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
    render() {
        const { page } = this.props
        const { name } = this.props
        return (
            <div>
                <p>Привет, {name}!  { page.year }!</p>
            </div>
        )
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user,
        page: state.page
    }
}

export default connect(mapStateToProps)(User)



