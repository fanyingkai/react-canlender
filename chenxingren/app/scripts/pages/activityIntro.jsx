import React from 'react';
import { Link } from 'react-router'
import SetRingTime from '../components/setRingTime.jsx'
import AnchorToDetail from '../components/anchorToDetail.jsx'
import Modal from '../components/modal.jsx'
import JoinInButton from '../components/joinInButton.jsx'
import Rules from '../components/rulesContent.jsx';
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

const ActivityIntro = React.createClass({

 getInitialState() {
    return {
      activityIntro : [],
      loading: false
    }
  },
 componentWillUnmount() {
   this.unsubscribe();
   console.log('ActivityIntro--componentWillUnmount')
 },

 onStatusChange(state) {
   console.log('activityIntroActionsonStatusChange')
   console.log(state)
   this.setState(state);
 },

 componentDidMount() {
    this.unsubscribe = AppStore.listen(this.onStatusChange.bind(this));
    appActions.loadApp.completed();
    // appActions.loadApp.failed();
 },

 render(){
    var activityIntro=this.state.activityIntro;
    console.log(this.state)
    return (
      <div style={{textAlign:'center'}}>
        <h2>你的未来，决战清晨</h2>
        <div id='intro-ad'>连续7天7点前起床 赢肯德基豪华早餐</div>
        <p style={{margin:'0 auto',width:'68%'}}>参与挑战需将手环闹钟设置到7点前 最终以手环闹钟生效时间为准</p> 
        <AnchorToDetail sty={activityRuleStyle}>什么是晨型人?</AnchorToDetail>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>晨型人，是指那些坚持晚上早早睡觉，早晨四五点钟就起床的人，为了在忙碌的生活工作中保留快乐，因而早起，听音乐看书听广播的生活方式。“晨型人”的概念来自日本，日本“早起心身医学研究所”的所长税所弘，是“晨型人”观念的起源。口号：你的未来，决战早晨！夜型社会已经逐渐迈向晨型社会！</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>好处</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>1. 早睡早起是最佳美容法，而且免费，不必擦一大堆保养品，气色自然好，而且皱纹会减少。</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>2. 会变瘦。因为生活正常，身体代谢正常，不必要的东西不会囤积在体内，包括脂肪；若配合晨间运动，效果更佳。</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>3. 减少感冒生病的机率，因为体内循环良好，抵抗力变强。</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>4. 早上有充分时间好好阅读，头脑清楚，吸收能力强</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>5. 早睡早起是最佳美容法，而且免费，不必擦一大堆保养品，气色自然好，而且皱纹会减少。</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>6. 会变瘦。因为生活正常，身体代谢正常，不必要的东西不会囤积在体内，包括脂肪；若配合晨间运动，效果更佳。</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>7. 减少感冒生病的机率，因为体内循环良好，抵抗力变强。</p>
        <p style={{textAlign:'left','padding':'0.2em 1em'}}>8. 早上有充分时间好好阅读，头脑清楚，吸收能力强</p>

        <JoinInButton />
        <AnchorToDetail sty={activityRuleStyle}>活动细则</AnchorToDetail>
        <Rules></Rules>
      </div>

    );
   }
});

export default ActivityIntro;