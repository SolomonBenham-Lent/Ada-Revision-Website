function displayUserData() {
    // This line retrieves the user data string that was saved by sign_in.js
    const userDataString = localStorage.getItem('userData'); 
    
    if (userDataString) {
        // Parse the JSON string back into a JavaScript object
        const userData = JSON.parse(userDataString);
        
        // Use console.log to confirm the data is there
        console.log('User data found in local storage:', userData);

        // Update the HTML elements with the fetched data
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
    } else {
        console.error('User data not found in local storage. User may not be logged in.');
    }
}

// Call the function to display the data as soon as the page loads
displayUserData();