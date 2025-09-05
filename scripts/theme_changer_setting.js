function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
}

// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Update radio buttons to match saved theme
const savedRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
if (savedRadio) savedRadio.checked = true;

// Listen for theme changes
document.querySelectorAll('input[name="theme"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        setTheme(e.target.value);
    });
});