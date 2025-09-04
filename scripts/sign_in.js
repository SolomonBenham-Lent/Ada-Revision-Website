function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Send the ID token to your backend server for verification and user management
    sendTokenToServer(response.credential);
    // Client-side decoding and alert are removed as backend handles authentication
}

async function sendTokenToServer(token) {
    // IMPORTANT: This URL MUST match your backend server's address and port.
    // For local development, it's typically http://localhost:3000.
    const backendUrl = 'http://localhost:3000/api/google-signin';

    try {
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: token }),
        });

        const data = await response.json();

        // Check if the HTTP response itself was successful (status 200-299)
        if (response.ok) {
            console.log('Backend authentication successful', data);
            // Use data from backend response for the alert
            alert(`Welcome, ${data.name || data.email}! You're signed in.`);

            // --- REDIRECT CODE ---
            // Replace 'home.html' with the actual filename of your next page.
            // Ensure 'home.html' is in the correct relative path to this sign-in page.
            //window.location.href = 'home.html';
            // --- END REDIRECT CODE ---

        } else {
            // Handle backend-reported errors
            console.error('Backend authentication failed:', data);
            alert(`Login failed: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
        // Handle network errors or other issues with the fetch request
        console.error('Error sending token to backend:', error);
        alert('An error occurred during login. Check console for details.');
    }
}