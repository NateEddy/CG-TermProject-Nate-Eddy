const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('./'));

app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.url);
    next();
});

const dataFile = path.join(__dirname, 'ghosts.json');

if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ ghosts: [] }, null, 2));
}

app.get('/api/ghosts/top', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        const topGhost = data.ghosts.length > 0 
            ? data.ghosts.reduce((max, ghost) => ghost.score > max.score ? ghost : max)
            : null;
        res.json({ success: true, ghost: topGhost });
    } catch (error) {
        console.error('Error reading ghosts:', error);
        res.json({ success: false, ghost: null });
    }
});

app.post('/api/ghosts/save', (req, res) => {
    try {
        const { ghostData, score, timestamp } = req.body;
        
        if (!ghostData || score === undefined) {
            return res.json({ success: false, message: 'Missing data' });
        }

        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        
        data.ghosts.push({
            id: Date.now(),
            score: score,
            timestamp: timestamp || new Date().toISOString(),
            data: ghostData
        });

        data.ghosts.sort((a, b) => b.score - a.score);
        data.ghosts = data.ghosts.slice(0, 10);

        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        res.json({ success: true, message: 'Ghost saved' });
    } catch (error) {
        console.error('Error saving ghost:', error);
        res.json({ success: false, message: 'Error saving ghost' });
    }
});

app.get('/api/leaderboard', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        const leaderboard = data.ghosts.map(g => ({ 
            score: g.score, 
            timestamp: g.timestamp 
        }));
        res.json({ success: true, leaderboard });
    } catch (error) {
        console.error('Error reading leaderboard:', error);
        res.json({ success: false, leaderboard: [] });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ghost racing server running on port ${PORT} (bound to 0.0.0.0)`);
});
