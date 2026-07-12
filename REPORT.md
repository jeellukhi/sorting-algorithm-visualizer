# Project Report
## Sorting Algorithm Visualizer & Analyzer

## 1. Student Information
- Student Name: `<Your Name>`
- Roll Number: `<Your Roll Number>`
- Course/Department: `<Your Course/Department>`
- Institute: `<Your College Name>`
- Guide/Faculty: `<Faculty Name>`
- Academic Year: `<Year>`

## 2. Problem Statement
Understanding sorting algorithms is difficult for beginners because theoretical complexity alone does not explain internal execution.  
This project provides an interactive visual and analytical platform to demonstrate how sorting algorithms work step-by-step and how their performance differs with input size.

## 3. Objectives
- Visualize internal working of common sorting algorithms.
- Support step-by-step and automatic animation mode.
- Compare algorithms using practical performance metrics.
- Show complexity information (time and space).
- Provide exportable results for analysis and reporting.

## 4. Scope
The system supports educational demonstration and learning-focused analysis for:
- Bubble Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

## 5. Technology Stack
- Frontend: HTML5, CSS3, JavaScript (ES Modules)
- Runtime: Browser
- Local Server: Python built-in HTTP server
- Development Tool: Visual Studio Code
- Versioning (optional): Git

## 6. System Architecture
The project follows a modular client-side architecture:

1. UI Layer (`index.html`)
- Controls
- Visualization panel
- Metrics and analysis panels
- Export actions

2. Presentation Layer (`styles.css`)
- Layout
- Themes (light/dark)
- Color coding for states

3. Logic Layer (`main.js`, `visualizer.js`, `algorithms.js`)
- User input handling
- Sorting step generation
- Animation engine
- Metrics tracking
- Comparison and export logic

## 7. Module Description

### 7.1 Input & Control Module
- Algorithm selection
- Input size and speed control
- Custom input parsing and validation
- Run, step, compare, reset, export actions

### 7.2 Sorting Engine Module
- Generates operation steps for each algorithm
- Tracks comparisons and swaps/writes
- Supports multiple algorithms using common output format

### 7.3 Visualization Module
- Renders bars and active comparisons
- Displays labels on bars
- Marks final sorted state
- Supports step mode and full-run mode

### 7.4 Analysis Module
- Displays best/average/worst time complexity
- Displays space complexity
- Compare-all metrics on same input

### 7.5 Export Module
- Save snapshots in session
- Export results to JSON and CSV

## 8. Algorithm Complexity Table
| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Insertion Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n^2) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

## 9. Implemented Features

### Core Features
- Multiple sorting algorithms
- Step-by-step visualization
- Input size selection
- Time/performance analysis
- Console + visual output
- Algorithm selection panel

### Advanced Features
- Real-time performance comparison
- Speed control
- Graphical comparison cards/bars
- Swap and comparison counters
- Color-coded visualization

### Bonus Features
- Space complexity display
- Custom input support
- Algorithm description panel
- Dark/Light theme toggle
- Web-based implementation
- Save & export results (JSON/CSV)

## 10. Input Validation
- Rejects empty input
- Rejects non-numeric values
- Limits custom input size for visual clarity
- Shows user feedback messages (info/success/error)

## 11. Testing Summary

### Functional Checks
- Random input generation works
- Custom input parsing works
- All five algorithms execute
- Step mode and auto mode both work
- Compare-all panel displays all algorithms
- Complexity panel updates with selection
- Theme persistence works after reload
- Export buttons generate valid files

### UI/UX Checks
- Responsive layout
- Label visibility control
- Beginner-friendly legend and descriptions

## 12. How to Run
```powershell
cd <your-project-folder>
python -m http.server 5500
```
Open `http://localhost:5500` in browser.

## 13. Output Screens (To Attach)
Add screenshots in report/appendix for:
- Home interface
- Step-by-step mode
- Compare-all results
- Complexity panel
- Dark theme
- Export operation

## 14. Conclusion
The project successfully bridges the gap between theoretical and practical understanding of sorting algorithms.  
By combining visualization, live metrics, and algorithm comparison, the system improves conceptual clarity for beginners and supports demonstration-oriented academic use.

## 15. Future Scope
- Add more algorithms (Selection, Shell, Radix, Counting)
- Add benchmark mode without animation overhead
- Export comparison chart as image/PDF
- Persist history using local storage or backend
- Add quiz mode for interactive learning

## 16. References
- Standard DSA textbooks and lecture materials
- MDN Web Docs (JavaScript, DOM APIs, CSS)
- Python documentation (simple HTTP server)

