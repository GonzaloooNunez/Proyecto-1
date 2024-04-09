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

async function obtenerPronosticoPorHora() {
  try {
    const respuesta = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${claveAPI}&q=${ciudad}&days=1`
    );
    const datos = await respuesta.json();
    const pronosticoPorHora = datos.forecast.forecastday[0].hour.slice(0, 12); // las primeras 12 horas

    const contenedorPronosticoPorHora = document.getElementById(
      "pronostico-por-hora"
    );
    contenedorPronosticoPorHora.innerHTML = "";

    pronosticoPorHora.forEach((hora) => {
      const elementoHora = document.createElement("div");
      elementoHora.classList.add("hora");

      const horaFormateada = new Date(
        hora.time_epoch * 1000
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      elementoHora.innerHTML = `
        <p>${horaFormateada}</p>
        <img src="${hora.condition.icon}" alt="${hora.condition.text}">
        <p>${hora.temp_c}°C</p>
      `;

      contenedorPronosticoPorHora.appendChild(elementoHora);
    });
  } catch (error) {
    console.error("Error al obtener el pronóstico por hora:", error);
  }
}

window.onload = function () {
  obtenerTiempoActual();
  obtenerPronosticoPorHora();
  agregarBarraDesplegable();
};
