import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    const user = {
      user_name: username,
      user_first_name: firstname,
      user_last_name: lastname,
      user_password: password,
      user_role: "Viewer",
    };
    console.log(user);
    try {
      await axios.post("http://localhost:8080/users/registerUser", user);
      alert("User registration successful!");
      navigate("/");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>Registration</h1>

          <form>
            <div className="form-group">
              <label>Username</label>
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
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Enter First Name"
                value={firstname}
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={save}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
