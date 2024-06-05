const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');

const router = express.Router();
router.use(bodyParser.json());

// Endpoint per ottenere tutti gli stati dei treni
router.get('/', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM trainStatus`
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere uno stato del treno specifico
router.get('/:trainStatusId', async (req, res) => {
    const { trainStatusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM trainStatus WHERE trainStatusId = :trainStatusId`,
            [trainStatusId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per creare un nuovo stato del treno
router.post('/', async (req, res) => {
    const { statusName } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO trainStatus (statusName) VALUES (:statusName)`,
            [statusName],
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Stato del treno creato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per modificare uno stato del treno esistente
router.put('/:trainStatusId', async (req, res) => {
    const { trainStatusId } = req.params;
    const { statusName } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE trainStatus SET statusName = :statusName WHERE trainStatusId = :trainStatusId`,
            [statusName, trainStatusId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Stato del treno modificato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per eliminare uno stato del treno esistente
router.delete('/:trainStatusId', async (req, res) => {
    const { trainStatusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `DELETE FROM trainStatus WHERE trainStatusId = :trainStatusId`,
            [trainStatusId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Stato del treno eliminato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Altri endpoint relativi ai stati dei treni possono essere aggiunti qui

module.exports = router;
