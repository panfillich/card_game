import React from 'react';

import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            val: 0,
            increasing: false
        }
        this.update = this.update.bind(this)
    }

    update(e){
        this.setState({
            val: (this.state.val + 1)
        });
    }

    componentWillMount(){
        // console.log('mounting');
        this.setState({m:2})
    }

    componentDidMount(){
        // console.log('mounted');
        this.inc = setInterval(this.update, 500)
    }

    componentWillUnmount(){
        // console.log('bue!');
        clearInterval(this.inc)
    }

    render(){
        console.log('rendering')
        return (
            <button onClick={this.update}>
                {this.state.val * this.state.m}{this.props.children}
            </button>
        )
    }
}

App.defaultProps = {val : 0}

class Wrapper extends React.Component {
    constructor(){
        super();
    }

    mount(){
        ReactDOM.render(<App />, document.getElementById('a'))
    }

    unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    }

    render(){
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>UnMount</button>
                <div id="a"></div>
            </div>
        )
    }
}


export default Wrapper