const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const textract = require('textract');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/resume', upload.single('file'), async (req, res) => {
  const file = req.file;
  const filePath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();

  try {
    let text = '';

    if (ext === '.pdf') {
      const data = await pdfParse(fs.readFileSync(filePath));
      text = data.text;
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      text = await new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }

    res.json({ text, filePath: `/${filePath}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error extracting text');
  }
});

module.exports = router;
