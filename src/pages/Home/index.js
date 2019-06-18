import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

import api from '../../services/api';

import { Button, Modal } from 'react-bootstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEdit, faTrashAlt, faFile } from '@fortawesome/free-solid-svg-icons'

// #97ca49

export default class Home extends Component {
    state = {
        token: null,
        user: {},
        users: [],
        show: false,
        selectedUser: {}
    }
    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push(`/`);
        } else {
            this.setState({ token: token, user: JSON.parse(atob(localStorage.getItem('loggedUser'))) }, () => this.getAllUsers());
        }
    }

    async getAllUsers() {
        await api.get('/users', {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(reason => {
                console.log(reason.response);
            })
    }

    goToUserForm = (e) => {
        e.preventDefault();
        this.props.history.push('/users/new');
    }
    goToUserEditForm = (user) => {
        localStorage.setItem('editUser', JSON.stringify(user));
        this.props.history.push(`/users/${user._id}/edit`);
    }

    handleClose() {
        this.setState({ ...this.state, show: false });
    }

    handleShow(user) {
        this.setState({ ...this.state, show: true, selectedUser: user });
    }


    async deleteUser() {
        await api.delete(`/users/${this.state.selectedUser._id}`, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                this.handleClose();
                this.getAllUsers();
            })
            .catch(reason => {
                console.log(reason.response);
            })
    }


    render() {
        return (
            <div>
                <Navbar history={this.props.history} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="offset-md-1">
                            <br />
                            <h3>Bem-vindo, {this.state.user.username}!</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-1 col-md-2">
                            <h3 style={{ marginTop: 10 }}>Usuários</h3>
                        </div>
                        <div className="offset-md-7 col-md-2">
                            <div className="btn-group" role="group">
                                <button style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }} type="button" className="btn btn-primary" onClick={this.goToUserForm}>
                                    Novo <FontAwesomeIcon icon={faFile} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-md-1 col-md-10">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">CPF</th>
                                        <th scope="col">Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((element, index) => (
                                            <tr key={element._id}>
                                                <td>{element.name}</td>
                                                <td>{element.username}</td>
                                                <td>{element.email}</td>
                                                <td>{element.cpf}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button type="button" className="btn btn-outline-warning" onClick={(e) => {
                                                            e.preventDefault();
                                                            this.goToUserEditForm(element);
                                                        }}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button type="button" className="btn btn-outline-danger" onClick={(e) => {
                                                            e.preventDefault();
                                                            this.handleShow(element);
                                                        }}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.show} onHide={(e) => {
                    e.preventDefault();
                    this.handleClose();
                }
                }>
                    <Modal.Header>
                        <Modal.Title>Deseja deletar {this.state.selectedUser.name}?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Esta operação não pode ser desfeita!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => {
                            e.preventDefault();
                            this.handleClose();
                        }
                        }>
                            Não
                        </Button>
                        <Button variant="primary" onClick={(e) => {
                            e.preventDefault();
                            this.deleteUser();
                        }
                        }>
                            Sim
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
