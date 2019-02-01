var signupForm = document.getElementById('signup_form');
var loginForm  = document.getElementById('login_form');
var signupBtn  = document.getElementsByClassName('signup_btn')[0];
var loginBtn   = document.getElementsByClassName('login_btn')[0];
var base_addr="http://192.168.100.162:3000";

function showLogin(){
    hiddenforms();
    loginForm.classList.remove('hide');
    loginBtn.classList.add('active');
}
function showSignup(){
    hiddenforms();
    signupForm.classList.remove('hide');
    signupBtn.classList.add('active');
}
function hiddenforms(){
    signupForm.classList.add('hide');
    loginForm.classList.add('hide');
    loginBtn.classList.remove('active');
    signupBtn.classList.remove('active');
}

loginForm.addEventListener('submit',function(event){
    event.preventDefault();
    let username = loginForm.username.value;
    let password = loginForm.password.value;
    console.log(username,password);
    if(validateUsername(username) && validatePassword(password)){
        login(username,password);    
    }
    
});

signupForm.addEventListener('submit',function(event){
    event.preventDefault();
    let username = signupForm.username.value;
    let password = signupForm.password.value;
    //console.log(username,password);
    if(validateUsername(username) && validatePassword(password)){
        registerUser(username,password);    
    }
    
});
function changePasswordtype(element){
    let passwordIcon = ["fa-eye-slash","fa-eye"];
    let form_id      = element.getAttribute('form-id');
    let data_focus   = Number(element.getAttribute('data-focus'));
    element.classList.remove(passwordIcon[data_focus]);
    data_focus++;
    data_focus%=2;
    element.classList.add(passwordIcon[data_focus]);
    element.setAttribute('data-focus',data_focus);
    if(form_id == "login_form" ){
        if(data_focus){
            loginForm.password.setAttribute('type','text');
        }
        else{
            loginForm.password.setAttribute('type','password');
        }
    }
    else if(form_id == "signup_form" ){
        if(data_focus){
            signupForm.password.setAttribute('type','text');
        }
        else{
            signupForm.password.setAttribute('type','password');
        }
    }
    console.log(form_id,data_focus);
}

async function registerUser(username,password){
    let url = base_addr+"/auth/register";
    let registerRequest = await fetch(url,
        {
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "username":username,
                "password":password
            })

        }
    );
    let result =await registerRequest.json();
    if(result['isSuccess']){
        localStorage.setItem('token',result['responseBody']['token']);
        window.location = "notepad.html";
    }
    else{
        alert(result['responseBody']['errorMessage']);
    }
}

async function login(username,password){
    let url = base_addr+'/auth/login';
    let registerRequest = await fetch(url,
        {
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "username":username,
                "password":password
            })

        }
    );
    let result =await registerRequest.json();
    if(result['isSuccess']){
        localStorage.setItem('token',result['responseBody']['token']);
        window.location = "notepad.html";
    }
    else{
        alert(result['responseBody']['errorMessage']);
    }
}
function validateUsername(username){
    let reg = /^[A-Za-z0-9]+$/;
    //console.log(reg,username);
    if(username == ''){
        alert('username is empty');
        return false;
    }
    else if(!reg.test(username)){
        alert('Invalid username');
        return false;
    }
    else{
        return true;
    }
}

function validatePassword(password){
    let reg = RegExp("[A-Za-z0-9*+$-]{6,}");
    //console.log(reg,password);
    if(password ==''){
        alert('password is empty');
        return false;
    }
    else if(!reg.test(password)){
        alert('password should contain minimum of six letters');
        return false;
    }
    else{
        return true;
    }
}