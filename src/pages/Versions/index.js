import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

import api from '../../services/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default class Versions extends Component {

    state = {
        versions: [],
        token: '',
    }

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        // console.log(this.props.history);
        // console.log(token);
        if (!token) {
            this.props.history.push(`/`);
        } else {
            this.setState({ token: token }, () => this.getAllSystems());
        }
    }

    async getAllSystems() {
        await api.get('/versions', {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                this.setState({ versions: response.data })
            })
            .catch(reason => {
                console.log(reason.response);
            })
    }

    goToNewVersionForm = (e) => {
        e.preventDefault();
        this.props.history.push('/versions/new');
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <h3 style={{ marginTop: 10, marginLeft: 10 }}>Versões</h3>
                        </div>
                        <div className="offset-md-8 col-md-2">
                            <div className="btn-group" role="group">
                                <button style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }} type="button" className="btn btn-primary" onClick={this.goToNewVersionForm}>
                                    Nova versão <FontAwesomeIcon icon={faUpload} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <caption>Lista de versões</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">Versão</th>
                                        <th scope="col">Sistema</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Alterações</th>
                                        {/* <th scope="col">Opções</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.versions.map((element, index) => (
                                            <tr key={element._id}>
                                                <td><a href={element.binary.url}>{element.tagVersion}</a></td>
                                                <td>{element.systemVersion.name}</td>
                                                <td><span data-toggle="tooltip" data-placement="top" title={new Date(element.createdAt).toLocaleString()}>há {distanceInWords(element.createdAt, new Date(), {
                                                    locale: pt
                                                })}</span></td>
                                                <td>
                                                    {element.releaseNotes}
                                                </td>
                                                {/* <td>
                                                    <div className="btn-group" role="group">
                                                        <a type="button" className="btn btn-outline-primary" href={element.binary.url}>
                                                            <FontAwesomeIcon icon={faDownload} />
                                                        </a>
                                                    </div>
                                                </td> */}
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
