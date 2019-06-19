import {auth, database, provider} from "../config/Firebase";
import * as t from '../config/ActionTypes';
import * as firebase from 'firebase';
import request from '../services/Request';

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
                    let user = {id: resp.user.uid, name: username, username: username}
                    registerUser(user)
                    .then((result) => {

                        if(!!result){
                            auth.currentUser.getIdToken(/* forceRefresh */ true)
                            .then((idToken) => {
                                dispatch({type: t.LOGGED_IN, user, idToken});
                                resolve(user);
                                                                
                            }).catch((error) => {
                                console.log(`error get token ${error}`);
                            });
                        }
                        
                    }).catch((error) => {
                          console.log(`Erro http ${error.message}`);
                          console.log(`Erro http response ${error.response}`);
                    });                    
                    
                }).catch((error) => { // catch  createUserWithEmailAndPassword
                      
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/email-already-in-use') {
                      alert('Email já em uso.');
                    } else if (errorCode === 'auth/invalid-email') {
                         alert('Email invalido.');
                    } else if(errorCode === 'auth/operation-not-allowed'){
                        alert('Operação não permitida, habilite funcionalidade no FireBase');
                    } else if(errorCode === 'auth/weak-password'){
                        alert('Password muito fraco.');
                    }else{
                        alert('Ocorreu um erro durante criação do usuario');
                    }
                });
        })
    };
}

export function signInWithFacebook(fbToken) {
    return (dispatch) => {

        return new Promise((resolve, reject) => {
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

function registerUser(user) {
        return request.post('/api/user', user);
}
