// Смена темы (светлая/тёмная)
document.getElementById('themeToggle').addEventListener('click', function () {
    let currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        this.textContent = 'Светлая тема';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        this.textContent = 'Тёмная тема';
    }
});

// Загрузка темы при загрузке страницы
window.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggleBtn = document.getElementById('themeToggle');
    if (savedTheme === 'dark') {
        themeToggleBtn.textContent = 'Светлая тема';
    } else {
        themeToggleBtn.textContent = 'Тёмная тема';
    }
});
