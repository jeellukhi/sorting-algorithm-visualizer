# Sorting Algorithm Visualizer & Analyzer

## 0. Project Metadata
- Student Name: `<Your Name>`
- Enrollment/Roll No.: `<Your Roll Number>`
- Course/Subject: `<Your Course>`
- Guide/Faculty: `<Faculty Name>`
- Submission Date: `<DD-MM-YYYY>`

## 1. Project Overview
This project helps students understand sorting algorithms through:
- step-by-step bar visualization
- live counters (comparisons, swaps, elapsed time)
- complexity analysis
- algorithm performance comparison on same input

Implemented algorithms:
- Bubble Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

## 2. Tech Stack
- HTML5
- CSS3
- JavaScript (ES Modules)
- Python built-in HTTP server (only for local run)

No paid tools or subscriptions are required.

## 3. Current Features
- Algorithm selection panel
- Random input generation
- Custom input support (comma/space separated)
- Step-by-step visualization (`Run` and `Next Step`)
- Speed control
- Input size control
- Swap/comparison/time counters
- Color-coded bars
- Value labels on bars (toggle)
- Algorithm description panel
- Time/space complexity panel
- Real-time compare-all metrics panel
- Dark/Light theme toggle (saved in local storage)
- Save snapshot (session)
- Export results to JSON and CSV
- Console + visual output

## 4. Project Structure
```text
Sorting Algorithem/
  index.html
  README.md
  VIVA_NOTES.md
  src/
    css/
      styles.css
    js/
      main.js
      visualizer.js
      algorithms.js
```

## 5. How To Run
1. Open terminal in project folder:
```powershell
cd "D:\Sorting Algorithem"
python -m http.server 5500
```
2. Open browser:
```text
http://localhost:5500
```
3. Stop server:
```text
Ctrl + C
```

If port 5500 is busy:
```powershell
python -m http.server 5501
```
Then open `http://localhost:5501`.

## 6. How To Use
1. Choose algorithm from dropdown.
2. Choose one input mode:
- Click `Generate Array` for random input.
- Or enter custom input like `9, 4, 1, 7, 3` and click `Use Custom Input`.
3. Adjust speed and size if needed.
4. Click `Run` for full animation or `Next Step` for single-step learning.
5. Use `Compare All` to compare all algorithms on same input.
6. Save/export with `Save Snapshot`, `Export JSON`, `Export CSV`.

## 7. Complexity Reference
| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Insertion Sort | O(n) | O(n^2) | O(n^2) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n^2) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |

## 8. Beginner-Friendly Notes
- Orange bars show currently compared elements.
- Green bars show final sorted output.
- Bar labels can be toggled on/off for clarity.
- Feedback message area shows errors and action status.

## 9. Validation Rules
- Custom input must contain numbers only.
- Empty input is rejected.
- Maximum custom values allowed: `150`.

## 10. Suggested Demo Flow (for Submission)
1. Start with random input and Bubble Sort.
2. Show step-by-step mode.
3. Enter custom input and run Quick Sort.
4. Open complexity panel and explain best/average/worst.
5. Run `Compare All`.
6. Export JSON/CSV.
7. Toggle Dark/Light theme.

## 11. Future Enhancements
- Chart export as image
- Sound effects while swapping
- Additional algorithms (Selection, Shell, Radix)
- User accounts and result history persistence

## 12. Screenshots (Add Before Submission)
Create a folder named `screenshots/` and place images like:
- `screenshots/home.png`
- `screenshots/step-mode.png`
- `screenshots/comparison.png`
- `screenshots/dark-theme.png`
- `screenshots/export.png`

Then update this section:
```md
![Home Screen](screenshots/home.png)
![Step Mode](screenshots/step-mode.png)
![Comparison](screenshots/comparison.png)
![Dark Theme](screenshots/dark-theme.png)
![Export Results](screenshots/export.png)
```

## 13. Final Submission Checklist
- [ ] Project runs with `python -m http.server 5500`
- [ ] All 5 algorithms execute and visualize
- [ ] Compare-all panel is working
- [ ] Complexity panel updates on algorithm change
- [ ] Dark/Light theme toggle works and persists
- [ ] Custom input validation messages are clear
- [ ] Export JSON and CSV works
- [ ] Screenshots added in README
- [ ] Student metadata filled
- [ ] Viva notes reviewed once
- [ ] Report finalized in `REPORT.md`

## 14. Submission Documents
- Main documentation: `README.md`
- Viva preparation notes: `VIVA_NOTES.md`
- Full report format: `REPORT.md`
