var list = document.getElementById('data');
console.log(list);
async function fetchposts(){
    let result = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if(result.status === 200 ){
        result     = await result.json();
        for(var i=0;i<result.length;i++){
            list.innerHTML += "<li> "+result[i]['id']+')  Title: '+ result[i]['title']+"</li>";
        }
    }
    else{
        console.log('error in fetching')
    }
}
fetchposts();