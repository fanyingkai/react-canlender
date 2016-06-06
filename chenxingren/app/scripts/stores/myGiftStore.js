import Reflux from 'reflux';
import giftActions from '../actions/giftActions';
import baseConst from '../components/baseConst.js';
import $ from '../components/jquery.js';
import Gifts from '../data/gifts.js';

let MyGiftStore = Reflux.createStore({
  listenables: giftActions,
  
  init() {
    this.myGifts = [];
  },
  secondToDate(second){
    var date=new Date(second*1000);
    var Year=date.getFullYear();
    var Mouth=date.getMonth()+1;
    var day=date.getDate();
    return Year + '年' + Mouth+ '月' + day+'日';
  },
  loadMyGifts() {

    console.log('--------------Gifts--------------');
    for(var i=0;i< Gifts.length;i++){
     Gifts[i].expiry_DATE = this.secondToDate(Gifts[i].expiry_date)
     Gifts[i].start_DATE = this.secondToDate(Gifts[i].start_date)
    }
    console.log(Gifts);
    this.trigger({ 
      myGifts : Gifts,
      loading: true
    });
  },

  loadMyGiftsCompleted(myGifts) {
    this.myGifts = myGifts;
    this.trigger({ 
      myGifts : this.myGifts,
      loading: false
    });
  },

  loadMyGiftsFailed(error) {
    this.trigger({ 
      error : error,
      loading: false
    });
  }

});

export default MyGiftStore;