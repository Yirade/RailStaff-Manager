import React, { useState } from "react";
import Logo from "./train.png";
import { HouseFill, PeopleFill, GeoAltFill, ClockFill, InfoCircleFill } from "react-bootstrap-icons";
import DashboardPage from "./DashboardPage";
import EmployeesPage from "./EmployeesPage";
import TrainsPage from "./TrainsPage";
import ShiftsPage from "./ShiftsPage";
import InfoPage from "./InfoPage";

import "./Home.css";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "employees":
        return <EmployeesPage />;
      case "trains":
        return <TrainsPage />;
      case "shifts":
        return <ShiftsPage />;
      case "info":
        return <InfoPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top Logo"
            ></img>
            RailStaff Manager
          </a>
        </div>
      </nav>

      <div className="row flex-grow-1">
        {/* Sidebar */}
        <div className="col-2 bg-dark">
          <ul className="nav flex-column Options">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentPage("dashboard")}
              >
                <HouseFill /> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentPage("employees")}
              >
                <PeopleFill /> Employees
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentPage("trains")}
              >
                <GeoAltFill /> Trains
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentPage("shifts")}
              >
                <ClockFill /> Shifts
              </button>
            </li>
          </ul>
          <div className="mt-auto">
            <ul className="nav flex-column InfoOpt">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => setCurrentPage("info")}
                >
                  <InfoCircleFill /> Info
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-10 bg-light Main">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
