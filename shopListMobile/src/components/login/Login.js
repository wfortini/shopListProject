import React, {Component} from 'react';
import PropTypes from 'prop-types';

const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;

import Dimensions from 'Dimensions';

import {  StyleSheet,  TouchableOpacity,  Text,  Animated,  Easing,  Image,  Alert,  View,
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

            <View style={styles.container}  >

                  <View style={styles.constainerHeader}>
                      <Icon
                        name='cart-arrow-down'
                        size={90}
                        color='black'
                      />
                      <Text>ShopList</Text>
                  </View>
          
            
                 <View  style={[styles.containerInput, {justifyContent: 'center'}]}>
                                   
                    <Input  
                      style={styles.input}                   
                      placeholder="Usuário"
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'none'}
                      value={props.email}                    
                      onChangeText={texto => props.modificaEmail(texto) }
                      leftIcon={
                        <Icon
                          name='user'
                          size={24}
                          color='black'
                        />
                      }
                    />

                  </View>
                  <View  style={[styles.containerInput]}>
                    
                        <Input  
                          containerStyle={styles.input}                      
                          placeholder={"Password"}
                          secureTextEntry={true}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          returnKeyType={'done'}
                          value={props.senha}                        
                          underlineColorAndroid="transparent"
                          onChangeText={texto => props.modificaSenha(texto) }
                          leftIcon={
                            <Icon
                              name='lock'
                              size={24}
                              color='black'
                            />
                          }
                        />

                     <View style={styles.constainerCreater}>
                        <TouchableOpacity onPress={() => Actions.formCadastro() }>
                             <Text style={styles.textLabel}>Criar sua conta</Text>
                        </TouchableOpacity >
                        <TouchableOpacity >
                            <Text style={[styles.textLabel, {paddingLeft: 50}]}>Esqueceu sua senha?</Text>
                      </TouchableOpacity >
                  </View>

                </View>
                
            
                  
                 <View style={styles.constainerButton} >
                     <Button style={styles.button}>
                       
                        <Text >Entrat</Text>
                     </Button>
                 </View> 
                 
                  
                 
             </View>        
       
    );

    

}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        password: state.AutenticacaoReducer.senha
    }
)

export default connect(mapStateToProps, { modificaEmail,
                       modificaSenha,
                       signInWithFacebook,
                       login })(Login);


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#2EFEF7'
  },
  containerInput:{
    flex: 1,
    backgroundColor: '#0431B4',   
  },
  constainerHeader:{
    flex:2,
    backgroundColor: '#FF0040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  constainerButton:{
    flex: 2,
    backgroundColor: '#F5DA81'
  },
  constainerCreater:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#0431B4'
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
    fontSize: 16,

  },
  textLabel: {
    color: '#000000',
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingLeft: 17,
    paddingTop: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',    
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,

  },



});
