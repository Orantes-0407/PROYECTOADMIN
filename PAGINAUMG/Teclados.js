function cargarPagina(pagina) {
    fetch(pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar la página: " + response.status);
            }
            return response.text();
        })
        .then(data => {
            // Cargar el contenido de la página seleccionada en el div#contenido
            document.getElementById("contenido").innerHTML = data;

            // Agregar la página al historial de navegación para poder volver atrás
            history.pushState({ pagina: pagina }, "", pagina);
        })
        .catch(error => console.error("Error:", error));
}

// Manejar el evento popstate (cuando el usuario navega hacia atrás o adelante)
window.onpopstate = function (event) {
    if (event.state && event.state.pagina) {
        // Volver a cargar el contenido de la página al regresar en el historial
        cargarPagina(event.state.pagina);
    }
};

// Cargar la página inicial al cargar la aplicación
window.onload = function () {
    // Cargar la página inicial (por ejemplo, "inicio.html")
    cargarPagina("inicio.html");
};