            // Theme management system
        class ThemeManager {
            constructor() {
                this.currentTheme = this.getStoredTheme() || 'light';
                this.currentTextSize = this.getStoredTextSize() || 'medium'
                this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                
                this.init();
            }

            init() {
                // Apply the current theme
                this.applyTheme(this.currentTheme);
                
                // Set up the form
                this.updateThemeSelector();

                this.applyTextSize(this.currentTextSize);
                this.updateTextSizeSelector();
                
                // Listen for system theme changes
                this.mediaQuery.addEventListener('change', () => {
                    if (this.currentTheme === 'auto') {
                        this.applyTheme('auto');
                    }
                });

                // Listen for theme selector changes
                document.querySelectorAll('input[name="theme"]').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        this.setTheme(e.target.value);
                    });
                });

                document.querySelectorAll('input[name="text-size"]').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        this.setTextSize(e.target.value)
                    });
                });
            }

            getStoredTheme() {
                try {
                    return localStorage.getItem('theme');
                } catch (e) {
                    return null;
                }
            }

            setStoredTheme(theme) {
                try {
                    localStorage.setItem('theme', theme);
                } catch (e) {
                    console.warn('Could not save theme preference');
                }
            }

            getStoredTextSize() {
                try {
                    return localStorage.getItem('text-size');
                } catch (e) {
                    return null;
                }
            }

            setStoredTextSize(size) {
                try {
                    localStorage.setItem('text-size', size);
                } catch (e) {
                    console.warn('Could not save text size preference');
                }
            }

            setTheme(theme) {
                this.currentTheme = theme;
                this.setStoredTheme(theme);
                this.applyTheme(theme);
                this.updateThemeSelector();
            }

            applyTheme(theme) {
                let actualTheme = theme;
        
                if (theme === 'auto') {
                    actualTheme = this.mediaQuery.matches ? 'dark' : 'light';
                }

                // New code to handle stylesheet link
                const stylesheetLink = document.getElementById('theme-stylesheet');
                if (stylesheetLink) {
                    if (actualTheme === 'dark') {
                        stylesheetLink.href = '../styles/dark_theme.css';
                    } else {
                        // Assuming '../styles/light_theme.css' exists
                        stylesheetLink.href = '../styles/light_theme.css'; 
                    }
                }

                if (actualTheme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
            }

            updateThemeSelector() {
                const radio = document.querySelector(`input[name="theme"][value="${this.currentTheme}"]`);
                if (radio) {
                    radio.checked = true;
                    
                    // Update visual selection
                    document.querySelectorAll('.theme-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                    radio.closest('.theme-option').classList.add('selected');
                }
            }

            setTextSize(size) {
                this.currentTextSize = size;
                this.setStoredTextSize(size);
                this.applyTextSize(size);
                this.updateTextSizeSelector();
            }

            applyTextSize(size) {
                let actualSize = size;

                // New code to handle stylesheet link
                const stylesheetLink = document.getElementById('theme-stylesheet');
                if (stylesheetLink) {
                    if (actualSize === 'dark') {
                        stylesheetLink.href = '../styles/dark_theme.css';
                    } else if (actualSize === '') {
                        // Assuming '../styles/light_theme.css' exists
                        stylesheetLink.href = '../styles/light_theme.css'; 
                    }
                }

                if (actualTheme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
            }

            updateTextSizeSelector() {
                const radio = document.querySelector(`input[name="text-size"][value="${this.currentTheme}"]`);
                if (radio) {
                    radio.checked = true;
                    
                    // Update visual selection
                    document.querySelectorAll('.text-size-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                    radio.closest('.text-size-option').classList.add('selected');
                }
            }
        }

        // Initialize theme manager
        const themeManager = new ThemeManager();

        // Save settings function
        function saveSettings() {
            const selectedTheme = document.querySelector('input[name="theme"]:checked');
            const selectedTextSize = document.querySelector('input[name="text-size"]:checked');

            if (selectedTheme) {
                themeManager.setTheme(selectedTheme.value);
            }

            if (selectedTextSize) {
                themeManager.setTextSize(selectedTextSize.value)
            }
            
            // Show feedback
            const button = document.querySelector('.save-button');
            const originalText = button.textContent;
            button.textContent = 'Saved!';
            button.style.background = '#4CAF50';
                
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }

        // Export theme management for other pages
        window.ThemeManager = ThemeManager;

        // Example condition: check if it's currently dark mode
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

const stylesheet = document.getElementById('my-stylesheet');