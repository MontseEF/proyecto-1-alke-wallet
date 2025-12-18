$(document).ready(function () {

  // Protección
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  // Obtener transacciones
  const transacciones = JSON.parse(
    localStorage.getItem("transacciones") || "[]"
  );

  // Si no hay movimientos
  if (transacciones.length === 0) {
    $("#listaTransacciones").html(`
      <div class="alert alert-info">
        Aún no hay movimientos registrados.
      </div>
    `);
    return;
  }

  // Construir lista
  let html = `<ul class="list-group">`;

  transacciones.slice().reverse().forEach(t => {
    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${t.tipo}</strong><br>
          <small class="text-muted">${t.fecha}</small>
        </div>
        <span class="fw-bold">
          $${Number(t.monto).toLocaleString("es-CL")}
        </span>
      </li>
    `;
  });

  html += `</ul>`;
  $("#listaTransacciones").html(html);

});
