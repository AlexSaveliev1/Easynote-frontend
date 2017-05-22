import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transitionToSignUp() {
      this.transitionToRoute('sign-up'); 
    }
  }
});
