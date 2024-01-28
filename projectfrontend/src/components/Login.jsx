import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        user_name: username,
        user_password: password,
      });

      if (response.data === true) {
        // Login successful
        navigate("/dashboard");
      } else {
        // Login failed
        alert("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h2>Login</h2>
          <hr />
        </div>
        <div className="row">
          <div className="col-sm-6">
            <form>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={login}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
