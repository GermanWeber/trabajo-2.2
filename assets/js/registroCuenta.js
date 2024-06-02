let usuarios = [];

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('usuarios')) {
        let cadenaUsuarios = localStorage.getItem('usuarios');
        usuarios = JSON.parse(cadenaUsuarios);
        console.log(usuarios);
    }
});

const registro = document.querySelector('#registro');
registro.addEventListener('click', (e) => {
    e.preventDefault();
    let emailreg = document.getElementById('emailreg').value;
    let passreg = document.getElementById('passreg').value;
    let pass2reg = document.getElementById('pass2reg').value;


    let userExistente = usuarios.find(user => user.email === emailreg);
    if (userExistente) {
        alert('Email ya existente.');
        return;
    }


    if (passreg === pass2reg) {
        usuarios.push({ email: emailreg, pass: passreg });
        console.log(emailreg, passreg, pass2reg);
        console.table(usuarios);
    } else {
        alert('Las contraseñas no coinciden.');
    }

    let cadenaUsuarios = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', cadenaUsuarios);
});

