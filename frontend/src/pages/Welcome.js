import { Link } from "react-router-dom";
import { useState } from "react";

export default function Welcome() {
  const [flip, setFlip] = useState(false);

  const pageStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #c9e9ff, #f6faff)",
  };

  const floatingCircle = (size, top, left, delay) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(5px)",
    top,
    left,
    animation: `float 6s ease-in-out ${delay}s infinite`,
  });

  const cardContainerStyle = {
    perspective: "1000px",
  };

  const cardStyle = {
    textAlign: "center",
    padding: "40px 60px",
    width: "450px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
    transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: "transform 0.8s ease",
  };

  const titleStyle = {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "12px",
  };

  const subtitleStyle = {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#555",
  };

  const btn = {
    padding: "12px 35px",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };

  const loginBtn = {
    ...btn,
    background: "#1E90FF",
    color: "white",
  };

  const registerBtn = {
    ...btn,
    background: "green",
    color: "white",
  };

  const animations = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-25px); }
    100% { transform: translateY(0px); }
  }
  .pulse:hover {
    transform: scale(1.12);
    box-shadow: 0 8px 18px rgba(0,0,0,0.25);
  }
  `;

  return (
    <>
      <style>{animations}</style>

      <div style={pageStyle}>
        {/* ✅ Floating Background Circles */}
        <div style={floatingCircle("150px", "10%", "15%", 0)}></div>
        <div style={floatingCircle("220px", "60%", "70%", 1)}></div>
        <div style={floatingCircle("120px", "75%", "20%", 2)}></div>

        <div style={cardContainerStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>
              {flip ? "Create an Account" : "Welcome to HelpDesk App"}
            </h1>

            <p style={subtitleStyle}>
              {flip
                ? "Fill the form to get started"
                : "Manage tickets quickly and easily"}
            </p>

            {/* ✅ Buttons */}
            {!flip ? (
              <>
                <Link
                  to="/login"
                  className="pulse"
                  style={loginBtn}
                  onMouseEnter={() => setFlip(false)}
                >
                  Login
                </Link>

                <br /> <br />

                <button
                  className="pulse"
                  style={registerBtn}
                  onClick={() => setFlip(true)}
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="pulse"
                  style={registerBtn}
                >
                  Go to Register Form
                </Link>

                <br /> <br />

                <button
                  className="pulse"
                  style={loginBtn}
                  onClick={() => setFlip(false)}
                >
                  Back to Welcome
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


