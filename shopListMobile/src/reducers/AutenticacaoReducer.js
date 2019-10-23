import * as t from '../config/ActionTypes';
import {AsyncStorage} from 'react-native';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    nomeUsuario: '',
    isLoggedIn: false, 
    user: null,
    loading_login: false,
    loading_social: false,
    loading_cadastro: false,
    errorLogin: '',
    errorCadastro: ''
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case t.LOGGED_IN:
            const user = action.user;
            const token = action.idToken;
            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['@user', JSON.stringify(user)],
                ['@token', token],
            ]);

            return {...state, isLoggedIn: true, user, loading_login: false };

        case t.LOGGED_OUT:
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);

            return {...state, isLoggedIn: false, user: null};

        case t.MODIFICA_EMAIL:
            return { ...state, email: action.payload };

        case t.MODIFICA_SENHA:
            return { ...state, senha: action.payload };

        case t.MODIFICA_NOME:
            return { ...state, nome: action.payload };

        case t.MODIFICA_NOME_USUARIO:
            return { ...state, nomeUsuario: action.payload };

        case t.LOGIN_EM_ANDAMENTO:
            return { ...state, loading_login: true };

        case t.LOGIN_SOCIAL_EM_ANDAMENTO:
            return { ...state, loading_social: true };
            
        case t.CADASTRO_EM_ANDAMENTO:
            console.log('=======', state);
            return { ...state, loading_cadastro: true };

        case t.LOGIN_USUARIO_ERRO:
            return { ...state, errorLogin: action.payload, loading_login: false };

        case t.LOGIN_SOCIAL_ERRO:
            return { ...state, errorLogin: action.payload, loading_social: false };

        case t.CADASTRO_USUARIO_ERRO:
            return { ...state, errorCadastro: action.payload, loading_cadastro: false};

        default:
            return state;
    }   
       
}
