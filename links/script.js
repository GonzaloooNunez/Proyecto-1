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
      a.textContent = link.title;
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
  "https://images.unsplash.com/photo-1712148911384-3bb74c258c95?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1711972978079-ca525a47dea4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1705091981942-be7a352516de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710170600723-9095d7d3a480?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1712030917862-f97ebc8a4a62?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1711126056288-da66a36bed7f?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1711950903476-cc92274c0f12?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1697215175168-c363c30539bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1711994017038-0a4a9b0de272?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1711999502041-2397c136267d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function setRandomBackground() {
  // URL aleatoria
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];

  document.body.style.backgroundImage = `url('${randomImageUrl}')`;
  document.body.style.backgroundSize = "100% ";
  document.body.style.backgroundPosition = "center";
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

  if (longitud > 0) {
    mix += mayusculas;
    mix += minusculas;
    mix += nums;
    mix += simbolos;

    for (let i = 0; i < longitud; i++) {
      const randomIndex = Math.floor(Math.random() * mix.length);
      password += mix[randomIndex];
    }

    const passwordContainer = document.getElementById("passwordContainer");
    const passwordElement = document.getElementById("password");
    passwordElement.textContent = password;
    passwordContainer.style.display = "block";
  }
}

// RELOJ DIGITAL ====>

/* actualizar el reloj digital y el mensaje según la hora.
Es llamada una vez al principio para inicializar el reloj y luego se establece un intervalo 1 segundo)
para que la función se llame automáticamente y actualice el tiempo en el reloj.*/

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  // Añadir ceros delante si son menores que 10
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

  document.getElementById("mensaje-reloj").innerHTML = message;
}

// Ponemos el 0 delante

function padZero(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

updateTime();
setInterval(updateTime, 1000);
