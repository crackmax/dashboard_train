const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

app.get('/getFiles', (req, res) => {
  const folderPath = '../../../INFOH423/instrument_anomalies'; 

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading folder' });
      return;
    }

    res.json({ files });
  });
});
app.get('/getFile', async (req, res) => {
  const folderPath = path.join(__dirname, '../../../INFOH423/instrument_anomalies/');

  // Get the fileName parameter from the query string
  const fileName = req.query.fileName;

  if (!fileName) {
    res.status(400).json({ error: 'fileName parameter is required' });
    return;
  }

  try {
    const filePath = path.join(folderPath, fileName);

    await fs.readFile(filePath, 'utf8', function(err,data){
      res.json(data)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error reading or parsing JSON file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
