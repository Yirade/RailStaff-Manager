-- Purpose: To populate the database with dummy data for testing purposes.


-- dummy data for position table
INSERT INTO position (positionId, positionName, Salary)
VALUES (1, 'Train Operator', 45000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (2, 'Station Manager', 60000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (3, 'Mechanical Engineer', 70000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (4, 'Electrician', 55000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (5, 'Signal Technician', 58000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (6, 'Train Dispatcher', 50000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (7, 'Safety Inspector', 65000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (8, 'Customer Service Representative', 48000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (9, 'Human Resources Manager', 75000);

INSERT INTO position (positionId, positionName, Salary)
VALUES (10, 'Financial Analyst', 72000);


-- dummy data for employmentStatus table
INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (1, 'Full-time');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (2, 'Part-time');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (3, 'Contractor');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (4, 'Intern');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (5, 'Temporary');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (6, 'Seasonal');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (7, 'Consultant');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (8, 'Freelancer');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (9, 'Volunteer');

INSERT INTO employmentStatus (employmentStatusId, statusName)
VALUES (10, 'Retired');


-- dummy data for employees table
INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (1, 'John', 'Smith', 'john.smith@example.com', 1, 1);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (2, 'Emma', 'Johnson', 'emma.johnson@example.com', 2, 2);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (3, 'Michael', 'Williams', 'michael.williams@example.com', 1, 3);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (4, 'Sophia', 'Brown', 'sophia.brown@example.com', 3, 4);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (5, 'James', 'Jones', 'james.jones@example.com', 1, 5);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (6, 'Olivia', 'Garcia', 'olivia.garcia@example.com', 2, 6);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (7, 'William', 'Martinez', 'william.martinez@example.com', 1, 7);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (8, 'Isabella', 'Rodriguez', 'isabella.rodriguez@example.com', 4, 8);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (9, 'Alexander', 'Wilson', 'alexander.wilson@example.com', 1, 9);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (10, 'Mia', 'Lopez', 'mia.lopez@example.com', 2, 10);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (11, 'Ethan', 'Hernandez', 'ethan.hernandez@example.com', 1, 1);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (12, 'Amelia', 'Gonzalez', 'amelia.gonzalez@example.com', 3, 2);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (13, 'Daniel', 'Perez', 'daniel.perez@example.com', 1, 3);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (14, 'Ava', 'Sanchez', 'ava.sanchez@example.com', 2, 4);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (15, 'Matthew', 'Ramirez', 'matthew.ramirez@example.com', 1, 5);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (16, 'Emily', 'Torres', 'emily.torres@example.com', 5, 6);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (17, 'David', 'Nguyen', 'david.nguyen@example.com', 1, 7);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (18, 'Madison', 'King', 'madison.king@example.com', 2, 8);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (19, 'Joseph', 'Scott', 'joseph.scott@example.com', 1, 9);

INSERT INTO employees (employeeId, firstName, lastName, contactInformation, employmentStatus, positionId)
VALUES (20, 'Charlotte', 'Green', 'charlotte.green@example.com', 6, 10);


-- dummy data for trainStatus table
INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (1, 'In Service');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (2, 'Out of Service - Maintenance');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (3, 'Scheduled for Maintenance');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (4, 'On Standby');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (5, 'Out of Service - Repairs');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (6, 'In Repair');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (7, 'Testing');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (8, 'Out of Service - Inspection');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (9, 'Scheduled for Inspection');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (10, 'Retired');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (11, 'In Transit');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (12, 'On Hold');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (13, 'Ready for Service');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (14, 'Emergency Maintenance');

INSERT INTO trainStatus (trainStatusId, statusName)
VALUES (15, 'Out of Service - Other');

-- dummy data for trains table
INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (1, 'Express 2000', 250, SYSDATE, 1);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (2, 'Commuter Plus', 180, SYSDATE - 2, 2);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (3, 'Rapid Transit', 300, SYSDATE + 1, 3);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (4, 'Cargo Hauler', 400, SYSDATE - 1, 4);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (5, 'Metro Shuttle', 150, SYSDATE + 2, 5);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (6, 'High-Speed Express', 200, SYSDATE - 3, 6);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (7, 'Regional Liner', 280, SYSDATE + 3, 7);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (8, 'Freight Master', 450, SYSDATE - 2, 8);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (9, 'Suburban Rider', 180, SYSDATE + 4, 9);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (10, 'Transcontinental', 350, SYSDATE - 1, 10);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (11, 'Interstate Carrier', 300, SYSDATE + 5, 11);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (12, 'City Express', 200, SYSDATE - 4, 12);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (13, 'Regional Hopper', 280, SYSDATE + 6, 13);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (14, 'Cargo Transporter', 400, SYSDATE - 3, 14);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (15, 'Metropolitan Cruiser', 150, SYSDATE + 7, 15);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (16, 'Speedy Transit', 220, SYSDATE - 2, 14);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (17, 'Regional Express', 280, SYSDATE + 8, 13);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (18, 'Freight Carrier', 450, SYSDATE - 1, 12);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (19, 'Urban Shuttle', 180, SYSDATE + 9, 11);

INSERT INTO trains (trainId, model, capacity, maintenanceSchedule, currentStatus)
VALUES (20, 'Highland Runner', 320, SYSDATE - 3, 10);

-- dummy data for shifts table
INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (1, 1, SYSDATE + 1, SYSDATE + 1 + INTERVAL '8' HOUR, 1);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (2, 2, SYSDATE + 2, SYSDATE + 2 + INTERVAL '8' HOUR, 2);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (3, 3, SYSDATE + 3, SYSDATE + 3 + INTERVAL '8' HOUR, 3);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (4, 4, SYSDATE + 4, SYSDATE + 4 + INTERVAL '8' HOUR, 4);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (5, 5, SYSDATE + 5, SYSDATE + 5 + INTERVAL '8' HOUR, 5);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (6, 6, SYSDATE + 6, SYSDATE + 6 + INTERVAL '8' HOUR, 6);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (7, 7, SYSDATE + 7, SYSDATE + 7 + INTERVAL '8' HOUR, 7);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (8, 8, SYSDATE + 8, SYSDATE + 8 + INTERVAL '8' HOUR, 8);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (9, 9, SYSDATE + 9, SYSDATE + 9 + INTERVAL '8' HOUR, 9);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (10, 10, SYSDATE + 10, SYSDATE + 10 + INTERVAL '8' HOUR, 10);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (11, 11, SYSDATE + 11, SYSDATE + 11 + INTERVAL '8' HOUR, 11);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (12, 12, SYSDATE + 12, SYSDATE + 12 + INTERVAL '8' HOUR, 12);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (13, 13, SYSDATE + 13, SYSDATE + 13 + INTERVAL '8' HOUR, 13);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (14, 14, SYSDATE + 14, SYSDATE + 14 + INTERVAL '8' HOUR, 14);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (15, 15, SYSDATE + 15, SYSDATE + 15 + INTERVAL '8' HOUR, 15);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (16, 16, SYSDATE + 16, SYSDATE + 16 + INTERVAL '8' HOUR, 16);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (17, 17, SYSDATE + 17, SYSDATE + 17 + INTERVAL '8' HOUR, 17);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (18, 18, SYSDATE + 18, SYSDATE + 18 + INTERVAL '8' HOUR, 18);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (19, 19, SYSDATE + 19, SYSDATE + 19 + INTERVAL '8' HOUR, 19);

INSERT INTO shifts (shiftId, employeeId, startTime, endTime, trainAssigned)
VALUES (20, 20, SYSDATE + 20, SYSDATE + 20 + INTERVAL '8' HOUR, 20);
