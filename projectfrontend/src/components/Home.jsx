import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Navigate to the login page when "Get Started" is clicked
    navigate("/login");
  };

  const handleSignUpClick = () => {
    // Navigate to the signup page when "Sign Up Now" is clicked
    navigate("/register");
  };

  return (
    <div>
      <header></header>

      <main>
        <section className="hero">
          <h1>Welcome to IT Asset Management</h1>
          <p>Manage your software assets efficiently and effectively.</p>
          <button onClick={handleGetStartedClick}>Log in</button>
        </section>

        <section className="features">
          <h2>Features</h2>
          <div className="feature-item">
            <h3>Asset Tracking</h3>
            <p>
              Keep track of all your assets in one place with powerful search
              functionality.
            </p>
          </div>
          <div className="feature-item">
            <h3>Collaborative Environment</h3>
            <p>
              Work together with your team to manage and update assets
              seamlessly.
            </p>
          </div>
          <div className="feature-item">
            <h3>Advanced Reporting</h3>
            <p>
              Generate reports to get insights into your assets' status and
              history.
            </p>
          </div>
        </section>

        <section className="call-to-action">
          <h2>Ready to take control of your assets?</h2>
          <button onClick={handleSignUpClick}>Sign Up Now</button>
        </section>
      </main>

      <footer></footer>
    </div>
  );
}

export default Home;
