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
    if (page === ´indexPage´) }
        document.getElementById(´registerButton´).addEventListener(´click´ ,function() {
            window.location.href = ´register.html´ ;
        });

        document.getElementById('loginButton').addEventListener('click',function() {
            window.location.href = 'login.html';

        });

    