import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

import api from '../../services/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEdit, faTrashAlt, faFile } from '@fortawesome/free-solid-svg-icons'

export default class Systems extends Component {

    state = {
        systems: [],
        token: '',
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        // console.log(token);
        if (!token) {
            this.props.history.push(`/`);
        } else {
            this.setState({ token: token }, () => this.getAllSystems());
        }
    }

    async getAllSystems() {
        await api.get('/systems', {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                this.setState({ systems: response.data })
            })
            .catch(reason => {
                console.log(reason.response);
            })
    }

    goToNewSystemForm = (e) => {
        e.preventDefault();
        this.props.history.push('/systems/new');
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="offset-md-1 col-md-2">
                            <h3 style={{ marginTop: 10 }}>Sistemas</h3>
                        </div>
                        <div className="offset-md-7 col-md-2">
                            <div className="btn-group" role="group">
                                <button style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }} type="button" className="btn btn-primary" onClick={this.goToNewSystemForm}>
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
                                        <th scope="col">Programador</th>
                                        <th scope="col">Opções</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.systems.map((element, index) => (
                                            <tr key={element._id}>
                                                <td>{element.name}</td>
                                                <td>{element.responsibleProgrammer}</td>
                                                <td>
                                                    <div className="btn-group" role="group">
                                                        <button type="button" className="btn btn-outline-warning">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button type="button" className="btn btn-outline-danger">
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
            </div>
        );
    }
}
