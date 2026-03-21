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

// 3. Desvanecer el header al hacer scroll
const nav = document.querySelector("nav"); // Seleccionamos la barra de navegación

window.addEventListener("scroll", () => {
  // Este efecto solo se aplica en pantallas de escritorio (mayores a 768px),
  // donde la barra de navegación es fija.
  if (window.innerWidth > 768) {
    const scrollY = window.scrollY;
    const fadeEnd = window.innerHeight * 0.5; // El desvanecimiento terminará al 50% de la altura de la pantalla

    if (scrollY < fadeEnd) {
      // Calculamos la opacidad: será 1 al inicio (scroll 0) y 0 al llegar a fadeEnd
      const opacity = 1 - scrollY / fadeEnd;
      nav.style.opacity = opacity;
      nav.style.visibility = "visible";
      nav.style.pointerEvents = "auto"; // Permitir clics
    } else {
      nav.style.opacity = 0;
      nav.style.visibility = "hidden";
      nav.style.pointerEvents = "none"; // Evitar que el nav invisible bloquee clics
    }
  } else {
    // En móvil, la barra no es fija, así que nos aseguramos de que siempre sea visible.
    nav.style.opacity = 1;
    nav.style.visibility = "visible";
    nav.style.pointerEvents = "auto";
  }
});

// 4. Animación de entrada para las cards al hacer scroll
const cards = document.querySelectorAll(".card");

const observerOptions = {
  root: null, // Observa en relación al viewport
  rootMargin: "0px",
  threshold: 0.1, // La animación se activa cuando el 10% del elemento es visible
};

const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // Si el elemento está visible en la pantalla
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      // Una vez que la animación se ejecuta, dejamos de observar el elemento para no repetirla
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Le decimos al observador que vigile cada una de las cards
cards.forEach((card) => {
  cardObserver.observe(card);
});
