import React, {Component} from 'react';

import {  StyleSheet,  Text,  View, TextInput  } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { AppStyles } from '../../styles/AppStyles';
import { connect } from 'react-redux';
import {  Button, Divider, Input } from 'react-native-elements';

import {modificaEmail, 
        modificaNome, 
        modificaNomeUsuario,
        modificaSenha,
        register} from '../../actions/AutenticacaoActions';

import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

class  FormCadastro extends Component {    

    onSubmit = () => {
      //this.setState({error: error}); //clear out error messages
        data = {
        email: this.props.email,
        password: this.props.password,
        username: this.props.nomeUsuario
      }
      
      this.props.register(data)
          .then(() => Actions.home())
          .catch((error) => console.log(error))
  }

  render() {
           const  errorCadastro = this.props.errorCadastro;
           console.log('errorCadsatro', errorCadastro )

          return (

            <View style={styles.container}>
            <Text style={[styles.title]}>Criar nova conta</Text>
            <View style={{ paddingTop: 5 }} >
              <Input
                containerStyle={ styles.input } 
                inputStyle={ {fontSize: 16, } }
                placeholder="E-mail"
                onChangeText={texto => this.props.modificaEmail(texto) }
                value={ this.props.email }
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
              <Text>
                  
              </Text>
            </View>
            <View style={{ paddingTop: 10 }} >
            <Input
                containerStyle={ styles.input } 
                inputStyle={ {fontSize: 16, } }
                placeholder="Nome completo"
                onChangeText={texto => this.props.modificaNomeUsuario(texto) }
                value={ this.props.nomeUsuario}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{ paddingTop: 10 }} >
            <Input
                containerStyle={ styles.input } 
                inputStyle={ {fontSize: 16, } }
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={texto => this.props.modificaSenha(texto) }
                value={ this.props.senha }
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{ paddingTop: 10 }} >
            <Input
                containerStyle={ styles.input } 
                inputStyle={ {fontSize: 16, } }
                placeholder="Confirmar senha"
                secureTextEntry={true}
                onChangeText={texto => this.props.modificaSenha(texto) }
                value={ this.props.senha }
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
              <Text style={{ color: '#ff0000', fontSize: 20 }}>
                  {this.props.errorCadastro}
              </Text>
            </View>
            <View>
              <Button buttonStyle={[styles.buttonEnter, { marginTop: 50 }]}
                    title="Criar conta" onPress={this.onSubmit} ></Button>
            </View>
            <View style={ { flex: 1, alignItems: 'flex-start', width: DEVICE_WIDTH - 40, paddingTop: 5} }>
              <Text>Tem uma conta?</Text><Text style={{ fontWeight: "bold", }}>Entrar</Text>
            </View>
            <View style={ { flex: 1, alignItems: 'flex-start', width: DEVICE_WIDTH - 40, } }>
                <Text>Ao clicar em "Criar conta", você concorda com nossos Termo de uso e nossa Política de privacidade</Text>
            </View>

          </View>  
                
          );
     }

}

const mapStateToProps = state => {
  console.log('chamou mapStateToProps', state);
  return (
    {
      email: state.AutenticacaoReducer.email,
      password: state.AutenticacaoReducer.senha,
      nome: state.AutenticacaoReducer.nome,
      nomeUsuario: state.AutenticacaoReducer.nomeUsuario,
      errorCadastro: state.AutenticacaoReducer.errorCadastro
    }
  );
}


export default connect(mapStateToProps, 
  { modificaEmail, 
    modificaNome, 
    modificaNomeUsuario,
    modificaSenha,
    register })(FormCadastro);


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
    width: DEVICE_WIDTH - 20,
    height: 55, 
    paddingTop: 30

  },
  inputWrapper: {
    flex: 1,
 },
 buttonEnter: {
  alignItems: 'center',
  justifyContent: 'center',    
  height: 55,
  borderRadius: 10,    
  width: DEVICE_WIDTH - 40,
  backgroundColor: '#FF0040'

},
 
});
