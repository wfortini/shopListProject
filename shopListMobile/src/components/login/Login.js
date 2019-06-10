import React, {Component} from 'react';
import PropTypes from 'prop-types';

const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;

import Dimensions from 'Dimensions';

import {  StyleSheet,  TouchableOpacity,  Text,  Animated,  Easing,  Image,  Alert,  View,
  ImageBackground, KeyboardAvoidingView, TextInput,  } from 'react-native';

import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, signInWithFacebook } from '../../actions/AutenticacaoActions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { SocialIcon, Divider} from 'react-native-elements';

import usernameImg from '../../images/username.png';
import passwordImg from '../../images/password.png';
import spinner from '../../images/loading.gif';
import bgSrc from '../../images/Blue-watercolor-wet-background-vector-03.jpg';

import { Actions } from 'react-native-router-flux';

const Login = props => {

    console.log(props);

    const buttonAnimated = new Animated.Value(0);
    const growAnimated = new Animated.Value(0);

    const changeWidth = buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

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

      <ImageBackground style={styles.picture} source={bgSrc}>

          <View style={styles.containerTitle}>
                <Text style={styles.text}>Vitriny</Text>
          </View>
          
             <KeyboardAvoidingView behavior="padding" style={styles.container}>
                 <View  style={styles.inputWrapper} >
                    <Image source={usernameImg} style={styles.inlineImg} />
                    <TextInput
                      style={styles.input}
                      placeholder="Usuário"
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'none'}
                      value={props.email}
                      placeholderTextColor="white"
                      underlineColorAndroid="transparent"
                      onChangeText={texto => props.modificaEmail(texto) }
                    />
                </View>
                <View style={styles.inputWrapper} >
                      <Image source={passwordImg} style={styles.inlineImg} />
                      <TextInput
                        style={styles.input}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        value={props.senha}
                        placeholderTextColor="white"
                        underlineColorAndroid="transparent"
                        onChangeText={texto => props.modificaSenha(texto) }
                      />
                  </View>
              </KeyboardAvoidingView>
                  <View style={styles.containerSign}>
                        <TouchableOpacity onPress={() => Actions.formCadastro() }>
                             <Text style={styles.textLabel}>Criar sua conta</Text>
                        </TouchableOpacity >
                        <TouchableOpacity >
                            <Text style={styles.textLabel}>Esqueceu sua senha?</Text>
                      </TouchableOpacity >
                  </View>
                 <View style={styles.containerButton}>
                   <Animated.View style={{width: changeWidth}}>
                        <TouchableOpacity
                          style={styles.button}
                          activeOpacity={1}>
                          {props.isLoading ? (
                            <Image source={spinner} style={styles.image} />
                          ) : (
                            <Text style={styles.textEnter}>ENTRAR</Text>
                          )}
                        </TouchableOpacity>
                         <Animated.View
                            style={[styles.circle, {transform: [{scale: changeScale}]}]}
                          />
                    </Animated.View>
                 </View> 
                 <TouchableOpacity onPress={this.onSubmit }>
                      <SocialIcon title='Entrar com Facebook!!!!!' button type='facebook'/> 
                 </TouchableOpacity >
                          
       </ImageBackground>
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
                       signInWithFacebook })(Login);


const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',

  },
  container: {
    flex: 1,   
    alignItems: 'center',
  },
  containerTitle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInput: {

  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 30,
    fontFamily: "Roboto",
  },
  textLabel: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,

  },
  containerButton: {
    flex: 1,
    top: -90,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  textEnter: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
    fontSize: 16,

  },
  inputWrapper: {
     flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  containerSign: {
    flex: 1,
    top: 50,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',    
  },
});
