import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  recentlyDeletedAmount: null,

  recentlyDeleted: Ember.on('init', function () {
    this.get('store').query('note', {
      recentlyDeleted: true
    }).then((notes) => {
      this.set('recentlyDeletedAmount', notes.get('length'))
    })
  })
});
