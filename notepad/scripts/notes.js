var lastNoteId = localStorage.getItem('lastNoteId');
var Notes      = localStorage.getItem('Notes');
var description   = document.getElementById('description');
var menu         = document.getElementById('menu');
var deleteIcon   = document.getElementsByClassName('delete')[0];

if(!lastNoteId || !Notes){
    lastNoteId = 1;
    Notes      = {};
}
else{
    lastNoteId = Number(lastNoteId);
    Notes      = JSON.parse(Notes);
    let count=0;
    let firstnote=0;
    for(var note in Notes){
        menu.innerHTML += "<li id="+note+" data-id="+note+"><span class='note-content'>"+Notes[note]["description"]+"</span></li>";
        count++;
        if(count==1){
            firstnote=note;
        }
    }
    if(count>0){
        document.getElementById('_id').value=firstnote;
        description.value = Notes[firstnote]['description'];
    }
    else{
        //document.getElementById('_id').value="";
    }
}

description.addEventListener('keyup',(event)=>{
    var description = event.target.value;
    var _id         = document.getElementById('_id').value;
    if(!_id){
        //console.log("noo",_id)
        _id = lastNoteId;
        lastNoteId++;
        document.getElementById('_id').value=_id;
        menu.innerHTML += "<li id="+_id+" data-id="+_id+"><span class='note-content'>"+description+"</span></li>"
    }
    else{
        //console.log(_id);
        let liTag = document.getElementById(_id);
        liTag.innerHTML="<span class='note-content'>"+description+"</span>";
    }
    
    console.log(_id);
    Notes[_id]={
        "description" : description
    }
    localStorage.setItem('Notes',JSON.stringify(Notes));
    localStorage.setItem('lastNoteId',lastNoteId);
    //console.log(_id,title,description); 
});

menu.addEventListener('click',(event) => {
    let element = event.target;
    let dataId  = element.getAttribute('data-id');
    if(dataId){
        console.log(dataId);
        document.getElementById('_id').value=dataId;
        description.value = Notes[dataId]['description'];
    }
})

function addNote(){
    document.getElementById('_id').value="";
    description.value="";
}

deleteIcon.addEventListener('click',function(){
    let choice = window.confirm("Do you want to delete this note");
    if(choice){
        let _id   = document.getElementById('_id').value;
        let liTag = document.getElementById(_id);;
        delete Notes[_id];
        liTag.parentElement.removeChild(liTag);
        localStorage.setItem('Notes',JSON.stringify(Notes));
        addNote();        
    }
})