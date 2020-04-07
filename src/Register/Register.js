import React from 'react';
import M from 'materialize-css';
import firebase from '../Components/Firebase';
import 'firebase/storage'; 
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {setUser,login  } from '../Actions/'
class Register extends React.Component{
    constructor(props){
        super(props);
        this.signUp=this.signUp.bind(this);
        this.state={loggedIn:false,"error":""}

    }
    componentDidMount() {
       
        const that=this;
        firebase.auth().onAuthStateChanged(function(user) {
          
            if (user) {
              // User is signed in.
             
              var user = firebase.auth().currentUser;
              var name=document.getElementById("name").value;
              
           

          
            } else {
              // No user is signed in.
            }
          });
     
    }
    signUp(e){
        e.preventDefault();
        const  that = this;
        var email=document.getElementById("email").value;
        var password=document.getElementById("password").value;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
          that.state.error="";
            that.setState(that.state);
            firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
              var user = firebase.auth().currentUser;
              var name=document.getElementById("name").value;
              user.sendEmailVerification();
              var storage = firebase.storage();

              
                  var storageRef = storage.ref();
                  
                  
                  
                  // Create a child reference
                  storageRef.child('images/default-avatar.png').getDownloadURL().then(function(url) {
                    var db = firebase.firestore();
            
                    db.collection("users").doc(user.uid).set({
                      displayName:name,  
                        user_id:user.uid,
                        photoURL:url,
                        created:firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(function(docRef) {
                       // console.log("Document written with ID: ", docRef.id);
                        user.updateProfile({
                          displayName: name,
                          photoURL:url
                        }).then(function() {
                        
                            
                          //this.props.dispatch(login(true));
                         // that.state.loggedIn=true;
                         
                          //that.setState(that.state);
                          firebase.auth().signOut().then(function() {
                          
                            // Sign-out successful.
                          }).catch(function(error) {
                            // An error happened.
                          });
                          console.log("usern" + user.displayName)
                          window.location.href="/login"
                          // window.location.href("localhost:3000/")
                          // Update successful.
                        }).catch(function(error) {
                          // An error happened.
                        })
     
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
                   
                  })
              
                
               
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorMessage)
                that.state.error=errorMessage;
                that.setState(that.state);
                
              });
              
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("h"+errorMessage)
            that.state.error=errorMessage;
            that.setState(that.state);
            console.log(that.state.error);
            // ...
          });
       
    }

    render(){
        console.log(this.state)
        const btn_style={
            "backgroundColor":"#fff",
            color:"#212121"
        }
        if(this.state.loggedIn){
            console.log("logged in")
            return (<Redirect to="/shimpchat" />);
        }else{
            return(
            <div class="container">
                <div class="card">
                                <h1 className="header center black-text">Register</h1>
                                <hr></hr>
                                <div className="card-content red-text">
                                    <p id="error">{this.state.error}</p>
                                <form>

                                <div className="row">
                                        <div className="input-field col s12">
                                        <input id="name" type="text" className="validate"/>
                                        <label for="name">name</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <input id="email" type="email" className="validate"/>
                                        <label for="email">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <input id="password" type="password" className="validate"/>
                                        <label for="password">password</label>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="input-field col s12">
                                            <button className="btn waves-effect " style={btn_style} type ="submit"  onClick={this.signUp} name="action">
                                            Register
                                            </button>
                                                    
                                        
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>

            )
            }
    }
    
}
function mapStateToProps(state) {
    return {
      user: state.user,
      logged_in:state.logged_in
      
    };
  }

export default connect(mapStateToProps)(Register)
