import { usuarios } from "./registroCuenta.js";

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
