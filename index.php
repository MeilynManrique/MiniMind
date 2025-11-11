<?php
// ===== CONFIGURACIÓN DE CONEXIÓN =====
$host = "ep-dawn-bonus-a4weda1n-pooler.us-east-1.aws.neon.tech";        // Ej: ep-wispy-snow-a4hpcwhy-pooler.us-east-1.aws.neon.tech
$dbname = "neondb";
$user = "neondb_owner";
$pass = "npg_XgVRiG4Ts6dn";
$port = "5432";
$endpoint = "ep-dawn-bonus-a4weda1n";

try {
    $encoded_endpoint = urlencode("endpoint=$endpoint");
    $conn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require;options=$encoded_endpoint";

} catch (PDOException $e) {
    die("Error de conexión index: " . $e->getMessage());
}

// ===== PROCESO DE LOGIN =====
$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["accion"]) && $_POST["accion"] === "login") {
        $usuario = trim($_POST["usuario"]);
        $clave = trim($_POST["clave"]);

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre = :usuario");
        $stmt->execute(["usuario" => $usuario]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($clave, $user["contrasena"])) {
            session_start();
            $_SESSION["usuario"] = $user["nombre"];
            header("Location: index.php");
            exit;
        } else {
            $mensaje = "Usuario o contraseña incorrectos.";
        }
    }

    // ===== PROCESO DE REGISTRO =====
    if (isset($_POST["accion"]) && $_POST["accion"] === "registro") {
        $usuario = trim($_POST["usuario"]);
        $clave = trim($_POST["clave"]);
        $clave2 = trim($_POST["clave2"]);

        if ($clave !== $clave2) {
            $mensaje = "Las contraseñas no coinciden.";
        } else {
            $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nombre = :usuario");
            $stmt->execute(["usuario" => $usuario]);
            if ($stmt->fetch()) {
                $mensaje = "El usuario ya existe.";
            } else {
                $hash = password_hash($clave, PASSWORD_BCRYPT);
                $stmt = $conn->prepare("INSERT INTO usuarios (nombre, contrasena) VALUES (:usuario, :clave)");
                $stmt->execute(["usuario" => $usuario, "clave" => $hash]);
                $mensaje = "Usuario registrado exitosamente. Ahora puedes iniciar sesión.";
            }
        }
    }
}

// ===== CERRAR SESIÓN =====
session_start();
if (isset($_GET["logout"])) {
    session_destroy();
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MiniMind - Login y Registro Multilenguaje</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Login / Registro -->
  <div class="container" id="authContainer">
    <h2 id="titulo">Iniciar Sesión</h2>

    <select id="langSelect" aria-label="Seleccionar idioma">
      <option value="es">Español</option>
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>

    <div id="mensaje" class="mensaje"></div>

    <form id="loginForm">
      <input type="text" id="loginUsuario" placeholder="Usuario" required />
      <input type="password" id="loginClave" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
      <p><span id="textoNoCuenta">¿No tienes cuenta?</span> <a id="linkRegistro" onclick="mostrarRegistro()">Regístrate</a></p>
    </form>

    <form id="registerForm" style="display: none;">
      <input type="text" id="regUsuario" placeholder="Nuevo usuario" required />
      <input type="password" id="regClave" placeholder="Contraseña" required />
      <input type="password" id="regClave2" placeholder="Confirmar contraseña" required />
      <button type="submit">Registrarse</button>
      <p><span id="textoYaCuenta">¿Ya tienes cuenta?</span> <a id="linkLogin" onclick="mostrarLogin()">Inicia sesión</a></p>
    </form>
  </div>

  <!-- Menú principal -->
  <div class="menu-principal" id="menuPrincipal">
    <header>
      <nav class="top-nav">
        <a href="propiedades.html" id="linkPropiedades">Propiedades</a>
        <a href="seguridad.html" id="linkSeguridad">Seguridad de Datos</a>
        <a href="vias-pago.html" id="linkViasPago">Métodos de Pago</a>
        <a href="trabajos.html" id="linkTrabajos">Trabajos</a>
        <a href="busqueda.html" id="linkBusqueda">Búsqueda</a>
        <a href="control-transacciones.html" id="linkTransacciones">Transacciones</a>
        <a href="#" id="logoutBtn">🚪 Cerrar sesión</a>
      </nav>
    </header>
    <main>
      <h1 class="bienvenida" id="bienvenidaTexto">Bienvenido a MiniMind</h1>
      <p id="instruccionesMenu">Selecciona una opción en el menú para continuar.</p>
    </main>
  </div>

  <script src="script.js"></script>
</body>
</html>