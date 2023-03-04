let usuarios = [
    {
        nombre: "Elizabeth",
        password: "123456",
        correo: "elizabethastudillo7@gmail.com"
    },
    {
        nombre: "Daniel",
        password: "123456",
        correo: "Danielap@gmail.com"
    },

]


document.getElementById("form-login").addEventListener("submit", function(event){
    event.preventDefault();
    let nombre = document.getElementById("login-nombre").value;
    let password = document.getElementById("login-password").value;

    let encontrado = usuarios.find(usuario => usuario.nombre == nombre && usuario.password == password)

    if(encontrado){
        alert("Usuario autenticado.");
        location.href= "./index.html";
    }else{
        alert("Datos incorrectos.");
    }
})