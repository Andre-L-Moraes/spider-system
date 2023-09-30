function consultarCEP() {
    var cep = document.getElementById("cep").value;
    var xmlHttpRequest = new XMLHttpRequest();
    var url = "http://viacep.com.br/ws/" + cep + "/json/";

    // Acessa a API
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.setRequestHeader("Accept", "application/json");

    // faz o primeiro carregamento
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 3) {
        console.log('Carregando o conteúdo'); //Mostra no Console
        }
        //Já tem o resultado
        if (xmlHttpRequest.readyState == 4) {
        console.log('CEP: ' + xmlHttpRequest.responseText); //Mostra no console
        
        //armazena o resultado da pesquisa na variavel
        var jsonResponse = JSON.parse(xmlHttpRequest.responseText);

        // Renorno em uma ID em uma lista direta
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
        
        // Retorno com blocos ou IDs diferentes
        document.getElementById("cep2").textContent = jsonResponse.cep;
        document.getElementById("logradouro").textContent = jsonResponse.logradouro;
        document.getElementById("bairro").textContent = jsonResponse.bairro;
        document.getElementById("cidade").textContent = jsonResponse.localidade;
        document.getElementById("uf").textContent = jsonResponse.uf;
  
        console.log(jsonResponse); //Mostra o resultado no console
        }
    };

    xmlHttpRequest.send(); // Inicie a solicitação
}