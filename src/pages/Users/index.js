import React, { Component } from 'react';
import Navbar from '../../components/Navbar';


export default class Users extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history}/>
            </div>
        );
    }
}
