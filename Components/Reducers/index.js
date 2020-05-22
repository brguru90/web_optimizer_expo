import data from "./data"
import log from "./log"
import {combineReducers} from "redux"

const allReducers=combineReducers({
    data:data,
    log:log
})

export default allReducers;