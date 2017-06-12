import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  noteManager: Ember.inject.service(),
  notes: null,

  notesToShow: Ember.observer('model.notes', 'searchWord', function() {
    const queryResult =  this.get('model.notes').filter(note => {
      let searchWord = this.get('searchWord'),
        searchRegExp = new RegExp(searchWord, 'i');

        if (searchWord && note.get('title').match(searchRegExp)) {
          return note;
        }

        if (!searchWord) {
          return this.get('model.notes');
        }
    });

    this.set('notes', queryResult)
  }),

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
      this.get('store').findRecord('note', id)
      .then(note => {
        note.set('recentlyDeleted', true);
        note.save()
        .then(() => {
          this.get('model.notes').removeObject(note);
          this.get('notes').removeObject(note);
          this.get('noteManager').incrementProperty('recentlyDeletedAmount');
        });
      });
    },

    saveNote(id, title, description) {
      this.get('store').findRecord('note', id)
      .then(note => {
        note.set('title', title);
        note.save()
        .then(() => console.log('done'));
      });
    }
  }
});
