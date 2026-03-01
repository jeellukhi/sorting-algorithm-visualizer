import { SortingVisualizer } from "./visualizer.js";
import {
  ALGORITHM_KEYS,
  ALGORITHM_LABELS,
  analyzeAlgorithm
} from "./algorithms.js";

const elements = {
  algorithmSelect: document.getElementById("algorithmSelect"),
  sizeRange: document.getElementById("sizeRange"),
  speedRange: document.getElementById("speedRange"),
  sizeValue: document.getElementById("sizeValue"),
  speedValue: document.getElementById("speedValue"),
  showValuesChk: document.getElementById("showValuesChk"),
  themeToggleChk: document.getElementById("themeToggleChk"),
  customInput: document.getElementById("customInput"),
  applyInputBtn: document.getElementById("applyInputBtn"),
  generateBtn: document.getElementById("generateBtn"),
  runBtn: document.getElementById("runBtn"),
  stepBtn: document.getElementById("stepBtn"),
  compareBtn: document.getElementById("compareBtn"),
  resetBtn: document.getElementById("resetBtn"),
  saveResultBtn: document.getElementById("saveResultBtn"),
  clearSavedBtn: document.getElementById("clearSavedBtn"),
  exportJsonBtn: document.getElementById("exportJsonBtn"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  barContainer: document.getElementById("barContainer"),
  comparisonCount: document.getElementById("comparisonCount"),
  swapCount: document.getElementById("swapCount"),
  elapsedTime: document.getElementById("elapsedTime"),
  statusText: document.getElementById("statusText"),
  algorithmDescription: document.getElementById("algorithmDescription"),
  inputSizeLabel: document.getElementById("inputSizeLabel"),
  spaceComplexity: document.getElementById("spaceComplexity"),
  bestComplexity: document.getElementById("bestComplexity"),
  avgComplexity: document.getElementById("avgComplexity"),
  worstComplexity: document.getElementById("worstComplexity"),
  outputArray: document.getElementById("outputArray"),
  comparisonChart: document.getElementById("comparisonChart"),
  savedCountText: document.getElementById("savedCountText"),
  feedbackText: document.getElementById("feedbackText")
};

const appState = {
  lastRun: null,
  lastComparison: null,
  history: []
};

const MAX_INPUT_VALUES = 150;

const algorithmDescriptions = {
  bubble: "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple but slow for large inputs.",
  insertion: "Insertion Sort builds a sorted portion one element at a time by inserting each new value into its correct position.",
  merge: "Merge Sort divides the array into halves, recursively sorts them, and merges them back. It is efficient and stable.",
  quick: "Quick Sort selects a pivot, partitions smaller/larger elements around it, then recursively sorts partitions. Very fast on average.",
  heap: "Heap Sort first builds a max-heap, then repeatedly extracts the largest element to produce a sorted array."
};

const algorithmComplexities = {
  bubble: {
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
    space: "O(1)"
  },
  insertion: {
    best: "O(n)",
    average: "O(n^2)",
    worst: "O(n^2)",
    space: "O(1)"
  },
  merge: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)"
  },
  quick: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n^2)",
    space: "O(log n)"
  },
  heap: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)"
  }
};

const visualizer = new SortingVisualizer(elements, {
  onComplete: (result) => {
    elements.outputArray.textContent = `Sorted Output: ${result.output.join(", ")}`;
    console.log("Sorted Output:", result.output);
    const algorithm = elements.algorithmSelect.value;
    appState.lastRun = {
      type: "single_run",
      timestamp: new Date().toISOString(),
      algorithm,
      algorithmLabel: ALGORITHM_LABELS[algorithm] || algorithm,
      inputSize: result.input.length,
      input: result.input,
      output: result.output,
      comparisons: result.comparisons,
      swaps: result.swaps,
      elapsedMs: result.elapsedMs
    };
    setFeedback("success", "Sorting completed. You can save or export this result.");
  }
});

function parseCustomInput(rawInput) {
  const tokens = rawInput
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (!tokens.length) {
    return { ok: false, message: "Please enter at least one number." };
  }

  if (tokens.length > MAX_INPUT_VALUES) {
    return {
      ok: false,
      message: `Maximum ${MAX_INPUT_VALUES} values allowed for clear visualization.`
    };
  }

  const values = [];
  for (const token of tokens) {
    const num = Number(token);
    if (!Number.isFinite(num)) {
      return { ok: false, message: `Invalid number: ${token}` };
    }
    values.push(num);
  }

  return { ok: true, values };
}

function syncRangeLabels() {
  elements.sizeValue.textContent = elements.sizeRange.value;
  elements.speedValue.textContent = elements.speedRange.value;
}

function setFeedback(type, message) {
  elements.feedbackText.className = `feedback ${type}`;
  elements.feedbackText.textContent = message;
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  elements.themeToggleChk.checked = theme === "dark";
}

