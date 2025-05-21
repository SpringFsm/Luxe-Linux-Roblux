<template>
  <div class="home">

    <section class="tendances">
      <h3>Tendance du moment</h3>
      <div class="cards">
        <div v-for="(jeu, index) in jeux" :key="jeu.id_jeu" class="card">
          <router-link :to="`/jeux/${jeu.id_jeu}`">
            <div class="ranking">#{{ index + 1 }}</div>
            <img :src="getImageUrl(jeu.id_jeu)" alt="Image du jeu" class="thumbnail" />
            <div class="card-content">
              <h4>{{ jeu.nom_jeu }}</h4>
              <span class="categorie">{{ jeu.categorie }}</span>
              <p>{{ jeu.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      jeux: [],
      jeuxDetails: []
    };
  },
  async mounted() {
    const [mieuxNotesRes, jeuxDetailsRes] = await Promise.all([
      axios.get('/api/mieuxNotes'),
      axios.get('/api/jeuxDetails')
    ]);

    this.jeux = mieuxNotesRes.data.rows.slice(0, 5);
    this.jeuxDetails = jeuxDetailsRes.data.rows;
  },

  methods: {
    getImageUrl(id_jeu) {
      const detail = this.jeuxDetails.find(j => j.id_jeu === id_jeu);
      return detail ? `/images/${detail.thumbnail_url}` : '/images/default.jpg';
    }
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
.thumbnail {
  max-width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}
.ranking {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ff7a00;
  margin-bottom: 10px;
}

</style>
