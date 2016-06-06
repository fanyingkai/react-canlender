import React from 'react';
import { Link } from 'react-router'
import giftActions from '../actions/giftActions.js'
import GiftStore from '../stores/giftStore.js'
import AnchorToDetail from '../components/anchorToDetail.jsx'
import Rules from '../components/rulesContent.jsx';

var prizeStatus={}
prizeStatus.style={
    background:'#e1e1e1'
}



class Gift extends React.Component{

  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      gifts : [],
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
    this.unsubscribe = GiftStore.listen(this.onStatusChange.bind(this));
    giftActions.loadGifts();
  }

  detail(event) {
   window.location.hash = "#detail";
  }

  checkPrize(){
    console.log('checkPrize==========:'+checkPrize)
  }
  
  render(){
    console.log(this.state.gifts)
    return (
      <div>
        <div id='prize-list' className='clearfix'>
          {this.state.gifts.map((gift,index) => (
            <div key={gift.gid} style={ gift.status==='1' ? prizeStatus.style : {} } onClick={this.checkPrize}>
              <em>{gift.worth}{gift.worth_type}</em><span>{gift.name}</span>
            </div>
          ))}
        </div>
        <p>注:以上奖品，由达标用户随机领取</p>
        <AnchorToDetail sty={activityRuleStyle}>活动细则</AnchorToDetail>
        <Rules></Rules>
      </div>
    )
  }

};

export default Gift;