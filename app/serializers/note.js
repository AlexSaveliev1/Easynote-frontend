import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
//   normalizeResponse(store, primaryModelClass, payload, id, requestType) {
//   if (requestType === 'findRecord') {
//     return this.normalize(primaryModelClass, payload);
//   } else {
//     return payload.reduce(function(documentHash, item) {
//       let { data, included } = this.normalize(primaryModelClass, item);
//       documentHash.included.push(...included);
//       documentHash.data.push(data);
//       return documentHash;
//     }, { data: [], included: [] })
//   }
// }
});
