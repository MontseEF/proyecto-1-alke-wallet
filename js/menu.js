$(document).ready(function () {

  // Protección de la página
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  // Cerrar sesión
  $("#btnLogout").on("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    
    window.location.href = "../index.html";
  });

});
