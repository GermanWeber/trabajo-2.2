const registro = document.getElementById('registro');
const login = document.getElementById('login');

let usuarios = [];

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('usuarios')) {
        let cadenaUsuarios = localStorage.getItem('usuarios');
        usuarios = JSON.parse(cadenaUsuarios);
        console.log(usuarios);
    }
});

registro.addEventListener('click', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    
    console.log(email);
    console.log(pass);

    usuarios.push({email:email, pass:pass});

    let cadenaUsuarios = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', cadenaUsuarios);

    console.log(usuarios);
});

login.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    
    const usuarioEncontrado = 
    usuarios.find(usuario => usuario.email === email && usuario.pass === pass);

    if (usuarioEncontrado) {
        console.log('Inicio de sesión exitoso');
    } else {
        console.error('Usuario o contraseña incorrectos');
    }
});




