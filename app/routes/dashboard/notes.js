import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  model() {
    return Ember.RSVP.hash({
      notes: this.store.query('note', {
        recentlyDeleted: false
      })
    });
  }
});
