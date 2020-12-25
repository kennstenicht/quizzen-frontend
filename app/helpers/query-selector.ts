import { helper } from '@ember/component/helper';

export function querySelector([selector]: any) {
  return document.querySelector(selector);
}

export default helper(querySelector);
