document.addEventListener('DOMContentLoaded', () => {
    const searchLink = document.getElementById('searchLink');
    const searchContainer = document.getElementById('searchContainer');

    // Toggle the search bar when the search link is clicked
    searchLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        searchContainer.classList.toggle('show-search');
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('#searchLink') && !event.target.closest('.search-container')) {
            searchContainer.classList.remove('show-search');
        }
    });
});