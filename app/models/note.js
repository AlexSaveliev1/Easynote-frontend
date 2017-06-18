import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description:  DS.attr('string'),
  recentlyDeleted: DS.attr('boolean'),
  user: DS.attr('string'),
  date: DS.attr('string')
});
