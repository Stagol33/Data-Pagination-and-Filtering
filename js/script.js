/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


// Global Variables
const itemsPerPage = 9;

/**
 * Shows a page of student data
 * @param {Array} list - Array of student objects
 * @param {Number} page - Page number to display
 */
function showPage(list, page) {
// Calculate start and end indexes for the current page
const startIndex = (page * itemsPerPage) - itemsPerPage;
const endIndex = page * itemsPerPage;

// Select the student list element
const studentList = document.querySelector('.student-list');

// Clear any existing student entries
studentList.innerHTML = '';

// Loop through student list and create elements for students on the current page
for (let i = 0; i < list.length; i++) {
	if (i >= startIndex && i < endIndex) {
	const student = list[i];
	
	// Create HTML for student card using template literal
	const studentHTML = `
		<li class="student-item cf">
		<div class="student-details">
			<img class="avatar" src="${student.picture.large}" alt="Profile Picture">
			<h3>${student.name.first} ${student.name.last}</h3>
			<span class="email">${student.email}</span>
		</div>
		<div class="joined-details">
			<span class="date">Joined ${new Date(student.registered.date).toLocaleDateString('en-US')}</span>
		</div>
		</li>
	`;
	
	// Add the student HTML to the student list
	studentList.insertAdjacentHTML('beforeend', studentHTML);
	}
}
}

/**
 * Creates and displays pagination buttons
 * @param {Array} list - Array of student objects 
 */
function addPagination(list) {
// Calculate number of pagination buttons needed
const numPages = Math.ceil(list.length / itemsPerPage);

// Select the pagination list element
const linkList = document.querySelector('.link-list');

// Clear any existing pagination buttons
linkList.innerHTML = '';

// Only create buttons if there are students to display
if (numPages > 0) {
	// Create pagination buttons for each page
	for (let i = 1; i <= numPages; i++) {
	const buttonHTML = `
		<li>
		<button type="button">${i}</button>
		</li>
	`;
	
	linkList.insertAdjacentHTML('beforeend', buttonHTML);
	}
	
	// Set the first button as active by default
	linkList.querySelector('button').className = 'active';
	
	// Add event listener to pagination buttons
	linkList.addEventListener('click', (e) => {
	// Check if a button was clicked
	if (e.target.tagName === 'BUTTON') {
		// Remove active class from current active button
		document.querySelector('.active').className = '';
		
		// Add active class to clicked button
		e.target.className = 'active';
		
		// Show the page for the clicked button
		showPage(list, parseInt(e.target.textContent));
	}
	});
}
}

/**
 * Creates and adds search component to the page
 */
function addSearchComponent() {
// Select the header with the h2 element
const header = document.querySelector('.header');

// Create search component HTML
const searchHTML = `
	<label for="search" class="student-search">
	<span>Search by name</span>
	<input id="search" placeholder="Search by name...">
	<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
	</label>
`;

// Add search component to the header
header.insertAdjacentHTML('beforeend', searchHTML);
}

/**
 * Performs search on student data
 * @param {Array} list - Array of student objects
 * @param {String} searchText - Text to search for
 * @returns {Array} - Filtered array of student objects
 */
function performSearch(list, searchText) {
return list.filter(student => {
	const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
	return fullName.includes(searchText.toLowerCase());
});
}

/**
 * Sets up search functionality
 * @param {Array} list - Array of student objects
 */
function setupSearch(list) {
// Select search input and button
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('.student-search button');

// Function to handle search
const handleSearch = () => {
	const searchText = searchInput.value;
	const filteredList = performSearch(list, searchText);
	
	// Show filtered students or display no results message
	if (filteredList.length > 0) {
	showPage(filteredList, 1);
	addPagination(filteredList);
	} else {
	const studentList = document.querySelector('.student-list');
	studentList.innerHTML = '<li class="no-results">No results found</li>';
	addPagination(filteredList); // This will clear the pagination
	}
};

// Add event listeners for search
searchInput.addEventListener('keyup', handleSearch);
searchButton.addEventListener('click', handleSearch);
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
// Using the data from data.js (assuming it exports an array named 'data')
const students = data;

// Display initial page of students
showPage(students, 1);

// Add pagination
addPagination(students);

// Add search component
addSearchComponent();

// Set up search functionality
setupSearch(students);
});
