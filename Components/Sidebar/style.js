import React from 'react';
import {
    Animated,
    Dimensions
} from 'react-native';

const width = Dimensions.get("window").width;

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
        backgroundColor:"#08196e",
        borderBottomStyle: "dotted",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },
    menuBtn: {
        position: "absolute",
        top: 5,
        left: 10,
        color: "white",
        fontSize: 35,
    },
    sidebar: {
        position: "absolute",
        right: width,
        top: 0,
        zIndex:100,
        width:"80%",
        height:"100%",
        backgroundColor:"pink",
    },
    sidebar_bg:{
        backgroundColor:"violet",
        flex: 1,
        zIndex:101,
        width:"100%",
    },    
    body: {
        backgroundColor:"white",
        flex:1,
    }
}