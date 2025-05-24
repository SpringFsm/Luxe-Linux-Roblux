<template>
  <div class="profil-container">
    <h2>Mon Profil</h2>

    <div v-if="utilisateur" class="profil-infos">
      <p><strong>Nom d'utilisateur :</strong> {{ utilisateur.nom_utilisateur }}</p>
      <p><strong>Email :</strong> {{ utilisateur.email }}</p>

      <h3>Jeux loués</h3>
      <ul class="jeux-loues">
        <li v-for="jeu in jeuxLoues" :key="jeu.id_jeu" class="jeu-item">
          <img :src="`/images/${jeu.thumbnail_url}`" alt="image jeu" class="jeu-image" />
          <div class="jeu-details">
            <h4>{{ jeu.nom }}</h4>
          </div>
          <button class="retourner-button" @click="retournerJeu(jeu.id_jeu)">
            Retourner
          </button>
        </li>
      </ul>

      <button class="logout-button" @click="deconnexion">
        <i class="fas fa-sign-out-alt"></i> Se déconnecter
      </button>
    </div>

    <div v-else>
      <p>Vous n'êtes pas connecté.</p>
      <router-link to="/login">Se connecter</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profil',
  data() {
    return {
      utilisateur: null,
      jeuxLoues: []
    };
  },
  created() {
    const utilisateurLocal = localStorage.getItem('utilisateur');
    this.utilisateur = utilisateurLocal ? JSON.parse(utilisateurLocal) : null;

    if (this.utilisateur) {
      this.recupererJeuxLoues();
    }
  },
  methods: {
    async recupererJeuxLoues() {
      try {
        const res = await axios.get(`/api/louer/${this.utilisateur.id_utilisateur}`);
        this.jeuxLoues = res.data.rows;
      } catch (err) {
        console.error('Erreur lors de la récupération des jeux loués :', err);
      }
    },
    async retournerJeu(id_jeu) {
        const confirmation = confirm("Êtes-vous sûr de vouloir retourner ce jeu ?");
        if (!confirmation) return;

        try {
            await axios.put('/api/louer/', {
            id_jeu,
            id_utilisateur: this.utilisateur.id_utilisateur
            });
            this.jeuxLoues = this.jeuxLoues.filter(j => j.id_jeu !== id_jeu);
        } catch (err) {
            console.error('Erreur lors du retour du jeu :', err);
            alert("Impossible de retourner le jeu.");
        }
    },
    deconnexion() {
      localStorage.removeItem('utilisateur');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.profil-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #d4f1ff;
  border-radius: 10px;
  box-shadow: 0 0 10px #ccc;
  font-family: 'Segoe UI', sans-serif;
}

.profil-infos p {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

h3 {
  margin-top: 30px;
  font-size: 1.3rem;
  color: #333;
}

.jeux-loues {
  list-style: none;
  padding: 0;
}

.jeu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 5px #aaa;
}

.jeu-image {
  width: 80px;
  height: auto;
  border-radius: 8px;
  margin-right: 15px;
}

.jeu-details {
  flex: 1;
}

.jeu-details h4 {
  margin: 0;
  font-size: 1.1rem;
}

.retourner-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.retourner-button:hover {
  background-color: #388e3c;
}

.logout-button {
  background-color: #ff4444;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 30px;
}

.logout-button:hover {
  background-color: #cc0000;
}
</style>
