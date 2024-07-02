import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000";

export default function DashboardPage() {
  const [trainCount, setTrainCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [shiftCount, setShiftCount] = useState(0);
  const [positionCount, setPositionCount] = useState(0);
  const [employmentStatusCount, setEmploymentStatusCount] = useState(0);
  const [trainStatusCount, setTrainStatusCount] = useState(0);

  useEffect(() => {
    axios.get(`${baseURL}/trains`)
      .then(response => setTrainCount(response.data.length))
      .catch(error => console.error("Error fetching trains:", error));

    axios.get(`${baseURL}/employees`)
      .then(response => setEmployeeCount(response.data.length))
      .catch(error => console.error("Error fetching employees:", error));

    axios.get(`${baseURL}/shifts`)
      .then(response => setShiftCount(response.data.length))
      .catch(error => console.error("Error fetching shifts:", error));

    axios.get(`${baseURL}/positions`)
      .then(response => setPositionCount(response.data.length))
      .catch(error => console.error("Error fetching positions:", error));

    axios.get(`${baseURL}/employmentStatus`)
      .then(response => setEmploymentStatusCount(response.data.length))
      .catch(error => console.error("Error fetching employment status:", error));

    axios.get(`${baseURL}/trainStatus`)
      .then(response => setTrainStatusCount(response.data.length))
      .catch(error => console.error("Error fetching train status:", error));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Here you can see the status of the trains and manage employees.</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Employees</h5>
              <ul className="list-group">
                <li className="list-group-item">Total: {employeeCount}</li>
                <li className="list-group-item">Employment Status: {employmentStatusCount}</li>
                <li className="list-group-item">Positions: {positionCount}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Trains</h5>
              <ul className="list-group">
                <li className="list-group-item">Total: {trainCount}</li>
                <li className="list-group-item">Train Status: {trainStatusCount}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Shifts</h5>
              <ul className="list-group">
                <li className="list-group-item">Total: {shiftCount}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
