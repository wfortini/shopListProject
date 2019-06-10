import {auth, database, provider} from "../config/Firebase";
import * as t from '../config/ActionTypes';
import * as firebase from 'firebase';

import {AsyncStorage} from 'react-native';


export const modificaEmail = (texto) => {
    return {
        type: t.MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: t.MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: t.MODIFICA_NOME,
        payload: texto
    }
}

export const modificaNomeUsuario = (texto) => {
    console.log(texto);
    return {
        type: t.MODIFICA_NOME_USUARIO,
        payload: texto
    }
}


//Register the user using email and password
export function register(data) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const {email, password, username} = data;
            auth.createUserWithEmailAndPassword(email, password)
                .then((resp) => {
                    let user = {username, uid: resp.user.uid}
                    const userRef = database.ref().child('users');

                    userRef.child(user.uid).update({...user})
                        .then(() => {
                            dispatch({type: t.LOGGED_IN, user});
                            resolve(user)
                        })
                        .catch((error) => reject({message: error}));
                })
                .catch((error) => reject(error));
        })
    };
}

export function signInWithFacebook(fbToken) {
    return (dispatch) => {

        return new Promise((resolve, reject) => {
            console.log(fbToken);
              //const credential = provider.credential(fbToken);
              const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
              auth.signInWithCredential(credential)
                   .then((userCredential) => {
                       var user = userCredential.user;
                       // obter user do backend se existir
                       // se não exitir, incluir
                       const exists = false; // verificar no backend
                       console.log(`facebook === ${user}`);
                       console.log(user.uid);
                       console.log(user.displayName);
                       console.log(user.toJSON());
                       if(!exists){
                           // incluir backend
                       }

                       if(exists){
                           user = user; // user retornada do backend
                       }

                       if(exists){
                           dispatch({type: t.LOGGED_IN, user});
                        }
                        resolve({exists, user});
                        
                   }).catch((error) => {
                       console.log(error); 
                      reject(error)});

        }); // new Promise
    }
}
