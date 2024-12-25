// main.js

console.log('main.js загружен');

// Определение массива предложений
const offers = [
    {
        id: 1,
        title: "Скидка 10% на услуги по регистрации бизнеса",
        description: "Получите скидку 10% на полный пакет услуг по регистрации вашего бизнеса. Предложение действительно до конца месяца.",
        category: "бизнес",
        applicableTo: ["all", "business"]
    },
    {
        id: 2,
        title: "Консультация бесплатно",
        description: "Получите бесплатную консультацию по вопросам налогообложения для физических лиц.",
        category: "налоги",
        applicableTo: ["all", "individuals"]
    },
    {
        id: 3,
        title: "Скидка 15% на юридические услуги для стартапов",
        description: "Специальное предложение для стартапов: скидка 15% на все юридические услуги.",
        category: "стартапы",
        applicableTo: ["businesses", "startups"]
    },
    {
        id: 4,
        title: "Экспресс-услуги по оформлению документов",
        description: "Оформление документов в течение 24 часов по специальной цене.",
        category: "документы",
        applicableTo: ["all"]
    },
    // Добавьте больше предложений по необходимости
];

// Функция для отображения предложений
function displayPersonalizedOffers(user) {
    const offersList = document.getElementById('offersList');
    if (!offersList) return;

    // Используем предпочтения пользователя для фильтрации предложений
    const userPreferences = user.preferences || {};
    const preferredCategory = userPreferences.category || "all";

    console.log(`Displaying offers for category: ${preferredCategory}`);

    // Фильтрация предложений
    const userOffers = offers.filter(offer => {
        return offer.applicableTo.includes("all") || offer.applicableTo.includes(preferredCategory);
    });

    // Если нет специальных предложений, показать общие
    const finalOffers = userOffers.length > 0 ? userOffers : offers.filter(offer => offer.applicableTo.includes("all"));

    console.log(`Found ${finalOffers.length} offers for the user.`);

    // Очистка текущего списка предложений
    offersList.innerHTML = '';

    // Добавление предложений в DOM
    finalOffers.forEach(offer => {
        const offerCard = document.createElement('div');
        offerCard.classList.add('offer-card');

        const offerTitle = document.createElement('h3');
        offerTitle.textContent = offer.title;

        const offerDescription = document.createElement('p');
        offerDescription.textContent = offer.description;

        const offerCategory = document.createElement('p');
        offerCategory.classList.add('offer-category');
        offerCategory.textContent = `Категория: ${offer.category}`;

        const offerAction = document.createElement('a');
        offerAction.href = "#"; // Можно заменить на соответствующую ссылку или действие
        offerAction.classList.add('offer-action');
        offerAction.textContent = "Подробнее";

        offerCard.appendChild(offerTitle);
        offerCard.appendChild(offerDescription);
        offerCard.appendChild(offerCategory);
        offerCard.appendChild(offerAction);

        offersList.appendChild(offerCard);
    });
}

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

