import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import api from '../../services/api';

import './styles.css';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        isError: false,
        error: ''
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.props.history.push(`/home`);
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();


        await api.post('/login', {
            username: this.state.username,
            password: this.state.password
        }).then((response) => {
            localStorage.setItem('loggedUser', btoa(JSON.stringify(response.data.user)));
            sessionStorage.setItem('token', response.data.token);
            this.props.history.push(`/home`);
        }).catch((reason) => {
            this.setState({ isError: true, error: reason.response.data.error, password: '' });
        });


    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row" style={{marginTop:50}}>
                    <div className="col"></div>
                    <div className="col text-center">
                        <form onSubmit={this.handleSubmit}>
                            {
                                this.state.isError
                                    ?
                                    <div name="alert" className="alert alert-danger alert-dismissible offset-sm-2 col-sm-8" role="alert">
                                        {this.state.error}
                                        <button type="button" className="close" onClick={e => {
                                            e.preventDefault();
                                            this.setState({ isError: false, error: '' })
                                        }
                                        }>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    :
                                    null
                            }
                            <div className="form-group">
                                <input type="text" id="username" className="form-control offset-sm-2 col-sm-8" placeholder="Nome de usuário"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="form-control offset-sm-2 col-sm-8" placeholder="Senha" 
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-sej col-sm-8" name="btn-login">Entrar!</button>

                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}
