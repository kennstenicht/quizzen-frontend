import Application from 'quizzen/app';
import config from 'quizzen/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import './helpers/flash-message';


setApplication(Application.create(config.APP));

start();
