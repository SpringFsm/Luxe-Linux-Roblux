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

// Get souhaits utilisateurs
router.get('/api/souhaits', async (req, res) =>{
  let querry = 'SELECT * FROM vue_souhaits_utilisateurs';

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
  let querry = 'SELECT * FROM vue_jeux_mieux_notes';

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


export default router;
