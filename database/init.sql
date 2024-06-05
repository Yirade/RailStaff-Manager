CREATE USER project_user IDENTIFIED BY project_password;
GRANT CONNECT, RESOURCE TO project_user;

-- Connessione con l'utente creato
ALTER SESSION SET CURRENT_SCHEMA = project_user;

-- Creazione delle sequenze
CREATE SEQUENCE employee_seq;
CREATE SEQUENCE train_seq;
CREATE SEQUENCE shift_seq;
CREATE SEQUENCE position_seq;
CREATE SEQUENCE train_status_seq;
CREATE SEQUENCE employment_status_seq;

-- Creazione delle tabelle
CREATE TABLE employees (
    employeeId NUMBER PRIMARY KEY,
    firstName VARCHAR2(50) NOT NULL,
    lastName VARCHAR2(50) NOT NULL,
    contactInformation VARCHAR2(100),
    employmentStatus NUMBER NOT NULL,
    positionId NUMBER NOT NULL
);

CREATE TABLE trains (
    trainId NUMBER PRIMARY KEY,
    model VARCHAR2(50),
    capacity NUMBER,
    maintenanceSchedule DATE,
    currentStatus NUMBER NOT NULL
);

CREATE TABLE shifts (
    shiftId NUMBER PRIMARY KEY,
    employeeId NUMBER NOT NULL,
    startTime DATE,
    endTime DATE,
    trainAssigned NUMBER NOT NULL
);

CREATE TABLE position (
    positionId NUMBER PRIMARY KEY,
    positionName VARCHAR2(50) NOT NULL,
    salary NUMBER
);

CREATE TABLE trainStatus (
    trainStatusId NUMBER PRIMARY KEY,
    statusName VARCHAR2(50) NOT NULL
);

CREATE TABLE employmentStatus (
    employmentStatusId NUMBER PRIMARY KEY,
    statusName VARCHAR2(50) NOT NULL
);

-- Creazione dei trigger per generare valori autoincrementati
CREATE OR REPLACE TRIGGER trg_generate_employee_id
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    SELECT employee_seq.nextval INTO :new.employeeId FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_generate_train_id
BEFORE INSERT ON trains
FOR EACH ROW
BEGIN
    SELECT train_seq.nextval INTO :new.trainId FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_generate_shift_id
BEFORE INSERT ON shifts
FOR EACH ROW
BEGIN
    SELECT shift_seq.nextval INTO :new.shiftId FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_generate_position_id
BEFORE INSERT ON position
FOR EACH ROW
BEGIN
    SELECT position_seq.nextval INTO :new.positionId FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_generate_train_status_id
BEFORE INSERT ON trainStatus
FOR EACH ROW
BEGIN
    SELECT train_status_seq.nextval INTO :new.trainStatusId FROM dual;
END;
/

CREATE OR REPLACE TRIGGER trg_generate_emp_status_id
BEFORE INSERT ON employmentStatus
FOR EACH ROW
BEGIN
    SELECT employment_status_seq.nextval INTO :new.employmentStatusId FROM dual;
END;
/

-- Creazione delle relazioni
ALTER TABLE shifts
ADD CONSTRAINT fk_shifts_employeeId FOREIGN KEY (employeeId) REFERENCES employees(employeeId);

ALTER TABLE shifts
ADD CONSTRAINT fk_shifts_trainAssigned FOREIGN KEY (trainAssigned) REFERENCES trains(trainId);

ALTER TABLE employees
ADD CONSTRAINT fk_employees_positionId FOREIGN KEY (positionId) REFERENCES position(positionId);

ALTER TABLE employees
ADD CONSTRAINT fk_employees_employmentStatus FOREIGN KEY (employmentStatus) REFERENCES employmentStatus(employmentStatusId);

ALTER TABLE trains
ADD CONSTRAINT fk_trains_currentStatus FOREIGN KEY (currentStatus) REFERENCES trainStatus(trainStatusId);
