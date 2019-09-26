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
                       dispatch( {type: t.CADASTRO_USUARIO_ERRO, errorCadastro: 'Email já em uso.'} );
                    } else if (errorCode === 'auth/invalid-email') {
                        dispatch( {type: t.CADASTRO_USUARIO_ERRO, errorCadastro: 'Email inválido.'} )                         
                    } else if(errorCode === 'auth/operation-not-allowed') {
                       dispatch( {type: t.CADASTRO_USUARIO_ERRO, errorCadastro: 'Operação não permitida, habilite funcionalidade no FireBase' } );                       
                    } else if(errorCode === 'auth/weak-password') {
                        dispatch( {type: t.CADASTRO_USUARIO_ERRO, errorCadastro: 'Password muito fraco'} );                        
                    }else{
                        dispach( {type: t.CADASTRO_USUARIO_ERRO, errorCadastro: 'Ocorreu um erro durante criação do usuario' } );
                    }
                });
        })
    };
}

export function signInWithFacebook(fbToken) {
    return (dispatch) => {        
        console.log(fbToken);
        return new Promise((resolve, reject) => {
              let exists = false;
              let user = undefined;
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
                                    console.log(` action ==== ${exists} ${userInstance}`)
                                    resolve( { exists, userInstance } );                                                                
                                }).catch((error) => {
                                    //TODO: tratar erro get Token firebase
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
                                            //TODO: tratar erro get Token firebase
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
                      handleErrorsignInWithCredential(error, dispatch);
                      console.log(error); 
                      reject(error)});

        }); // new Promise
    }
}

export function login(data) {

    return (dispatch) => {
        
        dispatch({ type: t.LOGIN_EM_ANDAMENTO });
        
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
                    //TODO: tratar erro getUser API
                });
             }).catch((error) => {                
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/invalid-email') {
                   dispatch({ type: t.LOGIN_USUARIO_ERRO, errorLogin: 'E-mail inválido.'});                 
                } else if (errorCode === 'auth/user-disabled') {
                    dispatch({ type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Usuário correspondente ao e-mail fornecido foi desativado.'}); 
                } else if(errorCode === 'auth/user-not-found'){
                    dispatch({ type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Não há usuário correspondente ao email fornecido.'});
                } else if(errorCode === 'auth/wrong-password'){
                    dispatch({ type: t.LOGIN_USUARIO_ERRO, errorLogin: 'A senha é inválida para o email fornecido ou a conta correspondente ao email não tem uma senha definida.'});
                }else{
                    dispatch({ type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Ocorreu erro ao efetuar login.'});
                }
             });
        });
    }

}

function registerUser(user) {
        return request.post('/api/user', user);
}
function getUser(uid){
    return request.get(`/api/user/${uid}`);
}

function handleErrorsignInWithCredential(error, dispatch){

    var errorCode = error.code;
    var errorMessage = error.message;
    if ( errorCode === 'auth/account-exists-with-different-credential' ) {
         dispatch( {type: t.LOGIN_USUARIO_ERRO, errorCode: 'Já existir uma conta com o endereço de email declarado pela credencial.'} )
    } else if( errorCode === 'auth/invalid-credential' ){
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Credencial malformatada ou expirada.'} );
    } else if ( errorCode === 'auth/operation-not-allowed' ){
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Tipo de conta correspondente à credencial não está ativado.'} );

    }  else if ( errorCode === 'auth/user-disabled' ){
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Usuário desabilitado.'} );
    }  else if ( errorCode === 'auth/user-not-found' ){
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Não há usuário para o email fornecido.'} );
    } else if ( errorCode === 'auth/wrong-password' ){
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Senha inválida para o email fornecido ou a conta correspondente ao email não tem uma senha definida.'} );
    } else if ( errorCode === 'auth/invalid-verification-code' ){
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Código de verificação da credencial inválido.'} );
    } else if ( errorCode === 'auth/invalid-verification-id' ){
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'ID de verificação da credencial inválido.'} );
    } else {
        dispatch( {type: t.LOGIN_USUARIO_ERRO, errorLogin: 'Ocorreu um erro durante atenticação do usuário.'} ); 
    }
}

function handleErrorCurrentUserFirebase(error, dispatch){

}


