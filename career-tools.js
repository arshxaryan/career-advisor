(function () {
  "use strict";

  const DATA = window.CAREERCOMPASS_DATA;
  const QUIZ_RESULT_KEY = "careercompass_interest_quiz_result";
  const SAVED_CAREERS_KEY = "careercompass_saved_careers";
  const QUIZ_OPTIONS = [
    ["Not really me", 1],
    ["A little like me", 2],
    ["Somewhat like me", 3],
    ["A lot like me", 4],
    ["Very much like me", 5]
  ];
  let currentQuestion = 0;
  let answers = [];
  let lastScores = null;
  let activeCareerId = null;

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function fieldFor(id) {
    return DATA.fields.find(field => field.id === id);
  }

  function readSavedQuiz() {
    try {
      const saved = JSON.parse(localStorage.getItem(QUIZ_RESULT_KEY) || "null");
      return saved && saved.scores && Array.isArray(saved.topFields) ? saved : null;
    } catch (error) {
      console.error("Could not read the saved career quiz result:", error);
      return null;
    }
  }

  function initialize() {
    if (!DATA || !Array.isArray(DATA.questions) || !Array.isArray(DATA.careers)) {
      document.getElementById("careerExplorerStatus").textContent = "Career information could not be loaded. Refresh the page to try again.";
      document.getElementById("quizQuestion").textContent = "The quiz could not be loaded. Refresh the page to try again.";
      return;
    }
    if (DATA.questions.length !== 15) {
      console.error("Career quiz data must contain exactly 15 questions.");
      document.getElementById("quizQuestion").textContent = "The quiz is temporarily unavailable.";
      return;
    }
    answers = Array(DATA.questions.length).fill(null);
    const fieldFilter = document.getElementById("careerFieldFilter");
    DATA.fields.forEach(field => fieldFilter.add(new Option(field.name, field.id)));
    populateComparisonSelects();
    renderQuizQuestion();
    renderCareerExplorer();
    renderSavedCareers();
    const saved = readSavedQuiz();
    if (saved) {
      lastScores = saved.scores;
      renderSavedQuizLink(saved);
    }
    document.getElementById("compareCareerOne").addEventListener("change", renderCareerComparison);
    document.getElementById("compareCareerTwo").addEventListener("change", renderCareerComparison);
    document.addEventListener("keydown", onKeyDown);
  }

  function renderQuizQuestion() {
    const question = DATA.questions[currentQuestion];
    const selected = answers[currentQuestion];
    const prompt = document.getElementById("quizQuestion");
    prompt.innerHTML = `
      <p class="quiz-question-count">QUESTION ${String(currentQuestion + 1).padStart(2, "0")}</p>
      <h3>${escapeHtml(question.prompt)}</h3>
      <div class="quiz-options" role="radiogroup" aria-label="Choose how much this sounds like you">
        ${QUIZ_OPTIONS.map(([label, score]) => `
          <button type="button" role="radio" aria-checked="${selected === score}" class="quiz-option ${selected === score ? "selected" : ""}" data-score="${score}" onclick="selectQuizAnswer(${score})">
            <span class="quiz-option-number">${score}</span><span>${escapeHtml(label)}</span>
          </button>`).join("")}
      </div>
      <p class="quiz-scale-hint"><span>Not really me</span><span>Very much like me</span></p>`;
    const progress = document.querySelector(".quiz-progress-track");
    progress.setAttribute("aria-valuenow", String(currentQuestion + (selected ? 1 : 0)));
    document.getElementById("quizProgressFill").style.width = `${(currentQuestion + (selected ? 1 : 0)) / DATA.questions.length * 100}%`;
    document.getElementById("quizStepLabel").textContent = `Question ${currentQuestion + 1} of ${DATA.questions.length}`;
    document.getElementById("quizBack").disabled = currentQuestion === 0;
    document.getElementById("quizNext").textContent = currentQuestion === DATA.questions.length - 1 ? "See my results ✨" : "Next →";
    document.getElementById("quizNext").disabled = selected === null;
  }

  function selectQuizAnswer(score) {
    answers[currentQuestion] = score;
    renderQuizQuestion();
  }

  function moveQuiz(direction) {
    if (direction > 0 && answers[currentQuestion] === null) return;
    if (currentQuestion + direction < 0) return;
    if (currentQuestion + direction >= DATA.questions.length) {
      finishQuiz();
      return;
    }
    currentQuestion += direction;
    renderQuizQuestion();
  }

  function calculateScores() {
    const totals = Object.fromEntries(DATA.fields.map(field => [field.id, { score: 0, questions: 0 }]));
    DATA.questions.forEach((question, index) => {
      totals[question.field].score += answers[index] || 0;
      totals[question.field].questions++;
    });
    return Object.fromEntries(DATA.fields.map(field => {
      const result = totals[field.id];
      return [field.id, result.questions ? Math.round(result.score / (result.questions * 5) * 100) : 0];
    }));
  }

  function getTopFields(scores) {
    return DATA.fields.map(field => ({ ...field, score: scores[field.id] }))
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .slice(0, 3);
  }

  function finishQuiz() {
    const scores = calculateScores();
    const topFields = getTopFields(scores);
    const result = { scores, topFields: topFields.map(field => field.id), completedAt: Date.now() };
    lastScores = scores;
    try {
      localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result));
    } catch (error) {
      console.error("Could not save the career quiz result:", error);
    }
    renderQuizResults(result);
  }

  function renderQuizResults(result) {
    const topFields = result.topFields.map(id => ({ ...fieldFor(id), score: result.scores[id] }));
    const maximum = Math.max(100, ...DATA.fields.map(field => result.scores[field.id]));
    const results = document.getElementById("quizResults");
    results.innerHTML = `
      <div class="quiz-result-heading"><div><span class="mono-label">YOUR INTEREST SNAPSHOT</span><h3>Three directions to explore</h3></div><button type="button" class="mini-action-btn" onclick="shareQuizResult()">↗ Share result</button></div>
      <div class="quiz-top-fields">${topFields.map((field, index) => `
        <article class="quiz-match-card" style="--field-color:${field.color}">
          <div class="quiz-match-top"><span class="field-badge">${escapeHtml(field.name)}</span><strong>${field.score}% match</strong></div>
          <h4>${escapeHtml(field.name)}</h4><p>${escapeHtml(field.reason)}</p>
          <button type="button" class="btn" onclick="exploreQuizField('${field.id}')">Explore careers in this field →</button>
        </article>`).join("")}</div>
      <section class="quiz-score-chart"><div class="exam-section-heading"><div><span class="mono-label">YOUR INTEREST MIX</span><h4>Scores across all areas</h4></div><span class="feature-caption">A starting point, not a label</span></div>
        <div class="quiz-score-bars">${DATA.fields.map(field => `
          <div class="quiz-score-row"><span>${escapeHtml(field.name)}</span><div class="quiz-score-track"><i style="width:${result.scores[field.id] / maximum * 100}%;--field-color:${field.color}"></i></div><strong>${result.scores[field.id]}%</strong></div>`).join("")}
        </div>
      </section>
      <div class="quiz-result-actions"><button type="button" class="btn btn-ghost" onclick="retakeQuiz()">↺ Retake quiz</button><p class="feature-caption">Saved on this device for your next visit.</p></div>`;
    results.classList.add("show");
    document.getElementById("quizQuestion").hidden = true;
    document.querySelector(".quiz-actions").hidden = true;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderSavedQuizLink(result) {
    const top = result.topFields.map(id => fieldFor(id)?.name).filter(Boolean).join(", ");
    document.getElementById("savedQuizResult").innerHTML = `<p>You have a saved quiz result: <strong>${escapeHtml(top)}</strong>.</p><button type="button" class="text-link-btn" onclick="showSavedQuizResult()">View saved result</button>`;
  }

  function showSavedQuizResult() {
    const result = readSavedQuiz();
    if (result) renderQuizResults(result);
  }

  function retakeQuiz() {
    currentQuestion = 0;
    answers = Array(DATA.questions.length).fill(null);
    document.getElementById("quizResults").classList.remove("show");
    document.getElementById("quizResults").innerHTML = "";
    document.getElementById("quizQuestion").hidden = false;
    document.querySelector(".quiz-actions").hidden = false;
    renderQuizQuestion();
    document.getElementById("quiz-page").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function shareQuizResult() {
    const result = readSavedQuiz();
    if (!result) {
      document.getElementById("quizResults").insertAdjacentHTML("afterbegin", '<p class="career-action-message">Complete the quiz to share your result.</p>');
      return;
    }
    const summary = `My CareerCompass interest quiz top matches: ${result.topFields.map(id => `${fieldFor(id).name} (${result.scores[id]}%)`).join(", ")}. Explore your own interests with CareerCompass.`;
    try {
      await navigator.clipboard.writeText(summary);
      document.querySelector(".quiz-result-heading").insertAdjacentHTML("beforeend", '<span class="career-copy-status" role="status">Copied!</span>');
    } catch (error) {
      console.error("Could not copy quiz result:", error);
      document.querySelector(".quiz-result-heading").insertAdjacentHTML("beforeend", `<span class="career-copy-status" role="status">Clipboard unavailable. Copy this summary: ${escapeHtml(summary)}</span>`);
    }
  }

  function exploreQuizField(fieldId) {
    switchAppPage("explorer");
    document.getElementById("careerFieldFilter").value = fieldId;
    renderCareerExplorer();
    document.getElementById("careerGrid").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderCareerExplorer() {
    const grid = document.getElementById("careerGrid");
    if (!grid) return;
    const search = document.getElementById("careerSearch").value.trim().toLowerCase();
    const field = document.getElementById("careerFieldFilter").value;
    const stream = document.getElementById("careerStreamFilter").value;
    const careers = DATA.careers.filter(career => {
      const text = `${career.title} ${career.overview} ${fieldFor(career.field).name}`.toLowerCase();
      return (!search || text.includes(search)) &&
        (field === "all" || career.field === field) &&
        (stream === "all" || (stream === "Any" ? career.streams.includes("Any") : career.streams.includes(stream) || career.streams.includes("Any")));
    });
    document.getElementById("careerExplorerStatus").textContent = careers.length
      ? `${careers.length} career${careers.length === 1 ? "" : "s"} to explore`
      : "No careers match those filters. Try another search or stream.";
    grid.innerHTML = careers.length ? careers.map(career => {
      const fieldData = fieldFor(career.field);
      return `<button type="button" class="career-card" onclick="openCareerDetails('${career.id}')">
        <span class="field-badge" style="--field-color:${fieldData.color}">${escapeHtml(fieldData.name)}</span>
        <span class="career-card-save" aria-hidden="true">${isCareerSaved(career.id) ? "♥" : "♡"}</span>
        <strong>${escapeHtml(career.title)}</strong><span>${escapeHtml(career.overview)}</span>
        <span class="career-card-meta"><small>Demand: ${escapeHtml(career.demand)}</small><small>${escapeHtml(career.studyYears)}</small></span>
      </button>`;
    }).join("") : '<div class="career-empty-state"><span>🧭</span><strong>No career paths found yet.</strong><p>Try a different word or clear one of the filters.</p></div>';
  }

  function isCareerSaved(id) {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVED_CAREERS_KEY) || "[]");
      return Array.isArray(saved) && saved.includes(id);
    } catch (error) {
      console.error("Could not read saved careers:", error);
      return false;
    }
  }

  function getSavedCareerIds() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVED_CAREERS_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter(id => DATA.careers.some(career => career.id === id)) : [];
    } catch (error) {
      console.error("Could not read saved careers:", error);
      return [];
    }
  }

  function toggleSavedCareer(id) {
    try {
      const saved = getSavedCareerIds();
      const updated = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
      localStorage.setItem(SAVED_CAREERS_KEY, JSON.stringify(updated));
      renderCareerExplorer();
      renderSavedCareers();
      if (activeCareerId === id) updateCareerModalSaveButton(id);
    } catch (error) {
      console.error("Could not save career:", error);
      const status = document.getElementById("careerModalStatus");
      if (status) status.textContent = "Could not save this career in your browser.";
    }
  }

  function renderSavedCareers() {
    const list = document.getElementById("savedCareerList");
    if (!list) return;
    const saved = getSavedCareerIds().map(id => DATA.careers.find(career => career.id === id));
    document.getElementById("savedCareerCount").textContent = String(saved.length);
    list.innerHTML = saved.length ? saved.map(career => `
      <div class="saved-career-row"><button type="button" class="saved-career-open" onclick="openCareerDetails('${career.id}')">♥ ${escapeHtml(career.title)}<small>${escapeHtml(fieldFor(career.field).name)}</small></button><button type="button" class="mini-action-btn" aria-label="Remove ${escapeHtml(career.title)} from saved careers" onclick="toggleSavedCareer('${career.id}')">Remove</button></div>
    `).join("") : '<div class="career-empty-state saved-empty"><span>♡</span><strong>No saved careers yet.</strong><p>Tap the heart on a career that you want to come back to.</p></div>';
  }

  function openCareerDetails(id) {
    const career = DATA.careers.find(item => item.id === id);
    if (!career) return;
    activeCareerId = id;
    const field = fieldFor(career.field);
    const examLinks = career.exams.map(exam => exam.examId
      ? `<button type="button" class="exam-career-link" onclick="openRelatedExam('${exam.examId}')">${escapeHtml(exam.name)} ↗</button>`
      : `<span class="exam-career-label">${escapeHtml(exam.name)}</span>`).join("");
    const list = items => `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    document.getElementById("careerModalContent").innerHTML = `
      <div class="career-modal-head"><span class="field-badge" style="--field-color:${field.color}">${escapeHtml(field.name)}</span><button type="button" id="careerModalSave" class="career-heart ${isCareerSaved(id) ? "saved" : ""}" aria-label="${isCareerSaved(id) ? "Remove from" : "Save"} saved careers" aria-pressed="${isCareerSaved(id)}" onclick="toggleSavedCareer('${id}')">${isCareerSaved(id) ? "♥" : "♡"} Save career</button></div>
      <h2 id="careerModalTitle">${escapeHtml(career.title)}</h2><p class="career-modal-overview">${escapeHtml(career.overview)}</p>
      <div class="career-detail-grid">
        <section class="career-detail-block wide"><h3>🗓️ What the work looks like</h3><p>${escapeHtml(career.dayToDay)}</p></section>
        <section class="career-detail-block"><h3>🛠️ Technical skills</h3>${list(career.technicalSkills)}</section>
        <section class="career-detail-block"><h3>🤝 People skills</h3>${list(career.softSkills)}</section>
        <section class="career-detail-block"><h3>📘 After Class 10</h3><p>${escapeHtml(career.after10th)}</p></section>
        <section class="career-detail-block"><h3>🎓 After Class 12</h3><p>${escapeHtml(career.after12th)}</p></section>
        <section class="career-detail-block"><h3>📝 Entrance exams</h3><div class="exam-career-links">${examLinks || "<span>Check the course and institute requirements.</span>"}</div></section>
        <section class="career-detail-block"><h3>💸 Typical pay in India</h3><p><strong>Entry level:</strong> ${escapeHtml(career.salaryEntry)}<br><strong>Experienced:</strong> ${escapeHtml(career.salaryExperienced)}</p><p class="career-detail-note">Salary and details are approximate. Verify with official sources.</p></section>
        <section class="career-detail-block"><h3>🏫 Institutes to explore</h3>${list(career.colleges)}</section>
        <section class="career-detail-block"><h3>🔭 Future scope</h3><p>${escapeHtml(career.scope)}</p><span class="demand-badge demand-${career.demand.toLowerCase()}">Demand: ${escapeHtml(career.demand)}</span></section>
        <section class="career-detail-block"><h3>✅ Potential upsides</h3>${list(career.pros)}</section>
        <section class="career-detail-block"><h3>⚖️ Things to consider</h3>${list(career.cons)}</section>
        <section class="career-detail-block"><h3>📌 Quick comparison facts</h3><p><strong>Typical study:</strong> ${escapeHtml(career.studyYears)}<br><strong>Preparation:</strong> ${escapeHtml(career.difficulty)}</p></section>
      </div><p id="careerModalStatus" class="career-action-message" aria-live="polite"></p>`;
    const modal = document.getElementById("careerModal");
    modal.hidden = false;
    document.body.classList.add("career-modal-open");
    document.getElementById("careerModalClose").focus();
  }

  function updateCareerModalSaveButton(id) {
    const button = document.getElementById("careerModalSave");
    if (!button) return;
    const saved = isCareerSaved(id);
    button.classList.toggle("saved", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", `${saved ? "Remove from" : "Save"} saved careers`);
    button.innerHTML = `${saved ? "♥" : "♡"} Save career`;
  }

  function closeCareerModal() {
    document.getElementById("careerModal").hidden = true;
    document.body.classList.remove("career-modal-open");
    activeCareerId = null;
  }

  function onKeyDown(event) {
    if (event.key === "Escape" && !document.getElementById("careerModal").hidden) closeCareerModal();
  }

  function openRelatedExam(examId) {
    closeCareerModal();
    switchAppPage("exams");
    window.setTimeout(() => {
      const select = document.getElementById("studyPlanExam");
      if (select && [...select.options].some(option => option.value === examId)) select.value = examId;
      if (typeof showExamDetail === "function") showExamDetail(examId);
      document.getElementById("examDetail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function populateComparisonSelects() {
    const options = DATA.careers.map(career => new Option(career.title, career.id));
    ["compareCareerOne", "compareCareerTwo"].forEach((id, index) => {
      const select = document.getElementById(id);
      select.add(new Option("Choose a career…", ""));
      options.forEach(option => select.add(new Option(option.text, option.value)));
      select.value = DATA.careers[index]?.id || "";
    });
    renderCareerComparison();
  }

  function renderCareerComparison() {
    const firstId = document.getElementById("compareCareerOne").value;
    const secondId = document.getElementById("compareCareerTwo").value;
    const output = document.getElementById("careerComparison");
    if (!firstId || !secondId || firstId === secondId) {
      output.innerHTML = '<p class="career-empty-state"><strong>Choose two different careers</strong><span>Select two roles above to compare them side by side.</span></p>';
      return;
    }
    const careers = [firstId, secondId].map(id => DATA.careers.find(career => career.id === id));
    const rows = [
      ["Field", career => fieldFor(career.field).name],
      ["Typical study length", career => career.studyYears],
      ["Preparation difficulty", career => career.difficulty],
      ["Job demand", career => career.demand],
      ["Entry-level pay", career => career.salaryEntry],
      ["Experienced pay", career => career.salaryExperienced]
    ];
    output.innerHTML = `<div class="career-comparison-table" role="table" aria-label="Career comparison"><div class="comparison-heading" role="row"><span role="columnheader">Compare</span>${careers.map(career => `<strong role="columnheader">${escapeHtml(career.title)}</strong>`).join("")}</div>${rows.map(([label, value]) => `<div class="comparison-row" role="row"><span role="rowheader">${label}</span>${careers.map(career => `<span role="cell">${escapeHtml(value(career))}</span>`).join("")}</div>`).join("")}</div><p class="career-detail-note">Salary and details are approximate. Verify with official sources.</p>`;
  }

  window.selectQuizAnswer = selectQuizAnswer;
  window.moveQuiz = moveQuiz;
  window.shareQuizResult = shareQuizResult;
  window.retakeQuiz = retakeQuiz;
  window.showSavedQuizResult = showSavedQuizResult;
  window.exploreQuizField = exploreQuizField;
  window.renderCareerExplorer = renderCareerExplorer;
  window.openCareerDetails = openCareerDetails;
  window.toggleSavedCareer = toggleSavedCareer;
  window.openRelatedExam = openRelatedExam;
  window.closeCareerModal = closeCareerModal;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
