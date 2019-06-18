import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

import api from '../../services/api';

import Dropzone from 'react-dropzone';
import Select from 'react-select';

import './styles.css';

export default class NewVersion extends Component {
    state = {
        systems: [],
        version: {
            tagVersion: '',
            systemVersion: undefined,
            releaseNotes: ''
        },
        binary: undefined,
        token: '',
        isError: false,
        error: ''
    }

    optionsSelect = [];

    componentDidMount() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.props.history.push(`/`);
        } else {
            this.setState({ token: token }, () => this.getAllSystems());
        }
        // this.handleApplicationChange = this.handleApplicationChange.bind(this);
    }

    async getAllSystems() {
        await api.get('/systems', {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                response.data.map((el, index) =>
                    this.optionsSelect.push({ value: el, label: el.name })
                );
                this.setState({
                    version: {
                        tagVersion: this.state.version.tagVersion,
                        releaseNotes: this.state.version.releaseNotes,
                        systemVersion: response.data[0]
                    }
                })
            })
            .catch(reason => {
                this.setState({ ...this.state, isError: true, error: reason.response.data.error });
            })
    }

    saveVersion = (e) => {
        e.preventDefault();
        console.log(this.state.version);
        const data = new FormData();
        data.append('file', this.state.binary);
        this.setState({
            ...this.state, binary: data, version: {
                tagVersion: this.state.version.tagVersion,
                releaseNotes: this.state.version.releaseNotes,
                systemVersion: this.state.version.systemVersion.value
            }
        }, () => {

            api.post('/versions', this.state.version, {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                },
            }).then(response => {
                api.post(`/versions/${response.data._id}/binary`, this.state.binary, {
                    headers: {
                        'Authorization': `Bearer ${this.state.token}`
                    },
                }).then(response => {
                    this.props.history.push(`/versions`);
                }).catch(reason => {
                    this.setState({ ...this.state, isError: true, error: reason.response.data.error });
                });
            })
                .catch(reason => {
                    this.setState({ ...this.state, isError: true, error: reason.response.data.error });
                })
        });


    }

    handleUpload = (files) => {
        files.forEach(element => {
            // const data = new FormData();
            // data.append('file', element);
            console.log(element);
            this.setState({ ...this.state, binary: element });
        });
    }

    handleApplicationChange = (e) => {
        this.setState({
            ...this.state,
            version: {
                tagVersion: this.state.version.tagVersion,
                releaseNotes: this.state.version.releaseNotes,
                systemVersion: e
            }
        }, () => {
            console.log(this.state.version);
        });
    }

    handleVersionChange = (e) => {
        this.setState({
            ...this.state,
            version: {
                tagVersion: e.target.value,
                releaseNotes: this.state.version.releaseNotes,
                systemVersion: this.state.version.systemVersion
            }
        });
    }

    handleNotesChange = (e) => {
        this.setState({
            ...this.state,
            version: {
                tagVersion: this.state.version.tagVersion,
                releaseNotes: e.target.value,
                systemVersion: this.state.version.systemVersion
            }
        });
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} />
                <div className="container-fluid">
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="col-md-6">
                            <form onSubmit={this.saveVersion}>
                                {
                                    this.state.isError
                                        ?
                                        <div className="alert alert-danger alert-dismissible offset-sm-2 col-sm-8" role="alert">
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
                                    <label htmlFor="aplicacao">Aplicação</label>
                                    <Select
                                        id="aplicacao"
                                        value={this.state.version.systemVersion}
                                        onChange={this.handleApplicationChange}
                                        options={this.optionsSelect}
                                    />
                                    {/* 
                                    <select className="form-control" id="aplicacao" onChange={this.handleApplicationChange} value={this.state.version.systemVersion}>
                                        {this.state.systems.map((element, index) => {
                                            return <option key={element._id} value={index}>{element.name}</option>
                                        })}
                                    </select> */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="versao">Versão</label>
                                    <input type="text" className="form-control" id="versao" placeholder="1.0.0.0" onChange={this.handleVersionChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mudancas">Alterações</label>
                                    <textarea className="form-control" id="mudancas" rows="3" onChange={this.handleNotesChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mudancas">Arquivo</label>
                                    <Dropzone onDropAccepted={this.handleUpload}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div className="upload" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Arraste arquivos ou clique aqui!</p>
                                                {this.state.binary ? <p>{this.state.binary.path}</p> : undefined}
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                                <button className="btn btn-primary my-2 my-sm-0" type="submit">Adicionar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
