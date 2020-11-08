// Подключение canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth // Указываем ширину окна
canvas.height = window.innerHeight // Указываем высоту окна
let snakeWidth = 40 // Ширина змейки
let snakeHeight = 40 // Высота одного элемента змейки
let dx = 2 // Шаг змейки по X
let dy = 2 // Шаг змейки по Y
let score = 0 // Начальное количество баллов
let upPress = false
let downPress = false
let leftPress = false
let rightPress = false
let touchStart = null
let touchPosition = null
let sensSwype = 20 // Количество пикселей, считающиеся свайпом
let sensSnake = 25 // Чувствительность змейки относительно яблока.
let appleImg = new Image()
appleImg.src = 'apple.png'

// Яблоко
let foodArr = []
foodArr[0] = {
    x: Math.floor(Math.random() * (canvas.width - 150)),
    y: Math.floor(Math.random() * (canvas.height - 50))
}

console.log(`x = ${foodArr[0].x}, ${foodArr[0].y}`)

function food() {
    for(i = 0; i < foodArr.length; i++) {
        ctx.drawImage(appleImg, foodArr[i].x, foodArr[i].y, 50, 50)
    }
}


document.addEventListener('keydown', KeyDownHandler, false) // Клавиша клавиатуры зажата (и отпущена)
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

let snakeArr = []
snakeArr[0] = {
    x: document.documentElement.clientWidth / 2 - (snakeWidth / 2),
    y: document.documentElement.clientHeight / 2 - (snakeHeight / 2)
}
// Функция отвечающая за отрисовку змейки
function snake() {
    ctx.beginPath()
    // Определяем прямоугольник
    for ( i = 0; i < snakeArr.length; i++){
        ctx.rect(snakeArr[i].x, snakeArr[i].y, snakeWidth, snakeHeight) // (x, y, width, height)
    }
    ctx.fillStyle = '#66bb6a' // указываем цвет прямоугольника
    ctx.fill() // отрисовка
    ctx.closePath()   
}

// Функция отвечающая за выход за края
function pass() {
    if(snakeArr[0].y >= canvas.height){
        snakeArr[0].y = 0
    }else if(snakeArr[0].y < 0){
        snakeArr[0].y = canvas.height
    }
    if(snakeArr[0].x >= canvas.width){
        snakeArr[0].x = 0
    }else if(snakeArr[0].x < 0){
        snakeArr[0].x = canvas.width
    }
}

// Функция отвечающая за направление змейки
function direction() {
    //x += -dx // тест по оси x
    //y += dy // тест по оси y
    if(upPress) {
        snakeArr[0].y += -dy 
    }else if(downPress) {
        snakeArr[0].y += dy 
    }else if(leftPress) {
        snakeArr[0].x += -dx
    }else if(rightPress) {
        snakeArr[0].x += dx
    }
}

// Функция отвечающая за поедание змейкой еды.
function eatFood() {
    
    if (snakeArr[0].x <= foodArr[0].x + sensSnake && snakeArr[0].x >= foodArr[0].x - sensSnake && snakeArr[0].y <= foodArr[0].y + sensSnake && snakeArr[0].y >= foodArr[0].y - sensSnake) {
        score++
        foodArr[0] = {
            x: Math.floor(Math.random() * (canvas.width - 150)),
            y: Math.floor(Math.random() * (canvas.height - 50))
        }
    }
}

function ballResult() {
    ctx.font = "48px serif";
    ctx.fillStyle = 'white'
    ctx.fillText(score * 10, canvas.width - 80, canvas.height - 20, [50]);
}

function snakeSpeed() {
    if(score >= 5 && score <= 9) {
        dx = 3
        dy = 3
    }else if (score >= 10 && score <= 14) {
        dx = 5
        dy = 5
    } else if (score >= 15 && score <= 19) {
        dx = 7
        dy = 7
    }
}

// Функция отвечающая за анимирование змейки
function snakeAnimation() {
    ctx.clearRect(0,0,canvas.width,canvas.height) //метод для очистки. (x и y у верхнего левого угла, x и y нижнего правого угла)
    snake() // отрисовываем змейку
    food()
    pass()
    direction()
    eatFood()
    ballResult()
    snakeSpeed()
}
setInterval(snakeAnimation, 10) // Задаем интервал (в мс)

console.log(`Координаты яблока: x: ${foodArr[0].x}, y: ${foodArr[0].y}`)
console.log(`Координаты змейки: x: ${snakeArr[0].x}, y: ${snakeArr[0].y}`)






