import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated, Dimensions, Easing, PanResponder } from 'react-native';


export default class test1 extends Component {
    render() {
        return (
            <View>
                <Text> hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh </Text>
                {this.props.children}
            </View>
        )
    }
}
