import React, { Component } from "react";
import { View, Image } from "react-native";
import { Container, Content, Header, Icon, Left } from 'native-base';
import { AsyncStorage } from 'react-native';

class SplashScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            key:""
        }
        AsyncStorage.getItem("myKey").then((value) => {
            setTimeout(()=>{
                if(value != null){
                    this.props.navigation.navigate('Main');
                }
                else{
                    this.props.navigation.navigate('AuthLoading');
                }
            },1000)
            
        })
    }
    render(){
        return(
         <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:"rgb(230, 230, 230)"}}>
           <Image source={require('../assets/skillmonks_logo.png')} style={{marginLeft: 10, marginBottom: 20, height:350, width:350 }}></Image>
         </View>
        );
    }
}
export default SplashScreen;