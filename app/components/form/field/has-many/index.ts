import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import { BufferedChangeset } from 'ember-changeset/types';

interface Args {
  records: any[],
  property: string,
  changeset: BufferedChangeset
}

export default class FormFieldHasManyComponent extends Component<Args> {
  // Services
  @service store!: Store;


  // Getter and setter
  get relationName() {
    let property = this.args.property;
    let model = this.args.changeset.data;
    // @ts-ignore
    let relationships = model.constructor.relationshipsByName;
    let relationship = relationships.get(property);

    return relationship.type;
  }



  // Actions
  @action
  addRecord() {
    let changeset = this.args.changeset;
    let property = this.args.property;
    let newRecord = this.store.createRecord(this.relationName);

    changeset.set(property, [...changeset.get(property).toArray(), newRecord]);

  }
}
