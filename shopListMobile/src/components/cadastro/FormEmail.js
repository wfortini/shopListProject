import React, {Component} from 'react';

import {  StyleSheet,  Text,  View, TextInput  } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { AppStyles } from '../../styles/AppStyles';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import {modificaEmail, 
        modificaNome, 
        modificaNomeUsuario,
        modificaSenha,
        register} from '../../actions/AutenticacaoActions';

import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const FormEmail = props => {

    console.log(props);

    onSubmit = () => {
      //this.setState({error: error}); //clear out error messages
      data = {
        email: props.email,
        password: props.password,
        username: props.nomeUsuario
      }
      console.log('data', data);
      props.register(data)
          .then(() => Actions.home())
          .catch((error) => console.log(error))
  }


    return (

      <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Criar nova conta</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail"
          onChangeText={texto => props.modificaEmail(texto) }
          value={props.Email}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Nome completo"
          onChangeText={texto => props.modificaNomeUsuario(texto) }
          value={props.nomeUsuario}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Senha"
          onChangeText={texto => props.modificaSenha(texto) }
          value={props.senha}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={texto => props.modificaSenha(texto) }
          value={props.senha}
          placeholderTextColor={AppStyles.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
        style={styles.facebookText} title="Cadastrar"
        onPress={this.onSubmit} ></Button>
    </View>

     
          
    );

}

const mapStateToProps = state => (
  {
      email: state.AutenticacaoReducer.email,
      password: state.AutenticacaoReducer.senha,
      nome: state.AutenticacaoReducer.nome,
      nomeUsuario: state.AutenticacaoReducer.nomeUsuario
  }
)

export default connect(mapStateToProps, 
  { modificaEmail, 
    modificaNome, 
    modificaNomeUsuario,
    modificaSenha,
    register })(FormEmail);


const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    height: 60,
    padding: 10,
    marginTop: 30,
    borderRadius: AppStyles.borderRadius.main

  },
  facebookText: {
    color: AppStyles.color.white
  },  
  containerTitle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  text: {
    paddingTop: 40,    
    fontWeight: 'bold',   
    marginTop: 20,
    fontSize: 30,
    fontFamily: "Roboto",
  },
  input: {    
    width: DEVICE_WIDTH - 10,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 20,    
    fontSize: 16,

  },
  inputWrapper: {
    flex: 1,
 },
 
});
