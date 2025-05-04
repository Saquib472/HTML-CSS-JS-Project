const customCheckboxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressValue = document.querySelector('.progress-value')
const goalContainerSec = document.querySelector('.goal-container-sec')
const goalContainer = document.querySelector('.goal-container')
const addBtn = document.querySelector('.addbtn')
let pValue = localStorage.getItem('pValue') || 0
progressValue.style.width = pValue + '%'
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoals = Number(localStorage.getItem('completedGoals')) || 0
progressValue.childNodes[0].innerText = `${completedGoals}/${inputFields.length} Completed`

customCheckboxList.forEach((checkbox)=>{
    if(Object.keys(allGoals).length > 0){
        if(allGoals[checkbox.nextElementSibling.id]['completed']){
            checkbox.parentElement.classList.add('completed')
        }else{
            checkbox.parentElement.classList.remove('completed')
        }
    }
    checkbox.addEventListener('click', (e)=>{
        const allpass = [...inputFields].every(node =>{
            return node.value != ''
        })  
        if(allpass){
            checkbox.parentElement.classList.toggle('completed')
            if([...checkbox.parentElement.classList].includes('completed')){
                allGoals[checkbox.nextElementSibling.id]['completed'] = true
                localStorage.setItem('allGoals', JSON.stringify(allGoals))
                completedGoals +=1
                localStorage.setItem('completedGoals', completedGoals)
                progressValue.childNodes[0].innerText = `${completedGoals}/${inputFields.length} Completed`
                pValue = completedGoals/inputFields.length * 100
                progressValue.style.width = pValue + '%'
                localStorage.setItem('pValue', pValue)
            }else{
                allGoals[checkbox.nextElementSibling.id]['completed'] = false
                localStorage.setItem('allGoals', JSON.stringify(allGoals))
                completedGoals -=1
                localStorage.setItem('completedGoals', completedGoals)
                progressValue.childNodes[0].innerText = `${completedGoals}/${inputFields.length} Completed`
                pValue = completedGoals/inputFields.length * 100
                progressValue.style.width = pValue + '%'
                localStorage.setItem('pValue', pValue)
            }
        }else{
            errorLabel.parentElement.classList.add('show-error')
        }
    })
})

inputFields.forEach(el =>{
    if(Object.keys(allGoals).length > 0){  
        el.value = allGoals[el.id]['goalName']
    }
    el.addEventListener('focus', (e)=>{
        errorLabel.parentElement.classList.remove('show-error')
    })
    el.addEventListener('keydown', (e)=>{
        if([...el.parentElement.classList].includes('completed')){
            e.preventDefault()
        }
    })
    el.addEventListener('input', (e)=>{
        if([...el.parentElement.classList].includes('completed')){
            e.preventDefault()
        }else{
            allGoals[el.id] = {
                goalName : el.value,
                completed : false
            }
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
    })
})

let inputFieldsAfterAdd = inputFields.length
let addedExtraGoals = 0
let addedExtraGoalOrNot = false
addBtn.addEventListener('click', (e)=>{
    addedExtraGoalOrNot = true
    localStorage.setItem('addedExtraGoalOrNot' , addedExtraGoalOrNot)
    ++addedExtraGoals
    localStorage.setItem('addedExtraGoals', addedExtraGoals)
    ++inputFieldsAfterAdd
    localStorage.setItem('inputFieldsAfterAdd', inputFieldsAfterAdd)

    const copyNode = goalContainer.cloneNode(true)
    copyNode.classList.remove('completed')
    copyNode.lastElementChild.value = ''
    copyNode.lastElementChild.id = inputFieldsAfterAdd == 4 ? 'fourth' : 'fifth'
    goalContainerSec.appendChild(copyNode)   
    console.log(copyNode)
    console.log(goalContainerSec.lastElementChild)
    progressValue.childNodes[0].innerText = `${completedGoals}/${inputFieldsAfterAdd} Completed`
    pValue = completedGoals/(inputFieldsAfterAdd) * 100
    progressValue.style.width = pValue + '%'
    console.log(goalContainerSec.lastElementChild.firstElementChild)
    goalContainerSec.lastElementChild.firstElementChild.addEventListener('click', (e)=>{
    const allpass = [...inputFields].every(node =>{
        return node.value != ''
    })

    })
})