import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import FastbootService from 'ember-cli-fastboot/services/fastboot';

export default class IsFastbootHelper extends Helper {
  // Services
  @service fastboot!: FastbootService;


  // Hooks
  compute() {
    return this.fastboot.isFastBoot;
  }
}
