import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import api from "../config/api";

import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ==========================
  // Email Login
  // ==========================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", {
  email,
  password,
});
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    }
    setLoading(false);
  };

  // ==========================
  // Google Login
  // ==========================
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
    const res = await api.post("/api/auth/login", {
        credential: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }
      toast.success("Google Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        "Unable to sign in with Google. Please try again."
      );
    }
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <h2>YuvNext</h2>
        </div>
        <h3 className="login-title">
          Welcome Back
        </h3>
        <p className="login-subtitle">
          Sign in to access your cloud storage.
        </p>
        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </button>
          <div className="text-center my-4">
            <span className="text-muted">
              OR
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                setError("Google login failed.")
              }
              theme="outline"
              size="large"
              shape="pill"
              width="340"
            />
          </div>
        </form>
        <div className="login-footer">
          <p className="mt-4">
            Don't have an account?
            <Link
              to="/register"
              className="ms-2"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;