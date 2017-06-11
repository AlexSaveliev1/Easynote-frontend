import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    primaryKey: '_id',

    createRecord(store, type, snapshot) {
      let data = this.serialize(snapshot, { includeId: true });

      return new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          type: 'POST',
          url: `http://localhost:3000/sign-up`,
          dataType: 'json',
          data
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
        Ember.$.getJSON(`http://localhost:3000/sign-in`, query).then(function(data) {
          console.log(data, 'arrived from adapter')
          resolve(data);
        }, function(jqXHR) {
          reject(jqXHR);
        });
      });
    }
});
