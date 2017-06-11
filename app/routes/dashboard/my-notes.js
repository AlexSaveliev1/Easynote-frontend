import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model() {
    // return Ember.RSVP.hash({
    //   notes: this.store.query('note', {
    //     id: this.get('session.data.authenticated.access_token')dashd
    //   })
    // });
  }
});
