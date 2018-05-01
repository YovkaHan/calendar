/**
 * Created by Jordan3D on 4/13/2018.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/', express.static('./dist'));
app.get('/schedule.json', (req, res) => {
  const sample = {
    "mo": [
      {
        "bt": 240,
        "et": 779
      }
    ],
    "tu": [
    ],
    "we": [
    ],
    "th": [
      {
        "bt": 240,
        "et": 779
      },
      {
        "bt": 1140,
        "et": 1319
      }
    ],
    "fr": [
      {
        "bt": 660,
        "et": 1019
      }
    ],
    "sa": [
      {
        "bt": 0,
        "et": 1439
      }
    ],
    "su": []
  };
  return res.status(200).json(sample);
})
app.post('/schedule.json', (req, res) => {
  return res.status(200).json(req.body);
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
