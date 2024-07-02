const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const dbConfig = require('../dbConfig');

const router = express.Router();
router.use(bodyParser.json());

// // Configura il formato di output di OracleDB
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Endpoint per ottenere tutti gli stati di impiego
router.get('/', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Connected to the database.');
        
        const query = `SELECT * FROM employmentStatus`;
        console.log('Executing query:', query);
        
        const result = await connection.execute(query);
        console.log('Query executed. Result:', result);

        if (result.rows.length === 0) {
            console.log('No data found.');
        } else {
            console.log('Data found:', result.rows);
        }

        res.status(200).json(result.rows);
        await connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per ottenere uno stato di impiego specifico
router.get('/:employmentStatusId', async (req, res) => {
    const { employmentStatusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Connected to the database.');
        const result = await connection.execute(
            `SELECT * FROM employmentStatus WHERE employmentStatusId = :employmentStatusId`,
            [employmentStatusId]
        );
        console.log('Query executed:', result);
        res.status(200).json(result.rows);
        await connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per creare un nuovo stato di impiego
router.post('/', async (req, res) => {
    const { statusName } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Connected to the database.');
        const result = await connection.execute(
            `INSERT INTO employmentStatus (statusName) VALUES (:statusName)`,
            {statusName},
            { autoCommit: true }
        );
        console.log('Insert executed:', result);
        res.status(201).json({ message: 'Stato di impiego creato con successo!' });
        await connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per modificare uno stato di impiego esistente
router.put('/:employmentStatusId', async (req, res) => {
    const { employmentStatusId } = req.params;
    const { statusName } = req.body;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Connected to the database.');
        const result = await connection.execute(
            `UPDATE employmentStatus SET statusName = :statusName WHERE employmentStatusId = :employmentStatusId`,
            {statusName, employmentStatusId},
            { autoCommit: true }
        );
        console.log('Update executed:', result);
        res.status(200).json({ message: 'Stato di impiego modificato con successo!' });
        await connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint per eliminare uno stato di impiego esistente
router.delete('/:employmentStatusId', async (req, res) => {
    const { employmentStatusId } = req.params;
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Connected to the database.');
        const result = await connection.execute(
            `DELETE FROM employmentStatus WHERE employmentStatusId = :employmentStatusId`,
            {employmentStatusId},
            { autoCommit: true }
        );
        console.log('Delete executed:', result);
        res.status(200).json({ message: 'Stato di impiego eliminato con successo!' });
        await connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Altri endpoint relativi ai stati possono essere aggiunti qui

router.get('/test', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Connected to the database.');
        
        // Log di configurazione del client OracleDB
        console.log('OracleDB configuration:', oracledb);

        const result = await connection.execute(
            `SELECT * FROM employmentStatus`
        );
        console.log('Query executed. Result:', result);

        if (result.rows.length === 0) {
            console.log('No data found.');
        } else {
            console.log('Data found:', result.rows);
        }

        res.status(200).json(result.rows);
        await connection.close();
        console.log('Connection closed.');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
