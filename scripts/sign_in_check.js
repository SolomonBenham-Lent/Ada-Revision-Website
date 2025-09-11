document.addEventListener('DOMContentLoaded', () => {
    // Check for the 'is_logged_in' flag in sessionStorage
    if (sessionStorage.getItem('is_logged_in') === 'true') {
        const replace_sign_in = document.getElementById('replace_sign_in');
        if (replace_sign_in) {
            replace_sign_in.remove();

            const profile_appear = document.getElementById('profile_button');
            profile_appear.hide();

        }
    }
});