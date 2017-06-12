import Ember from 'ember';

export default Ember.Controller.extend({
  noteManager: Ember.inject.service(),

  actions: {
    deleteSingle(id) {
      this.get('store').find('note', id)
      .then(note => {
        note.deleteRecord();
        note.save();
        this.get('noteManager').decrementProperty('recentlyDeletedAmount');
      })
    },

    deleteAll() {
        const notesId = this.get('model.notes').map(note => note.id)

        Ember.$.ajax({
          type: 'DELETE',
          url: `http://localhost:3000/notes`,
          data: {
            notes: notesId
          }
        })
        .then(() => {
          this.get('store').unloadAll('note');
          this.set('noteManager.recentlyDeletedAmount', 0);
        });
    },

    recoverSingle(id) {
      this.get('store').findRecord('note', id)
      .then(note => {
        note.set('recentlyDeleted', false);
        note.save()
        .then(() => {
          this.get('model.notes').removeObject(note);
          this.get('noteManager').decrementProperty('recentlyDeletedAmount');
        });
      });
    },

    recoverAll() {
        const notesId = this.get('model.notes').map(note => note.id)

        Ember.$.ajax({
          type: 'PATCH',
          url: `http://localhost:3000/notes`,
          data:{
            params: {
                  recentlyDeleted: false,
                },
                notes: notesId
          },
          json: true
          })
          .then(notes => {
            this.get('store').unloadAll('note');
            this.set('noteManager.recentlyDeletedAmount', 0);
          });
    },
  }
});
