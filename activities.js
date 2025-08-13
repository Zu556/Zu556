// ======== ACTIVITIES.JS ========

// Global variable to store all activities
let ACTIVITIES = [];

// Choices.js instances (initialized after DOM loads)
let ageChoices, typeChoices, categoryChoices;

document.addEventListener('DOMContentLoaded', () => {
  initChoices();
  loadActivities();
});

// Initialize Choices.js for each filter dropdown
function initChoices() {
  ageChoices = new Choices('#ageFilter', {
    removeItemButton: true,
    placeholder: true,
    placeholderValue: 'Select Age Group',
    searchPlaceholderValue: 'Search...',
    searchEnabled: true,
    shouldSort: false
  });

  typeChoices = new Choices('#typeFilter', {
    removeItemButton: true,
    placeholder: true,
    placeholderValue: 'Select Type',
    searchPlaceholderValue: 'Search...',
    searchEnabled: true,
    shouldSort: false
  });

  categoryChoices = new Choices('#categoryFilter', {
    removeItemButton: true,
    placeholder: true,
    placeholderValue: 'Select Category',
    searchPlaceholderValue: 'Search...',
    searchEnabled: true,
    shouldSort: false
  });

  // Listen for changes in filters
  document.getElementById('searchBar').addEventListener('input', filterActivities);
  ageChoices.passedElement.element.addEventListener('change', filterActivities);
  typeChoices.passedElement.element.addEventListener('change', filterActivities);
  categoryChoices.passedElement.element.addEventListener('change', filterActivities);
}

// Load activities.json and initialize the UI
async function loadActivities() {
  try {
    const res = await fetch('activities.json'); // adjust path if needed
    ACTIVITIES = await res.json();

    buildFilterOptions(ACTIVITIES); // Populate dropdowns from data
    renderActivities(ACTIVITIES); // Show all activities initially
  } catch (err) {
    console.error('Error loading activities.json:', err);
  }
}

// Create dropdown options dynamically based on dataset
function buildFilterOptions(data) {
  const ages = uniqueVals(data, 'age');
  const types = uniqueVals(data, 'type');
  const cats = uniqueVals(data, 'category');

  ageChoices.setChoices(ages.map(v => ({ value: v, label: v })), 'value', 'label', true);
  typeChoices.setChoices(types.map(v => ({ value: v, label: v })), 'value', 'label', true);
  categoryChoices.setChoices(cats.map(v => ({ value: v, label: v })), 'value', 'label', true);
}

// Return unique, sorted values for a key
function uniqueVals(list, key) {
  return [...new Set(list.map(x => (x[key] || '').toString().trim()).filter(Boolean))].sort();
}

// Render cards to the DOM
function renderActivities(list) {
  const grid = document.getElementById('activityGrid');
  if (!list.length) {
    grid.innerHTML = `<p>No activities found.</p>`;
    return;
  }

  grid.innerHTML = list.map(item => `
    <div class="activity-card">
      <h3>${item.name || 'Untitled'}</h3>
      <p>${item.description || ''}</p>
      <div><strong>Age:</strong> ${item.age || '—'}</div>
      <div><strong>Type:</strong> ${item.type || '—'}</div>
      <div><strong>Category:</strong> ${item.category || '—'}</div>
      ${item.tags ? `<div class="tags">${item.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}</div>` : ''}
      ${item.link ? `<a class="btn" href="${item.link}" target="_blank" rel="noopener">Learn more</a>` : ''}
    </div>
  `).join('');
}

// Return current filter selections
function currentSelections() {
  const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();
  const ages = ageChoices.getValue(true);
  const types = typeChoices.getValue(true);
  const cats = categoryChoices.getValue(true);
  return { searchTerm, ages, types, cats };
}

// Apply filters to dataset
function filterActivities() {
  const { searchTerm, ages, types, cats } = currentSelections();

  const filtered = ACTIVITIES.filter(a => {
    const hay = [
      a.name, a.description, a.type, a.category, a.age, a.location, a.tags
    ].join(' ').toLowerCase();

    const passSearch = searchTerm ? hay.includes(searchTerm) : true;
    const inAges = !ages.length || ages.some(v => (a.age || '').includes(v));
    const inTypes = !types.length || types.some(v => (a.type || '').includes(v));
    const inCats = !cats.length || cats.some(v => (a.category || '').includes(v));

    return passSearch && inAges && inTypes && inCats;
  });

  renderActivities(filtered);
}
