import Reflux from 'reflux';

const modalActions = Reflux.createActions(['loadModal','closeModal']);

/*modalActions.loadmodals.listen(function(){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  setTimeout(() => {
    const modals = ['Foo', 'Bar', 'Lorem'];
    this.completed(modals);

    // on error
    // this.failed('an error occured');
  }, 500);
});*/

export default modalActions;