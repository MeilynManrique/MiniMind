const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const titulo = document.getElementById("titulo");

function mostrarRegistro() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  titulo.textContent = "Registrarse";
}

function mostrarLogin() {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  titulo.textContent = "Iniciar Sesión";
}

// Opcional: prevenir envío real de formularios
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Sesión iniciada correctamente.");
});

registerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Usuario registrado con éxito.");
});