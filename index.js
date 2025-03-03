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