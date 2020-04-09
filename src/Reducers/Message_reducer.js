const initalState=[];
function MessageReducer(state=initalState,action){
    switch (action.type) {
        case 'get_messages':
          return action.payload;
            break;
            
        
        
        default:
            return state;
            break;
    }
}
export default MessageReducer;