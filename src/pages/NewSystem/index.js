// import React, { Component } from 'react';

// import Navbar from '../../components/Navbar';

// import api from '../../services/api';

// import Dropzone from 'react-dropzone';

// import './styles.css';

// export default class NewSystem extends Component {
//     state = {
//         system: {

//         },
//         token: '',
//         isError: false,
//         error: ''
//     }

//     componentDidMount() {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             this.props.history.push(`/`);
//         } else {
//             this.setState({ token: token }, () => this.getAllSystems());
//         }
//     }


//     render() {
//         return (
//             <div>
//                 <Navbar history={this.props.history} />
//                 <div className="container-fluid">
//                     <div className="row" style={{ marginTop: 10 }}>
//                         <div className="col-md-6">
//                             <form onSubmit={this.saveVersion}>
//                                 {
//                                     this.state.isError
//                                         ?
//                                         <div className="alert alert-danger alert-dismissible offset-sm-2 col-sm-8" role="alert">
//                                             {this.state.error}
//                                             <button type="button" className="close" onClick={e => {
//                                                 e.preventDefault();
//                                                 this.setState({ isError: false, error: '' })
//                                             }
//                                             }>
//                                                 <span aria-hidden="true">&times;</span>
//                                             </button>
//                                         </div>
//                                         :
//                                         null
//                                 }
//                                 <div className="form-group">
//                                     <label htmlFor="aplicacao">Aplicação</label>
//                                     <select className="form-control" id="aplicacao" onChange={this.handleApplicationChange} value={this.state.version.systemVersion}>
//                                         {this.state.systems.map((element, index) => {
//                                             return <option key={element._id} value={element}>{element.name}</option>
//                                         })}
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="versao">Versão</label>
//                                     <input type="text" className="form-control" id="versao" placeholder="1.0.0.0" onChange={this.handleVersionChange} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="mudancas">Alterações</label>
//                                     <textarea className="form-control" id="mudancas" rows="3" onChange={this.handleNotesChange}></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="mudancas">Arquivo</label>
//                                     <Dropzone onDropAccepted={this.handleUpload}>
//                                         {({ getRootProps, getInputProps }) => (
//                                             <div className="upload" {...getRootProps()}>
//                                                 <input {...getInputProps()} />
//                                                 <p>Arraste arquivos ou clique aqui!</p>
//                                                 {this.state.binary ? <p>{this.state.binary.path}</p> : undefined}
//                                             </div>
//                                         )}
//                                     </Dropzone>
//                                 </div>
//                                 <button className="btn btn-primary my-2 my-sm-0" type="submit">Adicionar</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
