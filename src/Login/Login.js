import React from 'react';
import M from 'materialize-css';
import firebase from '../Components/Firebase';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {setUser,login ,set_login_status } from '../Actions/'
class Login extends React.Component{
    constructor(props){
        super(props);
        this.signIn=this.signIn.bind(this);
        this.state={loggedIn:false}

    }
    componentDidMount() {
        const that=this;
        //that.props.dispatch(set_login_status());
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("hi")
            if (user) {
              // User is signed in.
            
             
              var user = firebase.auth().currentUser;
              that.props.dispatch(setUser(user));
              that.props.dispatch(login(true));
              
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
            var name=document.getElementById("name").value;
            that.props.dispatch(setUser(user));
            that.props.dispatch(login(true));
            //   that.state.loggedIn=true;
            //   that.setState(that.state);

              
             
          }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
              console.log(errorMessage)
              that.state.error=errorMessage;
              that.setState(that.state);
           //   console.log(this.state.error);
            });
            
    }

    render(){
        console.log("logged in")
        if(this.props.logged_in){
            console.log("logged in")
            return (<Redirect to="/shimpchat" />);
        }else{
            const btn_style={
                "backgroundColor":"#fff",
                color:"#212121"
            }
            return(
            <div class="container">
                <div class="card">
                                <h1 className="header center black-text">Login</h1>
                                <hr></hr>
                                <div className="card-content white-text">
                                <form>
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
    return {
      user: state.user,
      logged_in:state.logged_in
    };
  }
export default connect(mapStateToProps)(Login)
