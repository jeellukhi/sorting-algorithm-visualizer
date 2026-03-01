function cloneArray(arr) {
  return arr.slice();
}

export const ALGORITHM_KEYS = ["bubble", "insertion", "merge", "quick", "heap"];

export const ALGORITHM_LABELS = {
  bubble: "Bubble Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
  heap: "Heap Sort"
};

function makeRecorder(arr) {
  const steps = [];
  const state = { comparisons: 0, swaps: 0 };

  function capture(active = []) {
    steps.push({
      array: arr.slice(),
      active: active.slice(),
      comparisons: state.comparisons,
      swaps: state.swaps
    });
  }

  capture();
  return { steps, state, capture };
}

export function getAlgorithmSteps(algorithm, inputArray) {
  const arr = cloneArray(inputArray);
  switch (algorithm) {
    case "bubble":
      return bubbleSortSteps(arr);
    case "insertion":
      return insertionSortSteps(arr);
    case "merge":
      return mergeSortSteps(arr);
    case "quick":
      return quickSortSteps(arr);
    case "heap":
      return heapSortSteps(arr);
    default:
      return bubbleSortSteps(arr);
  }
}

export function analyzeAlgorithm(algorithm, inputArray) {
  const startedAt = performance.now();
  const steps = getAlgorithmSteps(algorithm, inputArray);
  const endedAt = performance.now();
  const last = steps[steps.length - 1] || {
    array: cloneArray(inputArray),
    comparisons: 0,
    swaps: 0
  };

  return {
    algorithm,
    label: ALGORITHM_LABELS[algorithm] || algorithm,
    timeMs: endedAt - startedAt,
    comparisons: last.comparisons,
    swaps: last.swaps,
    output: last.array
  };
}

function bubbleSortSteps(arr) {
  const { steps, state, capture } = makeRecorder(arr);

  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      state.comparisons += 1;
      capture([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        state.swaps += 1;
        capture([j, j + 1]);
      }
    }
  }

  return steps;
}

function insertionSortSteps(arr) {
  const { steps, state, capture } = makeRecorder(arr);

  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0) {
      state.comparisons += 1;
      capture([j, j + 1]);
      if (arr[j] <= key) {
        break;
      }
      arr[j + 1] = arr[j];
      state.swaps += 1;
      capture([j, j + 1]);
      j -= 1;
    }

    arr[j + 1] = key;
    state.swaps += 1;
    capture([j + 1]);
  }

  return steps;
}

function mergeSortSteps(arr) {
  const { steps, state, capture } = makeRecorder(arr);

  function merge(left, mid, right) {
    const merged = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
      state.comparisons += 1;
      capture([i, j]);
      if (arr[i] <= arr[j]) {
        merged.push(arr[i]);
        i += 1;
      } else {
        merged.push(arr[j]);
        j += 1;
      }
    }

    while (i <= mid) {
      merged.push(arr[i]);
      i += 1;
    }

    while (j <= right) {
      merged.push(arr[j]);
      j += 1;
    }

    for (let k = 0; k < merged.length; k += 1) {
      arr[left + k] = merged[k];
      state.swaps += 1;
      capture([left + k]);
    }
  }

  function sort(left, right) {
    if (left >= right) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  }

  sort(0, arr.length - 1);
  return steps;
}

function quickSortSteps(arr) {
  const { steps, state, capture } = makeRecorder(arr);

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    capture([high]);

    for (let j = low; j < high; j += 1) {
      state.comparisons += 1;
      capture([j, high]);
      if (arr[j] < pivot) {
        i += 1;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          state.swaps += 1;
          capture([i, j]);
        }
      }
    }

    if (i + 1 !== high) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      state.swaps += 1;
      capture([i + 1, high]);
    }
    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    }
  }

  sort(0, arr.length - 1);
  return steps;
}

function heapSortSteps(arr) {
  const { steps, state, capture } = makeRecorder(arr);

  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      state.comparisons += 1;
      capture([largest, left]);
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      state.comparisons += 1;
      capture([largest, right]);
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      state.swaps += 1;
      capture([root, largest]);
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1) {
    heapify(arr.length, i);
  }

  for (let i = arr.length - 1; i > 0; i -= 1) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    state.swaps += 1;
    capture([0, i]);
    heapify(i, 0);
  }

  return steps;
}
