const textos = {
  es: { tituloLogin:"Iniciar Sesión", usuarioPlaceholder:"Usuario", clavePlaceholder:"Contraseña", botonLogin:"Entrar", noCuenta:"¿No tienes cuenta?", registrate:"Regístrate", tituloRegistro:"Registro de Usuario", nuevoUsuario:"Nuevo usuario (letras y números)", claveReg:"Contraseña (mín. 6 caracteres)", claveRegConfirm:"Confirmar contraseña", botonRegistro:"Registrarse", yaCuenta:"¿Ya tienes cuenta?", iniciaSesion:"Inicia sesión", exitoLogin:"✅ Inicio de sesión exitoso", exitoRegistro:"🎉 Registro exitoso", errorClave:"❌ Las contraseñas no coinciden", errorLogin:"❌ Usuario o contraseña incorrectos", bienvenida:"Bienvenido a MiniMind", instrucciones:"Selecciona una opción en el menú para continuar.", propiedades:"Propiedades", seguridad:"Seguridad de Datos", viasPago:"Métodos de Pago", trabajos:"Trabajos", busqueda:"Búsqueda", transacciones:"Transacciones" },
  en: { tituloLogin:"Log In", usuarioPlaceholder:"Username", clavePlaceholder:"Password", botonLogin:"Login", noCuenta:"Don't have an account?", registrate:"Register", tituloRegistro:"User Registration", nuevoUsuario:"New username", claveReg:"Password (min. 6 characters)", claveRegConfirm:"Confirm password", botonRegistro:"Register", yaCuenta:"Already have an account?", iniciaSesion:"Log In", exitoLogin:"✅ Login successful", exitoRegistro:"🎉 Registration successful", errorClave:"❌ Passwords do not match", errorLogin:"❌ Invalid username or password", bienvenida:"Welcome to MiniMind", instrucciones:"Select an option in the menu to continue.", propiedades:"Properties", seguridad:"Data Security", viasPago:"Payment Methods", trabajos:"Jobs", busqueda:"Search", transacciones:"Transactions" },
  pt: { tituloLogin:"Entrar", usuarioPlaceholder:"Usuário", clavePlaceholder:"Senha", botonLogin:"Entrar", noCuenta:"Não tem conta?", registrate:"Registrar-se", tituloRegistro:"Registro de Usuário", nuevoUsuario:"Novo usuário", claveReg:"Senha (mín. 6 caracteres)", claveRegConfirm:"Confirmar senha", botonRegistro:"Registrar", yaCuenta:"Já tem conta?", iniciaSesion:"Entrar", exitoLogin:"✅ Login realizado com sucesso", exitoRegistro:"🎉 Registro realizado com sucesso", errorClave:"❌ As senhas não coincidem", errorLogin:"❌ Usuário ou senha incorretos", bienvenida:"Bem-vindo ao MiniMind", instrucciones:"Selecione uma opção no menu para continuar.", propiedades:"Propriedades", seguridad:"Segurança de Dados", viasPago:"Métodos de Pagamento", trabalhos:"Trabalhos", busqueda:"Busca", transacciones:"Transações" }
};

const bienvenidaTexto = document.getElementById("bienvenidaTexto");
const instruccionesMenu = document.getElementById("instruccionesMenu");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");
const titulo = document.getElementById("titulo");
const langSelect = document.getElementById("langSelect");
const authContainer = document.getElementById("authContainer");
const menuPrincipal = document.getElementById("menuPrincipal");
const loginUsuario = document.getElementById("loginUsuario");
const loginClave = document.getElementById("loginClave");
const regUsuario = document.getElementById("regUsuario");
const regClave = document.getElementById("regClave");
const regClave2 = document.getElementById("regClave2");

