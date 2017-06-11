import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    deleteSingle(id) {
      this.get('store').find('note', id)
      .then(note => {
        note.deleteRecord();
        note.save();
      })
    },

    recoverSingle(id) {
      this.get('store').findRecord('note', id)
      .then(note => {
        note.set('recentlyDeleted', false);
        note.save()
        .then(() => this.get('model.notes').removeObject(note));
      });
    }
  }
});
