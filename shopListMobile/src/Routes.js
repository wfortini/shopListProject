import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from './components/login/Login';
import  FormEmail  from './components/cadastro/FormEmail';
import FormDados from './components/cadastro/FormDados';
import  FormCadastro from './components/cadastro/FormCadastro';
import Menu from './components/Menu';

export default props => (

    <Router>        
        <Scene key='root' >
           <Scene key='formLogin' component={Login} title="Login" initial hideNavBar={true} />             
           <Scene key='Menu' component={Menu}  title='Menu' hideNavBar={true} />
           <Scene key='formDados' component={FormDados}  title='dados' hideNavBar={true} />
           <Scene key='formCadastro' component={FormCadastro}  title='cadastro' hideNavBar={true} />
        </Scene>        
    </Router>
);
