import React, {Component} from 'react';
import {  StyleSheet,  Text,  View, TouchableOpacity } from 'react-native';
import { SocialIcon, Divider} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

export default class FormCadastro extends Component {   

   render(){
          console.log(this.props);
            return (

              <View style={styles.container}>  

                  
                  <View style={styles.elementsContainer}>  
                          <View style={{ flex: 3, alignItems: 'center' }}>
                              <Text style={styles.text}>Vitriny</Text>
                          </View>
                 
                         <View style={{ flex: 2, justifyContent: 'center' }}>
                             <SocialIcon title='Entrar com Facebook' button type='facebook'/> 
                         </View>               
                       
                         <View style={{ flex: 2, justifyContent: 'center',  alignItems: 'center', }}>
                              <Text>OU</Text>
                         </View>

                          <View style={{ flex: 3, alignItems: 'center', }}>
                              <TouchableOpacity onPress={() => Actions.formEmail() }>
                                  <Text style={styles.textLabel}>Cadastre-se com email</Text>
                             </TouchableOpacity >
                              
                         </View>
                 </View>
              </View>
                  
            );
          }

}

const styles = StyleSheet.create({  
  container: {
    flex: 1,  
  },
  containerTitle: {   
    paddingTop : 20,   
    alignItems: 'center', 
    flex: 1,   
  },
  elementsContainer: {    
    flex: 1, 
  }, 
  text: {
    paddingTop: 80,
    color: 'black',
    fontWeight: 'bold',   
    marginTop: 20,
    fontSize: 30,
    fontFamily: "Roboto",
  },
  divider: {
    marginLeft: 10,
    marginRight: 100,
    backgroundColor: 'black',
    height: 2,

  },
  textLabel: {
    color: 'black',
    backgroundColor: 'transparent',
    fontSize: 16,
  },
 
});
