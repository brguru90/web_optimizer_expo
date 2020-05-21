import React, { Component } from 'react'
import { Text, View,Button } from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class Menu extends Component {
    render() {
        return (
            <View>
                <Button onPress={() => Actions.home()} title="Home" />
                <Text> Menu1 </Text>
                <Text> Menu2 </Text>
                <Text> Menu3 </Text>
                <Text> Menu4 </Text>
            </View>
        )
    }
}
