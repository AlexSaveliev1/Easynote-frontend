import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  primaryKey: '_id',
  authorizer: 'authorizer:oauth2',
  host: `http://localhost:3000`
});
