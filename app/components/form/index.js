import Component from '@glimmer/component';

export default class FormComponent extends Component {
  get modelName() {
    return this.args.changeset.data.constructor.modelName;
  }
}
