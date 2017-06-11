import Ember from 'ember';
  const textEditable = Ember.$('.text-editable');

export default Ember.Component.extend({
  didInsertElement() {
    const textEditable = Ember.$('.text-editable');
    textEditable.on('click', (event) => {
      event.stopPropagation()
    });
  },

  actions: {
    missFocus() {
      event.stopPropagation()
    },
    save() {
      console.log('asdasd')
    }
  }
});