function actualizarTextos(lang) {
  const t = textos[lang];
  titulo.textContent = loginForm.style.display !== "none" ? t.tituloLogin : t.tituloRegistro;
  loginUsuario.placeholder = t.usuarioPlaceholder;
  loginClave.placeholder = t.clavePlaceholder;
  loginForm.querySelector("button").textContent = t.botonLogin;
  document.getElementById("textoNoCuenta").textContent = t.noCuenta;
  document.getElementById("linkRegistro").textContent = t.registrate;
  regUsuario.placeholder = t.nuevoUsuario;
  regClave.placeholder = t.claveReg;
  regClave2.placeholder = t.claveRegConfirm;
  registerForm.querySelector("button").textContent = t.botonRegistro;
  document.getElementById("textoYaCuenta").textContent = t.yaCuenta;
  document.getElementById("linkLogin").textContent = t.iniciaSesion;
  document.getElementById("linkPropiedades").textContent = t.propiedades;
  document.getElementById("linkSeguridad").textContent = t.seguridad;
  document.getElementById("linkViasPago").textContent = t.viasPago;
  document.getElementById("linkTrabajos").textContent = t.trabajos;
  document.getElementById("linkBusqueda").textContent = t.busqueda;
  document.getElementById("linkTransacciones").textContent = t.transacciones;
  bienvenidaTexto.textContent = t.bienvenida;
  instruccionesMenu.textContent = t.instrucciones;
}
langSelect.addEventListener("change", () => actualizarTextos(langSelect.value));

// Mostrar formularios
function mostrarRegistro(){ loginForm.style.display="none"; registerForm.style.display="block"; titulo.textContent=textos[langSelect.value].tituloRegistro; mensaje.textContent=""; }
function mostrarLogin(){ registerForm.style.display="none"; loginForm.style.display="block"; titulo.textContent=textos[langSelect.value].tituloLogin; mensaje.textContent=""; }
window.mostrarRegistro = mostrarRegistro;
window.mostrarLogin = mostrarLogin;


// Guardar usuario
registerForm.addEventListener("submit", e => {
  e.preventDefault();
  const t = textos[langSelect.value];
  if(regClave.value !== regClave2.value){
    mensaje.style.color="#d9534f"; mensaje.textContent=t.errorClave; return;
  }
  localStorage.setItem("user_"+regUsuario.value, regClave.value);
  localStorage.setItem("sesionActiva","true");
  mensaje.style.color="#28a745"; mensaje.textContent=t.exitoRegistro;
  setTimeout(()=>{ authContainer.style.display="none"; menuPrincipal.style.display="block"; },1000);
});

// Login
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const t = textos[langSelect.value];
  const user=loginUsuario.value, pass=loginClave.value;
  const stored=localStorage.getItem("user_"+user);
  if(stored && stored===pass){
    localStorage.setItem("sesionActiva","true");
    mensaje.style.color="#28a745"; mensaje.textContent=t.exitoLogin;
    setTimeout(()=>{ authContainer.style.display="none"; menuPrincipal.style.display="block"; },1000);
  }else{
    mensaje.style.color="#d9534f"; mensaje.textContent=t.errorLogin;
  }
});

// Cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", e=>{
  e.preventDefault();
  localStorage.setItem("sesionActiva","false");
  menuPrincipal.style.display="none";
  authContainer.style.display="block";
  mostrarLogin();
});

// Al cargar, mostrar login o menú según sesión
if(localStorage.getItem("sesionActiva")==="true"){
  authContainer.style.display="none";
  menuPrincipal.style.display="block";
}else{
  authContainer.style.display="block";
  menuPrincipal.style.display="none";
}
actualizarTextos(langSelect.value);

const API_URL = "http://localhost:8080/backend"; // ⚠️ Ajusta si usas otro puerto

// Registro
registerForm.addEventListener("submit", async e => {
  e.preventDefault();
  const t = textos[langSelect.value];
  const usuario = regUsuario.value.trim();
  const clave = regClave.value.trim();
  const clave2 = regClave2.value.trim();

  if (clave !== clave2) {
    mensaje.style.color = "#d9534f";
    mensaje.textContent = t.errorClave;
    return;
  }

  const res = await fetch(`${API_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, clave })
  });
  const data = await res.json();
  mensaje.style.color = data.ok ? "#28a745" : "#d9534f";
  mensaje.textContent = data.msg;
  if (data.ok) setTimeout(mostrarLogin, 1000);
});

// Login
loginForm.addEventListener("submit", async e => {
  e.preventDefault();
  const t = textos[langSelect.value];
  const usuario = loginUsuario.value.trim();
  const clave = loginClave.value.trim();

  const res = await fetch(`${API_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, clave })
  });

  const data = await res.json();
  mensaje.style.color = data.ok ? "#28a745" : "#d9534f";
  mensaje.textContent = data.msg;

  if (data.ok) {
    localStorage.setItem("sesionActiva", "true");
    setTimeout(() => {
      authContainer.style.display = "none";
      menuPrincipal.style.display = "block";
    }, 1000);
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.setItem("sesionActiva", "false");
  menuPrincipal.style.display = "none";
  authContainer.style.display = "block";
  mostrarLogin();
});
