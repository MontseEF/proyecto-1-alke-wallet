$(document).ready(function () {

  // Protección
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  // Mostrar saldo
  const saldo = localStorage.getItem("saldo");
  $("#saldoActual").text(
    saldo ? Number(saldo).toLocaleString("es-CL") : "0"
  );

  // Mostrar última transacción
  const transacciones = JSON.parse(
    localStorage.getItem("transacciones") || "[]"
  );

  if (transacciones.length > 0) {
    const ultima = transacciones[transacciones.length - 1];
    const montoFmt = Number(ultima.monto).toLocaleString("es-CL");

    $("#ultimaTransaccion").text(
      `${ultima.tipo}: $${montoFmt}`
    );
  } else {
    $("#ultimaTransaccion").text("Sin movimientos");
  }

  // Logout
  $("#btnLogout").on("click", function () {
    localStorage.clear();
    window.location.href = "../index.html";
  });

});
