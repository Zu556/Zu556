// Sample activities data (replace/add more as needed)
const activities = [
  {
    title: "Math Olympiad",
    description: "A competition for young mathematicians.",
    age: "High School",
    type: "Tournament",
    category: "STEM"
  },
  {
    title: "Science Fair",
    description: "Present science projects and innovations.",
    age: "Middle School",
    type: "Fair",
    category: "STEM"
  },
  {
    title: "Drama Festival",
    description: "A performance-based arts event.",
    age: "High School",
    type: "Performance",
    category: "Arts"
  },
  // Add more as needed
];

// Elements
const searchInput = document.getElementById("searchInput");
const ageFilter = document.getElementById("ageFilter");
const typeFilter = document.getElementById("typeFilter");
const categoryFilter = document.getElementById("categoryFilter");
const activityGrid = document.getElementById("activityGrid");

// Load activities
function loadActivities() {
  activityGrid.innerHTML = "";
  const search = searchInput.value.toLowerCase();
  const ageSelected = Array.from(ageFilter.selectedOptions).map(opt => opt.value);
  const typeSelected = Array.from(typeFilter.selectedOptions).map(opt => opt.value);
  const categorySelected = Array.from(categoryFilter.selectedOptions).map(opt => opt.value);

  const filtered = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(search) || activity.description.toLowerCase().includes(search);
    const matchesAge = ageSelected.includes("All") || ageSelected.includes(activity.age);
    const matchesType = typeSelected.includes("All") || typeSelected.includes(activity.type);
    const matchesCategory = categorySelected.includes("All") || categorySelected.includes(activity.category);
    return matchesSearch && matchesAge && matchesType && matchesCategory;
  });

  if (filtered.length === 0) {
    activityGrid.innerHTML = "<p>No matching activities found.</p>";
    return;
  }

  filtered.forEach(activity => {
    const card = document.createElement("div");
    card.className = "activity-card";
    card.innerHTML = `
      <h3>${activity.title}</h3>
      <p>${activity.description}</p>
      <small><strong>Age:</strong> ${activity.age}</small><br>
      <small><strong>Type:</strong> ${activity.type}</small><br>
      <small><strong>Category:</strong> ${activity.category}</small>
    `;
    activityGrid.appendChild(card);
  });
}

// Event listeners
searchInput.addEventListener("input", loadActivities);
ageFilter.addEventListener("change", loadActivities);
typeFilter.addEventListener("change", loadActivities);
categoryFilter.addEventListener("change", loadActivities);

// Initial load
loadActivities();
