import React from 'react';
import { Link } from 'react-router'
import modalActions from '../actions/modalActions.js'
import ModalStore from '../stores/modalStore.js'

var prizeStatus={}
prizeStatus.style={
    background:'#e1e1e1'
}

class Modal extends React.Component{

  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      modals : [],
      loading: false,
      show:true 
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
    this.unsubscribe = ModalStore.listen(this.onStatusChange.bind(this));
    modalActions.loadModal();
  }

  getDraw(){
    window.location.hash = "#checkPrize";
  }
  
  closeModal(){
    console.log('closeModal')
    modalActions.closeModal();
  }

  render(){
    console.log(this.state)
    console.log('this.props.isShow')
    let modalType='prizeNotice';//prizeMakeUp,prizeObj
    let content;
    var isShow=this.props.isShow&&this.state.show;
    let mask = isShow ? <div id='mask'></div> :''

    switch(modalType){
     case 'prizeNotice':
      content=(
           <div>
            <span className='ts1'>恭喜获得</span>
            <span className='ts2'>肯德基豪华早餐券一张</span>
            <button onClick={this.getDraw}>立即领取</button>
            <em className='close' onClick={this.closeModal}>X</em>
          </div>
       );
      break;
     case 'prizeMakeUp':
      content=(
           <div>
            <span className='ts1'>奖品正在补充中...</span>
            <span className='ts2'>请稍后进入活动页面进行领取</span>
            <em className='close' onClick={this.closeModal}>X</em>
          </div>
       );
      break;
     case 'prizeObj':
      content=(
           <div>
            <span className='ts0'>20元</span>
            <span className='ts3'>肯德基豪华早餐券一张请妥善保存</span>
            <span className='ts3'>No.123456789012</span>
            <span className='ts4'>请前往肯德基门店消费使用有效期至:2016-04-15 </span>
            <em className='close' onClick={this.closeModal}>X</em>
          </div>
       );
      break;
    }
    return (
      <div>
       <div id='modal' className='modal-active animated' style={isShow?{display:'block'}:{display:'none'}}>
        {content}
       </div>
        {mask}
      </div>
    )
  }

};

export default Modal;