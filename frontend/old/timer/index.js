import React from 'react';

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {seconds: 0};
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    tick(){
        this.setState({
            seconds : this.state.seconds + 1
        });
    }

    render(){
        return (
            <h4>Уже прошло секунд {this.state.seconds}</h4>
        )
    }

    componentWillMount(){
        clearInterval(this.timer);
    }
}


export default Timer