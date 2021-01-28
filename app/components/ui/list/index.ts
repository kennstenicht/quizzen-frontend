import Component from '@glimmer/component';
import Model from '@ember-data/model';

interface Args {
  disabledRecords?: Model[]
  layout?: string
  metaFields?: string[]
  onClick: Function
  records: any
  selectedRecords?: Model[]
}

export default class UiListComponent extends Component<Args> {
  // Getter and setter
  get isCardLayout() {
    return this.args.layout === 'card';
  }
}
