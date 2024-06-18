document.addEventListener('DOMContentLoaded', function () {
  AOS.init();
  const form = document.getElementById('recommendation-form');

  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const genres = document.getElementById('genres').value;
      const authors = document.getElementById('authors').value;
      const likedBooks = document.getElementById('likedBooks').value;
      const description = document.getElementById('description').value;

      const prompt = `Жанры: ${genres}\nАвторы: ${authors}\nКниги которые нравятся: ${likedBooks}\nОписание: ${description}\nПожалуйста, порекомендуй мне три книги с небольшим описанием.`;

      const url = 'https://chat-gpt26.p.rapidapi.com/';
      const options = {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'bed7777133mshe32a1c0317314e2p1b9ad6jsnf073a2c762c8', // Замени YOUR_RAPIDAPI_KEY на свой RapidAPI ключ
          'x-rapidapi-host': 'chat-gpt26.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const recommendation = result.choices[0].message.content.trim();
        const newTabUrl = `rec.html?recommendation=${encodeURIComponent(recommendation)}`;
        window.open(newTabUrl, '_blank');
      } catch (error) {
        console.error('Error:', error);
        const errorMessage = 'Произошла ошибка при получении рекомендации. Пожалуйста, попробуйте позже.';
        const newTabUrl = `rec.html?recommendation=${encodeURIComponent(errorMessage)}`;
        window.open(newTabUrl, '_blank');
      }
    });
  }
});