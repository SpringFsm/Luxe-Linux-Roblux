<template>
  <div class="recherche-page">
    <header class="header">
      <h1 class="title">Luxe Linux Roblux</h1>
      <h2 class="subtitle">Ludothèque - Jeux de société</h2>
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
          ✔ {{ cat }}
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
      categories: [],      // Contient tous les jeux avec leur catégories
      selectedTags: [],
      resultats: []
    };
  },
  computed: {
    uniqueCategories() {
      // Extraire toutes les catégories de tous les jeux, les découper, les nettoyer, et enlever les doublons
      const allCategories = this.categories.flatMap(c =>
        c.categories?.split(',').map(cat => cat.trim()) || []
      );
      return [...new Set(allCategories)].filter(Boolean);
    }
  },
  async mounted() {
    const res = await axios.get('/api/categories');
    this.categories = res.data.rows;
    this.resultats = this.categories; // afficher tous les jeux par défaut
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
    async confirmerRecherche() {
      const res = await axios.get('/api/categories');
      const all = res.data.rows;

      this.resultats = all.filter(jeu => {
        const categories = jeu.categories?.split(',').map(c => c.trim()) || [];

        return (
          (!this.searchTerm || jeu.nom_jeu.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
          (this.selectedTags.length === 0 || this.selectedTags.some(tag => categories.includes(tag)))
        );
      });
    }
  }
};
</script>


<style scoped>
body {
  margin: 0;
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
  border-radius: 20px;
  background: #ccc;
  color: white;
  cursor: pointer;
}
.tag.selected {
  background-color: #4a4aff;
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
  background-color: #4a4aff;
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
  color: #4a4aff;
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
</style>
