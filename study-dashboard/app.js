var _a, _b, _c, _d, _e, _f;
// Dark Mode Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeToggle.innerText = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerText = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});
// Pomodoro Logic
let timerInterval = null;
let timeLeft = 25 * 60; // 25 minutes
const timerDisplay = document.getElementById('timer');
const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
(_a = document.getElementById('start-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    if (timerInterval)
        return;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Break time!");
        }
    }, 1000);
});
(_b = document.getElementById('pause-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});
(_c = document.getElementById('reset-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeLeft = 25 * 60;
    updateTimer();
});
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        var _a, _b;
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="toggle-btn">✓</button>
        <button class="delete-btn">X</button>
      </div>
    `;
        // Toggle
        (_a = li.querySelector('.toggle-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });
        // Delete
        (_b = li.querySelector('.delete-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });
        taskList.appendChild(li);
    });
};
(_d = document.getElementById('add-task-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
    if (taskInput.value.trim()) {
        tasks.push({ id: Date.now(), text: taskInput.value.trim(), completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
});
renderTasks();
let subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
const subjectInput = document.getElementById('subject-input');
const percentInput = document.getElementById('percent-input');
const progressList = document.getElementById('progress-list');
const saveSubjects = () => localStorage.setItem('subjects', JSON.stringify(subjects));
const renderSubjects = () => {
    progressList.innerHTML = '';
    subjects.forEach(sub => {
        var _a;
        const div = document.createElement('div');
        div.className = 'progress-item';
        div.innerHTML = `
      <div class="progress-header">
        <span>${sub.name}</span>
        <span>${sub.percent}% <button class="delete-sub-btn" style="padding:2px 6px; margin-left:5px; font-size:0.8rem">X</button></span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${sub.percent}%"></div>
      </div>
    `;
        (_a = div.querySelector('.delete-sub-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            subjects = subjects.filter(s => s.id !== sub.id);
            saveSubjects();
            renderSubjects();
        });
        progressList.appendChild(div);
    });
};
(_e = document.getElementById('add-subject-btn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
    const name = subjectInput.value.trim();
    const percent = parseInt(percentInput.value);
    if (name && !isNaN(percent)) {
        subjects.push({ id: Date.now(), name, percent: Math.min(100, Math.max(0, percent)) });
        subjectInput.value = '';
        percentInput.value = '';
        saveSubjects();
        renderSubjects();
    }
});
renderSubjects();
// Quotes
const quotes = [
    "The secret of getting ahead is getting started.",
    "It always seems impossible until it's done.",
    "Don't watch the clock; do what it does. Keep going.",
    "Quality is not an act, it is a habit.",
    "Believe you can and you're halfway there."
];
const quoteDisplay = document.getElementById('quote-display');
const newQuoteBtn = document.createElement('button');
newQuoteBtn.innerText = "New Quote";
newQuoteBtn.style.marginTop = "10px";
newQuoteBtn.style.fontSize = "0.9rem";
// Append button to the quotes section
(_f = quoteDisplay.parentElement) === null || _f === void 0 ? void 0 : _f.appendChild(newQuoteBtn);
const showRandomQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerText = `"${random}"`;
};
newQuoteBtn.addEventListener('click', showRandomQuote);
showRandomQuote();
