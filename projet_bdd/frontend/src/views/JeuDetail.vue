<template>
  <div>
    <h2>{{ jeu.nom }}</h2>
    <p>{{ jeu.description }}</p>
    <p>Âge minimum : {{ jeu.age_min }} ans</p>
    <p>Durée moyenne : {{ jeu.duree }} minutes</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'JeuDetail',
  data() {
    return {
      jeu: {}
    };
  },
  mounted() {
    const id = this.$route.params.id;
    axios.get(`/api/jeux/${id}`).then((res) => {
      this.jeu = res.data;
    });
  }
};
</script>