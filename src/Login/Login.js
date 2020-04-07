import React from 'react';
import M from 'materialize-css';
import firebase from '../Components/Firebase';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {setUser,login ,set_login_status,setRedirectionUrl } from '../Actions/'
class Login extends React.Component{
    constructor(props){
        super(props);
        this.signIn=this.signIn.bind(this);
        this.state={loggedIn:false,error:""}

    }
    componentDidMount() {
        const that=this;
        //that.props.dispatch(set_login_status());
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("hi")
            if (user) {

              // User is signed in.
              if(user.emailVerified){
              const state= Object.assign(that.state,that.props)
             
              that.setState(state)
             
              var user = firebase.auth().currentUser;
              that.props.dispatch(setUser(user));
              that.props.dispatch(login(true));
              }
              else{
                that.state.error="Please verify your email";
                firebase.auth().signOut().then(function() {
                
                    // Sign-out successful.
                  }).catch(function(error) {
                    // An error happened.
                  });
              }
              
            //   that.state.loggedIn=true;
            //   that.setState(that.state);

          
            } else {
              // No user is signed in.
            }
          });
     
    }
    signIn(e){
        e.preventDefault();
      
        var email=document.getElementById("email").value;
        var password=document.getElementById("password").value;
        const that = this;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            var user = firebase.auth().currentUser;
            console.log(user.emailVerified)
            if(user.emailVerified){
            var name=document.getElementById("name").value;
          //  that.props.dispatch(setUser(user));
           // that.props.dispatch(login(true));
            }
            else{
                that.state.error="Please verify your email";
                firebase.auth().signOut().then(function() {
                
                    // Sign-out successful.
                  }).catch(function(error) {
                    // An error happened.
                  });
            }
            //   that.state.loggedIn=true;
            //   that.setState(that.state);

              
             
          }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
             // console.log(errorMessage)
              that.state.error=errorMessage;
              that.setState(that.state);
           //   console.log(this.state.error);
            });
            
    }

    render(){
        console.log("logged in")
        if(this.props.session.logged_in){
            console.log(this.props.session)
            return (<Redirect to={this.props.session.redirect_url} />);
        }else{
            const btn_style={
                "backgroundColor":"#fff",
                color:"#212121"
            }
            return(
            <div className="container">
                <div className="card">
                                <h1 className="header center black-text">Login</h1>
                                <hr></hr>
                                <div className="card-content red-text">
                                    <p id="error">{this.state.error}</p>
                                <form>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <input id="email" type="email" className="validate"/>
                                        <label htmlFor="email">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                        <input id="password" type="password" className="validate"/>
                                        <label htmlFor="password">password</label>
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="input-field col s12">
                                            <button className="btn waves-effect " style={btn_style} type ="submit"  onClick={this.signIn} name="action">
                                                Login
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
    console.log(state)
    return state;
  }
export default connect(mapStateToProps)(Login)
