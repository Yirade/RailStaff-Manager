import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSync,
} from "react-icons/fa";

const baseURL = "http://localhost:3000";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [positions, setPositions] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [activeTab, setActiveTab] = useState("employees");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [statusModalMode, setStatusModalMode] = useState("add");
  const [positionModalMode, setPositionModalMode] = useState("add");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);

  const [editEmployee, setEditEmployee] = useState({
    EMPLOYEEID: null,
    FIRSTNAME: "",
    LASTNAME: "",
    CONTACTINFORMATION: "",
    EMPLOYMENTSTATUS: null,
    POSITIONID: null,
  });

  const [editStatus, setEditStatus] = useState({
    EMPLOYMENTSTATUSID: null,
    STATUSNAME: "",
  });

  const [editPosition, setEditPosition] = useState({
    POSITIONID: null,
    POSITIONNAME: "",
    SALARY: "",
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    axios.get(`${baseURL}/employees/`).then((response) => {
      setEmployees(response.data);
    });
    axios.get(`${baseURL}/employmentStatus/`).then((response) => {
      setStatuses(response.data);
    });
    axios.get(`${baseURL}/positions/`).then((response) => {
      setPositions(response.data);
    });
  };

  const getStatusName = (statusId) => {
    const status = statuses.find((s) => s.EMPLOYMENTSTATUSID === statusId);
    return status ? status.STATUSNAME : "";
  };

  const getPositionName = (positionId) => {
    const position = positions.find((p) => p.POSITIONID === positionId);
    return position ? position.POSITIONNAME : "";
  };

  const getPositionSalary = (positionId) => {
    const position = positions.find((p) => p.POSITIONID === positionId);
    return position ? position.SALARY : "";
  };

  const handleSort = (field) => {
    let direction = "asc";
    if (sortedField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortedField(field);
    setSortDirection(direction);

    const sortedData = [...employees].sort((a, b) => {
      if (field === "SALARY") {
        return direction === "asc"
          ? getPositionSalary(a.POSITIONID) - getPositionSalary(b.POSITIONID)
          : getPositionSalary(b.POSITIONID) - getPositionSalary(a.POSITIONID);
      } else {
        if (a[field] < b[field]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
    setEmployees(sortedData);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.EMPLOYEEID.toString().includes(globalFilter) ||
      employee.FIRSTNAME.toLowerCase().includes(globalFilter.toLowerCase()) ||
      employee.LASTNAME.toLowerCase().includes(globalFilter.toLowerCase()) ||
      employee.CONTACTINFORMATION.toLowerCase().includes(
        globalFilter.toLowerCase()
      ) ||
      getStatusName(employee.EMPLOYMENTSTATUS)
        .toLowerCase()
        .includes(globalFilter.toLowerCase()) ||
      getPositionName(employee.POSITIONID)
        .toLowerCase()
        .includes(globalFilter.toLowerCase()) ||
      getPositionSalary(employee.POSITIONID).toString().includes(globalFilter)
  );

  const filteredStatuses = statuses.filter(
    (status) =>
      status.EMPLOYMENTSTATUSID.toString().includes(statusFilter) ||
      status.STATUSNAME.toLowerCase().includes(statusFilter.toLowerCase())
  );

  const filteredPositions = positions.filter(
    (position) =>
      position.POSITIONID.toString().includes(positionFilter) ||
      position.POSITIONNAME.toLowerCase().includes(
        positionFilter.toLowerCase()
      ) ||
      position.SALARY.toString().includes(positionFilter)
  );

  const getSortIcon = (field) => {
    if (sortedField === field) {
      return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handlePositionFilterChange = (e) => {
    setPositionFilter(e.target.value);
  };

  const openModal = (mode, employee = null) => {
    setModalMode(mode);
    if (mode === "edit" && employee) {
      setEditEmployee(employee);
    } else {
      setEditEmployee({
        EMPLOYEEID: null,
        FIRSTNAME: "",
        LASTNAME: "",
        CONTACTINFORMATION: "",
        EMPLOYMENTSTATUS: null,
        POSITIONID: null,
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMode("add");
    setEditEmployee({
      EMPLOYEEID: null,
      FIRSTNAME: "",
      LASTNAME: "",
      CONTACTINFORMATION: "",
      EMPLOYMENTSTATUS: null,
      POSITIONID: null,
    });
  };

  const openStatusModal = (mode, status = null) => {
    setStatusModalMode(mode);
    if (mode === "edit" && status) {
      setEditStatus({ EMPLOYMENTSTATUSID: status.EMPLOYMENTSTATUSID, STATUSNAME: status.STATUSNAME });
    } else {
      setEditStatus({ EMPLOYMENTSTATUSID: null, STATUSNAME: "" });
    }
    setIsStatusModalOpen(true);
  };
  

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setStatusModalMode("add");
    setEditStatus({
      EMPLOYMENTSTATUSID: null,
      STATUSNAME: "",
    });
  };

  const openPositionModal = (mode, position = null) => {
    setPositionModalMode(mode);
    if (mode === "edit" && position) {
      setEditPosition({ POSITIONID: position.POSITIONID, POSITIONNAME: position.POSITIONNAME, SALARY: position.SALARY });
    } else {
      setEditPosition({ POSITIONID: null, POSITIONNAME: "", SALARY: "" });
    }
    setIsPositionModalOpen(true);
  };
  

  const closePositionModal = () => {
    setIsPositionModalOpen(false);
    setPositionModalMode("add");
    setEditPosition({
      POSITIONID: null,
      POSITIONNAME: "",
      SALARY: "",
    });
  };

  const handleEditEmployee = () => {
    if (modalMode === "edit") {
      // Perform PUT request to update employee
      axios
        .put(`${baseURL}/employees/${editEmployee.EMPLOYEEID}`, {
          firstName: editEmployee.FIRSTNAME,
          lastName: editEmployee.LASTNAME,
          contactInformation: editEmployee.CONTACTINFORMATION,
          employmentStatus: editEmployee.EMPLOYMENTSTATUS,
          positionId: editEmployee.POSITIONID,
        })
        .then((response) => {
          // Handle success
          console.log("Employee updated successfully:", response.data);
          // Refresh data
          refreshData();
          closeModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating employee:", error);
        });
    } else if (modalMode === "add") {
      // Perform POST request to add new employee
      axios
        .post(`${baseURL}/employees/`, {
          firstName: editEmployee.FIRSTNAME,
          lastName: editEmployee.LASTNAME,
          contactInformation: editEmployee.CONTACTINFORMATION,
          employmentStatus: editEmployee.EMPLOYMENTSTATUS,
          positionId: editEmployee.POSITIONID,
        })
        .then((response) => {
          // Handle success
          console.log("New employee added successfully:", response.data);
          // Refresh data
          refreshData();
          closeModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error adding new employee:", error);
        });
    }
  };

  const deleteEmployee = (employeeId) => {
    // Perform DELETE request to delete employee
    axios
      .delete(`${baseURL}/employees/${employeeId}`)
      .then((response) => {
        // Handle success
        console.log("Employee deleted successfully:", response.data);
        // Refresh data
        refreshData();
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting employee:", error);
      });
  };

  const handleEditStatus = () => {
    if (statusModalMode === "edit") {
      // Perform PUT request to update status
      axios
        .put(`${baseURL}/employmentStatus/${editStatus.EMPLOYMENTSTATUSID}`, {
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
        .post(`${baseURL}/employmentStatus/`, {
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
      .delete(`${baseURL}/employmentStatus/${statusId}`)
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

  const handleEditPosition = () => {
    if (positionModalMode === "edit") {
      // Perform PUT request to update position
      axios
        .put(`${baseURL}/positions/${editPosition.POSITIONID}`, {
          positionName: editPosition.POSITIONNAME,
          salary: editPosition.SALARY,
        })
        .then((response) => {
          // Handle success
          console.log("Position updated successfully:", response.data);
          // Refresh data
          refreshData();
          closePositionModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating position:", error);
        });
    }

    if (positionModalMode === "add") {
      // Perform POST request to add new position
      axios
        .post(`${baseURL}/positions/`, {
          positionName: editPosition.POSITIONNAME,
          salary: editPosition.SALARY,
        })
        .then((response) => {
          // Handle success
          console.log("New position added successfully:", response.data);
          // Refresh data
          refreshData();
          closePositionModal();
        })
        .catch((error) => {
          // Handle error
          console.error("Error adding new position:", error);
        });
    }
  };

  const deletePosition = (positionId) => {
    // Perform DELETE request to delete position
    axios
      .delete(`${baseURL}/positions/${positionId}`)
      .then((response) => {
        // Handle success
        console.log("Position deleted successfully:", response.data);
        // Refresh data
        refreshData();
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting position:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Employees Page</h1>
      <p>Here you can see the status of the trains and manage employees.</p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "employees" ? "active" : ""
                }`}
                onClick={() => setActiveTab("employees")}
                style={{ color: activeTab === "employees" ? "black" : "gray" }}
              >
                Employees
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
                Employment Status
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "positions" ? "active" : ""
                }`}
                onClick={() => setActiveTab("positions")}
                style={{ color: activeTab === "positions" ? "black" : "gray" }}
              >
                Positions
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        {activeTab === "employees" && (
          <>
            <input
              type="text"
              className="form-control me-3"
              placeholder="Global Filter"
              value={globalFilter}
              onChange={handleFilterChange}
            />
            <button
              className="btn btn-primary me-2"
              onClick={() => openModal("add")}
            >
              <FaPlus /> Add Employee
            </button>
            <button className="btn btn-secondary" onClick={refreshData}>
              <FaSync /> Refresh
            </button>
          </>
        )}
      </div>

      <div className="tab-content">
        <div
          className={`tab-pane ${activeTab === "employees" ? "active" : ""}`}
        >
          <table className="table table-striped">
            <thead>
              <tr>
                <th onClick={() => handleSort("EMPLOYEEID")}>
                  Employee ID {getSortIcon("EMPLOYEEID")}
                </th>
                <th onClick={() => handleSort("FIRSTNAME")}>
                  First Name {getSortIcon("FIRSTNAME")}
                </th>
                <th onClick={() => handleSort("LASTNAME")}>
                  Last Name {getSortIcon("LASTNAME")}
                </th>
                <th onClick={() => handleSort("CONTACTINFORMATION")}>
                  Contact Information {getSortIcon("CONTACTINFORMATION")}
                </th>
                <th onClick={() => handleSort("EMPLOYMENTSTATUS")}>
                  Employment Status {getSortIcon("EMPLOYMENTSTATUS")}
                </th>
                <th onClick={() => handleSort("POSITIONID")}>
                  Position {getSortIcon("POSITIONID")}
                </th>
                <th onClick={() => handleSort("SALARY")}>
                  Salary {getSortIcon("SALARY")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.EMPLOYEEID}>
                  <td>{employee.EMPLOYEEID}</td>
                  <td>{employee.FIRSTNAME}</td>
                  <td>{employee.LASTNAME}</td>
                  <td>{employee.CONTACTINFORMATION}</td>
                  <td>{getStatusName(employee.EMPLOYMENTSTATUS)}</td>
                  <td>{getPositionName(employee.POSITIONID)}</td>
                  <td>{getPositionSalary(employee.POSITIONID)}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openModal("edit", employee)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEmployee(employee.EMPLOYEEID)}
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
                <tr key={status.EMPLOYMENTSTATUSID}>
                  <td>{status.EMPLOYMENTSTATUSID}</td>
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
                      onClick={() => deleteStatus(status.EMPLOYMENTSTATUSID)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={`tab-pane ${activeTab === "positions" ? "active" : ""}`}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Filter Positions"
              value={positionFilter}
              onChange={handlePositionFilterChange}
            />
            <button
              className="btn btn-primary me-2"
              onClick={() => openPositionModal("add")}
            >
              <FaPlus /> Add Position
            </button>
            <button className="btn btn-secondary" onClick={refreshData}>
              <FaSync /> Refresh
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Position ID</th>
                <th>Position Name</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPositions.map((position) => (
                <tr key={position.POSITIONID}>
                  <td>{position.POSITIONID}</td>
                  <td>{position.POSITIONNAME}</td>
                  <td>{position.SALARY}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openPositionModal("edit", position)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePosition(position.POSITIONID)}
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
                  {modalMode === "edit" ? "Edit Employee" : "Add Employee"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editEmployee.FIRSTNAME}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        FIRSTNAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editEmployee.LASTNAME}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        LASTNAME: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Information</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editEmployee.CONTACTINFORMATION}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        CONTACTINFORMATION: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Employment Status</label>
                  <select
                    className="form-select"
                    value={editEmployee.EMPLOYMENTSTATUS}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        EMPLOYMENTSTATUS: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                      <option
                        key={status.EMPLOYMENTSTATUSID}
                        value={status.EMPLOYMENTSTATUSID}
                      >
                        {status.STATUSNAME}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Position</label>
                  <select
                    className="form-select"
                    value={editEmployee.POSITIONID}
                    onChange={(e) =>
                      setEditEmployee({
                        ...editEmployee,
                        POSITIONID: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Position</option>
                    {positions.map((position) => (
                      <option
                        key={position.POSITIONID}
                        value={position.POSITIONID}
                      >
                        {position.POSITIONNAME}
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
                  onClick={handleEditEmployee}
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

      {isPositionModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {positionModalMode === "edit"
                    ? "Edit Position"
                    : "Add Position"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closePositionModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="positionName" className="form-label">
                      Nome della Posizione
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="positionName"
                      value={editPosition.POSITIONNAME}
                      onChange={(e) =>
                        setEditPosition({
                          ...editPosition,
                          POSITIONNAME: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="salary" className="form-label">
                      Salario
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="salary"
                      value={editPosition.SALARY || ""}
                      onChange={(e) =>
                        setEditPosition({
                          ...editPosition,
                          SALARY: e.target.value,
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
                  onClick={closePositionModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditPosition}
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
