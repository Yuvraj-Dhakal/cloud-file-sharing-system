import { Link } from "react-router-dom";

function App() {
  return (
    <div style={styles.container}>
      <h1>  Cloudbased Storage</h1>

      <p>Upload • Share • Secure Files</p>

      <div style={styles.links}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  links: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
};

export default App;