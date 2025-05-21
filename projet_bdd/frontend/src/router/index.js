import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import JeuDetail from '../views/JeuDetail.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/jeux/:id', component: JeuDetail }
];

export default createRouter({
  history: createWebHistory(),
  routes
});