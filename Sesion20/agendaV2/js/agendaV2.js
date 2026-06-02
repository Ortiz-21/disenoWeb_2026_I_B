document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const guardarButton = document.getElementById("guardarbtn");
    const buscarButton = document.getElementById("buscarbtn");
    const elimiarButton = document.getElementById("eliminarbtn");
    const eliminarTButton = document.getElementById("eliminarTbtn");

    const listaContactos = document.getElementById("listaContactos");

    function guardarDatos() {
        const nombre = nombreInput.value.trim();
        const telefono = telefonoInput.value.trim();

        if (nombre === "" || telefono === " ") {
            alert("Por favor, completa ambos campos")
            return;
        }
        localStorage.setItem(nombre, telefono);
        nombreInput.value = "";
        telefonoInput.value = "";

        actualizarDatos();
    }

    function buscarDatos() {
        const nombreABuscar = nombreInput.value.trim();

        if (nombreABuscar === "") {
            alert("Escribe un nombre en el campo para buscar")
            return;
        }

        const telefonoEncontrado = localStorage.getItem(nombreABuscar);

        if (telefonoEncontrado) {
            telefonoInput.value = telefonoEncontrado;
        } else {
            alert("No se encontró ningún contacto con ese nombre");
            telefonoInput.value = "";

        }

    }

    function eliminarDatos() {
        const nombreAEliminar = nombreInput.value.trim();

        if (nombreAEliminar === "") {
            alert("Escribe un nombre en el campo para eliminar")
            return;
        }

        if (localStorage.getItem(nombreAEliminar)) {
            localStorage.removeItem(nombreAEliminar);
            nombreInput.value = "";
            telefonoInput.value = "";
            actualizarDatos();
        } else {
            alert("El nombre no existe en la agenda");

        }

    }

    function eliminarTodos() {
        if (localStorage.length === 0) {
            alert("La agenda esta vacia");
            return;
        }

        if (confirm("¿Estas seguro de eliminar todo?")) {
            localStorage.clear();
            nombreInput.value = "";
            telefonoInput.value = "";
            actualizarDatos();
        }

    }

    function actualizarDatos() {
        listaContactos.innerHTML ="";
        for (let i = 0; i < localStorage.length; i++) {
            const nombre = localStorage.key(i);
            const telefono = localStorage.getItem(nombre);

            const fila = document.createElement("tr");
            fila.innerHTML = "<td>" + nombre + "</td><td>" + telefono + "</td>";
            listaContactos.appendChild(fila);
        }
    }


    guardarButton.addEventListener("click", guardarDatos);
    buscarButton.addEventListener("click", buscarDatos);
    elimiarButton.addEventListener("click", eliminarDatos);
    eliminarTButton.addEventListener("click", eliminarTodos);

    actualizarDatos();

})