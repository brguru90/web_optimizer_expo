import React from 'react';
import {
    StyleSheet
} from 'react-native';

// exports.updateStyle=(default_style,cur_style)=>{
//     let styles={}
//     for(let key in default_style)
//        styles[key]= StyleSheet.flatten([default_style[key],cur_style[key]]); 
//     return styles
//  }
export default class commonLogics{

    static updateStyle=(default_style, cur_style) => {
        let styles = {}
        for (let key in default_style)
            styles[key] = StyleSheet.flatten([default_style[key], cur_style[key]]);
        return styles
    }

    static list_json_keys =(data, max_level = 5, cur_level = 1, cur_key = "") => {
        if (typeof (data) != "object")
            return `${cur_key}==>${data}\n`
        let keys = Object.keys(data)
        if (cur_level < max_level && keys.length) {
            if (cur_key != "")
                return keys.map(key => `${this.list_json_keys(data[key],max_level,cur_level+1,`${cur_key}=>${key}`)}`).join("")
            else
                return keys.map(key => `${this.list_json_keys(data[key],max_level,cur_level+1,key)}`).join("\n")
    
    
        } else
            return `${cur_key}==>${keys.join(",")}\n`
    }
}

