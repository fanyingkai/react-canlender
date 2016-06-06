import Reflux from 'reflux';

const activityProgressActions = Reflux.createActions({
  'loadActivityProgress': {children: ['completed', 'failed']}
});

/*loadActivityActions.loadGifts.listen(function(){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  setTimeout(() => {
    const loadActivitys = ['Foo', 'Bar', 'Lorem'];
    this.completed(loadActivitys);

    // on error
    // this.failed('an error occured');
  }, 500);
});*/

export default activityProgressActions;