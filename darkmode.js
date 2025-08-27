// Dark mode functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 'system';
    
    // Set initial theme
    setTheme(currentTheme);
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'system';
            let newTheme;
            
            if (currentTheme === 'dark') {
                newTheme = 'light';
            } else if (currentTheme === 'light') {
                newTheme = 'system';
            } else {
                newTheme = prefersDarkScheme.matches ? 'light' : 'dark';
            }
            
            setTheme(newTheme);
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'system') {
            setTheme('system');
        }
    });
    
    function setTheme(theme) {
        const html = document.documentElement;
        const themeIcon = document.querySelector('#theme-toggle i');
        
        // Remove existing theme classes
        html.removeAttribute('data-theme');
        localStorage.removeItem('theme');
        
        if (theme === 'system') {
            // Use system preference
            if (prefersDarkScheme.matches) {
                html.setAttribute('data-theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
            } else {
                html.removeAttribute('data-theme');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
            }
            localStorage.setItem('theme', 'system');
        } else if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
        
        // Update button aria-label
        if (themeToggle) {
            const isDark = html.getAttribute('data-theme') === 'dark';
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }
    
    // Initialize theme based on system preference or saved preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    }
    
    initTheme();
});