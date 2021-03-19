import Component from '@glimmer/component';
import Model from 'quizzen/models/base';

interface Args {
  disabledRecords?: Model[]
  index: number
  metaFields?: string[]
  onClick: Function
  record: Model
  selectedRecords?: Model[]
}

export default class UiListRowComponent extends Component<Args> {
  // Getter and setter
  get columns() {
    let columns = ['displayLabel'];

    if (this.args.metaFields) {
      columns = columns.concat(this.args.metaFields)
    }

    return columns;
  }

  get isDisabled() {
    if (!this.args.disabledRecords) {
      return false;
    }

    return this.args.disabledRecords.includes(this.args.record);
  }

  get isEven() {
    return this.args.index % 2;
  }

  get isSelected() {
    if (!this.args.selectedRecords) {
      return false;
    }

    return this.args.selectedRecords.includes(this.args.record);
  }
}
