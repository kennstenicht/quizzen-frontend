import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  label: attr('string'),
  source: attr('string'),
  date: attr('date'),
  answers: hasMany('answer')
});