// Объединённый обработчик события DOMContentLoaded
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded событие запущено');

    // Загрузка темы при загрузке страницы
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggleBtn = document.getElementById('themeToggle');
    if (savedTheme === 'dark') {
        themeToggleBtn.textContent = 'Светлая тема';
    } else {
        themeToggleBtn.textContent = 'Тёмная тема';
    }

    // Обработка формы обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            console.log('Submitting contact form:', { name, email, subject, message });

            if (name && email && subject && message) {
                // Создание объекта сообщения
                const contactMessage = {
                    name,
                    email,
                    subject,
                    message,
                    date: new Date().toLocaleString('ru-RU')
                };

                // Получение существующих сообщений из localStorage
                let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

                // Добавление нового сообщения
                messages.push(contactMessage);

                // Сохранение обратно в localStorage
                localStorage.setItem('contactMessages', JSON.stringify(messages));

                console.log('Saved contact messages:', messages);

                // Очистка формы
                contactForm.reset();

                // Показ модального окна уведомления
                const notificationModal = document.getElementById('notificationModal');
                if (notificationModal) {
                    notificationModal.style.display = "block";
                }
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }

    // Закрытие модального окна уведомления
    const notificationModal = document.getElementById('notificationModal');
    const modalClose = document.querySelector('.modal .close');

    if (notificationModal && modalClose) {
        modalClose.onclick = function () {
            notificationModal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == notificationModal) {
                notificationModal.style.display = "none";
            }
        }
    }

    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.trim().toLowerCase();
            const password = document.getElementById('registerPassword').value.trim();
            const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
            const userCategory = document.getElementById('userCategory') ? document.getElementById('userCategory').value : "all"; // Добавлено

            console.log('Registering user:', { name, email, userCategory });

            if (name && email && password && confirmPassword) {
                if (password !== confirmPassword) {
                    alert('Пароли не совпадают.');
                    return;
                }

                // Получение существующих пользователей из localStorage
                let users = JSON.parse(localStorage.getItem('users')) || [];

                console.log('Existing users before registration:', users);

                // Проверка, существует ли уже пользователь с таким email
                const userExists = users.some(user => user.email === email);
                if (userExists) {
                    alert('Пользователь с таким email уже существует.');
                    return;
                }

                // Создание нового пользователя
                const newUser = {
                    name,
                    email,
                    password, // В реальных проектах пароли должны храниться в зашифрованном виде
                    preferences: {
                        category: userCategory
                    }
                };

                // Добавление нового пользователя
                users.push(newUser);

                // Сохранение обратно в localStorage
                localStorage.setItem('users', JSON.stringify(users));

                console.log('Registered users:', users);

                // Очистка формы
                registerForm.reset();

                alert('Регистрация прошла успешно! Теперь вы можете войти в систему.');

                // Перенаправление на страницу входа
                window.location.href = 'login.html';
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }

    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim().toLowerCase();
            const password = document.getElementById('loginPassword').value.trim();

            console.log('Logging in user:', { email });

            if (email && password) {
                // Получение существующих пользователей из localStorage
                let users = JSON.parse(localStorage.getItem('users')) || [];

                console.log('Existing users:', users);

                // Поиск пользователя с соответствующим email и паролем
                const user = users.find(user => user.email === email && user.password === password);

                console.log('Found user:', user);

                if (user) {
                    // Сохранение состояния авторизации
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    console.log('User logged in:', user);

                    // Перенаправление на страницу личного кабинета
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Неверный email или пароль.');
                }
            } else {
                alert('Пожалуйста, заполните все поля формы.');
            }
        });
    }

    // Защита страницы "Личный кабинет"
    const dashboardPage = document.querySelector('.dashboard-section');
    if (dashboardPage) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            // Если пользователь не авторизован, перенаправить на страницу входа
            window.location.href = 'login.html';
        } else {
            // Отображение информации о пользователе
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('displayName').textContent = currentUser.name;
            document.getElementById('displayEmail').textContent = currentUser.email;

            // Вызов функции для отображения персонализированных предложений
            displayPersonalizedOffers(currentUser);
        }

        // Обработка выхода из системы
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            });
        }
    }

    // Обработка формы комментариев
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const commentText = document.getElementById('comment').value.trim();

            if (name && commentText) {
                // Создание нового комментария
                const comment = document.createElement('div');
                comment.classList.add('comment');

                const author = document.createElement('p');
                author.classList.add('comment-author');
                author.textContent = name;

                const date = document.createElement('p');
                date.classList.add('comment-date');
                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('ru-RU');
                date.textContent = `Дата: ${formattedDate}`;

                const text = document.createElement('p');
                text.classList.add('comment-text');
                text.textContent = commentText;

                comment.appendChild(author);
                comment.appendChild(date);
                comment.appendChild(text);

                commentsList.prepend(comment);

                // Очистка формы
                commentForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
    }
});

