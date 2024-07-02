const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');

const router = express.Router();
router.use(bodyParser.json());

// Endpoint per creare un nuovo dipendente
router.post('/', async (req, res) => {
    const { firstName, lastName, contactInformation, employmentStatus, positionId } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `INSERT INTO employees (firstName, lastName, contactInformation, employmentStatus, positionId) 
             VALUES (:firstName, :lastName, :contactInformation, :employmentStatus, :positionId)`,
            { firstName, lastName, contactInformation, employmentStatus, positionId },
            { autoCommit: true }
        );
        res.status(201).json({ message: 'Dipendente creato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i dipendenti
router.get('/', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM employees`
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere un dipendente specifico
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM employees WHERE EMPLOYEEID = :id`,
            {id}
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per aggiornare un dipendente
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, contactInformation, employmentStatus, positionId } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE employees 
             SET firstName = :firstName, lastName = :lastName, contactInformation = :contactInformation, 
                 employmentStatus = :employmentStatus, positionId = :positionId
             WHERE EMPLOYEEID = :id`,
            {firstName, lastName, contactInformation, employmentStatus, positionId, id},
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Dipendente aggiornato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per eliminare un dipendente
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `DELETE FROM employees WHERE EMPLOYEEID = :id`,
            { id },
            { autoCommit: true }
        );
        res.status(200).json({ message: 'Dipendente eliminato con successo!' });
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i dipendenti con un determinato stato di impiego
router.get('/employmentStatus/:statusId', async (req, res) => {
    const { statusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM employees WHERE employmentStatus = :statusId`,
            {statusId}
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere tutti i dipendenti con una determinata posizione
router.get('/position/:positionId', async (req, res) => {
    const { positionId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `SELECT * FROM employees WHERE positionId = :positionId`,
            {positionId}
        );
        res.status(200).json(result.rows);
        await connection.close();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Altri endpoint relativi ai dipendenti possono essere aggiunti qui

module.exports = router;
