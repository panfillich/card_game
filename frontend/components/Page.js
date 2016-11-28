import React, { PropTypes, Component } from 'react'

export default class Page extends Component {
    constructor(props){
        super(props)
        this.onYearBtnClick         = this.onYearBtnClick.bind(this);
        this.onYearBtnClickAsynk    = this.onYearBtnClickAsynk.bind(this);
    }
    onYearBtnClick(e) {
        this.props.setYear(e.target.innerText)
    }

    onYearBtnClickAsynk(e){
        this.props.getPhotos(e.target.innerText)
    }
    render() {
        const { year, photos } = this.props
        return <div>
            <p>
                <button onClick={this.onYearBtnClick}>2016 (common)</button>
                <button onClick={this.onYearBtnClickAsynk}>2016 (async)</button><br />

                <button onClick={this.onYearBtnClick}>2015 (common)</button>
                <button onClick={this.onYearBtnClickAsynk}>2015 (async)</button><br />

                <button onClick={this.onYearBtnClick}>2014 (common)</button>
                <button onClick={this.onYearBtnClickAsynk}>2014 (async)</button>
            </p>
            <h3>{year} год</h3>
            <p>У тебя {photos.length} фото.</p>
        </div>
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    setYear: PropTypes.func.isRequired,
    getPhotos: PropTypes.func.isRequired
}