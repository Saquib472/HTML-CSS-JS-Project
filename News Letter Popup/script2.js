const openPopupBtn = document.querySelector('button')
const popUpModal = document.querySelector('.popup-container')
const closeIcon = document.querySelector('.close-icon')
const popUp = document.querySelector('.popup')

openPopupBtn.addEventListener('click', ()=>{
    popUpModal.classList.add('pop-open')
})

closeIcon.addEventListener('click', ()=>{
    popUpModal.classList.remove('pop-open')
})

popUpModal.addEventListener('click', ()=>{
    popUpModal.classList.remove('pop-open')
})

popUp.addEventListener('click', (e)=>{
    e.stopPropagation()
})