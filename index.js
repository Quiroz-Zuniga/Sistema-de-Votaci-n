function SaveUserData (username,email, password){
    localStorage.setItem('Username' ,username );
    localStorage.setItem( 'email' , email );
    localStorage.setItem('password' , password);
}

function getUserData() {
    return{
        username: localStorage.getItem('username'),
        email: localStorage.getItem( 'email'),
        password: localStorage.getItem('password')
    };
}         
//Ejecutar cuando el DOM este completamente cargado
document.addEventListener('DOMContentLoaded') , function() {
    //Identificar la pagina actual
    const page = document.body.id;

    //Codigo para la pagina de inicio (index.html)
    if (page === 'indexPage') {
        document.getElementById('registerButton').addEventListener('click',function() {
            window.location.href = 'register.html' ;
        });

        document.getElementById('loginButton').addEventListener('click',function() {
            window.location.href = 'login.html';

        });
    }
}
// codigo para la pagina de registro (register.html)
if (page ==='registerPage') {
document.getElementById('registerForm').addEventListener('submin' , function(event){
event.preventDefault();
let username = document.getElementById('username').Value;
let email = document.getElementById('email').value;
let password = document.getElementById('password').value;
let confirmPassword =document.getElementById('confirm-password').value;

if(password === confirmPassword) {
    SaveUserData(username, email,password);
    alert('usuario registrado exitosamente. ');
    window.location.href = 'login.html';

}else{
    alert('Las contraseñas no coinciden. Porfavor,intentelo de nuevo.');
}
});
}
//codigo para la pagina de inicio de sesion (login.html)
if (page == 'loginpage') {
    const showPasswordCheckbox = document.getElementById('show-passeord');
    const passwordInput = document.getElementById('password');
    showPasswordCheckbox.addEventListener('change',function() {
        if(showPasswordCheckbox.checked ) {
            passwordInput.type = 'text';
        } else {
            passwordInpur.type = 'password';
        }

    }
 );}


document.getElementById ('loginForms')/addEventListener('submit',function(event){
    event.proventDefault();
    let email = this.document.getElementById('email')/value;
    let password = this.document.getElementById('password').value;
    let userData = getUserData();

    if(email === userData.email && password === userData.password){
        this.alert('inicio de sesion exitoso');
        window.location;href = 'home.html';

    } else {
        alert('correo electronico o contrseña incorrecos. por favor intentelo de nuevo.');

    }
});
