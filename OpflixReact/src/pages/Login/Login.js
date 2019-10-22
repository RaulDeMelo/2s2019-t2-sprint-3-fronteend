import React,{Component} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Style from '../../assets/css/stylesheet_login.css';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            "nome": "",
            "email": "",
            "senha": "",
            "idTipoUsuario": 1,
            "erro": ""
        }
    }
    stateEmail = (event) =>{
        this.setState({email: event.target.value});
    }

    stateSenha = (event) =>{
        this.setState({senha: event.target.value});
    }

    stateNome = (event) =>{
        this.setState({nome: event.target.value});
    }
    
    Cadastro = (event) =>{
        Axios.post("http://localhost:5000/api/usuario/cad", {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
            }
        ).then(data =>{
                localStorage.setItem("usuario-opflix",data.data.token);
                this.props.history.push('/lancamento');
        })
    }

    Login = (event) =>{
        event.preventDefault();
        
        Axios.post("http://localhost:5000/api/usuario/authorize", {
            email: this.state.email, 
            senha: this.state.senha
        })
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data.token);
                    localStorage.setItem("usuario-opflix",response.data.token);
                    this.props.history.push('/lancamento');
                }
            })
            .catch(erro => { 
                this.setState({erro: "É possível que o usuário e/ou senha estejam inválidos; verifique novamente sua inscrição"});
            });
    }

    render(){
        return(
            <div>
                <Nav />
                <span >
                    <h1 className="font_opflix">
                    Opflix 
                    </h1>
                    <h2 className="font_opflix">
                        Já possui cadastro? Conecte-se aqui.
                    </h2>
                    <form onSubmit={this.Login}>
                        <input className="font_opflix"
                            placeholder="Email"
                            onInput={this.stateEmail}
                            type="text"
                            name="email"
                        />
                        <input
                            className="font_opflix"
                            onInput={this.stateSenha}
                            placeholder="Senha"
                            type="password"
                            name="senha"
                        />
                        {this.state.erro}
                        <button className="font_opflix">
                            Login
                        </button>
                    </form>
                    <h2 className="font_opflix">
                        Ainda não possui cadastro? Registre-se aqui.
                    </h2>
                    <form onSubmit={this.Cadastro}>
                        <input
                        className="font_opflix"
                        placeholder="Nome"
                        onInput={this.stateNome}
                        name="nome"
                        />
                        <input
                        className="font_opflix"
                        placeholder="Email"
                        onInput={this.stateEmail}
                        type="text"
                        name="email"                  
                        />
                        <input
                        className="font_opflix"
                        onInput={this.stateSenha}
                        placeholder="Senha"
                        type="password"
                        name="senha"
                        />
                        <input onInput={this.state.idTipoUsuario} type="hidden" name="tipousuario"/>
                        <button className="font_opflix">
                            Cadastrar
                        </button>
                    </form>
                </span>
                <h5>
                    <Link>
                    Caso queira cadastrar uma conta-administradora, clique aqui!
                    </Link>
                </h5>
            </div>
        );
    }
}
export default Login;