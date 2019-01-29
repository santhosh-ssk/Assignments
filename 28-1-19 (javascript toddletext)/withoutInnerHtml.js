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
    content.innerHTML += '<div class="item" id="'+element._id+'"><i class="fas fa-times-circle"></i><span>'+element.text+'<br>Id: '+element._id+'</span></div>';
});

//addlisener's to each item in contents
itemsListener(); 

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
    //content.innerHTML += '<div class="item" id="'+element._id+'"><i class="fas fa-times-circle"></i><span>'+element.text+'<br>Id: '+element._id+'</span></div>';
    
    var itemtag = document.createElement('div');
    itemtag.setAttribute("class","item");
    itemtag.setAttribute("id",element._id);
    itemtag.innerHTML = '<i class="fas fa-times-circle"></i><span>'+element.text+'<br>Id: '+element._id+'</span>';
    
    /*var iTag = document.createElement('i');
    iTag.setAttribute("class","fas fa-times-circle");
    var spanTag  = document.createElement('span');
    var textnode = document.createTextNode(element.text); 
    spanTag.appendChild(textnode);
    itemtag.appendChild(iTag);
    itemtag.appendChild(spanTag);
    */
   
    content.appendChild(itemtag);
    
    //addlistener to item
     var item = document.getElementById(element._id);
     addlisener(item);
    
   
    //save it in localStorage
    localStorage.setItem('toddleList',JSON.stringify(toddleList));
    localStorage.setItem('lastIdemId',lastItemId);
    lastItemId++;
}


//for all the item in the content add event listener
function itemsListener(){
    var items = document.getElementsByClassName('item');
    for(var i=0;i<items.length;i++){
        addlisener(items[i]);
    }
}

//pass html item element
function addlisener(item){
    // var close_btn= item.getElementsByTagName('i')[0];
    var close_btn=item;
    close_btn.addEventListener('click',function(){

        //find element index in toddlelist
        var element_id = item.getAttribute('id');
        var index = getElementIndex(toddleList,element_id);
        
        //remove element from dom
        item.parentNode.removeChild(item);
        
        //remove it from list
        toddleList.splice(index,1);
        
        //update localstorage
        localStorage.setItem('toddleList',JSON.stringify(toddleList));
    });
    
}

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

