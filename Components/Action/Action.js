import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
var axios = require('axios');


const setData = (data) => {
    return {
        type: "SET_DATA",
        payload: data
    }
}



export const setDataToLocal = (data) => {
    console.log("redux action called", Object.keys(data))
    const dispatch = useDispatch()
    dispatch(setData(data))
}





// const setLogin = (data) => {
//   return {
//     type: "SET_LOG",
//     payload: data
//   }
// }


// export const ResetLoginStatus = (satus) => {
//   const dispatch = useDispatch()
//   dispatch( {
//     type: "RESET_LOG"
//   })
// }

