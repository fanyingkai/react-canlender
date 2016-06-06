import Reflux from 'reflux';
import appActions from '../actions/appActions';
import baseConst from '../components/baseConst.js';
import $ from '../components/jquery.js';

let AppStore = Reflux.createStore({
  listenables: appActions,
  
  init() {
    this.app = [{'a':1},{'a':2},{'a':3},{'a':4},{'a':5},{'a':6},{'a':7}];
  },

  loadApp() {
    this.trigger({ 
      app : this.app,
      loadParams:{/*  页面加载状态参数 */
        loading: true,
        loadType:2
       }
    });
  },

  loadAppCompleted() {
    console.log('loadAppCompletedloading')
    this.trigger({ 
      loadParams:{
        loading: false,
        loadType:4
       }
    });
  },

  loadAppFailed(errorType) {
    //1 点击屏幕，重新加载,2 正在加载数据，请稍后,3 网络异常 4.加载完成
    console.log('errorType===='+errorType)
    this.trigger({ 
      error : errorType,
      loadParams:{
        loading: false,
        loadType:errorType
       }
    });
  }

});

export default AppStore;