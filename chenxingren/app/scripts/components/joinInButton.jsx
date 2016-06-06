import React from 'react';
import $ from '../components/jquery.js'

const JoinInButton = React.createClass({

 branceletJoinInButton(event){
    let obj=this.refs.joinButton;
    console.log(obj)
 },
 render(){
    return (
        <p ref="joinButton" className='t1 setRing' onClick={this.branceletJoinInButton}>立即参加</p>
    );
   }
});

export default JoinInButton;