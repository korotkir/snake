// Подключение canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth - 20// Указываем ширину окна
canvas.height = window.innerHeight - 100 // Указываем высоту окна
let snakeSize = 40 // Ширина и высота змейки

let score = 0 // Начальное количество баллов
let upPress = false
let downPress = false
let leftPress = false
let rightPress = false
let touchStart = null
let touchPosition = null
let sensSwype = 20 // Количество пикселей, считающиеся свайпом
let sensSnake = 30 // Чувствительность змейки относительно яблока.
let appleImg = new Image()
appleImg.src = './img/apple.png'

// Яблоко
let foodArr = []
foodArr[0] = {
    x: Math.floor(Math.random() * (canvas.width - 150)),
    y: Math.floor(Math.random() * (canvas.height - 50))
}

console.log(`x = ${foodArr[0].x}, ${foodArr[0].y}`)

function food() {
    for(i = 0; i < foodArr.length; i++) {
        ctx.drawImage(appleImg, foodArr[i].x, foodArr[i].y, 60, 60)
    }
}

document.addEventListener('keydown', KeyDownHandler, false) // Клавиша клавиатуры зажата (и отпущена)
document.addEventListener('keydown', KeyDownHandlerWASD, false) // Клавиша клавиатуры зажата (и отпущена)
document.addEventListener('touchstart', function (e) { TouchStart(e)}) // Начало касания
document.addEventListener('touchmove', function (e) { TouchMove(e)}) // движение пальца
document.addEventListener('touchend', function (e) {TouchEnd(e)}) // Конец касания

function keyActivation(up,down,left,right) {
    upPress = up
    downPress = down
    leftPress = left
    rightPress = right
}
 
// TouchScreen
function TouchStart (e) {
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
    touchPosition = { x: touchStart.x, y: touchStart.y}
}

function TouchMove(e) {
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}
}

function TouchEnd(e) {
    CheckAction()
    touchStart = null
    touchPosition = null
}

function CheckAction() {
    var d = {
        x: touchStart.x - touchPosition.x,
        y: touchStart.y - touchPosition.y
    }
    let msg = ''

    if(Math.abs(d.x) > Math.abs(d.y)) {
        if(Math.abs(d.x) > sensSwype) {
            if(d.x > 0) {
                msg = 'left'
            } else {
                msg = 'right'
            }
        }
    }else{
        if(Math.abs(d.y) > sensSwype) {
            if(d.y > 0) {
                msg = 'up'
            } else {
                msg = 'down'
            }
    }
}
    //console.log(msg)
    if (msg == 'up' && downPress == false) {
        keyActivation(true,false,false,false)
    }else if (msg == 'down' && upPress == false) {
        keyActivation(false,true,false,false)
    }else if (msg == 'left' && rightPress == false) {
        keyActivation(false,false,true,false)
    }else if (msg == 'right' && leftPress == false) {
        keyActivation(false,false,false,true)
    }
}

// Кнопки
function KeyDownHandler(e) {
    if(e.keyCode == 38 && downPress == false) {
        keyActivation(true,false,false,false)
    }else if(e.keyCode == 40 && upPress == false){
        keyActivation(false,true,false,false)
    }else if(e.keyCode == 37 && rightPress == false){
        keyActivation(false,false,true,false)
    }else if(e.keyCode == 39 && leftPress == false){
        keyActivation(false,false,false,true)
    }
} 

function KeyDownHandlerWASD(e) {
    if(e.keyCode == 87 && downPress == false) {
        keyActivation(true,false,false,false)
    }else if(e.keyCode == 83 && upPress == false){
        keyActivation(false,true,false,false)
    }else if(e.keyCode == 65 && rightPress == false){
        keyActivation(false,false,true,false)
    }else if(e.keyCode == 68 && leftPress == false){
        keyActivation(false,false,false,true)
    }  
}

let snakeArr = []
snakeArr[0] = {
    x: document.documentElement.clientWidth / 2 - (snakeSize / 2),
    y: document.documentElement.clientHeight / 2 - (snakeSize / 2)
}

// Функция отвечающая за отрисовку змейки
function snake() {
    ctx.beginPath()
    // Определяем прямоугольник
    for (let i = 0; i < snakeArr.length; i++){
        ctx.fillStyle = '#66bb6a'
        ctx.rect(snakeArr[i].x, snakeArr[i].y, snakeSize, snakeSize) // (x, y, width, height)
    }

    ctx.fillStyle = '#66bb6a' // указываем цвет прямоугольника
    ctx.fill() // отрисовка
    ctx.closePath()   
}

// Функция отвечающая за выход за края
function pass() {
    for(i=0; i < snakeArr.length; i++) {
        if(snakeArr[i].y >= canvas.height){
            snakeArr[i].y = 0
        }else if(snakeArr[i].y < 0){
            snakeArr[i].y = canvas.height
        }
        if(snakeArr[i].x >= canvas.width){
            snakeArr[i].x = 0
        }else if(snakeArr[i].x < 0){
            snakeArr[i].x = canvas.width
        }
    }
}

// Если змейка наехала на себя, игра начинается сначала
function youLose(head,body) {
    for(i = 0; i < snakeArr.length; i++) {
        if(head.x == body[i].x && head.y == body[i].y){
            score = 0
            for(i = 0; i < snakeArr.length; i++){
                snakeArr.splice(i)
            }
        }
    }
}

// Функция отвечающая за поедание змейкой еды.
function eatFood() {
    let snakeX = snakeArr[0].x
    let snakeY = snakeArr[0].y 
    if (snakeX <= foodArr[0].x + sensSnake && snakeX >= foodArr[0].x - sensSnake && snakeY <= foodArr[0].y + sensSnake && snakeY >= foodArr[0].y - sensSnake) {
        foodArr[0] = {
            x: Math.floor(Math.random() * (canvas.width - 150)),
            y: Math.floor(Math.random() * (canvas.height - 50))
        }
        score++
        console.table(snakeArr)
    } else {
            snakeArr.pop()
        }

    if(leftPress) snakeX -= snakeSize + 5;
    if(rightPress) snakeX += snakeSize + 5;
    if(upPress) snakeY -= snakeSize + 5;
    if(downPress) snakeY += snakeSize + 5;

    let newHead = {
            x: snakeX ,
            y: snakeY 
        }
    
    youLose(newHead,snakeArr)
    snakeArr.unshift(newHead);
}

// Баллы
function ballResult() {
    ctx.font = "48px serif";
    ctx.fillStyle = 'white'
    ctx.fillText(score * 10, canvas.width - 80, canvas.height - 20, [50]);
}

function game() {
    ctx.clearRect(0,0,canvas.width,canvas.height) //метод для очистки. (x и y у верхнего левого угла, x и y нижнего правого угла)
    snake()// отрисовываем змейку
    food()
    pass()
    eatFood()
    ballResult()
}
setInterval(game, 100) // Задаем интервал (в мс)





