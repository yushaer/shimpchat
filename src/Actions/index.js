import firebase from '../Components/Firebase';
import "firebase/firestore";

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
export function setRedirectionUrl(url){
    
        return {type:"set_redirect_url",payload:url}
    
    
    
}
// export const getDefaultProfileUrl  = () => async dispatch => {
//     var storage = firebase.storage();

//     // Create a storage reference from our storage service
//     var storageRef = storage.ref();
    
    
    
//     // Create a child reference
//     storageRef.child('images/default-avatar.png').getDownloadURL().then(function(url) {

//                dispatch({type:"getdefaultprofileurl",payload:{imageurl:url})
//     })


// }
export const set_login_status  = () => async dispatch => {
    try{
       firebase.auth().onAuthStateChanged(function(user) {
        
            if (user) {
            // User is signed in.
            console.log(user.emailVerified)
                if(user.emailVerified){
                
                var user = firebase.auth().currentUser;
            
            
            
                dispatch({type:"login",payload:true})
                
                }
                else{
                    dispatch( {type:"logout",payload:false})
                }

        
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
            var db = firebase.firestore();
            db.collection("users").doc(user.uid)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
                dispatch({type:"setUser",payload:doc.data()})
            });
        
          
        
          
            
            
        
            }
        });
    }
    catch (e) {
        console.log(e)
      }
}
export const get_message  = () => async dispatch => {
    try{
       firebase.auth().onAuthStateChanged(function(user) {
        
            if (user) {
            // User is signed in.
            var db = firebase.firestore();
            db.collection("messages").orderBy("created").onSnapshot(function(querySnapshot) {
                var messages = [];
                querySnapshot.forEach(function(doc) {
                    messages.push({id: doc.id,user_id:doc.data().user_id,"name":doc.data().Name,"message":doc.data().message,"created":doc.data().created});
                    
                });
                
                
                var objDiv = document.getElementById("message_div");
                objDiv.scrollTop = objDiv.scrollHeight;
                dispatch({type:"get_messages",payload:messages})
           
        
          
          });
          
          
        
          
            
            
        
            }
        });
    }
    catch (e) {
        console.log(e)
      }
}