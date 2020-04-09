import React from 'react';
import M from 'materialize-css';
import { Redirect } from 'react-router';
import firebase from '../Components/Firebase';
import "firebase/firestore";
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {setUser,login ,get_user,set_login_status,setRedirectionUrl,get_message } from '../Actions/'
import Message from '../Components/Message/Message';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.handleMsg= this.handleMsg.bind(this)
        this.handleButton= this.handleButton.bind(this)
        this.state={
            "messages":[
                
        
        
        ],
        logged_in:true,
        user:null

    }
    

    }
    add_messages(msg){
        var db = firebase.firestore();
            
        db.collection("messages").add({
            Name:this.props.user.displayName,
            message:msg,
            user_id:this.props.user.user_id,
            created:firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(docRef) {
            //console.log("Document written with ID: ", docRef.id);
            var objDiv = document.getElementById("message_div");
objDiv.scrollTop = objDiv.scrollHeight;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
    }
    handleMsg(e){
  
        if(e.key === 'Enter'){
           var message=document.getElementById("msg_inp").value;
          this.add_messages(message);
        }
    }
    handleButton(e){
        e.preventDefault();
        var message=document.getElementById("msg_inp").value;
        this.add_messages(message);
    }
    componentDidMount (){
        
        //console.log("t" +this.state)
        this.props.dispatch(set_login_status())
        this.props.dispatch(get_user());
        this.props.dispatch(get_message());
        document.addEventListener('DOMContentLoaded', function() {
            //console.log("test")
            var elems = document.querySelectorAll('.parallax');
            var instances = M.Parallax.init(elems, 0);
          });
          var elems = document.querySelectorAll('.parallax');
          var instances = M.Parallax.init(elems, 0);
        
          
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.materialboxed');
            var instances = M.Materialbox.init(elems,0);
        });

        const that=this;
      
      
        
        const state= Object.assign(that.state,that.props)
        state.session.logged_in=that.props.session.logged_in;
      //  console.log(state)
        that.setState(state)
     //  console.log(that.state.session.logged_in)
      if(this.props.session.logged_in){
//         var db = firebase.firestore();

//         db.collection("messages").orderBy("created").onSnapshot(function(querySnapshot) {
//         var messages = [];
//         querySnapshot.forEach(function(doc) {
//             messages.push({id: doc.id,user_id:doc.data().user_id,"name":doc.data().Name,"message":doc.data().message,"created":doc.data().created});
            
//         });
        
//         that.state.messages=messages;
//         that.setState(that.state)
//         var objDiv = document.getElementById("message_div");
//         objDiv.scrollTop = objDiv.scrollHeight;
        
   

  
//   });
          
      }
          

    }
    
    componentDidUpdate(prevProps) {
        
        if(this.props.session.logged_in!=prevProps.session.logged_in||prevProps.user.displayName!=this.state.user.displayName ){
          
            const state= Object.assign(this.state,this.props)
    
            this.setState(state)
            //console.log(this.state)
        }
      
      

        
    }
    render(){
        if(this.props.session.logged_in===true){
           // console.log(this.props.session.logged_in)
            const paralax_style={
                transform: "translate3d(-50%, 355.605px, 0px)",
                opacity: 1
            }
            const mask={
                width:"100%",
                height:"100%",
                opacity:0.7,
                backgroundColor:"white",
                position:"absolute",
                top:"0"
            }

            return(
                <React.Fragment>
                <div class="parallax-container">
                
                    <div class="parallax"><img class="materialboxed" src={require('../Components/Images/simpBack.png')} style={paralax_style}></img><div class="mask" style={mask}>
                    <h1 className ="header center black-text">SimpChat </h1>
                    <h2 className="center">{this.state.user !=null?"Hello " +this.state.user.displayName:""} Time to get your simp up!!!</h2>
                    </div>
                    </div>
                </div> 
                <section class="section grey-bg">
                
                <div className="container white z-depth-4">
                    <div className="card">
                    <h2 className=" header center">Chat</h2>
                    <div class="card-content">
                    <div className="messages" id="message_div">
                    <br></br>
              
                    {this.props.messages.map( (item)=>{
                        const msg=item.message;
                            
                        
                        return(

                            <Message key= {item.id} name={item.name} user_id={item.user_id} message ={item.message} date={(<Moment format="YYYY/MM/DD hh:mm:ss">
                            {item.created!=null? item.created.toDate(" HH:mm:ss"):""}
                              </Moment>)}/>
     
                         
                        )
                    })}
                    </div>
                    
                    {/* <div className="row">
                        <div className="col s1"></div>
                        <div className="col s10"> */}
                            <div className="messageInput">

                            <div className="row">
                                <div className="input-field suffix col s12 black-text">
                                <input onKeyPress={this.handleMsg} id="msg_inp" className="validate send"></input>
                            
                                
                                <a onClick ={this.handleButton} class="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">send</i></a>
                                </div>
                                </div>
                            </div>
                       
                         {/* </div>  
                         <div className="col s1"></div> 
                    </div> */}
                        </div>
                    </div>
                </div>
                </section>
                </React.Fragment>
            

            )
        }
        else{
            this.props.dispatch(setRedirectionUrl("/"))
            return (<Redirect to="/login" />);
        }
         
    }
}
function mapStateToProps(state) {
  //  console.log(state)
    return state;
  }
export default connect(mapStateToProps)(Home)

