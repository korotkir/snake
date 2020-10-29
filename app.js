// Подключение canvas
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth // Указываем ширину окна
canvas.height = window.innerHeight // Указываем высоту окна
let x = 0
let y = 30
let dx = 2
let dy = 2

let upPress = false
let downPress = false
let leftPress = false
let rightPress = false

document.addEventListener('keydown', KeyDownHandler, false)
document.addEventListener('key', KeyUpHandler, false)

// Кнопки
function KeyDownHandler(e) {
    if(e.keyCode == 38) {
        upPress = true
    }else if(e.keyCode == 40){
        downPress = true
    }else if(e.keyCode == 37){
        leftPress = true
    }else if(e.keyCode == 39){
        rightPress = true
    }
} 

function KeyUpHandler(e) {
    if(e.keyCode == 38) {
        upPress = false
    }else if(e.keyCode == 40){
        downPress = false
    }else if(e.keyCode == 37){
        leftPress = false
    }else if(e.keyCode == 39){
        rightPress = false
    }
}

// Функция отвечающая за отрисовку змейки
function snake() {
    ctx.beginPath()
    // Определяем прямоугольник
    ctx.rect(x,y,25,50) // (x, y, width, height)
    ctx.fillStyle = 'white' // указываем цвет прямоугольника
    ctx.fill() // отрисовка
    ctx.closePath()
    
}

function pass() {
    if(y >= canvas.height){
        y = 0
    }else if(y < 0){
        y = canvas.height
    }
    if(x >= canvas.width){
        x = 0
    }else if(x < 0){
        x = canvas.width
    }
}

function direction() {
    //x += -dx // тест по оси x
    //y += dy // тест по оси y
    if(upPress) {
        y += -dy 
    }else if(downPress) {
        y += dy
    }else if(leftPress) {
        x += -dx
    }else if(rightPress) {
        x += dx
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








