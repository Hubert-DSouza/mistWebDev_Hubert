

// Dark Mode Logic
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
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
let timerInterval: number | null = null;
let timeLeft = 25 * 60; // 25 minutes
const timerDisplay = document.getElementById('timer') as HTMLDivElement;

const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

document.getElementById('start-btn')?.addEventListener('click', () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval as number);
      timerInterval = null;
      alert("Break time!");
    }
  }, 1000);
});

document.getElementById('pause-btn')?.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

document.getElementById('reset-btn')?.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timeLeft = 25 * 60;
  updateTimer();
});

// Tasks Logic
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLInputElement;

const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));

const renderTasks = () => {
  taskList.innerHTML = '';
  tasks.forEach(task => {
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
    li.querySelector('.toggle-btn')?.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Delete
    li.querySelector('.delete-btn')?.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
};

document.getElementById('add-task-btn')?.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    tasks.push({ id: Date.now(), text: taskInput.value.trim(), completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

renderTasks();

// Subject Progress Logic
interface Subject {
  id: number;
  name: string;
  percent: number;
}

let subjects: Subject[] = JSON.parse(localStorage.getItem('subjects') || '[]');
const subjectInput = document.getElementById('subject-input') as HTMLInputElement;
const percentInput = document.getElementById('percent-input') as HTMLInputElement;
const progressList = document.getElementById('progress-list') as HTMLDivElement;

const saveSubjects = () => localStorage.setItem('subjects', JSON.stringify(subjects));

const renderSubjects = () => {
  progressList.innerHTML = '';
  subjects.forEach(sub => {
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

    div.querySelector('.delete-sub-btn')?.addEventListener('click', () => {
      subjects = subjects.filter(s => s.id !== sub.id);
      saveSubjects();
      renderSubjects();
    });

    progressList.appendChild(div);
  });
};

document.getElementById('add-subject-btn')?.addEventListener('click', () => {
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

const quoteDisplay = document.getElementById('quote-display') as HTMLElement;
const newQuoteBtn = document.createElement('button');
newQuoteBtn.innerText = "New Quote";
newQuoteBtn.style.marginTop = "10px";
newQuoteBtn.style.fontSize = "0.9rem";

// Append button to the quotes section
quoteDisplay.parentElement?.appendChild(newQuoteBtn);

const showRandomQuote = () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerText = `"${random}"`;
};

newQuoteBtn.addEventListener('click', showRandomQuote);
showRandomQuote();
