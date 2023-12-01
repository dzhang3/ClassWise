import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TitleHeader from "../components/navigation/title-header";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    // e.preventDefault();
    // try {
    //   await login(email, password);
    //   history.push("/");
    // } catch (err) {
    //   setError("Failed to log in");
    // }
  }

  return (
    <div className="LoginPage">
      <TitleHeader />

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
