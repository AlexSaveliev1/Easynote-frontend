import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  newUser: {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  },

  actions: {
    signUp() {
      this.setProperties({
        emailValidationError: null,
        passwordError: null,
        confirmedPasswordError: null,
        validationError: null
      });

      const newUser = this.get('newUser'),
        emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        Object.keys(newUser).forEach(credential => {
          if (!newUser[`${credential}`]) {
            return this.set('validationError', 'Please complete all fields')
          }
        });

        if (!emailPattern.test(this.get('newUser.email'))) {
          return this.set('emailValidationError', ['Please provide email in a valid format'])
        }

        if (newUser.password.length < 6) {
          return this.set('passwordError', ['Password must contain at least 6 or more characters'])
        }

        if (newUser.password !== newUser.confirmedPassword) {
          return this.set('confirmedPasswordError', ['Passwords do not match'])
        }

       Ember.$.post({
         url:`http://127.0.0.1:3000/sign-up`,
         data: newUser
       })
       .then(() => {
         this.get('session').authenticate('authenticator:oauth2', newUser.email, newUser.password)
         .then(() => this.transitionToRoute('dashboard'))
       })
       .catch(error => {
         let parsedError = JSON.parse(error.responseText);

         this.set('validationError', `${parsedError.email} is already in use`)
       });
    }
  }
});
