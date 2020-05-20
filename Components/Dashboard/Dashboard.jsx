import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native';
import default_style from "./style.js"
import logics from "../commonLogic.js"

import Icon from 'react-native-vector-icons/Ionicons';
import style from './style.js';



export default class Dashboard extends React.Component {

   state = {
      styles: JSON.parse(JSON.stringify(default_style)),
   }

   componentDidMount() {
      setTimeout(() => {
         let style = this.state.styles
         style.container.backgroundColor = "#F2F3F5"
         this.setState({ styles: style })
      }, 2000);

   }




   render() {

      const styles = logics.updateStyle(default_style, this.state.styles)

      return (
         <View style={styles.container}>
            <StatusBar barStyle="dark-content" hidden={false} translucent={false} backgroundColor="red" />
            <View style={styles.menuBar}>

               <Icon name="md-menu"   style={styles.menuBtn} />

            </View>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>{JSON.stringify(this.state.styles)}</Text>
         </View>
      );
   }

}
