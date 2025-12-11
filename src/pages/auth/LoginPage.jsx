import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
