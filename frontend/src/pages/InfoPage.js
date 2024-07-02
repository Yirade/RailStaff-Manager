import React from "react";

export default function InfoPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Ecoboaea Denis's Database Project</h1>
      <p style={styles.text}>
        This project revolves around utilizing an Oracle SQL database, with a primary focus on database management and integration. 
        The application includes a web-based interface built with Node.js and Express for the backend, React with Bootstrap 5 for the frontend.
        The entire project has been packaged into Docker containers using Docker Compose, ensuring easy deployment and scalability.
      </p>
      <p style={styles.text}>
        Explore the functionalities and capabilities of this integrated system, showcasing the practical application of Oracle SQL in a modern web environment.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    paddingTop: "50px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  text: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "15px",
    color: "#555",
  },
};
