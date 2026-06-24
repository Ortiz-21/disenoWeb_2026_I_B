document.addEventListener("DOMContentLoaded", () => {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const emailInput = document.getElementById("email");
    const direccionInput = document.getElementById("direccion");
    
    const guardarBtn = document.getElementById("guardarBtn");
    const buscarBtn = document.getElementById("buscarBtn");
    const eliminarBtn = document.getElementById("eliminarBtn");
    const eliminarTodosBtn = document.getElementById("elimTodoBtn");
    const ordenarBtn = document.getElementById("ordenarBtn");
    const listaContactos = document.getElementById("listaContactos");

    let ordenAscendente = true;

    function guardarDatos() {
        const nombre = nombreInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const email = emailInput.value.trim();
        const direccion = direccionInput.value.trim();

        
        if (nombre === "") {
            alert("Por favor, introduce al menos el nombre del contacto.");
            return;
        }
        
        const contactoNuevo = { 
            telefono: telefono || "", 
            email: email || "", 
            direccion: direccion || "" 
        };
        
        localStorage.setItem(nombre, JSON.stringify(contactoNuevo));
        
        limpiarCampos();
        actualizarDatos();
    }

    function buscarDatos() {
        const nombreABuscar = nombreInput.value.trim();
        if (!nombreABuscar) {
            alert("Escribe un nombre en el campo para poder buscar");
            return;
        }

        const datosStr = localStorage.getItem(nombreABuscar);

        if (datosStr) {
            try {
                const datos = JSON.parse(datosStr);
                telefonoInput.value = datos.telefono || "";
                emailInput.value = datos.email || "";
                direccionInput.value = datos.direccion || "";
            } catch (e) {
                alert("El elemento encontrado no es un contacto válido.");
            }
        } else {
            alert("No se encontró ningún contacto con ese nombre");
            limpiarCampos();
        }
    }

    function eliminarDatos() {
        const nombreAEliminar = nombreInput.value.trim();
        if (!nombreAEliminar) {
            alert("Escribe un nombre para poder eliminarlo");
            return;
        }

        if (localStorage.getItem(nombreAEliminar)) {
            localStorage.removeItem(nombreAEliminar);
            limpiarCampos();
            actualizarDatos();
        } else {
            alert("El nombre especificado no existe");
        }
    }

    function eliminarTodos() {
        if (localStorage.length === 0) {
            alert("La agenda está vacía");
            return;
        }

        if (confirm("¿Estás seguro de que deseas eliminar toda la agenda?")) {
            localStorage.clear();
            limpiarCampos();
            actualizarDatos();
        }
    }

    function actualizarDatos() {
        listaContactos.innerHTML = "";
        let contactosArray = [];

        for (let i = 0; i < localStorage.length; i++) {
            const nombre = localStorage.key(i);
            const datosStr = localStorage.getItem(nombre);
            
            try {
                const datos = JSON.parse(datosStr);
                
                if (datos && (datos.telefono !== undefined || datos.email !== undefined)) {
                    contactosArray.push({
                        nombre: nombre,
                        telefono: datos.telefono || "",
                        email: datos.email || "",
                        direccion: datos.direccion || ""
                    });
                }
            } catch (e) {
                
            }
        }
        
        // Ordenar
        contactosArray.sort((a, b) => 
            ordenAscendente ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
        );

        // Renderizar filas
        contactosArray.forEach(contacto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><strong>${contacto.nombre}</strong></td>
                <td>${contacto.telefono}</td>
                <td>${contacto.email}</td>
                <td>${contacto.direccion}</td>
            `;
            
            // Rellenar formulario al hacer clic en la fila
            fila.addEventListener("click", () => {
                nombreInput.value = contacto.nombre;
                telefonoInput.value = contacto.telefono;
                emailInput.value = contacto.email;
                direccionInput.value = contacto.direccion;
            });

            listaContactos.appendChild(fila);
        });
    }

    function alternarOrden() {
        ordenAscendente = !ordenAscendente;
        ordenarBtn.textContent = ordenAscendente ? "Sort: A-Z" : "Sort: Z-A";
        actualizarDatos();
    }
    
    function limpiarCampos() {
        nombreInput.value = "";
        telefonoInput.value = "";
        emailInput.value = "";
        direccionInput.value = "";
    }

    guardarBtn.addEventListener("click", guardarDatos);
    buscarBtn.addEventListener("click", buscarDatos);
    eliminarBtn.addEventListener("click", eliminarDatos);
    eliminarTodosBtn.addEventListener("click", eliminarTodos);
    ordenarBtn.addEventListener("click", alternarOrden);

    
    actualizarDatos();
});