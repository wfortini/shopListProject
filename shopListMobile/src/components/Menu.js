import React, {Component} from 'react';

import {  StyleSheet,  View, TextInput, FlatList, SafeAreaView, Text  } from 'react-native';

import { connect } from 'react-redux';
import { modificaEmail } from '../actions/AutenticacaoActions';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const Menu = props => {  
    
    state = {
        data: [
          { id: "00", name: "Relâmpago McQueen" },
          { id: "01", name: "Agente Tom Mate" },
          { id: "02", name: "Doc Hudson" },
          { id: "03", name: "Cruz Ramirez" }
        ]
      };
      

    // https://medium.com/@oieduardorabelo/react-native-criando-grids-com-flatlist-b4eb64e7dcd5
    return (
          
        <SafeAreaView>
            <FlatList
            data={this.state.data}
            numColumns={2}
            style={{paddingTop: 10 }}
            keyExtractor={item => item.id}            
            renderItem={({ item }) => {
                return (
                <View style={styles.item}>
                    <Icon
                        name='cart-arrow-down'
                        size={90}
                        color='#4169E1'
                      />
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                );
            }}
            />
      </SafeAreaView>
        
       
    );

    

}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        password: state.AutenticacaoReducer.senha,
        loading_login: state.AutenticacaoReducer.loading_login

    }
)

export default connect(mapStateToProps, { modificaEmail
                        })(Menu);


const styles = StyleSheet.create({
    item: {
        alignItems: "center",       
        flexGrow: 1,
        margin: 4,
        padding: 20,
        flexBasis: 0,
        borderRadius: 10,
        height: 150,
        width: 50,
        borderColor: "#ff7f50",
        borderWidth: 2,
        
    },
    text: {
        color: "#333333"
    }
    });