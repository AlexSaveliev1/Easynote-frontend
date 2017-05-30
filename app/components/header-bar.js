import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['header-bar-wrapper'],
  router: Ember.inject.service('-routing'),

  actions: {
    transitionToSignIn() {
      this.get('router').transitionTo('sign-in');
    }
  }
});
