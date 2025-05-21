import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import JeuDetail from '../views/JeuDetail.vue';
import recherche from '../views/recherche.vue';
import Recherche from "../views/recherche.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/jeux/:id', component: JeuDetail },
  { path: '/recherche', component: recherche }
];

export default createRouter({
  history: createWebHistory(),
  routes
});