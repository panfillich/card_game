import React from 'react';

import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            red  :  0,
            green:  0,
            blue : 0,

            txt: 'this is the state txt',
            cat: 0,

            val: 0
        };
        this.update = this.update.bind(this)
    }

    update(e){
        this.setState({
            red:    ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
            green:  ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
            blue:   ReactDOM.findDOMNode(this.refs.blue.refs.inp).value,
            // txt: e.target.value,
            val: (this.state.val + 1)
        });
    }

    render(){
        console.log('rendering!');
        // return <div>Hello12</div>;
        // return React.createElement('h1',null, 'Hello');

        let txt = this.props.txt;

        return (
          <div>


            <Button onClick={this.update}> I {this.state.val} <Heart/> React </Button>

            {this.state.txt}
            <hr />
            <Slider ref="red" update={this.update} />
              {this.state.red} <br />
            <Slider ref="green" update={this.update} />
              {this.state.green} <br />
            <Slider ref="blue" update={this.update} />
              {this.state.blue} <br />
            <hr />
            <Widget txt={this.state.txt} update={this.update}/>
            <Widget txt={this.state.txt} update={this.update}/>
            <Widget txt={this.state.txt} update={this.update}/>
          </div>
        );
    }
}

App.protoTypes = {
    txt: React.PropTypes.string,
    cat: React.PropTypes.number.isRequired
}

App.defaultProps ={
    txt: 'this is the default text',
    cat: 4
}

class Button extends React.Component{
    constructor(){
        super();
        this.state = {val: 0};
        this.update = this.update.bind(this)
    }

    update(e){
        this.setState({
            val: (this.state.val + 1)
        });
    }

    componentWillMount(){
        console.log('mounting');
    }

    componentDidMount(){
        console.log('mounted');
    }

    componentWillUnmount(){
        console.log('bue!');
    }

    render(){
        return (<button onClick={this.update}>{this.state.val}{this.props.children}</button>)
    }
}

class Wrapper extends React.Component {
    constructor(){
        super();
    }

    mount(){
        ReactDOM.render(<Button />, document.getElementById('a'))
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

//span.glyphicon.glyphicon-heart
const Heart = () => <span className = "glyphicon glyphicon-heart"></span>

class Slider extends React.Component{
    render(){
        return (
            <div>
                <input
                    ref="inp"
                    type="range"
                    min="0"
                    max="255"
                    onChange={this.props.update}
                />
            </div>
        )
    }
}


const Widget = (props) => {
    return (
        <div>
            <h1>Hello World!</h1>
            <input type="text"
                   onChange={props.update}/>
            <p>Text(txt): {props.txt}</p>
        </div>
    );
}

export default App