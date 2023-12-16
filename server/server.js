const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

app.get('/getFiles', (req, res) => {
    const folderPath = './instrument_anomalies';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error reading folder' });
            return;
        }

        res.json({ files });
    });
});
app.get('/getGeneralInfo', (req, res) => {
    const folderPath = './instrument_anomalies';
    const result = countItemsInJsonFiles(folderPath);
    const folder2Path = './JSON/InAirTempAnomaly/';
    const result2 = countItemsInJsonFiles(folder2Path);
    const folder3Path = './JSON/OilTempAnomaly/';
    const result3 = countItemsInJsonFiles(folder3Path);
    const folder4Path = './JSON/WatTempAnomaly/';
    const result4 = countItemsInJsonFiles(folder4Path);
    res.json({result,result2,result3,result4});
});
app.get('/getFile', async (req, res) => {
    const folderPath = path.join(__dirname, './instrument_anomalies/');

    // Get the fileName parameter from the query string
    const fileName = req.query.fileName;

    if (!fileName) {
        res.status(400).json({ error: 'fileName parameter is required' });
        return;
    }

    try {
        const filePath = path.join(folderPath, fileName);

        await fs.readFile(filePath, 'utf8', function (err, data) {
            res.json(data);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading or parsing JSON file' });
    }
});

app.get('/getFileAirTemp', async (req, res) => {
    const folderPath = path.join(__dirname, './JSON/InAirTempAnomaly/');

    // Get the fileName parameter from the query string
    const fileName = req.query.fileName;

    if (!fileName) {
        res.status(400).json({
            error: 'Air temp fileName parameter is required',
        });
        return;
    }

    try {
        const filePath = path.join(folderPath, fileName);

        await fs.readFile(filePath, 'utf8', function (err, data) {
            res.json(data);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading or parsing JSON file' });
    }
});

app.get('/getFileOilTemp', async (req, res) => {
    const folderPath = path.join(__dirname, './JSON/OilTempAnomaly/');

    // Get the fileName parameter from the query string
    const fileName = req.query.fileName;

    if (!fileName) {
        res.status(400).json({
            error: 'Oil temp fileName parameter is required',
        });
        return;
    }

    try {
        const filePath = path.join(folderPath, fileName);

        await fs.readFile(filePath, 'utf8', function (err, data) {
            res.json(data);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading or parsing JSON file' });
    }
});

app.get('/getFileWatTemp', async (req, res) => {
    const folderPath = path.join(__dirname, './JSON/WatTempAnomaly/');

    // Get the fileName parameter from the query string
    const fileName = req.query.fileName;

    if (!fileName) {
        res.status(400).json({
            error: 'Wat temp fileName parameter is required',
        });
        return;
    }

    try {
        const filePath = path.join(folderPath, fileName);

        await fs.readFile(filePath, 'utf8', function (err, data) {
            res.json(data);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading or parsing JSON file' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function replaceNaNs(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            replaceNaNs(obj[key]);
        } else if (obj[key] !== obj[key]) {

            obj[key] = null;
        }
    }
}


function countItemsInJsonFiles(directory) {
    const counts = {};


    fs.readdirSync(directory).forEach((file) => {
        if (file.endsWith('.json')) {
            const filePath = path.join(directory, file);
            let data = fs.readFileSync(filePath, 'utf8');


            data = data.replace(/\bNaN\b/g, 'null');
            data = JSON.parse(data);

            replaceNaNs(data);

            if (data.content && Array.isArray(data.content)) {
                const count = data.content.length;
                const key = `train_${file.split('_').pop().split('.')[0]}`;
                counts[key] = count;
            }
        }
    });

    return counts;
}
