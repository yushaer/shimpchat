import React from 'react';
import M from 'materialize-css';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Component:{
                {props.type=="register"? name:( <div className="row">
                <div className="input-field col s12">
                <input id="name" type="text" className="validate"/>
                <label for="name">name</label>
                </div>
            </div>):""}}
            }
        }
    }
    render(){

        if(this.props.type=)
    }
}