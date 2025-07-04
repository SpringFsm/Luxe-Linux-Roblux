// backend/routes/jeux.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get jeux
router.get('/api/jeux', async (req,res) => {

  let querry = 'SELECT * FROM vue_jeux_details';
  try{
    const [rows] = await pool.execute(querry);
    res.json({rows : rows});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get jeux by id
router.get('/api/jeux/:id', async (req,res) => {
  const id = req.params.id;
  let querry = 'SELECT * FROM vue_jeux_details WHERE id_jeu = ?';
  
  try{
    const [rows] = await pool.execute(querry, [id]);
    res.json({rows : rows});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get jeux details
router.get('/api/jeuxDetails', async (req,res) => {

  let querry = 'SELECT * FROM JEUX';
  try{
    const [rows] = await pool.execute(querry);
    res.json({rows : rows});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get jeux details by id
router.get('/api/jeuxDetails/:id', async (req,res) => {
  const id = req.params.id;
  let querry = 'SELECT * FROM JEUX WHERE id_jeu = ?';
  
  try{
    const [rows] = await pool.execute(querry, [id]);
    res.json({rows : rows});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get evaluations utilisateurs
router.get('/api/eval', async (req,res) =>{
  let querry = 'SELECT * FROM vue_evaluations_utilisateurs';

  try{
    const [rows] = await pool.execute(querry);
    res.json({rows :rows});
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
})

// Get jeux mieux notés vue_jeux_mieux_notes
router.get('/api/mieuxNotes', async (req, res) =>{
  let querry = `
    SELECT * FROM vue_jeux_mieux_notes
    ORDER BY avg_score DESC;
    `;

  try {
    const [rows] = await pool.execute(querry);
    res.json({rows :rows});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
})

// Get jeux categories et mecaniques
router.get('/api/categories', async (req, res) =>{
  let querry = 'SELECT * FROM vue_jeux_categories_mecaniques';

  try {
    const [rows] = await pool.execute(querry);
    res.json({rows :rows});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
})

// Vérifie si un jeu est disponible
router.get('/api/disponibilite/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT JeuDisponible(?) AS disponible', [id]);
    res.json({ disponible: !!rows[0].disponible });
  } catch (err) {
    console.error('Erreur fonction JeuDisponible :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Get jeux loués par un utilisateur
router.get('/api/louer/:id_utilisateur', async (req, res) => {
  const { id_utilisateur } = req.params;

  const sql = `
    SELECT L.id_jeu, L.statut, J.nom AS nom, J.thumbnail_url
    FROM LOUER L
    JOIN JEUX J ON L.id_jeu = J.id_jeu
    WHERE L.id_utilisateur = ? AND L.statut = 'en cours';
  `;

  try {
    const [rows] = await pool.execute(sql, [id_utilisateur]);
    res.json({ rows });
  } catch (err) {
    console.error('Erreur lors de la récupération des jeux loués :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

//Louer un jeu, procédure LouerJeu
router.post('/api/louer', async (req, res) => {
  const { id_jeu, id_utilisateur } = req.body;

  try {
    await pool.query('CALL LouerJeu(?, ?)', [id_jeu, id_utilisateur]);
    res.status(201).json({ message: 'Jeu loué avec succès' });
  } catch (err) {
    console.error('Erreur lors de la location :', err);
    res.status(500).json({ error: 'Erreur serveur ou doublon de location' });
  }
});

// Retourner un jeu, procédure RetournerJeu
router.put('/api/louer/', async (req, res) => {
  const { id_jeu, id_utilisateur } = req.body;

  try {
    await pool.query('CALL RetournerJeu(?, ?)', [id_utilisateur, id_jeu]);
    res.status(200).json({ message: 'Jeu retourné avec succès' });
  } catch (err) {
    console.error('Erreur lors du retour du jeu :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Créer utilisateur
router.post('/api/utilisateurs', async (req, res) => {
  const { nom_utilisateur, email, mdp, role } = req.body;

  const sql = `
    INSERT INTO UTILISATEUR (nom_utilisateur, email, mdp, role)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.execute(sql, [nom_utilisateur, email, mdp, role]);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error('Erreur lors de l\'insertion :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/api/evaluer', async (req, res) => {
  const { id_jeu, id_utilisateur, id_eval, note, eval_description } = req.body;

  // Vérifie que tous les champs nécessaires sont présents
  if (!id_jeu || !id_utilisateur || !id_eval || !note) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    const eval_date = new Date().toISOString().slice(0, 10); // date du jour au format YYYY-MM-DD

    const query = `
      INSERT INTO EVALUER (id_jeu, id_utilisateur, id_eval, note, eval_description, eval_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await pool.query(query, [id_jeu, id_utilisateur, id_eval, note, eval_description, eval_date]);

    res.status(201).json({ message: 'Évaluation ajoutée avec succès' });
  } catch (err) {
    console.error('Erreur lors de l\'insertion de l\'évaluation :', err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Évaluation déjà existante pour cet utilisateur et ce jeu' });
    } else {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
});


export default router;



router.post('/api/utilisateurs/login', async (req, res) => {
  const { email, mdp } = req.body;

  const sql = `SELECT * FROM UTILISATEUR WHERE email = ? AND mdp = ? LIMIT 1`;

  try {
    const [results] = await pool.execute(sql, [email, mdp]);

    if (results.length === 0) {
      // Aucun utilisateur trouvé avec cet email/mdp
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Connexion réussie
    res.status(200).json({ message: 'Connexion réussie', utilisateur: results[0] });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});