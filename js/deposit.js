$(document).ready(function () {

  // Protección de la página
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  // Inicializar saldo 
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "60000");
  }

  // Inicializar transacciones si no existen
  if (!localStorage.getItem("transacciones")) {
    localStorage.setItem("transacciones", JSON.stringify([]));
  }

  // Helpers saldo
  function getSaldo() {
    return parseInt(localStorage.getItem("saldo"));
  }

  function setSaldo(nuevoSaldo) {
    localStorage.setItem("saldo", nuevoSaldo.toString());
  }

  // Helpers transacciones
  function getTransacciones() {
    return JSON.parse(localStorage.getItem("transacciones"));
  }

  function setTransacciones(lista) {
    localStorage.setItem("transacciones", JSON.stringify(lista));
  }

  function getFechaActual() {
    const ahora = new Date();
    return ahora.toLocaleString("es-CL");
  }

  // Alertas
  function showAlert(message, type) {
    const alertHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    $("#alert-container").html(alertHTML);
  }

  // Depositar
  $("#btnDepositar").on("click", function () {
    const monto = parseInt($("#monto").val());

    if (isNaN(monto) || monto <= 0) {
      showAlert("Ingrese un monto válido", "danger");
      return;
    }

    const nuevoSaldo = getSaldo() + monto;
    setSaldo(nuevoSaldo);

    const transacciones = getTransacciones();
    transacciones.push({
      tipo: "Depósito",
      monto: monto,
      fecha: getFechaActual()
    });
    setTransacciones(transacciones);

    showAlert(`Depósito exitoso. Nuevo saldo: $${nuevoSaldo.toLocaleString("es-CL")}`, "success");
    $("#monto").val("");
  });

  // Retirar
  $("#btnRetirar").on("click", function () {
    const monto = parseInt($("#monto").val());

    if (isNaN(monto) || monto <= 0) {
      showAlert("Ingrese un monto válido", "danger");
      return;
    }

    const saldoActual = getSaldo();

    if (monto > saldoActual) {
      showAlert("Saldo insuficiente", "danger");
      return;
    }

    const nuevoSaldo = saldoActual - monto;
    setSaldo(nuevoSaldo);

    const transacciones = getTransacciones();
    transacciones.push({
      tipo: "Retiro",
      monto: monto,
      fecha: getFechaActual()
    });
    setTransacciones(transacciones);

    showAlert(`Retiro exitoso. Nuevo saldo: $${nuevoSaldo.toLocaleString("es-CL")}`, "success");
    $("#monto").val("");
  });

});
