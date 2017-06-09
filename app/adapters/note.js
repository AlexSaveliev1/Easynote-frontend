import DS from 'ember-data';

export default DS.Adapter.extend({
  primaryKey: '_id',

  createRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'POST',
        url: `http://localhost:3000/notes`,
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

  deleteRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });
    let id = snapshot.id;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: 'DELETE',
        url: `/http://localhost:3000/notes`,
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

  query(store, query) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(`http://localhost:3000/notes`, query).then(function(data) {
        console.log(data, 'arrived from adapter')
        resolve(data);
      }, function(jqXHR) {
        reject(jqXHR);
      });
    });
  }
});
