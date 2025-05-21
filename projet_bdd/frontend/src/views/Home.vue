<template>
  <div class="home">
    <h1>Jeux de société</h1>

    <ul v-if="jeux.length">
      <li v-for="jeu in jeux" :key="jeu.id_jeu">
        <router-link :to="`/jeux/${jeu.id_jeu}`">
          {{ jeu.nom_jeu }}
        </router-link>
      </li>
    </ul>

    <p v-else>Chargement des jeux...</p>
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
  async mounted() {
    try {
      const res = await axios.get('/api/jeux');
      this.jeux = res.data.rows;
    } catch (error) {
      console.error('Erreur lors du chargement des jeux :', error);
    }
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 8px 0;
}
</style>
