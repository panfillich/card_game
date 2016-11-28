import React from 'react';

class App extends React.Component{
    render(){
        return <p>Hello I'm a {this.props.name}</p>
    }
}

export default App