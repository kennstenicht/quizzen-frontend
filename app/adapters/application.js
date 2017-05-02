import DS from 'ember-data';
import ENV from "../config/environment";

export default DS.JSONAPIAdapter.extend({
  host: ENV.host,

  headers: {
    'Accept': 'application/json;',
    'Content-type': 'application/json',
  }
});
