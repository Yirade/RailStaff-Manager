const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');

const router = express.Router();
router.use(bodyParser.json());

// Endpoint per ottenere tutte le posizioni
router.get('/', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM position`
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere una posizione specifica
router.get('/:positionId', async (req, res) => {
    const { positionId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM position WHERE positionId = :positionId`,
            [positionId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per creare una nuova posizione
router.post('/', async (req, res) => {
    const { positionName, salary } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO position (positionName, salary) VALUES (:positionName, :salary)`,
            [positionName, salary],
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Posizione creata con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per modificare una posizione esistente
router.put('/:positionId', async (req, res) => {
    const { positionId } = req.params;
    const { positionName, salary } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE position SET positionName = :positionName, salary = :salary WHERE positionId = :positionId`,
            [positionName, salary, positionId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Posizione modificata con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per eliminare una posizione esistente
router.delete('/:positionId', async (req, res) => {
    const { positionId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `DELETE FROM position WHERE positionId = :positionId`,
            [positionId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Posizione eliminata con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Altri endpoint relativi alle posizioni possono essere aggiunti qui

module.exports = router;
