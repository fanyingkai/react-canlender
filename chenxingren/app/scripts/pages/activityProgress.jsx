import React from 'react';
import { Link } from 'react-router'
import Header from '../components/header.jsx'
import SetRingTime from '../components/setRingTime.jsx'
import AnchorToDetail from '../components/anchorToDetail.jsx'
import Gifts from '../components/gifts.jsx'
import MyGifts from '../components/myGifts.jsx'
import Modal from '../components/modal.jsx'
import activityProgressActions from '../actions/activityProgressActions.js'
import activityProgressStore from '../stores/activityProgressStore.js'
import Loading from '../components/loading.jsx';
import appActions from '../actions/appActions.js';
import AppStore from '../stores/appStore.js';

const styles = {}

styles.y_standard = {
  margin:'1em auto',
  width: '1em',
  height: '1em',
  borderRadius: '50%',
  border:'0.5em solid #000'
}

styles.n_standard = {
  margin:'1em auto',
  width: '1em',
  height: '1em',
  borderRadius: '50%',
  border:'0.5em solid #e1e1e1'
}

const ActivityProgress = React.createClass({

 getInitialState() {
    return {
      activityProgress : []
    }
  },
 componentWillUnmount() {
   this.unsubscribe();
   this.unsubscribeAppLoading();
   console.log('ActivityProgress--componentWillUnmount')
 },

 onStatusChange(state) {
   console.log('activityProgressActionsonStatusChange')
   console.log(state)
   this.setState(state);
 },

 componentDidMount() {
   console.log('appActions.loadAppCompleted')
   console.log(appActions)
   this.unsubscribe = activityProgressStore.listen(this.onStatusChange);
   this.unsubscribeAppLoading = AppStore.listen(this.onStatusChange);
   activityProgressActions.loadActivityProgress();
   /* 页面加载情况判断 */
   // appActions.loadApp.failed(1);
   appActions.loadApp.completed();
 },

 render(){
    var activityProgress=this.state.activityProgress;
    // const { activityProgress } = this.props
    console.log('[this.state]')
    console.log(this.state)
    return (
     <div>
        <div id='acticityProgress'>
            <div className='serial-day'>
                <div>已经连续早起</div>
                <div><em>0</em>天</div>
                <div>早起失败，再接再厉</div>
            </div>

            <Link to="calender">
                <ul className='acticity-progress-box clearfix'>

                  {activityProgress.map((acticityprogress,index) => (
                    <li key={acticityprogress.a}>
                        <div>3/9</div>
                        <div style={acticityprogress.a>5 ? styles.y_standard:styles.n_standard}></div>
                        <div>未设置</div>
                    </li>
                  ))}
            
                </ul>
            </Link>
            
            <SetRingTime />
            <MyGifts />
            <p>本活动起床时间以手环闹钟生效时间为准</p>
            <p>若闹钟时间显示不正确，请返回小米运动首页下拉刷新！</p>
            <AnchorToDetail toDetail={this.detail} ><em className='downArrow'>∨</em>&nbsp;本期活动奖品&nbsp;<em className='downArrow'>∨</em></AnchorToDetail>
            <Gifts data={false}/>
        </div>
        <Modal isShow={true}/>
      </div>

    );
   }
});

export default ActivityProgress;