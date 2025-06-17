const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const mensaje = document.getElementById("mensaje");
const titulo = document.getElementById("titulo");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

function mostrarRegistro() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  titulo.textContent = "Registrarse";
  mostrarMensaje("", "");
}

function mostrarLogin() {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  titulo.textContent = "Iniciar Sesión";
  mostrarMensaje("", "");
}

function guardarUsuario(usuario, clave) {
  localStorage.setItem("usuario", usuario);
  localStorage.setItem("clave", clave);
}

function obtenerUsuario() {
  return {
    usuario: localStorage.getItem("usuario"),
    clave: localStorage.getItem("clave")
  };
}

// Validación de usuario: letras y números, mínimo 4 caracteres
function validarUsuario(usuario) {
  return /^[a-zA-Z0-9]{4,}$/.test(usuario);
}

// Validación de contraseña: al menos 6 caracteres, una letra y un número
function validarClave(clave) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(clave);
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("regUsuario").value.trim();
  const pass1 = document.getElementById("regClave").value;
  const pass2 = document.getElementById("regClave2").value;

  if (!validarUsuario(user)) {
    mostrarMensaje("El usuario debe tener al menos 4 caracteres (solo letras y números).", "error");
  } else if (!validarClave(pass1)) {
    mostrarMensaje("La contraseña debe tener mínimo 6 caracteres e incluir letras y números.", "error");
  } else if (pass1 !== pass2) {
    mostrarMensaje("Las contraseñas no coinciden.", "error");
  } else {
    guardarUsuario(user, pass1);
    mostrarMensaje("Registro exitoso. Ahora inicia sesión.", "exito");
    mostrarLogin();
  }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("loginUsuario").value.trim();
  const pass = document.getElementById("loginClave").value;

  const datos = obtenerUsuario();

  if (user === "" || pass === "") {
    mostrarMensaje("Completa todos los campos.", "error");
  } else if (user !== datos.usuario) {
    mostrarMensaje("Usuario no registrado.", "error");
  } else if (pass !== datos.clave) {
    mostrarMensaje("Contraseña incorrecta.", "error");
  } else {
    mostrarMensaje("¡Bienvenido, " + user + "!", "exito");
  }
});
