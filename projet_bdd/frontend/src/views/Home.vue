<template>
  <div>
    <h1>Jeux de société</h1>
    <ul>
      <li v-for="jeu in jeux" :key="jeu.id">
        <router-link :to="`/jeux/${jeu.id}`">{{ jeu.nom }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      jeux: []
    };
  },
  mounted() {
    axios.get('/api/jeux').then((res) => {
      this.jeux = res.data;
    });
  }
};
</script>
