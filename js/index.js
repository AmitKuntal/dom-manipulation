window.addEventListener('load',getChecklist)
window.addEventListener('click',function(){
    if(event.target.className=='delete-btn')
    {
      deleteCheckListItem(event)
    }
    else if(this.event.target.className == 'addCheckItem')
    {
      event.path[0].style.display= "none"
      event.path[1].children[3].style.display="inline"
    }
    
    else if(this.event.target.className == 'deleteCheckist')
    {
        deleteCheckList(event)
    }
    else if (this.event.target.className == 'cancel')
    {
        this.event.path[1].style.display="none"
        this.event.path[2].children["2"].style.display="inline"
    }
    else if(this.event.target.className== 'listName')
    {
        editCheckListName(this.event)
    }
    else if(this.event.target.className == 'checkItemText')
    {
        editCheckItems(event)
    }
    else if(this.event.target.className == 'updateChecklistItem')
    {
        updateCheckListItem(event)
    }
    else if(this.event.target.className =="checkBox")
    {
        changeState(this.event)
    }
})
function addEventListenerOnForms(){
    let form = document.getElementsByTagName('form')
    Array.from(form).forEach(form=>{
        form.addEventListener('submit',function(){
            event.preventDefault()
             if(event.target.className=='addCheckItem')
             {
                addNewCheckListItem(event)
             }
            else if(event.target.className=='updateChecklist')
            {
                updateCheckList(event)
            }
            else if(event.target.className == 'addCheckList')
            {
                addNewCheckList(event)
            }
         })
    })
}