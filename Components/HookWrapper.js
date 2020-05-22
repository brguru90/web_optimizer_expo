import React from 'react';
import { Text} from 'react-native';


export default HookWrapper=({ data, hooks_call })=>{
    hooks_call(data)
    return <Text>Hi</Text>
}