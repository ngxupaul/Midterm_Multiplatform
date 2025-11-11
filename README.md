My Tasks — Capacitor + React

A simple mobile To‑Do app with local persistence using Capacitor Storage.

Features
- Task list with status: ⏳ IN PROGRESS or ✅ DONE
- Add new tasks
- Triple‑tap to toggle status
- Swipe left to reveal Delete
- Long‑press to confirm Delete
- Data persists between app launches

Quick Start
1) Install
```bash
npm install
```

2) Run on Web (fast dev)
```bash
npm run dev
```

3) Build and Sync
```bash
npm run build
npx cap sync
```

4) Open platforms
```bash
npx cap add ios    # first time only
npx cap add android# first time only
npm run ios        # opens Xcode
npm run android    # opens Android Studio
```
In Xcode/Android Studio, select a simulator/device and press Run.

Usage
- Add task: Tap the ➕ button.
- Toggle status: Triple‑tap a task item to switch IN PROGRESS ↔ DONE.
- Delete:
  - Swipe left on a task to reveal Delete button, or
  - Long‑press a task to show a delete confirmation dialog.

Tech Stack
- React 18, Vite
- Capacitor 5
- @capacitor/storage for local data

Project Structure
- `src/components/TaskList.jsx` — Main list screen and gestures
- `src/components/AddTask.jsx` — Add task screen
- `src/utils/storage.js` — Storage helpers (get, save, toggle, delete)
- `src/App.jsx` — Router and screens

How to Use (Step-by-step)
1) Open the app. The home screen shows your task list.
2) Create a task: press ➕, type the task name, press Save.
3) Change status: triple‑tap a task to toggle between ⏳ IN PROGRESS and ✅ DONE.
4) Delete a task:
   - Swipe left on the task and tap Delete, or
   - Long‑press the task and confirm the prompt.

Author
- Nguyễn Xuân Phong — Student ID: 22IT221

