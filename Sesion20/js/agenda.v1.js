document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const guardarButton = document.getElementById("guardarbtn");
    const recuperarButton = document.getElementById("recuperarbtn");
    const listaUL = document.getElementById("lista");

    function guardarDatos() {
        localStorage.nombre = nombreInput.value;
        localStorage.telefono = telefonoInput.value;
    }

    function recuperarDatos() {
        if (localStorage.nombre != undefined && 
            localStorage.telefono != undefined) {
            //aca va el codigo principal 
            listaUL.innerHTML += "<li>" + localStorage.nombre + 
            " - " + localStorage.telefono + "</li>"; 
        } else {
            //Mensaje de validacion 
            listaUL.innerHTML = "<li>No hay dato guardados</li>";
        }


    }
    guardarButton.addEventListener("click", guardarDatos);
    recuperarButton.addEventListener("click", recuperarDatos);
})