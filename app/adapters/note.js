import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: Ember.inject.service(),

  primaryKey: '_id',
  authorizer: 'authorizer:oauth2',
  host: `http://localhost:3000`
  //
  // createRecord(store, type, snapshot) {
  //   let noteData = this.serialize(snapshot, { includeId: true });
  //
  //   return new Ember.RSVP.Promise((resolve, reject) => {
  //     Ember.$.post(`http://localhost:3000/note`, noteData.data.attributes).then((data) => {
  //       let serialized = {
  //             type: 'note',
  //             id: Number(new Date()),
  //
  //             attributes: {
  //               title: data.title,
  //               description: data.description,
  //               user: data.user
  //             }
  //           };
  //       resolve({ data: serialized});
  //     });
  //   });
  // },
  //
  // deleteRecord(store, type, snapshot) {
  //   console.log('deleting..')
  //   let data = this.serialize(snapshot, { includeId: true });
  //   let id = snapshot.id;
  //   console.log('deleting..', snapshot)
  //   return new Ember.RSVP.Promise(function(resolve, reject) {
  //     Ember.$.ajax({
  //       type: 'DELETE',
  //       url: `http://localhost:3000/note`,
  //       dataType: 'json',
  //       data: data
  //     }).then(function(data) {
  //       Ember.run(null, resolve, data);
  //     }, function(jqXHR) {
  //       jqXHR.then = null; // tame jQuery's ill mannered promises
  //       Ember.run(null, reject, jqXHR);
  //     });
  //   });
  // },
  //
  // update(store, type, snapshot) {
  //   console.log('updating..')
  //   let data = this.serialize(snapshot, { includeId: true });
  //   let id = snapshot.id;
  //   console.log('deleting..', snapshot)
  //   return new Ember.RSVP.Promise(function(resolve, reject) {
  //     Ember.$.ajax({
  //       type: 'PATCH',
  //       url: `http://localhost:3000/note`,
  //       dataType: 'json',
  //       data: data
  //     }).then(function(data) {
  //       Ember.run(null, resolve, data);
  //     }, function(jqXHR) {
  //       jqXHR.then = null; // tame jQuery's ill mannered promises
  //       Ember.run(null, reject, jqXHR);
  //     });
  //   });
  // },
  //
  // query(store, type, snapshot) {
  //   console.log(snapshot, type)
  //   return new Ember.RSVP.Promise((resolve, reject) => {
  //     Ember.$.ajax({
  //       type: 'GET',
  //       url: `http://localhost:3000/note`,
  //       dataType: 'json',
  //       data: {
  //         id: snapshot.user
  //       }
  //     })
  //     .then((res) => {
  //     let serialized = res.data.map(note => {
  //         return {
  //           type: 'note',
  //           id: note._id,
  //
  //           attributes: {
  //             title: note.title,
  //             description: note.description,
  //             'user-id': note.userId
  //           }
  //         }
  //       });
  //
  //       resolve({
  //         data: serialized
  //       })
  //     })
  //   });
  // }
});
