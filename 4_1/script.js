const generateButton = document.getElementById('generateButton');
const sizeInput = document.getElementById('size');
const multiplicationTable = document.getElementById('multiplicationTable');

generateButton.addEventListener('click', () => {
    const size = parseInt(sizeInput.value); // получаем от пользователя размер таблицы
    
    // Очищаем содержимое контейнера таблицы
    multiplicationTable.innerHTML = '';

    // Создаем таблицу умножения
    const headerRow = document.createElement('tr');
            
    // Создаем заголовки
    headerRow.appendChild(document.createElement('th')); // Пустая ячейка для первого столбца
    for (let i = 1; i <= size; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        headerRow.appendChild(th);
    }
            
    multiplicationTable.appendChild(headerRow);

    // Создаем строки
    for (let i = 1; i <= size; i++) {
        const row = document.createElement('tr');
                
        // Создаем заголовки строк
        const th = document.createElement('th');
        th.textContent = i;
        row.appendChild(th);
                
        // Заполняем ячейки
        for (let j = 1; j <= size; j++) {
            const td = document.createElement('td');
            td.textContent = i * j;
            row.appendChild(td);
        }
        // Добавляем строку в таблицу      
        multiplicationTable.appendChild(row);
    }

    // Закрепляем первый столбец
    makeFirstColumnSticky();
});

// Функция для закрепления первого столбца таблицы
function makeFirstColumnSticky() {
    const rows = multiplicationTable.querySelectorAll('tr');  // Находим все строки таблицы

    // Проходимся по каждой строке
    rows.forEach(row => {
        const firstCell = row.querySelector('th'); // Получаем первый элемент в строке
        if (firstCell) {
            firstCell.classList.add('sticky'); // Добавляем класс для закрепления
        }
    });
}