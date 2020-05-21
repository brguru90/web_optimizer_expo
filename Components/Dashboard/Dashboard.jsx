import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated, Dimensions, Easing, PanResponder } from 'react-native';
import default_style from "./style.js"
import logics from "../commonLogic.js"
import Sidebar from "../Sidebar/Sidebar.jsx";

import Icon from 'react-native-vector-icons/Ionicons';


export default class Dashboard extends React.Component {

   state = {
      styles: JSON.parse(JSON.stringify(default_style)),
      menu_state: false,
      panResponder_parent: this.panResponder_parent
   }



   render() {
      return (
         <Sidebar>
            <StatusBar barStyle="dark-content" hidden={false} translucent={false} backgroundColor="red" />

            <Text>Open up App.js to start working on your app!</Text>
            <Text>{JSON.stringify(this.state.styles)}</Text>
         </Sidebar>

      );
   }

}
