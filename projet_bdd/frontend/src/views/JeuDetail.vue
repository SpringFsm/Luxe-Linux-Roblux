<template>
  <div class="detail-page">

    <section class="jeu-details" v-if="jeu && dispo !== null">
      <img :src="`/images/${jeu.thumbnail_url}`" alt="Image du jeu" class="thumbnail" />
      <div class="info">
        <h2>{{ jeu.nom_jeu }}</h2>
        <p>{{ jeu.description }}</p>
        <p><strong>Âge minimum :</strong> {{ jeu.age_min }} ans</p>
        <p><strong>Durée moyenne :</strong> {{ jeu.temps_avg }}</p>
        <p><strong>Nombre de joueurs :</strong> {{ jeu.min_joueur }} - {{ jeu.max_joueur }}</p>
        <p><strong>Score moyen :</strong> {{ jeu.avg_score }} ⭐</p>
        <p><strong>Classement :</strong> {{ jeu.jeu_rank }}</p>
        <p><strong>Disponibilité :</strong> {{ dispo ? 'Disponible' : 'Indisponible' }}</p>
      </div>
    </section>

    <!-- AVIS -->
    <section class="avis-section">
      <h3>Avis des utilisateurs</h3>
      <div v-if="avis.length">
        <div v-for="a in avis" :key="a.id_eval" class="avis">
          <p><strong>{{ a.nom_utilisateur }}</strong> - Note : {{ a.note }}</p>
          <p>{{ a.eval_description }}</p>
        </div>
      </div>
      <p v-else>Aucun avis pour ce jeu.</p>
    </section>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'JeuDetail',
  data() {
    return {
      jeu: null,
      avis: [],
      dispo: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;

    // Détails du jeu
    const jeuRes = await axios.get(`/api/jeuxDetails/${id}`);
    this.jeu = jeuRes.data.rows[0];

    // Avis utilisateurs (filtrés côté client pour ce jeu)
    const avisRes = await axios.get('/api/eval');
    this.avis = avisRes.data.rows.filter(a => a.id_jeu === parseInt(id));

    const dispoRes = await axios.get(`/api/disponibilite/${id}`);
    this.dispo = dispoRes.data.disponible;
  }
};
</script>

<style scoped>
.menu-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 1.8rem;
  background: none;
  border: none;
  color: #333;
  text-decoration: none;
  z-index: 1000;
}
.menu-icon:hover {
  color: #4a4aff;
}

.detail-page {
  background-color: #b0e0ff;
  font-family: 'Segoe UI', sans-serif;
}
.header {
  background-color: #d4f1ff;
  text-align: center;
  padding: 40px;
}
.title {
  font-size: 2.5rem;
  margin: 0;
}
.subtitle {
  font-size: 1.2rem;
}

.jeu-details {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 40px;
  align-items: flex-start;
  max-width: 1000px;
  margin: auto;
}
.jeu-details img {
  width: 250px;
  height: auto;
  border-radius: 10px;
}
.info {
  flex: 1;
}
.info h2 {
  margin-top: 0;
}

.avis-section {
  background: white;
  margin: 30px auto;
  max-width: 800px;
  padding: 30px;
  border-radius: 15px;
}
.avis {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.card {
  width: 180px;
  background: white;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}
.card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.footer {
  background-color: #8fd0ff;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  flex-wrap: wrap;
}
.footer-col {
  margin-bottom: 20px;
}
.thumbnail {
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px; /* optionnel : angles arrondis */
}
</style>
