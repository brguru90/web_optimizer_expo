import React from 'react';
import { StyleSheet, Text, View ,StatusBar,Button} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  default_style from "./style.js"
import logics from "../commonLogic.js"


export default class Landing extends React.Component {

   state={
      
      styles:JSON.parse(JSON.stringify(default_style)),
      text:"before"
   }

   componentDidMount(){
      // setTimeout(() => {
      //    let style=this.state.styles
      //    style.container.backgroundColor="red"
      //    this.setState({styles:style})        
      // }, 2000);

   }




   render() {

      const styles=logics.updateStyle(default_style,this.state.styles)

      return (
         <View style = {styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={false} backgroundColor="#fff" />
            <Button onPress={() => Actions.dashboard()} title="Dashboard" />
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Changes you make will automatically reload.</Text>
            <Text>Shake your phone to open the developer menu.</Text>
            <Text>{this.state.text}</Text>
            <Text>{JSON.stringify(this.state.styles)}</Text>
         </View>
      );
   }

}
