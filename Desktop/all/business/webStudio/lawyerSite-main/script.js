//Nodes
const descCard = document.querySelectorAll('.service-order__item')
const checkboxesGroup = document.querySelectorAll('.service-order__checboxes-group')
const checkBoxes = document.querySelectorAll('.service-order__checkbox')
//Переменные для страницы с практикой
const practiceGrid = document.querySelector('.practice__grid')
const practiceMoreBtn = document.querySelector('.practice__more-btn')
const practiceColumns = practiceGrid.querySelectorAll('.practice__grid-column')
const practiceGradient = practiceGrid.querySelector('.practice__grid-gradient')
const burgerInput = document.querySelector('.burger__input')
const burgerMenuContainer = document.querySelector('.nav__mobile-menu')


const loader = document.querySelector('.form__loader')

//Init functions
checkboxesHeight()
checkBoxOpacity()
textSpitter()
practiceMobileHandler()
checkBoxes.forEach(e => e.addEventListener('click', checkBoxOpacity))

window.addEventListener('resize', (e) => {
    checkboxesHeight()
    textSpitter()
    practiceMobileHandler()
})

// Изменяет прозначность текста при активации чекбокса на секции порядок оказания услуг
function checkBoxOpacity() {
    const inputs = document.querySelectorAll('.service-order__checkbox input')
    let activeId
    inputs.forEach((e, i) => {
        if (e.checked) {
            activeId = i
        }
    })
    descCard.forEach((e, j) => {
        e.style.opacity = 0.5
        if (j === activeId) {
            e.style.opacity = 1
        }
    })
}

// Адаптирует высоту чекбокса под высоту текста, 
//чтобы квадраты и линии были такой же высоты, как и текстовые блоки
function checkboxesHeight() {
    const heights = []

    descCard.forEach((e) => { heights.push(e.offsetHeight) })

    checkboxesGroup.forEach((e, i) => {
        e.style.height = `${heights[i]}px`
    })
}

//Функция для переноса текста в карточках, когда не хватает места тексту
function textSpitter() {
    const containers = document.querySelectorAll('.practice__grid-title')
    containers.forEach((e, i) => {
        const wrapper = e.querySelector('.grid-title__wrapper')   
        const splitters = e.querySelectorAll('.splitter')
        splitters.forEach((item, j) => {
            item.innerHTML = ''
        })
        if (wrapper.offsetWidth > e.offsetWidth) {
            splitters.forEach((item, j) => {
                item.innerHTML = '-<br>'
            })
        }
    })
}

//Функция для изменения высоты страницы "Практика", чтобы на мобильных телефонах"
// скрыть часть карточек
function practiceMobileHandler(){
    if(window.innerWidth < 768){
        const smallHeight = practiceColumns[0].offsetHeight
        practiceGrid.style.height = `${smallHeight+70}px` 
        practiceGradient.style.display = 'block'       
    }else{
        practiceGrid.style.height = `auto`
        practiceGradient.style.display = 'none'  
    }
}

//При нажатии на кнопку развернуть или свернуть окно с карточками на "Практике"
practiceMoreBtn.addEventListener('click',function(){
    this.classList.toggle('-btn--active')
    const text = this.querySelector('.practice__more-btn-text')
    if(this.classList.contains('-btn--active')){
        const arr = []
        practiceColumns.forEach(e => arr.push(e.offsetHeight))
        const fullHeight = arr.reduce((p,c)=>p+c)
        practiceGrid.style.height = `${fullHeight + 70}px` 
        text.innerHTML = "Меньше кейсов"
        practiceGradient.style.display = 'none'
    }else{
        const smallHeight = practiceColumns[0].offsetHeight
        practiceGrid.style.height = `${smallHeight + 70}px` 
        text.innerHTML = "Больше кейсов"
        practiceGradient.style.display = 'block'
    }
})

function renderPopup(text, time = 3000){
    const popup = document.createElement('div')
    popup.innerHTML = text
    popup.classList.add("form__popup")
    const body = document.querySelector('body')
    body.appendChild(popup)
    setTimeout(()=>{
        popup.classList.add('--popup_show')
    },10)
    setTimeout(()=>{
        popup.classList.remove('--popup_show')
    },time) 
    setTimeout(()=>{
        popup.remove()
    },time + 350) 
}

// setTimeout(()=>{
//     loader.classList.add('form__loader--show')
// },1000)

// setTimeout(()=>{
//     loader.classList.remove('form__loader--show')
//     renderPopup("Ваша заявка принята, спасибо!")
// },2000)

burgerInput.addEventListener('input', (e)=>{
    if(e.target.checked){
        burgerMenuContainer.classList.add('nav__mobile-menu--show')
    }
    if(!e.target.checked){
        burgerMenuContainer.classList.remove('nav__mobile-menu--show')
    }
})


