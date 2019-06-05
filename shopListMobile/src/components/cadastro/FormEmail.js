import React, {Component} from 'react';

import {  StyleSheet,  Text,  View, TextInput, Button  } from 'react-native';

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

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

             <View style={{ flex: 3, alignItems: 'center' }}>
                    <Text style={styles.text}>Vitriny</Text>
             </View>

             <View  style={styles.inputWrapper} >
                    
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'none'}
                      value={props.email}
                      underlineColorAndroid="transparent"
                      onChangeText={texto => props.modificaEmail(texto) }
                    />
                </View>

                <View  style={styles.inputWrapper} >
                    
                    <TextInput
                      style={styles.input}
                      placeholder="Nome completo"
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'none'}
                      value={props.nome}
                      underlineColorAndroid="transparent"
                      onChangeText={texto => props.modificaNome(texto) }
                    />
                </View>

                <View  style={styles.inputWrapper} >
                    <TextInput
                      style={styles.input}
                      placeholder="Nome do usuário"
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'none'}
                      value={props.nomeUsuario}
                      underlineColorAndroid="transparent"
                      onChangeText={texto => props.modificaNomeUsuario(texto) }
                    />
                </View>

                <View  style={styles.inputWrapper} >                    
                    <TextInput
                      style={styles.input}
                      placeholder="Senha"
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      returnKeyType={'none'}
                      value={props.senha}                     
                      underlineColorAndroid="transparent"
                      onChangeText={texto => props.modificaSenha(texto) }
                    />
                </View>
                <View>
                  <Button                          
                          title="OK"
                          borderRadius={0}                  
                          onPress={this.onSubmit}/>
                </View>
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
    alignItems: 'center',
  },
  containerTitle: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  text: {
    paddingTop: 80,    
    fontWeight: 'bold',   
    marginTop: 20,
    fontSize: 30,
    fontFamily: "Roboto",
  },
  input: {    
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    
    fontSize: 16,

  },
  inputWrapper: {
    flex: 1,
 },
 
});
