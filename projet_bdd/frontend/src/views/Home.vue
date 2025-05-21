<template>
  <div class="home">
    <header class="header">
      <h1 class="title">Luxe Linux Roblux</h1>
      <h2 class="subtitle">Ludothèque - Jeux de société</h2>
      <router-link to="/recherche" class="search-button">Effectuer une recherche</router-link>
    </header>

    <section class="tendances">
      <h3>Tendance du moment</h3>
      <div class="cards">
        <div v-for="jeu in jeux" :key="jeu.id_jeu" class="card">
          <router-link :to="`/jeux/${jeu.id_jeu}`">
            <div class="card-content">
              <h4>{{ jeu.nom_jeu }}</h4>
              <span class="categorie">{{ jeu.categorie }}</span>
              <p>{{ jeu.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-col">
        <h5>Notre Projet</h5>
        <ul><li>Contact</li><li>Description du Projet</li><li>---</li></ul>
      </div>
      <div class="footer-col">
        <h5>Ressources</h5>
        <ul><li>Blog</li><li>Support</li><li>---</li></ul>
      </div>
      <div class="footer-social">
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return { jeux: [] };
  },
  async mounted() {
    const res = await axios.get('/api/mieuxNotes');
    this.jeux = res.data.rows;
  }
};
</script>

<style scoped>
body {
  margin: 0;
}

.home {
  background-color: #b0e0ff;
  padding-bottom: 60px;
  font-family: 'Segoe UI', sans-serif;
}
.header {
  background-color: #d4f1ff;
  text-align: center;
  padding: 40px 20px;
}
.title {
  font-size: 2.5rem;
  margin: 0;
}
.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.search-button {
  background-color: #4a4aff;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
}

.tendances {
  text-align: center;
  padding: 30px;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.card {
  background: white;
  border-radius: 10px;
  width: 250px;
  padding: 20px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
}
.card-content h4 {
  margin: 0;
}
.categorie {
  font-weight: bold;
  color: #4a4aff;
  display: block;
  margin: 5px 0;
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
.footer-col h5 {
  margin-bottom: 10px;
}
.footer-col ul {
  list-style: none;
  padding: 0;
}
.footer-social {
  display: flex;
  gap: 15px;
  font-size: 1.2rem;
}
</style>
