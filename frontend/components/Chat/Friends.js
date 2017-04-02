import React, { Component } from 'react'

export default class Friends extends Component {
    render() {
        return (
            <div style={{ "overflow-y": "auto","width": "auto", "height": "150px"}}>
            <div style={{"margin-right":"7px"}}>
            <ul className="list-group">
                <li className="list-group-item justify-content-between">
                    Cras justo odio
                    <span className="badge badge-default badge-pill">14</span>
                </li>
                <li className="list-group-item justify-content-between">
                    Dapibus ac facilisis in
                    <span className="badge badge-default badge-pill">2</span>
                </li>
                <li className="list-group-item justify-content-between">
                    Morbi leo risus
                    <span className="badge badge-default badge-pill">1</span>
                </li>
                <li className="list-group-item justify-content-between">
                    Cras justo odio
                    <span className="badge badge-default badge-pill">14</span>
                </li>
                <li className="list-group-item justify-content-between">
                    Cras justo odio
                    <span className="badge badge-default badge-pill">14</span>
                </li>
            </ul>
            </div>
            </div>
            // <div className="list-group">
            //     <a href="#" className="list-group-item active">
            //         Cras justo odio
            //     </a>
            //     <a href="#" className="list-group-item list-group-item-action">
            //         Dapibus ac facilisis in
            //
            //     </a> <span className="badge badge-default badge-pill">14</span>
            //     <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
            //     <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
            //     <a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
            // </div>
        );
    }
}
