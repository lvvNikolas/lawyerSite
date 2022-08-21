const accordion = document.getElementsByClassName('contentBx')
for(i = 0; i <accordion.length; i++){
    accordion[i].addEventListener('click',function(){
        this.classList.toggle('active')
        const height = this.querySelector(".note__text").offsetHeight
        const content = this.querySelector(".content")
        if(this.classList.contains('active')){
            content.style.height = `${height + 10}px`
            content.style.marginTop = '20px'
        }else{
            content.style.height = `0px`
            content.style.marginTop = '0px'
        }
    })
   
}

const formHeight = document.querySelector('.main__form').offsetHeight
document.querySelector('.form__item').style.height = `${formHeight + 60}px`


// Form Modal 
function sendingCompleteHtml(state){
    const svg = {
        sending:`<?xml version="1.0" encoding="utf-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#8d46f6" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
        </svg>`,

        send:` <svg style="margin-top:32px" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#675CE9"/>
        <path d="M35 46.597L48.6883 62L69 38" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    }

    let modal = document.querySelector('.main__form')
    modal.style.position = 'relative'
    let element = document.createElement('div')
    if(state === "sending"){
        element.innerHTML = `
        <div class = "sending_body" style = "position:absolute; top:0; left:0; width:100%; height:100%; background:white; border-radius:32px;
        display:flex; flex-direction:column; justify-content:center; align-items:center; transition: 0.5s">
            ${svg.sending}
        </div>
        `
        modal.appendChild(element)
    }else if(state === "send"){
        element.innerHTML = `
        <div class = "sending_body" style = "position:absolute; top:0; left:0; width:100%; height:100%; background:white; border-radius:32px;
        display:flex; flex-direction:column; justify-content:center; align-items:center; transition: 0.5s">
            <h3 style = "color:#675CE9;">Заявка отправленна</h2>
            ${svg.send}
        </div>
        `
        modal.appendChild(element)
        setTimeout(()=>{
            element.querySelector('.sending_body').style.opacity = 0
        },1000)
    
        setTimeout(()=>{
            modal.removeChild(element)
        },2000)
    }
}



//FORM SEND DATA
const form = document.getElementById('form')
form.addEventListener('submit', sendForm)

async function sendForm(e){
    e.preventDefault()
    // Validator
    let error = validateErrors(form)
   
    let formData = new FormData(form)
        //Add loader here
        if(error === 0){
            // sendingCompleteHtml("sending")
            let response = await fetch('sendmail.php',{
                method: 'POST',
                body: formData
            })

            if(response.ok){
                let result = await response.json()
                // console.log(result)
                form.reset()
                // form.classList.remove('nowSending')
                // form.classList.add('sendingOk')
                // setInterval(()=>{
                //     form.classList.remove('sendingOk')
                // },500)
                // sendingCompleteHtml("send")
            }
        }else{
            console.log(error)
        }

}

// FORM VALIDATION -------------------------------
function validateErrors(form){
    let err = 0
    let req = document.querySelectorAll('input')
    req.forEach((e,i)=>{
        const input = e
        // formRemoveError(input)
        if(input.value === ''){
                // formAddError(input)
                err++
        }
     })
     return err;
}




//Card scroll
function cardScroll(){
    const scroll = document.addEventListener('scroll',(e)=>{
        const offset = document.querySelector('.main__header').getBoundingClientRect().top
        const height = document.querySelector('.main__header').offsetHeight
        const cardList = document.querySelector('.header__card-list')
        cardList.style.transform = `translateX(${offset}px)`
    })
}
cardScroll()