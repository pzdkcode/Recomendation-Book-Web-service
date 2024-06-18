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

    const prompt = `Жанры: ${genres}\nАвторы: ${authors}\nКниги которые нравятся: ${likedBooks}\nОписание: ${description}\nПожалуйста, порекомендуй 3 книги.`;

    // Отправка данных на серверную функцию Vercel
   fetch('https:/recomendation-book-web-service-bs1b.vercel.app/api/recomendation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: prompt })
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
