import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const WorkoutForm = ({ workoutId }) => {
  const [workout, setWorkout] = useState({ name: "", description: "", exercises: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (workoutId) {
      API.get(`/workouts/${workoutId}`)
        .then((res) => setWorkout(res.data))
        .catch((err) => console.error("Error fetching workout:", err));
    }
  }, [workoutId]);

  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (workoutId) {
        await API.put(`/workouts/${workoutId}`, workout);
      } else {
        await API.post("/workouts", workout);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{workoutId ? "Edit Workout" : "Create Workout"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={workout.name}
          onChange={handleChange}
          placeholder="Workout Name"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          value={workout.description}
          onChange={handleChange}
          placeholder="Workout Description"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {workoutId ? "Update Workout" : "Create Workout"}
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
