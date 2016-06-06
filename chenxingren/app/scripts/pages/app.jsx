import React from 'react';
import { Link } from 'react-router'
import Header from '../components/header.jsx'
import apiHelper from '../components/apiHelper.js'
import analytics from '../components/analytics.js'
import Loading from '../components/loading.jsx'
import appActions from '../actions/appActions.js';
import AppStore from '../stores/appStore.js';

class App extends React.Component {

   constructor(props){
     super(props);
     console.log(props)
     this.state = {
       app : [],
       loadParams:{
        loading: true,
        loadType:2//1 点击屏幕，重新加载,2 正在加载数据，请稍后,3 网络异常 4.加载完成
       }
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
     this.unsubscribe = AppStore.listen(this.onStatusChange.bind(this));
     // appActions.loadApp.completed();
   }

   render(){
      console.log('this.props.loading')
      console.log(this.state.loadParams)
      let loading=this.state.loadParams;
      let loadContext;
      loadContext=(<Loading loadType={this.state.loadParams}/>)
      
      return (
       <div>
        {loadContext}
        {this.props.children}
       </div>
        
      );
     }
};
export default App; 