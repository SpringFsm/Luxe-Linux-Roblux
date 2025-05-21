import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import JeuDetail from '../views/JeuDetail.vue';
import recherche from '../views/recherche.vue';
import Login from "../views/Login.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/jeux/:id', component: JeuDetail },
  { path: '/recherche', component: recherche },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
