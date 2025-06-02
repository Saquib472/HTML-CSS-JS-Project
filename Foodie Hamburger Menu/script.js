const hamburgerMenu = document.querySelector('.hamburger-menu')
const navBar = document.querySelector('nav')
const closeIcon = document.querySelector('.close-icon')
const backToTop = document.querySelector('.back-to-top')
const mainContent= document.querySelector('.main-content')
hamburgerMenu.addEventListener('click', (e)=>{
    e.stopPropagation()
    navBar.classList.add('nav-menu-active')
    hamburgerMenu.classList.add('hamburger-menu-active')
})
closeIcon.addEventListener('click', ()=>{
    navBar.classList.remove('nav-menu-active')
    hamburgerMenu.classList.remove('hamburger-menu-active')
})
backToTop.addEventListener('click', ()=>{
    mainContent.scrollTo(0,0)
})
window.addEventListener('click', ()=>{
    navBar.classList.remove('nav-menu-active')
    hamburgerMenu.classList.remove('hamburger-menu-active')
})
navBar.addEventListener('click', (e)=>{
    e.stopPropagation()
})