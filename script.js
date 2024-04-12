// LINKS ====>

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const titleInput = document.getElementById("title");
  const urlInput = document.getElementById("url");
  const listaLinks = document.getElementById("lista");

  // cramos el almacenbamiento en el localSt
  const links = JSON.parse(localStorage.getItem("links")) || [];
  function renderizarLinks() {
    listaLinks.innerHTML = "";
    links.forEach((link) => {
      const li = document.createElement("li");
      li.className = "link-item";
      const a = document.createElement("a");

      if (link.title.length > 12) {
        a.textContent = link.title.substring(0, 12) + "..."; // .substring(0, 3) extrae los primeros tres caracteres del título
      } else {
        a.textContent = link.title;
      }
      a.href = link.url;
      a.target = "_blank";

      const borrar = document.createElement("button");
      borrar.className = "borrar-btn";
      borrar.innerHTML = "&#10006;"; // Utilizamos el carácter Unicode para "x"
      borrar.addEventListener("click", () => {
        const index = links.indexOf(link);
        links.splice(index, 1); // eliminamos un elemento del array links
        localStorage.setItem("links", JSON.stringify(links));
        renderizarLinks();
      });

      li.appendChild(a);
      li.appendChild(borrar);
      listaLinks.appendChild(li);
    });
  }

  // Añadir un nuevo link

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = titleInput.value.trim(); // .trim para eliminar los espacios en blanco iniciales y finales de una cadena de texto.
    const url = urlInput.value.trim();

    if (title && url) {
      const newLink = { title, url };
      links.push(newLink);
      localStorage.setItem("links", JSON.stringify(links));
      renderizarLinks();
      titleInput.value = "";
      urlInput.value = "";
    } else {
      alert("Please fill in both fields.");
    }
  });

  renderizarLinks();
});

// FONDO DE PANTALLA ====>

const imageUrls = [
  "https://images.unsplash.com/photo-1712417827761-7a68ff4a90f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1712350529878-c1924ecb1b9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1508080616348-b9b19ce377b9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1491487605692-1435b9dcac08?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1712315481719-63b726304264?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function setRandomBackground() {
  // URL aleatoria
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];

  document.body.style.backgroundImage = `url('${randomImageUrl}')`;

  document.body.style.backgroundSize = "cover !important";
}

setRandomBackground();
setInterval(setRandomBackground, 15000);

// CONTRASEÑA ===>

document.addEventListener("DOMContentLoaded", function () {
  const generarContraseña = document.getElementById("generarContraseña");

  botonContraseña.addEventListener("click", function () {
    generatePassword();
  });
});

function generatePassword() {
  const longitud = document.getElementById("longitud").value;
  const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const simbolos = "!@#$%^&*()-_=+";

  let password = "";
  let mix = "";

  if (longitud < 12 || longitud > 50) {
    alert("La longitud de la contraseña debe estar entre 12 y 50 caracteres.");
    return;
  }
  // le aseguramos uno de cada y luego le restamos 4 para que concuerde con el numero que queremos
  password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
  password += minusculas[Math.floor(Math.random() * minusculas.length)];
  password += nums[Math.floor(Math.random() * nums.length)];
  password += simbolos[Math.floor(Math.random() * simbolos.length)];

  const longitud_2 = longitud - 4;

  mix += mayusculas;
  mix += minusculas;
  mix += nums;
  mix += simbolos;

  for (let i = 0; i < longitud_2; i++) {
    const randomIndex = Math.floor(Math.random() * mix.length);
    password += mix[randomIndex];
  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  const passwordContainer = document.getElementById("passwordContainer");
  const passwordElement = document.getElementById("password");
  passwordElement.textContent = password;
  passwordContainer.style.display = "block";
}

// RELOJ DIGITAL ====>

function reloj() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  // añadimos ceros delante si son menores que 10
  hours = padZero(hours);
  minutes = padZero(minutes);
  seconds = padZero(seconds);
  day = padZero(day);
  month = padZero(month);

  document.getElementById(
    "reloj"
  ).innerHTML = `${hours}:${minutes}:${seconds} `;

  document.getElementById("fecha-reloj").innerHTML = `${day}/${month}/${year}`;

  let message = "";

  if (hours >= 0 && hours < 7) {
    message = "Es hora de descansar. Apaga y sigue mañana";
  } else if (hours >= 7 && hours < 12) {
    message = "Buenos días, desayuna fuerte y a darle al código";
  } else if (hours >= 12 && hours < 14) {
    message = "Echa un rato más pero no olvides comer";
  } else if (hours >= 14 && hours < 16) {
    message = "Espero que hayas comido";
  } else if (hours >= 16 && hours < 18) {
    message = "Buenas tardes, el último empujón";
  } else if (hours >= 18 && hours < 22) {
    message = "Esto ya son horas extras, piensa en parar pronto";
  } else {
    message = "Buenas noches, es hora de pensar en parar y descansar";
  }

  let mensajeHora = document.getElementById("mensaje-reloj");
  mensajeHora.innerHTML = message;
}

// ponemos el 0 delante

function padZero(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

reloj();
setInterval(reloj, 1000);

// ESTACION METEOROLOGICA =====>

const claveAPI = "5f7b1cfbd7c041cab34101351240504";
const ciudad = "Valladolid";

async function obtenerTiempoActual() {
  try {
    const respuesta = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${claveAPI}&q=${ciudad}`
    );
    const datos = await respuesta.json();

    document.getElementById("ciudad").textContent = datos.location.name;
    document.getElementById("pais").textContent = datos.location.country;
    document.getElementById("tiempo").textContent =
      datos.current.condition.text;
    document.getElementById("temperatura").textContent = datos.current.temp_c;
    document.getElementById("precipitaciones").textContent =
      datos.current.precip_mm + " mm";
    document.getElementById("humedad").textContent =
      datos.current.humidity + " %";
    document.getElementById("viento").textContent =
      datos.current.wind_kph + " km/h";
    document.getElementById("icono-clima").src = datos.current.condition.icon;
  } catch (error) {
    console.error("Error al obtener los datos del clima:", error);
  }
}

async function pronosticoHora() {
  try {
    const respuesta = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${claveAPI}&q=${ciudad}&days=1`
    );
    const datos = await respuesta.json();
    const pronosticoPorHora = datos.forecast.forecastday[0].hour.slice(0, 12); // las primeras 12 horas

    const contenedorPronosticoHora = document.getElementById(
      "pronostico-por-hora"
    );
    contenedorPronosticoHora.innerHTML = "";

    pronosticoPorHora.forEach((hora) => {
      const elementosHora = document.createElement("div");
      elementosHora.classList.add("hora");

      const horaFormateada = new Date(
        hora.time_epoch * 1000
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      elementosHora.innerHTML = `
        <p>${horaFormateada}</p>
        <img src="${hora.condition.icon}" alt="${hora.condition.text}">
        <p>${hora.temp_c}°C</p>
      `;

      contenedorPronosticoHora.appendChild(elementosHora);
    });
  } catch (error) {
    console.error("Error al obtener el pronóstico por hora:", error);
  }
}

obtenerTiempoActual();
pronosticoHora();
