
function handleAreaClick(areaId) {
    // Perform API call based on the clicked area
    // Replace the following URL with your API endpoint
    const apiUrl = `https://www.balldontlie.io/api/v1/teams/${areaId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Log the entire data object to the console to inspect its structure
            console.log(data);

            // Process the API response and update the teamInfo and tooltip elements
            const teamInfoElement = document.getElementById('teamInfo');
            const tooltipElement = document.getElementById('tooltip');

            // Create a string with all relevant details
            const teamDetailsString = `
                <p>Abbreviation: ${data.abbreviation}</p>
                <p>City: ${data.city}</p>
                <p>Conference: ${data.conference}</p>
                <p>Division: ${data.division}</p>
                <p>Full Name: ${data.full_name}</p>
                <p>Name: ${data.name}</p>
            `;

            // Insert the string into the HTML
            teamInfoElement.innerHTML = `<div>Information for Area ${data.full_name}: ${teamDetailsString}</div>`;

            // Set the tooltip content
            tooltipElement.innerText = data.full_name;

            // Show the tooltip
            tooltipElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
