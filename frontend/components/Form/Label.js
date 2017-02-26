class Label extends Component {
    render() {
        return (
            <label className="form-control-label" htmlFor={this.props.for}>
                {this.props.text}
            </label>
        );
    }
}