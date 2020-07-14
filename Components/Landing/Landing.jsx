import React from 'react';
import { StyleSheet, Alert, TextInput, View, StatusBar, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import default_style from "./style.js"
import logics from "../commonLogic.js"
import axios from 'axios'
var querystring = require('querystring');


export default class Landing extends React.Component {

   state = {

      styles: JSON.parse(JSON.stringify(default_style)),
      text: "before",
      url:"http://199.34.21.253:8080/"
   }

   setSyncState = (states) => { new Promise((resolve) => this.setState(states, resolve)) }


   componentDidMount() {
      // setTimeout(() => {
      //    let style=this.state.styles
      //    style.container.backgroundColor="red"
      //    this.setState({styles:style})        
      // }, 2000);

   }

   source = null


   analyse = ()=> {
      let ctx = this

      var CancelToken = axios.CancelToken;
      this.source = CancelToken.source();
      // console.log(Object.keys(this.refs.url),this.

      let url=this.state.url
      
      console.log(url)

      axios({
         method: 'post',
         url: 'http://weboptimizer.terralogic.com/server/api/url_check/',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
         },
         data: querystring.stringify({
            url: url,
         }),
         cancelToken: this.source.token,

      })
         .then(function (response) {
            console.log("response", response.data);
            // eslint-disable-next-line
            if (response.data.valid == "valid")
               Actions.dashboard({url:url})
            else
               Alert.alert(
                  'Unable to reach url'
               )

         })
         .catch(async function (error) {
            console.log("catch", error)
            if (!(error instanceof axios.Cancel))
               Alert.alert(
                  'Unable to reach url'
               )
         });


   }



   render() {

      const styles = logics.updateStyle(default_style, this.state.styles)

      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" hidden={false} translucent={false} backgroundColor="#000063" />
            <View style={styles.StatusBarExtend}></View>
            <Text style={styles.title}>Web optimizer</Text>

            <TextInput style={styles.url}
               underlineColorAndroid="transparent"
               placeholder="https://google.co.in"
               placeholderTextColor="gray"
               autoCapitalize="none"
               defaultValue="http://199.34.21.253:8080/"
               numberOfLines={1}
               ref="url"
               onChangeText={(url) => this.setState({url})}
                />
            <View style={styles.analyse}>
               <Button onPress={this.analyse} title="Analyse" />
            </View>

            <Button onPress={() => Actions.dashboard()} title="Dashboard" />

         </View>
      );
   }

}
