/* Estadísticas LPI (clave lpi_stats). */
class StatsManager {
  constructor() {
    this.key = "lpi_stats";
    this.stats = this.load();
    this.renderAll();
  }
  load() {
    try {
      const s = localStorage.getItem(this.key);
      if (s) return JSON.parse(s);
    } catch (e) {}
    return { bestScore: 0, testsCompleted: 0, totalTime: 0, currentStreak: 0, categoryPerformance: {}, testHistory: [], lastTestDate: null };
  }
  save() { try { localStorage.setItem(this.key, JSON.stringify(this.stats)); } catch (e) {} }
  updateAfterTest(score, timeSpent, categoryPerf, extra) {
    this.stats.testsCompleted++;
    this.stats.totalTime += timeSpent || 0;
    this.stats.lastTestDate = new Date().toISOString();
    if (score > this.stats.bestScore) this.stats.bestScore = score;
    this.stats.currentStreak = score > 0 ? this.stats.currentStreak + 1 : 0;
    Object.entries(categoryPerf || {}).forEach(([c, d]) => {
      if (!this.stats.categoryPerformance[c]) this.stats.categoryPerformance[c] = { correct: 0, total: 0 };
      this.stats.categoryPerformance[c].correct += d.correct;
      this.stats.categoryPerformance[c].total += d.total;
    });
    this.stats.testHistory.push({ score, exam: (extra && extra.exam) || "", mode: (extra && extra.mode) || "", date: this.stats.lastTestDate });
    this.save();
  }
  renderAll() {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set("bestScore", (this.stats.bestScore || 0) + "%");
    set("testsCompleted", this.stats.testsCompleted || 0);
    set("avgTime", "—");
    set("currentStreak", this.stats.currentStreak || 0);
    const tbody = document.getElementById("categoryTable");
    if (tbody) {
      tbody.innerHTML = "";
      const entries = Object.entries(this.stats.categoryPerformance || {}).sort((a, b) => b[1].total - a[1].total);
      if (!entries.length) tbody.innerHTML = '<tr><td colspan="3" class="text-center text-gray-500 py-4">Sin datos todavía. Completa un test.</td></tr>';
      entries.slice(0, 30).forEach(([cat, d]) => {
        const pct = d.total ? Math.round((d.correct / d.total) * 100) : 0;
        const tr = document.createElement("tr");
        tr.className = "border-b";
        tr.innerHTML = `<td class="py-2 pr-4">${cat.replace(/</g, "&lt;")}</td><td class="py-2 pr-4">${d.correct}/${d.total}</td><td class="py-2 font-bold ${pct >= 70 ? "text-green-600" : pct >= 50 ? "text-yellow-600" : "text-red-600"}">${pct}%</td>`;
        tbody.appendChild(tr);
      });
    }
    const hist = document.getElementById("historyList");
    if (hist) {
      hist.innerHTML = "";
      const h = (this.stats.testHistory || []).slice(-10).reverse();
      if (!h.length) hist.innerHTML = '<li class="text-gray-500">Sin historial.</li>';
      h.forEach((t) => {
        const li = document.createElement("li");
        li.className = "py-1 border-b text-sm";
        li.textContent = `${new Date(t.date).toLocaleString()} — Examen ${t.exam || "?"} (${t.mode || "?"}) — ${t.score}%`;
        hist.appendChild(li);
      });
    }
  }
}
document.addEventListener("DOMContentLoaded", () => { window.statsManager = new StatsManager(); });
