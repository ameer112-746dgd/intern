import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateInterviewPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    const newInterview = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      status: data.status,
      date: data.date,
    };

    try {
      setLoading(true);
      setSuccessMessage("");

      // Save My to localStorage
      const savedInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
      const updatedInterviews = [...savedInterviews, newInterview];
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));

      // Mock My API call
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInterview),
      });

      setSuccessMessage("Interview created successfully!");
      reset();

      setTimeout(() => navigate("/interviews"), 1000);
    } catch (error) {
      console.error("Error creating interview:", error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Interview</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="interview-form">
        <label>Interview Title</label>
        <input {...register("title", { required: true })} placeholder="Enter title" />
        {errors.title && <span className="error">Title is required</span>}

        <label>Description</label>
        <textarea {...register("description")} placeholder="Enter description" />

        <label>Status</label>
        <select {...register("status", { required: true })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && <span className="error">Status is required</span>}

        <label>Interview Date</label>
        <input type="date" {...register("date", { required: true })} />
        {errors.date && <span className="error">Date is required</span>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Interview"}
        </button>
      </form>

      {successMessage && <p style={{ color: "green", marginTop: "20px" }}>{successMessage}</p>}
    </div>
  );
};

export default CreateInterviewPage;
