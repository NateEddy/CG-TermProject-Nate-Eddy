# Scribble Jump - Ghost Racing Setup Guide

## Overview
Scribble Jump includes ghost racing functionality where your gameplay is recorded and replayed for other players to race against. The top score's ghost is shown as a semi-transparent white cube during gameplay.

## Prerequisites
- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## Quick Start (3 Steps)

### Step 1: Install Dependencies
Open a terminal in the project directory and run:
```bash
npm install
```

This installs Express and CORS libraries needed for the backend server.

### Step 2: Start the Backend Server
In the same terminal, run:
```bash
npm start
```

You should see:
```
Ghost racing server running on port 3000
```

**Keep this terminal open!** The server must be running for ghost data to work.

### Step 3: Start the Frontend Game
Open a **new terminal** in the project directory and run:
```bash
python3 -m http.server 8000
```

Then open your browser to:
```
http://localhost:8000
```

---

## How Ghost Racing Works

1. **During Gameplay:**
   - Your position is recorded every frame
   - The top scorer's ghost appears as a **semi-transparent white cube**
   - Try to beat the ghost's score!

2. **On Game Over:**
   - Your ghost data is automatically saved to the server
   - If your score beats the previous top score, you become the new ghost
   - The leaderboard is updated

3. **Replaying:**
   - When you reset (press R), the latest top ghost loads
   - Race against it to try to beat their score!

---

## File Structure

```
/workspaces/CG-TermProject-Nate-Eddy/
├── index.html          # Game frontend
├── server.js           # Backend ghost server
├── package.json        # Node dependencies
├── ghosts.json         # Ghost data storage (auto-created)
└── README.md           # This file
```

---

## Troubleshooting

### "Could not load ghost (server may not be running)"
- Make sure `npm start` is running in a terminal
- Check that port 3000 is not in use
- Try restarting the server

### Ghost data not saving
- Ensure backend server is running
- Check browser console for errors (F12 → Console)
- Make sure score is > 5 to be saved

### "Address already in use" error
Kill the existing process:
```bash
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows (PowerShell):
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess -Force
```

---

## Game Controls

- **Arrow Keys / A/D** - Move left/right
- **R** - Reset game after game over
- **ESC** - N/A (focus browser to play)

---

## Top 10 Leaderboard

The server keeps the top 10 scores. View them at:
```
http://localhost:3000/api/leaderboard
```

---

## Development Notes

- Ghost data is stored in `ghosts.json`
- Each ghost stores player position (x, y, z) every frame
- Maximum 10 ghosts kept in memory
- Ghost player is semi-transparent (50% opacity) white cube

Enjoy racing against ghosts!
