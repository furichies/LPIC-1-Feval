/* LPIC-1 Test — selector de examen (101/102) + 4 modos + 3 tipos de pregunta. Curso LPIC-1 (Feval). */
const EXAM_BANKS = {
  "101":   { label: "101", full: "LPIC-1 · 101-500", cert: "LPIC-1 101", get: () => (typeof questions_101 !== "undefined" ? questions_101 : []) },
  "102":   { label: "102", full: "LPIC-1 · 102-500", cert: "LPIC-1 102", get: () => (typeof questions_102 !== "undefined" ? questions_102 : []) },
  "lpic1": { label: "LPIC-1", full: "LPIC-1 · 101 + 102", cert: "LPIC-1", get: () => [...(typeof questions_101 !== "undefined" ? questions_101 : []), ...(typeof questions_102 !== "undefined" ? questions_102 : [])] },
};
const EXAM_ORDER = ["101", "102", "lpic1"];
const PRACTICE_SIZE = 20;
const REDUCED_SIZE = 100;

function normalizeText(s) {
  return (s || "").toString().trim().toLowerCase().replace(/\s+/g, " ").replace(/^\/+/, "");
}
function isAnswerCorrect(q, userAns) {
  if (q.type === "text") {
    if (userAns == null || String(userAns).trim() === "") return false;
    return normalizeText(userAns) === normalizeText(q.answer_text);
  }
  if (q.type === "multiple") {
    if (!Array.isArray(userAns)) return false;
    const a = [...userAns].sort((x, y) => x - y);
    const b = [...q.correct].sort((x, y) => x - y);
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  return userAns === q.correct;
}
function correctLabel(q) {
  if (q.type === "text") return q.answer_text;
  if (q.type === "multiple") return q.correct.map((c) => String.fromCharCode(65 + c) + ") " + q.options[c]).join(" · ");
  return String.fromCharCode(65 + q.correct) + ") " + q.options[q.correct];
}
function generateRandomTest(pool, n) {
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

class TestApplication {
  constructor() {
    this.selectedExam = "101";
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.markedQuestions = [];
    this.testMode = "test";
    this.testStarted = false;
    this.testCompleted = false;
    this.initializeElements();
    this.renderExamSelector();
    this.bindEvents();
    this.applyExam("101", false);
    this.loadInitialState();
  }
  pool() { return EXAM_BANKS[this.selectedExam].get(); }

  initializeElements() {
    this.startTestBtn = document.getElementById("startTest");
    this.reducedModeBtn = document.getElementById("reducedMode");
    this.practiceModeBtn = document.getElementById("practiceMode");
    this.customModeBtn = document.getElementById("customMode");
    this.testInterface = document.getElementById("testInterface");
    this.resultsInterface = document.getElementById("resultsInterface");
    this.reviewInterface = document.getElementById("reviewInterface");
    this.currentQuestionSpan = document.getElementById("currentQuestion");
    this.totalQuestionsSpan = document.getElementById("totalQuestions");
    this.progressBar = document.getElementById("progressBar");
    this.questionText = document.getElementById("questionText");
    this.questionMeta = document.getElementById("questionMeta");
    this.questionCategory = document.getElementById("questionCategory");
    this.optionsContainer = document.getElementById("optionsContainer");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.markBtn = document.getElementById("markBtn");
    this.correctAnswersSpan = document.getElementById("correctAnswers");
    this.incorrectAnswersSpan = document.getElementById("incorrectAnswers");
    this.finalScoreSpan = document.getElementById("finalScore");
    this.reviewAnswersBtn = document.getElementById("reviewAnswers");
    this.restartTestBtn = document.getElementById("restartTest");
    this.backToResultsBtn = document.getElementById("backToResults");
    this.reviewContainer = document.getElementById("reviewContainer");
  }

  renderExamSelector() {
    const box = document.getElementById("examSelector");
    box.innerHTML = "";
    EXAM_ORDER.forEach((key) => {
      const cfg = EXAM_BANKS[key];
      const n = cfg.get().length;
      const b = document.createElement("button");
      b.className = "exam-pill text-left border-2 border-gray-200 rounded-lg p-3 hover:border-green-600" + (key === this.selectedExam ? " active" : "");
      b.dataset.exam = key;
      b.innerHTML = `<div class="font-bold">${cfg.label}</div><div class="text-xs opacity-80">${cfg.full}</div><div class="exam-count inline-block mt-2 text-xs font-bold bg-gray-100 text-gray-700 rounded px-2 py-1">${n} preguntas</div>`;
      b.addEventListener("click", () => this.applyExam(key, true));
      box.appendChild(b);
    });
  }

  applyExam(key, reset) {
    this.selectedExam = key;
    document.querySelectorAll(".exam-pill").forEach((el) => el.classList.toggle("active", el.dataset.exam === key));
    const cfg = EXAM_BANKS[key];
    const n = cfg.get().length;
    document.getElementById("totalQuestionsText").textContent = Object.values(EXAM_BANKS).reduce((a, c) => a, 0) || document.getElementById("totalQuestionsText").textContent;
    document.getElementById("totalQuestionsCard").textContent = n;
    document.getElementById("certCard").textContent = cfg.cert;
    document.getElementById("durationCard").textContent = Math.max(10, Math.round((Math.min(n, 120) * 1))) + " min";
    document.getElementById("modeHint").textContent = `Examen ${cfg.full} · ${n} preguntas.`;
    document.getElementById("reducedLabel").textContent = `Modo Reducido (${Math.min(REDUCED_SIZE, n)})`;
    document.getElementById("examBadge").textContent = cfg.label;
    if (reset) this.resetTest(false);
    this.saveExamPref();
  }

  saveExamPref() { try { localStorage.setItem("lpi_selectedExam", this.selectedExam); } catch (e) {} }

  bindEvents() {
    this.startTestBtn.addEventListener("click", () => this.startTest("test"));
    this.reducedModeBtn.addEventListener("click", () => this.startTest("reduced"));
    this.practiceModeBtn.addEventListener("click", () => this.startTest("practice"));
    this.customModeBtn.addEventListener("click", () => this.showCustomModeModal());
    this.prevBtn.addEventListener("click", () => this.previousQuestion());
    this.nextBtn.addEventListener("click", () => this.nextQuestion());
    this.markBtn.addEventListener("click", () => this.toggleMarkQuestion());
    this.reviewAnswersBtn.addEventListener("click", () => this.showReview());
    this.restartTestBtn.addEventListener("click", () => this.resetTest());
    this.backToResultsBtn.addEventListener("click", () => this.showResults());
  }

  loadInitialState() {
    try {
      const pref = localStorage.getItem("lpi_selectedExam");
      if (pref && EXAM_BANKS[pref]) this.applyExam(pref, false);
    } catch (e) {}
    // total global
    const total = ["101", "102"].reduce((a, k) => a + EXAM_BANKS[k].get().length, 0);
    document.getElementById("totalQuestionsText").textContent = total;
    const saved = localStorage.getItem("lpi_testState");
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.testStarted && !state.testCompleted && EXAM_BANKS[state.selectedExam]) {
          this.resumeTest(state);
        }
      } catch (e) { console.warn("estado guardado inválido", e); }
    }
  }

  startTest(mode = "test", customQuestions = null) {
    const pool = this.pool();
    if (!pool.length) { alert("Banco de preguntas vacío para esta selección."); return; }
    this.testMode = mode;
    this.testStarted = true;
    this.testCompleted = false;
    this.currentQuestionIndex = 0;
    this.markedQuestions = [];
    if (mode === "test") this.questions = generateRandomTest(pool, pool.length);
    else if (mode === "reduced") this.questions = generateRandomTest(pool, Math.min(REDUCED_SIZE, pool.length));
    else if (mode === "custom") this.questions = generateRandomTest(pool, Math.min(customQuestions || 50, pool.length));
    else this.questions = generateRandomTest(pool, Math.min(PRACTICE_SIZE, pool.length));
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.showTestInterface();
    this.loadQuestion();
    this.saveState();
    if (window.anime) anime({ targets: this.testInterface, opacity: [0, 1], translateY: [20, 0], duration: 500, easing: "easeOutQuad" });
  }

  showTestInterface() {
    this.testInterface.classList.remove("hidden");
    this.resultsInterface.classList.add("hidden");
    this.reviewInterface.classList.add("hidden");
    this.totalQuestionsSpan.textContent = this.questions.length;
    document.getElementById("examBadge").textContent = EXAM_BANKS[this.selectedExam].label;
    this.updateProgress();
  }

  typeHint(q) {
    if (q.type === "multiple") return ` <span class="font-semibold text-indigo-700">(elige ${q.correct.length})</span>`;
    if (q.type === "text") return ` <span class="font-semibold text-indigo-700">(escribe la respuesta)</span>`;
    return "";
  }

  loadQuestion() {
    const q = this.questions[this.currentQuestionIndex];
    this.hidePracticeFeedback();
    this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
    if (this.questionCategory) this.questionCategory.textContent = `Examen ${q.exam || ""} · Pregunta ${q.id || ""}`;
    this.updateProgress();
    this.questionText.innerHTML = q.question;
    this.questionMeta.innerHTML = this.typeHint(q);
    this.optionsContainer.innerHTML = "";
    if (q.type === "text") {
      const cur = this.userAnswers[this.currentQuestionIndex];
      const wrap = document.createElement("div");
      wrap.innerHTML = `<input id="textAnswer" type="text" autocomplete="off" spellcheck="false" placeholder="Escribe aquí: comando, fichero, valor…" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg" value="${cur != null ? String(cur).replace(/"/g, "&quot;") : ""}">
      ${this.testMode === "practice" ? `<button id="checkTextBtn" class="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Comprobar</button>` : `<p class="text-xs text-gray-500 mt-2">Se corrige al finalizar (insensible a mayúsculas y espacios extra).</p>`}`;
      this.optionsContainer.appendChild(wrap);
      const input = wrap.querySelector("#textAnswer");
      input.addEventListener("input", (e) => { this.userAnswers[this.currentQuestionIndex] = e.target.value; this.saveState(); });
      const chk = wrap.querySelector("#checkTextBtn");
      if (chk) chk.addEventListener("click", () => { this.userAnswers[this.currentQuestionIndex] = input.value; this.saveState(); this.showPracticeFeedback(); });
      setTimeout(() => input.focus(), 50);
    } else if (q.type === "multiple") {
      const cur = Array.isArray(this.userAnswers[this.currentQuestionIndex]) ? this.userAnswers[this.currentQuestionIndex] : [];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-button w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500" + (cur.includes(idx) ? " selected" : "");
        btn.textContent = `${String.fromCharCode(65 + idx)}) ${opt}`;
        btn.addEventListener("click", () => this.toggleMultiOption(idx));
        this.optionsContainer.appendChild(btn);
      });
      if (this.testMode === "practice" && cur.length) this.showPracticeFeedback(true);
    } else {
      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-button w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-indigo-500" + (this.userAnswers[this.currentQuestionIndex] === idx ? " selected" : "");
        btn.textContent = `${String.fromCharCode(65 + idx)}) ${opt}`;
        btn.addEventListener("click", () => this.selectOption(idx));
        this.optionsContainer.appendChild(btn);
      });
      if (this.testMode === "practice" && this.userAnswers[this.currentQuestionIndex] !== null) this.showPracticeFeedback(true);
    }
    this.updateNavigationButtons();
    this.updateMarkButton();
    if (window.anime) {
      anime({ targets: this.questionText, opacity: [0, 1], translateX: [20, 0], duration: 300, easing: "easeOutQuad" });
      anime({ targets: ".option-button, #textAnswer", opacity: [0, 1], translateY: [10, 0], duration: 300, delay: anime.stagger(40), easing: "easeOutQuad" });
    }
  }

  selectOption(i) {
    this.userAnswers[this.currentQuestionIndex] = i;
    this.optionsContainer.querySelectorAll(".option-button").forEach((b, idx) => b.classList.toggle("selected", idx === i));
    this.saveState();
    if (this.testMode === "practice") this.showPracticeFeedback();
  }
  toggleMultiOption(i) {
    let cur = this.userAnswers[this.currentQuestionIndex];
    if (!Array.isArray(cur)) cur = [];
    cur = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i];
    this.userAnswers[this.currentQuestionIndex] = cur;
    this.optionsContainer.querySelectorAll(".option-button").forEach((b, idx) => b.classList.toggle("selected", cur.includes(idx)));
    this.saveState();
    if (this.testMode === "practice") this.showPracticeFeedback();
  }

  showPracticeFeedback(silent) {
    const q = this.questions[this.currentQuestionIndex];
    const ans = this.userAnswers[this.currentQuestionIndex];
    const ok = isAnswerCorrect(q, ans);
    if (q.type === "text") {
      // colorea input
      const input = document.getElementById("textAnswer");
      if (input) { input.classList.remove("ring-2"); input.style.borderColor = ok ? "#059669" : "#dc2626"; input.style.background = ok ? "#ecfdf5" : "#fef2f2"; }
    } else {
      const btns = this.optionsContainer.querySelectorAll(".option-button");
      btns.forEach((b, idx) => {
        b.classList.remove("correct", "incorrect");
        const inCorrect = q.type === "multiple" ? q.correct.includes(idx) : idx === q.correct;
        const inUser = q.type === "multiple" ? (Array.isArray(ans) && ans.includes(idx)) : ans === idx;
        if (inCorrect) b.classList.add("correct");
        else if (inUser && !ok) b.classList.add("incorrect");
      });
    }
    this.showExplanation(q, ok);
  }
  showExplanation(q, ok) {
    let div = document.getElementById("explanation");
    if (!div) {
      div = document.createElement("div");
      div.id = "explanation";
      div.className = "mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200";
      this.questionText.parentNode.appendChild(div);
    }
    div.innerHTML = `<div class="flex items-start space-x-3"><div class="flex-shrink-0"><i class="fas ${ok ? "fa-check-circle text-green-500" : "fa-times-circle text-red-500"} text-xl"></i></div>
    <div class="flex-1"><h4 class="font-semibold text-gray-900 mb-2">${ok ? "¡Correcto!" : "Respuesta incorrecta"}</h4>
    <p class="text-gray-700 mb-1"><strong>Correcta:</strong> ${correctLabel(q).replace(/</g, "&lt;")}</p>
    <p class="text-gray-700 mb-2">${(q.explanation || "").replace(/</g, "&lt;")}</p></div></div>`;
    div.style.display = "block";
    if (window.anime) anime({ targets: div, opacity: [0, 1], translateY: [10, 0], duration: 300, easing: "easeOutQuad" });
  }
  hidePracticeFeedback() {
    const div = document.getElementById("explanation");
    if (div) div.style.display = "none";
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion();
      this.saveState();
    } else this.completeTest();
  }
  previousQuestion() {
    if (this.currentQuestionIndex > 0) { this.currentQuestionIndex--; this.loadQuestion(); this.saveState(); }
  }
  toggleMarkQuestion() {
    const i = this.markedQuestions.indexOf(this.currentQuestionIndex);
    if (i > -1) this.markedQuestions.splice(i, 1); else this.markedQuestions.push(this.currentQuestionIndex);
    this.updateMarkButton();
    this.saveState();
  }
  updateMarkButton() {
    const marked = this.markedQuestions.includes(this.currentQuestionIndex);
    this.markBtn.innerHTML = `<i class="fas fa-flag mr-2"></i>${marked ? "Desmarcar" : "Marcar"}`;
  }
  updateNavigationButtons() {
    this.prevBtn.disabled = this.currentQuestionIndex === 0;
    const last = this.currentQuestionIndex === this.questions.length - 1;
    this.nextBtn.innerHTML = last ? 'Finalizar<i class="fas fa-check ml-2"></i>' : 'Siguiente<i class="fas fa-arrow-right ml-2"></i>';
  }
  updateProgress() {
    this.progressBar.style.width = `${((this.currentQuestionIndex + 1) / Math.max(1, this.questions.length)) * 100}%`;
  }
  completeTest() {
    this.testCompleted = true;
    this.testStarted = false;
    this.calculateResults();
    this.calculateCategoryPerformance();
    this.updateGlobalStats();
    this.showResults();
    this.clearState();
  }
  calculateResults() {
    let ok = 0;
    this.questions.forEach((q, i) => { if (isAnswerCorrect(q, this.userAnswers[i])) ok++; });
    const total = this.questions.length;
    this.results = { correct: ok, incorrect: total - ok, total, score: total ? Math.round((ok / total) * 100) : 0 };
  }
  calculateCategoryPerformance() {
    this.categoryPerformanceForTest = {};
    this.questions.forEach((q, i) => {
      const cat = `"Examen " + (q.exam || this.selectedExam)`;
      if (!this.categoryPerformanceForTest[cat]) this.categoryPerformanceForTest[cat] = { correct: 0, total: 0 };
      this.categoryPerformanceForTest[cat].total++;
      if (isAnswerCorrect(q, this.userAnswers[i])) this.categoryPerformanceForTest[cat].correct++;
    });
  }
  updateGlobalStats() {
    const payload = { score: this.results.score, exam: this.selectedExam, mode: this.testMode, cats: this.categoryPerformanceForTest };
    if (window.statsManager && typeof window.statsManager.updateAfterTest === "function") {
      window.statsManager.updateAfterTest(this.results.score, 0, this.categoryPerformanceForTest, payload);
    } else {
      const saved = localStorage.getItem("lpi_stats");
      let stats = saved ? JSON.parse(saved) : { bestScore: 0, testsCompleted: 0, totalTime: 0, currentStreak: 0, categoryPerformance: {}, testHistory: [], lastTestDate: null };
      stats.testsCompleted++;
      stats.lastTestDate = new Date().toISOString();
      if (this.results.score > stats.bestScore) stats.bestScore = this.results.score;
      stats.currentStreak = this.results.score > 0 ? stats.currentStreak + 1 : 0;
      Object.entries(this.categoryPerformanceForTest || {}).forEach(([c, d]) => {
        if (!stats.categoryPerformance[c]) stats.categoryPerformance[c] = { correct: 0, total: 0 };
        stats.categoryPerformance[c].correct += d.correct;
        stats.categoryPerformance[c].total += d.total;
      });
      stats.testHistory.push({ score: this.results.score, exam: this.selectedExam, mode: this.testMode, date: stats.lastTestDate });
      localStorage.setItem("lpi_stats", JSON.stringify(stats));
    }
  }
  showResults() {
    this.testInterface.classList.add("hidden");
    this.reviewInterface.classList.add("hidden");
    this.resultsInterface.classList.remove("hidden");
    document.getElementById("resultsSubtitle").textContent = `Examen ${EXAM_BANKS[this.selectedExam].full} · Modo ${this.testMode} · ${this.results.total} preguntas`;
    this.correctAnswersSpan.textContent = this.results.correct;
    this.incorrectAnswersSpan.textContent = this.results.incorrect;
    this.finalScoreSpan.textContent = `${this.results.score}%`;
    this.finalScoreSpan.className = "text-3xl font-bold " + (this.results.score >= 80 ? "text-green-600" : this.results.score >= 60 ? "text-yellow-600" : "text-red-600");
    if (window.anime) anime({ targets: this.resultsInterface, opacity: [0, 1], translateY: [20, 0], duration: 500, easing: "easeOutQuad" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  userLabel(q, ans) {
    if (ans == null || (Array.isArray(ans) && !ans.length) || ans === "") return "No respondida";
    if (q.type === "text") return String(ans);
    if (q.type === "multiple") return ans.map((c) => String.fromCharCode(65 + c) + ") " + q.options[c]).join(" · ");
    return String.fromCharCode(65 + ans) + ") " + q.options[ans];
  }
  showReview() {
    this.resultsInterface.classList.add("hidden");
    this.reviewInterface.classList.remove("hidden");
    this.reviewContainer.innerHTML = "";
    this.questions.forEach((q, i) => {
      const ans = this.userAnswers[i];
      const ok = isAnswerCorrect(q, ans);
      const card = document.createElement("div");
      card.className = "mb-6 p-6 bg-gray-50 rounded-lg border-l-4 " + (ok ? "border-green-500" : "border-red-500");
      card.innerHTML = `<h3 class="text-lg font-semibold text-gray-900 mb-2">Pregunta ${i + 1} [${q.type === "text" ? "texto" : q.type === "multiple" ? "múltiple" : "única"} · Ex. ${q.exam || ""}]: ${(q.question || "").replace(/</g, "&lt;")}</h3>
      <p class="text-sm text-gray-600 mb-1">Tu respuesta:</p><p class="font-medium ${ok ? "text-green-700" : "text-red-700"} mb-3">${this.userLabel(q, ans).replace(/</g, "&lt;")}</p>
      ${!ok ? `<p class="text-sm text-gray-600 mb-1">Respuesta correcta:</p><p class="font-medium text-green-700 mb-3">${correctLabel(q).replace(/</g, "&lt;")}</p>` : ""}
      <p class="text-xs text-gray-500">${"Examen " + (q.exam || "")}</p>`;
      this.reviewContainer.appendChild(card);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  resetTest(scroll = true) {
    this.testStarted = false;
    this.testCompleted = false;
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.markedQuestions = [];
    this.questions = [];
    this.testInterface.classList.add("hidden");
    this.resultsInterface.classList.add("hidden");
    this.reviewInterface.classList.add("hidden");
    this.clearState();
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }
  saveState() {
    try {
      localStorage.setItem("lpi_testState", JSON.stringify({
        testStarted: this.testStarted, testCompleted: this.testCompleted, testMode: this.testMode,
        selectedExam: this.selectedExam, currentQuestionIndex: this.currentQuestionIndex,
        userAnswers: this.userAnswers, markedQuestions: this.markedQuestions,
        questions: this.questions, timestamp: Date.now(),
      }));
    } catch (e) {}
  }
  resumeTest(state) {
    if (!confirm("Tienes un test LPI en progreso. ¿Deseas continuar?")) { this.clearState(); return; }
    this.selectedExam = state.selectedExam;
    this.applyExam(this.selectedExam, false);
    this.testStarted = state.testStarted;
    this.testMode = state.testMode;
    this.currentQuestionIndex = state.currentQuestionIndex;
    this.userAnswers = state.userAnswers;
    this.markedQuestions = state.markedQuestions || [];
    this.questions = state.questions;
    this.showTestInterface();
    this.loadQuestion();
  }
  clearState() { localStorage.removeItem("lpi_testState"); }
  showCustomModeModal() {
    const max = this.pool().length;
    const old = document.getElementById("customModeModal");
    if (old) old.remove();
    const modal = document.createElement("div");
    modal.id = "customModeModal";
    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50";
    modal.innerHTML = `<div class="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold text-gray-900"><i class="fas fa-sliders-h mr-2 text-pink-600"></i>Modo Personalizado</h2>
      <button onclick="closeCustomModal()" class="text-gray-500 hover:text-gray-700"><i class="fas fa-times text-xl"></i></button></div>
      <p class="text-sm text-gray-600 mb-4">Examen: <strong>${EXAM_BANKS[this.selectedExam].full}</strong> (máx. ${max})</p>
      <label class="block text-sm font-medium text-gray-700 mb-2">Número de preguntas (1 - ${max})</label>
      <input type="number" id="customQuestionsInput" min="1" max="${max}" value="${Math.min(50, max)}" class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-semibold text-center">
      <input type="range" id="customQuestionsRange" min="1" max="${max}" value="${Math.min(50, max)}" class="w-full mt-3 accent-pink-600">
      <div class="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 my-6 text-sm text-gray-600"><ul class="space-y-1 ml-4 list-disc"><li>20–30: práctica rápida</li><li>50–70: sesión media</li><li>100+: simulacro de examen</li></ul></div>
      <div class="flex space-x-4"><button onclick="startCustomTest()" class="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-6 rounded-lg font-semibold"><i class="fas fa-play mr-2"></i>Comenzar</button>
      <button onclick="closeCustomModal()" class="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold">Cancelar</button></div></div>`;
    document.body.appendChild(modal);
    const input = document.getElementById("customQuestionsInput");
    const range = document.getElementById("customQuestionsRange");
    input.addEventListener("input", (e) => { const v = Math.min(Math.max(parseInt(e.target.value) || 1, 1), max); e.target.value = v; range.value = v; });
    range.addEventListener("input", (e) => { input.value = e.target.value; });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.testApp = new TestApplication();
  const total = ["101", "102"].reduce((a, k) => a + EXAM_BANKS[k].get().length, 0);
  document.getElementById("totalQuestionsText").textContent = total;
  if (window.anime) anime({ targets: ".card-hover", opacity: [0, 1], translateY: [20, 0], duration: 600, delay: anime.stagger(100), easing: "easeOutQuad" });
});
function startCustomTest() {
  const input = document.getElementById("customQuestionsInput");
  const max = window.testApp.pool().length;
  const n = parseInt(input.value) || 50;
  if (n < 1 || n > max) { alert(`Elige un número entre 1 y ${max}`); return; }
  closeCustomModal();
  window.testApp.startTest("custom", n);
}
function closeCustomModal() {
  const modal = document.getElementById("customModeModal");
  if (modal) modal.remove();
}
