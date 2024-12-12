const canvas = document.getElementById('storyCanvas');
const ctx = canvas.getContext('2d');
const textElement = document.getElementById('text');
const choicesElement = document.getElementById('choices');

// Прописываем историю
const story = {
    start: {
        text: "Ты стоишь посреди густого леса. Вокруг тебя высокие деревья, их кроны полностью закрывают небо. На земле лежит мягкий мох, а воздух наполнен ароматом свежей зелени. Перед тобой два пути: тропинка направо и тропинка налево. Что ты выберешь?",
        image: "forest.png",
        choices: [
            { text: "Пойти направо", next: 'rightPath' },
            { text: "Пойти налево", next: 'leftPath' }
        ],
    },
    rightPath: {
        text: "Тропа ведет тебя к заброшенной хижине. Вход закрыт, но окно разбито. Ты заглядываешь внутрь и видишь старый сундук в углу комнаты, находишь внутри старинный компас. Он указывает на север. Ты решаешь следовать указаниям компаса и уходишь дальше в лес. Продолжить движение по компасу?",
        image: "house.png",
        choices: [
            { text: "Да", next: 'followCompass' },
            { text: "Нет, лучше вернуться на перекресток", next: 'start' }
        ]
    },
    followCompass: {
        text: "Ты идёшь по лесу, следуя стрелке компаса, и приходишь к руинам старого замка. В центре двора стоит статуя дракона, а рядом с ней — закрытые ворота. На воротах висит табличка с надписью: 'Только смелые могут войти'. Открыть ворота?",
        image: "followCompass.png",
        choices: [
            { text: "Открыть ворота", next: 'enterCastle' },
            { text: "Пойти дальше в лес", next: 'goForest' }
        ]
    },
    enterCastle: {
        text: "Ты входишь в замок и оказываешься в большом зале. В середине зала стоит трон, а на троне сидит призрак короля. Призрак спрашивает тебя: 'Зачем пришел?' Ответить призраку:",
        image: "enterCastle.png",
        choices: [
            { text: "Ищу сокровища", next: 'treasureResponse' },
            { text: "Хочу узнать историю этого места", next: 'historyResponse' }
        ]
    },
    leftPath: {
        text: "Тропинка становится все уже и вскоре превращается в едва заметную дорожку среди кустарников. Ты продолжаешь идти, пока не выходишь к небольшому озеру. Вода в озере кристально чистая, и ты видишь, как под водой плавают рыбы. Рядом с озером стоит старый деревянный домик. Что ты сделаешь?",
        image: "leftPath.png",
        choices: [
            { text: "Подойти к домику", next: 'approachHouse' },
            { text: "Попробовать поймать рыбу", next: 'catchFish' }
        ]
    },
    approachHouse: {
        text: "Дверь приоткрыта, и ты слышишь слабый свет внутри. Осторожно толкаешь дверь и входишь внутрь. Внутри уютная комната с камином. На столе лежит книга, открытая на странице с загадочной надписью. Как ты поступишь?",
        image: "approachHouse.png",
        choices: [
            { text: "Прочитать книгу", next: 'readBook' },
            { text: "Осмотреть комнату", next: 'inspectRoom' }
        ]
    },
    catchFish: {
        text: "Ты пытаешься поймать рыбу, но она слишком быстрая для тебя. Однако ты замечаешь что-то блестящее на дне озера. Это может быть что-то ценное! Что ты сделаешь?",
        image: "catchFish.png",
        choices: [
            { text: "Попробовать достать блестящее", next: 'getShinyObject' },
            { text: "Вернуться к домику", next: 'approachHouse' }
        ]
    },
    inspectRoom: {
        text: "Ты обходишь комнату, внимательно осматривая каждый уголок. В одном из шкафчиков ты находишь ключ от двери, ведущей в подвал. Дверь открывается легко, и ты спускаешься вниз по лестнице. В подвале находится старая библиотека, заполненная древними книгами и манускриптами. Среди них ты замечаешь одну книгу, обложка которой украшена драгоценными камнями.",
        image: "inspectRoom.png",
        choices: [
            {text: "Взять книгу", next: 'putBook'},
            {text: "Осмотреть другие книги", next: 'seeOtherBooks'}
        ]
    },
    // Завершения
    readBook: { text: "Ты берёшь книгу в руки и начинаешь читать. Надпись гласит: кто прочтёт эту книгу до конца, тот обретет великую мудрость. Ты погружаешься в чтение, и страницы начинают перелистываться сами собой. Когда ты заканчиваешь чтение, книга исчезает. Теперь ты обладаешь великой мудростью. Ты покидаешь домик и возвращаешься на тропинку, чувствуя себя обновленным. Конец игры.", image: "readBook.png", choices: [] },
    getShinyObject: { text: "Ты ныряешь в воду и достаёшь блестящий предмет — это старинное кольцо! Оно выглядит очень ценным. Конец игры.", image: "getShinyObject.png", choices: [] },
            
    putBook: { text: "Книга оказывается заклинанием, которое позволяет тебе телепортироваться домой. Ты произносишь заклинание, и через мгновение оказываешься дома с семьей. Конец эпизода.", image: "putBook.png", choices: [] },
    seeOtherBooks: { text: "Ты начинаешь листать старые фолианты, пытаясь найти что-то интересное. Одна из книг привлекает твоё внимание своим необычным переплетом. Открыв её, ты обнаруживаешь, что она содержит рецепты алхимических эликсиров. Один из рецептов обещает вечную молодость. Решив, что это может быть полезно, ты записываешь рецепт и покидаешь библиотеку. Теперь у тебя есть шанс создать мощный эликсир, который поможет тебе в дальнейших приключениях. Конец игры.", image: "seeOtherBooks.png", choices: [] },

    treasureResponse: { text: "Призрак смеется и исчезает, оставляя после себя свечение. Свечение превращается в карту, которая показывает расположение сокровищ в замке. Ты быстро запоминаешь карту и отправляешься искать клад. Найденное сокровище приносит радость. Конец игры.", image: "treasureResponse.png", choices: [] },
    historyResponse: { text: "Призрак рассказывает тебе легенду о том, как этот замок был построен и почему он теперь заброшен. История оказывается очень интересной, и ты узнаешь много нового о местных мифах и преданиях. После рассказа призрак благодарит тебя за внимание и дарит тебе подарок. Конец истории", image: "historyResponse.png", choices: [] },
    goForest: { text: "Ты проходишь в глубь леса и встречаешь волшебника. Он предлагает тебе загадать одно желание. Ты соглашаешься и загадываешь вернуться домой. Волшебник взмахивает волшебной палочкой и ты оказываешься дома. Конец.", image: "goForest.png", choices: []}
};

