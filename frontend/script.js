const API_URL = "http://localhost:5000/api";

// 🟢 Sign Up
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    } else {
        const errorData = await res.json();
        alert(`Signup failed: ${errorData.message}`);
    }
});

// 🟢 Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
    } else {
        const errorData = await res.json();
        alert(`Login failed: ${errorData.message}`);
    }
});

// 🟢 Fetch Workouts
async function fetchWorkouts() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/workouts`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const workouts = await res.json();
    document.getElementById("workoutList").innerHTML = workouts.map(w => 
        `<li>${w.exercises[0].name} - ${w.exercises[0].sets} Sets</li>`
    ).join("");
}

// 🟢 Create Workout
document.getElementById("workoutForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const workoutId = document.getElementById("workoutId").value.trim();
    console.log("Entered Workout ID:", workoutId); // Debugging line
    if (!/^\d+$/.test(workoutId)) {
        alert("Please enter a valid Workout ID (must be a number).");
        return;
    }

    const name = document.getElementById("exerciseName").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;

    const res = await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: workoutId, exercises: [{ name, sets, reps, weight }] })
    });

    if (res.ok) {
        fetchWorkouts();
        alert("Workout created successfully!");
    } else {
        const errorData = await res.json();
        alert(`Error creating workout: ${errorData.message}`);
    }
});

// 🟢 Update Workout
document.getElementById("updateWorkoutForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = document.getElementById("updateWorkoutId").value.trim();
    if (!/^\d+$/.test(id)) {
        alert("Please enter a valid Workout ID (must be a number).");
        return;
    }

    const name = document.getElementById("updateExerciseName").value;
    const sets = document.getElementById("updateSets").value;
    const reps = document.getElementById("updateReps").value;
    const weight = document.getElementById("updateWeight").value;

    const res = await fetch(`${API_URL}/workouts/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ exercises: [{ name, sets, reps, weight }] })
    });

    if (res.ok) {
        fetchWorkouts();
        alert("Workout updated successfully!");
    } else {
        const errorData = await res.json();
        alert(`Error updating workout: ${errorData.message}`);
    }
});

// 🟢 Delete Workout
document.getElementById("deleteWorkoutForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = document.getElementById("deleteWorkoutId").value.trim();
    if (!/^\d+$/.test(id)) {
        alert("Please enter a valid Workout ID (must be a number).");
        return;
    }

    const res = await fetch(`${API_URL}/workouts/${id}`, {
        method: "DELETE",
        headers: { 
            Authorization: `Bearer ${token}`
        }
    });

    if (res.ok) {
        fetchWorkouts();
        alert("Workout deleted successfully!");
    } else {
        const errorData = await res.json();
        alert(`Error deleting workout: ${errorData.message}`);
    }
});

// 🟢 Schedule Workout
document.getElementById("scheduleWorkoutForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const workoutId = document.getElementById("scheduleWorkoutId").value;
    const dateTime = document.getElementById("scheduleDateTime").value;

    const res = await fetch(`${API_URL}/workouts/schedule`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ workoutId, dateTime })
    });

    if (res.ok) {
        fetchWorkouts();
        alert("Workout scheduled successfully!");
    } else {
        const errorData = await res.json();
        alert(`Error scheduling workout: ${errorData.message}`);
    }
});

// 🟢 Load Dashboard Data
if (window.location.pathname.includes("dashboard.html")) {
    fetchWorkouts();
}