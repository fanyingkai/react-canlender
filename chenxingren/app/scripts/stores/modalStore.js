import Reflux from 'reflux';
import modalActions from '../actions/modalActions';
import baseConst from '../components/baseConst.js';
import $ from '../components/jquery.js';

let ModalStore = Reflux.createStore({
  listenables: modalActions,
  
  init() {
    this.modal = [];
  },

  loadModal() {

    this.trigger({ 
      modal : [],
      loading: true
    });
  },

  loadModalCompleted(modal) {
    this.modal = modal;
    this.trigger({ 
      modal : this.modal,
      loading: false
    });
  },

  closeModal(){
    console.log('closeModalStore')
    this.trigger({ 
      modals : this.modals,
      loading: this.loading,
      show:false
    });
  },

  loadModalFailed(error) {
    this.trigger({ 
      error : error,
      loading: false
    });
  }

});

export default ModalStore;