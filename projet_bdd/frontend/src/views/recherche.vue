<template>
  <div class="recherche-page">
    <header class="header">
      <h1 class="title">Luxe Linux Roblux</h1>
      <h2 class="subtitle">Ludothèque - Jeux de société</h2>
      <router-link to="/" class="menu-icon" title="Retour à l'accueil">⚐</router-link>
      <input v-model="searchTerm" type="text" placeholder="🔍 Rechercher" class="search-bar" />
    </header>

    <section class="filters-section">
      <h3>Filtrer les jeux de société</h3>
      <div class="tags">
        <button
          v-for="cat in uniqueCategories"
          :key="cat"
          :class="{ tag: true, selected: selectedTags.includes(cat) }"
          @click="toggleTag(cat)"
        >
          {{ cat }}
        </button>
      </div>
      <div class="filter-actions">
        <button @click="resetTags" class="reset">Reset Tag</button>
        <button @click="confirmerRecherche" class="confirm">Confirm</button>
      </div>
    </section>

    <section class="resultats">
      <div v-if="resultats.length" class="cards">
        <div v-for="jeu in resultats" :key="jeu.id_jeu" class="card">
          <router-link :to="`/jeux/${jeu.id_jeu}`">
            <img :src="getImageUrl(jeu)" alt="Image du jeu" class="thumbnail" />
            <h4>{{ jeu.nom_jeu }}</h4>
            <span class="categorie">{{ jeu.categorie }}</span>
            <p>{{ jeu.description }}</p>
          </router-link>
        </div>
      </div>
      <p v-else>Aucun jeu trouvé.</p>
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
  name: 'Recherche',
  data() {
    return {
      searchTerm: '',
      categories: [],      // Jeux avec leurs catégories
      jeuxDetails: [],     // Jeux avec leurs images
      selectedTags: [],
      resultats: []
    };
  },
  computed: {
    uniqueCategories() {
      const allCategories = this.categories.flatMap(c =>
        c.categories?.split(',').map(cat => cat.trim()) || []
      );
      return [...new Set(allCategories)].filter(Boolean);
    }
  },
  async mounted() {
    const [catRes, detailsRes] = await Promise.all([
      axios.get('/api/categories'),
      axios.get('/api/jeuxDetails')
    ]);

    this.categories = catRes.data.rows;
    this.jeuxDetails = detailsRes.data.rows;
    this.resultats = this.categories;
  },
  methods: {
    toggleTag(tag) {
      this.selectedTags.includes(tag)
        ? this.selectedTags = this.selectedTags.filter(t => t !== tag)
        : this.selectedTags.push(tag);
    },
    resetTags() {
      this.selectedTags = [];
      this.confirmerRecherche();
    },
    confirmerRecherche() {
      this.resultats = this.categories.filter(jeu => {
        const categories = jeu.categories?.split(',').map(c => c.trim()) || [];

        return (
          (!this.searchTerm || jeu.nom_jeu.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
          (this.selectedTags.length === 0 || this.selectedTags.some(tag => categories.includes(tag)))
        );
      });
    },
    getImageUrl(jeu) {
      const match = this.jeuxDetails.find(j => j.id_jeu === jeu.id_jeu);
      return match?.thumbnail_url ? `/images/${match.thumbnail_url}` : '/images/placeholder.jpg';
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

.recherche-page {
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
.search-bar {
  padding: 12px 20px;
  margin-top: 15px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 300px;
}

.filters-section {
  background: white;
  max-width: 900px;
  margin: 30px auto;
  padding: 25px;
  border-radius: 15px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.tag {
  padding: 8px 15px;
  border-radius: 8px;
  background: #ccc;
  color: white;
  cursor: pointer;
}
.tag.selected {
  background-color: #8fd0ff;
}
.filter-actions {
  margin-top: 20px;
  text-align: center;
}
.reset, .confirm {
  margin: 5px;
  padding: 8px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.reset {
  background-color: #555;
  color: white;
}
.confirm {
  background-color: #8fd0ff;
  color: white;
}

.resultats {
  padding: 30px;
  text-align: center;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 240px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}
.card h4 {
  margin-bottom: 5px;
}
.categorie {
  font-weight: bold;
  color: #8fd0ff;
  display: block;
  margin-bottom: 5px;
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
.footer-social {
  display: flex;
  gap: 15px;
}
.thumbnail {
  max-width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

</style>