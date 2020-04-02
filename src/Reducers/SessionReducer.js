
const initalState=false;
function SessionReducer(state=initalState,action){
    switch (action.type) {
        case 'login':
          return true;
            break;
        case 'logout':
            return false;
            break;
    
        default:
            return state;
            break;
    }
}
export default SessionReducer;