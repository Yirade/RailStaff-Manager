const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');

const router = express.Router();
router.use(bodyParser.json());

// Endpoint per creare un nuovo treno
router.post('/', async (req, res) => {
    const { model, capacity, maintenanceSchedule, currentStatus } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO trains (model, capacity, maintenanceSchedule, currentStatus) 
             VALUES (:model, :capacity, TO_DATE(:maintenanceSchedule, 'YYYY-MM-DD'), :currentStatus)`,
            [model, capacity, maintenanceSchedule, currentStatus],
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Treno creato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per modificare un treno esistente
router.put('/:trainId', async (req, res) => {
    const { trainId } = req.params;
    const { model, capacity, maintenanceSchedule, currentStatus } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE trains 
             SET model = :model, capacity = :capacity, maintenanceSchedule = TO_DATE(:maintenanceSchedule, 'YYYY-MM-DD'), currentStatus = :currentStatus
             WHERE trainId = :trainId`,
            [model, capacity, maintenanceSchedule, currentStatus, trainId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Treno modificato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per eliminare un treno esistente
router.delete('/:trainId', async (req, res) => {
    const { trainId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `DELETE FROM trains WHERE trainId = :trainId`,
            [trainId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Treno eliminato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i treni
router.get('/', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM trains`
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere un treno specifico
router.get('/:trainId', async (req, res) => {
    const { trainId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM trains WHERE trainId = :trainId`,
            [trainId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i treni con un determinato stato
router.get('/status/:statusId', async (req, res) => {
    const { statusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM trains WHERE currentStatus = :statusId`,
            [statusId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Altri endpoint relativi ai treni possono essere aggiunti qui

module.exports = router;
