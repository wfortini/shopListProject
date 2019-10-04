import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from './components/login/Login';
import FormDados from './components/cadastro/FormDados';
import  FormCadastro from './components/cadastro/FormCadastro';
import FormEmail from './components/login/FormEmail';
import FormPassword from './components/login/FormPassword';
import Start from './components/login/Start';
import Menu from './components/Menu';

export default props => (

    <Router>        
        <Scene key='root' >
           <Scene key='formLogin' component={Start} title="Login" initial hideNavBar={true} />             
           <Scene key='Menu' component={Menu}  title='Menu' hideNavBar={true} />
           <Scene key='formDados' component={FormDados}  title='dados' hideNavBar={true} />
           <Scene key='formEmail' component={FormEmail}  title='Email' hideNavBar={true} />
           <Scene key='formPassword' component={FormPassword}  title='Password' hideNavBar={true} />
           <Scene key='formCadastro' component={FormCadastro}  title='cadastro' hideNavBar={true} />
        </Scene>        
    </Router>
);
