import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    record() {
      this.store.query('note', {})
      .then((notes) => console.log(notes.get('firstObject.title'), 'controller'))
      // console.log(notes);
      // Ember.$.post({
      //   url:`http://127.0.0.1:3000/create-note`,
      //   data: {
      //     title: 'Zara',
      //     description: 'Seoul'
      //   }
      // })
      // .then(() => console.log('Successfull!'))
      // .catch(error => {
      //   let parsedError = JSON.parse(error.responseText);
      //
      //   this.set('validationError', `${parsedError.email} is already in use`)
      // });
    }
  }
});
