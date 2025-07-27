function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    document.getElementById("date-time").innerText = formattedTime;
}

setInterval(updateTime, 1000);
updateTime();

//att script
// Test case (Will be connected to database later)
let totalClasses = 100;
let attendedClasses = 100;

// Calculate attendance percentage
let attendancePercent = (attendedClasses / totalClasses) * 100;
document.getElementById("attendance-percent").innerText = attendancePercent.toFixed(1) + "%";
document.getElementById("attended-classes").innerText = attendedClasses;
document.getElementById("total-classes").innerText = totalClasses;

// Calculate needed classes for 85%
let neededClasses = Math.ceil((0.85 * totalClasses) - attendedClasses);
document.getElementById("needed-classes").innerText = neededClasses > 0 ? neededClasses : 0;

// Set circular progress fill
let circle = document.querySelector(".fill-circle");
let strokeDashoffset = 314 - (314 * attendancePercent) / 100;
circle.style.strokeDashoffset = strokeDashoffset;

// Change color based on percentage
if (attendancePercent < 60) {
    circle.style.stroke = "red";
} else if (attendancePercent < 85) {
    circle.style.stroke = "#ffa500"; // Yellow-orange
} else { 
    circle.style.stroke = "#ff6600"; // Default color
}

// greating card
function updateGreeting() {
    let userName = "STUDENT'S";  // Later, get the actual user’s name from database
    let hour = new Date().getHours();
    let greeting = "Good Morning";  

    if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17) {
        greeting = "Good Evening";
    }

    document.getElementById("greeting-message").innerText = `Hi, ${userName}`;
    document.getElementById("sub-text").innerText = greeting + ", have a great day!";
}

updateGreeting();

//student card
const studentData = {
    name: "Jana",
    roll: "2436090009",
    department: "Computer Science",
    year: "Third year",
    reports: "Good Attendance",
    img: "/assets/IMG_20240807_091837.jpg" // Placeholder image (Replace later)
};

// Set student data in HTML
document.getElementById("student-img").src = studentData.img;
document.getElementById("student-name").innerText = studentData.name;
document.getElementById("student-roll").innerText = studentData.roll;
document.getElementById("student-dept").innerText = studentData.department;
document.getElementById("student-year").innerText = studentData.year;
document.getElementById("student-reports").innerText = studentData.reports;


// calender
const monthYearDisplay = document.getElementById("month-year");
const calendarDays = document.getElementById("calendar-days");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date(); // Default to today's date

// Define Lab Days (Tuesday, Wednesday, Thursday)
const labDays = [2, 3, 5]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Set month-year text
    monthYearDisplay.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Get first day of month & total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarDays.innerHTML = ""; // Clear previous content

    // Fill empty spaces for first week alignment
    for (let i = 0; i < firstDay; i++) {
        let emptyDiv = document.createElement("div");
        calendarDays.appendChild(emptyDiv);
    }

    // Create days dynamically
    for (let day = 1; day <= daysInMonth; day++) {
        let dayDiv = document.createElement("div");
        dayDiv.classList.add("calendar-day");
        dayDiv.innerText = day;

        let dayOfWeek = new Date(year, month, day).getDay(); // Get day of week (0-6)

        // Highlight lab session days in red
        if (labDays.includes(dayOfWeek)) {
            dayDiv.classList.add("lab-day");
        }

        // Highlight today's date
        if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayDiv.classList.add("today");
        }

        calendarDays.appendChild(dayDiv);
    }
}

// Navigate months
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial Render
renderCalendar();

// leave bar
const leaveTaken =5; // Test variable, later fetch from database
const maxLeave = 15;
const progressCircle = document.getElementById("leave-progress");
const leaveText = document.getElementById("leave-text");
const leaveCount = document.getElementById("leave-count");
const warningBox = document.getElementById("warning-box");

// Update Circular Bar
function updateLeaveStats() {
    let percentage = (leaveTaken / maxLeave) * 100;
    let offset = 251.2 - (251.2 * percentage) / 100;

    progressCircle.style.strokeDashoffset = offset;
    leaveText.innerText = leaveTaken;
    leaveCount.innerText = `${leaveTaken}/15`;

    // Change circle color based on leave taken
    if (leaveTaken <= 10) {
        progressCircle.style.stroke = "green";
    } else if (leaveTaken <= 12) {
        progressCircle.style.stroke = "orange";
    } else {
        progressCircle.style.stroke = "red";
    }

    // Update Warning Box
    if (leaveTaken > 14) {
        warningBox.innerText = "All taken! Go attend the class today!";
        warningBox.style.background = "red";
        warningBox.style.color = "white";
        warningBox.classList.remove("hidden");
    } else if (leaveTaken === 14) {
        warningBox.innerText = "Careful! One day leave is left";
        warningBox.style.background = "orange";
        warningBox.style.color = "black";
        warningBox.classList.remove("hidden");
    } else if (leaveTaken >= 5) {
        warningBox.innerText = "Be aware you are taking more leave";
        warningBox.style.background = "yellow";
        warningBox.style.color = "black";
        warningBox.classList.remove("hidden");
    } else {
        warningBox.classList.add("hidden");
    }
}

// Initial Update
updateLeaveStats();


// graph
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("attendanceChart");

    if (!ctx) {
        console.error("Canvas element not found!");
        return;
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            datasets: [
                {
                    label: "Week 1",
                    data: [3, 5, 2, 4, 5],
                    borderColor: "#ff9800",
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "#ff9800",
                    tension: 0.4, // Smooth curves
                },
                {
                    label: "Week 2",
                    data: [4, 2, 3, 5, 4],
                    borderColor: "#ff5722",
                    backgroundColor: "rgba(255, 87, 34, 0.2)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "#ff5722",
                    tension: 0.4,
                },
                {
                    label: "Week 3",
                    data: [2, 3, 5, 2, 4],
                    borderColor: "#4caf50",
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "#4caf50",
                    tension: 0.4,
                },
                {
                    label: "Week 4",
                    data: [5, 4, 3, 2, 1],
                    borderColor: "#2196F3",
                    backgroundColor: "rgba(33, 150, 243, 0.2)",
                    borderWidth: 2,
                    pointRadius: 4,
                    pointBackgroundColor: "#2196F3",
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                    },
                },
            },
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });
});
