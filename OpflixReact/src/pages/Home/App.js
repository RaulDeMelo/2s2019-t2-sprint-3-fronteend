import Logo from '../../assets/img/logo_opflix.svg'
import Nav from '../../components/Nav/Nav';
import React from 'react';
import '../../assets/css/stylesheet.css';

function App(){
  return(
    <div>
        <Nav/>
        <img src={Logo} alt="Logo da Opflix"/>
        <p className="font_opflix">Sua plataforma de lançamentos favorita.</p>
    </div>
  );
}

export default App;
