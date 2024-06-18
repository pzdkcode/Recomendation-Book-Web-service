AOS.init();

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('recommendation-form');
  const modal = document.getElementById('recommendation-modal');
  const closeBtn = document.querySelector('.close-btn');
  const recommendationResult = document.getElementById('recommendation-result');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const genres = document.getElementById('genres').value;
    const authors = document.getElementById('authors').value;
    const likedBooks = document.getElementById('likedBooks').value;
    const description = document.getElementById('description').value;

    const prompt = `Жанры: ${genres}\nАвторы: ${authors}\nКниги которые нравятся: ${likedBooks}\nОписание: ${description}\nПожалуйста, порекомендуй три книг.`;

    // Отправка данных в OpenAI GPT-3
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'sk-proj-XxF7k4ID1X9489TMZvZgT3BlbkFJX5AjG5arCRwlk463xBJR' // Замени YOUR_API_KEY на свой API ключ
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 150
      })
    })
    .then(response => response.json())
    .then(data => {
      recommendationResult.textContent = data.choices[0].text.trim();
      modal.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
      recommendationResult.textContent = 'Произошла ошибка при получении рекомендации. Пожалуйста, попробуйте позже.';
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});