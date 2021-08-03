import React, { Component } from 'react';
import api from '../../services/api';

import Navbar from '../../components/Navbar';

import './styles.css';

export default class NewUser extends Component {
    state = {
        _id: undefined,
        name: '',
        email: '',
        username: '',
        password: '',
        cpf: '',
        passwordConfirmation: '',
        isError: false,
        error: ''
    }

    componentWillUnmount() {
        localStorage.removeItem('editUser');
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.password !== this.state.passwordConfirmation) {
            this.setState({ isError: true, error: "Non-matching password confirmation" });
        } else {

            const user = {
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password?this.state.password:undefined,
                cpf: this.state.cpf
            };

            if (this.state._id) {
                console.log(user);
                await api.put(`/users/${this.state._id}`, user).then((response) => {
                    // alert('User updated successfully!');
                    this.props.history.push(`/home`);
                }).catch((reason) => {
                    console.log(reason);
                    this.setState({ isError: true, error: reason.response.data.error, password: '', passwordConfirmation: '' });
                });
            } else {
                await api.post('/users', user).then((response) => {
                    // alert('User created successfully!');
                    this.props.history.push(`/home`);
                }).catch((reason) => {
                    console.log(reason);
                    this.setState({ isError: true, error: reason.response.data.error, password: '', passwordConfirmation: '' });
                });
            }
        }


    }
    handleInputChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('editUser'));
        if (user) {
            this.setState({ ...this.state, ...user });
        }
    }

    render() {
        return (
            <>
                <Navbar history={this.props.history} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col text-center">
                            <form onSubmit={this.handleSubmit}>
                                <h2 style={{ marginTop: 20 }}>Crie sua conta!</h2>
                                {
                                    this.state.isError
                                        ?
                                        <div className="alert alert-danger alert-dismissible offset-sm-2 col-sm-8" role="alert" id="alert">
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
                                    <input type="text" className="form-control" placeholder="Nome" name="name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Email" name="email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Nome de usuário" name="username"
                                        value={this.state.username}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Senha" name="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Confirmação de senha" name="passwordConfirmation"
                                        value={this.state.passwordConfirmation}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="CPF" name="cpf"
                                        value={this.state.cpf}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-sej col-sm-8" name="btn-save">{this.state._id ? <span>Salvar!</span> : <span>Criar!</span>}</button>

                            </form>
                        </div>
                        <div className="col"></div>
                    </div>
                </div >
            </>
        );
    }
}
