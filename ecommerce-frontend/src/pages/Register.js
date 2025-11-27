import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState(""); // matches your DB column
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: username, // backend expects 'name' in body, mapped to username in DB
        email,
        password,
      });

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Registration failed. Try again.");
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create Account</h2>
        {message && <p style={styles.msg}>{message}</p>}

        <form onSubmit={handleRegister}>
          <div style={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button style={styles.btn} type="submit">
            Register
          </button>

          <p style={styles.loginText}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

// Inline CSS
const styles = {
  wrapper: {
    width: "100%",
    height: "100vh",
    background: "#f3f3f3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "350px",
    padding: "25px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  msg: {
    textAlign: "center",
    color: "red",
    marginBottom: "10px",
  },
  loginText: {
    textAlign: "center",
    marginTop: "12px",
  },
};
