import React from 'react';
import { View} from 'react-native';


export default HookWrapper=({ data, hooks_call })=>{
    hooks_call(data)
    return <View></View>
}