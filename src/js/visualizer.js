import { getAlgorithmSteps } from "./algorithms.js";

export class SortingVisualizer {
  constructor(elements, hooks = {}) {
    this.elements = elements;
    this.hooks = hooks;
    this.array = [];
    this.originalArray = [];
    this.steps = [];
    this.stepIndex = 0;
    this.timerId = null;
    this.running = false;
    this.completed = false;
    this.metrics = {
      comparisons: 0,
      swaps: 0,
      elapsedMs: 0,
      status: "Ready"
    };
    this.startTime = 0;
  }

  generateArray(size) {
    this.stop();
    this.completed = false;
    this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 380) + 20);
    this.steps = [];
    this.stepIndex = 0;
    this.updateStats(0, 0, 0, "Ready");
    this.render(this.array, []);
  }

  setArray(values) {
    this.stop();
    this.completed = false;
    this.array = values.slice();
    this.steps = [];
    this.stepIndex = 0;
    this.updateStats(0, 0, 0, "Ready");
    this.render(this.array, []);
  }

  buildSteps(algorithm) {
    this.completed = false;
    this.originalArray = this.array.slice();
    this.steps = getAlgorithmSteps(algorithm, this.array);
    this.stepIndex = 0;
  }

  run(algorithm, speedMs) {
    if (!this.array.length) {
      this.updateStatus("No input");
      return;
    }
    if (this.running) return;
    this.buildSteps(algorithm);
    this.running = true;
    this.startTime = performance.now();
    this.updateStats(0, 0, 0, "Running");
    this.timerId = setInterval(() => {
      if (this.stepIndex >= this.steps.length) {
        this.stop("Completed");
        return;
      }
      this.applyStep(this.steps[this.stepIndex]);
      this.stepIndex += 1;
      if (this.stepIndex >= this.steps.length) {
        this.stop("Completed");
      }
    }, speedMs);
  }

  nextStep(algorithm) {
    if (!this.array.length) {
      this.updateStatus("No input");
      return;
    }
    if (this.running) return;
    if (!this.steps.length || this.stepIndex >= this.steps.length) {
      this.buildSteps(algorithm);
      this.startTime = performance.now();
    }

    if (this.stepIndex < this.steps.length) {
      this.updateStatus("Stepping");
      this.applyStep(this.steps[this.stepIndex]);
      this.stepIndex += 1;
      if (this.stepIndex >= this.steps.length) {
        this.stop("Completed");
      }
    }
  }

  reset() {
    this.stop();
    this.completed = false;
    this.steps = [];
    this.stepIndex = 0;
    this.updateStats(0, 0, 0, "Ready");
    this.render(this.array, []);
  }

  refresh() {
    this.render(this.array, []);
  }

  getArray() {
    return this.array.slice();
  }

  stop(status = "Stopped") {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.running = false;
    this.updateStatus(status);
    if (status === "Completed") {
      this.completed = true;
      const lastArray = this.steps.length
        ? this.steps[this.steps.length - 1].array.slice()
        : this.array.slice();
      this.array = lastArray.slice();
      this.render(this.array, []);
      if (typeof this.hooks.onComplete === "function") {
        this.hooks.onComplete({
          input: this.originalArray.slice(),
          output: lastArray,
          comparisons: this.metrics.comparisons,
          swaps: this.metrics.swaps,
          elapsedMs: this.metrics.elapsedMs,
          steps: this.steps.length
        });
      }
    }
  }

  applyStep(step) {
    const elapsed = Math.floor(performance.now() - this.startTime);
    this.array = step.array.slice();
    this.render(step.array, step.active);
    this.updateStats(step.comparisons, step.swaps, elapsed, "Running");
  }

  updateStats(comparisons, swaps, elapsed, status) {
    this.metrics = {
      comparisons,
      swaps,
      elapsedMs: elapsed,
      status
    };
    this.elements.comparisonCount.textContent = String(comparisons);
    this.elements.swapCount.textContent = String(swaps);
    this.elements.elapsedTime.textContent = `${elapsed} ms`;
    this.updateStatus(status);
  }

  updateStatus(status) {
    this.metrics.status = status;
    this.elements.statusText.textContent = status;
  }

  getMetrics() {
    return { ...this.metrics };
  }

  render(values, activeIndexes) {
    const { barContainer } = this.elements;
    barContainer.innerHTML = "";
    const minVal = Math.min(...values, 0);
    const normalized = values.map((value) => value - minVal + 1);
    const maxVal = Math.max(...normalized, 1);
    const showLabels =
      (!this.elements.showValuesChk || this.elements.showValuesChk.checked) &&
      values.length <= 40;

    values.forEach((value, index) => {
      const bar = document.createElement("div");
      bar.className = "bar";
      if (activeIndexes.includes(index)) {
        bar.classList.add("active");
      }
      if (this.completed && !activeIndexes.length) {
        bar.classList.add("sorted");
      }
      bar.style.height = `${(normalized[index] / maxVal) * 100}%`;
      bar.title = `${value}`;
      if (showLabels) {
        const label = document.createElement("span");
        label.className = "bar-label";
        label.textContent = String(value);
        bar.appendChild(label);
      }
      barContainer.appendChild(bar);
    });
  }
}
