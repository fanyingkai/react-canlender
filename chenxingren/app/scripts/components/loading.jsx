import React from 'react';
import { Link } from 'react-router'
import $ from '../components/jquery.js'
import appActions from '../actions/appActions.js'
import AppStore from '../stores/appStore.js'

class Loading extends React.Component {

 constructor(props){
  super(props);
  console.log('props')
  console.log(props)
  this.state = {
    app : [],
    loading: props.loadType.loading||true,
    loadType:props.loadType.loadType||2,
    loadingContext:'正在加载数据，请稍后'
  };
  console.log('loadingContext==1'+this.state)
  console.log(this.state)
  this.timer=null;
 } 
 
 componentWillReceiveProps(props){
  console.log('props```')
  console.log(props)
  clearInterval(this.timer)
  this.timer=null;
  this.setState({
    app : this.app,
    loading: props.loadType.loading||true,
    loadType:props.loadType.loadType||2
   })
 }

 renderContext(){
   console.log('loadingContext==2'+this.state)
   console.log(this.state)
   this.setState({
    app : [],
    loading: true,
    loadingContext:this.state.loadingContext.replace('...','')+'.'
   })
 }

 render(){
    let loadTypeContext;
    let loadStatusType;
    let display;

    console.log('this.state.loadType');
    console.log(this.state.loadType);
    switch(this.state.loadType){
     case 1:
      loadTypeContext=(
       <Link to="app"><span>点击屏幕，重新加载</span></Link>
       )
      break;
     case 2:
      console.log('loadType==2')
      clearInterval(this.timer)
      this.timer=null;
      this.timer=setInterval(this.renderContext.bind(this),500)
      loadTypeContext=(<span className='dotting'>{this.state.loadingContext}</span>)
      break;
     case 3:
      loadTypeContext=(<span>网络异常</span>)
      break;
     case 4:
      display={display:'none'}
      break;
    }
    return (
       <div id='loading' style={this.state.style,display}>
          {loadTypeContext}
       </div>
    );
   }

};

export default Loading;