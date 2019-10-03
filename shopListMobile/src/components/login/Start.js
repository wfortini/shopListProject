import React, {Component} from 'react';

const FBSDK = require("react-native-fbsdk");
const { LoginManager, AccessToken } = FBSDK;

import Dimensions from 'Dimensions';

import {  StyleSheet,  TouchableOpacity,  Text, View } from 'react-native';

import { connect } from 'react-redux';
import { signInWithFacebook } from '../../actions/AutenticacaoActions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { SocialIcon, Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';

import { Actions } from 'react-native-router-flux';

class  Start extends Component { 

    onSubmitFacebook = () => {
        LoginManager.logInWithReadPermissions(["public_profile", "email"])
        .then(result => {             
             if(result.isCancelled){
               alert("Cancelado");
             }else{
                  AccessToken.getCurrentAccessToken().then((data) => {                  
                    this.props.signInWithFacebook(data.accessToken).then(({exists, user}) => {
                         console.log(`==== ${exists} ${user}`)
                      if(exists){
                        Actions.Menu();
                      }
                    });
                  }).catch((error) => console.log(error.message))
             }
        })
  
      }


    render() {
          return (
                    <View style={styles.container} >       

                        <View style={styles.constainerHeader}>
                            <Icon  name='cart-arrow-down'
                              size={90} color='#4169E1' />
                            <Text>ShopList</Text>
                       </View>                      
                      <View  style={[styles.containerInput]}>  
                            <Button  buttonStyle={styles.buttonEnter} onPress={() => Actions.formEmail() }
                                icon={ <IconAnt name="mail" size={30}
                                        color="white" />
                                    }
                                    title="  Entrat com email"
                                    />

                            <Text style={ [ styles.textLabel ] }> -------- ou -------- </Text>

                            <SocialIcon title='Entrar usando Facebook' style={ styles.button }
                                    button onPress={this.onSubmitFacebook} type='facebook' /> 
                            <View>
                            <Text style={{  backgroundColor: 'transparent' }}>
                                  { this.props.errorLogin }
                            </Text> 
                            </View> 
                     </View>
                     <View style={ {flex: 1, alignContent: 'center', alignItems: 'center' } } >
                         <View style={ {flex: 1, alignItems: 'center', alignItems: 'center'} } >
                            <TouchableOpacity onPress={() => Actions.formCadastro() }>
                                    <Text style={ [ styles.label ] }>É novo aqui? Crie uma conta.</Text>
                            </TouchableOpacity >
                         </View>
                         <View style={ {flex: 1, flexDirection:'row', alignItems: 'flex-end' } } >
                            <TouchableOpacity onPress={() => Actions.formCadastro() }>
                                    <Text style={ [ styles.label, { paddingBottom: 10 } ] }>Tremos de uso.</Text>
                            </TouchableOpacity >
                     </View>
                     </View>
                     
                                              
                    
                     
                  </View>        
            
          );
      }
}

const mapStateToProps = state => (
    {
        errorLogin: state.AutenticacaoReducer.errorLogin,
    }
)

export default connect(mapStateToProps, { signInWithFacebook })(Start);


const styles = StyleSheet.create({
  container:{
    flex: 1,   
  },
  containerInput:{
    flex: 2,   
    alignItems: 'center',
    justifyContent: 'center',  
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
  containerSocial:{
    flex: 1,
    justifyContent: 'center',  
    alignItems: 'center'
    
  }



});
