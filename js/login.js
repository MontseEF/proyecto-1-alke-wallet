$(document).ready(function () {
  // Credenciales simuladas
  const USER_EMAIL = "correo@test.com";
  const USER_PASSWORD = "1234";

  $("#loginForm").on("submit", function (e) {
    e.preventDefault(); // evita recargar la página

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (email === "" || password === "") {
      showAlert("Todos los campos son obligatorios", "danger");
      return;
    }

    // Validación de credenciales
    if (email === USER_EMAIL && password === USER_PASSWORD) {
      // Guardar sesión simulada
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      showAlert("Login exitoso. Redirigiendo...", "success");
      // Inicializar saldo solo la primera vez
      if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", "60000");
      }

      if (!localStorage.getItem("transacciones")) {
        localStorage.setItem("transacciones", JSON.stringify([]));
      }

      // Redirigir al menú
      setTimeout(function () {
        window.location.href = "menu.html";
      }, 1000);
    } else {
      showAlert("Credenciales incorrectas", "danger");
    }
  });

  // Función para mostrar alertas
  function showAlert(message, type) {
    const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    $("#alert-container").html(alertHTML);
  }
});
