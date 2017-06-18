import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  noteManager: Ember.inject.service(),

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  },

  recentlyDeletedAmount: Ember.computed.alias('noteManager.recentlyDeletedAmount'),
  userFullName: Ember.computed('model.userProfile', function() {
    if (this.get('model.userProfile.firstName') && this.get('model.userProfile.lastName')) {
      const firstNameCapitalized = this.get('capitalize')(this.get('model.userProfile.firstName')),
        lastNameCapitalized = this.get('capitalize')(this.get('model.userProfile.lastName'));

        return `${firstNameCapitalized} ${lastNameCapitalized}`;
    }

    return this.get('capitalize')('user');
  }),

  actions: {
    logOut() {
      this.get('session').invalidate()
      .then(() => this.transitionToRoute('sign-in'));
    }
  }
});
