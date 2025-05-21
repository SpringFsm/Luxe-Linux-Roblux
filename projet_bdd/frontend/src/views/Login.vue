<template>
  <div class="login-page">
    <h2>Connexion ou Création de compte</h2>

    <div class="buttons">
      <button 
        :class="{ active: mode === 'login' }"
        @click="mode = 'login'">Se connecter</button>
      <button 
        :class="{ active: mode === 'register' }"
        @click="mode = 'register'">Créer un compte</button>
    </div>

    <!-- Formulaire connexion -->
    <form v-if="mode === 'login'" @submit.prevent="submitLogin">
      <input v-model="loginForm.email" type="email" placeholder="Email" required />
      <input v-model="loginForm.mdp" type="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
    </form>

    <!-- Formulaire création compte -->
    <form v-if="mode === 'register'" @submit.prevent="submitRegister">
      <input v-model="registerForm.nom_utilisateur" placeholder="Nom d'utilisateur" required />
      <input v-model="registerForm.email" type="email" placeholder="Email" required />
      <input v-model="registerForm.mdp" type="password" placeholder="Mot de passe" required />
      <select v-model="registerForm.role">
        <option value="user">Utilisateur</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Créer un compte</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      mode: 'login', // mode par défaut = connexion
      loginForm: {
        email: '',
        mdp: ''
      },
      registerForm: {
        nom_utilisateur: '',
        email: '',
        mdp: '',
        role: 'user'
      }
    };
  },
  methods: {
    async submitLogin() {
      try {
        const response = await axios.post('/api/utilisateurs/login', this.loginForm);
        alert('Connexion réussie !');
        // redirection ou autre logique ici
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        alert('Erreur lors de la connexion');
      }
    },
    async submitRegister() {
      try {
        await axios.post('/api/utilisateurs', this.registerForm);
        alert('Compte créé avec succès !');
        this.$router.push('/');
      } catch (err) {
        console.error(err);
        alert('Erreur lors de la création du compte');
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #d4f1ff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.buttons {
  margin-bottom: 20px;
}
button {
  background-color: #4a4aff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}
button:hover {
  background-color: #3a3aff;
}
button.active {
  background-color: #3030ff;
}
input, select {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
