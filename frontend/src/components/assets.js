document.addEventListener('DOMContentLoaded', () => {
    const assetSearchBtn = document.getElementById('assetSearchBtn');
    const assetSearchInput = document.getElementById('assetSearchInput');

    assetSearchBtn.addEventListener('click', () => {
        // Logic to perform search
        const searchTerm = assetSearchInput.value;
        console.log('Searching for:', searchTerm);
    });
});