export let usuarios = [];


document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('usuarios')) {
        let cadenaUsuarios = localStorage.getItem('usuarios');
        usuarios = JSON.parse(cadenaUsuarios);
        console.log(usuarios);
    }
});

    
const registro = document.getElementById('registro');
registro.addEventListener('click', (e)=>{
    e.preventDefault();
    let emailreg = document.getElementById('emailreg').value;
    let passreg = document.getElementById('passreg').value;
    let pass2reg = document.getElementById('pass2reg').value;
    
    if (passreg === pass2reg ) {
        console.log('Contraseñas coinciden');
    } else {
        console.error('Contraseñas no coinciden')
        return;
    }

    console.log(emailreg);
    console.log(passreg);

    usuarios.push({email:emailreg, pass:passreg});

    let cadenaUsuarios = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', cadenaUsuarios);

    console.log(usuarios);
});