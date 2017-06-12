import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    delete() {
      this.sendAction('onDelete');
    },

    recover() {
      this.sendAction('onRecover');
    },

    save(title, description) {
      this.sendAction('onSave', title, description);
    }
  }
});
