const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');

const router = express.Router();
router.use(bodyParser.json());

// Endpoint per ottenere tutti i turni
router.get('/', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM shifts`
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere un turno specifico
router.get('/:shiftId', async (req, res) => {
    const { shiftId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM shifts WHERE shiftId = :shiftId`,
            [shiftId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per creare un nuovo turno
router.post('/', async (req, res) => {
    const { employeeId, startTime, endTime, trainAssigned } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO shifts (employeeId, startTime, endTime, trainAssigned) 
             VALUES (:employeeId, TO_DATE(:startTime, 'YYYY-MM-DD HH24:MI:SS'), TO_DATE(:endTime, 'YYYY-MM-DD HH24:MI:SS'), :trainAssigned)`,
            [employeeId, startTime, endTime, trainAssigned],
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Turno creato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per modificare un turno esistente
router.put('/:shiftId', async (req, res) => {
    const { shiftId } = req.params;
    const { employeeId, startTime, endTime, trainAssigned } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE shifts 
             SET employeeId = :employeeId, startTime = TO_DATE(:startTime, 'YYYY-MM-DD HH24:MI:SS'), 
                 endTime = TO_DATE(:endTime, 'YYYY-MM-DD HH24:MI:SS'), trainAssigned = :trainAssigned 
             WHERE shiftId = :shiftId`,
            [employeeId, startTime, endTime, trainAssigned, shiftId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Turno modificato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per eliminare un turno esistente
router.delete('/:shiftId', async (req, res) => {
    const { shiftId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `DELETE FROM shifts WHERE shiftId = :shiftId`,
            [shiftId],
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Turno eliminato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i turni di un determinato dipendente
router.get('/employee/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM shifts WHERE employeeId = :employeeId`,
            [employeeId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i turni di un determinato treno
router.get('/train/:trainId', async (req, res) => {
    const { trainId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM shifts WHERE trainAssigned = :trainId`,
            [trainId]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i turni di un determinato giorno
router.get('/day/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM shifts WHERE TRUNC(startTime) = TO_DATE(:date, 'YYYY-MM-DD')`,
            [date]
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Altri endpoint relativi ai turni possono essere aggiunti qui

module.exports = router;
