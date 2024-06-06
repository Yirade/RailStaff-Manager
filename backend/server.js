const express = require('express');
const employeesEndpoints = require('./endpoints/employeesEndpoints');
const trainsEndpoints = require('./endpoints/trainsEndpoints');
const shiftsEndpoints = require('./endpoints/shiftsEndpoints');
const positionsEndpoints = require('./endpoints/positionsEndpoints');
const employmentStatusEndpoints = require('./endpoints/employmentStatusEndpoints');
const trainStatusEndpoints = require('./endpoints/trainStatusEndpoints');
const dbConfig = require('./dbConfig');

const app = express();

// Configura la connessione al database
const oracledb = require('oracledb');
oracledb.initOracleClient({ libDir: '/opt/oracle/instantclient_19_19' });

// Middleware per il parsing del corpo della richiesta
const cors = require('cors');
app.use(cors());

// Percorsi degli endpoint
app.use('/employees', employeesEndpoints);
app.use('/trains', trainsEndpoints);
app.use('/shifts', shiftsEndpoints);
app.use('/positions', positionsEndpoints);
app.use('/employmentStatus', employmentStatusEndpoints);
app.use('/trainStatus', trainStatusEndpoints);

const port = 3000;
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
