import React from 'react';
import HM_Calendar from '../components/calender.js'
import $ from '../components/jquery.js'

const SetRingTime = React.createClass({

 branceletSetRingTime(event){
    let obj=this.refs.setRingTime;
    console.log(obj)
 },
 render(){
    return (
        <p ref="setRingTime" className='t1 setRing' onClick={this.branceletSetRingTime}>设置手环闹钟</p>
    );
   }
});

export default SetRingTime;