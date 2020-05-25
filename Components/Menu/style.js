import React from 'react';
import {
    Animated
} from 'react-native';


export default {

    menu: {
        flex: 1,
        paddingRight: 2,
        backgroundColor: "#fff",
        flexDirection: 'column',
        justifyContent: 'flex-start',

    },
    banner: {
        backgroundColor: "#08196e",
        minHeight: 170,

    },
    avatar:{
        backgroundColor:"#fff",
        marginTop:20,
        marginLeft:20,
        marginBottom:10,
        // alignSelf:"center"
    },
    url:{
        color:"#fff",
    },
    menuBtn: {
        width: "100%",
        backgroundColor: "#fff",
        paddingTop: 5,
        paddingBottom: 10,  
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginBottom:5,
    },
    menuBtnText: {
        fontSize: 20,
    }

}