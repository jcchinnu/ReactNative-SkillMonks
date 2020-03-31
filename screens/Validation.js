import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { Icon} from 'native-base';

class ValidationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            email:""
        }
    }
    goBack = ()=>{
        this.props.navigation.navigate('AuthLoading');
    }

    resetPassword = () =>{
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(this.state.email === ""){
            alert('please enter mail');
        }
        else if(reg.test(this.state.email) === false){
            alert("please enter valid mail");
            return false;
        }
        else{
            fetch('https://tinstitute.skillmonks.com/api/account/reset_password/init',{method:"post",
            headers: {
                'Content-Type': 'application/json',
              },
              body: this.state.email
            },).then((response) => response.text())
            .then((res)=>{
                if(res === "e-mail address not registered")
                {
                    alert("Email address not registered");
                }
                else if(res === "e-mail was sent"){
                    alert("Email was sent");
                }
            this.setState({
                email:""
            })
            })
        }
        
    }
    render(){
        return(
            <View style={{ backgroundColor: "rgb(230, 230, 230)", flex: 1 }}>
                <View style={{ flex: 1, marginTop: "7%", backgroundColor: "rgb(230, 230, 230)" }}><Icon name="md-arrow-round-back" onPress={this.goBack} style={{ marginLeft: "5%", marginTop: "2%" }} size={16} color="#000" />
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: "rgb(230, 230, 230)" }}>

                        <TextInput
                            style={{ width: "85%", height: 30, borderColor: "black", borderBottomWidth: 2, marginBottom: 10, marginTop: 20 }}
                            placeholder="Enter E-mail" placeholderTextColor="gray" onChangeText={(email) => this.setState({ email })} value={this.state.email}
                        />
                        <View style={{ width: "65%", marginTop: 40 }}><Button title="Reset password" onPress={this.resetPassword} color="green">Login</Button></View>

                    </View>
                </View>
            </View>
       
        );
    }
}
export default ValidationScreen;