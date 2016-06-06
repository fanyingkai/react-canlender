import Reflux from 'reflux';

const appActions = Reflux.createActions({
  'loadApp': {children: ['completed', 'failed']}
});

/*appActions.loadGifts.listen(function(){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  setTimeout(() => {
    const apps = ['Foo', 'Bar', 'Lorem'];
    this.completed(apps);

    // on error
    // this.failed('an error occured');
  }, 500);
});*/

export default appActions;