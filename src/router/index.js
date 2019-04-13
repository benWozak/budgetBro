import Vue from 'vue';
import Router from 'vue-router';
import { routes } from '../app';

Vue.use(Router);

export default new Router({
  mode: 'hash', // uses URL hash to simulate a full URL so that the page wont
  routes: routes      // reload when the URL changes.
});
