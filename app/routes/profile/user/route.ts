import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import User from 'quizzen/models/user';

interface Params {
  user_nickname: string
}

export default class ProfileUserRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  async model({ user_nickname }: Params) {
    const users = await this.store.query('user', {
      filter: {
        nickname_eq: user_nickname,
      }
    });

    return users.get('firstObject');
  }

  serialize(model: User){
    return {
      user_nickname: model.get('nickname')
    };
  }
}
