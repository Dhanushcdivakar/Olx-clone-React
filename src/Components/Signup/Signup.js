import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Context";
import { useHistory } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({ displayName: username });
      await firebase.firestore().collection("users").add({
        id: result.user.uid,
        username: username,
        phone: phone,
      });
      history.push("/login");
    } catch (err) {
      console.error("Error signing up:", err);
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            placeholder="John"
            required // Added required attribute
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="john@example.com"
            required // Added required attribute
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel" // Changed to 'tel'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="1234567890"
            required // Added required attribute
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="••••••••"
            required // Added required attribute
          />
          <br />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <a href="/login">Login</a> {/* Link to login page */}
      </div>
    </div>
  );
}
