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
  // Este efecto se aplica en todas las pantallas.
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

// 5. Menú hamburguesa para móvil
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".overlay");

const toggleNav = () => {
  // Activa la animación de entrada/salida del menú
  navLinks.classList.toggle("nav-active");
  // Anima el botón hamburguesa para que se convierta en una 'X'
  hamburger.classList.toggle("toggle");
  // Muestra u oculta el overlay
  overlay.classList.toggle("overlay-active");
};

// Abrir/cerrar el menú al hacer clic en el botón
hamburger.addEventListener("click", toggleNav);

// Cerrar el menú al hacer clic en el overlay
overlay.addEventListener("click", () => {
  if (navLinks.classList.contains("nav-active")) {
    toggleNav();
  }
});

// Cerrar el menú al hacer clic en uno de los enlaces (para que el usuario vea la sección a la que navegó)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("nav-active")) {
      toggleNav();
    }
  });
});
