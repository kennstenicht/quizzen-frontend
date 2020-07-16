import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  label: attr('string'),
  questions: hasMany('question')
});
