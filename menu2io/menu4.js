$(document).ready(function() {
  $(".menu_link").click(function(e) {
    e.preventDefault(); // Evita o comportamento padrão do link
    $(".menu_move").toggleClass("clicado"); // Alterna a classe "clicado" na navegação
  });
});