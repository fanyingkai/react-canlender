import Reflux from 'reflux';

const giftActions = Reflux.createActions({
  'loadGifts': {children: ['completed', 'failed']}
});

/*giftActions.loadGifts.listen(function(){
  // make your api call/ async stuff here
  // we use setTimeout for faking async behaviour here
  setTimeout(() => {
    const gifts = ['Foo', 'Bar', 'Lorem'];
    this.completed(gifts);

    // on error
    // this.failed('an error occured');
  }, 500);
});*/

export default giftActions;