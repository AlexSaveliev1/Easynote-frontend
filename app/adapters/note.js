import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: Ember.inject.service(),

  primaryKey: '_id',
  authorizer: 'authorizer:oauth2',

  createRecord(store, type, snapshot) {
    let noteData = this.serialize(snapshot, { includeId: true });

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.post(`http://localhost:3000/note`, noteData).then((data) => {
        resolve({
          data: {
            status: 'OK'
          }
        });
      });
    });
  },

  deleteRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });
    let id = snapshot.id;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'DELETE',
        url: `/http://localhost:3000/note`,
        dataType: 'json',
        data: data
      }).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },

  query(store, type, snapshot) {
    const userId = this.get('session.data.authenticated.access_token');

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'GET',
        url: `http://localhost:3000/note`,
        dataType: 'json',
        data: {
          id: userId
        }
      })
      .then((response) => {
        console.log(response)
        resolve(response)
      })
    });
  }
});
