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
