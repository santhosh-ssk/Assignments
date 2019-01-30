var toddleList  = null;
var lastItemId  = null;
var content    = document.getElementById("content");


//fetch toddlelist from localStorage
toddleList = localStorage.getItem('toddleList');
lastItemId = localStorage.getItem('lastIdemId');
console.log(toddleList,lastItemId)

//check whether there are some items in toddleList 
if(!toddleList || !lastItemId){
    toddleList=[];
    lastItemId=0;
}
else{
    toddleList = JSON.parse(toddleList);
    lastItemId = Math.floor(Number(lastItemId));
}

//add all the items to content
toddleList.forEach(element => {
    content.innerHTML += '<div class="item" id="'+element._id+'"><i class="fas fa-times-circle" close="close" ></i><span>'+element.text+'<br>Id: '+element._id+'</span></div>';
});


//addlisener to form submit
var form = document.getElementsByTagName('form')[0];
form.addEventListener('submit',function(event){
    event.preventDefault();
    var key = form.searchkey.value;
    if(key){
        addItem(key);
    }
})

function addItem(text){
    var element={
        _id  : lastItemId,
        text : text
    }
    toddleList.push(element);

    //additem in dom
    content.innerHTML += '<div class="item" id="'+element._id+'"><i class="fas fa-times-circle" close="close"></i><span>'+element.text+'<br>Id: '+element._id+'</span></div>';

    //save it in localStorage
    localStorage.setItem('toddleList',JSON.stringify(toddleList));
    localStorage.setItem('lastIdemId',lastItemId);
    lastItemId++;
}


content.addEventListener('click',function(event){
    item = event.target.getAttribute('close');
    console.log(item)
    if(item){
        item = event.target.parentElement;
        console.log(item);

        var element_id = item.getAttribute('id');
        var index = getElementIndex(toddleList,element_id);
        
        //remove element from dom
        item.parentNode.removeChild(item);
        
        //remove it from list
        toddleList.splice(index,1);
        
        //update localstorage
        localStorage.setItem('toddleList',JSON.stringify(toddleList));

    }
});

function getElementIndex(arraylist,key){
    var pos=-1;
    for(var i = 0; i< arraylist.length;i++){
        //console.log(arraylist[i])
        if(arraylist[i]._id == key){
            pos=i;
            break;
        }
    }
    return pos;
}

