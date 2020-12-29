import Component from '@glimmer/component';
import Model from '@ember-data/model';

interface Args {
  metaFields: string[],
  onClick: Function
  record: Model,
}

export default class ListRowComponent extends Component<Args> {
  // Getter and setter
  get columns() {
    let columns = ['displayLabel'];

    if (this.args.metaFields) {
      columns = columns.concat(this.args.metaFields)
    }

    return columns;
  }

  get modelName() {
    // @ts-ignore
    return this.args.record.constructor.modelName;
  }
}
