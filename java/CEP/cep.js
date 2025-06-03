function consultarCEP() {
    var cep = document.getElementById("cep").value;
    var varsolicita = new XMLHttpRequest();
    var url = "https://viacep.com.br/ws/" + cep + "/json/";

    // Acessa a API
    varsolicita.open("GET", url, true);
    varsolicita.setRequestHeader("Accept", "application/json");

    // faz o primeiro carregamento
    varsolicita.onreadystatechange = function () {
        if (varsolicita.readyState == 3) {
        console.log('Carregando o conteúdo'); //Mostra no Console
        }
        //Já tem o resultado
        if (varsolicita.readyState == 4) {
        console.log('CEP: ' + varsolicita.responseText); //Mostra no console
        
        //armazena o resultado da pesquisa na variavel
        var jsonResponse = JSON.parse(varsolicita.responseText);

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
        document.getElementById("ddd2").textContent = jsonResponse.ddd;
  
        console.log(jsonResponse); //Mostra o resultado no console
        }
    };

    varsolicita.send(); // Inicie a solicitação
}
//consulta usando a tecla enter
document.getElementById("cep").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        consultarCEP();
    }
});