const openPopupBtn = document.querySelector('button')
const popUpModal = document.querySelector('.popup-container')
const closeIcon = document.querySelector('.close-icon')
const overLay = document.querySelector('.overlay')

openPopupBtn.addEventListener('click', ()=>{
    popUpModal.classList.add('pop-open')
})

closeIcon.addEventListener('click', ()=>{
    popUpModal.classList.remove('pop-open')
})

overLay.addEventListener('click', ()=>{
    popUpModal.classList.remove('pop-open')
})