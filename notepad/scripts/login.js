var signupForm = document.getElementById('signup_form');
var loginForm  = document.getElementById('login_form');
var signupBtn  = document.getElementsByClassName('signup_btn')[0];
var loginBtn   = document.getElementsByClassName('login_btn')[0];
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
    window.location = "notepad.html";
});

signupForm.addEventListener('submit',function(event){
    event.preventDefault();
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
