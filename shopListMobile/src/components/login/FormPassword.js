import React, {Component} from 'react';

import Dimensions from 'Dimensions';

import {  StyleSheet,  TouchableOpacity,  Text, View } from 'react-native';

import { connect } from 'react-redux';
import { modificaSenha, login } from '../../actions/AutenticacaoActions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import {  Button, Divider, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/Entypo';

import { Actions } from 'react-native-router-flux';

class  FormPassword extends Component { 

        onLogin = () => {          
            const data = {
                email: props.email,
                password: props.senha
            };

            props.login(data)
            .then((exists, user) => {
                if(exists) Actions.Menu();
            })         

    }

    render() {
          return (
            <View style={styles.container} >       

                <View style={styles.constainerHeader}>                            
                    <Text style={{  fontSize: 20, paddingRight: 30 }}>Bem vindo (a) de volta!</Text>
                    <Text style={{  fontSize: 16 }}>Dígite seu email para fazer login.</Text>
                </View>                      
                <View  style={[styles.containerInput]}>  
                    
                    <Input placeholder={"Password"}
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            value={ this.props.password }                        
                            underlineColorAndroid="transparent"
                            onChangeText={texto => this.props.modificaSenha(texto) }
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
                        <View style={ {flex: 2, alignItems: 'flex-end', paddingLeft: DEVICE_WIDTH - 140 } } >
                            <Button  buttonStyle={styles.buttonEnter} onPress={() => Actions.formPassword() }
                                        icon={ <IconAnt name="arrow-right" size={20}
                                                color="white" />
                                            }
                                            title="Próximo"
                                            />
                    
                    </View>
                    </View>

                        <Text style={{  backgroundColor: 'transparent' }}>
                                { this.props.errorLogin }
                        </Text>                   
                
                </View>
          );
      }
}

const mapStateToProps = state => (
    {
        errorLogin: state.AutenticacaoReducer.errorLogin,
        password: state.AutenticacaoReducer.senha,
        email: state.AutenticacaoReducer.email,
    }
)

export default connect(mapStateToProps, { modificaSenha, login })(FormPassword);


const styles = StyleSheet.create({
  container:{
    flex: 1,   
  },
  containerInput:{
    flex: 2,   
    alignItems: 'center', 
    
  },
  constainerHeader:{
    flex:1,       
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  textLabel: {    
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingBottom: 25,
    paddingTop: 25 
   
  },
  label: {    
    backgroundColor: 'transparent',
    fontSize: 16,  
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',    
    height: 55,
    borderRadius: 10,    
    width: DEVICE_WIDTH - 40,    

  },
  buttonEnter: {
    alignItems: 'center',
    justifyContent: 'center',    
    height: 55,
    borderRadius: 10,    
    width: DEVICE_WIDTH - 400,
    backgroundColor: '#FF0040',    

  },
  input: {
    width: DEVICE_WIDTH - 20,
    height: 55, 
  },



});
