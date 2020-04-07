import React from 'react';
import { connect } from 'react-redux';
import firebase from '../Firebase';
import "firebase/firestore";
class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={photoURL:""}
    }
    render(){
        let left;
        let right;
        var db = firebase.firestore();
        var docRef = db.collection("users").doc(this.props.user_id);
       const that =this;
        docRef.get().then(function(doc) {
           
               // console.log("Document data:", doc.data());
                that.setState({photoURL:doc.data().photoURL})
               
            
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        if (this.props.user_id!=this.props.user.user_id) {
      
         left =(<div className="name ">
                    
            <img src={this.state.photoURL} style={{width:"40px"}} alt="" className="circle  z-depth-4"></img><br></br>
            <span className="title ">{this.props.name}</span>
        
            </div>);
        }
        else{
            left ="";
        }
        if (this.props.user_id==this.props.user.user_id) {
            right =(<div className="name">
                       
               <img src={this.props.user.photoURL} style={{width:"40px"}} alt="" className="circle  z-depth-4"></img><br></br>
               <span className="title ">{this.props.name}</span>
           
               </div>);
           }
           else{
               right ="";
           }
            return( 
               
                
                 
                        
                        <div className={this.props.user_id==this.props.user.user_id?"box-gray-self ":"box-gray "}>
                        {left}
                        
                        <div className="message-body z-depth-4">
                            
                        <p>{this.props.message}</p>

                       
                        <div className="">
                    ({this.props.date})

                        </div>
                        </div>
                        {right}
                          
                        </div>
                   
            
                
                 
            )
      
    }
}
function mapStateToProps(state) {
   // console.log(state)
    return state;
  }
export default connect(mapStateToProps)(Message)