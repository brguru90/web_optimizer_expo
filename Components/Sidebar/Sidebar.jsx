import React from 'react';
import { Button, View, TouchableOpacity, Animated, Dimensions, Easing, PanResponder } from 'react-native';
import { Actions } from 'react-native-router-flux';
import default_style from "./style.js"
import logics from "../commonLogic.js"

import Icon from 'react-native-vector-icons/Ionicons';


export default class Sidebar extends React.Component {




    panResponder_parent = PanResponder.create({
        // onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: (evt, gestureState) => {
            console.group("Parent..........",this.state.sidebar_state)
            const { dx, dy } = gestureState
            return (dx > 15 || dx < -15) && !this.state.sidebar_state
        },

        // onMoveShouldSetResponder:()=>true,  
        // onMoveShouldSetPanResponderCapture:()=>true, 
        onPanResponderMove: (event, gesture) => {
            console.log("Parent move", gesture.moveX)
            if (gesture.x0 <80) {
                console.log(gesture);
                if (gesture.moveX <= this.width * 0.8) {
                    console.log("Parent slidingup");
                    this.animate([this.state.styles.sidebar.right], [this.width-gesture.moveX], 0)
                }
            }

            // if (gesture.x0 >= this.width * 0.7 && Number(JSON.stringify(this.state.styles.sidebar.right)) > 0) {
            //    if (gesture.moveX <= this.width * 0.7) {
            //       console.log("slidingdown");
            //       this.animate([this.state.styles.sidebar.right], [gesture.moveX], 0)
            //    }
            // }

        },
        onPanResponderStart: () => console.log("Parent pan start"),
        onPanResponderRelease: (event, gesture) => {
            console.log("Parent on release",this.width * 0.8,this.state.styles.sidebar.right);
            if (Number(JSON.stringify(this.state.styles.sidebar.right)) <= this.width * 0.8 && gesture.dx > 0) {
                console.log("Parent slideup");
                this.animate([this.state.styles.sidebar.right], [this.width*0.2], 600)
                this.setState({ sidebar_state: true })

            }
            else if ((Number(JSON.stringify(this.state.styles.sidebar.right))) > this.width * 0.8) {
                console.log("Parent slidedown", gesture.dx,this.width);
                this.animate([this.state.styles.sidebar.right], [this.width], 400)
                this.setState({ sidebar_state: false })
            }
            // else if(gesture.dx<0){
            //    this.animate([this.state.styles.sidebar.right], [this.width * 0.7], 600)
            // }


        },
    });






    panResponder_sidebar = PanResponder.create({

        onMoveShouldSetPanResponder: (evt, gestureState) => {
            console.group("Child ..........",this.state.sidebar_state)
            const { dx, dy } = gestureState
            return dx > 15 || dx < -15
        },

        onPanResponderMove: (event, gesture) => {
            console.log("Child move", gesture.moveX)
            // if (gesture.x0 < 80) {
            //     console.log(gesture);
            //     if (gesture.moveX <= this.width * 0.7) {
            //         console.log("slidingup");
            //         this.animate([this.state.styles.sidebar.right], [gesture.moveX], 0)
            //     }
            // }

            if (Number(JSON.stringify(this.state.styles.sidebar.right)) >= this.width*0.2) {
                    console.log("Child slidingdown");
                    this.animate([this.state.styles.sidebar.right], [this.width*0.2-gesture.dx], 0)
            }

        },
        onPanResponderStart: () => console.log("Child pan start"),
        onPanResponderRelease: (event, gesture) => {
            console.log("Child on release",this.width * 0.8,Number(JSON.stringify(this.state.styles.sidebar.right))/this.width,this.state.styles.sidebar.right);
            if (Number(JSON.stringify(this.state.styles.sidebar.right)) <= this.width * 0.5 && gesture.dx > 0) {
                console.log("slideup");
                this.animate([this.state.styles.sidebar.right], [this.width*0.2], 600)
                this.setState({ sidebar_state: true })
            }
            else
             if ((Number(JSON.stringify(this.state.styles.sidebar.right))) >= this.width * 0.5) {
                console.log("slidedown", gesture.dx);
                this.animate([this.state.styles.sidebar.right], [this.width], 400)
                this.setState({ sidebar_state: false })
            }
            else
             if(gesture.dx<0){
               this.animate([this.state.styles.sidebar.right], [this.width * 0.2], 600)
               this.setState({ sidebar_state: true })
            }


        },
    });






    state = {
        styles: JSON.parse(JSON.stringify(default_style)),
        sidebar_state: false,
        panResponder_parent: this.panResponder_parent,
        panResponder_sidebar: this.panResponder_sidebar
    }


    width = Dimensions.get("window").width;
    height = Dimensions.get("window").height;



    setSyncState = (states) => { new Promise((resolve) => this.setState(states, resolve)) }

    componentDidMount() {
        console.log(`w=${this.width}, h=${this.height}`)
        // console.log(this.props.menu)

        // setTimeout(() => {
        //    let style = this.state.styles
        //    style.container.backgroundColor = "#F2F3F5"
        //    this.setState({ styles: style })
        // }, 2000);

        // let cur_style = this.state.styles
        // cur_style.sidebar.width = new Animated.Value(0)
        // this.setSyncState({ styles: cur_style })

        let cur_style = this.state.styles
        cur_style.sidebar.right = new Animated.Value(this.width)
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
        console.log("show menu")
        this.animate([this.state.styles.sidebar.right], [this.width*0.2], 1000)
        this.setState({ sidebar_state: true })

    }


    hide_menu = () => {
        console.log("hide menu")

        if (this.state.styles.sidebar.right){
            this.animate([this.state.styles.sidebar.right], [this.width], 1000)
            this.setState({ sidebar_state: false })
        }

    }




    render() {

        const styles = logics.updateStyle(default_style, this.state.styles)

        return (
            <View style={styles.container}  {...this.state.panResponder_parent.panHandlers} >
                <TouchableOpacity style={styles.touchableContainer} onPress={this.hide_menu} activeOpacity={1} >

                    <View style={styles.menuBar}>
                        <Icon name="md-menu" style={styles.menuBtn} onPress={this.show_menu} />
                    </View>

                    <Animated.View style={styles.sidebar} >
                        <View style={styles.sidebar_bg}  {...this.state.panResponder_sidebar.panHandlers} >
                            <TouchableOpacity style={styles.touchableContainer} activeOpacity={1}>
                                {this.props.menu?<this.props.menu {...this.props.menuProps}/>:<Button onPress={() => Actions.pop()} title="Home" />}
                            </TouchableOpacity>
                        </View>

                    </Animated.View>


                    <View style={styles.body}>

                        {this.props.children}
                    </View>

                </TouchableOpacity >
            </View>
        );
    }

}
