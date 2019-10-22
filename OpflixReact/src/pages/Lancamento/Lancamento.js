import Axios from 'axios';
import React,{Component} from 'react';
import Nav from '../../components/Nav/Nav';
import '../../assets/css/stylesheet.css';
import Fonte from '../../assets/css/font_text.css';
import {Link} from 'react-router-dom';
import {parseJwt} from "../../services/auth";

class Lancamento extends Component{
    constructor(){
        super();
        this.state = {
            lista: [
            ],
            "nome" : "",
            "idTipoUsuario": "",
            "idCategoria": "",
            "idTipoMetragem": "",
            "tempDuracao": "",
            "dataLancamento": "",
            "sinopse": "",
            "idPlataforma": ""
        };
    }

    componentDidMount(){
        this.listaAtt();
        this.setState({idTipoUsuario: parseJwt().idTipoUsuario});
        console.log(parseJwt());
    }
    
    stateNome = (event) =>{
        this.setState({nome: event.target.value});
    }
    stateIdCategoria = (event) =>{
        this.setState({idCategoria: event.target.value});
    }
    stateIdTipoMetragem = (event) =>{
        this.setState({idTipoMetragem: event.target.value});
    }
     stateTempDuracao = (event) =>{
         this.setState({tempDuracao: event.target.value});
     }
     stateDataLancamento = (event) =>{
         this.setState({dataLancamento: event.target.value});
        }
        stateSinopse = (event) =>{
            this.setState({sinopse: event.target.value});
        }
        stateIdPlataforma = (event) =>{
        this.setState({idPlataforma: event.target.value});
    }
    
    
    Cadastrar = (event) => {
       Axios.post("http://localhost:5000/api/lancamento/adminCad", {
           nome: this.state.nome,
           idCategoria: this.state.idCategoria,
           idTipoMetragem: this.state.idTipoMetragem,
           tempDuracao: this.state.tempDuracao,
           dataLancamento: this.state.dataLancamento,
           sinopse: this.state.sinopse,
           idPlataforma: this.state.idPlataforma})
    }
    

    listaAtt = () =>{
        fetch('http://localhost:5000/api/lancamento',{
            method: 'GET',
             headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : 'Bearer' + localStorage.getItem('usuario-opflix')
             }
         })
             .then(response => response.json())
             .then(data => this.setState({ lista: data}));
     }
    render(){
        return(
            <div>
                <Nav/>
                <h1 style={Fonte}>
                    Lancamentos
                </h1>
                <thead>
                    <tr>
                        <th>Lançamento</th>
                        <th>Categoria</th>
                        <th>Tipo de metragem</th>
                        <th>Tempo de duração</th>
                        <th>Data de lançamento</th>
                        <th>Sinopse</th>
                        <th>Plataforma</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.lista.map(element =>{
                    return(
                        <tr key={element.idLancamento}>
                            <td style={Fonte}>{element.nome}</td>
                            <td style={Fonte}>{element.idCategoria}</td>
                            <td style={Fonte}>{element.idTipoMetragem}</td>
                            <td style={Fonte}>{element.tempDuracao}</td>
                            <td style={Fonte}>{element.dataLancamento}</td>
                            <td style={Fonte}>{element.sinopse}</td>
                            <td style={Fonte}>{element.idPlataforma}</td>
                        </tr>
                    )
                })}
                </tbody>
                    {(this.state.idTipoUsuario === 2) ? 
                        (
                    <h4>
                        <Link>
                            Deseja cadastrar algum filme? Clique aqui!
                        </Link>
                    </h4>
                        ) : ""}
                <form onSubmit={this.Cadastrar}>
                    <input className="" placeholder="Nome" onInput={this.stateNome} name="nome"/>
                    <input className="" placeholder="Id da categoria" onInput={this.stateIdCategoria} name="nome"/>
                    <input className="" placeholder="Id do tipo de metragem" onInput={this.stateIdTipoMetragem} name="nome"/>
                    <input className="" placeholder="Tempo de duração" onInput={this.stateTempDuracao} name="nome"/>
                    <input className="" placeholder="Data de lançamento" onInput={this.stateDataLancamento} name="nome"/>
                    <input className="" type="textarea" placeholder="Sinopse" onInput={this.stateSinopse} name="nome"/>
                    <input className="" placeholder="Id da plataforma" onInput={this.stateIdPlataforma} name="nome"/>
                    <button>Cadastrar</button>
                </form>
            </div>
        );
    }
}
export default Lancamento;