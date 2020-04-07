
const initalState={"logged_in":false,"redirect_url":"/shimpchat"};
function SessionReducer(state=initalState,action){
    switch (action.type) {
        case 'login':
          return {...state,"logged_in":true};
            break;
            
        case 'logout':
            return {...state,"logged_in":false};
            break;
        case 'set_redirect_url':
            return {...state,"redirect_url":action.payload};
            break;
        default:
            return state;
            break;
    }
}
export default SessionReducer;