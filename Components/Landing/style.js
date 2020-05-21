import React from 'react';
import { StyleSheet} from 'react-native';


export default {
    container: {
        flex: 1,
        flexDirection:"column",
        backgroundColor: '#311b92',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StatusBarExtend:{
        position:"absolute",
        top:0,
        backgroundColor: '#000063',
        width:"100%",
        height:30,
    },
    title:{
        position:"absolute",
        top:40,
        fontSize:30,
        color:"white",
    },
    url:{
        color:"black",
        borderColor:"white",
        backgroundColor:"white",
        borderWidth:1,
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        marginBottom:10,
        height:50,
        width:"60%",
    },
    analyse:{
        marginBottom:10,
    }
}
