const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/recommendation', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Замени YOUR_API_KEY на свой API ключ
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 150
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении рекомендации.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});