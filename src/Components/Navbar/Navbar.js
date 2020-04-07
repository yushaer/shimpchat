import React from 'react';
import M from 'materialize-css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../../Home/Home';
import Login from '../../Login/Login';
import Profile from '../../Profile-Picture/Profile';
import Register from '../../Register/Register';
import firebase from'../Firebase';
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.handleLogOut=this.handleLogOut.bind(this);
        this.state={loggedIn:false};
    }
    handleLogOut(e){
        e.preventDefault();
        const that=this;
        firebase.auth().signOut().then(function() {
            that.state.loggedIn=false;
                  that.setState(that.state);
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }
    componentDidMount() {

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, 0);
          });
         
            const that=this;
            firebase.auth().onAuthStateChanged(function(user) {
                console.log("hi")
                if (user) {
                  // User is signed in.
                
                 
                  var user = firebase.auth().currentUser;
             
                  that.state.loggedIn=true;
                  that.setState(that.state);
    
              
                } else {
                  // No user is signed in.
                }
              });
         
   
    }
    render(){
        return(
            <Router>

            <nav className=" blue darken-3">
                <div className="nav-wrapper">
                  <a href="#!" className="brand-logo">Logo</a>
                  <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                  <ul className="right hide-on-med-and-down">
                    <li><Link to={'/shimpchat'}>home</Link> </li>
                    {!this.state.loggedIn?( <li><Link to={'/login'}>login</Link></li>):""}
                    <li><Link to={'/Register'}>Register</Link></li>
                 
                    <li><Link to={'/profile-picture'}>Profile</Link></li>
                    {!this.state.loggedIn?"":( <li><a href="" onClick={this.handleLogOut}>logout</a></li>) }
                   
                  </ul>
                </div>
              </nav>
            
              <ul className="sidenav" id="mobile-demo">
              <li><Link to={'/shimpchat'}>home</Link> </li>
                    <li><Link to={'/login'}>login</Link></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
              </ul>
              <Switch>
              <Route exact path='/shimpchat' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/profile-picture' component={Profile} />
              <Route path='/Register' component={Register} />
          </Switch>

              </Router>




        )

    }
}
export default Navbar;