// Navigation Buttons
document.addEventListener('DOMContentLoaded', () => {
    // Determine the base path based on the current page's location
    const currentPageFilename = window.location.pathname.split('/').pop();
    const basePath = (currentPageFilename === 'index.html' || currentPageFilename === '') ? '' : '../';

    // Select all the navigation buttons
    const homeBtn = document.querySelector('.home-btn');
    const papersBtn = document.querySelector('.papers-btn');
    const espBtn = document.querySelector('.esp-btn');
    const zigzagBtn = document.querySelector('.zigzag-btn');
    const quizBtn = document.querySelector('.quiz-btn');
    const accountBtn = document.querySelector('.account-btn');
    const settingsBtn = document.querySelector('.settings-btn');
    
    // Debug logging
    console.log('Navigation elements found:', {
        homeBtn: !!homeBtn,
        papersBtn: !!papersBtn,
        espBtn: !!espBtn,
        zigzagBtn: !!zigzagBtn,
        quizBtn: !!quizBtn,
        accountBtn: !!accountBtn,
        settingsBtn: !!settingsBtn
    });

    // Add event listeners to handle navigation with dynamic paths
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = basePath + 'index.html';
        });
    }

    if (papersBtn) {
        papersBtn.addEventListener('click', () => {
            window.location.href = basePath + 'pages/core_papers.html';
        });
    }

    if (espBtn) {
        espBtn.addEventListener('click', () => {
            window.location.href = basePath + 'pages/employer_set_project.html';
        });
    }

    if (zigzagBtn) {
        zigzagBtn.addEventListener('click', () => {
            window.location.href = basePath + 'pages/core_zigzag.html';
        });
    }

    if (quizBtn) {
        quizBtn.addEventListener('click', () => {
            window.location.href = basePath + 'pages/quiz.html';
        });
    }

    if (accountBtn) {
        accountBtn.addEventListener('click', () => {
            window.location.href = basePath + 'pages/sign_in_google.html';
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            window.location.href = basePath + 'pages/settings.html';
        });
    }

    const allButtons = document.querySelectorAll('.navbar-btn');
    allButtons.forEach(button => {
        // Remove the 'active' class from all buttons first
        button.classList.remove('active');

        // Check if the current filename matches the button's intended file
        if (button.classList.contains('home-btn') && currentPageFilename === 'index.html') {
            button.classList.add('active');
        } else if (button.classList.contains('papers-btn') && currentPageFilename === 'core_papers.html') {
            button.classList.add('active');
        } else if (button.classList.contains('esp-btn') && currentPageFilename === 'employer_set_project.html') {
            button.classList.add('active');
        } else if (button.classList.contains('zigzag-btn') && currentPageFilename === 'core_zigzag.html') {
            button.classList.add('active');
        } else if (button.classList.contains('quiz-btn') && currentPageFilename === 'quiz.html') {
            button.classList.add('active');
        } else if (button.classList.contains('account-btn') && currentPageFilename === 'sign_in_google.html') {
            button.classList.add('active');
        } else if (button.classList.contains('settings-btn') && currentPageFilename === 'settings.html') {
            button.classList.add('active');
        }
    });
});