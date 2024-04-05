document.addEventListener("DOMContentLoaded", function () {
  const generarContraseña = document.getElementById("generarContraseña");

  generarContraseña.addEventListener("click", function () {
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
