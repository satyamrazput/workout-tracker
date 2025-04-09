const API_URL = "http://localhost:5000/api";

// Fetch user name and workouts
async function fetchUserData() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const userData = await res.json();
    const userNameElement = document.getElementById("userName");
    if (userNameElement) {
        userNameElement.innerText = userData.name;
    }
}

// Fetch workouts and update the UI
async function fetchWorkouts() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/workouts`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const workouts = await res.json();
    const recentWorkoutsList = document.getElementById("recentWorkoutsList");
    if (recentWorkoutsList) {
        recentWorkoutsList.innerHTML = workouts.map(w => 
            `<div class="workout-item">${w.exercises[0].name} - ${w.exercises[0].sets} Sets</div>`
        ).join("");
    }
}

// Fetch workout history
async function fetchWorkoutHistory() {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/workouts/history`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const workouts = await res.json();
    const workoutHistoryList = document.getElementById("workoutHistoryList");
    if (workoutHistoryList) {
        workoutHistoryList.innerHTML = workouts.map(w => 
            `<div class="workout-item">${w.date} - ${w.exercises.map(e => e.name).join(", ")}</div>`
        ).join("");
    }
}

// Update user profile
document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/user/update`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password })
    });

    if (res.ok) {
        alert("Profile updated successfully!");
    } else {
        const errorData = await res.json();
        alert(`Error updating profile: ${errorData.message}`);
    }
});

// Initialize charts
function initCharts() {
    const ctx1 = document.getElementById('weeklyProgressChart').getContext('2d');
    const ctx2 = document.getElementById('muscleGroupChart').getContext('2d');

    // Example data for charts
    const weeklyProgressChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Weekly Progress',
                data: [12, 19, 3, 5, 2, 3, 7],
                borderColor: 'rgba(74, 144, 226, 1)',
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                fill: true,
            }]
        },
    });

    const muscleGroupChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'],
            datasets: [{
                label: 'Muscle Group Focus',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(74, 144, 226, 0.5)',
            }]
        },
    });
}

// Event listener for quick workout form submission
document.getElementById("quickWorkoutForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const exerciseType = document.getElementById("exerciseType").value;
    const exerciseName = document.getElementById("exerciseName").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;
    const rpe = document.getElementById("rpe").value;
    const warmupSet = document.getElementById("warmupSet").checked;
    const dropSet = document.getElementById("dropSet").checked;
    const failureSet = document.getElementById("failureSet").checked;

    const res = await fetch(`${API_URL}/workouts`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
            exerciseType, 
            exercises: [{ name: exerciseName, sets, reps, weight, rpe, warmupSet, dropSet, failureSet }] 
        })
    });

    if (res.ok) {
        fetchWorkouts();
        alert("Workout added successfully!");
    } else {
        const errorData = await res.json();
        alert(`Error adding workout: ${errorData.message}`);
    }
});

// Initialize dashboard
async function initDashboard() {
    await fetchUserData();
    await fetchWorkouts();
    initCharts();
}

// Call the init function on page load
document.addEventListener("DOMContentLoaded", initDashboard);
