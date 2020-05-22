const loginStatus=(state=null,action)=>{
    switch(action.type){
        case "SET_LOG":
            return action.payload
        case "RESET_LOG":
            return null
        default:
            return state
    }
}

export default loginStatus;
