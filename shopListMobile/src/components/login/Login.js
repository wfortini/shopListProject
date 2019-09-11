import React, {Component} from 'react';
import PropTypes from 'prop-types';

const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;

import Dimensions from 'Dimensions';

import {  StyleSheet,  TouchableOpacity,  Text,  ActivityIndicator,  Easing,  Image,  Alert,  View,
  ImageBackground, KeyboardAvoidingView, TextInput,  } from 'react-native';

import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, signInWithFacebook, login } from '../../actions/AutenticacaoActions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { SocialIcon, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import spinner from '../../images/loading.gif';
import bgSrc from '../../images/Blue-watercolor-wet-background-vector-03.jpg';

import { Actions } from 'react-native-router-flux';

const Login = props => { 
  
     onRenderBtnAcessar = ()  => {
           if( props.loading_login ){
             return (
                  <ActivityIndicator size="large" />
             )
           }
           return  (
                     <Button buttonStyle={styles.button} type="outline" title="Entrar"
                          onPress={ this.onLogin }  /> 
           )
           
     }

    onLogin = () => {          
          const data = {
              email: props.email,
              password: props.senha
          };

          props.login(data)
          .then((exists, user) => {
              if(exists) Actions.home();
          })         

    }

    onSubmit = () => {
      LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {             
           if(result.isCancelled){
             alert("Cancelado");
           }else{
                AccessToken.getCurrentAccessToken().then((data) => {                  
                  props.signInWithFacebook(data.accessToken).then(({exists, user}) => {

                    if(exists) alert("sucesso");
                  });
                }).catch((error) => console.log(error.message))
           }
      })

    }

    
    return (
              <View style={styles.container} >       

                  <View style={styles.constainerHeader}>
                      <Icon
                        name='cart-arrow-down'
                        size={90}
                        color='#4169E1'
                      />
                      <Text>ShopList</Text>
                  </View>
          
            
                 <View  style={[styles.containerInput]}>
                                   
                    <Input  placeholder="Usuário"
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            returnKeyType={'none'}
                            value={props.email}                    
                            onChangeText={texto => props.modificaEmail(texto) }
                            inputStyle={ {fontSize: 16, paddingLeft: 10 } }
                            containerStyle={ styles.input } 
                            underlineColorAndroid='transparent'
                            leftIcon={
                              <Icon
                                name='user'
                                size={20}
                                color='#4169E1'
                              />
                            }
                    />
                    </View>
                    <View  style={[styles.containerInput]}>              
                     <Input placeholder={"Password"}
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            value={props.senha}                        
                            underlineColorAndroid="transparent"
                            onChangeText={texto => props.modificaSenha(texto) }
                            inputStyle={ {fontSize: 16, paddingLeft: 10 } }                            
                            containerStyle={ styles.input } 
                            leftIcon={
                            <Icon
                              name='lock'
                              size={20}
                              color='#4169E1'
                            />
                          }
                        />
                     </View>
                     <View style={styles.constainerCreater}>
                        <TouchableOpacity onPress={() => Actions.formCadastro() }>
                             <Text style={ [ styles.textLabel, { paddingLeft: 40 } ] }>Criar sua conta</Text>
                        </TouchableOpacity >
                        <TouchableOpacity >
                            <Text style={ [ styles.textLabel, { paddingRight : 55 } ] }>Esqueceu sua senha?</Text>
                      </TouchableOpacity >
                  </View>           
                  
                 <View style={styles.constainerButton} > 
                    { this.onRenderBtnAcessar() }
                 </View> 
                 <View style={ {flex: 2, alignContent: 'center'} } >
                    <View style={ styles.containerSocial }>       
                        <Text style={ {padding: 20, fontSize: 16} }  >Entrar com login social?</Text>

                        <SocialIcon  type='facebook' onPress={this.onSubmit} />
                    </View>
                    
                 </View>
             </View>        
       
    );

    

}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        password: state.AutenticacaoReducer.senha,
        loading_login: state.AutenticacaoReducer.loading_login

    }
)

export default connect(mapStateToProps, { modificaEmail,
                       modificaSenha,
                       signInWithFacebook,
                       login })(Login);


const styles = StyleSheet.create({
  container:{
    flex: 1,
    //backgroundColor: '#2EFEF7'
  },
  containerInput:{
    flex: 1,
    //backgroundColor: '#0431B4', 
    alignItems: 'center',
    justifyContent: 'center',  
  },
  constainerHeader:{
    flex:3,
   // backgroundColor: '#FF0040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  constainerButton:{
    flex: 1,    
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  constainerCreater:{
    flex: 1,
    flexDirection: 'row',
      
  },

  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  input: {
    width: DEVICE_WIDTH - 40,
    height: 50,    
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 16,
    borderColor: '#4169E1',    

  },
  textLabel: {    
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingLeft: 30,
    paddingTop: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',    
    height: 50,
    borderRadius: 20,    
    width: DEVICE_WIDTH - 40,

  },
  containerSocial:{
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center'
    
  }



});
