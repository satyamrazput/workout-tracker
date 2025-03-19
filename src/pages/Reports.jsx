import { useEffect, useState } from "react";
import API from "../utils/api";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/workouts/reports");
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">📊 Workout Reports</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length > 0 ? (
        <ul>
          {reports.map((report) => (
            <li key={report._id} className="p-3 border-b">
              <h3 className="text-lg font-semibold">{report.workoutName}</h3>
              <p>Total Workouts: {report.totalWorkouts}</p>
              <p>Last Workout Date: {new Date(report.lastWorkoutDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports available. Start tracking your workouts!</p>
      )}
    </div>
  );
};

export default Reports;
