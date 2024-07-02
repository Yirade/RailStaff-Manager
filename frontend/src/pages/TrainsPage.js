import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync,
} from "react-icons/fa";

const baseURL = "http://localhost:3000";

export default function TrainsPage() {
  const [trains, setTrains] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [trainsFilter, setTrainsFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab, setActiveTab] = useState("trains");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [statusModalMode, setStatusModalMode] = useState("add");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [editTrain, setEditTrain] = useState({
    MODEL: "",
    CAPACITY: null,
    MAINTENANCESCHEDULE: null,
    CURRENTSTATUS: null,
    TRAINID: null,
  });

  const [editStatus, setEditStatus] = useState({
    TRAINSTATUSID: null,
    STATUSNAME: "",
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    axios.get(`${baseURL}/trains/`).then((response) => {
      setTrains(response.data);
    });
    axios.get(`${baseURL}/trainStatus/`).then((response) => {
      setStatuses(response.data);
    });
  };

  const getStatusName = (statusId) => {
    //console.log("Received status code:", statusId);
    const status = statuses.find( (status) => status.TRAINSTATUSID === statusId);
    //console.log("Found status:", status);
    return status ? status.STATUSNAME : "";
  };

  const filteredTrains = trains.filter(
    (train) =>
      train.TRAINID.toString().includes(trainsFilter) ||
      train.CAPACITY.toString().includes(trainsFilter) ||
      train.MODEL.toLowerCase().includes(trainsFilter.toLowerCase()) ||
      train.MAINTENANCESCHEDULE.toString().includes(trainsFilter) ||
      getStatusName(train.CURRENTSTATUS)
        .toLowerCase()
        .includes(trainsFilter.toLowerCase())
  );

  const filteredStatuses = statuses.filter(
    (status) =>
      status.TRAINSTATUSID.toString().includes(statusFilter) ||
      status.STATUSNAME.toLowerCase().includes(statusFilter.toLowerCase())
  );

  const handleFilterChange = (e) => {
    setTrainsFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const openModal = (mode, train = null) => {
    setModalMode(mode);
    if (mode === "edit" && train) {
      setEditTrain(train);
    } else {
      setEditTrain({
        MODEL: "",
        CAPACITY: null,
        MAINTENANCESCHEDULE: null,
        CURRENTSTATUS: null,
        TRAINID: null,
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setEditTrain({
      MODEL: "",
      CAPACITY: null,
      MAINTENANCESCHEDULE: null,
      CURRENTSTATUS: null,
      TRAINID: null,
    });
  };

  const openStatusModal = (mode, status = null) => {
    setStatusModalMode(mode);
    if (mode === "edit" && status) {
      setEditStatus({ TRAINSTATUSID: status.TRAINSTATUSID, STATUSNAME: status.STATUSNAME }); 
    } else {
      setEditStatus({ TRAINSTATUSID: null, STATUSNAME: "" });
    }
    setIsStatusModalOpen(true);
  };
  

  const closeStatusModal = () => {
    setIsStatusModalOpen(false); 
    setStatusModalMode("add");
    setEditStatus({
      TRAINSTATUSID: null,
      STATUSNAME: "",
    });
  };

  const handleEditTrain = () => {
    if (modalMode === "edit") {
      // Perform PUT request to update train
      axios
        .put(`${baseURL}/trains/${editTrain.TRAINID}`, {
          model: editTrain.MODEL,
          capacity: editTrain.CAPACITY,
          maintenanceSchedule: editTrain.MAINTENANCESCHEDULE,
          currentStatus: editTrain.CURRENTSTATUS,
        })
        .then((response) => {
          // Handle success
          console.log("Train updated successfully:", response.data);
          // Refresh data
          refreshData();
          closeModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating train:", error);
        });
    } else if (modalMode === "add") {
      // Perform POST request to add new train
      axios
        .post(`${baseURL}/trains/`, {
          model: editTrain.MODEL,
          capacity: editTrain.CAPACITY,
          maintenanceSchedule: editTrain.MAINTENANCESCHEDULE,
          currentStatus: editTrain.CURRENTSTATUS,
        })
        .then((response) => {
          // Handle success
          console.log("New train added successfully:", response.data);
          // Refresh data
          refreshData();
          closeModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error adding new train:", error);
        });
    }
  };

  const deleteTrain = (trainId) => {
    // Perform DELETE request to delete train
    axios
      .delete(`${baseURL}/trains/${trainId}`)
      .then((response) => {
        // Handle success
        console.log("Train deleted successfully:", response.data);
        // Refresh data
        refreshData();
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting train:", error);
      });
  };

  const handleEditStatus = () => {
    if (statusModalMode === "edit") {
      // Perform PUT request to update status
      axios
        .put(`${baseURL}/trainStatus/${editStatus.TRAINSTATUSID}`, {
          statusName: editStatus.STATUSNAME,
        })
        .then((response) => {
          // Handle success
          console.log("Status updated successfully:", response.data);
          // Refresh data
          refreshData();
          closeStatusModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating status:", error);
        });
    }

    if (statusModalMode === "add") {
      // Perform POST request to add new status
      axios
        .post(`${baseURL}/trainStatus/`, {
          statusName: editStatus.STATUSNAME,
        })
        .then((response) => {
          // Handle success
          console.log("New status added successfully:", response.data);
          // Refresh data
          refreshData();
          closeStatusModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error adding new status:", error);
        });
    }
  };

  const deleteStatus = (statusId) => {
    // Perform DELETE request to delete status
    axios
      .delete(`${baseURL}/trainStatus/${statusId}`)
      .then((response) => {
        // Handle success
        console.log("Status deleted successfully:", response.data);
        // Refresh data
        refreshData();
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting status:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Trains Page</h1>
      <p>Here you can see the status of the trains.</p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "trains" ? "active" : ""}`}
                onClick={() => setActiveTab("trains")}
                style={{ color: activeTab === "trains" ? "black" : "gray" }}
              >
                Trains
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "statuses" ? "active" : ""
                }`}
                onClick={() => setActiveTab("statuses")}
                style={{ color: activeTab === "statuses" ? "black" : "gray" }}
              >
                Train Status
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        {activeTab === "trains" && (
          <>
            <input
              type="text"
              className="form-control me-3"
              placeholder="Global Filter"
              value={trainsFilter}
              onChange={handleFilterChange}
            />
            <button
              className="btn btn-primary me-2"
              onClick={() => openModal("add")}
            >
              <FaPlus /> Add Train
            </button>
            <button className="btn btn-secondary" onClick={refreshData}>
              <FaSync /> Refresh
            </button>
          </>
        )}
      </div>

      <div className="tab-content">
        <div className={`tab-pane ${activeTab === "trains" ? "active" : ""}`}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Train ID</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Maintenance Schedule</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrains.map((train) => (
                <tr key={train.TRAINID}>
                  <td>{train.TRAINID}</td>
                  <td>{train.MODEL}</td>
                  <td>{train.CAPACITY}</td>
                  <td>
                    {new Date(train.MAINTENANCESCHEDULE).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    // ) +
                    //   " " +
                    //   new Date(train.MAINTENANCESCHEDULE).toLocaleTimeString(
                    //     "en-US",
                    //     {
                    //       hour: "2-digit",
                    //       minute: "2-digit",
                    //       second: "2-digit",
                    //       hour12: false,
                    //     }
                      )}
                  </td>
                  <td>{getStatusName(train.CURRENTSTATUS)}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openModal("edit", train)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTrain(train.TRAINID)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`tab-pane ${activeTab === "statuses" ? "active" : ""}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Filter Statuses"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            />
            <button
              className="btn btn-primary me-2"
              onClick={() => openStatusModal("add")}
            >
              <FaPlus /> Add Status
            </button>
            <button className="btn btn-secondary" onClick={refreshData}>
              <FaSync /> Refresh
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Status ID</th>
                <th>Status Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStatuses.map((status) => (
                <tr key={status.TRAINSTATUSID}>
                  <td>{status.TRAINSTATUSID}</td>
                  <td>{status.STATUSNAME}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openStatusModal("edit", status)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteStatus(status.TRAINSTATUSID)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === "edit" ? "Edit Train" : "Add Train"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Model</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editTrain.MODEL}
                    onChange={(e) =>
                      setEditTrain({
                        ...editTrain,
                        MODEL: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editTrain.CAPACITY}
                    onChange={(e) =>
                      setEditTrain({
                        ...editTrain,
                        CAPACITY: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Maintenance Schedule</label>
                  <input
                    type="date"
                    className="form-control"
                    value={editTrain.MAINTENANCESCHEDULE}
                    onChange={(e) =>
                      setEditTrain({
                        ...editTrain,
                        MAINTENANCESCHEDULE: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Current Status</label>
                  <select
                    className="form-select"
                    value={editTrain.CURRENTSTATUS}
                    onChange={(e) =>
                      setEditTrain({
                        ...editTrain,
                        CURRENTSTATUS: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                      <option
                        key={status.TRAINSTATUSID}
                        value={status.TRAINSTATUSID}
                      >
                        {status.STATUSNAME}
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
                  onClick={handleEditTrain}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isStatusModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {statusModalMode === "edit"
                    ? "Edit Employment Status"
                    : "Add Employment Status"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeStatusModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="statusName" className="form-label">
                      Status Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="statusName"
                      value={editStatus.STATUSNAME}
                      onChange={(e) =>
                        setEditStatus({
                          ...editStatus,
                          STATUSNAME: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeStatusModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditStatus}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isStatusModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {statusModalMode === "edit"
                    ? "Edit Employment Status"
                    : "Add Employment Status"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeStatusModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="statusName" className="form-label">
                      Nome dello Status
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="statusName"
                      value={editStatus.STATUSNAME || ""}
                      onChange={(e) =>
                        setEditStatus({
                          ...editStatus,
                          STATUSNAME: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeStatusModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditStatus}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
