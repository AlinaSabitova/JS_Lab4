const flipButton = document.getElementById('flipButton');
const coin = document.getElementById('coin');
const coinImage = document.getElementById('coinImage');
const headsCountDisplay = document.getElementById('headsCount');
const tailsCountDisplay = document.getElementById('tailsCount');

// Переменные для хранения количества выпадений орла и решки
let headsCount = 0;
let tailsCount = 0;

// Добавляем действия при нажатии на кнопку "Перевернуть монету"
flipButton.addEventListener('click', () => {
    coin.classList.add('flipping');   // Запускаем анимацию по нажатию кнопки

    // Создаем задержку между запуском функции и выводом результата (картинки монеты)
    setTimeout(() => {
        coin.classList.remove('flipping');   // Останавливаем анимацию

        // Генерируем случайное число и определяем результат переворота монеты
        const result = Math.random() < 0.5 ? 'heads' : 'tails';

        // В зависимости от результата обновляем счетчики и меняем изображение монеты
        if (result === 'heads') {
            headsCount++;
            coinImage.src = "coins/heads.svg"; 
        } else {
            tailsCount++;
            coinImage.src = "coins/tails.svg"; 
        }

        // Обновляем отображаемые значения счетчиков
        headsCountDisplay.textContent = headsCount;
        tailsCountDisplay.textContent = tailsCount;

    }, 1000);   
});
