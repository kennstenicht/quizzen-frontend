import DS from 'ember-data';

export default DS.Model.extend({
  label: DS.attr('string'),
  source: DS.attr('string'),
  date: DS.attr('date'),
  answers: DS.hasMany('answer')
});
