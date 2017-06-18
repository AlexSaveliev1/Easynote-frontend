import Ember from 'ember';
  const textEditable = Ember.$('.text-editable');

export default Ember.Component.extend({
  didInsertElement() {
    const textEditable = Ember.$('.text-editable'),
      textEditableTitle = Ember.$('.text-editable-title')
    textEditable.on('click', (event) => {
      event.stopPropagation()
    });
  }
});
