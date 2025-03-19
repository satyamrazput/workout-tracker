import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const ScheduleWorkout = () => {
  const [workoutId, setWorkoutId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/workouts/schedule", { workoutId, date, time });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error scheduling workout:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📅 Schedule Workout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="workoutId"
          value={workoutId}
          onChange={(e) => setWorkoutId(e.target.value)}
          placeholder="Workout ID"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Schedule
        </button>
      </form>
    </div>
  );
};

export default ScheduleWorkout;
