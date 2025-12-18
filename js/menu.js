$(document).ready(function () {

  // Protección de sesión
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  // Mostrar saldo 
  const saldo = localStorage.getItem("saldo");
  $("#saldoActual").text(
    saldo ? Number(saldo).toLocaleString("es-CL") : "0"
  );

  // Mostrar últimas 3 transacciones
  const transacciones = JSON.parse(
    localStorage.getItem("transacciones") || "[]"
  );

  const $lista = $("#ultimasTransacciones");
  $lista.empty();

  if (transacciones.length === 0) {
    $lista.append(`<li class="text-muted">Sin movimientos</li>`);
  } else {
    transacciones
      .slice(-3)        // tomar las últimas 3
      .reverse()        // más reciente arriba
      .forEach(t => {
        const montoFmt = Number(t.monto).toLocaleString("es-CL");
        $lista.append(`
          <li>
            <strong>${t.tipo}</strong>: $${montoFmt}
          </li>
        `);
      });
  }

  // Cerrar sesión
  $("#btnLogout").on("click", function () {
    localStorage.clear();
    window.location.href = "../index.html";
  });

});
