/*
function carregarImagens() { 
    var url = "https://dog.ceo/api/breeds/image/random"; //API
    fetch(url, {
      method: 'get' // O metodo utilizado é o Get
    })
      .then(function(response) {
        response.json().then(function(data) { //a variavel data retorna a imagem do url
          console.log('Resultado da Requisição: ' + data.message); // como será a resposta
  
          var imgDog = document.getElementById("img_dog"); //retorna no elemento na tag "img_dog"
          imgDog.src = data.message;
        });
      })
      .catch(function(err) {
        console.error('O seguinte erro ocorreu durante a requisição: ' + err);
      });
  }
  */
 
  function carregarImagens(){
      
    var xmlHttpRequest = new XMLHttpRequest();
    var url = "https://dog.ceo/api/breeds/image/random"

    xmlHttpRequest.open("GET", url, true);

    xmlHttpRequest.onreadystatechange = function() {
      if (xmlHttpRequest.readyState == 3) {
        console.log('Carregando o conteúdo');
      }
      if (xmlHttpRequest.readyState == 4) {
                   
        var jsonResponse = JSON.parse(xmlHttpRequest.responseText);
     
        console.log('Requisição Finalizada');
        console.log('Resultado da Requisição: ' + jsonResponse);
        console.log('Resultado da Requisição: ' + jsonResponse.message);
      
        var imgDog = document.getElementById("img_dog");
        imgDog.src = jsonResponse.message;
      }
    };
               
    xmlHttpRequest.send(null);
  
  }