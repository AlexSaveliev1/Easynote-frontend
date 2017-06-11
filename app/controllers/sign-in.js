import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    signIn() {
      const { password, email } = this.getProperties('email', 'password');

      this.setProperties({
        validationError: null,
        emailValidationError: null
      })
      if (!email || !password) {
        return this.set('validationError', 'Please complete all fields');
      }

      this.get('session').authenticate('authenticator:oauth2', email, password)
      .then(() => this.transitionToRoute('dashboard'))
      .catch(error => this.set('validationError', error.message));
    }
  }
});
