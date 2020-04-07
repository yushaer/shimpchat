import React from 'react';
import firebase from '../Components/Firebase';
import 'firebase/storage'; 
import { connect } from 'react-redux';

import "firebase/firestore";
import { Redirect } from 'react-router';

import {setUser,login ,get_user,set_login_status,setRedirectionUrl } from '../Actions/'
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={image:null,
        progress:0};
        this.handle_file_change=this.handle_file_change.bind(this);
        this.handle_upload=this.handle_upload.bind(this);
    }
  
    handle_file_change(e){
        const image=e.target.files[0];
        this.setState({...this.state,"image":image});
    }
    handle_upload(e){
        console.log("heel")
        let image=this.state.image;
        const that =this;
        var storage = firebase.storage();
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        that.setState({ ...that.state,progress });
        console.log(that.state.progress)
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
           
           let db= firebase.firestore();
           var userRef = db.collection("users").doc(this.props.user.user_id);


                return userRef.update({
                    photoURL:url
                })
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
           
            ;
          });
      })
    }
    componentDidMount (){
        
        console.log("t" +this.state)
        this.props.dispatch(set_login_status())
        this.props.dispatch(get_user());
    

        const that=this;
      
      
        
        const state= Object.assign(that.state,that.props)
        state.session.logged_in=that.props.session.logged_in;
        that.setState(state)
        console.log("t" +this.state)
      


    }
    componentDidUpdate(prevProps) {
        
        if(this.props.session.logged_in!=prevProps.session.logged_in||prevProps.user.displayName!=this.state.user.displayName ){
          
            const state= Object.assign(this.state,this.props)
    
            this.setState(state)
            console.log(this.state)
        }
      
      

        
    }
    render(){
        const btn_style={
            "backgroundColor":"#fff",
            color:"#212121"
        }
        const upload_btn_style={
            "backgroundColor":"rgba(54, 162, 255, 0.77)",
            color:"#212121"
        }
        
        if(this.props.session.logged_in===true){
            return(
            <div className="bg1">
                <div className="container">
                <div className="card">
                                <h1 className="header center black-text">Upload your Profile picture</h1>
                                <hr></hr>
                                <div className="card-content black-text">
                                
                                <span className="center green-text"> {this.state.progress==100?"Profile Picture Successfully updated":""} </span >
                                <div className="progress">
      <div className="determinate" style={{"width":this.state.progress+"%" }}></div>
  </div>
 
                                <div className = "row">
                    <label>Upload your picture</label>
                    <div className = "file-field input-field">
                        <div className = "btn" style={upload_btn_style}>
                            <span >Browse</span>
                            <input type = "file"  accept="image/*" onChange={this.handle_file_change} />
                        </div>
                        
                        <div className = "file-path-wrapper">
                            <input className = "file-path validate" type = "text"
                                placeholder = "Upload file" />
                        </div>
                    </div>
                    </div>
                                    <div className="center">
                                        <div className="input-field col s12">
                                            <button className="btn waves-effect " style={btn_style}  onClick={this.handle_upload} name="action">
                                            Upload
                                            </button>
                                                    
                                        
                                        </div>
                                    </div>
                           
                                </div>
                            </div>
                        </div>
                 </div>       
        
            )
        }
        else{
            this.props.dispatch(setRedirectionUrl("/profile-picture"))
            return (<Redirect to="/login" />);
        }
    }
}



  function mapStateToProps(state) {
    console.log(state)
    return state;
  }

export default connect(mapStateToProps)(Profile)
