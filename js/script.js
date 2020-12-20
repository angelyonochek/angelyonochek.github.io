const canvas = document.querySelector("#game"); 
const ctx = canvas.getContext("2d");//формат игры
//.
const ground = new Image(); //класс позволяющий работать с картинками
ground.src = "img/game field.png";  //путь к картинке


const EatMousAudio = new Audio('audio/mous.mp3');
const GameOverAudio = new Audio('audio/GameOver.mp3');
const food = new Image(); //класс позволяющий работать с картинками
food.src = "img/mous.png";  //путь к картинке

let box = 50; //размер одной ячейки

let score = 0; //общий счет
//let button = document.getElementById('btn');
let mous = {
    x: Math.floor((Math.random() * (13 - 1)) + 1) * box, //задаем координаты положения еды и умножаем на размер одной ячейки

    y: Math.floor((Math.random() * (11 - 1)) + 1) * box
};

let snake = [];   // массив для змейки, чтобы добавлять длинну
snake[0] = {
    x: 6 * box,
    y: 7 * box
};   // начально положение змейки 

document.addEventListener("keydown", direction);
let dir= "ringht";

function direction(event) {
    // Если нажата стрелочка права
    if (event.keyCode == 39 && dir !== "left") {
        dir = "right"; // Поменяет направление на право
    }
    // Если нажата стрелочка вниз
    if (event.keyCode == 40 && dir !== "top") {
        dir = "down"; // Поменяет направление вниз
    }
    // Если нажата стрелочка налево
    if (event.keyCode == 37 && dir !== "right") {
        dir = "left"; // Поменяет направление налево
    }
    // Если нажата стрелочка верх
    if (event.keyCode == 38 && dir !== "down") {
        dir = "top"; // Поменяет направление верх
    }
}





function drawGame() {
    
    ctx.drawImage(ground, 0, 0); //рисуем изображение 

    ctx.drawImage(food, mous.x, mous.y);// рисуем еду
    
    
    function OverGame() {
        let GameOver = "Победила мышь"
        ctx.fillStyle = "rgb(62, 8, 73)";//свойства шрифта для надписи вывода очков
        ctx.font = "70px Arial";
        ctx.fillText(GameOver, 2 * box , 6 * box )
    }

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "yellow" : "black";
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // рисуем тело змейки желтым квадратом( положение по х, у и высоты и ширина)
    }

    ctx.fillStyle = "red";//свойства шрифта для надписи вывода очков
    ctx.font = "70px Arial";
    ctx.fillText(score, box , box );

    let snakeX = snake[0].x; // начальные координаты змейки
    let snakeY = snake[0].y;

    if (snakeX == mous.x && snakeY == mous.y){
        score ++; //увеличиваем счет
        
        mous = {
            x: Math.floor((Math.random() * (13 - 1)) + 1) * box, //задаем координаты положения еды и умножаем на размер одной ячейки
            y: Math.floor((Math.random() * (11 - 1)) + 1) * box
        };
        EatMousAudio.play() ;
    } else {
        snake.pop();
    }
    
    // если совпали х и у (мышь съедена)



    if(snakeX < box || snakeX > box * 12 
        || snakeY < box || snakeY > box * 10){
            clearInterval(game);
            GameOverAudio.play() ;
            OverGame() ;
        } // если змейка вылезает за пределы поля, то игра конец
        
        



    if (dir == "right") {
        snakeX += box;
    }
    if (dir == "left") {
        snakeX -= box;
    }
    if (dir == "down") {
        snakeY += box;
    }
    if (dir == "top") {
        snakeY -= box;
    } //движение змейки

    let snakeHead  = {
        x: snakeX,
        y: snakeY
    }; 
    snake.unshift(snakeHead); //добавляем новые координаты в начало массива

    eatTail(snakeHead, snake); //запускаем функцию


    function eatTail (SnakeHead, array) {
        for ( let i = 1; i< array.length; i++){
            if (SnakeHead.x == array[i].x && snakeHead.y == array[i].y)
            {
                for(let i = 0; i < snake.length; i++) {
                    ctx.fillStyle ="red";
                    ctx.fillRect(snake[i].x, snake[i].y, box, box);
                    
                     // рисуем тело змейки красным квадратом( положение по х, у и высоты и ширина)
                }
            clearInterval (game) ;
            GameOverAudio.play() ;
            OverGame() ;
        }
        }  // функция есть хвост
    }
    
} //функция, которая запускает игру


let game = setInterval (drawGame, 180); // задаем интервал, 100 мс, чтобы картинка отображалась



function startGame() {
    window.location.reload();
}

































