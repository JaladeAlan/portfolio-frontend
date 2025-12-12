import { useState } from "react";
import api from "../api/axios";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return setStatus({ type: "error", message: "All fields are required." });
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await api.post("/contact", form);
      setStatus({ type: "success", message: "Message sent successfully!" });

      // Clear form
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Something went wrong.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 pt-6">Contact Me</h2>

      {status.message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            status.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-gray-300"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-gray-300"
            placeholder="example@mail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            className="w-full px-4 py-2 h-32 rounded-lg border border-gray-300 focus:ring focus:ring-gray-300"
            placeholder="Write your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full py-3 font-semibold rounded-lg bg-black text-white hover:bg-neutral-800 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
