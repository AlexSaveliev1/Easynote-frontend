import Ember from 'ember';

export default Ember.Controller.extend({
session: Ember.inject.service('session'),

  actions: {
    createNote() {
    let newNote = this.get('store').createRecord('note', {
      title: 'Some title',
      description: 'Summer',
      recentlyDeleted: false
    });

    newNote.save().then((newNote) => {

      this.get('model.notes').unshiftObject(newNote._internalModel);
    });
  },
    search(value) {

    },
    deleteNote(id) {
      // this.get('store').find('note', id).then((note) => {
      //   note.destroyRecord();
      // })
      this.get('store').findRecord('note', id)
      .then(note => {
        note.set('recentlyDeleted', true);
        note.save()
        .then(() => this.get('model.notes').removeObject(note));
      });
    }
  }
});
