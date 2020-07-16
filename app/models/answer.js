import Model, { attr } from '@ember-data/model';

export default Model.extend({
  label: attr('string'),
  value: attr('string'),
  information: attr('string')
});
