const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sk-proj-XxF7k4ID1X9489TMZvZgT3BlbkFJX5AjG5arCRwlk463xBJR' // Замени YOUR_API_KEY на свой API ключ
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
};