"use client";
import { useState } from "react";

export default function RSVPForm() {
  const [form, setForm] = useState({ name: "", attending: "", plusOnes: 0 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${form.name}, for your RSVP!`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800">RSVP</h2>
      <div className="mt-4">
        <label className="block text-gray-700">Name</label>
        <input
          name="name"
          onChange={handleChange}
          className="border w-full p-2 rounded-md"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Will you attend?</label>
        <select
          name="attending"
          onChange={handleChange}
          className="border w-full p-2 rounded-md"
          required
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Number of Plus-Ones</label>
        <input
          name="plusOnes"
          type="number"
          min="0"
          max="5"
          onChange={handleChange}
          className="border w-full p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-primary text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}
