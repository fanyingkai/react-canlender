import React from 'react';
import HM_Calendar from '../components/calender.js'
import SetRingTime from '../components/setRingTime.jsx'

const Canlender = React.createClass({

 componentDidMount() {
    var data = {
     nowDate: 20160501, //当前时间服务器时间
     visual: {
      width: '91%' //日历初始化宽度，百分比或是像素值
     },
     curMonth: 201605,//当前显示的年月份
     criticalPoint: 25200,//当前的闹钟标尺时间
     resultset: [{
      date: 20160501,
      setting: 25200 //闹钟设置的时间
     }]
    }
    var calender=new HM_Calendar(data);
    calender.show();
 },
 render(){
    console.log('calender');
    return (
        <div>
            <div id='calender'></div> 
            <SetRingTime />
            <p className='t1'>本活动起床时间以手环闹钟生效时间为准</p>
            <p className='t1'>若闹钟时间显示不正确，请返回小米运动首页下拉刷新！</p>
        </div>
        
    );
   }
});

export default Canlender;