import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Button, Text, KeyboardAvoidingView, Image, Platform  } from 'react-native';
import FloatingLabelInput from 'react-native-floating-labels';
import { DrawerActions } from 'react-navigation-drawer'
import { Container, Content, Header, Left, Icon, Right } from 'native-base';
import LoginScreen from './login';

export default class sample extends Component {

      hello = (text) =>{
        (new LoginScreen()).abc(text);
      }
 
render() {
  const {item } = this.props.navigation.state.params.itemId;
  const { params } = this.props.navigation.state;
  const itemId = params ? params.itemId : null;
  const otherParam = params ? params.otherParam : null;
  console.log("item id is",item);
     return (
        <Container style={styles.container}>
<Text> Home screen</Text>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"rgb(230, 230, 230)",
    },
  });