function initTheme() {
  const savedTheme = localStorage.getItem("sorting_theme");
  const preferredDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (preferredDark ? "dark" : "light");
  applyTheme(initialTheme);
}

function updateAlgorithmDescription() {
  const key = elements.algorithmSelect.value;
  elements.algorithmDescription.textContent = algorithmDescriptions[key];
  const complexity = algorithmComplexities[key];
  elements.bestComplexity.textContent = complexity.best;
  elements.avgComplexity.textContent = complexity.average;
  elements.worstComplexity.textContent = complexity.worst;
  elements.spaceComplexity.textContent = complexity.space;
}

function updateInputSizeLabel() {
  elements.inputSizeLabel.textContent = String(visualizer.getArray().length);
}

function toPercent(value, max) {
  if (!max) return 0;
  return Math.max(3, (value / max) * 100);
}

function updateSavedCount() {
  elements.savedCountText.textContent = `Saved snapshots: ${appState.history.length}`;
}

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function getCurrentSnapshot() {
  const candidates = [appState.lastRun, appState.lastComparison].filter(Boolean);
  if (!candidates.length) return null;
  candidates.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return cloneData(candidates[0]);
}

function buildExportObject() {
  const items =
    appState.history.length > 0
      ? cloneData(appState.history)
      : [appState.lastRun, appState.lastComparison].filter(Boolean).map(cloneData);

  return {
    exportedAt: new Date().toISOString(),
    totalItems: items.length,
    items
  };
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

function convertExportToCsv(payload) {
  const header = [
    "recordType",
    "timestamp",
    "algorithm",
    "inputSize",
    "input",
    "output",
    "comparisons",
    "swaps",
    "elapsedMs",
    "metricSource"
  ];
  const rows = [header.join(",")];

  payload.items.forEach((item) => {
    if (item.type === "single_run") {
      const row = [
        "single_run",
        item.timestamp,
        item.algorithmLabel || item.algorithm,
        item.inputSize,
        item.input?.join(" "),
        item.output?.join(" "),
        item.comparisons,
        item.swaps,
        item.elapsedMs,
        "run"
      ];
      rows.push(row.map(csvEscape).join(","));
      return;
    }

    if (item.type === "comparison" && Array.isArray(item.results)) {
      item.results.forEach((result) => {
        const row = [
          "comparison",
          item.timestamp,
          result.label || result.algorithm,
          item.inputSize,
          item.input?.join(" "),
          result.output?.join(" "),
          result.comparisons,
          result.swaps,
          Number(result.timeMs).toFixed(3),
          "compare_all"
        ];
        rows.push(row.map(csvEscape).join(","));
      });
    }
  });

  return rows.join("\n");
}

function renderComparison(results) {
  if (!results.length) {
    elements.comparisonChart.textContent = "No comparison data.";
    return;
  }

  const maxTime = Math.max(...results.map((r) => r.timeMs), 1);
  const maxComparisons = Math.max(...results.map((r) => r.comparisons), 1);
  const maxSwaps = Math.max(...results.map((r) => r.swaps), 1);

  elements.comparisonChart.innerHTML = "";

  results.forEach((result) => {
    const card = document.createElement("div");
    card.className = "comparison-item";

    card.innerHTML = `
      <div class="comparison-title">${result.label}</div>
      <div class="metric-row">
        <span>Time</span>
        <div class="metric-track"><div class="metric-fill metric-time" style="width:${toPercent(result.timeMs, maxTime)}%"></div></div>
        <span>${result.timeMs.toFixed(3)} ms</span>
      </div>
      <div class="metric-row">
        <span>Comparisons</span>
        <div class="metric-track"><div class="metric-fill metric-comp" style="width:${toPercent(result.comparisons, maxComparisons)}%"></div></div>
        <span>${result.comparisons}</span>
      </div>
      <div class="metric-row">
        <span>Swaps/Writes</span>
        <div class="metric-track"><div class="metric-fill metric-swap" style="width:${toPercent(result.swaps, maxSwaps)}%"></div></div>
        <span>${result.swaps}</span>
      </div>
    `;

    elements.comparisonChart.appendChild(card);
  });
}

function clearComparisonView() {
  elements.comparisonChart.textContent = 'Click "Compare All" to generate comparison results.';
}

elements.sizeRange.addEventListener("input", () => {
  syncRangeLabels();
  visualizer.generateArray(Number(elements.sizeRange.value));
  updateInputSizeLabel();
  appState.lastRun = null;
  appState.lastComparison = null;
  clearComparisonView();
  setFeedback("info", "Input size changed. Generate/Run to produce new results.");
});

elements.speedRange.addEventListener("input", syncRangeLabels);
elements.algorithmSelect.addEventListener("change", updateAlgorithmDescription);
elements.themeToggleChk.addEventListener("change", () => {
  const theme = elements.themeToggleChk.checked ? "dark" : "light";
  applyTheme(theme);
  localStorage.setItem("sorting_theme", theme);
});
elements.showValuesChk.addEventListener("change", () => {
  visualizer.refresh();
});

elements.generateBtn.addEventListener("click", () => {
  visualizer.generateArray(Number(elements.sizeRange.value));
  updateInputSizeLabel();
  appState.lastRun = null;
  appState.lastComparison = null;
  clearComparisonView();
  elements.outputArray.textContent = "Generated random input. Run algorithm to see sorted output.";
  setFeedback("success", "Random input generated.");
});

elements.applyInputBtn.addEventListener("click", () => {
  const parsed = parseCustomInput(elements.customInput.value);
  if (!parsed.ok) {
    elements.statusText.textContent = parsed.message;
    setFeedback("error", parsed.message);
    return;
  }

  visualizer.setArray(parsed.values);
  updateInputSizeLabel();
  appState.lastRun = null;
  appState.lastComparison = null;
  clearComparisonView();
  elements.outputArray.textContent = `Input Accepted: ${parsed.values.join(", ")}`;
  elements.statusText.textContent = "Ready";
  setFeedback("success", "Custom input accepted.");
});

elements.customInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    elements.applyInputBtn.click();
  }
});

