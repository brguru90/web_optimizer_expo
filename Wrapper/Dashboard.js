import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { setDataToLocal } from "../Components/Action/Action"
import Dashboard from '../Components/Dashboard/Dashboard.jsx'


const Wrapper = (props) => {
    const data = useSelector(state => state.data)

    return (
        <Dashboard {...props} redux_data={data} set_data={setDataToLocal} />
    )
}

export default Wrapper
