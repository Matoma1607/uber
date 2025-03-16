document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("viajeForm");
    const destinoTexto = document.getElementById("destinoMostrar");
    const tarifaTexto = document.getElementById("tarifaMostrar");
    const pagoLink = document.getElementById("pagoLink");
    const aliasTexto = document.getElementById("aliasTexto");
    const btnUbicacion = document.getElementById("obtenerUbicacion");
    const inputUbicacion = document.getElementById("ubicacionTexto");
    const btnWhatsapp = document.getElementById("enviarWhatsapp");

    // **Alias de Mercado Pago (MODIFICAR CON EL REAL)**
    const aliasMP = "0000003100016853369708";

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let destino = document.getElementById("destino").value.trim();

        if (!destino) {
            Swal.fire("Error", "Por favor, ingresa un destino válido.", "error");
            return;
        }

        // Simulación de distancia aleatoria (de 1 a 10 km)
        let distancia = Math.floor(Math.random() * 10) + 1;

        // Cálculo de tarifa: Mínimo $2000 + $500 o $1000 según distancia
        let tarifa = 2000;
        if (distancia > 5) {
            tarifa += 1000;
        } else {
            tarifa += 500;
        }

        // Generar enlace de pago con Mercado Pago
        let urlPago = `https://link.mercadopago.com.ar/${aliasMP}`;

        // Mostrar información
        destinoTexto.innerHTML = `Destino: ${destino}`;
        tarifaTexto.innerHTML = `Tarifa: $${tarifa}`;
        pagoLink.href = urlPago;
        aliasTexto.innerText = aliasMP;
    });

    btnUbicacion.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    let lat = pos.coords.latitude;
                    let lon = pos.coords.longitude;
                    let urlUbicacion = `https://maps.google.com/?q=${lat},${lon}`;
                    inputUbicacion.value = urlUbicacion;
                    btnWhatsapp.disabled = false;
                },
                (error) => {
                    alert("No se pudo obtener la ubicación. Activa el GPS y revisa los permisos.");
                }
            );
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    });

    btnWhatsapp.addEventListener("click", () => {
        let ubicacion = inputUbicacion.value;
        let mensaje = encodeURIComponent(`Hola, aquí está mi ubicación: ${ubicacion}`);
        window.open(`https://wa.me/?text=${mensaje}`, "_blank");
    });
});
