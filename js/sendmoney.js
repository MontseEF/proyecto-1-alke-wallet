$(document).ready(function () {

  //  Protección de la página
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  //  Asegurar estructuras básicas
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "60000");
  }

  if (!localStorage.getItem("transacciones")) {
    localStorage.setItem("transacciones", JSON.stringify([]));
  }

  // Helpers
  function getSaldo() {
    return parseInt(localStorage.getItem("saldo"));
  }

  function setSaldo(nuevoSaldo) {
    localStorage.setItem("saldo", nuevoSaldo.toString());
  }

  function getTransacciones() {
    return JSON.parse(localStorage.getItem("transacciones"));
  }

  function setTransacciones(lista) {
    localStorage.setItem("transacciones", JSON.stringify(lista));
  }

  function getFechaActual() {
    return new Date().toLocaleString("es-CL");
  }

  function showAlert(message, type) {
    const html = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    $("#alert-container").html(html);
  }

  // Enviar dinero
  $("#btnEnviar").on("click", function () {
    const contacto = $("#contacto").val();
    const monto = parseInt($("#montoEnviar").val());

    // Validaciones
    if (!contacto) {
      showAlert("Seleccione un contacto", "danger");
      return;
    }

    if (isNaN(monto) || monto <= 0) {
      showAlert("Ingrese un monto válido", "danger");
      return;
    }

    const saldoActual = getSaldo();

    if (monto > saldoActual) {
      showAlert("Saldo insuficiente", "danger");
      return;
    }

    // Actualizar saldo
    const nuevoSaldo = saldoActual - monto;
    setSaldo(nuevoSaldo);

    // Guardar transacción
    const transacciones = getTransacciones();
    transacciones.push({
      tipo: "Envío",
      contacto: contacto,
      monto: monto,
      fecha: getFechaActual()
    });
    setTransacciones(transacciones);

    // Mensaje de éxito
    showAlert(
      `Envío exitoso a ${contacto}. Nuevo saldo: $${nuevoSaldo.toLocaleString("es-CL")}`,
      "success"
    );

    // Limpiar formulario
    $("#contacto").val("");
    $("#montoEnviar").val("");
  });

});
