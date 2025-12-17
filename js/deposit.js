// deposit.js
$(document).ready(function () {

  // Protección de la página
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  //  Inicializar saldo si no existe
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "60000");
  }

  // Obtener saldo actual
  function getSaldo() {
    return parseInt(localStorage.getItem("saldo"));
  }

  // Guardar saldo
  function setSaldo(nuevoSaldo) {
    localStorage.setItem("saldo", nuevoSaldo.toString());
  }

  // Mostrar mensajes
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

    showAlert(`Depósito exitoso. Nuevo saldo: $${nuevoSaldo}`, "success");
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

    showAlert(`Retiro exitoso. Nuevo saldo: $${nuevoSaldo}`, "success");
    $("#monto").val("");
  });

});
