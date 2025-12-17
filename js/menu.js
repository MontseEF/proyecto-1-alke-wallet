$(document).ready(function () {

  // Protección de la página
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  // Mostrar saldo 
  const saldo = localStorage.getItem("saldo");

  if (saldo) {
    const saldoFormateado = Number(saldo).toLocaleString("es-CL");
    $("#saldoActual").text(saldoFormateado);
  } else {
    $("#saldoActual").text("0");
  }

  // Cerrar sesión
  $("#btnLogout").on("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "../index.html";
  });

});
