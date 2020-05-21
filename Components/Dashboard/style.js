import React from 'react';
import {
    Animated
} from 'react-native';


export default {
 
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    touchableContainer:{
        flex: 1,
        // backgroundColor: 'green',
        width:"100%",
    },
    menuBar: {
        width: "100%",
        height: 50,
        backgroundColor:"blue",
        borderBottomStyle: "dotted",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },
    menuBtn: {
        position: "absolute",
        top: 10,
        left: 10,
        color: "black",
        fontSize: 35,
    },
    sidebar: {
        position: "absolute",
        left: 0,
        top: 0,
        zIndex:100,
        height:"100%",
        backgroundColor:"pink",
    },
    sidebar_bg:{
        backgroundColor:"violet",
        flex: 1,
        // width:"80%",
    },    
    body: {
        backgroundColor:"yellow",
        flex:1,
    }
}