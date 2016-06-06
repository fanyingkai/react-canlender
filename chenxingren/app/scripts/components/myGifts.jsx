import React from 'react';
import { Link } from 'react-router'
import giftActions from '../actions/giftActions.js'
import MyGiftStore from '../stores/myGiftStore.js'

var prizeStatus={}
prizeStatus.style={
    background:'#e1e1e1'
}

var activityRuleStyle={
    margin: 'auto',
    width: '5em',
    display: 'block',
    textAlign: 'center',
    color:'blue',
    textDecoration: 'underline !important'
}

class MyGifts extends React.Component{

  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      myGifts : [],
      loading: false
    };
  }

  componentWillUnmount() {
    this.unsubscribe();
    console.log('componentWillUnmount')
  }

  onStatusChange(state) {
    console.log('onStatusChange')
    console.log(state)
    this.setState(state);
  }

  componentDidMount() {
    this.unsubscribe = MyGiftStore.listen(this.onStatusChange.bind(this));
    MyGiftStore.loadMyGifts();
  }

  detail(event) {
   window.location.hash = "#detail";
  }

  checkPrize(){
    window.location.hash = "#checkPrize";
  }
  
  render(){
    console.log(this.state.myGifts)
    return (
        <div id='my-prize-list'>
          {this.state.myGifts.map((gift,index) => (
          <div className='clearfix' key={gift.gid}>
            <div>
              <span className='timeEnd'>{'领取有效期至'+gift.expiry_DATE}</span>
              <em>我的奖品展示</em>
            </div>
            <span>立即领取</span>
          </div>
          ))}
        </div>
    )
  }

};

export default MyGifts;