import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Lancamento from './pages/Lancamento/Lancamento';
import Login from './pages/Login/Login';
import App from '././pages/Home/App';
import * as serviceWorker from './serviceWorker';

const RotaPrivada = ({component: Component}) =>(
    <Route
        render={props =>
            localStorage.getItem("usuario-opflix") !== null ? (
                <Component {...props} /> 
            ) : (
                <Redirect 
                    to={{ pathname: "/login", state: {from: props.location}}}
                />
            )
        }
    />        
);

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <RotaPrivada path='/lancamento' component={Lancamento}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
serviceWorker.unregister();
