import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated, Dimensions, Easing, PanResponder } from 'react-native';
import default_style from "./style.js"
import logics from "../commonLogic.js"
import Test from "./test1";

import Icon from 'react-native-vector-icons/Ionicons';


export default class Dashboard extends React.Component {




   panResponder_parent = PanResponder.create({
      // onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (evt, gestureState) => {
         console.group("..........")
         const { dx, dy } = gestureState
         return dx > 15 || dx < -15 || dy > 15 || dy < -15
      },

      // onMoveShouldSetResponder:()=>true,  
      // onMoveShouldSetPanResponderCapture:()=>true, 
      onPanResponderMove: (event, gesture) => {
         console.log("move", gesture.moveX)
         if (gesture.x0 < 80) {
            console.log(gesture);
            if (gesture.moveX <= this.width * 0.7) {
               console.log("slidingup");
               this.animate([this.state.styles.sidebar.width], [gesture.moveX], 0)
            }
         }

         // if (gesture.x0 >= this.width * 0.7 && Number(JSON.stringify(this.state.styles.sidebar.width)) > 0) {
         //    if (gesture.moveX <= this.width * 0.7) {
         //       console.log("slidingdown");
         //       this.animate([this.state.styles.sidebar.width], [gesture.moveX], 0)
         //    }
         // }

      },
      onPanResponderStart: () => console.log("pan start"),
      onPanResponderRelease: (event, gesture) => {
         console.log("on release");
         if (Number(JSON.stringify(this.state.styles.sidebar.width)) > this.width*0.3 && gesture.dx>0) {
            console.log("slideup");
            this.animate([this.state.styles.sidebar.width], [this.width * 0.7], 600)
         }
         else if ((Number(JSON.stringify(this.state.styles.sidebar.width))) <= this.width * 0.3) {
            console.log("slidedown", gesture.dx);
            this.animate([this.state.styles.sidebar.width], [0], 400)
         }
         // else if(gesture.dx<0){
         //    this.animate([this.state.styles.sidebar.width], [this.width * 0.7], 600)
         // }


      },
   });

   state = {
      styles: JSON.parse(JSON.stringify(default_style)),
      menu_state: false,
      panResponder_parent: this.panResponder_parent
   }


   width = Dimensions.get("window").width;
   height = Dimensions.get("window").height;



   setSyncState = (states) => { new Promise((resolve) => this.setState(states, resolve)) }

   componentDidMount() {
      console.log(Object.keys(this.state))
      console.log(this.width,this.height)

      // setTimeout(() => {
      //    let style = this.state.styles
      //    style.container.backgroundColor = "#F2F3F5"
      //    this.setState({ styles: style })
      // }, 2000);

      let cur_style = this.state.styles
      cur_style.sidebar.width = new Animated.Value(0)
      this.setSyncState({ styles: cur_style })

   }


   animate = (variable, to, dur) => {
      // const [variable] = useState(new Animated.Value(0))  // Initial value for opacity: 0
      for (var i = 0; i < variable.length; i++) {
         Animated.timing(
            variable[i],
            {
               toValue: to[i],
               duration: dur,
               easing: Easing.out(Easing.ease)
            }
         ).start();
      }

   }


   show_menu = () => {
      this.animate([this.state.styles.sidebar.width], [0.7 * this.width], 1000)

   }


   hide_menu = () => {
      if (this.state.styles.sidebar.width)
         this.animate([this.state.styles.sidebar.width], [0], 1000)

   }




   render() {

      const styles = logics.updateStyle(default_style, this.state.styles)

      return (
         <View style={styles.container}  {...this.state.panResponder_parent.panHandlers} >
            <TouchableOpacity style={styles.touchableContainer} onPress={this.hide_menu} activeOpacity={1} onPressIn={(e) => console.log("hi")} onPanResponderMove={(e) => console.log(e)} >

               <StatusBar barStyle="dark-content" hidden={false} translucent={false} backgroundColor="red" />
               <View style={styles.menuBar}>
                  <Icon name="md-menu" style={styles.menuBtn} onPress={this.show_menu} />
               </View>


               <Animated.View style={styles.sidebar} onPress={() => false}>
                  <TouchableOpacity style={styles.touchableContainer} activeOpacity={1}>
                     <View style={styles.sidebar_bg}>
                     </View>

                  </TouchableOpacity>
               </Animated.View>


               <View style={styles.body}>
                  
                  <Test>
                  <Text>Open up App.js to start working on your app!</Text>
                  <Text>{JSON.stringify(this.state.styles)}</Text>
                     </Test>
               </View>

            </TouchableOpacity >
         </View>
      );
   }

}
