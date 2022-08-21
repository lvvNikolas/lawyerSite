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
            sendingCompleteHtml("sending")
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
                sendingCompleteHtml("send")
            }
        }else{
            console.log(error)
        }

}

// FORM VALIDATION -------------------------------
function validateErrors(form){
    let err = 0
    let req = document.querySelectorAll('.mb-3 > input')
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