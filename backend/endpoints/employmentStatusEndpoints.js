const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');

const router = express.Router();
router.use(bodyParser.json());

// Endpoint per ottenere tutti gli stati di impiego
router.get('/', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM employmentStatus`
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere uno stato di impiego specifico
router.get('/:employmentStatusId', async (req, res) => {
    const { employmentStatusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM employmentStatus WHERE employmentStatusId = :employmentStatusId`,
            [employmentStatusId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per creare un nuovo stato di impiego
router.post('/', async (req, res) => {
    const { statusName } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO employmentStatus (statusName) VALUES (:statusName)`,
            [statusName],
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Stato di impiego creato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per modificare uno stato di impiego esistente
router.put('/:employmentStatusId', async (req, res) => {
    const { employmentStatusId } = req.params;
    const { statusName } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE employmentStatus SET statusName = :statusName WHERE employmentStatusId = :employmentStatusId`,
            [statusName, employmentStatusId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Stato di impiego modificato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per eliminare uno stato di impiego esistente
router.delete('/:employmentStatusId', async (req, res) => {
    const { employmentStatusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `DELETE FROM employmentStatus WHERE employmentStatusId = :employmentStatusId`,
            [employmentStatusId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Stato di impiego eliminato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Altri endpoint relativi ai stati possono essere aggiunti qui

module.exports = router;
