document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("viajeForm");
    const destinoTexto = document.getElementById("destinoMostrar");
    const tarifaTexto = document.getElementById("tarifaMostrar");
    const pagoLink = document.getElementById("pagoLink");
    const aliasTexto = document.getElementById("aliasTexto");

    // Alias de Mercado Pago (MODIFICAR CON EL REAL)
    const aliasMP = "0000003100016853369708";
    aliasTexto.innerText = aliasMP;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let destino = document.getElementById("destino").value.trim();
        if (!destino) {
            Swal.fire("Error", "Por favor, ingresa un destino válido.", "error");
            return;
        }

        // Tarifa: Base $2000, aumento de $500 o $1000 según distancia estimada
        let tarifa = 2000;
        if (destino.length > 8) tarifa += 500; 
        if (destino.length > 15) tarifa += 1000;

        // Enlace de pago con Mercado Pago
        let urlPago = `https://link.mercadopago.com.ar/${aliasMP}`;

        // Mostrar información
        destinoTexto.innerHTML = `Destino: ${destino}`;
        tarifaTexto.innerHTML = `Tarifa: $${tarifa.toFixed(2)}`;
        pagoLink.href = urlPago;
    });

    // Obtener ubicación del usuario y abrir en Google Maps
    document.getElementById("ubicacionBtn").addEventListener("click", () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
                },
                function (error) {
                    alert("Error al obtener la ubicación: " + error.message);
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    });

    // Enviar ubicación por WhatsApp
    document.getElementById("whatsappUbicacion").addEventListener("click", () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    let mapsURL = `https://www.google.com/maps?q=${lat},${lon}`;
                    let numeroChofer = "5493811234567";
                    let mensaje = `Hola, aquí está mi ubicación para el viaje: ${mapsURL}`;
                    let whatsappURL = `https://wa.me/${numeroChofer}?text=${encodeURIComponent(mensaje)}`;
                    window.open(whatsappURL, "_blank");
                },
                function (error) {
                    alert("Error al obtener la ubicación: " + error.message);
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    });
});
