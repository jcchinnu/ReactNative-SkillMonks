import React, { Component } from "react";
import { View, Text, StyleSheet,Button, TextInput, Image, TouchableHighlight, KeyboardAvoidingView, Platform, TouchableOpacity  } from "react-native";
import {  Content, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';

class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            text: '',
            password: '',
            iconName:"eye",
            secureTextEntry: true,
        }
    }

    async _onValueChange(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
    }

    forgotPassword = () =>{
        this.props.navigation.navigate('Validate');
    }
    onIconPress = () =>{
        let iconName = (this.state.secureTextEntry) ? "eye-off" : "eye";

        this.setState({
            secureTextEntry: !this.state.secureTextEntry,
            iconName: iconName
        })
    }
    submit = () => {
        if (this.state.text === "") {
            alert("please enter name");
        }
        else if (this.state.password === "") {
            alert("please enter your password");
        }
        else {
            fetch('https://tinstitute.skillmonks.com/api/authentication',{method:"post",
            headers: {
                'Content-Type': 'application/json',
                "X-DT-Login-Type":"institute",
              },
              body: JSON.stringify({username:this.state.text,password:this.state.password})
            },
            )
            .then((response) => response.text())
            .then((res) => { 
                if(res == ""){
                    alert("Invalid Credentials")
                }
                else{
                    AsyncStorage.setItem("myKey", res);
                    this.props.navigation.navigate('Main');
                }
                this.setState({
                    text:"",
                    password:""
                })
                
            })
        }

    }
    
    render(){
        return(
            <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}
          >
                <Content>
                    <View style={{alignItems:"center", marginTop:"45%"}}><Image source={require('../assets/skillmonks_logo.png')} style={{marginLeft: 10, marginBottom: 20, height:200, width:200 }}></Image></View>
                
                    <Text style={{textAlign:"center",fontSize:12, color:"green"}}>When one finds the true guru, one conquered half the world</Text>
                    <Text style={{textAlign:"center",fontSize:12, color:"green"}}>-Budha</Text>
                  
                    <Content contentContainerStyle ={{alignItems:'center',justifyContent:'center',paddingTop:25}}>
                        <TextInput
                            style={{ width:"85%",height: 30, borderColor: "black", borderBottomWidth: 2,paddingRight:20}}
                            placeholder="Username" placeholderTextColor ="gray" onChangeText={(text) => this.setState({ text })} value={this.state.text}
                        />
                        <View style={{borderBottomWidth:2,flexDirection:"row",marginTop:20}}>
                        <TextInput
                            style={{  borderColor: "black",width:"80%"  }} secureTextEntry={this.state.secureTextEntry}
                            placeholder="Enter Password" placeholderTextColor="gray" onChangeText={(password) => this.setState({ password })} value={this.state.password}
                        />
                        <TouchableOpacity onPress={this.onIconPress}>
                        <Icon name={this.state.iconName}></Icon>
                        </TouchableOpacity>
                        </View>
                    
                        {/* <View style={{marginTop:"10%"}}><Button title ="login" onPress={this.submit} color="green">Login</Button></View> */}
                        <Text onPress={this.forgotPassword} style={{color:"green",marginTop:"10%"}}>Forgot Password?</Text>
                        <TouchableHighlight
                            style={{
                                width: 110,
                                borderRadius: 10,
                                marginLeft: 50,
                                marginRight: 50,
                                marginTop: 40,
                                height:120
                            }}>
                            <Button onPress={this.submit}
                                title="Login" color="rgb(0,100,0)"
                            />
                        </TouchableHighlight>
                    </Content>
                </Content>
            </KeyboardAvoidingView>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"rgb(230, 230, 230)",
    },
  });