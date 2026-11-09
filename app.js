const $ = id => document.getElementById(id);

// Pomodoro timer
let seconds = 25 * 60;
let tick = null;
let sessions = Number(localStorage.getItem("sm_sessions") || 0);

function showTime() {
  $("timer").textContent =
    String(Math.floor(seconds / 60)).padStart(2, "0") + ":" +
    String(seconds % 60).padStart(2, "0");
  $("sessions").textContent = sessions;
}

$("startTimer").onclick = () => {
  if (tick) return;
  tick = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      showTime();
    } else {
      clearInterval(tick);
      tick = null;
      sessions++;
      localStorage.setItem("sm_sessions", String(sessions));
      seconds = 25 * 60;
      showTime();
      alert("Focus session complete! Take a short break.");
    }
  }, 1000);
};

$("pauseTimer").onclick = () => {
  clearInterval(tick);
  tick = null;
};

$("resetTimer").onclick = () => {
  clearInterval(tick);
  tick = null;
  seconds = 25 * 60;
  showTime();
};

// Task manager
let tasks = JSON.parse(localStorage.getItem("sm_tasks") || "[]");

function renderTasks() {
  const ul = $("taskList");
  ul.replaceChildren();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const label = document.createElement("span");
    const remove = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.style.width = "auto";
    checkbox.onchange = () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
    };

    label.textContent = task.text;
    if (task.done) li.classList.add("done");

    remove.textContent = "Delete";
    remove.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
    };

    li.append(checkbox, label, remove);
    ul.append(li);
  });
}

function saveTasks() {
  localStorage.setItem("sm_tasks", JSON.stringify(tasks));
  renderTasks();
}

$("taskForm").onsubmit = event => {
  event.preventDefault();
  const value = $("taskInput").value.trim();
  if (!value) return;

  tasks.push({ text: value, done: false });
  $("taskInput").value = "";
  saveTasks();
};

// Flashcards
let cards = JSON.parse(localStorage.getItem("sm_cards") || "[]");
let current = 0;

function renderCard() {
  $("cardCount").textContent =
    cards.length + " flashcard" + (cards.length === 1 ? "" : "s");

  if (!cards.length) {
    $("flashQuestion").textContent = "Your flashcards appear here.";
    $("flashAnswer").textContent = "";
    $("flashAnswer").hidden = true;
    return;
  }

  current = (current + cards.length) % cards.length;
  $("flashQuestion").textContent = cards[current].q;
  $("flashAnswer").textContent = cards[current].a;
  $("flashAnswer").hidden = true;
}

$("flashcardForm").onsubmit = event => {
  event.preventDefault();
  const question = $("questionInput").value.trim();
  const answer = $("answerInput").value.trim();
  if (!question || !answer) return;

  cards.push({ q: question, a: answer });
  current = cards.length - 1;
  localStorage.setItem("sm_cards", JSON.stringify(cards));
  $("questionInput").value = "";
  $("answerInput").value = "";
  renderCard();
};

$("showAnswer").onclick = () => {
  if (cards.length) $("flashAnswer").hidden = false;
};

$("nextCard").onclick = () => {
  if (!cards.length) return;
  current = (current + 1) % cards.length;
  renderCard();
};

$("deleteCard").onclick = () => {
  if (!cards.length) return;
  cards.splice(current, 1);
  localStorage.setItem("sm_cards", JSON.stringify(cards));
  renderCard();
};

showTime();
renderTasks();
renderCard();