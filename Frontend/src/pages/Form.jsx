import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Form() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    template: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectTemplate = (template) => {
    setForm({ ...form, template });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.template) {
      alert("Please select a template!");
      return;
    }
    localStorage.setItem("resumeData", JSON.stringify(form));
    navigate(`/${form.template}`);
  };

  return (
    <div className="flex justify-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Resume Builder</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={form.summary}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <h3 className="text-lg font-semibold mt-4">Select a Template</h3>
          <div className="flex gap-4 mt-2">
            <div
              className={`border-2 rounded-lg p-2 cursor-pointer w-1/2 text-center ${
                form.template === "template1" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => selectTemplate("template1")}
            >
              <img src="/preview1.png" alt="Template 1" className="h-32 w-full object-cover rounded" />
              <p className="mt-2 font-medium">Modern</p>
            </div>
            <div
              className={`border-2 rounded-lg p-2 cursor-pointer w-1/2 text-center ${
                form.template === "template2" ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => selectTemplate("template2")}
            >
              <img src="/preview2.png" alt="Template 2" className="h-32 w-full object-cover rounded" />
              <p className="mt-2 font-medium">Minimalist</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700"
          >
            Generate Resume
          </button>
        </form>
      </div>
    </div>
  );
}
