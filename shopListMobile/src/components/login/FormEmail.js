import React, {Component} from 'react';

import Dimensions from 'Dimensions';

import {  StyleSheet,  TouchableOpacity,  Text, View } from 'react-native';

import { connect } from 'react-redux';
import { modificaEmail  } from '../../actions/AutenticacaoActions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { SocialIcon, Button, Divider, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { Actions } from 'react-native-router-flux';

class  FormEmail extends Component { 



    render() {
          return (
                    <View style={styles.container} >       

                        <View style={styles.constainerHeader}>                            
                            <Text style={{  fontSize: 20, paddingRight: 30 }}>Bem vindo (a) de volta!</Text>
                            <Text style={{  fontSize: 16 }}>Dígite seu email para fazer login.</Text>
                       </View>                      
                      <View  style={[styles.containerInput]}>  
                            
                             <Input  placeholder="Usuário"
                                  autoCorrect={false}
                                  autoCapitalize={'none'}
                                  returnKeyType={'none'}
                                  value={ this.props.email }                    
                                  onChangeText={texto => this.props.modificaEmail(texto) }
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

                            <Text style={{  backgroundColor: 'transparent' }}>
                                  { this.props.errorLogin }
                            </Text> 
                           
                     </View>
                     <View style={ {flex: 1, alignContent: 'center', alignItems: 'center' } } >
                         
                     </View>             
                                              
                    
                     
                  </View>        
            
          );
      }
}

const mapStateToProps = state => (
    {
        errorLogin: state.AutenticacaoReducer.errorLogin,
        email: state.AutenticacaoReducer.email,
    }
)

export default connect(mapStateToProps, { modificaEmail })(FormEmail);


const styles = StyleSheet.create({
  container:{
    flex: 1,   
  },
  containerInput:{
    flex: 1,   
    justifyContent: 'flex-start', 
    flexDirection: 'row' 
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
    width: DEVICE_WIDTH - 40,
    backgroundColor: '#FF0040'

  },
  input: {
    width: DEVICE_WIDTH - 20,
    height: 55, 
  },



});
