//Nodes
const descCard = document.querySelectorAll('.service-order__item')
const checkboxesGroup = document.querySelectorAll('.service-order__checboxes-group')
const checkBoxes = document.querySelectorAll('.service-order__checkbox') 

//Init functions
checkboxesHeight()
checkBoxOpacity()
checkBoxes.forEach(e => e.addEventListener('click', checkBoxOpacity))

window.addEventListener('resize', (e)=>{
    checkboxesHeight()
})
// Изменяет прозначность текста при активации чекбокса на секции порядок оказания услуг
function checkBoxOpacity(){
    const inputs = document.querySelectorAll('.service-order__checkbox input')
    let activeId
    inputs.forEach((e,i)=>{
         if(e.checked){
             activeId = i
         }
    })
    descCard.forEach((e,j)=>{
       e.style.opacity = 0.5
       if(j === activeId){
         e.style.opacity = 1
       }
    })
 }

// Адаптирует высоту чекбокса под высоту текста, 
//чтобы квадраты и линии были такой же высоты, как и текстовые блоки
 function checkboxesHeight(){
    const heights = []

    descCard.forEach((e) => {heights.push(e.offsetHeight)})

    checkboxesGroup.forEach((e,i)=>{   
        e.style.height = `${heights[i]}px`
    })
}
