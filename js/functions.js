const cardId='5d84c58f8d45f05490c03225'
const key='3980e9887394ee42fb72d04db7b10450'
const token = '4a40c29905df89e03a8b827ca61946bcac944858cc66227eb6b7f6fd3f4c6e70'
function getChecklist()
{
    fetch(`https://trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`)
    .then(response=>response.json())
    .then((json)=>{
        let checklists=document.querySelector('.checklists')
        json.forEach(element => {
            checklists.appendChild(buildChecklist(element))
        });
        addEventListenerOnForms()
    })
}
function buildChecklist(element){
            
    let checklist = document.createElement('div')
    checklist.setAttribute('class',"checklist")
    checklist.setAttribute('data-listId',element["id"])

    checklist.appendChild(buildCheckListHeader(element))
    checklist.appendChild(buildCheckListItems(element))

    let addButton = document.createElement('button')
    addButton.innerText= "Add Item"
    addButton.setAttribute('data-Button',element['pos'])
    addButton.setAttribute('class',"addCheckItem")
    checklist.appendChild(addButton)
    checklist.appendChild(addCheckListItemform())
    return checklist
}
function addCheckListItemform()
{
    let form = document.createElement('form')
    form.setAttribute('class','addCheckItem')
    checkItemInput = document.createElement('input')
    checkItemInput.setAttribute('type','text')

    let insertButton = document.createElement('input')
    insertButton.value='Add-Chek-Item'
    insertButton.setAttribute('class','insertCheckItem')
    insertButton.setAttribute('type','submit')
        
    let cancelButton = document.createElement('input')
    cancelButton.setAttribute('type','button')
    cancelButton.value='X'
    cancelButton.setAttribute('class','cancel')
    
    form.appendChild(checkItemInput)
    form.appendChild(insertButton)
    form.appendChild(cancelButton)
    form.style.display ="none"
    return form
}
function  buildCheckListHeader(element)
{
    let checkListName = document.createElement('div')
    checkListName.setAttribute('class',"checklist-name")
    
    let pTag = document.createElement('p')
    pTag.innerText = element["name"]
    pTag.setAttribute('class','listName')
    
    let btn = document.createElement('button')
    btn.innerText= "X"
    btn.setAttribute('class',"deleteCheckist")
    
    let form = document.createElement('form')
    form.setAttribute('class','updateChecklist')
    let text = document.createElement('input')
    text.setAttribute('type',"text")
    
    let upDateButton = document.createElement('input')
    upDateButton.setAttribute('type','submit')
    upDateButton.setAttribute('class','updateCheckListButton')
    upDateButton.value = "Update"
    form.appendChild(text)
    form.appendChild(upDateButton)
    form.style.display="none"
    checkListName.appendChild(pTag)
    checkListName.appendChild(form)
    checkListName.appendChild(btn)
    
    return checkListName
            
}
function buildCheckListItems(element)
{
    let checkListItems = document.createElement('div')
    checkListItems.setAttribute('class','checklist-items')
    let checkListData=element["checkItems"]
    checkListData.forEach(checkListItem =>{
        checkListItems.appendChild(builDChecklistItem(checkListItem))
    })
    return checkListItems
}
function builDChecklistItem(checkListItem)
{
    let state=false
        
        let div = document.createElement('div')
        div.setAttribute('class',"checklist-item")
        div.setAttribute('data-CheckId',checkListItem["id"])
        let p = document.createElement('p')
        p.setAttribute('class',"checkItemText")
        p.innerText = checkListItem["name"]
        if(checkListItem["state"]=='complete')
        {
            state=true
            p.style.textDecoration="line-through"
       
        }
        let checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.setAttribute('class','checkBox')
        checkbox.checked=state
        
       let button = document.createElement('button')
        button.innerText="X"
        button.setAttribute('class','delete-btn')
        div.appendChild(checkbox)
        div.appendChild(p)
        div.appendChild(button)
        return div
}
function deleteCheckListItem(event){
    let checklistId = event.path[1].dataset['checkid']; 
    fetch(`https://api.trello.com/1/cards/${cardId}/checkItem/${checklistId}?key=${key}&token=${token}`,{method:'DELETE'})
    .then((res)=>{
        document.querySelector(`div[data-CheckId="${checklistId}"]`).remove()
    })
}
function addNewCheckListItem(event)
{
    let checkListItemvalue = event.path[0][0].value
    event.path[0][0].value=''
    let checkListId=event.path[1].dataset["listid"]
    let checkList = document.querySelector(`div[data-listId="${checkListId}"]`)
    let checkListItems = checkList.querySelector(".checklist-items")
       
    fetch(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkListItemvalue}&pos=bottom&checked=false&key=${key}&token=${token}`,{method:'POST'})
    .then((response)=>response.json())
    .then((list)=>{
        checkListItems.appendChild(builDChecklistItem(list))
    }).catch((err)=>console.log(err))
}
function deleteCheckList(event){
    let checkListId = event.path[2].dataset["listid"]
    fetch(`https://api.trello.com/1/checklists/${checkListId}?key=${key}&token=${token}`,{method:'DELETE'})
    .then((response)=>document.querySelector(`div[data-listid="${checkListId}"]`).remove())
}
function changeState(event){
    let checkItemId = event.path[1].dataset["checkid"]
    let checked= event.target.checked
    let status =''
    if(checked==true)
    {
        status="complete"
        event.path[1].children[1].style.textDecoration ="line-through"
    }
    else{
        status= "incomplete"
        event.path[1].children[1].style.textDecoration ="none"
    }
    fetch(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=${status}&key=${key}&token=${token}`,{method:"PUT"})
    .then((rese)=>{
       
    })
}
function addNewCheckList(event){
    let checkListNameValue = this.event.path[0][0].value
    fetch(`https://api.trello.com/1/checklists?idCard=${cardId}&name=${checkListNameValue}&pos=bottom&key=${key}&token=${token}`,{method:"POST"})
    .then((response)=>response.json())
    .then((element)=>{
    document.querySelector(".checklists").appendChild(buildChecklist(element))
    addEventListenerOnForms()
    })  
}
function updateCheckList(event){
    let checkListId = this.event.path[2].dataset["listid"]
    let updatedCheckListName= this.event.path[0][0].value
    fetch( `https://api.trello.com/1/checklists/${checkListId}/name?value=${updatedCheckListName}&key=${key}&token=${token}`,{method:"PUT"})
    .then(()=>{
    event.path[1].children[0].innerText = updatedCheckListName
    event.path[0].style.display="none"
    event.path[1].children[0].style.display = "inline"
    })
}
function editCheckListName(event)
{
    let listName = this.event.path[0].innerText
        this.event.path[0].style.display = "none"
        let parentElement = this.event.path[1]
        parentElement.querySelector('form').style.display ="inline"
        parentElement.querySelector('input').value= listName
}
function editCheckItems(event){
    let checkItem = this.event.path[0]
        let checkItemParent = this.event.path[1]
        let checkitemtext = checkItem.innerText 
        let input =  document.createElement('input')
        input.setAttribute('type','text')
        input.value=checkitemtext
        let button= document.createElement('button')
        button.setAttribute('class','updateChecklistItem')    
        button.innerText="Update"
        checkItemParent.insertBefore(input,checkItem)
        checkItemParent.insertBefore(button,checkItem)
        checkItemParent.querySelector(".checkItemText").style.display= "none"
}
function updateCheckListItem(event)
{
    let updatedCheckItem = this.event.path[1].children[1].value
        let checkItemId = this.event.path[1].dataset["checkid"]
        fetch(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?name=${updatedCheckItem}&key=${key}&token=${token}`,{method:"PUT"})
       .then((res)=>{     
        event.path[1].children[1].remove()
        event.path[1].children[1].remove()
        event.path[1].children[1].style.display ="inline"
        event.path[1].children[1].innerText=updatedCheckItem
        })
    }