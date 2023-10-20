    // Adicione um evento de rolagem para mostrar/ocultar o botão "Voltar ao Início"
    window.addEventListener('scroll', function() {
        var button = document.getElementById('botao-ao-topo');
        if (window.scrollY > 300) {
          button.style.display = 'block';
        } else {
          button.style.display = 'none';
        }
      });
  
      // Adicione uma função para rolar suavemente ao topo
      document.getElementById('botao-ao-topo').addEventListener('click', function(e) {
        e.preventDefault(); // Impedir o comportamento padrão do link
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