function showStory(storyNode) {
    // Получаем данные текущего узла из объекта story
    const node = story[storyNode];

    // Отображение изображения
    const image = new Image();
    image.src = `img/${node.image}`; 
    // Обработчик события загрузки изображения
    image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас перед отрисовкой
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);  // Выводим новое изображение
                
        // Обновление текста и кнопок
        textElement.textContent = node.text;  // Обновляем текстовый контент
        choicesElement.innerHTML = '';  // Очищаем блок с кнопками перед добавлением новых
        // Перебираем варианты выбора и создаем для них кнопки
        node.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => showStory(choice.next);  // Обрабатываем клик по кнопке, вызывая следующую часть истории
            choicesElement.appendChild(button);
        });
    };
}

function showStory(storyNode) {
    // Получаем данные текущего узла из объекта story
    const node = story[storyNode];

    // Отображение изображения
    const image = new Image();
    image.src = `img/${node.image}`;
    image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас перед отрисовкой
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);  // Выводим новое изображение
                
        // Обновление текста и кнопок
        textElement.textContent = node.text;  // Обновляем текстовый контент
        choicesElement.innerHTML = '';  // Очищаем блок с кнопками перед добавлением новых

        // Проверка: если это конец игры (нет вариантов выбора), показываем alert и перезапускаем игру
        if (node.choices.length === 0) {
            setTimeout(() => {
                alert("Вы прошли квест!"); // Показ сообщения после задержки
                showStory('start'); // Возвращаемся к началу игры
            }, 3000); 
        } else {
            // Перебираем варианты выбора и создаем для них кнопки
            node.choices.forEach(choice => {
                const button = document.createElement('button');
                button.textContent = choice.text;
                button.onclick = () => showStory(choice.next);  // Обрабатываем клик по кнопке, вызывая следующую часть истории
                choicesElement.appendChild(button);
            });
        }
    };
}

// Начинаем с первого узла
showStory('start');