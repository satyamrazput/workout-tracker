import { Route, Routes } from "react-router-dom";
import CreateWorkout from "./pages/CreateWorkout";
import EditWorkout from "./pages/EditWorkout";
import ScheduleWorkout from "./pages/ScheduleWorkout"; // Importing ScheduleWorkout
import Reports from "./pages/Reports"; // Importing Reports


import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";

const App = () => (
  <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workout/new" element={<CreateWorkout />} />
      <Route path="/workout/edit/:id" element={<EditWorkout />} />
      <Route path="/schedule" element={<ScheduleWorkout />} /> // Adding ScheduleWorkout route
      <Route path="/reports" element={<Reports />} /> // Adding Reports route

      <Route path="/schedule" element={<ScheduleWorkout />} />


      <Route path="/workouts" element={<Workouts />} />
      <Route path="/reports" element={<Reports />} />

    </Routes>
  </AuthProvider>
);

export default App;
