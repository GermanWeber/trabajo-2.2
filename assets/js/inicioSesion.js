let usuarios = [];

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('usuarios')) {
        let cadenaUsuarios = localStorage.getItem('usuarios');
        usuarios = JSON.parse(cadenaUsuarios);
        console.log(usuarios);
    }
});

const login = document.getElementById('login');
login.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value; 

    let usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.pass === pass);

    if (usuarioEncontrado) {
        console.log('Inicio de sesión exitoso');

    } else {
        console.error('Usuario o contraseña incorrectos');
    }
});