elements.runBtn.addEventListener("click", () => {
  visualizer.run(
    elements.algorithmSelect.value,
    Number(elements.speedRange.value)
  );
  setFeedback("info", "Sorting started...");
});

elements.stepBtn.addEventListener("click", () => {
  visualizer.nextStep(elements.algorithmSelect.value);
  setFeedback("info", "Step executed.");
});

elements.compareBtn.addEventListener("click", () => {
  const inputArray = visualizer.getArray();
  if (!inputArray.length) {
    elements.statusText.textContent = "No input";
    setFeedback("error", "No input available for comparison.");
    return;
  }

  visualizer.stop("Stopped");
  const results = ALGORITHM_KEYS.map((algorithm) =>
    analyzeAlgorithm(algorithm, inputArray)
  );
  appState.lastComparison = {
    type: "comparison",
    timestamp: new Date().toISOString(),
    inputSize: inputArray.length,
    input: inputArray.slice(),
    results
  };
  renderComparison(results);
  elements.statusText.textContent = "Comparison ready";
  setFeedback("success", "Comparison completed for all algorithms.");
});

elements.saveResultBtn.addEventListener("click", () => {
  const snapshot = getCurrentSnapshot();
  if (!snapshot) {
    elements.statusText.textContent = "No data to save";
    setFeedback("error", "No result available to save yet.");
    return;
  }
  appState.history.push(snapshot);
  updateSavedCount();
  elements.statusText.textContent = "Snapshot saved";
  setFeedback("success", "Snapshot saved in session history.");
});

elements.clearSavedBtn.addEventListener("click", () => {
  appState.history = [];
  updateSavedCount();
  setFeedback("info", "Saved snapshot history cleared.");
});

elements.exportJsonBtn.addEventListener("click", () => {
  const payload = buildExportObject();
  if (!payload.items.length) {
    elements.statusText.textContent = "No data to export";
    setFeedback("error", "No data available for export.");
    return;
  }
  const filename = `sorting-results-${Date.now()}.json`;
  downloadTextFile(filename, JSON.stringify(payload, null, 2), "application/json");
  elements.statusText.textContent = "JSON exported";
  setFeedback("success", "JSON file exported.");
});

elements.exportCsvBtn.addEventListener("click", () => {
  const payload = buildExportObject();
  if (!payload.items.length) {
    elements.statusText.textContent = "No data to export";
    setFeedback("error", "No data available for export.");
    return;
  }
  const csv = convertExportToCsv(payload);
  const filename = `sorting-results-${Date.now()}.csv`;
  downloadTextFile(filename, csv, "text/csv;charset=utf-8");
  elements.statusText.textContent = "CSV exported";
  setFeedback("success", "CSV file exported.");
});

elements.resetBtn.addEventListener("click", () => {
  visualizer.reset();
  updateInputSizeLabel();
  appState.lastRun = null;
  appState.lastComparison = null;
  clearComparisonView();
  elements.outputArray.textContent = "Reset complete. Run algorithm to see sorted output.";
  setFeedback("info", "Visualizer reset.");
});

initTheme();
syncRangeLabels();
updateAlgorithmDescription();
visualizer.generateArray(Number(elements.sizeRange.value));
updateInputSizeLabel();
updateSavedCount();
clearComparisonView();
elements.outputArray.textContent = "Generated random input. Run algorithm to see sorted output.";
setFeedback("info", 'Tip: Enter custom values and click "Use Custom Input".');
