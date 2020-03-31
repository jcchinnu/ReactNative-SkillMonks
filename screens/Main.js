import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Icon } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { AsyncStorage, Alert, } from 'react-native';

class MainScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            fromDate:"2020-02-29",
            toDate:"2020-03-29",
            courses:[],
            branches:[],
            key:"",
            leads:0,
            walkins:0,
            enrollments:0,
            revenue:0,
            Collected:0,
            totalFee:0,
            branchID:null,
            courseID:null,
            url:"",
            isSelected:false
        }
        AsyncStorage.getItem("myKey").then((value) => {
            this.setState({key: value});
            fetch("https://tinstitute.skillmonks.com/api/courses", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                for(var i=0;i<res.length;i++){
                    this.state.courses[i]={value:res[i].courseName,
                    id:res[i].id}
                }
            })

            fetch("https://tinstitute.skillmonks.com/api/branchs", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                for(var i=0;i<res.length;i++){
                    this.state.branches[i]={value:res[i].branchName+"-"+res[i].branchCode,
                id:res[i].id}
                }
    
            })

            fetch(`https://tinstitute.skillmonks.com/api/analytics/feeCollected?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        Collected:res.totalValue
                    })
                   
                }
                else{
                    this.setState({
                        Collected:0
                    })
                }
            })

            fetch(`https://tinstitute.skillmonks.com/api/analytics/feeDue?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        totalFee:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        totalFee:0,
                    })
                }
            })

            fetch(`https://tinstitute.skillmonks.com/api/analytics/leads?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        leads:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        leads:0,
                    })
                }
            })

            fetch(`https://tinstitute.skillmonks.com/api/analytics/walkIns?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        walkins:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        walkins:0,
                    })
                }
            })

            fetch(`https://tinstitute.skillmonks.com/api/analytics/enrollments?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + value
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        enrollments:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        enrollments:0,
                    })
                }
            })

            
      }).done();

      }
      logout =()=>{
        Alert.alert(  
            'Confirmation',  
            'Are you sure want to logout',  
            [  
                {  
                    text: 'Cancel',    
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () =>{
                AsyncStorage.removeItem("myKey");
                this.props.navigation.navigate('AuthLoading');}},  
            ],  
            {cancelable: false}  
        )  
      }

    
      onBranchChange(value){
        for(var i=0;i<this.state.branches.length;i++){
            if(this.state.branches[i].value == value)
            {
                this.setState({
                    branchID:this.state.branches[i].id
                })
            }
        }
        this.setDetails();
      }

      setDetails = () =>{
          if(this.state.branchID == null && this.state.courseID == null){
              this.setState({
                  isSelected:false
              })
            this.setState({
                url:""
            })
          }
          else if(this.state.branchID != null && this.state.courseID != null){
            this.setState({
                url:`&branch=${this.state.branchID}&courseId=${this.state.courseID}`,
                isSelected:true
            })
          }
          else if(this.state.branchID != null){
              this.setState({
                url:`&branch=${this.state.branchID}`,
                isSelected:true
            })
          }
          else if(this.state.courseID != null){
            this.setState({
                url:`&courseId=${this.state.courseID}`,
                isSelected:true
            })
          }

          if(this.state.isSelected){
            fetch(`https://tinstitute.skillmonks.com/api/analytics/feeCollected?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}${this.state.url}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        Collected:res.totalValue
                    })
                   
                }
                else{
                    this.setState({
                        Collected:0
                    })
                }
            })

          }
          else{
            fetch(`https://tinstitute.skillmonks.com/api/analytics/feeCollected?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        Collected:res.totalValue
                    })
                   
                }
                else{
                    this.setState({
                        Collected:0
                    })
                }
            })
          }

          if(this.state.isSelected){
            fetch(`https://tinstitute.skillmonks.com/api/analytics/feeDue?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}${this.state.url}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        totalFee:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        totalFee:0,
                    })
                }
            })

          }
          else{
            fetch(`https://tinstitute.skillmonks.com/api/analytics/feeDue?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        totalFee:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        totalFee:0,
                    })
                }
            })

          }
          
          if(this.state.isSelected){
            fetch(`https://tinstitute.skillmonks.com/api/analytics/leads?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}${this.state.url}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        leads:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        leads:0,
                    })
                }
            })


          }
          else{
            fetch(`https://tinstitute.skillmonks.com/api/analytics/leads?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        leads:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        leads:0,
                    })
                }
            })
          }

          if(this.state.isSelected){
            fetch(`https://tinstitute.skillmonks.com/api/analytics/walkIns?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}${this.state.url}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        walkins:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        walkins:0,
                    })
                }
            })
          }
          else{
            fetch(`https://tinstitute.skillmonks.com/api/analytics/walkIns?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        walkins:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        walkins:0,
                    })
                }
            })
          }
          
          if(this.state.isSelected){
            fetch(`https://tinstitute.skillmonks.com/api/analytics/enrollments?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}${this.state.url}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        enrollments:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        enrollments:0,
                    })
                }
            })
          }
          else{
            fetch(`https://tinstitute.skillmonks.com/api/analytics/enrollments?fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.state.key
                }
            })
            .then((response) => response.json())
            .then((res) => { 
                if(res.status == undefined){
                    this.setState({
                        enrollments:res.totalValue,
                    })
                   
                }
                else{
                    this.setState({
                        enrollments:0,
                    })
                }
            })
          }
      }

      onFromDateSelected =()=>{
         this.setDetails();
      }

      onToDateSelected = () =>{
          this.setDetails();
      }

      onCoursesChange(value){
          for(var i=0;i<this.state.courses.length;i++){
            if(this.state.courses[i].value == value)
            {
                this.setState({
                    courseID:this.state.courses[i].id
                })
            }
        }
        this.setDetails();
      }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: "rgb(230, 230, 230)" }}>
                <View style={{ flex: 1, marginTop: "8%", backgroundColor: "rgb(230, 230, 230)" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginRight: "3%" }}>
                        <Text onPress={this.logout} style={{ textAlign: "right", marginRight: "2%", marginBottom: "3%", fontSize: 18, color: "black" }}>Logout</Text>
                        <Icon onPress={this.logout} name="md-log-out" style={{ textAlign: "right", color: "green" }} ></Icon>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Dropdown containerStyle={{ borderColor: "green", width: "45%", backgroundColor: "green", marginLeft: "3%", paddingLeft: 2, borderRadius: 10 }} style={{ color: 'white' }}
                            label='BRANCHES' baseColor='white' inputContainerStyle={{ borderBottomWidth: 0 }} dropdownPosition={1} value={this.state.label} onChangeText={value => this.onBranchChange(value)}
                            data={this.state.branches} labelHeight={10} labelPadding={0} labelFontSize={0}
                        />
                        <Dropdown containerStyle={{ borderColor: "green", width: "45%", backgroundColor: "green", marginLeft: "3%", paddingLeft: 2, borderRadius: 10 }} style={{ color: 'white' }}
                            label='COURSES' baseColor='white' inputContainerStyle={{ borderBottomWidth: 0 }} dropdownPosition={1}
                            data={this.state.courses} labelHeight={10} labelPadding={0} labelFontSize={0} value={this.state.label} onChangeText={value => this.onCoursesChange(value)}
                        />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <DatePicker
                            style={{ width: "45%", marginLeft: "3%", borderBottomWidth: 2, borderWidth: 0 }}
                            date={this.state.fromDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{ dateInput: { borderWidth: 0 } }}
                            onDateChange={(fromDate) => { this.setState({ fromDate: fromDate })
                        this.onFromDateSelected() }}
                        />
                        <Text style={{ marginTop: 6, marginLeft: "1.5%", marginRight: "1.5%" }}>_</Text>
                        <DatePicker
                            style={{ width: "45%", borderBottomWidth: 2, borderWidth: 0 }}
                            date={this.state.toDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{ dateInput: { borderWidth: 0 } }}
                            onDateChange={(toDate) => { this.setState({ toDate: toDate })
                        this.onToDateSelected() }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ backgroundColor: "white", width: "25%", alignItems: "center", marginLeft: "6%" }}>
                            <Image source={require('../assets/leads.png')} style={{ marginLeft: 10, marginBottom: 20, width: 75, height: 75, resizeMode: 'contain' }}></Image>
                            <Text style={{ color: "green" }}>Leads</Text>
                            <Text style={{ color: "green" }}>{this.state.leads}</Text>
                        </View>
                        <View style={{ backgroundColor: "white", width: "25%", alignItems: "center", marginLeft: "6%" }}>
                            <Image source={require('../assets/walkin.png')} style={{ marginLeft: 10, marginBottom: 20, width: 75, height: 75, resizeMode: 'contain' }}></Image>
                            <Text style={{ color: "green" }}>Walk-ins</Text>
                            <Text style={{ color: "green" }}>{this.state.walkins}</Text>
                        </View>
                        <View style={{ backgroundColor: "white", width: "25%", alignItems: "center", marginLeft: "6%" }}>
                            <Image source={require('../assets/enrollment.png')} style={{ marginLeft: 10, marginBottom: 20, width: 75, height: 75, resizeMode: 'contain' }}></Image>
                            <Text style={{ color: "green" }}>Enrollments</Text>
                            <Text style={{ color: "green" }}>{this.state.enrollments}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <View style={{ backgroundColor: "white", width: "25%", alignItems: "center", marginLeft: "6%" }}>
                            <Image source={require('../assets/revenue_rupee.png')} style={{ marginLeft: 10, marginBottom: 20, width: 75, height: 75, resizeMode: 'contain' }}></Image>
                            <Text style={{ color: "green" }}>Revenue</Text>
                            <Text style={{ color: "green" }}>{this.state.Collected + this.state.totalFee}</Text>
                        </View>
                        <View style={{ backgroundColor: "white", width: "25%", alignItems: "center", marginLeft: "6%" }}>
                            <Image source={require('../assets/collected_rupee.png')} style={{ marginLeft: 10, flex: 1, marginBottom: 20, width: 75, height: 75, resizeMode: 'contain' }}></Image>
                            <Text style={{ color: "green" }}>Collected</Text>
                            <Text style={{ color: "green" }}>{this.state.Collected}</Text>
                        </View>
                        <View style={{ backgroundColor: "red", width: "25%", alignItems: "center", marginLeft: "6%" }}>
                            <Image source={require('../assets/due_rupee.png')} style={{ marginLeft: 10, marginBottom: 20, width: 75, height: 75, resizeMode: 'contain' }}></Image>
                            <Text style={{ color: "white" }}>Due</Text>
                            <Text style={{ color: "white" }}>{this.state.totalFee}</Text>
                        </View>

                    </View>

                </View>
            </View>
        );
    }
}
export default MainScreen;