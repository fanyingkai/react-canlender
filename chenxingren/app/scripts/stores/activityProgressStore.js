import Reflux from 'reflux';
import activityProgressActions from '../actions/activityProgressActions';
import baseConst from '../components/baseConst.js';
import $ from '../components/jquery.js';

let activityProgressStore = Reflux.createStore({
  listenables: activityProgressActions,
  
  init() {
    this.activityProgress = [{'a':1},{'a':2},{'a':3},{'a':4},{'a':5},{'a':6},{'a':7}];
  },

  loadActivityProgress() {
    this.trigger({ 
      activityProgress : this.activityProgress,
      loading: false
    });
  },

  add(){
    console.log('add')
  },

  loadActivityProgressCompleted(activityProgress) {
    this.activityProgress = activityProgress;
    this.trigger({ 
      activityProgress : this.activityProgress,
      loading: false
    });
  },

  loadActivityProgressFailed(error) {
    this.trigger({ 
      error : error,
      loading: false
    });
  }

});

export default activityProgressStore;