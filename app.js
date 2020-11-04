// Подключение canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth // Указываем ширину окна
canvas.height = window.innerHeight // Указываем высоту окна
//let x = 0
//let y = 30
let snakeWidth = 100
let snakeHeight = 100
let dx = 2
let dy = 2
let upPress = false
let downPress = false
let leftPress = false
let rightPress = false
let touchStart = null
let touchPosition = null
let sensitivity = 20 // Количество пикселей, считающиеся свайпом

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
        if(Math.abs(d.x) > sensitivity) {
            if(d.x > 0) {
                msg = 3
            } else {
                msg = 4
            }
        }
    }else{
        if(Math.abs(d.y) > sensitivity) {
            if(d.y > 0) {
                msg = 1
            } else {
                msg = 2
            }
    }
}
    //console.log(msg)
    if (msg == 1) {
        keyActivation(true,false,false,false)
    }else if (msg == 2) {
        keyActivation(false,true,false,false)
    }else if (msg == 3 && msg != 4) {
        keyActivation(false,false,true,false)
    }else if (msg == 4 && msg != 3) {
        keyActivation(false,false,false,true)
    }
}

// Кнопки
function KeyDownHandler(e) {
    if(e.keyCode == 38) {
        keyActivation(true,false,false,false)
    }else if(e.keyCode == 40){
        keyActivation(false,true,false,false)
    }else if(e.keyCode == 37 && e.keyCode != 39){
        keyActivation(false,false,true,false)
    }else if(e.keyCode == 39 && e.keyCode != 37){
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
    ctx.fillStyle = 'white' // указываем цвет прямоугольника
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

// Функция отвечающая за анимирование змейки
function snakeAnimation() {
    ctx.clearRect(0,0,canvas.width,canvas.height) //метод для очистки. (x и y у верхнего левого угла, x и y нижнего правого угла)
    snake() // отрисовываем змейку
    pass()
    direction()
}
setInterval(snakeAnimation, 10) // Задаем интервал (в мс)








