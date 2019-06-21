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
        let exists = undefined;
        let user = undefined;
        return new Promise((resolve, reject) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(fbToken);
              auth.signInWithCredential(credential)
                   .then((userCredential) => {
                       user = userCredential.user;
                       if(!user){
                           exists = false;
                           reject();
                       }
                       exists = true;
                       getUser(user.uid)
                       .then((userInstance) => {                           
                           if(!!userInstance){
                                auth.currentUser.getIdToken(/* forceRefresh */ true)
                                .then((idToken) => {
                                    dispatch({type: t.LOGGED_IN, user : userInstance, idToken});
                                    resolve(exists, userInstance);                                                                
                                }).catch((error) => {
                                    console.log(`error get token ${error}`);
                                });
                           }
                       }).catch((error) => {
                           if(error.message.indexOf('404') > 0) {
                                let newUser = {id: user.uid, name: user.displayName, username: user.email}
                                registerUser(newUser)
                                .then((result) => {
                                    if(!!result){
                                        auth.currentUser.getIdToken(/* forceRefresh */ true)
                                        .then((idToken) => {
                                            dispatch({type: t.LOGGED_IN, user: result, idToken});
                                            resolve(exists, result);                                                                            
                                        }).catch((error) => {
                                            console.log(`error get token ${error}`);
                                        });
                                    }
                                    
                                }).catch((error) => {
                                    console.log(`Erro http ${error.message}`);
                                    console.log(`Erro http response ${error.response}`);
                                });
                           }else{
                               console.log(`result ${JSON.stringify(error, null, 4)}`); 
                           }
                          
                       });  // fim getUser                   
                        
                   }).catch((error) => { // catch signInWithCredential
                       console.log(error); 
                      reject(error)});

        }); // new Promise
    }
}

export function login(data) {

    return (dispatch) =>{
        return new Promise((resolve, reject) =>{
            const {email, password} = data;
            auth.signInWithEmailAndPassword(email, password)
             .then((resp) => {
                console.log(`response  ${JSON.stringify(resp, null, 4)}`); 
                let {user} = resp;
                getUser(user.uid)
                .then((result) => {
                    if(!!result.data){
                       user = result.data;
                       dispatch({type: t.LOGGED_IN, user});
                       var exists = true;
                       resolve({exists, user});
                    }

                }).catch((error) => {

                });
             }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
             });
        }
    }

}

function registerUser(user) {
        return request.post('/api/user', user);
}
function getUser(uid){
    return request.get(`/api/user/${uid}`);
}
