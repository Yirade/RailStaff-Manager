import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaSync } from "react-icons/fa";

const baseURL = "http://localhost:3000";

export default function ShiftsPage() {
  const [shifts, setShifts] = useState([]);
  const [shiftsFilter, setShiftsFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [employees, setEmployees] = useState([]);
  const [trains, setTrains] = useState([]);

  const [editShift, setEditShift] = useState({
    SHIFTID: null,
    EMPLOYEEID: "",
    SHIFTDATE: "",
    STARTTIME: "",
    ENDTIME: "",
    TRAINID: "",
  });

  useEffect(() => {
    refreshData();
    fetchEmployees();
    fetchTrains();
  }, []);

  const refreshData = () => {
    axios.get(`${baseURL}/shifts/`).then((response) => {
      console.log(response.data);
      setShifts(response.data);
    });
  };

  const fetchEmployees = () => {
    axios.get(`${baseURL}/employees/`).then((response) => {
      setEmployees(response.data);
    });
  };

  const fetchTrains = () => {
    axios.get(`${baseURL}/trains/`).then((response) => {
      setTrains(response.data);
    });
  };

  const filteredShifts = shifts.filter((shift) => {
    const date = shift.SHIFTDATE || "";
    return (
      shift.SHIFTID.toString().includes(shiftsFilter) ||
      shift.EMPLOYEEID.toString().includes(shiftsFilter) ||
      date.toLowerCase().includes(shiftsFilter.toLowerCase()) ||
      shift.STARTTIME.toLowerCase().includes(shiftsFilter.toLowerCase()) ||
      shift.ENDTIME.toLowerCase().includes(shiftsFilter.toLowerCase())
    );
  });

  const handleFilterChange = (e) => {
    setShiftsFilter(e.target.value);
  };

  const openModal = (mode, shift = null) => {
    setModalMode(mode);
    if (mode === "edit" && shift) {
      setEditShift(shift);
    } else {
      setEditShift({
        SHIFTID: null,
        EMPLOYEEID: "",
        SHIFTDATE: "",
        STARTTIME: "",
        ENDTIME: "",
        TRAINID: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setEditShift({
      SHIFTID: null,
      EMPLOYEEID: "",
      SHIFTDATE: "",
      STARTTIME: "",
      ENDTIME: "",
      TRAINID: "",
    });
  };

  const handleEditShift = () => {
    const payload = {
      employeeId: editShift.EMPLOYEEID,
      shiftDate: editShift.SHIFTDATE,
      startTime: `${editShift.SHIFTDATE} ${editShift.STARTTIME}:00`,
      endTime: `${editShift.SHIFTDATE} ${editShift.ENDTIME}:00`,
      trainAssigned: editShift.TRAINID,
    };

    if (modalMode === "edit") {
      axios
        .put(`${baseURL}/shifts/${editShift.SHIFTID}`, payload)
        .then((response) => {
          refreshData();
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating shift:", error);
        });
    } else if (modalMode === "add") {
      axios
        .post(`${baseURL}/shifts/`, payload)
        .then((response) => {
          refreshData();
          closeModal();
        })
        .catch((error) => {
          console.error("Error adding new shift:", error);
        });
    }
  };

  const deleteShift = (shiftId) => {
    axios
      .delete(`${baseURL}/shifts/${shiftId}`)
      .then((response) => {
        refreshData();
      })
      .catch((error) => {
        console.error("Error deleting shift:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Shifts Page</h1>
      <p>Here you can see and manage the shifts.</p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-3"
          placeholder="Global Filter"
          value={shiftsFilter}
          onChange={handleFilterChange}
        />
        <button
          className="btn btn-primary me-2"
          onClick={() => openModal("add")}
        >
          <FaPlus /> Add Shift
        </button>
        <button className="btn btn-secondary" onClick={refreshData}>
          <FaSync /> Refresh
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Shift ID</th>
            <th>Employee ID</th>
            <th>Shift Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Train Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredShifts.map((shift) => (
            <tr key={shift.SHIFTID}>
              <td>{shift.SHIFTID}</td>
              <td>
                {shift.EMPLOYEEID}
                {employees.map((employee) =>
                  employee.EMPLOYEEID === shift.EMPLOYEEID
                    ? ` - ${employee.FIRSTNAME} ${employee.LASTNAME}`
                    : ""
                )}
              </td>
              <td>
                {new Date(shift.STARTTIME).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(shift.ENDTIME).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td>
                {new Date(shift.STARTTIME).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {new Date(shift.ENDTIME).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>

              <td>
                {shift.TRAINASSIGNED}
                {trains.map((train) =>
                  train.TRAINID === shift.TRAINASSIGNED
                    ? ` - ${train.MODEL}`
                    : ""
                )}
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => openModal("edit", shift)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteShift(shift.SHIFTID)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === "edit" ? "Edit Shift" : "Add Shift"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Employee ID</label>
                  <select
                    className="form-control"
                    value={editShift.EMPLOYEEID}
                    onChange={(e) =>
                      setEditShift({
                        ...editShift,
                        EMPLOYEEID: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option
                        key={employee.EMPLOYEEID}
                        value={employee.EMPLOYEEID}
                      >
                        {employee.EMPLOYEEID} - {employee.FIRSTNAME}{" "}
                        {employee.LASTNAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Shift Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={editShift.SHIFTDATE}
                    onChange={(e) =>
                      setEditShift({
                        ...editShift,
                        SHIFTDATE: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={editShift.STARTTIME}
                    onChange={(e) =>
                      setEditShift({
                        ...editShift,
                        STARTTIME: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={editShift.ENDTIME}
                    onChange={(e) =>
                      setEditShift({
                        ...editShift,
                        ENDTIME: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Train Assigned</label>
                  <select
                    className="form-control"
                    value={editShift.TRAINID}
                    onChange={(e) =>
                      setEditShift({
                        ...editShift,
                        TRAINID: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Train</option>
                    {trains.map((train) => (
                      <option key={train.TRAINID} value={train.TRAINID}>
                        {train.TRAINID} - {train.MODEL}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditShift}
                >
                  {modalMode === "edit" ? "Save Changes" : "Add Shift"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
