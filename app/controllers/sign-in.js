import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signIn() {
      this.setProperties({
        validationError: null,
        emailValidationError: null
      })
      if (!this.get('email') || !this.get('password')) {
        return this.set('validationError', 'Please complete all fields');
      }


    Ember.$.post({
      url:`http://127.0.0.1:3000/sign-in`,
      data: {
        password: this.get('password'),
        email: this.get('email')
      }
    })
    .then(() => console.log('Successfull!'))
    .catch(error => {
      let parsedError = JSON.parse(error.responseText);

      this.set('validationError', parsedError.message)
    });
  }
  }
});
