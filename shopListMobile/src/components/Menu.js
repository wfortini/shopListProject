import React, {Component} from 'react';

import {  StyleSheet,  View, TextInput, FlatList, SafeAreaView, Text  } from 'react-native';

import { connect } from 'react-redux';
import { modificaEmail } from '../actions/AutenticacaoActions';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { Header } from 'react-native-elements';

const Menu = props => {    

    state = { data:[
                    { 
                    id: 1, 
                    value:  <View style={styles.item}>
                                    <Icon name='cart-arrow-down' size={90} color='#4169E1' />
                                    <Text style={styles.text}>Compras</Text>
                            </View>
                },
                { 
                    id: 2, 
                    value:  <View style={styles.item}>
                                <IconAnt name='qrcode' size={90} color='#4169E1' />
                                <Text style={styles.text}>QrCode</Text>
                            </View>
                },
                { 
                    id: 3, 
                    value:  <View style={styles.item}>
                                <IconAnt name='linechart' size={90} color='#4169E1' />
                                <Text style={styles.text}>Histórico</Text>
                            </View>
                },
                { 
                    id: 4, 
                    value:  <View style={styles.item}>
                                <IconAnt name='tags' size={90} color='#4169E1' />
                                <Text style={styles.text}>Tags</Text>
                            </View>
                    }
                ]
    };
      

    // https://medium.com/@oieduardorabelo/react-native-criando-grids-com-flatlist-b4eb64e7dcd5
    return (

        
          
        <SafeAreaView>
            <Header  centerComponent={{ text: 'Menu', style: { color: '#fff' } }}
            containerStyle={{
                backgroundColor: '#3D6DCC',
                justifyContent: 'space-around',
                height: 50
            }}  />
            <FlatList
            data={this.state.data}
            numColumns={2}
            style={{paddingTop: 10 }}
            keyExtractor={item => item.id}            
            renderItem={({ item }) => {
                return (
                    item.value
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