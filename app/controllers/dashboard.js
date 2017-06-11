import Ember from 'ember';

const EMPTY_NOTE = {
  title: 'Title',
  description: 'Your descriptin',
  userId: null
}

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    createNote() {
      EMPTY_NOTE.userId = this.get('session.data.authenticated.access_token');

      Ember.$.post({
        url:`http://127.0.0.1:3000/notes`,
        data: EMPTY_NOTE
      })
      .then(() => console.log('added'))
    },

    logOut() {
      this.get('session').invalidate()
      .then(() => this.transitionToRoute('sign-in'));
    }
  }
});
