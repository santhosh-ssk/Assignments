//var lastNoteId = localStorage.getItem('lastNoteId');
var Notes      = {};

var notepad      = document.getElementsByClassName('news-board')[0];
var description  = document.getElementById('description');
var menu         = document.getElementById('menu');
var deleteIcon   = document.getElementsByClassName('delete')[0];
var base_addr="http://192.168.100.162:3000";

notepad.style.display = 'none';
//getAllNotes();
description.addEventListener('keyup',(event)=>{
    var description = event.target.value;
    var _id         = event.target.getAttribute('note-id');  
    event.target.setAttribute('flag',1);  
    let liTag = document.getElementById(_id);
    liTag.innerHTML="<span class='note-content' data-id="+_id+" >"+description+"</span>";
     if(_id != 'tmp'){
        liTag.setAttribute('data-id',_id);
        Notes[_id]={
            'description' : description
        }
        updateNote(_id,description);
    } 
});

menu.addEventListener('click',(event) => {
    let element = event.target;
    let dataId  = element.getAttribute('data-id');
    console.log(dataId);
    showNoteContent();
    if(dataId){
        showDescription(dataId);
    }
})

function addNote(){
    notepad.style.display = 'block';
    var flag        = description.getAttribute('flag');
    if(flag == 1){
        menu.innerHTML = "<li id='tmp'><span class='note-content' data-id='tmp' >Type here something</span></li>" + menu.innerHTML;
        description.value="";
        description.setAttribute('note-id','tmp');
        description.setAttribute('flag',0);
        description.setAttribute('placeholder',"Type something here");
        writeNote('');
    }
    else {  
        alert('You cannot create more then one note');  
    }
}

deleteIcon.addEventListener('click',function(){
    let choice = window.confirm("Do you want to delete this note");
    if(choice){
        let _id   = description.getAttribute('note-id');
        deleteNote(_id);
        deleteLiTag(_id);             
    }
})

async function writeNote(description){
    let url   = base_addr+'/notes';
    let token = 'Bearer ' + localStorage.getItem('token');
    let registerRequest = await fetch(url,
        {
            method: "post",
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            },
            body:JSON.stringify({
                description:description
            })

        }
    );
    let result =await registerRequest.json();

    if(result['isSuccess']){
        
        let _id = result['responseBody']['id'];
        let description = document.getElementById('description');
        description.setAttribute('note-id',_id);
        let flag = description.getAttribute('flag');
        let liTag = document.getElementById('tmp');
        liTag.setAttribute('id',_id);
        console.log('added')
        if(flag == 1){
            updateNote(_id,description.value);
        }
    }
    else{
        console.log(result['responseBody']['errorMessage']);
    }
}

async function updateNote(_id,description){
    let url   = base_addr+'/notes/'+_id;
    let token = 'Bearer ' + localStorage.getItem('token');
    let registerRequest = await fetch(url,
        {
            method: "put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            },
            body:JSON.stringify({
                description:description
            })

        }
    );
    let result =await registerRequest.json();

    if(result['isSuccess'] && result['responseBody']['isUpdated']){
        console.log('saved')
    }
    else{
        console.log(result['responseBody']['errorMessage']);
    }
}

async function getAllNotes(){
    let url   = base_addr+'/notes/';
    let token = 'Bearer ' + localStorage.getItem('token');
    let registerRequest = await fetch(url,
        {
            method: "get",
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            }
        }
    );
    let result =await registerRequest.json();

    if(result['isSuccess']){
        result = result['responseBody'];
        for(var i=0; i<result.length; i++){
            Notes[result[i]['id']]= result[i]['description'];
            menu.innerHTML = "<li id="+result[i]['id']+" data-id="+result[i]['id']+"><span class='note-content' data-id="+result[i]['id']+">"+result[i]["description"]+"</span></li>" + menu.innerHTML ;
        }
        if(result.length>0){
            let l = result.length-1;
            description.setAttribute('note-id',result[l]['id']);
            description.setAttribute('flag',1);
            description.value = result[l]['description'];
            notepad.style.display = 'block';
        }
        else{
            notepad.style.display = 'none';
        }
    }
    else{
        console.log(result['responseBody']['errorMessage']);
        alert('Invalid User');
        window.location = "index.html";
    }
}

async function deleteNote(_id){
    let url   = base_addr+'/notes/'+_id;
    let token = 'Bearer ' + localStorage.getItem('token');
    let registerRequest = await fetch(url,
        {
            method: "delete",
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            }

        }
    );
    let result =await registerRequest.json();

    if(result['isSuccess'] && result['responseBody']['isDeleted']){
        console.log('removed')
    }
    else{
        console.log(result['responseBody']['errorMessage']);
    }
}

function showDescription(dataId){
    let element = document.getElementById(dataId);
    description.value = element.childNodes[0].innerHTML;
    description.setAttribute('note-id',dataId);
    description.setAttribute('flag',1);
}

function deleteLiTag(_id){
    let liTag = document.getElementById(_id);
    let prevlitag = liTag.previousSibling;
    let nexlitag  = liTag.nextSibling;
    liTag.parentElement.removeChild(liTag);
    console.log(nexlitag,prevlitag);
    if(nexlitag && nexlitag.nodeName!='#text'){
        _id = nexlitag.getAttribute('id');
        showDescription(_id);
    }
    else if(prevlitag && prevlitag.nodeName!='#text'){
        _id = prevlitag.getAttribute('id');
        
        showDescription(_id);
    }
    else{
        hidecontent()
    }
}

function hidecontent(){
        description.setAttribute('note-id','tmp');
        description.setAttribute('flag',1);
        notepad.style.display = 'none';
}
console.log(window.innerWidth);

function showMenu(){
    let verticalmenu = document.getElementById('verticalmenu');
    let newsBoard   = document.getElementById('news-board');
    if(window.innerWidth<=420){
        verticalmenu.style.display = 'block';
        newsBoard.style.display    = 'none';
    }
}

function showNoteContent(){
    let verticalmenu = document.getElementById('verticalmenu');
    let newsBoard   = document.getElementById('news-board');
    if(window.innerWidth<=420){
        verticalmenu.style.display = 'none';
        newsBoard.style.display    = 'block';
    }
}