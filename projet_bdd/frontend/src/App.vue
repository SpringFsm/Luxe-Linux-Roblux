<template>
  <header class="header">
    <!-- Si l'utilisateur est connecté, bouton Profil -->
    <router-link v-if="utilisateur" to="/profil" class="login-button" title="Profil">
      <i class="fas fa-user-circle"></i> Profil
    </router-link>

    <!-- Sinon, bouton Connexion -->
    <router-link v-else to="/login" class="login-button" title="Connexion / Inscription">
      <i class="fas fa-user"></i> Se connecter
    </router-link>


    <h1 class="title">Luxe Linux Roblux</h1>
    <h2 class="subtitle">Ludothèque - Jeux de société</h2>
    <router-link to="/recherche" class="search-button">Effectuer une recherche</router-link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
    <router-link to="/" class="menu-icon" title="Retour à l'accueil">
      <i class="fas fa-home"></i>
    </router-link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
  </header>

  <router-view />

  <footer class="footer">
    <div class="footer-col">
      <h5>Notre Projet</h5>
      <ul>
        <li>Contact</li>
        <li>Description du Projet</li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Suivez-nous</h5>
      <div class="social-icons">
        <a href="https://youtu.be/kPnsJlR2Xto"><i class="fab fa-instagram fa-2x"></i></a>
        <a href="https://youtu.be/7C1g028A0DA"><i class="fab fa-twitter fa-2x"></i></a>
        <a href="https://youtu.be/YclqZCjHuAc"><i class="fab fa-youtube fa-2x"></i></a>
        <a href="https://youtu.be/IVEpoXSl0O8"><i class="fab fa-linkedin-in fa-2x"></i></a>
      </div>
    </div>
    <div class="footer-col">
      <h5>Ressources</h5>
      <ul>
        <li>Blog</li>
        <li>Support</li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      utilisateur: null
    };
  },
  created() {
    this.chargerUtilisateur();
  },
  watch: {
    // Si le composant est toujours actif mais l'utilisateur change ailleurs
    '$route'() {
      this.chargerUtilisateur();
    }
  },
  methods: {
    chargerUtilisateur() {
      const utilisateurLocal = localStorage.getItem('utilisateur');
      this.utilisateur = utilisateurLocal ? JSON.parse(utilisateurLocal) : null;
    },
    deconnexion() {
      localStorage.removeItem('utilisateur');
      this.chargerUtilisateur();
      this.$router.push('/');
    }
  }
}
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
.login-button {
  margin-left: 92%;
  background-color: #4a4aff;
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  text-decoration: none;
  display: flex;
  align-items: right;
  gap: 8px;
  font-weight: bold;
}
.login-button:hover {
  background-color: #3a3aff;
}


</style>
