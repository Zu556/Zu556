/// Initialize Choices.js for each dropdown
const ageChoices = new Choices('#ageFilter', {
  removeItemButton: true,
  placeholderValue: 'Select Age...',
  searchPlaceholderValue: 'Search age options',
  shouldSort: false
});

const typeChoices = new Choices('#typeFilter', {
  removeItemButton: true,
  placeholderValue: 'Select Type...',
  searchPlaceholderValue: 'Search type options',
  shouldSort: false
});

const categoryChoices = new Choices('#categoryFilter', {
  removeItemButton: true,
  placeholderValue: 'Select Category...',
  searchPlaceholderValue: 'Search category options',
  shouldSort: false
});

// Sample activities data (replace with your actual data or API call)
const activities = [
  {
    name: "Math Olympiad",
    age: ["High School", "Undergraduate"],
    type: ["Tournament"],
    category: ["STEM"]
  },
  {
    name: "Science Fair",
    age: ["Middle School", "High School"],
    type: ["Fair"],
    category: ["STEM"]
  },
  {
    name: "Art Competition",
    age: ["Elementary School", "Middle School"],
    type: ["Submission"],
    category: ["Arts"]
  },
  {
    name: "Leadership Summit",
    age: ["High School", "Undergraduate"],
    type: ["Presentation"],
    category: ["Leadership"]
  }
];

// DOM elements
const searchBar = document.getElementById('searchBar');
const activityGrid = document.getElementById('activityGrid');
const clearFilters = document.getElementById('clearFilters');

// Function to render activities
function renderActivities(filteredActivities) {
  activityGrid.innerHTML = '';
  if (filteredActivities.length === 0) {
    activityGrid.innerHTML = '<p>No activities found.</p>';
    return;
  }

  filteredActivities.forEach(activity => {
    const card = document.createElement('div');
    card.classList.add('activity-card');
    card.innerHTML = `
      <h3>${activity.name}</h3>
      <p><strong>Age:</strong> ${activity.age.join(', ')}</p>
      <p><strong>Type:</strong> ${activity.type.join(', ')}</p>
      <p><strong>Category:</strong> ${activity.category.join(', ')}</p>
    `;
    activityGrid.appendChild(card);
  });
}

// Function to filter activities
function filterActivities() {
  const searchText = searchBar.value.toLowerCase();

  const selectedAges = ageChoices.getValue(true);
  const selectedTypes = typeChoices.getValue(true);
  const selectedCategories = categoryChoices.getValue(true);

  const filtered = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchText);

    const matchesAge =
      selectedAges.length === 0 ||
      selectedAges.includes("All") ||
      selectedAges.some(age => activity.age.includes(age));

    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.includes("All") ||
      selectedTypes.some(type => activity.type.includes(type));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("All") ||
      selectedCategories.some(cat => activity.category.includes(cat));

    return matchesSearch && matchesAge && matchesType && matchesCategory;
  });

  renderActivities(filtered);
}

// Event listeners
searchBar.addEventListener('input', filterActivities);
ageChoices.passedElement.element.addEventListener('change', filterActivities);
typeChoices.passedElement.element.addEventListener('change', filterActivities);
categoryChoices.passedElement.element.addEventListener('change', filterActivities);

clearFilters.addEventListener('click', () => {
  searchBar.value = '';
  ageChoices.removeActiveItems();
  typeChoices.removeActiveItems();
  categoryChoices.removeActiveItems();
  filterActivities();
});

// Initial render
renderActivities(activities);
