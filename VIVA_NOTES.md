# Viva Notes - Sorting Algorithm Visualizer & Analyzer

## 1. Problem Solved
Students find it hard to understand internal sorting steps from theory alone.  
This project visualizes each operation and compares practical performance.

## 2. Why Web-Based Approach
- Easy to run on any system with browser
- No JDK or paid software required
- Simple deployment and demo

## 3. Core Components
- `index.html`: UI layout and sections
- `styles.css`: theme, layout, responsive design
- `algorithms.js`: sorting step generation + analysis metrics
- `visualizer.js`: animation engine and counters
- `main.js`: event wiring, validation, export logic

## 4. How Visualization Works
1. Input array is prepared (random/custom).
2. Selected algorithm generates step snapshots.
3. Visualizer renders each step with active indices.
4. Counters update in real-time.
5. Final sorted output is shown and logged.

## 5. Performance Comparison
- `Compare All` runs all algorithms on same input.
- Collects:
  - elapsed runtime
  - comparisons
  - swaps/writes
- Displays result cards with metric bars.

## 6. Complexity Knowledge
- Time complexity shown as best/average/worst.
- Space complexity shown for selected algorithm.
- Helps connect practical run with theoretical analysis.

## 7. Innovation/Advanced Features Included
- Compare-all module
- Theme toggle with persistence
- Value labels on bars
- Export JSON/CSV
- Session snapshot history
- Input validation + feedback messages

## 8. Common Questions and Short Answers
Q: Why Quick Sort worst case is O(n^2)?  
A: Bad pivot choices can create highly unbalanced partitions.

Q: Why Merge Sort uses O(n) extra space?  
A: It needs temporary arrays during merge operations.

Q: Why show swaps and comparisons both?  
A: They explain different costs; fewer comparisons does not always mean fewer writes.

Q: Why keep step mode?  
A: Step mode is best for beginner learning and debugging understanding.

## 9. Limitations
- Runtime measured in browser includes rendering overhead.
- Very large input size can reduce visual clarity.
- Comparison metrics are educational, not benchmark-grade profiling.

## 10. Suggested Closing Line
This project combines theory, visualization, and practical comparison so beginners can understand not only how sorting works, but why one algorithm is chosen over another.

