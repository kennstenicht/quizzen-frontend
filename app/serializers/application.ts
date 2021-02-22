import JSONAPISerializer from '@ember-data/serializer/json-api';
import { underscore } from '@ember/string';

export default class ApplicationSerializer extends JSONAPISerializer {
  keyForRelationship(key: string) {
    return underscore(key);
  }

  keyForAttribute(attr: string) {
    return underscore(attr);
  }
}
