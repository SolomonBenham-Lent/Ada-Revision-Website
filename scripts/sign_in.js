var one_time_flag = true;
if (one_time_flag) {
    document.getElementById('profile_button').style.display = "none";
    one_time_flag = false;
}


function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    sendTokenToServer(response.credential);
}
async function sendTokenToServer(token) {
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

        if (response.ok) {
            console.log('Backend authentication successful', data);
            alert(`Login successful: ${data.message || 'good job'}`);

            // This is the corrected line: store the entire user data object
            sessionStorage.setItem('userData', JSON.stringify(data));

            //sets the signed in state
            sessionStorage.setItem('is_logged_in', 'true');

            window.location.href = '../pages/profile.html';
        } else {
            console.error('Backend authentication failed:', data);
            alert(`Login failed: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error sending token to backend:', error);
        alert('An error occurred during login. Check console for details.');
    }
}