// backend/routes/jeux.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Test des valeurs dans JEUX

router.get('/jeux', async (req,res) => {

  try{
    const jeux = await pool.query('SELECT * FROM JEUX');
    res.json({jeux});

  } catch (err) {
    console.error("Erreur à select JEUX :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Vérifie si un jeu est disponible
router.get('/disponibilite/:id', async (req, res) => {
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
