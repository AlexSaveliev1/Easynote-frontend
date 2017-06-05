import { moduleFor, test } from 'ember-qunit';

moduleFor('route:dashboard/my-notes', 'Unit | Route | dashboard/my notes', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
