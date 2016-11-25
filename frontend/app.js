import React from 'react';

import {Link} from 'react-router';

class App extends React.Component {
    render(){
        return (
            <div className="App">
                <div className="menu-bar">
                    <div className="menu-item">
                        <Link to="/article/about-us">About</Link>
                    </div>
                </div>

                <div className="content">
                    {this.props.children}
                </div>

            </div>
        )
    }
}

export default App;