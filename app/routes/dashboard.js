import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      return this.transitionTo('sign-in');
    }
  },
  model() {
    return Ember.RSVP.hash({
      userProfile: this.store.queryRecord('user', {})
    })
  }
});
