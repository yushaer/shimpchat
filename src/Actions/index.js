import firebase from '../Components/Firebase';

export function setUser(user){
    return {type:"setUser",payload:user}
}
export function login(loggin){
    if(loggin){
        return {type:"login",payload:true}
    }
    else{
        return {type:"logout",payload:false};
    }
}
export const set_login_status  = () => async dispatch => {
    try{
       firebase.auth().onAuthStateChanged(function(user) {
        
            if (user) {
            // User is signed in.
            
            var user = firebase.auth().currentUser;
        
          
        
            dispatch({type:"login",payload:true})
            
            
        
            } else {
            // No user is signed in.that.state.loggedIn=true;
            dispatch( {type:"logout",payload:false});
            }
        });
    }
    catch (e) {
        console.log(e)
      }
}
export const get_user  = () => async dispatch => {
    try{
       firebase.auth().onAuthStateChanged(function(user) {
        
            if (user) {
            // User is signed in.
            
            var user = firebase.auth().currentUser;
        
          
        
            dispatch({type:"setUser",payload:user})
            
            
        
            }
        });
    }
    catch (e) {
        console.log(e)
      }
}