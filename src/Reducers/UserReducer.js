
const initalState={}
function UserReducer(state=initalState,action){
    switch (action.type) {
        case 'setUser':
            return  action.payload
            break;
    
        default:
            return state;
            break;
    }
}
export default UserReducer;