import { useState } from "react";
import api from "../api/axios";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/contact", form);
    alert("Message sent");
  };

  return (
    <form onSubmit={submit}>
      <h2>Contact Me</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Message"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button>Send</button>
    </form>
  );
}
