function consultarCEP() {
    var cep = document.getElementById("cep").value;
    var xmlHttpRequest = new XMLHttpRequest();
    var url = "http://viacep.com.br/ws/" + cep + "/json/";

    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.setRequestHeader("Accept", "application/json");

    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 3) {
        console.log('Carregando o conteúdo');
        }
        if (xmlHttpRequest.readyState == 4) {
        console.log('CEP: ' + xmlHttpRequest.responseText);

        var jsonResponse = JSON.parse(xmlHttpRequest.responseText);

        document.getElementById("resultado").innerHTML = 
        'CEP: ' + jsonResponse.cep + '<br>' + 
        'Logradouro: ' + jsonResponse.logradouro + '<br>' + 
        'Complemento: ' + jsonResponse.complemento + '</br>' +
        'Bairro: ' + jsonResponse.bairro + '<br>' +
        'Cidade: ' + jsonResponse.localidade + '<br>' + 
        'UF: ' + jsonResponse.uf + '<br>' + 
        'IBGE: ' + jsonResponse.ibge + '<br>' + 
        'GIA: ' + jsonResponse.gia + '<br>' + 
        'DDD: ' + jsonResponse.ddd + '<br>' + 
        'SIAFI: ' + jsonResponse.siafi
        ;

        document.getElementById("cep2").textContent = jsonResponse.cep;
        document.getElementById("logradouro").textContent = jsonResponse.logradouro;
        document.getElementById("bairro").textContent = jsonResponse.bairro;
        document.getElementById("cidade").textContent = jsonResponse.localidade;
        document.getElementById("uf").textContent = jsonResponse.uf;
  
        console.log(jsonResponse);
        }
    };

    xmlHttpRequest.send(); // Inicie a solicitação
    }