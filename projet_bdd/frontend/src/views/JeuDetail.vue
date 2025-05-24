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

    <section class="bouton-louer" v-if="dispo">
      <button @click="louerJeu" class="btn-louer">LOUER</button>
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

      <!-- Formulaire d'ajout d'avis -->
      <div class="form-avis" v-if="formVisible">
        <h4>Ajouter votre avis</h4>
        <label for="note">Note :</label>
        <input type="number" id="note" v-model="newAvis.note" min="0" max="10" step="0.5" />

        <label for="desc">Description :</label>
        <textarea id="desc" v-model="newAvis.eval_description" rows="3" maxlength="50"></textarea>

        <button @click="ajouterAvis" class="btn-envoyer">Envoyer</button>
      </div>

      <button @click="formVisible = !formVisible" class="btn-ajouter-avis">
        {{ formVisible ? 'Annuler' : 'Ajouter un avis' }}
      </button>
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
      dispo: null,
      formVisible: false,
      newAvis: {
        note: '',
        eval_description: ''
      }
    }
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
  },
  methods: {
    async louerJeu() {
      try {
        const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
        if (!utilisateur || !utilisateur.id_utilisateur) {
          alert("Vous devez être connecté pour louer un jeu.");
          return;
        }

        await axios.post('/api/louer', {
          id_jeu: this.jeu.id_jeu,
          id_utilisateur: utilisateur.id_utilisateur
        });

        alert(`Le jeu "${this.jeu.nom}" a été loué avec succès !`);
        this.dispo = false; // mise à jour de la disponibilité

      } catch (err) {
        console.error('Erreur lors de la location :', err);
        alert("Impossible de louer ce jeu. Il est peut-être déjà loué.");
      }
    },
    async ajouterAvis() {
      try {
        const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
        if (!utilisateur || !utilisateur.id_utilisateur) {
          alert("Vous devez être connecté pour laisser un avis.");
          return;
        }

        if (!this.newAvis.note || this.newAvis.note < 0 || this.newAvis.note > 10) {
          alert("Note invalide. Elle doit être entre 0 et 10.");
          return;
        }

        const id_eval = Math.floor(Math.random() * 1000000); // remplace par un générateur côté backend si besoin

        await axios.post('/api/evaluer', {
          id_jeu: this.jeu.id_jeu,
          id_utilisateur: utilisateur.id_utilisateur,
          id_eval,
          note: this.newAvis.note,
          eval_description: this.newAvis.eval_description
        });

        alert("Merci pour votre avis !");
        this.formVisible = false;
        this.newAvis.note = '';
        this.newAvis.eval_description = '';

        // Recharge les avis après insertion
        const avisRes = await axios.get('/api/eval');
        this.avis = avisRes.data.rows.filter(a => a.id_jeu === this.jeu.id_jeu);

        //Recharger avg_score
        const jeuRes = await axios.get(`/api/jeuxDetails/${this.jeu.id_jeu}`);
        this.jeu = jeuRes.data.rows[0];
      

      } catch (err) {
        console.error("Erreur lors de l'ajout d'avis :", err);
        alert("Impossible d'ajouter l'avis.");
      }
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
  padding: 30px;
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
  margin: auto;
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
.bouton-louer {
  text-align: center;
  margin: 15px 0;
}

.btn-louer {
  background-color: #4a90e2;
  color: white;
  padding: 10px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-louer:hover {
  background-color: #357ABD;
}
.form-avis {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
}
.form-avis label {
  display: block;
  margin-top: 10px;
}
.form-avis input,
.form-avis textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
.btn-ajouter-avis {
  margin-top: 15px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.btn-ajouter-avis:hover {
  background-color: #388e3c;
}
.btn-envoyer {
  background-color: #4a90e2;
  color: white;
  padding: 7px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-envoyer:hover {
  background-color: #357ABD;
}

</style>
