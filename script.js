// 1. Efecto de desplazamiento suave al hacer clic en el menú
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// 2. Envío de formulario a WhatsApp
const formulario = document.querySelector(".form-contacto");

formulario.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que la página se recargue

  // Capturamos los valores que escribió el usuario
  const nombre = document.getElementById("nombre").value;
  const equipo = document.getElementById("equipo").value;
  const problema = document.getElementById("problema").value;

  // AQUÍ DEBES PONER TU NÚMERO
  // Usa el código de país (549 para Argentina), el código de área sin el 0 y el número sin el 15.
  // Ejemplo: Si tu número es 011 15-1234-5678, debes poner "5491112345678"
  const numeroWhatsApp = "5492214007244";

  // Armamos el mensaje. Los "%0A" son saltos de línea (Enters) para que quede prolijo.
  const mensaje = `¡Hola! Necesito una consulta técnica.%0A%0A*Mi nombre:* ${nombre}%0A*Mi equipo:* ${equipo}%0A*El problema:* ${problema}%0A%0A¿Me podrías asesorar?`;

  // Creamos el enlace oficial de la API de WhatsApp
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

  // Abrimos el enlace en una pestaña nueva
  window.open(url, "_blank");

  // Limpiamos el formulario después de enviar
  formulario.reset();
});
