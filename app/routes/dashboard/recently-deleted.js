import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      notes: this.store.query('note', {
        recentlyDeleted: true
      })
    });
  }
});
