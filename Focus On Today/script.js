let customCheckboxList = document.querySelectorAll('.custom-checkbox')
let inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
let progressValue = document.querySelector('.progress-value')
let goalContainerSec = document.querySelector('.goal-container-sec')
let goalContainer = document.querySelector('.goal-container')
const addBtn = document.querySelector('.addbtn')
let pValue = localStorage.getItem('pValue') || 0
progressValue.style.width = pValue + '%'
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}
let completedGoals = Number(localStorage.getItem('completedGoals')) || 0
progressValue.childNodes[0].innerText = `${completedGoals}/${inputFields.length} Completed`

function checkBoxChecking() {
    customCheckboxList.forEach((checkbox) => {
        if ([...checkbox.classList].includes('exist')) {
            if([...checkbox.parentElement.classList].includes('completed')){
                checkbox.parentElement.classList.remove('completed')
            }
        } else {
            // if (Object.keys(allGoals).length > 0) {
            //     console.log(allGoals)
            //     console.log(checkbox.nextElementSibling.id)
            //     if (allGoals[checkbox.nextElementSibling.id]['completed']) {
            //         checkbox.parentElement.classList.add('completed')
            //     } else {
            //         checkbox.parentElement.classList.remove('completed')
            //     }
            // }
            checkbox.classList.add('exist')
            checkbox.addEventListener('click', (e) => {
                console.log('clicked')
                const allpass = [...inputFields].every(node => {
                    return node.value != ''
                })
                if (allpass) {
                    checkbox.parentElement.classList.toggle('completed')
                    if ([...checkbox.parentElement.classList].includes('completed')) {
                        console.log(checkbox.nextElementSibling.id)
                        // console.log(allGoals)
                        // allGoals[checkbox.nextElementSibling.id]['completed'] = true
                        // localStorage.setItem('allGoals', JSON.stringify(allGoals))
                        completedGoals += 1
                        // localStorage.setItem('completedGoals', completedGoals)
                        progressValue.childNodes[0].innerText = `${completedGoals}/${inputFields.length} Completed`
                        pValue = completedGoals / inputFields.length * 100
                        progressValue.style.width = pValue + '%'
                        // localStorage.setItem('pValue', pValue)
                    } else {
                        // allGoals[checkbox.nextElementSibling.id]['completed'] = false
                        // localStorage.setItem('allGoals', JSON.stringify(allGoals))
                        completedGoals -= 1
                        // localStorage.setItem('completedGoals', completedGoals)
                        progressValue.childNodes[0].innerText = `${completedGoals}/${inputFields.length} Completed`
                        pValue = completedGoals / inputFields.length * 100
                        progressValue.style.width = pValue + '%'
                        // localStorage.setItem('pValue', pValue)
                    }
                } else {
                    errorLabel.parentElement.classList.add('show-error')
                    errorLabel.innerHTML = `Please Set All ${inputFields.length} Goals`
                }
            })
        }
    })
}
checkBoxChecking()

function inputFieldsCheck() {
    console.log('intu')
    inputFields.forEach(el => {
        if ([...el.classList].includes('exist')) {
            console.log('true')
        } else {
            console.log('herererererererererererererereererererererer')
            el.classList.add('exist')
            // if (Object.keys(allGoals).length > 0) {
            //     el.value = allGoals[el.id]['goalName']
            // }
            el.addEventListener('focus', (e) => {
                errorLabel.parentElement.classList.remove('show-error')
            })
            el.addEventListener('keydown', (e) => {
                if ([...el.parentElement.classList].includes('completed')) {
                    e.preventDefault()
                }
            })
            el.addEventListener('input', (e) => {
                console.log('here')
                if ([...el.parentElement.classList].includes('completed')) {
                    e.preventDefault()
                } else {
                    allGoals[el.id] = {
                        goalName: el.value,
                        completed: false
                    }
                    // localStorage.setItem('allGoals', JSON.stringify(allGoals))
                }
            })
        }
    })

}
inputFieldsCheck()
function makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// let inputFieldsAfterAdd = inputFields.length
// let addedExtraGoals = 0
// let addedExtraGoalOrNot = false
addBtn.addEventListener('click', (e) => {
    // addedExtraGoalOrNot = true
    // localStorage.setItem('addedExtraGoalOrNot' , addedExtraGoalOrNot)
    // ++addedExtraGoals
    // localStorage.setItem('addedExtraGoals', addedExtraGoals)
    // ++inputFieldsAfterAdd
    // localStorage.setItem('inputFieldsAfterAdd', inputFieldsAfterAdd)

    // const copyNode = goalContainer.cloneNode(true)
    // copyNode.classList.remove('completed')
    // copyNode.lastElementChild.value = ''
    // copyNode.lastElementChild.id = inputFieldsAfterAdd == 4 ? 'fourth' : 'fifth'
    // goalContainerSec.appendChild(copyNode)   
    // progressValue.childNodes[0].innerText = `${completedGoals}/${inputFieldsAfterAdd} Completed`
    // pValue = completedGoals/(inputFieldsAfterAdd) * 100
    // progressValue.style.width = pValue + '%'
    // goalContainerSec.lastElementChild.firstElementChild.addEventListener('click', (e)=>{
    //     const allpass = [...inputFields].every(node =>{
    //         return node.value != ''
    //     })
    //     const currentInputField =  copyNode.lastElementChild.id == 'fourth' && goalContainerSec.firstElementChild.lastElementChild.value ? true : copyNode.lastElementChild.id == 'fifth' && goalContainerSec.lastElementChild.lastElementChild.value ? true : false
    //     if(allpass && currentInputField){
    //         console.log('here')
    //     }else{
    //         errorLabel.parentElement.classList.add('show-error')
    //         console.log('herererererer')
    //     }

    // })
    let randomID = makeid()
    const copyNode = goalContainer.cloneNode(true)
    copyNode.classList.remove('completed')
    copyNode.firstElementChild.classList.remove('exist')
    copyNode.lastElementChild.classList.remove('exist')
    copyNode.lastElementChild.value = ''
    copyNode.lastElementChild.id = randomID
    goalContainerSec.appendChild(copyNode)

    customCheckboxList = document.querySelectorAll('.custom-checkbox')
    inputFields = document.querySelectorAll('.goal-input')
    progressValue = document.querySelector('.progress-value')
    goalContainer = document.querySelector('.goal-container')
    pValue = 0
    progressValue.style.width = pValue + '%'
    completedGoals = 0
    errorLabel.innerHTML = `Please Set All ${inputFields.length} Goals`
    progressValue.childNodes[0].innerText = `${completedGoals}/${inputFields.length} Completed`
    checkBoxChecking()
    inputFieldsCheck()
})