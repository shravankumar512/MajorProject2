var myPythonScriptPath = 'naivebayes.py';


const express = require('express');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

var upload = multer({
  storage: storage
})
const fs = require('fs');

var input;
const router = express.Router();

const app = express();
router.post('/upload', upload.single('rawFile'), (req, res) => {
  if (req.file) {
    let file = req.file;
    var spawn = require('child_process').spawn;
    var process = spawn('python', ["./naivebayes.py", file.filename]);

    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      res.send(data.toString());
    });

    process.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
      res.send(data.toString());
    });

    process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }
})

// router.get('/naivebayes', (req, res) => {
//   var spawn = require('child_process').spawn;
//   var process = spawn('python', ["./naivebayes.py", ]);

//   process.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//     res.send(data.toString());
//   });

//   process.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
//     res.send(data.toString());
//   });

//   process.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });

// })

module.exports = router;
