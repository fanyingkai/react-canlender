import Reflux from 'reflux';
import giftActions from '../actions/giftActions';
import baseConst from '../components/baseConst.js';
import $ from '../components/jquery.js';
import Gifts from '../data/gifts.js';

let giftStore = Reflux.createStore({
  listenables: giftActions,
  
  init() {
    this.gifts = [];
  },

  loadGifts() {
    this.trigger({ 
      gifts : Gifts,
      loading: true
    });
  },

  loadGiftsCompleted(gifts) {
    this.gifts = gifts;
    this.trigger({ 
      gifts : this.gifts,
      loading: false
    });
  },

  loadGiftsFailed(error) {
    this.trigger({ 
      error : error,
      loading: false
    });
  }

});

export default giftStore;