import Ember from 'ember';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';

export default Ember.Controller.extend({
  noteManager: Ember.inject.service(),
  notesLengthObserver: Ember.observer('model.notes.length', function () {
    if (!this.get('model.notes.length')) {
      return this.set('buttonsDisabled', true);
    }

    return this.set('buttonsDisabled', false);
  }),

  buttonsDisabled: false,

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
      sweetAlert({
        title: 'Are you sure that you want to delete all notes?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Delete all'
            }).then(confirm => {
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
                swal("Deleted!", "All your notes have been deleted.", "success");
              });
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
      sweetAlert({
        title: 'Are you sure that you want to recover all notes?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f44336',
        confirmButtonText: 'Recover all'
            }).then(confirm => {
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
                  swal("Recovered!", "All your notes have been recovered.", "success");
                });
            });

    },
  }
});
