import * as t from '../config/ActionTypes';

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    nomeUsuario: '',
    isLoggedIn: false, 
    user: null
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);

    switch (action.type) {
        case t.LOGGED_IN:
            const user = action.user;

            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ]);

            return {...state, isLoggedIn: true, user };

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

        default:
            return state;
    }   
       
}
