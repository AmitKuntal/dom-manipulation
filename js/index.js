//const fetch = require('node-fetch')
const cardId='5d84c58f8d45f05490c03225'
const key='3980e9887394ee42fb72d04db7b10450'
const token = '4578a6b85ec2e82499e96a60196180c28f1c7b8ca662987e6bcad747406ee578'
window.addEventListener('load',getChecklist)
function getChecklist(){
    fetch(`https://trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`)
    .then(response=>response.json())
    .then((json)=>{
        let checklists=document.querySelector('.checklists')
        json.forEach(element => {
            let checklist = document.createElement('div')
            checklist.setAttribute('class',"checklist")
            checklist.setAttribute('data-listId',element["id"])

            let checkListName = document.createElement('div')
            checkListName.setAttribute('class',"checklist-name")
            checkListName.innerText = element["name"]
            checklist.appendChild(checkListName)

            let checkListItems = document.createElement('div')
            checkListItems.setAttribute('class','checklist-items')
            let checkListData=element["checkItems"]
            checkListData.forEach(list =>{
                let state=""
                if(list["state"]=='complete')
                {
                    state="checked"
                }
                let div = document.createElement('div')
                div.setAttribute('class',"checklist-item")
                div.setAttribute('data-CheckId',list["id"])
                div.innerHTML=`<input type=checkbox ${state}><p>${list["name"]}</p><button class='delete-btn'>X</button>`
                checkListItems.appendChild(div)
            })
            checklist.appendChild(checkListItems)
            let addButton = document.createElement('button')
            addButton.innerText= "Add Item"
            addButton.setAttribute('data-Button',element['pos'])
            addButton.setAttribute('class',"addCheckItem")
            checklist.appendChild(addButton)
            checklists.appendChild(checklist)
        });
    })
}

