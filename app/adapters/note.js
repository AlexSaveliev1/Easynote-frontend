import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  session: Ember.inject.service(),

  primaryKey: '_id',
  authorizer: 'authorizer:oauth2',
  host: `http://46.4.90.221:3321`
});
