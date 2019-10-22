import {Link} from 'react-router-dom';
import React from 'react';
import Fonte from '../../assets/css/font.css'

function Nav(){
        return(
            <nav style={Fonte}>
                <ul>
                    <li> 
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/lancamento">Lançamentos</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        );                                                                                                                                                                
    }

export default Nav; 