// Sample activity data — extend this as needed
const activities = [
  {
    title: "National Science Fair",
    description: "Compete with students nationwide showcasing your scientific innovation.",
    age: "High School",
    type: "Fair",
    category: "STEM"
  },
  {
    title: "School Orchestra Recital",
    description: "Annual concert performance showcasing musical talent.",
    age: "Middle School",
    type: "Performance",
    category: "Arts"
  },
  {
    title: "Model United Nations",
    description: "Engage in global diplomacy and debate as a delegate.",
    age: "Undergraduate",
    type: "Tournament",
    category: "Leadership"
  },
  {
    title: "Community Clean-Up Drive",
    description: "Volunteer to help your local environment.",
    age: "High School",
    type: "Presentation",
    category: "Community"
  }
];

const searchBar = document.getElementById("searchBar");
const activityGrid = document.getElementById("activityGrid");

const ageChoices = new Choices('#ageFilter', { removeItemButton: true, searchEnabled: true });
const typeChoices = new Choices('#typeFilter', { removeItemButton: true, searchEnabled: true });
const categoryChoices = new Choices('#categoryFilter', { removeItemButton: true, searchEnabled: true });

document.getElementById("clearFilters").addEventListener("click", () => {
  ageChoices.removeActiveItems();
  typeChoices.removeActiveItems();
  categoryChoices.removeActiveItems();

  ageChoices.setChoiceByValue("All");
  typeChoices.setChoiceByValue("All");
  categoryChoices.setChoiceByValue("All");

  searchBar.value = "";
  loadActivities();
});

searchBar.addEventListener("input", loadActivities);

function loadActivities() {
  const query = searchBar.value.toLowerCase();

  const selectedAges = getSelectedValues(ageChoices);
  const selectedTypes = getSelectedValues(typeChoices);
  const selectedCategories = getSelectedValues(categoryChoices);

  const filtered = activities.filter(activity => {
    const matchesQuery =
      activity.title.toLowerCase().includes(query) ||
      activity.description.toLowerCase().includes(query);

    const matchesAge = selectedAges.includes("All") || selectedAges.includes(activity.age);
    const matchesType = selectedTypes.includes("All") || selectedTypes.includes(activity.type);
    const matchesCategory = selectedCategories.includes("All") || selectedCategories.includes(activity.category);

    return matchesQuery && matchesAge && matchesType && matchesCategory;
  });

  renderActivities(filtered);
}

function getSelectedValues(choicesInstance) {
  return choicesInstance.getValue(true);
}

function renderActivities(activitiesList) {
  activityGrid.innerHTML = "";

  if (activitiesList.length === 0) {
    activityGrid.innerHTML = "<p>No activities found.</p>";
    return;
  }

  activitiesList.forEach(activity => {
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

// Load on page load
document.addEventListener("DOMContentLoaded", loadActivities);
