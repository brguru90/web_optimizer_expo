import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity,Image } from 'react-native'
import { Actions } from 'react-native-router-flux';
import logics from "../commonLogic.js"
import default_style from "./style.js"
import { Avatar } from 'react-native-paper';
import axios from 'axios'


export default class Menu extends Component {

    state = {
        styles: JSON.parse(JSON.stringify(default_style)),
        favicon: null,
    }

    componentDidMount() {
        if (this.props.url) {

            // axios({
            //     url:`https://s2.googleusercontent.com/s2/favicons?domain_url=${this.props.url}`,
            //     method:"get",
            //     responseType: 'arraybuffer'
            // })
            // .then((response)=>{console.log("data",response.data)})
            // .catch((error) => {
            //     console.log(error)
            // })


            axios({
                url: this.props.url,
                method: "get",
                headers: {
                    accept: '*/*',
                }
            })
                .then((response) => {
                    let favicon_url = `${this.props.url}/${response.data.match(/rel=".*icon.*".*href="(.+)"/)[1]}`
                    console.log(favicon_url)
                    this.setState({ favicon: favicon_url })
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }


    render() {

        const styles = logics.updateStyle(default_style, this.state.styles)


        return (
            <View style={styles.menu}>
                <View style={styles.banner}>
                    {this.state.favicon ? <Avatar.Image size={104} style={styles.avatar} source={this.state.favicon} /> : <Avatar.Image size={104} style={styles.avatar} />}
                    <Image
                        source={{
                            uri: this.state.favicon,
                        }}
                        style={{ height: 40, width: 40 }}
                    />
                    <Text style={styles.url}>{this.props.url ? this.props.url : ""}</Text>
                </View>
                <TouchableOpacity style={styles.menuBtn} onPress={() => Actions.pop()}>
                    <Text style={styles.menuBtnText} > Home </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuBtn} onPress={() => Actions.pop()}>
                    <Text style={styles.menuBtnText} > Home </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBtn} onPress={() => Actions.pop()}>
                    <Text style={styles.menuBtnText} > Home </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBtn} onPress={() => Actions.pop()}>
                    <Text style={styles.menuBtnText} > Home </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuBtn} onPress={() => Actions.pop()}>
                    <Text style={styles.menuBtnText} > Home </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
