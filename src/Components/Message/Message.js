import React from 'react';
import { connect } from 'react-redux';
class Message extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let left;
        let right;
      
        if (this.props.name!=this.props.user.displayName) {
         left =(<div className="name ">
                    
            <img src={require('../Images/simpBack.png')} style={{width:"40px"}} alt="" className="circle  z-depth-4"></img><br></br>
            <span className="title ">{this.props.name}</span>
        
            </div>);
        }
        else{
            left ="";
        }
        if (this.props.name==this.props.user.displayName) {
            right =(<div className="name">
                       
               <img src={require('../Images/simpBack.png')} style={{width:"40px"}} alt="" className="circle  z-depth-4"></img><br></br>
               <span className="title ">{this.props.name}</span>
           
               </div>);
           }
           else{
               right ="";
           }
            return( 
               
                
                 
                        
                        <div className={this.props.name==this.props.user.displayName?"box-gray-self ":"box-gray "}>
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
    console.log(state)
    return state;
  }
export default connect(mapStateToProps)(Message)