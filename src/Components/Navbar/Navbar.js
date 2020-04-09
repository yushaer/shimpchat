import React from 'react';
import M from 'materialize-css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../../Home/Home';
import { connect } from 'react-redux';
import Login from '../../Login/Login';
import Profile from '../../Profile-Picture/Profile';
import Register from '../../Register/Register';
import firebase from'../Firebase';
import {setUser,login ,get_user,set_login_status,setRedirectionUrl } from '../../Actions/'

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.handleLogOut=this.handleLogOut.bind(this);
        this.state={loggedIn:false,menu_item:null};
     
     
       
    }
    handleLogOut(e){
        e.preventDefault();
        const that=this;
        firebase.auth().signOut().then(function() {
       
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }
    componentDidMount() {
      this.props.dispatch(set_login_status)
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, 0);
          });
         
            const that=this;
            
  
      //  console.log(state)

            this.state.menu_item=[
              {link:"/",text:"home",component:Home},
              !this.props.session.logged_in?{link:"/login",text:"login",component:Login}:null,
              {link:"/Register",text:"Register",component:Register},
              {link:"/profile-picture",text:"Profile",component:Profile}
            ];
            this.setState(this.state)
            console.log(this.state)
            if(this.props.session.logged_in)
            {
              that.state.loggedIn=true;
              that.setState(that.state);
            }
          
            
             
               
         
   

    }
   
    generate_menu() {
      if(this.state.menu_item!=null){
        console.log("hi")
        return  this.state.menu_item.map( (item,index)=>{
          return (<MenuItem link={item.link} text={item.text}></MenuItem>)

         })
      }
     
    }
    render(){
        return(
            <Router basename={process.env.PUBLIC_URL}>

            <nav className=" blue darken-3">
                <div className="nav-wrapper">
                  <a href="#!" className="brand-logo">Logo</a>
                  <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                  <ul className="right hide-on-med-and-down">
                    { this.generate_menu()}
                   
                    {!this.props.session.logged_in?"":( <li><a href="" onClick={this.handleLogOut}>logout</a></li>) }
                   
                  </ul>
                </div>
              </nav>
            
              <ul className="sidenav" id="mobile-demo">
              { this.generate_menu()}
                    {!this.props.session.logged_in?"":( <li><a href="" onClick={this.handleLogOut}>logout</a></li>) }
              </ul>
            
              <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/profile-picture' component={Profile} />
              <Route path='/Register' component={Register} />
          </Switch>

              </Router>




        )

    }
}
function mapStateToProps(state) {
  //  console.log(state)
    return state;
  }
export default connect(mapStateToProps)( Navbar);
class MenuItem extends React.Component{
   constructor(props){
     super(props);
   }
   render(){
     return(
      <li><Link to={this.props.link}>{this.props.text}</Link> </li>
     )
    
   }
}

class route_item extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Route  path={this.props.link} component={this.props.component} />
    )
  }
}