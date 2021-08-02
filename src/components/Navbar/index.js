import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

export default class Navbar extends Component {
    state = {
        navCollapsed: true,
    }

    _onToggleNav = () => {
        this.setState({ navCollapsed: !this.state.navCollapsed })
    }

    performLogout = (e) => {
        e.preventDefault();

        sessionStorage.removeItem('token');

        this.props.history.push(`/`);

    }

    render() {
        const { navCollapsed } = this.state;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-sej">
          
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" onClick={this._onToggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={(navCollapsed ? 'collapse' : '') + ' navbar-collapse'} id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* <Link className={this.props.history.location.pathname === '/users' ? "nav-item nav-link active" : "nav-item nav-link"} to="/users">Usuários</Link> */}
                        {/* <Link className={this.props.history.location.pathname === '/systems' ? "nav-item nav-link active" : "nav-item nav-link"} to="/systems">Sistemas</Link> */}
                        {/* <Link className={this.props.history.location.pathname === '/versions' ? "nav-item nav-link active" : "nav-item nav-link"} to="/versions">Versões</Link> */}
                    </div>
                </div>
                <form className="form-inline my-2 my-lg-0" onSubmit={this.performLogout}>
                    <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" name="btn-logout">Sair</button>
                </form>
            </nav>
        );
    }
}
